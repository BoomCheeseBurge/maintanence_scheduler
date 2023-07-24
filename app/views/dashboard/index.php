		<div class="container">

			<div class="row">
				<div class="col-lg-6">
					<?php Flasher::flash(); ?>
				</div>
			</div>

			<h3>Dashboard</h3>

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
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/client/getClients'
            data-resizable="true">
			</table>

            <br>

            <table
			id="engineer-dashboard-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-auto-refresh="true"
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
			data-url='<?= BASEURL; ?>/client/getClients'
            data-resizable="true">
			</table>
		</div>
	</section>

	<!-- ========================================== Edit Row Modal ========================================== -->
	<div class="modal fade modal-lg" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="editModalLabel">Edit Client</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
					<div class="mb-3">
						<label for="recipient-name" class="col-form-label">Recipient:</label>
						<input type="text" class="form-control" id="recipient-name">
					</div>
					<div class="mb-3">
						<label for="message-text" class="col-form-label">Message:</label>
						<textarea class="form-control" id="message-text"></textarea>
					</div>
					</form>
				</div>
				<div class="modal-footer">
					<a class="btn btn-warning" href="<?= BASEURL; ?>/maintenance/detail" role="button">Detail</a>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Save Changes</button>
				</div>
            </div>
        </div>
    </div>

		<!-- ========================================== Scheduled Date and Actual Date Modal ========================================== -->
	<div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
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
							<input type="date" id="setdate" name="setdate" class="form-control">
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
