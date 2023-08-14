<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- ================================== Font Awesome ================================== -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ================================== Bootstrap 5 ================================== -->
  <link href="<?= BASEURL; ?>/css/bootstrap.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <!-- ================================== Resizable Column CSS ================================== -->
	<link rel="stylesheet" href="<?= BASEURL; ?>/libs/jquery-resizable-columns-gh-pages/dist/jquery.resizableColumns.css">

    <!-- ================================== Bootstrap Table Extension ================================== -->
	<link rel="stylesheet" href="<?= BASEURL; ?>/libs/bootstrap-table/dist/bootstrap-table.min.css">

    <!-- ================================== Custom Bootstrap ================================== -->
	<link rel="stylesheet" href="/taskscheduler/public/css/my.css">
	<link rel="stylesheet" href="/taskscheduler/public/css/sign-in.css">
	<link rel="stylesheet" href="/taskscheduler/public/css/style.css">

	<title><?= $data['title'] ?></title>
</head>
<body>
	<!-- ==================================== Side Navbar ==================================== -->
	<?php if ( $_SESSION['role'] != 'engineer' ): ?>
	<nav class="sidebar" id="sidebar">
		<header>
			<div class="image">
				<img src="/taskscheduler/public/img/itpro-removebg-logo-with-text.png" alt="ITPro Logo">
			</div>
		</header>

		<div class="menu-bar">
			<ul class="menu-links">
				<li class="nav-link" aria-current="true">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'dashboard' ): ?>
						<a href="<?= BASEURL; ?>" style="background-color: #695CFE;">
							<i class="fa-solid fa-house icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Dashboard</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>">
							<i class="fa-solid fa-house icon"></i>
							<span class="text nav-text">Dashboard</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'history' ): ?>
						<a href="<?= BASEURL; ?>/maintenance" style="background-color: #695CFE;">
							<i class="fa-solid fa-list icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Maintenance</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/maintenance">
							<i class="fa-solid fa-list icon"></i>
							<span class="text nav-text">Maintenance</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'contract' ): ?>
						<a href="<?= BASEURL; ?>/contract" style="background-color: #695CFE;">
							<i class="fa-solid fa-file-signature icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Contract</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/contract">
							<i class="fa-solid fa-file-signature icon"></i>
							<span class="text nav-text">Contract</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'client' ): ?>
						<a href="<?= BASEURL; ?>/client" style="background-color: #695CFE;">
							<i class="fa-solid fa-user-tie icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Client</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/client">
							<i class="fa-solid fa-user-tie icon"></i>
							<span class="text nav-text">Client</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'user' ): ?>
						<a href="<?= BASEURL; ?>/user" style="background-color: #695CFE;">
							<i class="fa-solid fa-users icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">User</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/user">
							<i class="fa-solid fa-users icon"></i>
							<span class="text nav-text">User</span>
						</a>
					<?php endif; ?>
				</li>
			</ul>

			<div class="bottom-content">
				<li class="mode">
					<div class="sun-moon">
						<i class="fa-solid fa-moon icon moon"></i>
						<i class="fa-solid fa-sun icon sun"></i>
					</div>
					<span class="mode-text text">Dark mode</span>

					<div class="toggle-switch">
						<span class="switch"></span>
					</div>
				</li>
			</div>
		</div>
	</nav>

		<!-- =================== Hidden Sidebar =================== -->
		<div class="offcanvas" id="myOffcanvas" data-bs-backdrop="false">
		<div class="offcanvas-header">
			<header class="offcanvas-title">
				<div class="image">
					<img src="/taskscheduler/public/img/itpro-removebg-logo-with-text.png" alt="ITPro Logo">
				</div>
			</header>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div class="menu-bar">
				<ul class="menu-links">
					<li class="nav-link">
						<a href="<?= BASEURL; ?>">
							<i class="fa-solid fa-house icon"></i>
							<span class="text nav-text">Dashboard</span>
						</a>
					</li>

					<li class="nav-link">
						<a href="<?= BASEURL; ?>/maintenance">
							<i class="fa-solid fa-list icon"></i>
							<span class="text nav-text">Maintenance</span>
						</a>
					</li>

					<li class="nav-link">
						<a href="<?= BASEURL; ?>/contract">
							<i class="fa-solid fa-file-signature icon"></i>
							<span class="text nav-text">Contract</span>
						</a>
					</li>

					<li class="nav-link">
						<a href="<?= BASEURL; ?>/client">
							<i class="fa-solid fa-user-tie icon"></i>
							<span class="text nav-text">Client</span>
						</a>
					</li>

					<li class="nav-link">
						<a href="<?= BASEURL; ?>/user">
							<i class="fa-solid fa-users icon"></i>
							<span class="text nav-text">User</span>
						</a>
					</li>
				</ul>

				<div class="bottom-content">
					<li class="hidden-mode">
						<div class="hidden-sun-moon">
							<i class="fa-solid fa-moon icon hidden-moon"></i>
							<i class="fa-solid fa-sun icon hidden-sun"></i>
						</div>
						<span class="hidden-mode-text text">Dark mode</span>

						<div class="hidden-toggle-switch">
							<span class="hidden-switch"></span>
						</div>
					</li>
				</div>
			</div>
		</div>
	</div>
	<?php endif; ?>

	<!-- ==================================== Top Navbar ==================================== -->
  <?php if ( $_SESSION['role'] == 'engineer' ): ?>
    <section class="home-engineer" style="position: unset; width:unset;">
  <?php else: ?>
    <section class="home" id="hide-sidebar">
  <?php endif; ?>
        <nav class="navbar navbar-expand-lg bg-body-tertiary custom-navbar mb-2 navbar-color">
            <div class="container-fluid">
                <div class="top-nav-head">
					<?php if ( $_SESSION['role'] != 'engineer' ): ?>
						<button type="button" class="btn btn-primary btn-sm hiddenSidebarBtn ms-2" id="openOffcanvas">
							<i class="fa-solid fa-bars"></i>
						</button>
					<?php endif; ?>
                  	<a class="navbar-brand ms-2" href="<?= BASEURL; ?>">Task-Scheduler</a>
                </div>
                <div class="d-flex justify-content-end">
                    <!-- Bell Icon for Notifications -->
                    <a class="nav-link text-light ms-2" href="#">
                      <i class="fa-regular fa-bell"></i>
                    </a>
                    <div class="btn-group dropstart">
                        <button type="button" class="btn userColor dropdown-toggle userBtn" data-bs-toggle="dropdown" aria-expanded="false">
                          <img id="userPhoto" src="<?= BASEURL ?>/img/users/<?= $_SESSION['photo'] ?>" alt="User Photo" class="user-photo ms-auto">
                          <div class="username-container user-name ms-1 mt-2">
                            <h6 id="username"><?= $_SESSION['name'] ?></h6>
                          </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end userColor">

                            <li><a class="dropdown-item editUserProfileModal ms-4 userOption" href="#" data-bs-toggle="modal" data-bs-target="#editUserProfileModal" data-id="<?=$_SESSION['id']?>" >Profile<i class="fa-regular fa-id-badge ms-1"></i></a></li>
                            
                            <li><a class="dropdown-item ms-4 userOption" href="<?= BASEURL ?>/Logout">Logout<i class="fa-solid fa-right-from-bracket ms-1"></i></a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>



