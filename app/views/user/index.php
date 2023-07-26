        <div class="container">

			<div class="row">
				<div class="col-lg-6">
					<?php Flasher::flash(); ?>
				</div>
			</div>
			
            <h3>User</h3>
			
			<table
			id="user-table"
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

	<!-- ========================================== Add and Edit User Modal ========================================== -->
	<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="userModalLabel"></h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<input type="hidden" name="id" id="id">
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" placeholder="fullname">
							<label for="floatingText">Full-name</label>
						</div>
						<div class="form-floating mb-3">
							<input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
							<label for="floatingEmail">Email</label>
						</div>
						<div class="input-group mb-3">
							<label class="input-group-text" for="roleInput">Role</label>
							<select class="form-select" id="roleInput">
								<option selected disabled>Choose role</option>
								<option value="admin">Admin</option>
								<option value="manager">Manager</option>
								<option value="user">Engineer</option>
							</select>
						</div>
					</div>
				<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="submit" class="btn btn-primary"></button>
					</form>
				</div>
			</div>
		</div>
	</div>
