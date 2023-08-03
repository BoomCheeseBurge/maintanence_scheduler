<?php

class Login_model {
    private $table = 'user';
    private $db;
    private $data = [];
    private $hash;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function validateUser($data)
    {
        if ( $this->validateEmail($data['email']) === 0 ) {
            return false;
        }

        if ( !$this->validatePassword($data['email'], $data['password']) ) {
            return false;
        }

        return true;
    }

    public function validateEmail($email)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $this->db->query($query);
        $this->db->bind('email', $email);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function validatePassword($email, $password)
    {
        $this->data['user'] = $this->getUserByEmail($email);

        $this->hash = $this->data['user']['password'];

        if (password_verify($password.PEPPER, $this->hash)) {
            // cek remember me
            if ( isset($_POST['remember']) ) {
                setcookie('index', $this->data['user']['id'], [
                    'expires' => time() + 86400,
                    'samesite' => 'Lax'
                ]);
                
                setcookie('value', hash('sha256', $this->data['user']['fullname']), [
                    'expires' => time() + 86400,
                    'samesite' => 'Lax'
                ]);
            } 
            
            $_SESSION['id'] = $this->data['user']['id'];
            $_SESSION['name'] = $this->data['user']['full_name'];
            $_SESSION['email'] = $this->data['user']['email'];
            $_SESSION['role'] = $this->data['user']['role'];
            
            if ( $this->data['user']['photo'] === null) 
                $_SESSION['photo'] = 'default-placeholder.jpg';
            else
                $_SESSION['photo'] = $this->data['user']['photo'];
            
            return true;
        } else {
            return false;
        }
    }

    public function getUserByEmail($email)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE email=:email";
        $this->db->query($query);
        $this->db->bind('email', $email);
        return $this->db->single();
    }

    public function getUserById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id=:id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function isCookieSet()
    {
        if ( isset($_COOKIE['index']) && isset($_COOKIE['value']) ) {
           
            $id = $_COOKIE['index'];
            $value = $_COOKIE['value'];
            
            $this->data = $this->getUserById($id);

            if ( $value === hash('sha256', $this->data['fullname']) ) {
                $_SESSION['role'] = true;
            }
        }
    }
}