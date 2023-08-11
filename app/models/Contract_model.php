<?php

class Contract_model {

	private $table1 = 'contract';
	private $table2 = 'client';
	private $table3 = 'user';

	private $db;

	public function __construct() {

		$this->db = new Database;
	}

    public function getContractData() {
		$query = 'SELECT co.id, cl.name, co.sop_number, co.device, co.pm_frequency, co.start_date, co.end_date, u.full_name
		FROM '. $this->table1 .' co
		INNER JOIN '. $this->table2 .' cl ON co.client_id = cl.id
		INNER JOIN '. $this->table3 .' u ON co.engineer_id = u.id';

		$this->db->query($query);
		return $this->db->resultSet();
    }

	// For Filtered History Bootstrap Table by Month
	public function filterTableData($startMonth, $startYear, $endMonth, $endYear) {

		$start_month = intval($startMonth);
		$start_year = intval($startYear);
		$end_month = intval($endMonth);
		$end_year = intval($endYear);

		// Construct start and end dates for the selected month and year
		$startDate = "{$start_year}-{$start_month}-01";
		$endDate = date('Y-m-t', strtotime("$end_year-$end_month-01")); // Get the last day of the selected month

		// Construct start and end dates for the selected month and year
		if ($start_month !== 0) {
			// Month is provided, construct a range for the given month
			$startDate = "{$start_year}-{$start_month}-01";
			$endDate = date('Y-m-t', strtotime($startDate)); // Get the last day of the selected month
		} else {
			// Month is not provided, construct a range for the entire year
			$startDate = "{$start_year}-01-01";
			$endDate = "{$start_year}-12-31";
		}

		$query = 'SELECT co.id, cl.name, co.sop_number, co.device, co.pm_frequency, co.start_date, co.end_date, u.full_name
		FROM '. $this->table1 .' co
		INNER JOIN '. $this->table2 .' cl ON co.client_id = cl.id
		INNER JOIN '. $this->table3 .' u ON co.engineer_id = u.id
		WHERE (co.start_date BETWEEN :start_date AND :end_date) OR
		(co.end_date BETWEEN :start_date AND :end_date)';

		$this->db->query($query);
		$this->db->bind('start_date', $startDate);
		$this->db->bind('end_date', $endDate);

		return $this->db->resultSet();
	}

    public function addContractData($data) {

		$query = 'INSERT INTO '. $this->table1 .' (id, client_id, engineer_id, sop_number, start_date, end_date, device, pm_frequency)
		VALUES ("", :client_id, :assignee_id, :sopNumber, :startDate, :endDate, :deviceName, :pmFreq)';

		$this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':sopNumber', $data['sopNumber']);
		$this->db->bind(':startDate', $data['startDate']);
		$this->db->bind(':endDate', $data['endDate']);
		$this->db->bind(':deviceName', $data['deviceName']);
		$this->db->bind(':pmFreq', $data['pmFreq']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function isDuplicateContract($data) {
        // Prepare the SQL query
        $query = 'SELECT COUNT(*) AS count
		FROM '. $this->table1 .'
		WHERE client_id = :client_id 
		AND engineer_id = :assignee_id 
		AND sop_number = :sopNumber 
		AND start_date = :startDate 
		AND end_date = :endDate 
		AND device = :deviceName 
		AND pm_frequency = :pmFreq';

        $this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':sopNumber', $data['sopNumber']);
		$this->db->bind(':startDate', $data['startDate']);
		$this->db->bind(':endDate', $data['endDate']);
        $this->db->bind(':deviceName', $data['deviceName']);
        $this->db->bind(':pmFreq', $data['pmFreq']);

        $row = $this->db->single();

        return $row['count'] > 0;
    }

    public function editContractData($data) {

		$query = 'UPDATE '. $this->table1 .' SET
					client_id = :client_id,
					engineer_id = :assignee_id,
					sop_number = :sopNumber,
					start_date = :startDate,
					end_date = :endDate,
					device = :deviceName,
					pm_frequency = :pmFreq
				WHERE id = :id
		';

		$this->db->query($query);
		$this->db->bind(':client_id', $data['client_id']);
		$this->db->bind(':assignee_id', $data['assignee_id']);
		$this->db->bind(':sopNumber', $data['sopNumber']);
		$this->db->bind(':startDate', $data['startDate']);
		$this->db->bind(':endDate', $data['endDate']);
		$this->db->bind(':deviceName', $data['deviceName']);
		$this->db->bind(':pmFreq', $data['pmFreq']);
		$this->db->bind(':id', $data['id']);

		$this->db->execute();

		return $this->db->rowCount();
	}

	public function delContractData($id) {

		$query = 'DELETE FROM '. $this->table1 .' WHERE id = :id';
		$this->db->query($query);
		$this->db->bind(':id', $id);

		try {
			$this->db->execute();
			// Success: The client record was deleted successfully
		} catch (PDOException $e) {
			// Error: The client record could not be deleted due to the foreign key constraint
			echo "Error: Cannot delete the contract record because it has related records in other tables.";
		}

		return $this->db->rowCount();
	}

	public function delBulkContractData($ids) {

		$query = 'DELETE FROM '. $this->table1 .' WHERE id IN (' . implode(",", $ids) . ')';
		$this->db->query($query);
		
		// Bind the IDs
		foreach ($ids as $index => $id) {
			$this->db->bind($index + 1, $id);
		}

		try {
			$this->db->execute();
			// Success: The client record was deleted successfully
		} catch (PDOException $e) {
			// Error: The client record could not be deleted due to the foreign key constraint
			echo "Error: Cannot delete the contract record because it has related records in other tables.";
		}

		return $this->db->rowCount();
	}

	public function getEditContractById($id) {

		$query = 'SELECT co.id, cl.name, co.sop_number, co.start_date, co.end_date, co.device, co.pm_frequency, u.full_name
				FROM '. $this->table1 .' co
				INNER JOIN '. $this->table2 .' cl ON co.client_id = cl.id
				INNER JOIN '. $this->table3 .' u ON co.engineer_id = u.id
				WHERE co.id = :id';
		// :id will store the binded data (to prevent SQL injection)
		$this->db->query($query);
		$this->db->bind(':id', $id);
		return $this->db->single();
	}

	public function getContractById($id) {

		$query = 'SELECT cl.name, co.sop_number, co.device, co.pm_frequency, co.start_date, co.end_date, u.full_name
				FROM '. $this->table1 .' co
				INNER JOIN '. $this->table2 .' cl ON co.client_id = cl.id
				INNER JOIN '. $this->table3 .' u ON co.engineer_id = u.id
				WHERE co.id = :id';
		// :id will store the binded data (to prevent SQL injection)
		$this->db->query($query);
		$this->db->bind(':id', $id);
		return $this->db->single();
	}

	public function getContractIdBySOP($sop_number) {
		$query = 'SELECT id FROM '. $this->table1 .' WHERE sop_number = :sop_number';
		$this->db->query($query);
		$this->db->bind(':sop_number', $sop_number);
		$result = $this->db->single();
		
		// Return the client_id or null if not found
		return $result ? $result['id'] : null;
	}
}