// Bootstrap Table Extended
var $clientTable = $('#client-table')
var $remove = $('#remove')
var selections = []

function getIdSelections() {
	return $.map($clientTable.bootstrapTable('getSelections'), function (row) {
		return row.id
	})
}

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Function to display the flasher message after an action is triggered
function setFlasher(column, message, action, type) {
	
	const flashContainer = $('<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert"></div>');
	const flashMessage =  $('<p>' + column + ' <strong>' + message + '</strong>' + action + '</p>');
	const dismissBtn = $('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

	flashContainer.append(flashMessage);
	flashContainer.append(dismissBtn);
	$('.flash-container').append(flashContainer);
}

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delClientPICModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var picId = button.data('id');

		// Set the value of the input field in the modal form
		$('#picId').val(picId);
	});

	// ==========================================================================================================
	// Add Client Event Handler starts here

	$(document).on('click', '.cancelAddClient', function() {

		$('.addClientSubmitBtn').html('Add');
	});

	// Delegate the form submission handler to the document
	$(document).on('submit', '#addClientForm', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('addClientForm'));

		$('.addClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Adding client...</span>');

		$.ajax({
			url: BASEURL + '/client/addClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#addClientModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Client', ' successfully', ' added', 'success');
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Client', ' failed', ' to be added', 'danger');
				} else {
					alert("Entry Failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error adding new client.");
			}
		});
	});

	// ==========================================================================================================
	// Edit Client Event Handler starts here

	$(document).on('click', '.cancelEditClient', function() {

		$('.editClientSubmitBtn').html('Save');
	});

	$(document).on('submit', '#editClientForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editClientForm'));

		$('.editClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Saving client...</span>');

		$.ajax({
			url: BASEURL + '/client/editClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Client', ' successfully', ' saved', 'success');
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Client', ' failed', ' to be saved', 'danger');
				} else {
					alert("Save changes failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error saving changes.");
			}
		});
	});

	// ==========================================================================================================
	// Delete Client Event Handler starts here

	$(document).on('click', '.cancelDelClient', function() {

		$('.delClientSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#delClientForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delClientForm'));

		$('.delClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting client...</span>');

		$.ajax({
			url: BASEURL + '/client/delClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Client', ' successfully', ' deleted', 'success');
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Client', ' failed', ' to be deleted', 'danger');
				} else {
					alert("Deletion Failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error deleting existing contract.");
			}
		});
	});

	// ______________________________________________________________________________________________________________________________________________________

	// ==========================================================================================================
	// Edit Client PIC Event Handler starts here

	$(document).on('click', '.cancelEditClientPIC', function() {

		$('.editClientPICSubmitBtn').html('Save');
	});

	$(document).on('click', '.editClientPICBtn', function() {

		const id = $(this).data('id');

		$.ajax({

			url: BASEURL + '/client/getClientPICData',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {
				$('#id').val(data.id);
				$('#client_name').val(data.client_name);
				$('#pic_name').val(data.pic_name);
				$('#pic_email').val(data.email);
			}
		});
	});

	$(document).on('submit', '#editClientPICForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editClientPICForm'));

		$('.editClientPICSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Saving PIC...</span>');

		$.ajax({
			url: BASEURL + '/client/editClientPIC',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#editClientPICModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Client PIC', ' successfully', ' saved', 'success');
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Client PIC', ' failed', ' to be saved', 'danger');
				} else if (response['result'] == "3") {
					setFlasher('Client PIC', ' failed', ' to be found', 'danger');
				} else {
					alert("Save changes failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error saving changes.");
			}
		});
	});

	// ==========================================================================================================
	// Delete Client PIC Event Handler starts here

	$(document).on('click', '.cancelDelClientPIC', function() {

		$('.delClientPICSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#delClientPICForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delClientPICForm'));

		$('.delClientPICSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting PIC...</span>');

		$.ajax({
			url: BASEURL + '/client/delClientPIC',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#delClientPICModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Client PIC', ' successfully', ' deleted', 'success');
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Client PIC', ' failed', ' to be deleted', 'danger');
				} else {
					alert("Deletion Failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error deleting existing contract.");
			}
		});
	});

}

function clientFormatter(value, row, index) {
    return [
		'<span class="ms-2 editClientPICBtn" data-bs-toggle="modal" data-bs-target="#editClientPICModal" data-id="' + row.id + '">',
		'<button class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
		'<i class="fa-solid fa-pen-to-square"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 delClientBtn" data-bs-toggle="modal" data-bs-target="#delClientPICModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
		'</span>',
    ].join('')
  }

function initClientTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$clientTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			field: 'state',
			checkbox: true,
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Name',
			field: 'client_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'PIC Client',
			field: 'pic_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'PIC E-mail',
			field: 'pic_email',
			align: 'center',
			valign: 'middle',
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			valign: 'middle',
			switchable: false,
		    formatter: clientFormatter
		}],
		onPostBody: () => {
			initializeTooltips();
		}
	});

	$clientTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$clientTable.bootstrapTable('getSelections').length)

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$remove.click(function () {
		var ids = getIdSelections();

		// console.log(ids);
		
		// Show the confirmation modal
		$('#delBulkClientPICModal').modal('show');
		
		// Make sure to remove any previously bound click event on #bulkDeleteBtn
		$('.bulkDeleteBtn').on('click', function (event) {
			event.preventDefault();
		
			// Send an AJAX request to the server to delete the selected rows
			$.ajax({
			url: BASEURL + '/client/delBulkClientPIC',
			type: 'POST',
			data: { ids: ids },
			success: function (response) {
				console.log(response);
				// Hide the confirmation modal
				$('#delBulkClientPICModal').modal('hide');
				// Handle the success response if needed
				// For example, you can reload the table data after successful deletion
				$clientTable.bootstrapTable('refresh');
				$remove.prop('disabled', true);
			},
			error: function (xhr, status, error) {
				// Handle the error if any
				console.error(error);
			}
			});
		});
	});
}

$(function() {
	initClientTable();

	$('#client-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();
});

// ---------------------------------------------------------------