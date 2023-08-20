<?php

class CreateClientTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS `client` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `name` varchar(100) NOT NULL,
                    PRIMARY KEY (`id`)
                ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

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
