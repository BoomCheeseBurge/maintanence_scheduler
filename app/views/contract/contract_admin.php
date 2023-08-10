      <div class="container-fluid">

	  	<div class="row">
			<div class="col-lg-6">
				<?php Flasher::flash(); ?>
			</div>
		</div>

        <h3 class="header-title">Contract</h3>

		<span id="toolbar">
			<button id="remove" class="btn btn-danger" disabled>
			Delete
			</button>
	  		<button class="btn btn-primary addContractBtn" data-bs-toggle="modal" data-bs-target="#contractModal">Add</button>
		</span>
		
        <table
        id="contract-table"
        data-toolbar="#toolbar"
        data-search="true"
        data-advanced-search="true"
        data-show-refresh="true"
        data-show-fullscreen="true"
        data-show-columns="true"
        data-show-columns-toggle-all="true"
        data-show-export="true"
		data-click-to-select="true"
        data-minimum-count-columns="2"
        data-pagination="true"
        data-id-field="id"
        data-page-list="[10, 25, 50, 100, all]"
        data-mobile-responsive="true"
		data-show-search-clear-button="true"
        data-check-on-init="true"
        data-url='<?= BASEURL; ?>/contract/getAllContract'
        data-resizable="true">
        </table>
      </div>
	</section>

  	<!-- ========================================== Add and Edit Contract Modal ========================================== -->
	<div class="modal fade" id="contractModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="contractModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="contractModalLabel"></h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<input type="hidden" name="id" id="id">
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="clientName" id="clientName" required placeholder="clientName" autocomplete="off">
							<div id="clientNameList" class="clientNameList"></div>
							<label for="clientName">Client</label>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="sopNumber" name="sopNumber" required placeholder="SOP Number">
							<label for="sopNumber">No SOP</label>
						</div>
						<div class="form-group mb-3">
							<label class="mb-1" for="daterange">Contract Period</label>
							<div class="input-group">
								<input type="date" class="form-control" id="startDate" name="startDate" required>
								<div class="bridge-text">to</div>
								<input type="date" class="form-control" id="endDate" name="endDate" required>
							</div>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="deviceName" name="deviceName" required placeholder="deviceName">
							<label for="deviceName">Device</label>
						</div>
						<div class="input-group mb-3">
							<span class="input-group-text">PM Frequency</span>
							<input type="number" class="form-control" id="pmFreq" name="pmFreq" min="1" required>
						</div>
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="assignee" id="assignee" required placeholder="assignee" autocomplete="off">
							<div id="assigneeList"></div>
							<label for="assignee">Engineer</label>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary contractSubmitBtn"></button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Create Maintenance Schedule Modal ========================================== -->
	<div class="modal fade" id="scheduleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="scheduleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="scheduleModalLabel">New Maintenance Schedule</h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="<?= BASEURL; ?>/maintenance/createMaintenance" method="post">
						<input type="hidden" name="id" id="id">
						<div class="mb-3">
							<label for="name" class="form-label">Client Name</label>
							<input class="form-control" type="text" id="client_name" name="name" readonly>
						</div>
						<div class="mb-3">
							<label for="sop_number" class="form-label">SOP</label>
							<input class="form-control" type="text" id="sop_number" name="sop_number" readonly>
						</div>
						<div class="mb-3">
							<label for="device" class="form-label">Device</label>
							<input class="form-control" type="text" id="device" name="device" readonly>
						</div>
						<div class="mb-3">
							<label for="pm_frequency" class="form-label">PM Frequency</label>
							<input class="form-control" type="text" id="pm_frequency" name="pm_frequency" readonly>
						</div>
						<div class="mb-3">
							<label for="start_date" class="form-label">Start Date</label>
							<input class="form-control" type="date" id="start_date" name="start_date" readonly>
						</div>
						<div class="mb-3">
							<label for="end_date" class="form-label">End Date</label>
							<input class="form-control" type="date" id="end_date" name="end_date" readonly>
						</div>
						<div class="mb-3">
							<label for="full_name" class="form-label">Assigned Engineer</label>
							<input class="form-control" type="text" id="full_name" name="full_name" readonly>
						</div>
						<div class="input-group mb-3">
							<span class="input-group-text" id="pmCount">PM ke-</span>
							<input type="number" class="form-control" id="pmCount" name="pmCount" min="1" required>
						</div>
						<div class="mb-3">
							<label for="month" class="form-label">Maintenance Month</label>
							<select class="form-select" id="month" name="month" aria-label="Default select example" required>
								<option selected>Choose month</option>
								<option value="January">January</option>
								<option value="February">February</option>
								<option value="March">March</option>
								<option value="April">April</option>
								<option value="May">May</option>
								<option value="June">June</option>
								<option value="July">July</option>
								<option value="August">August</option>
								<option value="September">September</option>
								<option value="October">October</option>
								<option value="November">November</option>
								<option value="December">December</option>
							</select>
						</div>
						
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Delete Contract Modal ========================================== -->
	  <div class="modal fade" id="delContractModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delContractModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title fs-5" id="delContractModalLabel">Delete Contract</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/contract/delContract" method="post">
            <h6>Are you sure?</h6>
			      <input type="hidden" name="id" id="contractId">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-danger">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>

    <!-- ========================================== Bulk Delete Client PIC Modal ========================================== -->
	<div class="modal fade" id="delBulkContractModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delBulkContractModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delBulkContractModalLabel">Bulk Delete Contract</h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<h6>Are you sure?</h6>
						<input type="hidden" name="id" id="picId">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-danger bulkDeleteBtn">Confirm</button>
					</form>
				</div>
			</div>
		</div>
	</div>