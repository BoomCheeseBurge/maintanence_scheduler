        <div class="container-fluid">

            <div class="row">
                <div class="col-lg-6 flash-container">
                </div>
            </div>

            <h3 class="header-title">User</h3>

            <span id="toolbar">
				<button class="btn btn-danger" id="remove" data-bs-toggle="modal" data-bs-target="#delBulkUserModal" disabled>
				Delete
				</button>
                <button type="button" class="btn btn-primary newUserBtn" data-bs-toggle="modal" data-bs-target="#userModal">Add</button>
			</span>

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
            data-click-to-select="true"
            data-minimum-count-columns="2"
            data-pagination="true"
            data-id-field="id"
            data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
            data-show-search-clear-button="true"
            data-check-on-init="true"
            data-url='<?= BASEURL; ?>/User/getAllUser'
            data-resizable="true">
            </table>
        </div>
    </section>

    <!-- ==================================== Add User Modal ======================================== -->
    <div class="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="userModalLabel"></h1>
                    <button type="button" class="btn-close cancelAddUser" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addUser" action="<?= BASEURL; ?>/User/addUser" method="post">
                        <input type="hidden" name="id" id="id">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" name="name" placeholder="fullname" required>
                            <label for="name">Full-name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="roleInput">Role</label>
                            <select class="form-select" id="roleInput" name="roleInput" required>
                                <option selected disabled>Choose role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="engineer">Engineer</option>
                            </select>
                        </div>
                </div>
                <div class="modal-footer">
                  
                        <button type="button" class="btn btn-danger cancelAddUser" data-bs-dismiss="modal">Cancel</button>

                        <button type="submit" class="btn btn-primary addUserSubmitBtn"></button>
                </div>
                    </form>
            </div>
        </div>
    </div>


    <!-- ==================================== Edit User Modal ======================================== -->
    <div class="modal fade" id="editUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editUserModalLabel">Edit User</h1>
                    <button type="button" class="btn-close cancelEditUser" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editUser" action="<?= BASEURL; ?>/User/getUserById" method="post">
                        <input type="hidden" name="id" id="id">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" name="name" placeholder="fullname" required>
                            <label for="name">Full-name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="roleInput">Role</label>
                            <select class="form-select" id="roleInput" name="roleInput" required>
                                <option selected disabled>Choose role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="engineer">Engineer</option>
                            </select>
                        </div>
                </div>
                <div class="modal-footer">

                        <button type="button" class="btn btn-danger cancelEditUser" data-bs-dismiss="modal">Cancel</button>

                        <button type="submit" class="btn btn-primary editUserSubmitBtn">Save</button>
                </div>
                    </form>
            </div>
        </div>
    </div>


    <!-- ==================================== Delete User Modal ======================================== -->
    <div class="modal fade" id="deleteUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteUserModalLabel">Delete User</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="deleteUser" action="<?= BASEURL; ?>/User/delete" method="post">
                        <input type="hidden" name="id" id="id">
                        <h5 class="text-center">Delete <span id="userNameDelete"></span>?</h5>
                </div>
                <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary deleteUserSubmitBtn">Delete</button>
                </div>
                    </form>
            </div>
        </div>
    </div>

    <!-- ========================================== Bulk Delete Maintenance Modal ========================================== -->
	<div class="modal fade" id="delBulkUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="delBulkUserModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title fs-5" id="delBulkUserModalLabel">Bulk Delete User</h6>
					<button type="button" class="btn-close cancelDelBulkUser" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="bulkDeleteUserForm">
					<h6>Are you sure?</h6>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelDelBulkUser" data-bs-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger bulkDeleteSubmitBtn">Confirm</button>
				</form>
				</div>
			</div>
		</div>
	</div>