<!-- ========================================= CSS Script ========================================= -->
	<script src="<?= BASEURL; ?>/js/bootstrap.bundle.min.js"></script>

<!-- ========================================= JQuery Script ========================================= -->
	<script src="/taskscheduler/public/js/jquery-3.7.0.min.js"></script>

<!-- ========================================= Store.js Script ========================================= -->
	<script src="<?= BASEURL; ?>/libs/store.js-master/storages/localStorage.js"></script>

<!-- ========================================= Resizable Column Script ========================================= -->
	<script src="<?= BASEURL; ?>/libs/jquery-resizable-columns-gh-pages/dist/jquery.resizableColumns.min.js"></script>

<!-- ========================================= Bootstrap Table Script ========================================= -->
	<!-- <script src="/taskscheduler/public/js/tableExport.min.js"></script> -->
	<script src="<?= BASEURL; ?>/libs/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/bootstrap-table/dist/extensions/resizable/bootstrap-table-resizable.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/bootstrap-table/dist/extensions/auto-refresh/bootstrap-table-auto-refresh.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js"></script>

<!-- ========================================= Table Export Script ========================================= -->
	<script src="<?= BASEURL; ?>/libs/tableExport.jquery.plugin/tableExport.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/tableExport.jquery.plugin/libs/FileSaver/FileSaver.min.js"></script>
	<script src="<?= BASEURL; ?>/libs/tableExport.jquery.plugin/libs/jsPDF/jspdf.umd.min.js"></script>

<!-- ========================================= Custom Script ========================================= -->
	<script src="/taskscheduler/public/js/script.js"></script>
	<script src="/taskscheduler/public/js/auth_script.js"></script>

	<script>
        const BASEURL = '<?= BASEURL; ?>';
    </script>

	<?php if ( isset($data['identifier']) && $data['identifier'] === 'user_admin' ): ?>
		<script src="/taskscheduler/public/js/user-table-admin.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'user_manager' ): ?>
		<script src="/taskscheduler/public/js/user-table-manager.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'client_admin' ): ?>
		<script src="/taskscheduler/public/js/client-table-admin.js"></script>
		<script src="/taskscheduler/public/js/client-form.js"></script>
		<script src="/taskscheduler/public/js/search-input-client.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'client_manager' ): ?>
		<script src="/taskscheduler/public/js/client-table-manager.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'contract_admin' ): ?>
		<script src="/taskscheduler/public/js/contract-table-admin.js"></script>
		<script src="/taskscheduler/public/js/search-input-contract.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'contract_manager' ): ?>
		<script src="/taskscheduler/public/js/contract-table-manager.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'dashboard_admin' ): ?>
		<script src="/taskscheduler/public/js/dashboard-table-admin.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'dashboard_manager' ): ?>
		<script src="/taskscheduler/public/js/dashboard-table-manager.js"></script>
	<?php elseif ( isset($data['identifier']) && $data['identifier'] === 'dashboard_engineer' ): ?>
		<script src="/taskscheduler/public/js/dashboard-table-engineer.js"></script>
	<?php else: ?>
		<script src="/taskscheduler/public/js/history-table.js"></script>
	<?php endif; ?>

<!-- ========================================= Font Awesome Script ========================================= -->
	<script src="https://kit.fontawesome.com/074cfc3e48.js" crossorigin="anonymous"></script>
</body>
</html>