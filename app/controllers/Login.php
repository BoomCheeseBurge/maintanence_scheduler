<?php

class Login extends Controller
{
    public function index()
    {
        // Check if cookie is set
        $this->model('Login_model')->isCookieSet();

        if (isset($_SESSION["role"])) {
            header('Location:'. BASEURL .'/dashboard');
            exit;
        }

        $data['title'] = 'Login';
        $this->view('templates/auth_header', $data);
        $this->view('login/index');
        $this->view('templates/footer');
    }

    public function validate()
    {
        if($this->model('Login_model')->validateUser($_POST) > 0) {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        } else {
            Auth_Flasher::setFlash('Wrong email or password', 'danger');
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    }
}
