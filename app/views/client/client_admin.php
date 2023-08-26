		<div class="container-fluid">

			<div class="row">
				<div class="col-lg-6 flash-container">
				</div>
			</div>

			<h3 class="header-title">Client</h3>

			<span id="toolbar">
				<button class="btn btn-danger" id="remove" data-bs-toggle="modal" data-bs-target="#delBulkClientPICModal" disabled>
				Delete
				</button>
				<div class="dropdown-center dropdownCustom">
					<button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						More actions
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item addClientBtn" href="#" data-bs-toggle="modal" data-bs-target="#addClientModal">Add Client</a></li>
						<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editClientModal">Edit Client</a></li>
						<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delClientModal">Delete Client</a></li>
					</ul>
				</div>
			</span>

			<table
			id="client-table"
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
			data-page-list="[10, 25, 50, 100, all]"
			data-mobile-responsive="true"
			data-show-search-clear-button="true"
			data-check-on-init="true"
			data-url='<?= BASEURL; ?>/client/getAllClient'
			data-resizable="true">
			</table>
		</div>
	</section>

	<!-- ========================================== Add Client Modal ========================================== -->
	<div class="modal fade" id="addClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="addClientModalLabel">New Client</h6>
					<button type="button" class="btn-close cancelAddClient" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post" id="addClientForm">
					<div class="form-floating mb-3">
						<input type="text" class="form-control" name="clientName" required placeholder="clientName">
						<label for="clientName">Client</label>
					</div>
					<h6>PIC Client 1</h6>
					<div class="form-floating mb-1">
						<input type="text" class="form-control" id="picName" name="picName[]" required placeholder="picName">
						<label for="picName">PIC Name</label>
					</div>
					<div class="form-floating mb-4">
						<input type="email" class="form-control" id="picEmail" name="picEmail[]" required placeholder="picEmail">
						<label for="picEmail">PIC Email</label>
					</div>
					<!-- Container for additional PIC fields -->
					<div id="picFieldsContainer"></div>
					<!-- Plus button to add more PIC fields -->
					<button type="button" class="btn btn-primary" id="addPicFieldsBtn">+</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger cancelAddClient" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary addClientSubmitBtn">Add</button>
				</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Edit Client Modal ========================================== -->
	<div class="modal fade" id="editClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editClientModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="editClientModalLabel">Edit Client</h6>
					<button type="button" class="btn-close cancelEditClient" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="editClientForm">
					<div class="form-floating mb-3">
						<input type="search" class="form-control" name="clientName" id="searchClientName" required placeholder="clientName" autocomplete="off">
						<div id="clientNameList" class="clientNameList"></div>
						<label for="searchClientName">Client</label>
					</div>
					<div class="form-floating mb-3">
						<input type="search" class="form-control" name="name" required placeholder="name">
						<label for="name">New Client Name</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger cancelEditClient" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-primary editClientSubmitBtn">Save</button>
				</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Delete Client Modal ========================================== -->
	<div class="modal fade" id="delClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delClientModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delClientModalLabel">Delete Client</h6>
					<button type="button" class="btn-close cancelDelClient" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="delClientForm">
					<div class="form-floating mb-3">
						<input type="search" class="form-control" name="clientName" id="delClientName" required placeholder="clientName" autocomplete="off">
						<div id="delClientNameList" class="clientNameList"></div>
						<label for="delClientName">Client</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelDelClient" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger delClientSubmitBtn">Delete</button>
				</form>
				</div>
			</div>
		</div>
	</div>

    <!-- ========================================== Edit Client PIC Modal ========================================== -->
	<div class="modal fade" id="editClientPICModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editClientPICModalLabel" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title fs-5" id="editClientPICModalLabel">Edit Client PIC</h6>
				<button type="button" class="btn-close cancelEditClientPIC" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form action="" method="post" id="editClientPICForm">
					<div class="form-floating mb-3">
						<input type="search" class="form-control" name="clientName" id="editClientName" required placeholder="clientName" autocomplete="off">
						<div id="editClientNameList" class="clientNameList"></div>
						<label for="editClientName">Client</label>
					</div>
					<h6>PIC Client</h6>
					<input type="hidden" name="id" id="id">
					<div class="form-floating mb-1">
						<input type="text" class="form-control" id="pic_name" name="pic_name" required placeholder="pic_name">
						<label for="pic_name">PIC Name</label>
					</div>
					<div class="form-floating mb-4">
						<input type="email" class="form-control" id="pic_email" name="pic_email" required placeholder="pic_email">
						<label for="pic_email">PIC Email</label>
					</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger cancelEditClientPIC" data-bs-dismiss="modal">Cancel</button>
				<button type="submit" class="btn btn-primary editClientPICSubmitBtn">Save</button>
			</form>
			</div>
		</div>
		</div>
	</div>

	<!-- ========================================== Delete Client PIC Modal ========================================== -->
	<div class="modal fade" id="delClientPICModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delClientPICModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delClientPICModalLabel">Delete Client PIC</h6>
					<button type="button" class="btn-close cancelDelClientPIC" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post" id="delClientPICForm">
						<h6>Are you sure?</h6>
						<input type="hidden" name="picId" id="picId">
						<input type="hidden" name="clientId" id="clientId">
				</div>
				<div class="modal-footer">
						<button type="button" class="btn btn-secondary cancelDelClientPIC" data-bs-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-danger delClientPICSubmitBtn">Confirm</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================== Bulk Delete Client PIC Modal ========================================== -->
	<div class="modal fade" id="delBulkClientPICModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delBulkClientPICModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delBulkClientPICModalLabel">Bulk Delete Client PIC</h6>
					<button type="button" class="btn-close cancelDelBulkPIC" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="bulkDeletePICForm">
					<h6>Are you sure?</h6>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelDelBulkPIC" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger bulkDeleteSubmitBtn">Confirm</button>
				</form>
				</div>
			</div>
		</div>
	</div>