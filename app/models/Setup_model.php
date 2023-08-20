<?php

class Setup_model {

	private $table = 'user';
	private $db;


	public function __construct() {

		$this->db = new Database;
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
}