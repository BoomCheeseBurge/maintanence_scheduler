		<div class="container-fluid">

			<h3 class="header-title">Contract</h3>

			<span id="toolbar">
			<button type="button" id="filter" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#filterTableModal">
				<i class="fa-solid fa-filter me-1"></i>Filter
			</button>
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
			data-minimum-count-columns="2"
			data-pagination="true"
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
			data-mobile-responsive="true"
			data-show-search-clear-button="true"
			data-check-on-init="true"
			data-url='<?= BASEURL; ?>/Contract/getAllContract'
			data-resizable="true">
			</table>
		</div>
	</section>

  <!-- ========================================== Filter Table Modal ========================================== -->
	<div class="modal fade" id="filterTableModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="filterTableModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="filterTableModalLabel">Filter Table</h6>
					<button type="button" class="btn-close cancelContractFilter" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" id="filterModalBody">
					<form id="filterForm" action="" method="post">

						<div class="row g-0 text-center">
							<div class="col-md-4">
								<select class="form-select" id="filterOptionSelect">
									<option selected disabled>Choose filter</option>
									<option value="clientFilter">Client</option>
									<option value="endDateFilter">End Date</option>
								</select>
							</div>
							<div class="ms-4 col-md-7" id="optionContainer">
							</div>
						</div>

						<hr>

						<div class="row g-0 text-center">
							<div class="col-md-4 mt-2 mb-2" id="addFilterField">
								<select class="form-select" id="filterOptionSelect2">
									<option selected disabled>Choose filter</option>
									<option value="clientFilter">Client</option>
									<option value="endDateFilter">End Date</option>
								</select>
							</div>
							<div class="ms-4 col-md-7" id="optionContainer2">
							</div>
						</div>

						<button type="button" class="btn btn-primary mt-2" id="addFilterBtn">
							<i class="fa-solid fa-plus"></i>
						</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger cancelContractFilter" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary filterSubmitBtn">Filter</button>
				</form>
				</div>
			</div>
		</div>
	</div>