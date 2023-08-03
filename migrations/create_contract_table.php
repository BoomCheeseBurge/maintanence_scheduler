<?php

class CreateContractTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS contract (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    client_id INT NOT NULL,
                    engineer_id INT NOT NULL,
                    sop_number VARCHAR(100) NOT NULL,
                    start_date DATE NOT NULL,
                    end_date DATE NOT NULL,
                    device VARCHAR(100) NOT NULL,
                    pm_frequency INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT,
                    FOREIGN KEY (engineer_id) REFERENCES engineers(id) ON DELETE RESTRICT
                  )";

        $this->db->query($query);
        $this->db->execute();
    }

    public function down()
    {
        $query = "DROP TABLE IF EXISTS contract";
        $this->db->query($query);
        $this->db->execute();
    }
}
