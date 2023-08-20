<?php

class Flasher {

	// static function to avoid the need to instantiate this class
	// Retrieve the necessary data components for the flash message
	public static function setFlash($column, $message, $action, $type) {

		$_SESSION['flash'] = [

			'column' => $column,
			'message' => $message,
			'action' => $action,
			'type' => $type
		];
	}

	// Display the flash message of a successful scheduled date input
	public static function flash() {

		if( isset($_SESSION['flash']) ) {

			echo '
				<div class="alert alert-' . $_SESSION['flash']['type'] . ' alert-dismissible fade show" role="alert">
					'. $_SESSION['flash']['column'] .' <strong>' . $_SESSION['flash']['message'] . '</strong>' . $_SESSION['flash']['action'] . '.
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			';

			// Session only valid just this once and then removed
			unset($_SESSION['flash']);
		}
	}
}