		<div class="container-fluid">

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
			data-show-search-clear-button="true"
            data-check-on-init="true"
			data-url='<?= BASEURL; ?>/Maintenance/getScheduleList'
            data-resizable="true">
			</table>

			<br>
			<hr>
			<br>

			<!-- Buttons or dropdown to switch between time periods -->
			<button class="btn btn-primary" id="yearlyViewBtn">Year View</button>
			<button class="btn btn-primary" id="monthlyViewBtn">Month View</button>
			
			<br><br>

			<div id="chart-container">
				<div id="lateReportChart"></div>
			</div>
			
		</div>
	</section>