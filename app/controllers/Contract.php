<?php

class Contract extends Controller {

    public function index() {

		$data['title'] = 'Task-Scheduler | Contract';
		$data['identifier'] = 'contract';

		$this->view('templates/header', $data);
		$this->view('contract/index');
		$this->view('templates/footer', $data);
	}

    public function searchContract()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			// Retrieve the search query from the request
			$searchQuery2 = $_GET['keyword'];
	
			// Call the model's method to get the search results
			$results = $this->model('Device_model')->getDeviceTag($searchQuery2);
	
			// Return the search results as a JSON response
			header('Content-Type: application/json');
			echo json_encode($results);
			exit; // Make sure to exit after sending the JSON response
		}
	}

	public function addContract() {

		if( $this->model('Contract_model')->addContractData($_POST) > 0 ) {

			Flasher::setFlash('Contract', ' successfully', ' added', 'success');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}else {

			Flasher::setFlash('Contract', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}
	}

	public function editContract() {

		if( $this->model('Contract_model')->editContractData($_POST) > 0 ) {

			Flasher::setFlash('Contract', ' successfully', ' saved', 'success');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}else {

			Flasher::setFlash('Contract', ' failed', ' to be saved', 'danger');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}
	}
}