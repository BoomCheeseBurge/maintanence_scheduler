<?php
// No closing tag since the content is pure PHP

// Set time zone to Jakarta Indonesia
date_default_timezone_set('Asia/Jakarta');

// Start session if no session id is detected
if( !session_id() ) session_start();


// Call all the necessary files for the MVC also known as 'bootstrapping'
require_once '../app/init.php';

// Instantiate the 'App' class
$app = new App;