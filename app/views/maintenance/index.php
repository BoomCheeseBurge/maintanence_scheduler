        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-lg-6">
                    <?php Flasher::flash(); ?>
                </div>
            </div>

            <h3 class="header-title">Maintenance History</h3>

            <table
			id="history-dashboard-table"
			data-toolbar="#toolbar"
			data-search="true"
			data-advanced-search="true"
			data-show-refresh="true"
			data-auto-refresh="true"
			data-auto-refresh-silent="true"
			data-show-auto-refresh="false"
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
			data-url='<?= BASEURL; ?>/maintenance/getMaintenanceHistory'
            data-resizable="true">
			</table>
        </div>
    </section>