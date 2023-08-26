<?php

class CreateContractTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS `contract` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `client_id` int(11) NOT NULL,
                    `engineer_id` int(11) NOT NULL,
                    `sop_number` varchar(100) NOT NULL,
                    `start_date` date NOT NULL,
                    `end_date` date NOT NULL,
                    `device` varchar(100) NOT NULL,
                    `pm_frequency` int(11) NOT NULL,
                    PRIMARY KEY (`id`),
                    KEY `client_id` (`client_id`),
                    KEY `engineer_id` (`engineer_id`),
                    CONSTRAINT `fk_contract_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE RESTRICT,
                    CONSTRAINT `fk_contract_engineer` FOREIGN KEY (`engineer_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT
                ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

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
