<?php

class Dashboard extends Controller {

	public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->dashboard_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->dashboard_manager();
		} elseif ( $_SESSION['role'] == 'engineer' ) {
			$this->dashboard_engineer();
		} 
	}

	public function dashboard_admin() {

		$data['title'] = 'Task-Scheduler | Dashboard';
		$data['identifier'] = 'dashboard_admin';
		$data['activePage'] = 'dashboard';

		$this->view('templates/header', $data);
		$this->view('dashboard/dashboard_admin');
		$this->view('templates/footer', $data);
	}

	public function dashboard_manager() {

		$data['title'] = 'Task-Scheduler | Dashboard';
		$data['identifier'] = 'dashboard_manager';
		$data['activePage'] = 'dashboard';

		$this->view('templates/header', $data);
		$this->view('dashboard/dashboard_manager');
		$this->view('templates/footer', $data);
	}

	public function dashboard_engineer() {

		$data['title'] = 'Task-Scheduler | Dashboard';
		$data['identifier'] = 'dashboard_engineer';
		$data['activePage'] = 'dashboard';

		$this->view('templates/header', $data);
		$this->view('dashboard/dashboard_engineer');
		$this->view('templates/footer', $data);
	}

	public function setScheduledDate() {
        if( $this->model('Maintenance_model')->setScheduledDate($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
        }else {

			echo json_encode(['result' => '2']);
			exit;
            exit;
        }
    }

    public function setActualDate() {
        if( $this->model('Maintenance_model')->setActualDate($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
        }else {

			echo json_encode(['result' => '2']);
			exit;
        }
    }

    public function setReportStatus() {
        if( $this->model('Maintenance_model')->setReportValue($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
			exit;
        }else {

			echo json_encode(['result' => '2']);
			exit;
        }
    }

	public function delBulkMaintenance() {

		$result = $this->model('Maintenance_model')->delBulkMaintenanceData($_POST['ids']);

		echo json_encode(['result' => $result]);
	}
}
