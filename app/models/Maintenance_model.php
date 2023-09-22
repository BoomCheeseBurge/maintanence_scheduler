<?php

class Maintenance_model {

	private $table1 = 'maintenance';
	private $table2 = 'contract';
	private $table3 = 'client';
	private $table4 = 'user';
	private $db;


	public function __construct() {

		$this->db = new Database;
	}

	// For Admin Bootstrap Table
	public function getMaintenanceList() {
		$query = 'SELECT m.id AS id, u.full_name AS engineer_name, cl.name AS client_name, co.sop_number AS sopNumber, co.device AS deviceName, m.pm_count AS pmCount, m.month AS pmMonth, m.scheduled_date AS scheduledDate, m.actual_date AS actualDate, m.maintenance_status AS maintenanceStatus, m.report_status AS reportStatus, m.report_date AS reportDate
		FROM '. $this->table1 .' m
		INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
		INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
		INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
		ORDER BY
		CASE
			WHEN m.scheduled_date IS NULL THEN 1
			WHEN m.actual_date IS NULL AND m.scheduled_date IS NOT NULL THEN 2
			WHEN m.report_date IS NULL AND m.actual_date IS NOT NULL AND m.scheduled_date IS NOT NULL THEN 3
			ELSE 4
		END,
		scheduledDate;';

		$this->db->query($query);
		return $this->db->resultSet();
	}

	// For Engineer Bootstrap Table
	public function getMaintenanceData() {
		
		$query = 'SELECT m.id, cl.name, co.device, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
		FROM '. $this->table1 . ' m
		INNER JOIN '. $this->table2 . ' co ON m.contract_id = co.id
		INNER JOIN '. $this->table3 . ' cl ON m.client_id = cl.id
		WHERE m.engineer_id = ' . $_SESSION["id"] .'
		ORDER BY
		CASE
			WHEN m.scheduled_date IS NULL THEN 1
			WHEN m.actual_date IS NULL AND m.scheduled_date IS NOT NULL THEN 2
			WHEN m.report_date IS NULL AND m.actual_date IS NOT NULL AND m.scheduled_date IS NOT NULL THEN 3
			ELSE 4
		END,
		scheduled_date';
		
		$this->db->query($query);
		return $this->db->resultSet();
	}

	// For History Bootstrap Table
	public function getHistoryData() {
		$query = 'SELECT m.id, u.full_name, cl.name, co.sop_number, co.device, co.pm_frequency, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.report_date
		FROM '. $this->table1 .' m
		INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
		INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
		INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
		WHERE YEAR(m.scheduled_date) = YEAR(NOW())
		AND report_status IS NOT NULL
		AND report_date IS NOT NULL';

		$this->db->query($query);
		return $this->db->resultSet();
	}

	// For Filtered History Bootstrap Table by Month
	public function filterTableData($selectedMonth, $selectedYear) {

		$month = intval($selectedMonth);
		$year = intval($selectedYear);

		// Construct start and end dates for the selected month and year
		if ($month !== 0) {
			// Month is provided, construct a range for the given month
			$startDate = "{$year}-{$month}-01";
			$endDate = date('Y-m-t', strtotime($startDate)); // Get the last day of the selected month
		} else {
			// Month is not provided, construct a range for the entire year
			$startDate = "{$year}-01-01";
			$endDate = "{$year}-12-31";
		}

		$query = 'SELECT u.full_name, cl.name, co.sop_number, co.device, co.pm_frequency, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.report_date
		FROM '. $this->table1 .' m
		INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
		INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
		INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
		WHERE m.scheduled_date BETWEEN :start_date AND :end_date';

		$this->db->query($query);
		$this->db->bind('start_date', $startDate);
		$this->db->bind('end_date', $endDate);

		return $this->db->resultSet();
	}

