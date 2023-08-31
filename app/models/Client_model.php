<?php

class Client_model {

	private $table1 = 'client';
	private $table2 = 'pic';
	private $db;


	public function __construct() {

		$this->db=  new Database;
	}


	public function getClientData() {

		$this->db->query('SELECT p.id AS pic_id, cl.id AS client_id, cl.name AS client_name, p.name AS pic_name, p.email AS pic_email
		FROM '. $this->table1 .' cl
		JOIN '. $this->table2 .' p ON cl.id = p.client_id');
		return $this->db->resultSet();
	}

	public function addClientData($data) {

		// Check if the client name already exists
		$queryCheck = 'SELECT id, COUNT(*) AS count FROM '. $this->table1 .' WHERE name = :client_name';
		$this->db->query($queryCheck);
		$this->db->bind(':client_name', $data['clientName']);
		$result = $this->db->single();

		if ($result['count'] > 0) {
			$clientId = $result['id'];

		} else {
			$query1 = 'INSERT INTO '. $this->table1 .' (name) VALUES (:client_name)';
			$this->db->query($query1);
			$this->db->bind('client_name', $data['clientName']);
			$this->db->execute();

			// After executing the INSERT query for the 'client' table
			$clientId = $this->db->lastInsertId();
		}

        // Check if picName and picEmail arrays exist in the $data
        if (isset($data['picName']) && isset($data['picEmail'])) {
            $picNames = $data['picName'];
            $picEmails = $data['picEmail'];

			// Check if a client PIC of this client was previously added
			$queryCheck = 'SELECT COUNT(*) AS count FROM '. $this->table2 .' WHERE client_id = :clientId';
			$this->db->query($queryCheck);
			$this->db->bind(':clientId', $clientId);
			$result = $this->db->single();
			$countNum = intval($result['count']);

			// Loop through the pic data arrays and insert each set as a separate record
			for ($i = 0; $i < count($picNames); $i++) {

				if ( $countNum === 1 && $i === 0 ) {
					$query2 = 'UPDATE '. $this->table2 .' SET
								name = :pic_name,
								email = :pic_email
							WHERE client_id = :client_id
					';
					
					$this->db->query($query2);
					$this->db->bind('client_id', $clientId);
					$this->db->bind('pic_name', $picNames[$i]);
					$this->db->bind('pic_email', $picEmails[$i]);
					$this->db->execute();
				} else {
					$query2 = 'INSERT INTO '. $this->table2 .' (client_id, name, email) VALUES (:client_id, :pic_name, :pic_email)';
					$this->db->query($query2);
					$this->db->bind('client_id', $clientId);
					$this->db->bind('pic_name', $picNames[$i]);
					$this->db->bind('pic_email', $picEmails[$i]);
					$this->db->execute();
				}
			}
        }

		return $this->db->rowCount();
	}

	public function editClientData($data) {

		$query = 'UPDATE '. $this->table1 .' SET
					name = :name
				WHERE name = :client_name
		';

		$this->db->query($query);
		$this->db->bind(':client_name', $data['clientName']);
		$this->db->bind(':name', $data['name']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function isDuplicateClient($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table1 .'
		WHERE name = :client_name';

		$this->db->query($query);
		$this->db->bind(':client_name', $data['clientName']);

        $row = $this->db->single();

        return $row['count'];
    }

	public function delClientData($data) {

		try {

			$query = 'DELETE FROM '. $this->table2 .' WHERE client_id = :id';
			$this->db->query($query);
			$this->db->bind(':id', $data['client_id']);
			
			$this->db->execute();

			$query2 = 'DELETE FROM '. $this->table1 .' WHERE name = :client_name';
			$this->db->query($query2);
			$this->db->bind(':client_name', $data['clientName']);

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

	public function editClientPICData($data) {

		$query = 'UPDATE '. $this->table2 .' SET
					name = :name,
					email = :email
				WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind(':name', $data['pic_name']);
		$this->db->bind(':email', $data['pic_email']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function isDuplicateClientPIC($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table2 .'
		WHERE email = :email';

		$this->db->query($query);
		$this->db->bind(':email', $data['pic_email']);

        $row = $this->db->single();

        return $row['count'];
    }

	public function delClientPICData($data) {

		try {

			$queryCheck = 'SELECT COUNT(*) AS count FROM '. $this->table2 .' WHERE client_id = :clientId';
			$this->db->query($queryCheck);
			$this->db->bind(':clientId', $data['clientId']);
			$result = $this->db->single();
			$countNum = intval($result['count']);

			// If there is only one PIC left from the said client, then delete the client as well
			if ( $countNum === 1 ) {
				$query = 'UPDATE '. $this->table2 .' SET
						name = "--",
						email = "--"
						WHERE id = :picId
				';

				$this->db->query($query);
				$this->db->bind(':picId', $data['picId']);

				$this->db->execute();

				return $this->db->rowCount();
			} else {
				$query = 'DELETE FROM '. $this->table2 .' WHERE id = :picId';
				$this->db->query($query);
				$this->db->bind(':picId', $data['picId']);
				
				$this->db->execute();
				return $this->db->rowCount();
			}
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

	public function delBulkClientPICData($ids) {

		try {
			// Create placeholders for the IDs
			$placeholders = implode(',', array_fill(0, count($ids), '?'));
		
			$query = 'DELETE FROM ' . $this->table2 . ' WHERE id IN (' . $placeholders . ')';
			$this->db->query($query);
		
			// Bind the IDs
			foreach ($ids as $index => $id) {
				$this->db->bind($index + 1, $id, PDO::PARAM_INT); // Assuming IDs are integers
			}
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
	

	public function getClientPICById($id) {

		$query = 'SELECT p.id, cl.name AS client_name, p.name AS pic_name, p.email
		FROM '. $this->table2 .' p
		INNER JOIN '. $this->table1 .' cl ON p.client_id = cl.id
		WHERE p.id = :id';

		$this->db->query($query);
		$this->db->bind('id', $id);
		return $this->db->single();
	}

	public function getClientIdByName($clientName) {
		$query = 'SELECT id FROM '. $this->table1 .' WHERE name = :client_name';
		$this->db->query($query);
		$this->db->bind(':client_name', $clientName);
		$result = $this->db->single();
		
		// Return the client_id or null if not found
		return $result ? $result['id'] : null;
	}

	public function getDataClient() {

		$keyword = $_POST['keyword'];
		$query = 'SELECT * FROM '. $this->table1 .' WHERE nama LIKE :keyword';
		$this->db->query($query);
		$this->db->bind('keyword', "%$keyword%");
		return $this->db->resultSet();
	}
	
	public function getClientName($keyword)
    {
        $query = 'SELECT name FROM '. $this->table1 .' WHERE name LIKE :keyword';
        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");
        return $this->db->resultSet();
    }
}