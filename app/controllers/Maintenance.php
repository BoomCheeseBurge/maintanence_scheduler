<?php

class Maintenance extends Controller {

	public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->maintenance_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->maintenance_manager();
		} else {
            $this->dashboard_engineer();
        }
	}

    public function maintenance_admin() {

        $data['title'] = 'Maintenance Schedule';
        $data['identifier'] = 'maintenance';
        $data['activePage'] = 'maintenance';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
		$this->view('templates/footer', $data);
    }

    public function maintenance_manager() {

        $data['title'] = 'Maintenance Schedule';
        $data['identifier'] = 'maintenance';
        $data['activePage'] = 'maintenance';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
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

    // For Maintenance List Bootstrap Table
    public function getMaintenanceHistory() {
        $maintenanceData = $this->model('Maintenance_model')->getHistoryData();

        echo json_encode($maintenanceData);
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

                    header('Location: ' . BASEURL . '/Dashboard');
                    exit;
                }else {

                    Flasher::setFlash('Maintenance schedule', ' failed', ' to be added', 'danger');
        
                    header('Location: ' . BASEURL . '/Dashboard');
                    exit;
                }
            } else {
                Flasher::setFlash('Maintenance', ' already', ' exist', 'warning');
	
				header('Location: ' . BASEURL . '/Dashboard');
				exit;
            }
        }else {

            Flasher::setFlash('Maintenance schedule', ' failed', ' to be added', 'danger');

            header('Location: ' . BASEURL . '/Dashboard');
            exit;
        }
	}

    public function editMaintenance() {

        if ($_POST['anyChange'] == 'true') {
            // Check if there is a duplicate contract
            if ( $this->model('Maintenance_model')->isDuplicatePM($_POST) ) {
                echo json_encode(['result' => '3']);
                exit;
            }
        }

        if( $this->model('Maintenance_model')->editMaintenanceData($_POST) > 0 ) {

            echo json_encode(['result' => '1']);
            exit;
        }else {

            echo json_encode(['result' => '2']);
            exit;
        }
	}

    public function delMaintenance() {

        $result =  $this->model('Maintenance_model')->delMaintenanceData($_POST['id']);

        echo json_encode(['result' => $result]);
    }

    public function delBulkMaintenance() {

		$result = $this->model('Maintenance_model')->delBulkMaintenanceData($_POST['ids']);

		echo json_encode(['result' => $result]);
	}

    public function getSingleMaintenanceData() {
		echo json_encode($this->model('Maintenance_model')->getMaintenanceById($_POST['id']));
	}

    public function getDataForEngineerPerformance() {
        $lateReportData = $this->model('Maintenance_model')->getDataForEngineerPerformances();

        echo json_encode($lateReportData);
	}

    public function getYearlyEngineerPerformance() {

        $year = $_GET['year'];   // Make sure to sanitize and validate the input
        
        $lateReportData = $this->model('Maintenance_model')->getYearlyEngineerPerformanceData($year);

        echo json_encode($lateReportData);
	}

    public function getMonthlyEngineerPerformance() {
        // Assuming you receive the month and year from the AJAX request
        $month = $_GET['month']; // Make sure to sanitize and validate the input
        $year = $_GET['year'];   // Make sure to sanitize and validate the input
    
        // Call the model function with the $month and $year parameters
        $lateReportData = $this->model('Maintenance_model')->getMonthlyEngineerPerformanceData($month, $year);
    
        echo json_encode($lateReportData);
    }

    public function filterTable() {
        $selectedMonth = $_POST['month'];
        $selectedYear = $_POST['year'];
    
        $filteredTableData = $this->model('Maintenance_model')->filterTableData($selectedMonth, $selectedYear);
    
        echo json_encode($filteredTableData);
    }

    public function filterMaintenance() {
        echo json_encode($this->model('Maintenance_model')->filterMaintenanceData($_POST['selectedValue']));
    }

    public function filterEngineerDashboard() {
        echo json_encode($this->model('Maintenance_model')->filterEngineerData($_POST['selectedValue']));
    }
}