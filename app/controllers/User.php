<?php
// Include the EmailHelper class
require_once '../app/libraries/EmailHelper.php';

class User extends Controller{

	public function index() {

		if ( $_SESSION['role'] == 'admin' ) {
			$this->user_admin();
		} elseif ( $_SESSION['role'] == 'manager' ) {
			$this->user_manager();
		}
	}

	public function user_admin() {

        $data['title'] = 'Task-Scheduler | User';
        $data['identifier'] = 'user_admin';

		$this->view('templates/header', $data);
		$this->view('user/user_admin');
		$this->view('templates/footer', $data);
    }

	public function user_manager() {

        $data['title'] = 'Task-Scheduler | User';
        $data['identifier'] = 'user_manager';

		$this->view('templates/header', $data);
		$this->view('user/user_manager');
		$this->view('templates/footer', $data);
    }

	public function getAllUser(){
		$this->model('User_model')->getAllUser();
	}

    public function addUser() {

		if ( $this->model('Signup_model')->isEmailTaken($_POST['email']) > 0 )  {
			
			echo json_encode(['result' => '1']);

		} elseif ( $this->model('User_model')->addNewUser($_POST) > 0 ) {
			
			$to = $_POST['email'];
			$subject = "Welcome to ITPro Task Scheduler - Your Account Details";
		
			$body = '<!DOCTYPE html>
			<html lang="en">
			<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Welcome to ITPro Task Scheduler - Your Account Details</title>
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f8f8; margin: 0; padding: 0;">
			
			<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
				<tr>
				<td style="padding: 20px;">
					<p style="font-size: 18px; font-weight: bold; text-align: center;">Welcome to ITPro Task Scheduler</p>
				</td>
				</tr>
				<tr>
				<td style="padding: 20px;">
					<p>Dear '. $_POST['name'] .',</p>
					<p>We welcome you to our ITPro Task Scheduler! Your account has been successfully created, and you can now start exploring all the features and benefits we offer.</p>
					<p>Here are your account details:</p>
					<ul>
						<li><strong>Email:</strong> ' . $_POST['email'] .'</li>
						<li><strong>Password:</strong> ' . $_SESSION['temppw'] . '</li>
					</ul>
					<p>Please follow the steps below to sign in to your account:</p>
					<ol>
						<li>Click on the <a href="' . BASEURL . '/login">Login Task Scheduler</a></li>
						<li>Enter your email and the password provided.</li>
					</ol>
					<p>If you have any questions or encounter any issues during the sign-in process, feel free to contact our support team at <a href="mailto:' . SUPPORT_EMAIL . '">' . SUPPORT_EMAIL . '</a> or call us at ' . SUPPORT_PHONE_NUMBER . ' We\'re here to assist you every step of the way.</p>
					<p>Best regards,<br>
					ITPro Admin Task Scheduler
				</td>
				</tr>
			</table>
			</body>
			</html>';

			// Use the EmailHelper to send an email
			if (EmailHelper::sendEmail($to, $subject, $body)) {
				echo json_encode(['result' => '2']);
			} else {
				echo json_encode(['result' => '3']);
			}	
		} else {
			echo json_encode(['result' => '4']);
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

	public function delete() {

		$result = $this->model('User_model')->deleteUser($_POST['id']);
		
		echo json_encode(['result' => $result]);
	}


	public function saveUser() {

		if( $this->model('User_model')->saveUserData($_POST) > 0 ) {

			echo json_encode(['result' => '1']);
		}else {

			echo json_encode(['result' => '2']);
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

	public function getUserById(){

		echo json_encode($this->model('Login_model')->getUserById($_POST['id']));
	}

	public function updateUserProfile(){
		if ( $this->model('User_model')->updateUserProfile($_POST) > 0 ){
			echo "Profile updated successfully.";
		} else {
			echo "Error uploading the photo.";
		}
	}

        
	public function changePassword(){
		// Check if the request method is POST
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			echo json_encode($this->model('User_model')->changeUserPassword($_POST));

		} else {
			// If the request method is not POST, return an error response
			http_response_code(405); // Method Not Allowed
			echo json_encode(['result' => '4']);
		}
	}
}