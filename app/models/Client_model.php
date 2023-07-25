<?php

class Client_model {

	private $table = 'client';
	private $db;


	public function __construct() {

		$this->db=  new Database;
	}


	public function getAllClient() {

		$this->db->query('SELECT pic.id AS id, client.name AS client_name, pic.name AS pic_name, pic.email AS pic_email
		FROM client
		JOIN pic ON client.id = pic.client_id');
		return $this->db->resultSet();
	}


	public function getClientById($id) {

		// :id will store the binded data (to prevent SQL injection)
		$this->db->query('SELECT * FROM client WHERE id=:id');
		$this->db->bind('id', $id);
		return $this->db->single();
	}


	public function addClientData($data) {

		$client_name = $data['clientName'];
		$query1 = "INSERT INTO client (id, name) VALUES ('', :client_name)";
		$this->db->query($query1);
		$this->db->bind('client_name', $client_name);
		$this->db->execute();

		// After executing the INSERT query for the 'client' table
		$clientId = $this->db->lastInsertId();

        // Check if picName and picEmail arrays exist in the $data
        if (isset($data['picName']) && isset($data['picEmail'])) {
            $picNames = $data['picName'];
            $picEmails = $data['picEmail'];

            // Loop through the pic data arrays and insert each set as a separate record
            for ($i = 0; $i < count($picNames); $i++) {
                $query2 = "INSERT INTO pic (id, client_id, name, email) VALUES ('', :client_id, :pic_name, :pic_email)";
                $this->db->query($query2);
                $this->db->bind('client_id', $clientId);
                $this->db->bind('pic_name', $picNames[$i]);
                $this->db->bind('pic_email', $picEmails[$i]);
                $this->db->execute();
            }
        }

		return $this->db->rowCount();
	}


	public function delClientData($id) {

		$query = "DELETE FROM client WHERE id = :id";
		$this->db->query($query);
		$this->db->bind('id', $id);

		$this->db->execute();

		return $this->db->rowCount();
	}


	public function editDataClient($data) {

		$query = "UPDATE client SET
					nama = :nama,
					email = :email,
					telepon = :telepon,
					lokasi = :lokasi
				WHERE id = :id
		";

		$this->db->query($query);
		$this->db->bind('nama', $data['nama']);
		$this->db->bind('email', $data['email']);
		$this->db->bind('telepon', $data['telepon']);
		$this->db->bind('lokasi', $data['lokasi']);
		$this->db->bind('id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}


	public function getDataClient() {

		$keyword = $_POST['keyword'];
		$query = 'SELECT * FROM client WHERE nama LIKE :keyword';
		$this->db->query($query);
		$this->db->bind('keyword', "%$keyword%");
		return $this->db->resultSet();
	}
	
	public function getClient($keyword)
    {
        $query = 'SELECT nama FROM client WHERE nama LIKE :keyword';
        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");
        return $this->db->resultSet();
    }

	public function getAssignee($keyword)
    {
        $query = 'SELECT nama FROM client WHERE nama LIKE :keyword';
        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");
        return $this->db->resultSet();
    }

	function emptyDataFile() {
		$filePath = 'data1.json'; // Replace with the correct file path
		
		// Open the file in write mode
		$file = fopen($filePath, 'w');
		
		if ($file) {
			// Truncate the file to 0 length, effectively clearing its content
			ftruncate($file, 0);
			
			// Close the file
			fclose($file);
		} else {
			// Handle file opening error
			echo 'Could not open file:  '.$filePath;
		}
	}	
}