<!-- Edit User Profile Modal -->
<div class="modal fade" id="editUserProfileModal" tabindex="-1" aria-labelledby="editUserProfileModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editUserProfileModalLabel">Edit User Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Profile Form -->
		<form id="editProfileForm" enctype="multipart/form-data">
		  <input type="hidden" id="userid" name="userid" value="<?=$_SESSION['id']?>">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" value="<?=$_SESSION['name']?>" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" value="<?=$_SESSION['email']?>" required>
          </div>
          <div class="mb-3">
            <label for="photo" class="form-label">Photo</label>
            <input type="file" class="form-control" id="photo" name="photo" accept="image/*">
            <div id="photoPreview" class="photo-preview mt-1"><img src="<?= BASEURL ?>/img/users/<?=$_SESSION['photo']?>" alt="User Photo" style="max-width: 100px; max-height: 100px;"></div>
          </div>
          <!-- Change Password Button -->
		  <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
            Change Password
          </button> 
		  <button type="button" class="btn btn-primary" id="btnSaveChangesUserProfile" data-bs-dismiss="modal">Save Changes</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Change Password Modal -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Change Password Form -->
        <form>
			      <input type="hidden" id="userid" name="userid" value="<?=$_SESSION['id']?>">
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Current Password</label>
            <input type="password" class="form-control" id="currentPassword" required>
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">New Password</label>
            <input type="password" class="form-control" id="newPassword" placeholder="Enter your new password" required>
          </div>
          <div class="mb-3">
            <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
            <input type="password" class="form-control" id="confirmNewPassword" placeholder="Confirm your new password" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="saveChangePasswordForm" class="btn btn-primary">Save Password</button>
      </div>
    </div>
  </div>
</div>




