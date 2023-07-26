<?php

class Client extends Controller {

	public function index() {

		$data['title'] = 'Task-Scheduler | Client';
		$data['identifier'] = 'client';

		$this->view('templates/header', $data);
		$this->view('client/index');
		$this->view('templates/footer', $data);
	}

	public function newClient() {
		$data['title'] = 'Task-Scheduler | NewClient';
		$data['identifier'] = 'newClient';

		$this->view('templates/header', $data);
		$this->view('client/newClient');
		$this->view('templates/footer', $data);
	}

	public function getClients() {
		$clientData = $this->model('Client_model')->getAllClient();
		echo json_encode($clientData);
	}


	public function addClient() {

		// $_POST larger than zero indicates that there is new record found
		// then that means the new data is successfully passed into the webserver
		if( $this->model('Client_model')->addClientData($_POST) > 0 ) {

			// Set the parameter values for the flash message
			Flasher::setFlash('Client', 'successfully', ' added', 'success');

			// Redirect to the main page of the mahasiswa
			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client', 'failed', ' to be added', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}


	public function delClient($id) {

		if( $this->model('Client_model')->delClientData($id) > 0 ) {

			Flasher::setFlash('Client', 'successfully', ' deleted', 'success');

			header('Location: ' . BASEURL . '/client');
			exit;
		}else {

			Flasher::setFlash('Client', 'failed', ' to be deleted', 'danger');

			header('Location: ' . BASEURL . '/client');
			exit;
		}
	}


	public function getEdit() {

		// Previously, the data was in the form of an associative array
		// By adding the echo statement, the JSON-encoded data will be sent back as the response to the AJAX request,
		// allowing the success function in the AJAX request to handle the data and populate the form fields accordingly.
		echo json_encode($this->model('Client_model')->getClientById($_POST['id']));
	}


	public function edit() {

		if( $this->model('Client_model')->editDataClient($_POST) > 0 ) {

			Flasher::setFlash('Client', 'successfully', ' edited', 'success');

			header('Location: ' . BASEURL . '/dashboard');
			exit;
		}else {

			Flasher::setFlash('Client', 'failed', ' to edit', 'danger');

			header('Location: ' . BASEURL . '/dashboard');
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
}