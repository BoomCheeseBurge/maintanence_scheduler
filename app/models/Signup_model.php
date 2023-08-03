<?php

class Signup_model {
    private $table = 'user';
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function addUser($data)
    {
        if ( $this->isEmailTaken($data['email']) > 0) {
            return 0;
        }

        $query = "INSERT INTO " . $this->table . " (id, full_name, password, role, email)
                     VALUES 
                    ('', :fullname, :password, :role, :email)";

        $hash = password_hash($data['password'].PEPPER, PASSWORD_DEFAULT); 

        $this->db->query($query);
        $this->db->bind('fullname', $data['name']);
        $this->db->bind('password', $hash);
        $this->db->bind('role', 'admin');
        $this->db->bind('email', $data['email']);

        $this->db->execute();

        return $this->db->rowCount();
    }

    public function isEmailTaken($data)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $this->db->query($query);
        $this->db->bind('email', $data);
        $this->db->execute();
        return $this->db->rowCount();
    }

}