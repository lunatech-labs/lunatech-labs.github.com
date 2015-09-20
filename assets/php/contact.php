<?php

$address = $_POST['emailAddress'];
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = 'You have been contacted by ' . $name;
$body = 'Name: ' . $name . PHP_EOL . PHP_EOL . 'Email: ' . $email . PHP_EOL . PHP_EOL . $message;
$headers = 'From: ' . $email . PHP_EOL . 'Reply-To: ' . $email . PHP_EOL . 'MIME-Version: 1.0' . PHP_EOL . 'Content-type: text/plain; charset=utf-8' . PHP_EOL . 'Content-Transfer-Encoding: quoted-printable' . PHP_EOL;
mail($address, $subject, $body, $headers);

?>