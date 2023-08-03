<?php

class App {
	// Property to define the default controller and method to call
	protected $controller = 'Login';
	protected $method = 'index';
	protected $params = [];
	// List of permitted controllers when signed out. If not satisfied default to Login page.
	protected $controllersSignedOut = array("Login", "Signup", "ForgottenPassword");
	// List of permitted controllers when signed in.  If not satisfied default to Login page.
	protected $controllersSignedIn = array("Client", "Contract", "Dashboard", "Logout", "Maintenance", "User");

	public function __construct() {

		$url = $this->parseURL();

		// If a user has not logged in, set the controller to login
		if ( !isset($_SESSION['role']) ) {
			// Check if there is a file within 'controllers' folder that corresponds with the controller value in URL
			if (isset($url[0])) {
				if (file_exists('../app/controllers/' . $url[0] . '.php')) {
					// Check if the controller exists in the $controllersSignedOut array
					if (in_array(strtolower($url[0]), array_map('strtolower', $this->controllersSignedOut))) {
						$this->controller = $url[0];
						unset($url[0]);
					}
				}
			}
		} else { // else a user has logged in, set the controller to login
			// Check if there is a file within 'controllers' folder that corresponds with the controller value in URL
			if (isset($url[0])) {
				if (file_exists('../app/controllers/' . $url[0] . '.php')) {
					// Check if the controller exists in the $controllersSignedOut array
					if (in_array(strtolower($url[0]), array_map('strtolower', $this->controllersSignedIn))) {
						$this->controller = $url[0];
						unset($url[0]);
					}
				}
			}
		}

		// Call the controller (similar to the include() function)
		require_once '../app/controllers/' . $this->controller . '.php';

		// Instantiate the class of the controller
		$this->controller = new $this->controller;


		// Check if a method exist within the array
		if( isset($url[1]) ) {
			// Check if the method exist in the controller
			if( method_exists($this->controller, $url[1]) ) {
				// If the method exist, then overwrite the default method with the one passed in the URL
				$this->method = $url[1];
				// Remove the method element from the array
				unset($url[1]);
			}
		}


		// Check if a parameter value is passed
		if( !empty($url) ) {
			// Convert '$url' to an array
			$this->params = array_values($url);

		}

		// Run the controller and method, and send the parameter if exist
		call_user_func_array([$this->controller, $this->method], $this->params);
	}

	// Retrieve the URL and breakdown into the necessary elements
	// Purposely done to create a pretty URL
	public function parseURL() {

		// Check if there is a URL parameter value passed
		// e.g. ?url=<URL param here>
		if( isset($_GET['url']) ) {
			// Trim a character from the end of the string in 'url' 
			$url = rtrim($_GET['url'], '/');
			// Filter 'url' from any uncommon characters
			$url = filter_var($url, FILTER_SANITIZE_URL);
			// Explode the URL into an array of elements
			$url = explode('/', $url);
			return $url;
		}else{
			$url = [$this->controller];
			return $url;
		}
	}
}