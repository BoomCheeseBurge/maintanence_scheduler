<?php

class CreatePicTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS pic (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    client_id INT NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT
                  )";

        $this->db->query($query);
        $this->db->execute();
    }

    public function down()
    {
        $query = "DROP TABLE IF EXISTS pic";
        $this->db->query($query);
        $this->db->execute();
    }
}
