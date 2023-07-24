<?php


class Database {

	private $host = DB_HOST;
	private $user = DB_USER;
	private $pass = DB_PASS;
	private $db_name = DB_NAME;

	// Using PDO driver is more convenient than mysqli as PDO allows flexible transition to other databases
	// dbh -> store connection to database
	// stmt -> store database query
	private $dbh;// Database Handler
	private $stmt;

	public function __construct() {

		// Webserver identity (Data Source Name)
		// Connect to the PDO
		$dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name;

		$option = [
			// Establish continuous secure database connection
			PDO::ATTR_PERSISTENT => true,
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		];

		// Test the PDO connection
		try {
			// 'option' parameter is passed for database connection optimization
			$this->dbh = new PDO($dsn, $this->user, $this->pass, $option);
		} catch(PDOException $e) {
			die($e->getMessage());
		}
	}

	// Generic purpose query
	public function query($query) {

		// Run the query specified by the user
		$this->stmt = $this->dbh->prepare($query);		
	}


	// To handle queries that contain conditions
	public function bind($param, $value, $type = null) {

		if( is_null($type) ) {
			switch ( true ) {
				case is_int($value):
					$type = PDO::PARAM_INT;
					break;
				case is_bool($value):
					$type = PDO::PARAM_BOOL;
					break;
				case is_null($value):
					$type = PDO::PARAM_NULL;
					break;
				default:
					$type = PDO::PARAM_STR;
					break;
			}
		}
		// Identify the value of specified condition
		$this->stmt->bindValue($param, $value, $type);
	}

	// Run the query
	public function execute() {

		$this->stmt->execute();
	}


	// For retrieving mutliple records
	public function resultSet() {

		$this->execute();
		return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
	}


	// For retrieving single record
	public function single() {

		$this->execute();
		return $this->stmt->fetch(PDO::FETCH_ASSOC);
	}


	public function rowCount() {

		// The rowCount() function here belongs to PDO
		return $this->stmt->rowCount();
	}
}