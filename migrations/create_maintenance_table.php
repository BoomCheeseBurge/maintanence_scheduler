<?php

class CreateMaintenanceTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS maintenance (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    client_id INT NOT NULL,
                    engineer_id INT NOT NULL,
                    contract_id INT NOT NULL,
                    pm_count INT NOT NULL,
                    month VARCHAR(50) NOT NULL,
                    scheduled_date DATE NULL,
                    actual_date DATE NULL,
                    maintenance_status VARCHAR(20) NULL,
                    report_status VARCHAR(20) NULL,
                    report_date DATETIME NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT,
                    FOREIGN KEY (engineer_id) REFERENCES engineers(id) ON DELETE RESTRICT,
                    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE RESTRICT
                  )";

        $this->db->query($query);
        $this->db->execute();
    }

    public function down()
    {
        $query = "DROP TABLE IF EXISTS maintenance";
        $this->db->query($query);
        $this->db->execute();
    }
}
