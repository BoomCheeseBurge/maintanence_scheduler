<?php

class Maintenance_model {

	private $table = 'calendar_event_master';
	private $db;


	public function __construct() {

		$this->db = new Database;
	}

    public function getMaintenanceSchedule() {
        $this->db->query('SELECT * FROM ' . $this->table);
        return $this->db->resultSet();
    }

	public function addMaintenance($data) {

		$query = "INSERT INTO maintenance_schedule VALUE
					('', :nama, :nrp, :email, :jurusan)";

		$this->db->query($query);
		$this->db->bind('nama', $data['nama']);
		$this->db->bind('nrp', $data['nrp']);
		$this->db->bind('email', $data['email']);
		$this->db->bind('jurusan', $data['jurusan']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setScheduledDate($data) {

		$query = "UPDATE maintenance_schedule SET
					event_nama = :setdate
				WHERE event_id = :id
		";

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind('id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setActualDate($data) {

		$query = "UPDATE maintenance_schedule SET
					event_nama = :setdate
				WHERE event_id = :id
		";

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind('id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setMaintenanceStatus($maintenanceId) {

		$query = "UPDATE maintenance_schedule SET
					event_nama = 'finished'
				WHERE event_id = :id
		";

		$this->db->query($query);
		$this->db->bind('id', $maintenanceId);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setReportStatus($maintenanceId) {

		$query = "UPDATE maintenance_schedule SET
					event_nama = 'delivered'
				WHERE event_id = :id
		";

		$this->db->query($query);
		$this->db->bind('id', $maintenanceId);

		$this->db->execute();

		return $this->db->rowCount();
	}

	// public function getMahasiswaById($id) {

	// 	// :id will store the binded data (to prevent SQL injection)
	// 	$this->db->query('SELECT * FROM ' . $this->table . ' WHERE id=:id');
	// 	$this->db->bind('id', $id);
	// 	return $this->db->single();
	// }


	// public function addDataMahasiswa($data) {

	// 	$query = "INSERT INTO mahasiswa VALUE
	// 				('', :nama, :nrp, :email, :jurusan)";

	// 	$this->db->query($query);
	// 	$this->db->bind('nama', $data['nama']);
	// 	$this->db->bind('nrp', $data['nrp']);
	// 	$this->db->bind('email', $data['email']);
	// 	$this->db->bind('jurusan', $data['jurusan']);

	// 	$this->db->execute();

	// 	return $this->db->rowCount();
	// }


	// public function delDataMahasiswa($id) {

	// 	$query = "DELETE FROM mahasiswa WHERE id = :id";
	// 	$this->db->query($query);
	// 	$this->db->bind('id', $id);

	// 	$this->db->execute();

	// 	return $this->db->rowCount();
	// }


	// public function editDataMahasiswa($data) {

	// 	$query = "UPDATE mahasiswa SET
	// 				nama = :nama,
	// 				nrp = :nrp,
	// 				email = :email,
	// 				jurusan = :jurusan
	// 			WHERE id = :id
	// 	";

	// 	$this->db->query($query);
	// 	$this->db->bind('nama', $data['nama']);
	// 	$this->db->bind('nrp', $data['nrp']);
	// 	$this->db->bind('email', $data['email']);
	// 	$this->db->bind('jurusan', $data['jurusan']);
	// 	$this->db->bind('id', $data['id']);

	// 	$this->db->execute();

	// 	return $this->db->rowCount();
	// }


	// public function getDataMahasiswa() {

	// 	$keyword = $_POST['keyword'];
	// 	$query = 'SELECT * FROM mahasiswa WHERE nama LIKE :keyword';
	// 	$this->db->query($query);
	// 	$this->db->bind('keyword', "%$keyword%");
	// 	return $this->db->resultSet();
	// }
}