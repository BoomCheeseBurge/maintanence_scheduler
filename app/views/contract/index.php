      <div class="container">
        <h3>Contract</h3>
		
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
        data-minimum-count-columns="2"
        data-pagination="true"
        data-id-field="id"
        data-page-list="[10, 25, 50, 100, all]"
        data-mobile-responsive="true"
        data-check-on-init="true"
        data-url='data1.json'
        data-resizable="true">
        </table>
      </div>
	</section>

  	<!-- ========================================== Add and Edit Contract Modal ========================================== -->
	<div class="modal fade" id="contractModal" tabindex="-1" aria-labelledby="contractModalLabel" aria-hidden="true">
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
							<input type="search" class="form-control" name="companyName" id="companyName" required placeholder="companyName">
							<div id="companyNameList"></div>
							<label for="companyName">Company</label>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" required placeholder="clientName">
							<label for="floatingText">No SOP</label>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" required placeholder="clientName">
							<label for="floatingText">Device</label>
						</div>
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="assignee" id="assignee" required placeholder="assignee">
							<div id="assigneeList"></div>
							<label for="assignee">Engineer</label>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Create Maintenance Schedule Modal ========================================== -->
	<div class="modal fade" id="scheduleModal" tabindex="-1" aria-labelledby="scheduleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="scheduleModalLabel"></h6>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<input type="hidden" name="id" id="id">
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" required placeholder="clientName">
							<label for="floatingText">No SOP</label>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" required placeholder="clientName">
							<label for="floatingText">Device</label>
						</div>
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="companyName" id="companyName" required placeholder="companyName">
							<div id="companyNameList"></div>
							<label for="floatingText">Engineer</label>
						</div>
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="assignee" id="assignee" required placeholder="assignee">
							<div id="assigneeList"></div>
							<label for="floatingText">Engineer</label>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	</div>
