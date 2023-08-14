<?php

class Client extends Controller {

	public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->client_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->client_manager();
		}
	}

	public function client_admin() {

		$data['title'] = 'Task-Scheduler | Client';
		$data['identifier'] = 'client_admin';
		$data['activePage'] = 'client';

		$this->view('templates/header', $data);
		$this->view('client/client_admin');
		$this->view('templates/footer', $data);
	}

	public function client_manager() {

		$data['title'] = 'Task-Scheduler | Client';
		$data['identifier'] = 'client_manager';
		$data['activePage'] = 'client';

		$this->view('templates/header', $data);
		$this->view('client/client_manager');
		$this->view('templates/footer', $data);
	}

	public function getAllClient() {
		$clientData = $this->model('Client_model')->getClientData();
		echo json_encode($clientData);
	}


	public function addClient() {

		// $_POST larger than zero indicates that there is new record found
		// then that means the new data is successfully passed into the webserver
		if( $this->model('Client_model')->addClientData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function editClient() {

		if( $this->model('Client_model')->editClientData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function delClient() {

		if( $this->model('Client_model')->delClientData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function editClientPIC() {

		// Retrieve the client_id using the client name
		$clientId = $this->model('Client_model')->getClientIdByName($_POST['name']);

		// If the client_id and assigneeId is found, add the data
		if ($clientId !== null) {
			$_POST['client_id'] = $clientId;

			if( $this->model('Client_model')->editClientPICData($_POST) > 0 ) {

				echo json_encode(['result' => '1']);
				exit;
			} else {
				
				echo json_encode(['result' => '2']);
				exit;
			}
		}else {

			echo json_encode(['result' => '3']);
			exit;
		}
	}

	public function delClientPIC() {

		if( $this->model('Client_model')->delClientPICData($_POST['id']) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function delBulkClientPIC() {

		if( $this->model('Client_model')->delBulkClientPICData($_POST['ids']) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function searchClientName()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			// Retrieve the search query from the request
			$searchQuery = $_GET['keyword'];
	
			// Call the model's method to get the search results
			$results = $this->model('Client_model')->getClientName($searchQuery);
	
			// Return the search results as a JSON response
			header('Content-Type: application/json');
			echo json_encode($results);
			exit; // Make sure to exit after sending the JSON response
		}
	}

	public function getClientPICData() {
		echo json_encode($this->model('Client_model')->getClientPICById($_POST['id']));
	}
}