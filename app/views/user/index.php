        <div class="container">
            <h3>Maintenance Calendar</h3>
			
			<table
			id="user-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-show-fullscreen="true"
			data-show-columns="true"
			data-show-columns-toggle-all="true"
			data-show-export="true"
			data-minimum-count-columns="2"
			data-pagination="true"
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
			data-mobile-responsive="true"
			data-check-on-init="true"
			data-url='data1.json'
			data-resizable="true">
				<!-- <a class="btn btn-primary addClientBtn" href="/task" role="button">Add</a> -->
			</table>
		</div>
    </section>

    <!-- Update Maintenance Schedule popup dialog box -->
	<div class="modal fade" id="update_schedule_Modal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
				<h5 class="modal-title fs-5" id="updateModalLabel">Update Current Schedule</h5>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">  
								<div class="form-group">
								  <label for="event_name">Maintenance Title</label>
								  <input type="text" name="event_name" id="update_event_name" class="form-control" placeholder="Enter your event name">
								</div>
							</div>
						</div><br>
						<div class="row">
							<div class="col-sm-6">  
								<div class="form-group">
								  <label for="event_start_date">Start Date</label>
								  <input type="date" name="start_date" id="update_start_date" class="form-control onlydatepicker" placeholder="Event start date">
								 </div>
							</div>
							<div class="col-sm-6">  
								<div class="form-group">
								  <label for="event_end_date">End Date</label>
								  <input type="date" name="end_date" id="update_end_date" class="form-control" placeholder="Event end date">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="save_event()">Save Changes</button>
				</div>
			</div>
		</div>
	</div>
	<!-- End popup dialog box -->

    <!-- Update Maintenance Schedule popup dialog box -->
	<div class="modal fade" id="new_schedule_Modal" tabindex="-1" role="dialog" aria-labelledby="newModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
				<h5 class="modal-title fs-5" id="newModalLabel">New Maintenance Schedule</h5>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">  
								<div class="form-group">
								  <label for="event_name">Maintenance Title</label>
								  <input type="text" name="event_name" id="new_event_name" class="form-control" placeholder="Enter your event name">
								</div>
							</div>
						</div><br>
						<div class="row">
							<div class="col-sm-6">  
								<div class="form-group">
								  <label for="event_start_date">Start Date</label>
								  <input type="date" name="start_date" id="new_start_date" class="form-control onlydatepicker" placeholder="Event start date">
								 </div>
							</div>
							<div class="col-sm-6">  
								<div class="form-group">
								  <label for="event_end_date">End Date</label>
								  <input type="date" name="end_date" id="new_end_date" class="form-control" placeholder="Event end date">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="create_event()">Create</button>
				</div>
			</div>
		</div>
	</div>
	<!-- End popup dialog box -->