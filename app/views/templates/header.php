<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ================================== Bootstrap 5 ================================== -->
	<link rel="stylesheet" href="/taskscheduler/bootstrap-5.3.0/css/bootstrap.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <!-- ================================== Resizable Column CSS ================================== -->
	<link rel="stylesheet" href="/taskscheduler/jquery-resizable-columns-gh-pages/dist/jquery.resizableColumns.css">

    <!-- ================================== Bootstrap Table Extension ================================== -->
	<link rel="stylesheet" href="/taskscheduler/bootstrap-table/dist/bootstrap-table.min.css">

    <!-- ================================== Custom Bootstrap ================================== -->
	<link rel="stylesheet" href="/taskscheduler/public/css/style.css">

	<title><?= $data['title'] ?></title>
</head>
<body>
	<!-- ==================================== Side Navbar ==================================== -->
    <nav class="sidebar close">
        <header>
            <div class="image">
                <img src="/taskscheduler/public/img/itpro-removebg-logo-with-text.png" alt="ITPro Logo">
            </div>
        </header>

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

	<!-- ==================================== Top Navbar ==================================== -->
    <section class="home">
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-tall mb-2 navbar-color">
            <div class="container-fluid">
                <a class="navbar-brand ms-4" href="<?= BASEURL; ?>">Task-Scheduler</a>
                <div class="d-flex justify-content-end">
                    <div class="btn-group dropstart">
                        <button type="button" class="btn userColor dropdown-toggle userBtn" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user fa-xl"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end userColor">
                            <li><a class="dropdown-item ms-4" href="#">Profile<i class="fa-regular fa-id-badge ms-1"></i></a></li>
                            <li><a class="dropdown-item ms-4" href="#">Logout<i class="fa-solid fa-right-from-bracket ms-1"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
