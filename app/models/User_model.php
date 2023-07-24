<?php

class User_model {

	private $name = 'anonymous';

	public function getUser() {

		return $this->name;
	}
}