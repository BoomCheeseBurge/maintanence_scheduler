<?php

class Contract extends Controller {

    public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->contract_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->contract_manager();
		}
	}

	public function contract_admin() {

		$data['title'] = 'Task-Scheduler | Contract';
		$data['identifier'] = 'contract_admin';
		$data['activePage'] = 'contract';

		$this->view('templates/header', $data);
		$this->view('contract/contract_admin');
		$this->view('templates/footer', $data);
	}

	public function contract_manager() {

		$data['title'] = 'Task-Scheduler | Contract';
		$data['identifier'] = 'contract_manager';
		$data['activePage'] = 'contract';

		$this->view('templates/header', $data);
		$this->view('contract/contract_manager');
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

			// Check if there is a duplicate contract
			if ( $this->model('Contract_model')->isDuplicateContract($_POST) == 0 ) {

				if( $this->model('Contract_model')->addContractData($_POST) > 0 ) {

					echo json_encode(['result' => '1']);
					exit;
				}else {

					echo json_encode(['result' => '2']);
					exit;
				}
			}else {

				echo json_encode(['result' => '3']);
				exit;
			}
		}else {

			echo json_encode(['result' => '4']);
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

			// Check if there is a duplicate contract
			if ( $this->model('Contract_model')->isDuplicateContract($_POST) == 0 ) {

				if( $this->model('Contract_model')->editContractData($_POST) > 0 ) {

					echo json_encode(['result' => '1']);
					exit;
				}else {

					echo json_encode(['result' => '2']);
					exit;
				}
			}else {

				echo json_encode(['result' => '3']);
				exit;
			}
		}else {

			echo json_encode(['result' => '4']);
			exit;
		}
	}

	public function delContract() {

		if( $this->model('Contract_model')->delContractData($_POST['id']) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function delBulkContract() {

		if( $this->model('Contract_model')->delBulkContractData($_POST['ids']) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
		}else {

			echo json_encode(['result' => '2']);
			exit;
		}
	}

	public function getEditContractData() {
		echo json_encode($this->model('Contract_model')->getEditContractById($_POST['id']));
	}

	public function getSingleContractData() {
		echo json_encode($this->model('Contract_model')->getContractById($_POST['id']));
	}

	public function filterTable() {
    
        $filteredTableData = $this->model('Contract_model')->filterTableData($_POST['clientName'], $_POST['endMonth'], $_POST['endYear']);
    
        echo json_encode($filteredTableData);
    }
}