<?php

class Maintenance extends Controller {

    public function index() {

        $data['title'] = 'Task-Scheduler | MaintenanceSchedule';
        $data['identifier'] = 'history';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
		$this->view('templates/footer', $data);
    }

    public function history_admin() {

        $data['title'] = 'Task-Scheduler | MaintenanceSchedule';
        $data['identifier'] = 'history';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
		$this->view('templates/footer', $data);
    }

    public function history_manager() {

        $data['title'] = 'Task-Scheduler | MaintenanceSchedule';
        $data['identifier'] = 'history';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
		$this->view('templates/footer', $data);
    }

    // For Admin Bootstrap Table
    public function getScheduleList() {
        $maintenanceData = $this->model('Maintenance_model')->getMaintenanceList();

		echo json_encode($maintenanceData);
    }

    // For Engineer Bootstrap Table
    public function getMaintenanceSchedule() {
        $maintenanceData = $this->model('Maintenance_model')->getMaintenanceData();

		echo json_encode($maintenanceData);
    }

    // For Maintenance History Bootstrap Table
    public function getMaintenanceHistory() {
        $historyData = $this->model('Maintenance_model')->getHistoryData();

        echo json_encode($historyData);
    }

	public function createMaintenance() {

        // Retrieve the client_id using the client name
		$clientId = $this->model('Client_model')->getClientIdByName($_POST['name']);
		// Retrieve the engineer_id using the assignee name
		$assigneeId = $this->model('User_model')->getEngineerIdByAssignee($_POST['full_name']);
        // Retrieve the contract_id using the SOP number
		$contractId = $this->model('Contract_model')->getContractIdBySOP($_POST['sop_number']);

        // If the client_id, assignee_id, and contract_id are found, add the data
		if ($clientId !== null && $assigneeId !== null && $contractId !== null) {
			// Add the clientId, assigneeId, and contractId to the $_POST data
			$_POST['client_id'] = $clientId;
			$_POST['assignee_id'] = $assigneeId;
			$_POST['contract_id'] = $contractId;

            if(!$this->model('Maintenance_model')->isDuplicateMaintenance($_POST)) {

                if( $this->model('Maintenance_model')->addMaintenanceData($_POST) > 0 ) {

                    Flasher::setFlash('Maintenance schedule', ' successfully', ' added', 'success');

                    header('Location: ' . BASEURL . '/dashboard');
                    exit;
                }else {

                    Flasher::setFlash('Maintenance schedule', ' failed', ' to be added', 'danger');
        
                    header('Location: ' . BASEURL . '/dashboard');
                    exit;
                }
            } else {
                Flasher::setFlash('Maintenance', ' already', ' exist', 'warning');
	
				header('Location: ' . BASEURL . '/contract');
				exit;
            }
        }else {

            Flasher::setFlash('Maintenance schedule', ' failed', ' to be added', 'danger');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }
	}

    public function setScheduledDate() {
        if( $this->model('Maintenance_model')->setScheduledDate($_POST) > 0 ) {

            Flasher::setFlash('Scheduled date', ' successfully', ' set', 'success');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }else {

            Flasher::setFlash('Scheduled date', ' failed', ' to be set', 'danger');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }
    }

    public function setActualDate() {
        if( $this->model('Maintenance_model')->setActualDate($_POST) > 0 ) {

            Flasher::setFlash('Actual date', ' successfully', ' set', 'success');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }else {

            Flasher::setFlash('Actual date', ' failed', ' to be set', 'danger');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }
    }

    public function setReportStatus() {
        if( $this->model('Maintenance_model')->setReportValue($_POST['id']) > 0 ) {

            Flasher::setFlash('Report', ' successfully', ' delivered', 'success');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }else {

            Flasher::setFlash('Report', ' failed', ' to be marked', 'danger');

            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }
    }

    public function getDataForEngineerPerformance() {
        $lateReportData = $this->model('Maintenance_model')->getDataForEngineerPerformances();

        echo json_encode($lateReportData);
	}
}