<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "../app/libraries/PHPMailer/src/PHPMailer.php";
require_once "../app/libraries/PHPMailer/src/Exception.php";
require_once "../app/libraries/PHPMailer/src/SMTP.php";

class ForgottenPassword_model {
    private $table = 'user';
    private $db;
    
    public function __construct()
    {
        $this->db = new Database;
    }

    public function addToken($data)
    {
        $query = "UPDATE " . $this->table . " SET
                    token = :token,
                    token_date = :oneHourLater
                  WHERE email = :email";

        $this->db->query($query);
        $this->db->bind('token', $data['token']);
        $this->db->bind('oneHourLater', $data['oneHourLater']);
        $this->db->bind('email', $data['email']);
        
        $this->db->execute();

        return $this->db->rowCount();
    }

    public function send_password_reset_email($email, $token)
    {
        $to=$email;
        $email_subject = "Action required to reset your password";
        $email_from = "danone.institute.indonesia@danonenutrindo.org"; 
    
        $email_message = '<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Recovery Instructions</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f8f8; margin: 0; padding: 0;">
        
          <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 18px; font-weight: bold; text-align: center;">Password Recovery Instructions</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p>We received a request to reset your password for your account at ITPro Task Scheduler. Don\'t worry; we\'re here to help you regain access to your account.</p>
                <p style="text-align: center;">
                  <a href="'. BASEURL . '/ForgottenPassword/reset_password_action?token='.$token . '" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">Reset Password</a>
                </p>
                <p style="text-align: center; margin-top: 20px;">(If the link does not work, copy and paste it into your web browser\'s address bar.)</p>
                <p>Once you click the link, you will be redirected to a page where you can enter a new password for your account. Choose a strong and secure password that you haven\'t used before.</p>
                <p style="text-align: center; margin-top: 20px;">
                  <strong>Please note:</strong> The reset token is valid for <strong>ONE HOUR ONLY</strong>. After one hour, the link will expire, and you\'ll need to request a new password reset link.
                </p>
                <p style="text-align: center; margin-top: 20px;">
                  For security reasons, please do not share this email with anyone. If you did not request a password reset or believe this email was sent in error, please ignore it. Your account will remain secure, and no changes will be made.
                </p>
                <p>If you have any concerns or need further assistance, don\'t hesitate to contact our support team at <a href="mailto:dedyandy@gmail.com">dedyandy@gmail.com</a>.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>';

        // Prepare email to be sent
        $mail = new PHPMailer();
        $mail->Host = "mail.danonenutrindo.org";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "danone.institute.indonesia@danonenutrindo.org";
        $mail->Password = "T4TnL1p4Ok";
        $mail->SMTPSecure = "ssl"; //TLS
        $mail->Port = 465; //587

        $mail->setFrom('danone.institute.indonesia@danonenutrindo.org', 'Danone Institute Indonesia');
        $mail->addReplyTo('danone.institute.indonesia@danonenutrindo.org', 'Danone Institute Indonesia');
        $mail->Subject = $email_subject;
        $mail->isHTML(true);

        $mail->Body = $email_message;
        $mail->addAddress($to);

        // If send email fails tell the subscriber
        if (!$mail->send()) { 
            return false;
        } 
        else {
            return true;
        }
    }

    public function isTokenCorrect($token)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE token = :token";
        $this->db->query($query);
        $this->db->bind('token', $token);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function isTokenNotExpired($token)
    {
        $now = date_create()->format('Y-m-d H:i:s');
        
        $query = "SELECT * FROM " . $this->table . " WHERE token = :token AND token_date >= :now";
        $this->db->query($query);
        $this->db->bind('token', $token);
        $this->db->bind('now', $now);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function changeOldToNewPassword($data)
    {
        $hash = password_hash($data['newPassword'].PEPPER, PASSWORD_DEFAULT); 

        $query = "UPDATE " . $this->table . " SET
                    password = :newPassword
                  WHERE token = :token";

        $this->db->query($query);
        $this->db->bind('newPassword', $hash);
        $this->db->bind('token', $data['token']);
        
        $this->db->execute();

        return $this->db->rowCount();
    }

}

