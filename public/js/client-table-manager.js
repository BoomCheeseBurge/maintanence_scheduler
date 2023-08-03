// Bootstrap Table Extended
var $clientTable = $('#client-table')

function initClientTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$clientTable.bootstrapTable('destroy').bootstrapTable({
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
			title: 'Name',
			field: 'client_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'PIC Client',
			field: 'pic_name',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'PIC E-mail',
			field: 'pic_email',
			align: 'center',
			valign: 'middle',
		  }]
	})
}

$(function() {
	initClientTable()

	$('#client-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
});

// ---------------------------------------------------------------