<?php

class Dashboard extends Controller {

	public function index() {

		$data['title'] = 'Task-Scheduler | Dashboard';
		$this->view('templates/header', $data);
		$this->view('dashboard/index');
		$this->view('templates/footer');
	}

	public function setScheduledDate() {

		if( $this->model('Maintenance_model')->setScheduledDate($_POST) > 0 ) {

			Flasher::setFlash('Scheduled date', ' successfully', ' added', 'success');

			header('Location: ' . BASEURL);
			exit;
		}else {

			Flasher::setFlash('Scheduled date', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL);
			exit;
		}
	}

	public function setActualDate() {

		if( $this->model('Maintenance_model')->setActualDate($_POST) > 0 ) {

			Flasher::setFlash('Actual date', ' successfully', ' added', 'success');

			header('Location: ' . BASEURL);
			exit;
		}else {

			Flasher::setFlash('Actual date', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL);
			exit;
		}
	}

	public function setMaintenanceStatus() {
		// Check if the request is a POST request
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			// Get the maintenance ID from the AJAX request
			$maintenanceId = $_POST['id'];

			$this->model('Maintenance_model')->setMaintenanceStatus($maintenanceId);
		
			// After updating the scheduled date, you can send a response back to the client
			// For example, you can send a success message to indicate that the update was successful
			echo json_encode(['status' => 'success']);
		} else {
			// If the request method is not POST, you can return an error response
			// For example, you can return a 404 Not Found response
			http_response_code(404);
			echo json_encode(['status' => 'error', 'message' => 'Page not found']);
		}
	}

	public function setReportStatus() {
		// Check if the request is a POST request
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			// Get the maintenance ID from the AJAX request
			$maintenanceId = $_POST['id'];

			$this->model('Maintenance_model')->setReportStatus($maintenanceId);

			// After updating the scheduled date, you can send a response back to the client
			// For example, you can send a success message to indicate that the update was successful
			echo json_encode(['status' => 'success']);
		} else {
			// If the request method is not POST, you can return an error response
			// For example, you can return a 404 Not Found response
			http_response_code(404);
			echo json_encode(['status' => 'error', 'message' => 'Page not found']);
		}
	}
}
