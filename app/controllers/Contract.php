<?php

class Contract extends Controller {

    public function index() {

		$data['title'] = 'Task-Scheduler | Contract';
		$data['identifier'] = 'contract';

		$this->view('templates/header', $data);
		$this->view('contract/index');
		$this->view('templates/footer', $data);
	}

	public function getAllContract() {
		$contractData = $this->model('Contract_model')->getContractData();
		echo json_encode($contractData);
	}

	public function addContract() {

		// Retrieve the client_id using the client name
		$clientId = $this->model('Client_model')->getClientIdByName($_POST['clientName']);
		// Retrieve the engineer_id using the assignee name
		$assigneeId = $this->model('User_model')->getEngineerIdByAssignee($_POST['assignee']);

		// If the client_id and assigneeId is found, add the data
		if ($clientId !== null && $assigneeId !== null) {
			// Add the clientId and assigneeId to the $_POST data
			$_POST['client_id'] = $clientId;
			$_POST['assignee_id'] = $assigneeId;

			if( $this->model('Contract_model')->addContractData($_POST) > 0 ) {

				Flasher::setFlash('Contract', ' successfully', ' added', 'success');

				header('Location: ' . BASEURL . '/contract');
				exit;
			}
		}else {

			Flasher::setFlash('Contract', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}
	}

	public function editContract() {

		// Retrieve the client_id using the client name
		$clientId = $this->model('Client_model')->getClientIdByName($_POST['clientName']);
		// Retrieve the engineer_id using the assignee name
		$assigneeId = $this->model('User_model')->getEngineerIdByAssignee($_POST['assignee']);

		// If the client_id and assigneeId is found, add the data
		if ($clientId !== null && $assigneeId !== null) {
			// Add the clientId and assigneeId to the $_POST data
			$_POST['client_id'] = $clientId;
			$_POST['assignee_id'] = $assigneeId;

		if( $this->model('Contract_model')->editContractData($_POST) > 0 ) {

			Flasher::setFlash('Contract', ' successfully', ' saved', 'success');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}
		}else {

			Flasher::setFlash('Contract', ' failed', ' to be saved', 'danger');

			header('Location: ' . BASEURL . '/contract');
			exit;
		}
	}

	public function getEditContractData() {
		echo json_encode($this->model('Contract_model')->getEditContractById($_POST['id']));
	}

	public function getSingleContractData() {
		echo json_encode($this->model('Contract_model')->getContractById($_POST['id']));
	}
}