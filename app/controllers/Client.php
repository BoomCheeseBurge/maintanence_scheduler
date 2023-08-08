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

		$this->view('templates/header', $data);
		$this->view('client/client_admin');
		$this->view('templates/footer', $data);
	}

	public function client_manager() {

		$data['title'] = 'Task-Scheduler | Client';
		$data['identifier'] = 'client_manager';

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

			// Set the parameter values for the flash message
			Flasher::setFlash('Client', ' successfully', ' added', 'success');

			// Redirect to the main page of the mahasiswa
			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}

	public function editClient() {

		if( $this->model('Client_model')->editClientData($_POST) > 0 ) {

			Flasher::setFlash('Client', 'successfully', ' edited', 'success');

			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client', 'failed', ' to edit', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}

	public function delClient() {

		if( $this->model('Client_model')->delClientData($_POST) > 0 ) {

			Flasher::setFlash('Client', 'successfully', ' deleted', 'success');

			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client', 'failed', ' to be deleted', 'danger');

			header('Location: ' . BASEURL . '/client');
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

				Flasher::setFlash('Client PIC', ' successfully', ' edited', 'success');

				header('Location: ' . BASEURL . '/client');
				exit;
			}
		}else {

			Flasher::setFlash('Client PIC', ' failed', ' to edit', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}

	public function delClientPIC() {

		if( $this->model('Client_model')->delClientPICData($_POST) > 0 ) {

			Flasher::setFlash('Client PIC', ' successfully', ' deleted', 'success');

			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client PIC', ' failed', ' to be deleted', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}

	public function delBulkClientPIC() {

		$rowCount = $this->model('Client_model')->delBulkClientPICData($_POST['ids']);
		$response = ['rowCount' => $rowCount];
		echo json_encode($response);
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