<?php

class CreateMaintenanceTable extends Migration
{
    public function up()
    {
        $query = "CREATE TABLE IF NOT EXISTS `maintenance` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `client_id` int(11) NOT NULL,
                    `engineer_id` int(11) NOT NULL,
                    `contract_id` int(11) NOT NULL,
                    `pm_count` int(11) NOT NULL,
                    `month` varchar(50) NOT NULL,
                    `scheduled_date` date DEFAULT NULL,
                    `actual_date` date DEFAULT NULL,
                    `maintenance_status` varchar(20) DEFAULT NULL,
                    `report_status` varchar(20) DEFAULT NULL,
                    `report_date` datetime DEFAULT NULL,
                    PRIMARY KEY (`id`),
                    KEY `contract_id` (`contract_id`),
                    KEY `client_id` (`client_id`,`engineer_id`),
                    KEY `engineer_id` (`engineer_id`),
                    CONSTRAINT `fk_maintenance_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE RESTRICT,
                    CONSTRAINT `fk_maintenance_contract` FOREIGN KEY (`contract_id`) REFERENCES `contract` (`id`) ON DELETE RESTRICT,
                    CONSTRAINT `fk_maintenance_engineer` FOREIGN KEY (`engineer_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT
                ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

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
