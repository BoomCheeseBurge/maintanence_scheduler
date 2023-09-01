<?php

class Client extends Controller {

	public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->client_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->client_manager();
		} else {
			$this->dashboard_engineer();
		}
	}

	public function client_admin() {

		$data['title'] = 'Client';
		$data['identifier'] = 'client_admin';
		$data['activePage'] = 'client';

		$this->view('templates/header', $data);
		$this->view('client/client_admin');
		$this->view('templates/footer', $data);
	}

	public function client_manager() {

		$data['title'] = 'Client';
		$data['identifier'] = 'client_manager';
		$data['activePage'] = 'client';

		$this->view('templates/header', $data);
		$this->view('client/client_manager');
		$this->view('templates/footer', $data);
	}

	public function dashboard_engineer() {

		$data['title'] = 'Dashboard';
		$data['identifier'] = 'dashboard_engineer';
		$data['activePage'] = 'dashboard';

		$this->view('templates/header', $data);
		$this->view('dashboard/dashboard_engineer');
		$this->view('templates/footer', $data);
	}

	public function getAllClient() {
		$clientData = $this->model('Client_model')->getClientData();
		echo json_encode($clientData);
	}


	public function addClient() {

		// Check if there is a duplicate client PIC
		for ($i = 0; $i < count($_POST['picName']); $i++) {
			if ( $this->model('Client_model')->isDuplicateClient($_POST) != 0 ) {
				echo json_encode(['result' => '3']);
				exit;
			}
		}
	
		if( $this->model('Client_model')->addClientData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function editClient() {

		// Check if there is a duplicate client PIC
		if ( $this->model('Client_model')->isDuplicateClient($_POST) == 0 ) {
			
			if( $this->model('Client_model')->editClientData($_POST) > 0 ) {

				echo json_encode(['result' => '1']);
				exit;
			}else {

				echo json_encode(['result' => '2']);
				exit;
			}
		} else {
			echo json_encode(['result' => '3']);
			exit;
		}
	}

	public function delClient() {

		// Retrieve the client_id using the client name
		$clientId = $this->model('Client_model')->getClientIdByName($_POST['clientName']);

		if ($clientId !== null) {
			// Add the clientId and assigneeId to the $_POST data
			$_POST['client_id'] = $clientId;

			$result = $this->model('Client_model')->delClientData($_POST);

			echo json_encode(['result' => $result]);
		} else {
			echo json_encode(['result' => 'clientNotFound']);
		}
	}

	public function editClientPIC() {

		if ($_POST['emailChanged'] == 'true') {
			// Check if there is a duplicate client PIC
			if ( $this->model('Client_model')->isDuplicateClientPIC($_POST) != 0 ) {
				echo json_encode(['result' => '3']);
				exit;
			}
		} 
			
		if( $this->model('Client_model')->editClientPICData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		} else {
			
			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function delClientPIC() {

		$result = $this->model('Client_model')->delClientPICData($_POST);

		echo json_encode(['result' => $result]);
	}

	public function delBulkClientPIC() {

		$result = $this->model('Client_model')->delBulkClientPICData($_POST['ids']);

		echo json_encode(['result' => $result]);
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