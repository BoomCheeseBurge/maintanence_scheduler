// migrations/create_maintenance_table.php

require_once 'Migration.php';

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
                    scheduled_date DATE NOT NULL,
                    actual_date DATE NOT NULL,
                    maintenance_status VARCHAR(20) NOT NULL,
                    report_status VARCHAR(20) NOT NULL,
                    report_date DATETIME,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (client_id) REFERENCES clients(id),
                    FOREIGN KEY (engineer_id) REFERENCES engineers(id),
                    FOREIGN KEY (contract_id) REFERENCES contracts(id)
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
