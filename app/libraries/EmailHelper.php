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
        $company_name = "PT. ITPro Citra Indonesia";
        $email_from = "johndoe240600@gmail.com";
        $mail->Host = "smtp.gmail.com";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "johndoe240600@gmail.com";
        $mail->Password = "ablgfvmmqqywuktd";
        $mail->SMTPSecure = "ssl"; //TLS
        $mail->Port = 465; // OR 587
        try {
            // Send the email
            $mail->setFrom($email_from, $company_name);
            $mail->addReplyTo($email_from, $company_name);
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
