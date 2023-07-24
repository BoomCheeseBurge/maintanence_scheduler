// Bootstrap Table Extended
var $contractTable = $('#contract-table')

function editContractFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">',
		'Edit',
		'</button>'
    ].join('')
  }


function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Client',
			field: 'client_name',
			align: 'center',
			sortable: true,
			align: 'center'
		},{
			title: 'Engineer',
			field: 'engineer_name',
			align: 'center',
			sortable: true,
			align: 'center'
		},{
			title: 'SOP No',
			field: 'sopnumber',
			align: 'center',
			sortable: true,
			align: 'center'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle',
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
		    formatter: editContractFormatter
	  }]
	})
}

$(function() {
	initContractTable()

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// Create a Client Add Button 
	const emptyDiv = document.querySelector('.bs-bars');

	const buttonElement = document.createElement('button');
	buttonElement.textContent = 'Add';
	buttonElement.className = 'btn btn-primary';

	emptyDiv.appendChild(buttonElement);
})