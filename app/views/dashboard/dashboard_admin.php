		<div class="container">

			<div class="row">
				<div class="col-lg-6">
					<?php Flasher::flash(); ?>
				</div>
			</div>

			<h3 class="header-title">Dashboard</h3>

			<table
			id="admin-dashboard-table"
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
			data-id-field="m_id"
			data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/maintenance/getScheduleList'
            data-resizable="true">
			</table>
		</div>
	</section>

	<!-- ========================================== Scheduled Date and Actual Date Modal ========================================== -->
	<div class="modal fade" id="formModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="formModalLabel"></h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<input type="hidden" name="id" id="id">
						<div class="mb-3">
							<input type="date" id="setdate" name="setdate" class="form-control dateInput" required>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Set</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Delete Contract Modal ========================================== -->
	<div class="modal fade" id="delMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delMaintenanceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title fs-5" id="delMaintenanceModalLabel">Delete Contract</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/contract/delMaintenance" method="post">
            <h6>Are you sure?</h6>
			      <input type="hidden" name="id" id="maintenanceId">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-danger">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>