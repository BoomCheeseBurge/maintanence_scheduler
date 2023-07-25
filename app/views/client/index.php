	<div class="container">

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
		data-url='<?= BASEURL; ?>/client/getClients'
		data-resizable="true">
		    <!-- <a class="btn btn-primary addClientBtn" href="/task" role="button">Add</a> -->
		</table>
		</div>
	</section>

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

    <!-- Modal -->
  <div class="modal fade" id="clientForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="clientFormLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="clientFormLabel">Add Client</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/client/addClient" method="post">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingText" required placeholder="clientName">
              <label for="floatingText">Client Name</label>
            </div>
            <h6>PIC Client 1</h6>
            <div class="form-floating mb-1">
              <input type="text" class="form-control" id="floatingPIC" required placeholder="picName">
              <label for="floatingPIC">PIC Name</label>
            </div>
            <div class="form-floating mb-4">
                <input type="email" class="form-control" id="floatingEmail" required placeholder="picEmail">
                <label for="floatingEmail">PIC Email</label>
            </div>
          <!-- Container for additional PIC fields -->
          <div id="picFieldsContainer"></div>
          <!-- Plus button to add more PIC fields -->
          <button type="button" class="btn btn-primary" id="addPicFieldsBtn">+</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
