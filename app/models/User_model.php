<?php

class User_model {

	private $table = 'user';
	private $db;


	public function __construct() {

		$this->db = new Database;
	}

	public function addNewUser($data) {

		$query = "INSERT INTO user VALUE
					('', :nama, :nrp, :email, :jurusan)";

		$this->db->query($query);
		$this->db->bind('nama', $data['nama']);
		$this->db->bind('nrp', $data['nrp']);
		$this->db->bind('email', $data['email']);
		$this->db->bind('jurusan', $data['jurusan']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function editUserData($data) {

		$query = "UPDATE user SET
					event_nama = :setdate
				WHERE event_id = :id
		";

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind('id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}
}