// Bootstrap Table Extended
var $userTable = $('#user-table')

function editUserFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editUserModal">',
		'Edit',
		'</button>'
    ].join('')
  }


function initUserTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$userTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
			title: 'ID',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Full Name',
			field: 'full_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'E-mail',
			field: 'email',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Role',
			field: 'role',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
		    formatter: editUserFormatter
	  }]
	})
}

$(function() {
	initUserTable()

	$('#user-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// Create a user Add Button 
	const emptyDiv = document.querySelector('.bs-bars');

	const buttonElement = document.createElement('button');
	buttonElement.textContent = 'Add';
	buttonElement.className = 'btn btn-primary';
	buttonElement.setAttribute('data-bs-target', '#addUserModal');
	buttonElement.setAttribute('data-bs-toggle', 'modal');

	emptyDiv.appendChild(buttonElement);
})

// ---------------------------------------------------------------