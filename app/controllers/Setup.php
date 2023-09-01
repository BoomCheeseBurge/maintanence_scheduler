<?php

class Setup extends Controller
{
    public function index()
    {
        if ( $this->model('User_model')->isUserTableExist() > 0 ) {

            header('Location: ' . BASEURL . '/Login');
            exit;
        } else {
            $data['title'] = 'Setup';
            $data['activePage'] = 'setup';
    
            $this->view('templates/setup_header', $data);
            $this->view('setup/index');
            $this->view('templates/footer');
        }
    }

    // Setup the Database Tables
    public function setDatabase() {

        require_once __DIR__ . '/../core/Database.php';
        require_once __DIR__ . '/../core/Migration.php';
        
        require_once __DIR__ . '/../migrations/create_client_table.php';
        require_once __DIR__ . '/../migrations/create_contract_table.php';
        require_once __DIR__ . '/../migrations/create_maintenance_table.php';
        require_once __DIR__ . '/../migrations/create_pic_table.php';
        require_once __DIR__ . '/../migrations/create_user_table.php';
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $name = $_POST['dbName'];

            $configFile = __DIR__ . '/../config/config.php';
            $configContent = file_get_contents($configFile);

            $configContent = preg_replace(
                "/define\('DB_NAME', '(.*)'\);/",
                "define('DB_NAME', '$name');",
                $configContent
            );

            if( file_put_contents($configFile, $configContent) ) {
                $migrations = [
                    new CreateUserTable(),
                    new CreateClientTable(),
                    new CreatePICTable(),
                    new CreateContractTable(),
                    new CreateMaintenanceTable()
                ];
        
                try {
                    foreach ($migrations as $migration) {
                        $migration->down(); // Drop any existing table of the same name
                        $migration->up(); // Run the migration up() method for each migration
                    }
                    
                    echo json_encode(['result' => '1']);
                    exit;
                } catch (Exception $e) {
                    echo json_encode(['result' => $e->getMessage()]);
                    exit;
                }
            } else {
                echo json_encode(['result' => '2']);
                exit;
            }
        } else {
            echo json_encode(['result' => '3']);
            exit;
        }
    }

    // Setup the admin user
    public function setAdmin() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $uName = $_POST['uName'];
            $uEmail = $_POST['uEmail'];
            $uPass = $_POST['uPass'];

            if ( $this->model('User_model')->addAdmin($uName, $uEmail, $uPass) > 0 ) {
                echo json_encode(['result' => '1']);
                exit;
            } else {
                echo json_encode(['result' => '2']);
                exit;
            }
        } else {
            echo json_encode(['result' => '3']);
            exit;
        }
    }

    public function configEmail() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $cName = $_POST['companyName'];
            $hEmail = $_POST['hostEmail'];
            $hUser = $_POST['hostUser'];
            $hPass = $_POST['hostPass'];
            $port = $_POST['port'];
            $sEmail = $_POST['supportEmail'];

            $configFile = __DIR__ . '/../config/config.php';
            $configContent = file_get_contents($configFile);
    
            $configContent = preg_replace(
                "/define\('SUPPORT_EMAIL', '(.*)'\);/",
                "define('SUPPORT_EMAIL', '$sEmail');",
                $configContent
            );

            if( file_put_contents($configFile, $configContent) ) {

                $configFile2 = __DIR__ . '/../libraries/EmailHelper.php';
                $configContent2 = file_get_contents($configFile2);

                $configContent2 = preg_replace(
                    [
                        "/\\\$company_name = \"(.*)\";/",
                        "/\\\$email_from = \"(.*)\";/",
                        "/\\\$mail->Host = \"(.*)\";/",
                        "/\\\$mail->Username = \"(.*)\";/",
                        "/\\\$mail->Password = \"(.*)\";/",
                        "/\\\$mail->Port = (.*);/"
                    ],
                    [
                        "\$company_name = \"$cName\";",
                        "\$email_from = \"$hUser\";",
                        "\$mail->Host = \"$hEmail\";",
                        "\$mail->Username = \"$hUser\";",
                        "\$mail->Password = \"$hPass\";",
                        "\$mail->Port = $port;"
                    ],
                    $configContent2
                );

                if ( file_put_contents($configFile2, $configContent2) ) {

                    echo json_encode(['result' => '1']);
                    exit;
                } else {
                    echo json_encode(['result' => '2']);
                    exit;
                }
            } else {
                echo json_encode(['result' => '3']);
                exit;
            }
        } else {
            echo json_encode(['result' => '4']);
            exit;
        }
    }
}
