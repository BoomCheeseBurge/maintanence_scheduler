<?php

class Auth_Flasher {

    public static function setFlash($pesan, $tipe)
    {
        $_SESSION['flash'] = [
            'pesan' => $pesan,
            'tipe' => $tipe
        ];
    }

    public static function flash()
    {
        if( isset($_SESSION['flash']) ) {
            echo '<div class="alert alert-' . $_SESSION['flash']['tipe'] . ' alert-dismissible fade show" role="alert"><strong>'. $_SESSION['flash']['pesan'] . '</strong>!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            unset($_SESSION['flash']);
        }
    }

}