	public function filterMaintenanceData($value) {

		if($value == "unscheduled") {

			$query = 'SELECT m.id AS id, u.full_name AS engineer_name, cl.name AS client_name, co.sop_number AS sopNumber, co.device AS deviceName, m.pm_count AS pmCount, m.month AS pmMonth, m.scheduled_date AS scheduledDate, m.actual_date AS actualDate, m.maintenance_status AS maintenanceStatus, m.report_status AS reportStatus, m.report_date AS reportDate
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
			WHERE m.scheduled_date IS NULL';
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "unmaintained") {

			$query = 'SELECT m.id AS id, u.full_name AS engineer_name, cl.name AS client_name, co.sop_number AS sopNumber, co.device AS deviceName, m.pm_count AS pmCount, m.month AS pmMonth, m.scheduled_date AS scheduledDate, m.actual_date AS actualDate, m.maintenance_status AS maintenanceStatus, m.report_status AS reportStatus, m.report_date AS reportDate
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
			WHERE m.scheduled_date IS NOT NULL 
			AND m.actual_date IS NULL';
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "unsubmitted") {

			$query = 'SELECT m.id AS id, u.full_name AS engineer_name, cl.name AS client_name, co.sop_number AS sopNumber, co.device AS deviceName, m.pm_count AS pmCount, m.month AS pmMonth, m.scheduled_date AS scheduledDate, m.actual_date AS actualDate, m.maintenance_status AS maintenanceStatus, m.report_status AS reportStatus, m.report_date AS reportDate
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
			WHERE m.scheduled_date IS NOT NULL 
			AND m.actual_date IS NOT NULL
			AND m.report_date IS NULL';
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "none") {

			$query = 'SELECT m.id AS id, u.full_name AS engineer_name, cl.name AS client_name, co.sop_number AS sopNumber, co.device AS deviceName, m.pm_count AS pmCount, m.month AS pmMonth, m.scheduled_date AS scheduledDate, m.actual_date AS actualDate, m.maintenance_status AS maintenanceStatus, m.report_status AS reportStatus, m.report_date AS reportDate
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			INNER JOIN '. $this->table4 .' u ON m.engineer_id = u.id
			ORDER BY
			CASE
				WHEN m.scheduled_date IS NULL THEN 1
				WHEN m.actual_date IS NULL AND m.scheduled_date IS NOT NULL THEN 2
				WHEN m.report_date IS NULL AND m.actual_date IS NOT NULL AND m.scheduled_date IS NOT NULL THEN 3
				ELSE 4
			END,
			scheduledDate;';
			
			$this->db->query($query);
			return $this->db->resultSet();
		}
	}

	public function filterEngineerData($value) {

		if($value == "unscheduled") {

			$query = 'SELECT m.id, cl.name, co.device, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			WHERE m.scheduled_date IS NULL 
			AND m.engineer_id = ' . $_SESSION["id"];
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "unmaintained") {

			$query = 'SELECT m.id, cl.name, co.device, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			WHERE m.scheduled_date IS NOT NULL 
			AND m.actual_date IS NULL
			AND m.engineer_id = ' . $_SESSION["id"];
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "unsubmitted") {

			$query = 'SELECT m.id, cl.name, co.device, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
			FROM '. $this->table1 .' m
			INNER JOIN '. $this->table2 .' co ON m.contract_id = co.id
			INNER JOIN '. $this->table3 .' cl ON m.client_id = cl.id
			WHERE m.scheduled_date IS NOT NULL 
			AND m.actual_date IS NOT NULL
			AND m.report_date IS NULL
			AND m.engineer_id = ' . $_SESSION["id"];
	
			$this->db->query($query);
			return $this->db->resultSet();

		} else if($value == "none") {

			// $query = 'SELECT m.id, cl.name, co.device, m.pm_count, m.month, m.scheduled_date, m.actual_date, m.maintenance_status, m.report_status, m.report_date
			// FROM '. $this->table1 . ' m
			// INNER JOIN '. $this->table2 . ' co ON m.contract_id = co.id
			// INNER JOIN '. $this->table3 . ' cl ON m.client_id = cl.id
			// WHERE m.engineer_id = ' . $_SESSION["id"];
			
			// $this->db->query($query);
			// return $this->db->resultSet();

			return 'none';
		}
	}

	public function addMaintenanceData($data) {

		$query = 'INSERT INTO '. $this->table1 .' (client_id, engineer_id, contract_id, pm_count, month)
		VALUES (:client_id, :assignee_id, :contract_id, :pm_count, :month)';

		$this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':contract_id', $data['contract_id']);
		$this->db->bind(':pm_count', $data['pmCount']);
		$this->db->bind(':month', $data['month']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function isDuplicateMaintenance($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table1 .'
		WHERE client_id = :client_id 
		AND engineer_id = :assignee_id 
		AND contract_id = :contract_id 
		AND pm_count = :pmCount 
		AND month = :month';

        $this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':contract_id', $data['contract_id']);
		$this->db->bind(':pmCount', $data['pmCount']);
		$this->db->bind(':month', $data['month']);

        $row = $this->db->single();

        return $row['count'] > 0;
    }

	public function isDuplicatePM($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table1 .' m
		INNER JOIN contract co ON m.contract_id = co.id 
		WHERE co.sop_number = :sopNum 
		AND pm_count = :pmCount 
		AND month = :month';

        $this->db->query($query);
		$this->db->bind(':sopNum', $data['sopNum']);
		$this->db->bind(':pmCount', $data['pmCount']);
		$this->db->bind(':month', $data['month']);

        $row = $this->db->single();

        return $row['count'] > 0;
    }

