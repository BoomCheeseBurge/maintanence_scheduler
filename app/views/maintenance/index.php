        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-lg-6">
                    <?php Flasher::flash(); ?>
                </div>
            </div>

            <h3 class="header-title">Maintenance History</h3>

			<span id="toolbar">
				<button class="btn btn-danger" id="remove" data-bs-toggle="modal" data-bs-target="#delBulkMaintenanceModal" disabled>
				Delete
				</button>
				<button type="button" id="filter" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#filterTableModal">
					<i class="fa-solid fa-filter me-1"></i>Filter
				</button>
			</span>

            <table
			id="history-table"
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
			data-show-search-clear-button="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/Maintenance/getMaintenanceHistory'
            data-resizable="true">
			</table>
        </div>
    </section>

	<!-- ========================================== Filter Table Modal ========================================== -->
	<div class="modal fade" id="filterTableModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="filterTableModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="filterTableModalLabel">Filter Scheduled Date</h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form id="filterForm" action="" method="post">

				<div class="row">
					<div class="col-md-6">
						<select class="form-select" id="monthSelect">
							<option selected disabled>Month</option>
							<option value="0">None</option>
							<option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
					</div>

					<div class="col-md-6">
						<div class="filter-dropdown mb-3">
							<input type="text" class="filter-year" placeholder="Year" readonly>
							<div class="filter-year-list-wrapper">
								<ul class="filter-year-list">
								<!-- Year options will be dynamically generated here -->
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary filterSubmitBtn">Filter</button>
				</form>
				</div>
			</div>
		</div>
	</div>