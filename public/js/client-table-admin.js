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


	$('.editClientPICBtn').on('click', function() {

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: BASEURL + '/client/getClientPICData',
			// Left 'id' => variabe name, Right 'id' => data
			// Send the id of a mahasiswa to the url
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {
				$('#id').val(data.id);
				$('#client_name').val(data.client_name);
				$('#pic_name').val(data.pic_name);
				$('#pic_email').val(data.email);
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
		fullscreen: 'bi-arrows-fullscreen'
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
			sortable: true,
			valign: 'middle'
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
			setForm();
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
	initClientTable()

	$('#client-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
});

// ---------------------------------------------------------------