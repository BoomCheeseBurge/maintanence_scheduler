<?php

class Client_model {

	private $table = 'client';
	private $db;


	public function __construct() {

		$this->db = new Database;
	}


	public function getAllClient() {

		$this->db->query('SELECT * FROM ' . $this->table);
		return $this->db->resultSet();
	}


	public function getClientById($id) {

		// :id will store the binded data (to prevent SQL injection)
		$this->db->query('SELECT * FROM client WHERE id=:id');
		$this->db->bind('id', $id);
		return $this->db->single();
	}


	public function addDataClient($data) {

		$query = "INSERT INTO client VALUE
					('', :nama, :email, :telepon, :lokasi)";

		$this->db->query($query);
		$this->db->bind('nama', $data['nama']);
		$this->db->bind('email', $data['email']);
		$this->db->bind('telepon', $data['telepon']);
		$this->db->bind('lokasi', $data['lokasi']);

		$this->db->execute();

		return $this->db->rowCount();
	}


	public function delDataClient($id) {

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