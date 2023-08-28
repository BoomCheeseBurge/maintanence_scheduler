<?php

class Logout extends Controller
{
    public function index()
    {
        $_SESSION = [];
        session_unset();
        session_destroy();

        // echo(date("l jS \of F Y h:i:s A",time()) . "<br>" );
        // echo(date("l jS \of F Y h:i:s A",time()-3600));
        // exit;

        setcookie('index', '', [
            'expires' => time() - 3600,
            'samesite' => 'Lax'
        ]);
        
        setcookie('value', '', [
            'expires' => time() - 3600,
            'samesite' => 'Lax'
        ]);

        // setcookie("index", "", time() - 3600);
        // setcookie("value", "", time() - 3600);

        header('Location: ' . BASEURL . '/Login');
    }
}