	public function editMaintenanceData($data) {
		$query = 'UPDATE '. $this->table1 .' SET
			pm_count = :pmCount,
			month = :month
			WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind(':pmCount', $data['pmCount']);
		$this->db->bind(':month', $data['month']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function getMaintenanceById($id) {

		$query = 'SELECT m.pm_count, m.month
				FROM '. $this->table1 .' m
				WHERE m.id = :id';
		// :id will store the binded data (to prevent SQL injection)
		$this->db->query($query);
		$this->db->bind(':id', $id);
		return $this->db->single();
	}

	public function delMaintenanceData($id) {

		try {
			$query = 'DELETE FROM '. $this->table1 .' WHERE id = :id';
			$this->db->query($query);
			$this->db->bind(':id', $id);

			$this->db->execute();

			return $this->db->rowCount();
		} catch (PDOException $e) {
			$errorCode = $e->getCode();
			if ($errorCode === '23000' || $errorCode === '1451') {
				return 2;
			} else {
				// Handle other errors
				return $errorCode;
			}
		}
	}

	public function delBulkMaintenanceData($ids) {

		try {
			// Create placeholders for the IDs
			$placeholders = implode(',', array_fill(0, count($ids), '?'));
		
			$query = 'DELETE FROM ' . $this->table1 . ' WHERE id IN (' . $placeholders . ')';
			$this->db->query($query);
		
			// Bind the IDs
			foreach ($ids as $index => $id) {
				$this->db->bind($index + 1, $id, PDO::PARAM_INT); // Assuming IDs are integers
			}

			$this->db->execute();

			return $this->db->rowCount();
		} catch (PDOException $e) {
			$errorCode = $e->getCode();
			if ($errorCode === '23000' || $errorCode === '1451') {
				return 2;
			} else {
				// Handle other errors
				return $errorCode;
			}
		}
	}

	public function setScheduledDate($data) {

		$query = 'UPDATE '. $this->table1 .' SET
					scheduled_date = :setdate,
					maintenance_status = "scheduled"
				WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setActualDate($data) {

		$query = 'UPDATE '. $this->table1 .' SET
					actual_date = :setdate,
					maintenance_status = "finished",
					report_status = "in-progress"
				WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind('setdate', $data['setdate']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function setReportValue($data) {

		$query = 'UPDATE '. $this->table1 .' SET
					report_status = "delivered",
					report_date = NOW()
				WHERE id = :id';
	
		$this->db->query($query);
		$this->db->bind(':id', $data['id']);
	
		$this->db->execute();

		return $this->db->rowCount();
	}

	public function getDataForEngineerPerformances() {

		$query = 'SELECT u.full_name, COUNT(*) AS late_count 
				FROM maintenance m JOIN user u ON m.engineer_id = u.id 
				WHERE u.role = "engineer" 
				AND m.report_date > DATE_ADD(m.actual_date, INTERVAL 8 DAY) 
				AND YEAR(m.report_date) = YEAR(CURDATE()) GROUP BY u.full_name';

		$this->db->query($query);
		$this->db->execute();

		return $this->db->resultSet();
	}

	public function getYearlyEngineerPerformanceData($selectedYear) {

		$query = 'SELECT u.full_name, COUNT(*) AS late_count 
				FROM maintenance m JOIN user u ON m.engineer_id = u.id 
				WHERE u.role = "engineer" 
				AND m.report_date > DATE_ADD(m.actual_date, INTERVAL 8 DAY) 
				AND YEAR(m.report_date) = :selectedYear GROUP BY u.full_name';

		$this->db->query($query);
		$this->db->bind(':selectedYear', $selectedYear);
		$this->db->execute();

		return $this->db->resultSet();
	}
	
	public function getMonthlyEngineerPerformanceData($selectedMonth, $selectedYear) {
		// Use the $selectedMonth and $selectedYear parameters in your query
		// Make sure to sanitize the input to prevent SQL injection (e.g., using prepared statements)
	
		$query = 'SELECT u.full_name, COUNT(*) AS late_count 
				  FROM maintenance m 
				  INNER JOIN user u ON m.engineer_id = u.id 
				  WHERE u.role = "engineer" 
				  AND m.report_date > DATE_ADD(m.actual_date, INTERVAL 8 DAY) 
				  AND YEAR(m.report_date) = :selectedYear 
				  AND MONTH(m.report_date) = :selectedMonth 
				  GROUP BY u.full_name';
	
		// Bind the parameters to the query
		$this->db->query($query);
		$this->db->bind(':selectedYear', $selectedYear);
		$this->db->bind(':selectedMonth', $selectedMonth);
	
		$this->db->execute();
	
		return $this->db->resultSet();
	}
}