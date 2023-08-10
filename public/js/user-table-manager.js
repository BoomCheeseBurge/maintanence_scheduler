// Bootstrap Table Extended

var $userTable = $('#user-table')

function initUserTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$userTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		columns: [
		{
			title: 'Full Name',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'E-mail',
			field: 'email',
			align: 'center',
			valign: 'middle',
		}, {
			title: 'Role',
			field: 'role',
			align: 'center',
			valign: 'middle',
			sortable: true
		}]
	});
}

$(function() {
	initUserTable()

	$('#user-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})

// ---------------------------------------------------------------