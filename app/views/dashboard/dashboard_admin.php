		<div class="container-fluid">

			<div class="row">
				<div class="col-lg-6 flash-container">
					<?php Flasher::flash(); ?>
				</div>
			</div>

			<h3 class="header-title">Dashboard</h3>

			<span id="toolbar">
				<button class="btn btn-danger" id="remove" data-bs-toggle="modal" data-bs-target="#delBulkMaintenanceModal" disabled>
				Delete
				</button>
			</span>

			<table
			id="dashboard-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-show-auto-refresh="false"
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
			data-url='<?= BASEURL; ?>/Maintenance/getScheduleList'
            data-resizable="true">
			</table>
		</div>
	</section>

	<!-- ========================================== Delete Contract Modal ========================================== -->
	<div class="modal fade" id="delMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delMaintenanceModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delMaintenanceModalLabel">Delete Contract</h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="delMaintenanceForm">
					<h6>Are you sure?</h6>
						<input type="hidden" name="id" id="maintenanceId">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelDelMaintenance" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger delMaintenanceSubmitBtn">Confirm</button>
				</form>
				</div>
			</div>
		</div>
	</div>
	</section>

	<!-- ========================================== Bulk Delete Maintenance Modal ========================================== -->
	<div class="modal fade" id="delBulkMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delBulkMaintenanceModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delBulkMaintenanceModalLabel">Bulk Delete Maintenance</h6>
					<button type="button" class="btn-close cancelDelBulkMaintenance" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="bulkDeleteMaintenanceForm">
					<h6>Are you sure?</h6>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelDelBulkMaintenance" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger bulkDeleteSubmitBtn">Confirm</button>
				</form>
				</div>
			</div>
		</div>
	</div>