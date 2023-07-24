<!-- ========================================= CSS Script ========================================= -->
	<script src="/taskscheduler/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- ========================================= JQuery Script ========================================= -->
	<script src="/taskscheduler/public/js/jquery-3.7.0.min.js"></script>

<!-- ========================================= Store.js Script ========================================= -->
	<script src="/taskscheduler/store.js-master/storages/localStorage.js"></script>

<!-- ========================================= Resizable Column Script 1 ========================================= -->
	<script src="/taskscheduler/jquery-resizable-columns-gh-pages/dist/jquery.resizableColumns.min.js"></script>

<!-- ========================================= Bootstrap Table Script ========================================= -->
	<script src="/taskscheduler/public/js/tableExport.min.js"></script>
	<script src="/taskscheduler/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="/taskscheduler/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js"></script>
	<script src="/taskscheduler/bootstrap-table/dist/extensions/resizable/bootstrap-table-resizable.min.js"></script>
	<script src="/taskscheduler/bootstrap-table/dist/extensions/auto-refresh/bootstrap-table-auto-refresh.min.js"></script>
	<script src="https://unpkg.com/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js"></script>

<!-- ========================================= Date Range Picker Script ========================================= -->
	<script type="text/javascript" src="/taskscheduler/daterangepicker/moment.min.js"></script>
	<script type="text/javascript" src="/taskscheduler/daterangepicker/daterangepicker.js"></script>

<!-- ========================================= Event Calendar Script ========================================= -->
	<script src="/taskscheduler/fullcalendar-6.1.8/packages/core/index.global.min.js"></script>
	<script src="/taskscheduler/fullcalendar-6.1.8/packages/daygrid/index.global.min.js"></script>
	<script src="/taskscheduler/fullcalendar-6.1.8/packages/interaction/index.global.min.js"></script>
	<script src="/taskscheduler/fullcalendar-6.1.8/packages/moment/index.global.min.js"></script>

<!-- ========================================= Custom Script ========================================= -->
	<script src="/taskscheduler/public/js/script.js"></script>

	<?php if ($data['identifier'] === 'createSchedule') : ?>
		<script src="/taskscheduler/public/js/search-input.js"></script>
	<?php endif; ?>
	<?php if ($data['identifier'] === 'client') : ?>
		<script src="/taskscheduler/public/js/client-table.js"></script>
	<?php elseif ($data['identifier'] === 'contract') : ?>
		<script src="/taskscheduler/public/js/contract-table.js"></script>
	<?php elseif ($data['identifier'] === 'user') : ?>
		<script src="/taskscheduler/public/js/user-table.js"></script>
	<?php else : ?>
		<script src="/taskscheduler/public/js/dashboard-table.js"></script>
	<?php endif; ?>

<!-- ========================================= Font Awesome Script ========================================= -->
	<script src="https://kit.fontawesome.com/074cfc3e48.js" crossorigin="anonymous"></script>
</body>
</html>