      <div class="container">

	  	<div class="row">
			<div class="col-lg-6">
				<?php Flasher::flash(); ?>
			</div>
		</div>

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
							<div>
								<label class="form-label" for="daterange">Contract Period</label>
							</div>
							<input type="text" id="daterange" name="daterange" value="" required/>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" required placeholder="clientName">
							<label for="floatingText">Device</label>
						</div>
						<div class="form-floating mb-3">
							<label class="input-group-text" for="inputGroupSelect01">PM Periode ke-</label>
							<select class="form-select" id="inputGroupSelect01" required>
								<option selected disabled>Klik sini...</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
                            </select>
						</div>
						<div class="form-floating mb-3">
							<input type="search" class="form-control" name="assignee" id="assignee" required placeholder="assignee">
							<div id="assigneeList"></div>
							<label for="assignee">Engineer</label>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary contractSubmitBtn"></button>
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
					<h6 class="modal-title fs-5" id="scheduleModalLabel">New Maintenance Schedule</h6>
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
