// Admin Bootstrap Table Extended
var $historyDashboardTable = $('#history-dashboard-table')

function initHistoryDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$historyDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
        exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle',
			switchable: false
		}, {
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'Client',
			field: 'name',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'SOP No',
			field: 'sop_number',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'Device',
			field: 'device',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			align: 'center',
		  }, {
			title: 'PM ke-',
			field: 'pm_count',
			align: 'center',
			align: 'center',
		  }, {
			title: 'Scheduled Date',
			field: 'scheduled_date',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Actual Date',
			field: 'actual_date',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Maintenance Status',
			field: 'maintenance_status',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Report Status',
			field: 'report_status',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Report Date',
			field: 'report_date',
			align: 'center',
			valign: 'middle'
		  }]
	})
}

$(function() {
	initHistoryDashboardTable()

	$('#history-dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})