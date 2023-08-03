<?php
// No closing tag since the content is pure PHP

// Start session if no session id is detected
if( !session_id() ) session_start();


// Call all the necessary files for the MVC also known as 'bootstrapping'
require_once '../app/init.php';

// Instantiate the 'App' class
$app = new App;

// Run the migrations
// $migration1 = new CreateUserTable($db);
// $migration1->up();

// $migration2 = new CreateClientTable($db);
// $migration2->up();

// $migration3 = new CreatePicTable($db);
// $migration3->up();

// $migration4 = new CreateContractTable($db);
// $migration4->up();

// $migration5 = new CreateMaintenanceTable($db);
// $migration5->up();
