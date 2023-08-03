<?php

class Client_model {

	private $table1 = 'client';
	private $table2 = 'pic';
	private $db;


	public function __construct() {

		$this->db=  new Database;
	}


	public function getClientData() {

		$this->db->query('SELECT p.id AS id, cl.name AS client_name, p.name AS pic_name, p.email AS pic_email
		FROM '. $this->table1 .' cl
		JOIN '. $this->table2 .' p ON cl.id = p.client_id');
		return $this->db->resultSet();
	}

	public function addClientData($data) {

		$client_name = $data['clientName'];
		$query1 = 'INSERT INTO '. $this->table1 .' (id, name) VALUES ("", :client_name)';
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
                $query2 = 'INSERT INTO '. $this->table2 .' (id, client_id, name, email) VALUES ("", :client_id, :pic_name, :pic_email)';
                $this->db->query($query2);
                $this->db->bind('client_id', $clientId);
                $this->db->bind('pic_name', $picNames[$i]);
                $this->db->bind('pic_email', $picEmails[$i]);
                $this->db->execute();
            }
        }

		return $this->db->rowCount();
	}

	public function editClientPICData($data) {

		$query = 'UPDATE '. $this->table2 .' SET
					client_id = :client_id,
					name = :name,
					email = :email
				WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':name', $data['pic_name']);
		$this->db->bind(':email', $data['pic_email']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function delClientPICData($data) {

		$query = 'DELETE FROM '. $this->table2 .' WHERE id = :id';
		$this->db->query($query);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
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