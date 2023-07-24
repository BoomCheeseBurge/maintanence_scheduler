        <div class="container">
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

	<!-- ===================================================== Add New User Modal ===================================================== -->
	<div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
				<h5 class="modal-title fs-5" id="addUserModalLabel">New User</h5>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" placeholder="fullname">
							<label for="floatingText">Full-name</label>
						</div>
						<div class="form-floating mb-3">
							<input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
							<label for="floatingEmail">Email</label>
						</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" id="floatingPass" placeholder="********">
							<label for="floatingPass">Password</label>
						</div>
						<div class="input-group mb-3">
							<label class="input-group-text" for="roleInput">Role</label>
							<select class="form-select" id="roleInput">
								<option selected disabled>Choose role</option>
								<option value="admin">Admin</option>
								<option value="manager">Manager</option>
								<option value="user">User</option>
							</select>
						</div>
					</div>
				<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- End popup dialog box -->

    <!-- ===================================================== Edit User Modal ===================================================== -->
	<div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
				<h5 class="modal-title fs-5" id="editUserModalLabel">Edit User</h5>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="post">
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="floatingText" placeholder="fullname">
							<label for="floatingText">Full-name</label>
						</div>
						<div class="form-floating mb-3">
							<input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
							<label for="floatingEmail">Email</label>
						</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" id="floatingPass" placeholder="********">
							<label for="floatingPass">Password</label>
						</div>
						<div class="input-group mb-3">
							<label class="input-group-text" for="roleInput">Role</label>
							<select class="form-select" id="roleInput">
								<option selected disabled>Choose role</option>
								<option value="admin">Admin</option>
								<option value="manager">Manager</option>
								<option value="user">User</option>
							</select>
						</div>
					</div>
				<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- End popup dialog box -->
