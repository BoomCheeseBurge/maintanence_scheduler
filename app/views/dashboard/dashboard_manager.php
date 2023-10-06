		<div class="container-fluid">

			<h3 class="header-title">Dashboard</h3>

			<span id="toolbar">
				<div class="row">
					<div class="col-7">
						<div class="input-group">
							<div class="input-group-text" id="btnGroupAddon2">Filter by</div>
							<select class="form-select" id="maintenance" name="maintenance" required>
								<option selected>none</option>
								<option value="unscheduled">not yet scheduled</option>
								<option value="unmaintained">not yet maintained</option>
								<option value="unsubmitted">unsubmitted report</option>
							</select>
						</div>
					</div>
					<div class="col">
						<div class="input-group">
							<div class="input-group-text" id="btnGroupAddon2">View</div>
							<select class="form-select" id="dashboard-view" name="dashboard-view" required>
								<option value="myPM">MyPM</option>
								<option value="engineerPM">EngineerPM</option>
							</select>
						</div>
					</div>
				</div>
			</span>

			<table
			id="manager-dashboard-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-show-auto-refresh="false"
			data-show-fullscreen="true"
			data-show-columns="true"
			data-show-columns-toggle-all="true"
			data-show-export="true"
			data-minimum-count-columns="2"
			data-pagination="true"
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
			data-show-search-clear-button="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/Maintenance/getMaintenanceSchedule'
            data-resizable="true">
			</table>


			<table
			id="manager-dashboard-table-2"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-show-auto-refresh="false"
			data-show-fullscreen="true"
			data-show-columns="true"
			data-show-columns-toggle-all="true"
			data-show-export="true"
			data-minimum-count-columns="2"
			data-pagination="true"
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
			data-show-search-clear-button="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/Maintenance/getScheduleList'
            data-resizable="true">
			</table>

			<br>
			<hr>
			<br>

			<!-- Buttons or dropdown to switch between time periods -->
			<button class="btn btn-primary" id="yearlyViewBtn">Year View</button>
			<button class="btn btn-primary" id="monthlyViewBtn">Month View</button>
			
			<br><br>

			<div id="chart-container">
				<div id="lateReportChart"></div>
			</div>
			
		</div>
	</section>

	<!-- ========================================== Scheduled Date and Actual Date Modal ========================================== -->
	<div class="modal fade" id="formModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="formModalLabel"></h1>
					<button type="button" class="btn-close cancelSetDateBtn" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post" id="" class="maintenanceForm2">
						<input type="hidden" name="id" id="id">
						<div class="mb-3">
							<input type="date" id="setdate" name="setdate" class="form-control dateInput" required>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger cancelSetDateBtn" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary setDateSubmitBtn">Set</button>
					</form>
				</div>
			</div>
		</div>
	</div>