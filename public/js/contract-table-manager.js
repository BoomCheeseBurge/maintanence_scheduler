// Bootstrap Table Extended
var $contractTable = $('#contract-table');

function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Client',
			field: 'name',
			align: 'center',
			sortable: true,
			align: 'center',
			width: '200'
		},{
			title: 'SOP',
			field: 'sop_number',
			align: 'center',
			align: 'center'
		},{
			title: 'Device',
			field: 'device',
			align: 'center',
			sortable: true,
			align: 'center'
		},{
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			align: 'center',
			width: '20'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			sortable: true,
			align: 'center'
		}]
	})
}

$(function() {
	initContractTable()

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})