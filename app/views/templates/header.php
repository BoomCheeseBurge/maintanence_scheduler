<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- ================================== Font Awesome ================================== -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ================================== Bootstrap 5 ================================== -->
 	<link href="<?= BASEURL; ?>/css/bootstrap/bootstrap.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <!-- ================================== Resizable Column CSS ================================== -->
	<link rel="stylesheet" href="<?= BASEURL; ?>/libs/jquery-resizable-columns-gh-pages/dist/jquery.resizableColumns.css">

    <!-- ================================== Bootstrap Table Extension ================================== -->
	<link rel="stylesheet" href="<?= BASEURL; ?>/libs/bootstrap-table/dist/bootstrap-table.min.css">

    <!-- ================================== Custom Bootstrap ================================== -->
	<link rel="stylesheet" href="<?= BASEURL; ?>/css/my.css">
	<link rel="stylesheet" href="<?= BASEURL; ?>/css/sign-in.css">
	<link rel="stylesheet" href="<?= BASEURL; ?>/css/style.css">

	<title><?= $data['title'] ?></title>

	<link rel="icon" type="image/x-icon" href="<?= BASEURL; ?>/img/itpro-favicon.ico">
</head>
<body>
	<!-- ==================================== Side Navbar ==================================== -->
	<?php if ( $_SESSION['role'] != 'engineer' ): ?>
	<nav class="sidebar" id="sidebar">
		<header>
			<div class="image">
				<img src="<?= BASEURL; ?>/img/itpro-logo-with-text-outline.png" alt="ITPro Logo">
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
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'maintenance' ): ?>
						<a href="<?= BASEURL; ?>/Maintenance" style="background-color: #695CFE;">
							<i class="fa-solid fa-list icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Maintenance</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/Maintenance">
							<i class="fa-solid fa-list icon"></i>
							<span class="text nav-text">Maintenance</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'contract' ): ?>
						<a href="<?= BASEURL; ?>/Contract" style="background-color: #695CFE;">
							<i class="fa-solid fa-file-signature icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Contract</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/Contract">
							<i class="fa-solid fa-file-signature icon"></i>
							<span class="text nav-text">Contract</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'client' ): ?>
						<a href="<?= BASEURL; ?>/Client" style="background-color: #695CFE;">
							<i class="fa-solid fa-user-tie icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">Client</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/Client">
							<i class="fa-solid fa-user-tie icon"></i>
							<span class="text nav-text">Client</span>
						</a>
					<?php endif; ?>
				</li>

				<li class="nav-link">
					<?php if ( isset($data['activePage']) && $data['activePage'] === 'user' ): ?>
						<a href="<?= BASEURL; ?>/User" style="background-color: #695CFE;">
							<i class="fa-solid fa-users icon" style="color: #E4E9F7;"></i>
							<span class="text nav-text" style="color: #E4E9F7;">User</span>
						</a>
					<?php else: ?>
						<a href="<?= BASEURL; ?>/User">
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
	<div class="offcanvas offcanvas-start" tabindex="-1" id="myOffcanvas">
		<div class="offcanvas-header">
			<header class="offcanvas-title" id="myOffCanvasLabel">
				<div class="image">
					<img src="<?= BASEURL; ?>/img/itpro-logo-with-text-outline.png" alt="ITPro Logo">
				</div>
			</header>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div class="menu-bar">
				<ul class="menu-links">
					<li class="nav-link">
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
						<?php if ( isset($data['activePage']) && $data['activePage'] === 'maintenance' ): ?>
							<a href="<?= BASEURL; ?>/Maintenance" style="background-color: #695CFE;">
								<i class="fa-solid fa-list icon" style="color: #E4E9F7;"></i>
								<span class="text nav-text" style="color: #E4E9F7;">Maintenance</span>
							</a>
						<?php else: ?>
							<a href="<?= BASEURL; ?>/Maintenance">
								<i class="fa-solid fa-list icon"></i>
								<span class="text nav-text">Maintenance</span>
							</a>
						<?php endif; ?>
					</li>

					<li class="nav-link">
						<?php if ( isset($data['activePage']) && $data['activePage'] === 'contract' ): ?>
							<a href="<?= BASEURL; ?>/Contract" style="background-color: #695CFE;">
								<i class="fa-solid fa-file-signature icon" style="color: #E4E9F7;"></i>
								<span class="text nav-text" style="color: #E4E9F7;">Contract</span>
							</a>
						<?php else: ?>
							<a href="<?= BASEURL; ?>/Contract">
								<i class="fa-solid fa-file-signature icon"></i>
								<span class="text nav-text">Contract</span>
							</a>
						<?php endif; ?>
					</li>

					<li class="nav-link">
						<?php if ( isset($data['activePage']) && $data['activePage'] === 'client' ): ?>
							<a href="<?= BASEURL; ?>/Client" style="background-color: #695CFE;">
								<i class="fa-solid fa-user-tie icon" style="color: #E4E9F7;"></i>
								<span class="text nav-text" style="color: #E4E9F7;">Client</span>
							</a>
						<?php else: ?>
							<a href="<?= BASEURL; ?>/Client">
								<i class="fa-solid fa-user-tie icon"></i>
								<span class="text nav-text">Client</span>
							</a>
						<?php endif; ?>
					</li>

					<li class="nav-link">
						<?php if ( isset($data['activePage']) && $data['activePage'] === 'user' ): ?>
							<a href="<?= BASEURL; ?>/User" style="background-color: #695CFE;">
								<i class="fa-solid fa-users icon" style="color: #E4E9F7;"></i>
								<span class="text nav-text" style="color: #E4E9F7;">User</span>
							</a>
						<?php else: ?>
							<a href="<?= BASEURL; ?>/User">
								<i class="fa-solid fa-users icon"></i>
								<span class="text nav-text">User</span>
							</a>
						<?php endif; ?>
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
                  	<a class="navbar-brand ms-2 navbar-title" href="<?= BASEURL; ?>">Task-Scheduler</a>
                </div>
                <div class="d-flex justify-content-end">
					<?php if ( $_SESSION['role'] != 'engineer' ): ?>
					<!-- Bell Icon for Notifications -->
					<button type="button" id="notificationBell" class="position-relative notification-btn">
						<i class="fa-solid fa-bell fa-2xl notification-bell"></i>
						<span id="notification-num" class="position-absolute translate-middle badge rounded-pill bg-danger custom-badge">
							<span class="visually-hidden">unread messages</span>
						</span>
					</button>

					<div id="notificationBox" class="notification-box">
						<div class="notification-container">
							<div class="notification-header">
							Notification
							</div>					
							<div id="notificationContent" class="list-group">
							</div>
						</div>
					</div>
					<?php endif; ?>

                    <div class="btn-group dropstart">
                        <button type="button" class="btn userColor dropdown-toggle userBtn" data-bs-toggle="dropdown" aria-expanded="false">
                          <img id="userPhoto" src="<?= BASEURL ?>/img/users/<?= $_SESSION['photo'] ?>" alt="" class="user-photo ms-auto">
                          <div class="username-container user-name ms-1 mt-2">
                            <h6 id="username"><?= $_SESSION['name'] ?></h6>
                          </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end userColor">

                            <li><a class="dropdown-item editUserProfileModal ms-4 userOption" href="#" data-bs-toggle="modal" data-bs-target="#editUserProfileModal" data-id="<?=$_SESSION['id']?>" >Profile<i class="fa-regular fa-id-badge ms-1"></i></a></li>

							<?php if ( $_SESSION['role'] == 'admin' ): ?>
							<li><a id="emailConfigModalBtn" class="dropdown-item emailConfigModal ms-4 userOption" href="#" data-bs-toggle="modal" data-bs-target="#emailConfigModal">Setting<i class="fa-solid fa-gear ms-1"></i></a></li>
							<?php endif; ?>

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
					<button type="button" class="btn-close cancelChangePassForm" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<!-- Change Password Form -->
					<form id="changePasswordForm">
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
					<button type="button" class="btn btn-secondary cancelChangePassForm" data-bs-dismiss="modal">Cancel</button>
					<button type="button" id="saveChangePasswordForm" class="btn btn-primary">Save Password</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Email Configuration Setting Modal -->
	<div class="modal fade" id="emailConfigModal" tabindex="-1" aria-labelledby="emailConfigModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="emailConfigModalLabel">Email Configuration</h5>
					<button type="button" class="btn-close cancelConfigForm" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form action="" method="post" id="configEmailForm">
					<div class="mb-3">
						<label for="supEmail" class="form-label">Support Email</label>
						<input type="email" class="form-control" id="supEmail" name="supEmail" required>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary cancelConfigForm" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary emailConfigSubmitBtn">Save Changes</button>
				</form>
				</div>
			</div>
		</div>
	</div>