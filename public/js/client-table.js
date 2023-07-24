// Bootstrap Table Extended
var $clientTable = $('#client-table')

function editClientFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">',
		'Edit',
		'</button>'
    ].join('')
  }

function initClientTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$clientTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Nama',
			field: 'nama',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'PIC Client',
			field: 'pic_client',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'PIC E-mail',
			field: 'pic_email',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
		    formatter: editClientFormatter
	  }]
	})
}

$(function() {
	initClientTable()

	$('#client-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// Create a Client Add Button 
	const emptyDiv = document.querySelector('.bs-bars');

	const buttonElement = document.createElement('button');
	buttonElement.textContent = 'Add';
	buttonElement.className = 'btn btn-primary';
	buttonElement.setAttribute('data-bs-target', '#clientForm');
	buttonElement.setAttribute('data-bs-toggle', 'modal');

	emptyDiv.appendChild(buttonElement);
})

// ---------------------------------------------------------------

// Add PIC button
document.querySelector('.addPIC').on('click', function(e) {
	// When button is clicked, add another PIC input before the add button
	// Count which PIC input is this one
	// Get the modal form dialog box element
});