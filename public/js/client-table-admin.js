// Bootstrap Table Extended
var $clientTable = $('#client-table');
var $remove = $('#remove'); 
var selections = [];

function getIdSelections() {
	return $.map($clientTable.bootstrapTable('getSelections'), function (row) {
		return row.id;
	})
}

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setForm() {

	// ================
	// Add client form
	// ================

	// Initialize the counter variable
	let picCounter = 2;

	// Container for the delete button
	const deleteButton = $(`<button type="button" class="btn btn-danger delete-pic mb-4">-</button>`);

	// Click event for the plus button
	$('#addPicFieldsBtn').click(function() {
		// Create a unique ID for the new set of input fields
		const uniqueId = `picClient${picCounter}`;
		
		// Create a new PIC fields div
		const picFieldsDiv = $(`<div class="pic-fields" id="${uniqueId}">`);
		// Add the input fields to the div
		picFieldsDiv.append(`<h6>PIC Client ${picCounter}</h6>`);
		picFieldsDiv.append('<div class="form-floating mb-1">' +
			'<input type="text" class="form-control" name="picName[]" required placeholder="picName">' +
			`<label ${uniqueId}-name>PIC Name</label>` +
			'</div>');
		picFieldsDiv.append('<div class="form-floating mb-4">' +
			'<input type="email" class="form-control" name="picEmail[]" required placeholder="picEmail">' +
			`<label for="${uniqueId}-email">PIC Email</label>` +
			'</div>');
		
		// Append the delete button to the newly added PIC fields div
		picFieldsDiv.append(deleteButton);

		// Append the new PIC fields div to the container
		$('#picFieldsContainer').append(picFieldsDiv);

		// Increment the counter
		picCounter++;
	});
	
	// Event delegation to handle the click event of delete buttons
	$('#picFieldsContainer').on('click', '.delete-pic', function() {
		// Get the parent div of the delete button (i.e., the PIC fields div)
		const picFieldsDiv = $(this).closest('.pic-fields');

		// Remove the current set of input fields
		picFieldsDiv.remove();

		// Decrement the counter
		picCounter--;

		// Get the previous set of PIC fields and add the delete button to it
		const prevPicFieldsId = `picClient${picCounter - 1}`;
		const prevPicFieldsDiv = $(`#${prevPicFieldsId}`);
		prevPicFieldsDiv.append(deleteButton);
	});

	// ==========================================================================================================
	// Add Client Event Handler starts here

	$(document).on('click', '.cancelAddClient', function() {
		for (let i = 1; i < picCounter; i++) {
			$('#picClient'+(i+1)).remove();
		}
		picCounter = 2;
		
		$("#addClientForm").trigger("reset");
		$('.addClientSubmitBtn').html('Add');
	});

	// Delegate the form submission handler to the document
	$(document).on('submit', '#addClientForm', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('addClientForm'));

		$('.addClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Adding client...</span>');

		$.ajax({
			url: BASEURL + '/Client/addClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$("#addClientForm").trigger("reset");
					$('#addClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Client successfully added',
						showConfirmButton: false,
						timer: 2000
					});
					$('#client-table').bootstrapTable('refresh');
					
					for (let i = 1; i < picCounter; i++) {
						$('#picClient'+(i+1)).remove();
					}
					picCounter = 2;
				} else if (response['result'] == '2') {
					$('#addClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client failed to be added',
						showConfirmButton: true
					});
				} else if (response['result'] == '3') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'One or more client PICs\' email address already exist',
						showConfirmButton: true
					});
					$('.addClientSubmitBtn').html('Add');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Entry Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.addClientSubmitBtn').html('Add');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error adding new client");
				$('.addClientSubmitBtn').html('Add');
			}
		});
	});

	// ==========================================================================================================
	// Edit Client Event Handler starts here

	$(document).on('click', '.cancelEditClient', function() {

		$("#editClientForm").trigger("reset");
		$('.editClientSubmitBtn').html('Save');
	});

	$(document).on('submit', '#editClientForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editClientForm'));

		$('.editClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Saving client...</span>');

		$.ajax({
			url: BASEURL + '/Client/editClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$("#editClientForm").trigger("reset");
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Client successfully updated',
						showConfirmButton: false,
						timer: 2000
					});
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client failed to be updated',
						showConfirmButton: true
					});
				} else if (response['result'] == '3') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client already exists',
						showConfirmButton: true
					});
					$('.editClientSubmitBtn').html('Save');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Updated changes Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.editClientSubmitBtn').html('Save');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error saving changes");
				$('.editClientSubmitBtn').html('Save');
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

		$('.delClientSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting client...</span>');

		$.ajax({
			url: BASEURL + '/Client/delClient',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$("#delClientForm").trigger("reset");
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Client successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == '0') {
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client failed to be deleted',
						showConfirmButton: true
					});
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted record is unrelated to any contract or maintenance',
						showConfirmButton: true
					});
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
				} else if (response['result'] == 'clientNotFound') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client not found. Please try again',
						showConfirmButton: true
					});
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('#delClientModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error deleting existing client");
			}
		});
	});

	// ______________________________________________________________________________________________________________________________________________________

	// ==========================================================================================================
	// Edit Client PIC Event Handler starts here

	let pic_name;
	let pic_email;

	$(document).on('click', '.cancelEditClientPIC', function() {

		$("#editClientPICForm").trigger("reset");
		$('.editClientPICSubmitBtn').html('Save');
	});

	$(document).on('click', '.editClientPICBtn', function() {

		const id = $(this).data('id');

		$.ajax({

			url: BASEURL + '/Client/getClientPICData',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {
				$('#id').val(data.id);
				$('#pic_name').val(data.pic_name);
				$('#pic_email').val(data.email);

				pic_name = data.pic_name;
				pic_email = data.email;
			}
		});
	});

	$(document).on('submit', '#editClientPICForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editClientPICForm'));

		// Check if the email has been changed
		if(formData.get('pic_email') != pic_email) {
			formData.append('emailChanged', 'true');
		} else {
			formData.append('emailChanged', 'false');
		}

		if(formData.get('pic_name') != pic_name || formData.get('pic_email') != pic_email) {

			$('.editClientPICSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Saving PIC...</span>');

			$.ajax({
				url: BASEURL + '/Client/editClientPIC',
				type: 'POST',
				data: formData,
				contentType: false,
				processData: false,
				dataType: 'json',
				success: function(response) {

					if (response['result'] == '1') {
						$("#editClientPICForm").trigger("reset");
						$('#editClientPICModal [data-bs-dismiss="modal"]').trigger('click');
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Client PIC successfully updated',
							showConfirmButton: false,
							timer: 2000
						});
						$('#client-table').bootstrapTable('refresh');
					} else if (response['result'] == '2') {
						$('#editClientPICModal [data-bs-dismiss="modal"]').trigger('click');
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Client PIC failed to be updated',
							showConfirmButton: true
						});
					} else if (response['result'] == '3') {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Client PIC already exists',
							showConfirmButton: true
						});
						$('.editClientPICSubmitBtn').html('Save');
					} else {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Updated changes failed. Contact your administrator',
							showConfirmButton: true
						});
						$('.editClientPICSubmitBtn').html('Save');
					}
				},
				error: function(xhr, status, error) {
					// Request failed, handle error here
					console.log(error);
					alert("Error saving changes");
					$('.editClientPICSubmitBtn').html('Save');
				}
			});
		} else {$('#editClientPICModal [data-bs-dismiss="modal"]').trigger('click');}
	});

	// ==========================================================================================================
	// Delete Client PIC Event Handler starts here

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delClientPICModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var picId = button.data('pic_id');
		var clientId = button.data('client_id');

		// Set the value of the input field in the modal form
		$('#picId').val(picId);
		$('#clientId').val(clientId);
		// console.log(picId, clientId);
	});

	$(document).on('click', '.cancelDelClientPIC', function() {

		$('.delClientPICSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#delClientPICForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delClientPICForm'));

		$('.delClientPICSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting PIC...</span>');

		$.ajax({
			url: BASEURL + '/Client/delClientPIC',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				// console.log(response['result']);

				if (response['result'] == '1') {
					$('#delClientPICModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Client PIC successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#client-table').bootstrapTable('refresh');
				} else if (response['result'] == '0') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client PIC failed to be deleted',
						showConfirmButton: true
					});
					$('#delClientPICModal [data-bs-dismiss="modal"]').trigger('click');
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted record is not related to a client',
						showConfirmButton: true
					});
					$('#delClientPICModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('#delClientPICModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function(xhr, status, error) {
				console.log(error);
				// Request failed, handle error here
				alert("Error deleting existing client PIC");
			}
		});
	});

}

