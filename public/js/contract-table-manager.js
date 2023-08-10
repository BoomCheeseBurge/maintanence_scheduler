// Bootstrap Table Extended
var $contractTable = $('#contract-table');

function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'Client',
			field: 'name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP',
			field: 'sop_number',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'device',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}]
	});
}

$(function() {
	initContractTable()

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})