<?php

class CreateUserTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS `user` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `full_name` varchar(100) NOT NULL,
                    `password` varchar(255) NOT NULL,
                    `role` varchar(100) NOT NULL,
                    `email` varchar(100) NOT NULL,
                    `photo` varchar(100) DEFAULT NULL,
                    `token` varchar(255) DEFAULT NULL,
                    `token_date` datetime DEFAULT NULL,
                    PRIMARY KEY (`id`)
                ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

        $this->db->query($query);
        $this->db->execute();
    }

    public function down()
    {
        $query = "DROP TABLE IF EXISTS user";
        $this->db->query($query);
        $this->db->execute();
    }
}