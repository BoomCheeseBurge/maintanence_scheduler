<?php

class Signup extends Controller
{
    public function index()
    {
        $data['title'] = 'Signup';
        $this->view('templates/auth_header', $data);
        $this->view('signup/index');
        $this->view('templates/footer');
    }

    public function add()
    {
        if($this->model('Signup_model')->addUser($_POST) > 0) {
            Auth_Flasher::setFlash('The user has been successfully added', 'success');
            header('Location: ' . BASEURL . '/Login');
            exit;
        } else {
            Auth_Flasher::setFlash('Adding a new user failed. Already existed', 'danger');
            header('Location: ' . BASEURL . '/Signup');
            exit;
        }
    }
}
