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
    <!-- ================================== Date Range Picker CSS ================================== -->
	<link rel="stylesheet" type="text/css" href="/taskscheduler/daterangepicker/daterangepicker.css">
    <!-- ================================== Custom Bootstrap ================================== -->
	<link rel="stylesheet" href="/taskscheduler/public/css/style.css">

	<title><?= $data['title'] ?></title>
</head>
<body>
	<!-- ==================================== Side Navbar ==================================== -->
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <div class="image">
                <img src="/taskscheduler/public/img/itpro-removebg-logo-without-text.png" alt="ITPro Logo">
                </div>

                <div class="text logo-text">
                    <div class="name">ITPro</div>
                    <div class="profession">Security Professionals</div>
                </div>
            </div>

            <i class="fa-solid fa-chevron-right fa-2xs toggle"></i>
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
                    <a href="<?= BASEURL; ?>">
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
                <a href="<?= BASEURL; ?>/maintenance" class="btn btn-custom mx-auto me-1" role="button">New Client<i class="fa-solid fa-circle-plus plus-btn ms-2"></i></a>
                <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-custom" type="submit">Search</button>
                    </form>
                </li>
                <li class="nav-item ms-3">
                    <a class="nav-link" href="<?= BASEURL; ?>/mahasiswa"><i class="fa-solid fa-user"></i></a>
                </li>
                </ul>
            </div>
        </nav>
