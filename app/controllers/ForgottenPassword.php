<?php

class ForgottenPassword extends Controller
{
    public function index()
    {
        $data['title'] = 'Forgotten Password';
        $this->view('templates/auth_header', $data);
        $this->view('forgottenpassword/index');
        $this->view('templates/footer');
    }

    public function validateEmail()
    {
        if ($this->model('Signup_model')->isEmailTaken($_POST['email']) > 0)
        {
            if ( $this->password_reset($_POST['email']) )
            {
                echo json_encode(array("taken"=>"email_send_success"));
            } else {
                echo json_encode(array("taken"=>"email_send_fail"));
            }
        } else {
            echo json_encode(array("taken"=>"email_not_exist"));
        }
    }

    public function password_reset($email)
    {
        // create token
        $token = md5(rand());
        $now = date_create()->format('Y-m-d H:i:s');
        $oneHourLater = date_create($now)->modify('+1 hour')->format('Y-m-d H:i:s');

        $data['email'] = $email;
        $data['token'] = $token;
        $data['oneHourLater'] = $oneHourLater;

        // Add the token and token date into the database 
        if ($this->model('ForgottenPassword_model')->addToken($data) > 0)
        {
            if ($this->model('ForgottenPassword_model')->send_password_reset_email($email, $token))
            {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function reset_password_action()
    {
        $data['title'] = 'Reset Password';
        $this->view('templates/auth_header', $data);

        if ( $this->model('ForgottenPassword_model')->isTokenCorrect($_GET['token']) > 0 )
        {
            if ( $this->model('ForgottenPassword_model')->isTokenNotExpired($_GET['token']) )
            {
                $this->view('ForgottenPassword/reset_password', $_GET['token']);
            } else {
                $this->view('ForgottenPassword/reset_password_expired');    
            }
        } else {
            $this->view('forgottenpassword/unauthorized_access');
        }
        $this->view('templates/footer');
    }

    public function change_password() {
        
        $data['token'] = $_POST['token'];
        $data['newPassword'] = $_POST['newPassword'];
        $resetSuccessful = true; 

        // Prepare the JSON response
        $response = array('success' => $resetSuccessful);

        if ( !$this->model('ForgottenPassword_model')->changeOldToNewPassword($data) > 0 )  {
            $resetSuccessful = false; 
        }

        // Set the Content-Type header to application/json
        header('Content-Type: application/json');

        // Encode the response array as JSON and output it
        echo json_encode($response);
        
    }
}
