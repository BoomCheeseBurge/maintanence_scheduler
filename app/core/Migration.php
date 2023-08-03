<?php
// migrations/Migration.php

class Migration
{
    protected $db;

    public function __construct()
    {
  		$this->db= new Database;
    }

    public function up()
    {
        // Implement the migration up logic here
        // This method will be called to apply the migration
    }

    public function down()
    {
        // Implement the migration down logic here
        // This method will be called to rollback the migration
    }
}
