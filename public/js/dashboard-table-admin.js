// Admin Bootstrap Table Extended
var $dashboardTable = $('#dashboard-table');

function initDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$dashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'Engineer',
			field: 'engineer_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'Client',
			field: 'client_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP No',
			field: 'sopNumber',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'deviceName',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM ke-',
			field: 'pmCount',
			align: 'center',
			valign: 'middle'
		},{
			title: 'PM Month',
			field: 'pmMonth',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Scheduled Date',
			field: 'scheduledDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Actual Date',
			field: 'actualDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Maintenance Status',
			field: 'maintenanceStatus',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Report Status',
			field: 'report',
			align: 'center',
			valign: 'middle',
			sortable: true,
			formatter: function (value, row) {
				return [row.reportStatus, row.reportDate].join('<br>')
			}
		}]
	});
}

$(function() {
	initDashboardTable();

	$('#dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});
})
