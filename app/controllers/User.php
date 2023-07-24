<?php

class User extends Controller{

    public function index() {

        $data['title'] = 'Task-Scheduler | User';
        $data['identifier'] = 'user';

		$this->view('templates/header', $data);
		$this->view('user/index');
		$this->view('templates/footer', $data);
    }
}