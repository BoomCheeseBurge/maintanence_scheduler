// Admin Bootstrap Table Extended
var $managerDashboardTable = $('#manager-dashboard-table')

function initManagerDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$managerDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'No',
			field: 'm_id',
			align: 'center',
			valign: 'middle',
			switchable: false
		},{
			title: 'Engineer',
			field: 'engineer_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'Client',
			field: 'client_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'SOP No',
			field: 'sopNumber',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'Device',
			field: 'deviceName',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'PM ke-',
			field: 'pmCount',
			align: 'center',
			align: 'center',
		  }, {
			title: 'Scheduled Date',
			field: 'scheduledDate',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Actual Date',
			field: 'actualDate',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Maintenance Status',
			field: 'maintenanceStatus',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Report Status',
			field: 'reportStatus',
			align: 'center',
			valign: 'middle'
		  }]
	})
}

$(function() {
	initManagerDashboardTable()

	$('#manager-dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})
