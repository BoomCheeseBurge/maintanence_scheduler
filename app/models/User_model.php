<?php

class User_model {

	private $table = 'user';
	private $db;

	public function __construct() {

		$this->db = new Database;
	}

	public function isAdminUserExists() {

		// Check if the table exists
		$checkTableQuery = 'SHOW TABLES LIKE :tableName';
		$this->db->query($checkTableQuery);
		$this->db->bind(':tableName', $this->table);
		$this->db->execute();

		return $this->db->rowCount();
	}

	public function addAdmin($uName, $uEmail, $uPass) {

		$hash = password_hash($uPass.PEPPER, PASSWORD_DEFAULT);

		$query = "INSERT INTO " . $this->table . " (full_name, password, role, email) VALUES
					(:name, :password, 'admin', :email)";

		$this->db->query($query);
		$this->db->bind('name', $uName);
		$this->db->bind('password', $hash);
		$this->db->bind('email', $uEmail);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function addNewUser($data) {

		$password = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
		// Store temporary password to be emailed; 
		$_SESSION['temppw'] = $password; 

		$hash = password_hash($password.PEPPER, PASSWORD_DEFAULT);

		$query = "INSERT INTO " . $this->table . " (full_name, password, role, email) VALUES
					(:name, :password, :role, :email)";

		$this->db->query($query);
		$this->db->bind('name', $data['name']);
		$this->db->bind('password', $hash);
		$this->db->bind('role', $data['roleInput']);
		$this->db->bind('email', $data['email']);
		$this->db->execute();

		return $this->db->rowCount();
	}

	public function isDuplicateUser($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table .'
		WHERE full_name = :name 
		AND role = :role 
		AND email = :email';

		$this->db->query($query);
		$this->db->bind('name', $data['name']);
		$this->db->bind('role', $data['roleInput']);
		$this->db->bind('email', $data['email']);

        $row = $this->db->single();

        return $row['count'] > 0;
    }

	public function saveUserData($data) {

		$query = "UPDATE " . $this->table . " SET
					full_name = :name,
					email = :email,
					role = :role
				WHERE id = :id
		";

		$this->db->query($query);
		$this->db->bind('name', $data['name']);
		$this->db->bind('email', $data['email']);
		$this->db->bind('role', $data['roleInput']);
		$this->db->bind('id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function deleteUser($id) {

		try {
			$query = "DELETE FROM " . $this->table . " WHERE id = :id";
		
			$this->db->query($query);
			$this->db->bind('id', $id);
		
			$this->db->execute();
		
			return $this->db->rowCount();
		} catch (PDOException $e) {
			$errorCode = $e->getCode();
			if ($errorCode === '23000' || $errorCode === '1451') {
				return 2;
			} else {
				// Handle other errors
				return $errorCode;
			}
		}
	}
	
	public function delBulkUserData($ids) {

		try {
			// Create placeholders for the IDs
			$placeholders = implode(',', array_fill(0, count($ids), '?'));
		
			$query = 'DELETE FROM ' . $this->table . ' WHERE id IN (' . $placeholders . ')';
			$this->db->query($query);
		
			// Bind the IDs
			foreach ($ids as $index => $id) {
				$this->db->bind($index + 1, $id, PDO::PARAM_INT); // Assuming IDs are integers
			}
	
			$this->db->execute();
			// Success: The client record was deleted successfully
			return $this->db->rowCount();
		} catch (PDOException $e) {
			$errorCode = $e->getCode();
			if ($errorCode === '23000' || $errorCode === '1451') {
				return 2;
			} else {
				// Handle other errors
				return $errorCode;
			}
		}
	}

    public function getAssignee($keyword)
    {
        $query = 'SELECT full_name FROM user WHERE full_name LIKE :keyword';
        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");
        return $this->db->resultSet();
    }

	public function updateUserProfile($data)
	{
		$id = $data['userid'];
		$name = $data['name'];
		$email = $data['email'];

		// Check if the file was uploaded successfully
		if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
			// Get the file details
			$file_name = $_FILES['photo']['name'];
			$file_tmp = $_FILES['photo']['tmp_name'];
			$file_size = $_FILES['photo']['size'];
			$file_type = $_FILES['photo']['type'];
	
			// Now, you can use the file information as needed, e.g., move the file to a desired location
			$target_directory = '../public/img/users/';
			$target_file = $target_directory . $file_name;
			move_uploaded_file($file_tmp, $target_file);

			$_SESSION['photo'] = $file_name;

			// File upload success
			echo "File uploaded successfully.";		
		} else {
			// File upload error
			$file_name = $_SESSION['photo'];
			echo "Error uploading the file.";
		}

		$_SESSION['name'] = $name;
		$_SESSION['email'] = $email;
		
		$query = "UPDATE " . $this->table . " SET
					full_name = :name,
					email = :email,
					photo = :photo
				WHERE id = :userid
		";

		$this->db->query($query);
		$this->db->bind('userid', $id);
		$this->db->bind('name', $name);
		$this->db->bind('email', $email);
		$this->db->bind('photo', $file_name);
		
		$this->db->execute();

		return $this->db->rowCount();
	}

	public function changeUserPassword($data) {

		// Get user's data
		$query = "SELECT * FROM " . $this->table . " WHERE id=:id";
		$this->db->query($query);
		$this->db->bind('id', $data['userid']);
		$this->db->execute();
		$user = $this->db->single();
		// Get user's password
		$hash = $user['password'];

		// If current password entered in the form is the same in the database
		if (password_verify($data['currentPassword'].PEPPER, $hash)) {

			// Change current pasword with new password
			$query = "UPDATE " . $this->table . " SET
					password = :password
				WHERE id = :id
			";

			$hash = password_hash($data['newPassword'].PEPPER, PASSWORD_DEFAULT); 

			$this->db->query($query);
			$this->db->bind('password', $hash);
			$this->db->bind('id', $data['userid']);
			
			$this->db->execute();

			// If update is successful
			if ( $this->db->rowCount() > 0 ) {
				return ['result' => '1'];
			// If update fails
			} else {
				return ['result' => '2'];
			}
		// If current password entered in the form is different from in the database
		} else {
			return ['result' => '3'];
		}
	}

	public function getAllUser() {
		$this->db->query('SELECT id, full_name, email, role FROM ' . $this->table . ' WHERE role = "engineer"');
        $data = $this->db->resultSet();
		// var_dump($data);
		echo json_encode($data);
	}
	
	public function getEngineerIdByAssignee($assignee) {
		$query = "SELECT id FROM user WHERE full_name = :assignee";
		$this->db->query($query);
		$this->db->bind(':assignee', $assignee);
		$result = $this->db->single();
		
		// Return the client_id or null if not found
		return $result ? $result['id'] : null;
	}
}