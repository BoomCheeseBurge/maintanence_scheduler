<?php

// This is the main controller class
// Any controllers within the 'controllers' folder will be extended to this main class
class Controller {

	public function view( $view, $data=[] ) {

		// Position ourselves at the directory of 'index.php'
		require_once '../app/views/' . $view . '.php';
	}

	public function model( $model ) {

		require_once '../app/models/' . $model . '.php';
		return new $model;
	}
}