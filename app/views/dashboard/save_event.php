<?php

$event_name = $_POST['event_name'];
$event_start_date = date('y-m-d', strtotime($_POST['event_start_date']));
$event_end_date = date('y-m-d', strtotime($_POST['event_end_date']));

// $insert_query = "INSERT INTO `calendar_event_master` (`event_name`, `event_start_date`, `event_end_date`, `event_end_date`) VALUES ('".$event_name."','".$event_start_date."','".$event_end."')";

$update_query = "UPDATE calendar_event_master SET event_name = ".$event_name.", event_start_date = ".$event_start_date.", event_end_date = ".$event_end." WHERE event_id = '".$event_id."'";