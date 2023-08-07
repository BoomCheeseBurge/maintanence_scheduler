		<div class="container">

			<h3 class="header-title">Dashboard</h3>

			<table
			id="dashboard-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-show-auto-refresh="false"
			data-show-fullscreen="true"
			data-show-columns="true"
			data-show-columns-toggle-all="true"
			data-show-export="true"
			data-minimum-count-columns="2"
			data-pagination="true"
			data-id-field="m_id"
			data-page-list="[10, 25, 50, 100, all]"
            data-mobile-responsive="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/maintenance/getScheduleList'
            data-resizable="true">
			</table>
		</div>
	</section>
