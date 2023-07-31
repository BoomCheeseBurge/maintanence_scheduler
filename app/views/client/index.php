	<div class="container">

		<div class="row">
			<div class="col-lg-6">
				<?php Flasher::flash(); ?>
			</div>
		</div>

		<h3 class="header-title">Client</h3>

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
		data-minimum-count-columns="2"
		data-pagination="true"
		data-id-field="id"
		data-page-list="[10, 25, 50, 100, all]"
		data-mobile-responsive="true"
		data-check-on-init="true"
		data-url='<?= BASEURL; ?>/client/getAllClient'
		data-resizable="true">
			<div class="spinner-border d-none" id="spinner" style="width: 5rem; height: 5rem;" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</table>
		</div>
	</section>

  <!-- ========================================== Add Client Modal ========================================== -->
  <div class="modal fade" id="addClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title fs-5" id="addClientModalLabel">New Client</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/client/addClient" method="post">
            <div class="form-floating mb-3">
			  <input type="search" class="form-control" name="clientName" id="clientName" required placeholder="clientName">
				<div id="clientNameList"></div>
				<label for="clientName">Client</label>
            </div>
            <h6>PIC Client 1</h6>
            <div class="form-floating mb-1">
              <input type="text" class="form-control" id="picName" name="picName" required placeholder="picName">
              <label for="picName">PIC Name</label>
            </div>
            <div class="form-floating mb-4">
                <input type="email" class="form-control" id="picEmail" name="picEmail" required placeholder="picEmail">
                <label for="picEmail">PIC Email</label>
            </div>
          <!-- Container for additional PIC fields -->
          <div id="picFieldsContainer"></div>
          <!-- Plus button to add more PIC fields -->
          <button type="button" class="btn btn-primary" id="addPicFieldsBtn">+</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>

    <!-- ========================================== Edit Client Modal ========================================== -->
	<div class="modal fade" id="editClientPICModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editClientPICModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title fs-5" id="editClientPICModalLabel">Edit Client</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/client/editClientPIC" method="post">
            <div class="form-floating mb-3">
			  <input type="search" class="form-control" name="name" id="name" required placeholder="name">
				<div id="clientNameList"></div>
				<label for="name">Client</label>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>