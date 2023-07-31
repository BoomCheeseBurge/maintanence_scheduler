<?php

class Maintenance_model {

	private $table = 'calendar_event_master';
	private $db;


	public function __construct() {

		$this->db = new Database;
	}

	// For Engineer's Bootstrap Table
	public function getMaintenanceData() {
		$query = "SELECT m.id, cl.name, co.device, m.pm_count, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status
		FROM maintenance m
		INNER JOIN contract co ON m.contract_id = co.id
		INNER JOIN client cl ON m.client_id = cl.id
		WHERE (m.actual_date IS NULL OR m.report_status = 'in-progress' OR m.report_status = 'delivered') AND
		(
			CASE 
				WHEN m.month = 'January' THEN 1
				WHEN m.month = 'February' THEN 2
				WHEN m.month = 'March' THEN 3
				WHEN m.month = 'April' THEN 4
				WHEN m.month = 'May' THEN 5
				WHEN m.month = 'June' THEN 6
				WHEN m.month = 'July' THEN 7
				WHEN m.month = 'August' THEN 8
				WHEN m.month = 'September' THEN 9
				WHEN m.month = 'October' THEN 10
				WHEN m.month = 'November' THEN 11
				WHEN m.month = 'December' THEN 12
			END = MONTH(NOW()) OR 
			CASE 
				WHEN m.month = 'January' THEN 1
				WHEN m.month = 'February' THEN 2
				WHEN m.month = 'March' THEN 3
				WHEN m.month = 'April' THEN 4
				WHEN m.month = 'May' THEN 5
				WHEN m.month = 'June' THEN 6
				WHEN m.month = 'July' THEN 7
				WHEN m.month = 'August' THEN 8
				WHEN m.month = 'September' THEN 9
				WHEN m.month = 'October' THEN 10
				WHEN m.month = 'November' THEN 11
				WHEN m.month = 'December' THEN 12
			END = MONTH(DATE_ADD(NOW(), INTERVAL 1 MONTH))
        )";

		$this->db->query($query);
		return $this->db->resultSet();
	}

	// For History Bootstrap Table
	public function getHistoryData() {
		$query = "SELECT m.id, u.full_name, cl.name, co.sop_number, co.device, co.pm_frequency, m.pm_count, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
		FROM maintenance m
		INNER JOIN contract co ON m.contract_id = co.id
		INNER JOIN client cl ON m.client_id = cl.id
		INNER JOIN user u ON m.engineer_id = u.id";

		$this->db->query($query);
		return $this->db->resultSet();
	}

	public function addMaintenanceData($data) {

		$query = "INSERT INTO maintenance (id, client_id, engineer_id, contract_id, pm_count, month)
		VALUES ('', :client_id, :assignee_id, :contract_id, :pm_count, :month)";

		$this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':contract_id', $data['contract_id']);
		$this->db->bind(':pm_count', $data['pmCount']);
		$this->db->bind(':month', $data['month']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setScheduledDate($data) {

		$query = "UPDATE maintenance SET
					scheduled_date = :setdate,
					maintenance_status = 'scheduled'
				WHERE id = :id
		";

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setActualDate($data) {

		$query = "UPDATE maintenance SET
					actual_date = :setdate,
					maintenance_status = 'finished',
					report_status = 'in-progress'
				WHERE id = :id
		";

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setReportValue($maintenanceId) {

		$query = "UPDATE maintenance SET
					report_status = 'delivered',
					report_date = NOW()
				WHERE id = :id";
	
		$this->db->query($query);
		$this->db->bind(':id', $maintenanceId);
	
		try {
			$this->db->execute();
			// Successful update, you can send a success response if needed.
			// echo json_encode(['success' => true]);
		} catch (PDOException $e) {
			// Error occurred during the update, log the error and send an error response.
			error_log("Database error: " . $e->getMessage());
			// echo json_encode(['success' => false, 'error' => 'Database error']);
		}
	}
}