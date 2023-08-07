// Bootstrap Table Extended

var $userTable = $('#user-table')

function initUserTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
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
			sortable: true,
<<<<<<< HEAD
			align: 'center'
		  }, {
=======
			valign: 'middle'
		}, {
>>>>>>> 7f4d668992cd18ab05ccbe3ceeb83614ff1d68be
			title: 'E-mail',
			field: 'email',
			align: 'center',
			valign: 'middle',
<<<<<<< HEAD
		  }, {
=======
		}, {
>>>>>>> 7f4d668992cd18ab05ccbe3ceeb83614ff1d68be
			title: 'Role',
			field: 'role',
			align: 'center',
			valign: 'middle'
<<<<<<< HEAD
		  }]
	})
=======
		}]
	});
>>>>>>> 7f4d668992cd18ab05ccbe3ceeb83614ff1d68be
}

$(function() {
	initUserTable()

	$('#user-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})

// ---------------------------------------------------------------