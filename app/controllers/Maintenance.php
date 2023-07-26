<?php

class Maintenance extends Controller {

    public function index() {

        $data['title'] = 'Task-Scheduler | MaintenanceSchedule';
        $data['identifier'] = 'maintenance';

		$this->view('templates/header', $data);
		$this->view('maintenance/index');
		$this->view('templates/footer', $data);
    }

    public function detail() {
        $data['title'] = 'Task-Scheduler | Detail';

        // $data['assignee'] = $this->function to get assignee name
        // then retrieve the status of this maintenance
        // then retrieve the report that has been submitted on this maintenance if exist display that report file on the page
        // then retrieve the activity log for this maintenance if exist

		$this->view('templates/header', $data);
		$this->view('maintenance/detail');
		$this->view('templates/footer');
    }

    public function getSchedule() {
        $results = $this->model('Maintenance_model')->getMaintenanceSchedule();
        $count = count($results);
        if ($count > 0) {
            $data_arr = array();
            $i = 1;
            foreach ($results as $data_row) {
                $data_arr[$i]['event_id'] = $data_row['event_id'];
                $data_arr[$i]['title'] = $data_row['event_name'];
                $data_arr[$i]['start'] = date("Y-m-d", strtotime($data_row['event_start_date']));
                $data_arr[$i]['end'] = date("Y-m-d", strtotime($data_row['event_end_date']));
                $i++;
            }
    
            $data = array(
                'status' => true,
                'msg' => 'successfully!',
                'data' => $data_arr
            );
        } else {
            $data = array(
                'status' => false,
                'msg' => 'Error!'				
            );
        }
        
        echo json_encode($data);
    }

    public function addSchedule() {
		// $_POST larger than zero indicates that there is new record found
		// then that means the new data is successfully passed into the webserver
		if( $this->model('Maintenance_model')->addMaintenance($_POST) > 0 ) {

			// Set the parameter values for the flash message
			Flasher::setFlash('Maintenance schedule', 'successfully', ' added', 'success');

			// Redirect to the main page of the mahasiswa
			header('Location: ' . BASEURL . '/maintenance');
			exit;
		}else {

			Flasher::setFlash('Maintenance schedule', 'failed', ' to be added', 'danger');

			header('Location: ' . BASEURL . '/maintenance');
			exit;
		}
    }

    public function updateSchedule() {
        $event_name = $_POST['event_name'];
        $event_start_date = date("y-m-d", strtotime($_POST['event_start_date'])); 
        $event_end_date = date("y-m-d", strtotime($_POST['event_end_date'])); 
                    
        $insert_query = "insert into `calendar_event_master`(`event_name`,`event_start_date`,`event_end_date`) values ('".$event_name."','".$event_start_date."','".$event_end_date."')";             
        // if(mysqli_query($con, $insert_query))
        // {
        //     $data = array(
        //                 'status' => true,
        //                 'msg' => 'Event added successfully!'
        //             );
        // }
        // else
        // {
        //     $data = array(
        //                 'status' => false,
        //                 'msg' => 'Sorry, Event not added.'				
        //             );
        // }
        // echo json_encode($data);
    }
}