function clientFormatter(value, row, index) {
    return [
		'<span class="ms-2 editClientPICBtn" data-bs-toggle="modal" data-bs-target="#editClientPICModal" data-id="' + row.pic_id + '">',
		'<button class="btn btn-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
		'<i class="fa-solid fa-pen-to-square"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 delClientBtn" data-bs-toggle="modal" data-bs-target="#delClientPICModal" data-pic_id="' + row.pic_id + '" data-client_id="' + row.client_id + '">',
		'<button class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
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

	$(document).on('click', '.cancelDelBulkPIC', function() {

		$('.bulkDeleteSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#bulkDeletePICForm', function(event) {
		event.preventDefault();

		var ids = getIdSelections();

		$('.bulkDeleteSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting PIC...</span>');
	
		$.ajax({
			url: BASEURL + '/Client/delBulkClientPIC',
			type: 'POST',
			data: { ids: ids },
			dataType: 'json',
			success: function (response) {

				if (response['result'] == ids.length) {
					$('#delBulkClientPICModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Client PICs successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#client-table').bootstrapTable('refresh');
					$remove.prop('disabled', true);
				} else if (response['result'] == '0') {
					$('#delBulkClientPICModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client PICs failed to be deleted',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted records are not related to a client',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkClientPICModal [data-bs-dismiss="modal"]').trigger('click');
				}else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkClientPICModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function () {
				// Handle the error if any
				alert("Error deleting existing client PICs");
			}
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