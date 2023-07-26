// Bootstrap Table Extended
var $contractTable = $('#contract-table')

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#contractModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var contractId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(contractId);

		console.log(contractId);
	});

	$('.addContractBtn').on('click', function() {

		$('#contractModalLabel').html('New Contract');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/contract/addContract');
		$('.modal-footer .contractSubmitBtn').html('Add');
	});

	$('.editContractBtn').on('click', function() {

		$('#contractModalLabel').html('Edit Contract');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/contract/editContract');
		$('.modal-footer .contractSubmitBtn').html('Save');
	});
}

function contractFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning editContractBtn" data-bs-toggle="modal" data-bs-target="#contractModal">',
		'Edit',
		'</button>',
		'<button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#scheduleModal">',
		'<i class="fa-solid fa-calendar-plus"></i>',
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
		},{
			title: 'PM Frequency',
			field: 'pm_freq',
			align: 'center',
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
			width: 150,
		    formatter: contractFormatter
	  }],
	  onPostBody: setForm
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
	buttonElement.className = 'btn btn-primary addContractBtn';
	buttonElement.setAttribute('data-bs-target', '#contractModal');
	buttonElement.setAttribute('data-bs-toggle', 'modal');

	emptyDiv.appendChild(buttonElement);
})