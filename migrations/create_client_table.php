<?php

class CreateClientTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS client (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  )";

        $this->db->query($query);
        $this->db->execute();
    }

    public function down()
    {
        $query = "DROP TABLE IF EXISTS client";
        $this->db->query($query);
        $this->db->execute();
    }
}
