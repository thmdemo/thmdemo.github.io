<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

$mail = new PHPMailer(true);
$message = "Name:".$_POST['name']." Email: ".$_POST['email']." Subject: ".$_POST['subject']." Message: ".$_POST['message'];

try {
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp-relay.sendinblue.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'humbeestudio@gmail.com';                     //SMTP username
    // $mail->Password   = 'tjQ1DrKSWzpbCBE5';                               //SMTP password
    $mail->Password   = 'HOZ4SwY765BaRDEk';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                   

    //Recipients
    $mail->setFrom('humbeestudio@gmail.com', 'Mailer'); 
    $mail->addAddress('navya@ekayuimpex.com', 'test'); 

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $_POST['subject'];
    $mail->Body = $message;

    $mail->send();
    echo "Message Sent OK";
} catch (Exception $e) {
  echo $e->getMessage(); //Boring error messages from anything else!
}