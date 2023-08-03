<?php
// Libraries/EmailHelper.php

require_once '../app/libraries/PHPMailer/src/PHPMailer.php';
require_once '../app/libraries/PHPMailer/src/SMTP.php';
require_once '../app/libraries/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailHelper {
    public static function sendEmail($to, $subject, $body) {
        $mail = new PHPMailer(true);
        // Configure PHPMailer (e.g., SMTP settings, sender info)
        $email_from = "danone.institute.indonesia@danonenutrindo.org"; 
        $mail->Host = "mail.danonenutrindo.org";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "danone.institute.indonesia@danonenutrindo.org";
        $mail->Password = "T4TnL1p4Ok";
        $mail->SMTPSecure = "ssl"; //TLS
        $mail->Port = 465; //587
        try {
            // Send the email
            $mail->setFrom('danone.institute.indonesia@danonenutrindo.org', 'Danone Institute Indonesia');
            $mail->addReplyTo('danone.institute.indonesia@danonenutrindo.org', 'Danone Institute Indonesia');
            $mail->addAddress($to);
            $mail->Subject = $subject;
            $mail->isHTML(true);
            $mail->Body = $body;
            $mail->send();
            return true;
        } catch (Exception $e) {
            // Handle errors, log, or return false if the email failed to send
            return false;
        }
    }
}
