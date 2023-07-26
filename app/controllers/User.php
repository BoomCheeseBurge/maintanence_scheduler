<?php

class User extends Controller{

    public function index() {

        $data['title'] = 'Task-Scheduler | User';
        $data['identifier'] = 'user';

		$this->view('templates/header', $data);
		$this->view('user/index');
		$this->view('templates/footer', $data);
    }

    public function addUser() {

		if( $this->model('User_model')->addNewUser($_POST) > 0 ) {

			Flasher::setFlash('User', ' successfully', ' added', 'success');

			header('Location: ' . BASEURL);
			exit;
		}else {

			Flasher::setFlash('User', ' failed', ' to be added', 'danger');

			header('Location: ' . BASEURL);
			exit;
		}
	}

	public function editUser() {

		if( $this->model('User_model')->editUserData($_POST) > 0 ) {

			Flasher::setFlash('User', ' successfully', ' saved', 'success');

			header('Location: ' . BASEURL);
			exit;
		}else {

			Flasher::setFlash('User', ' failed', ' to be saved', 'danger');

			header('Location: ' . BASEURL);
			exit;
		}
	}

	public function searchAssignee()
	{
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			// Retrieve the search query from the request
			$searchQuery = $_GET['keyword'];
	
			// Call the model's method to get the search results
			$results = $this->model('User_model')->getAssignee($searchQuery);
	
			// Return the search results as a JSON response
			header('Content-Type: application/json');
			echo json_encode($results);
			exit; // Make sure to exit after sending the JSON response
		}
	}
}