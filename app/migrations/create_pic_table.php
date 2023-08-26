<?php

class CreatePICTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS `pic` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `client_id` int(11) NOT NULL,
                    `name` varchar(100) NOT NULL,
                    `email` varchar(100) NOT NULL,
                    PRIMARY KEY (`id`),
                    KEY `client_id` (`client_id`),
                    CONSTRAINT `fk_pic_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE
                ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

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
