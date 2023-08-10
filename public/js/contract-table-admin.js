// Bootstrap Table Extended
var $contractTable = $('#contract-table');
var $remove = $('#remove')
var selections = []

function getIdSelections() {
	return $.map($contractTable.bootstrapTable('getSelections'), function (row) {
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
	$('#contractModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var contractId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(contractId);
	});

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delContractModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var contractId = button.data('id');

		// Set the value of the input field in the modal form
		$('#contractId').val(contractId);
	});

	$('.addContractBtn').on('click', function() {

		$('#contractModalLabel').html('New Contract');
		$('.modal-body form').attr('action', BASEURL + '/contract/addContract');

		$('#id').val('');
		$('#clientName').val('');
		$('#sopNumber').val('');
		$('#deviceName').val('');
		$('#startDate').val('');
		$('#endDate').val('');
		$('#pmFreq').val('');
		$('#assignee').val('');

		$('.modal-footer .contractSubmitBtn').html('Add');
	});

	// $('.contractSubmitBtn').on('click', function() {
	// 	$.ajax({
	// 		url: BASEURL + '/contract/addContract',
	// 		method: 'POST',
	// 		success: function () {
	// 			alert('Contract added successfully');
	// 		},
	// 		error: function (xhr, status, error) {
	// 			console.error('Failed to add contract.');
	// 		}
	// 	});
	// });

	$('.editContractBtn').on('click', function(event) {

		$('#contractModalLabel').html('Edit Contract');
		// $('.modal-body form').attr('action', BASEURL + '/contract/editContract');

		event.preventDefault();

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: BASEURL + '/contract/getEditContractData',
			// Left 'id' => variabe name, Right 'id' => data
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {
				$('#id').val(data.id);
				$('#clientName').val(data.name);
				$('#sopNumber').val(data.sop_number);
				$('#startDate').val(data.start_date);
				$('#endDate').val(data.end_date);
				$('#deviceName').val(data.device);
				$('#pmFreq').val(data.pm_frequency);
				$('#assignee').val(data.full_name);
			}
		});
		// Fetch the submit button based on its button type
		const submitBtn = document.querySelector('button[type="submit"]');

		// Directly add a class to the submit button
		submitBtn.classList.add('editContract');

		$('.modal-footer .contractSubmitBtn').html('Save');
	});

	$('.editContract').on('click', function() {
		$.ajax({
			url: BASEURL + '/contract/addContract',
			method: 'POST',
			success: function () {

				const submitBtn = $('#submitBtn');
				// Directly remove a class from the submit button
				submitBtn.removeClass('btn-primary');
				// After the AJAX request is done, close the modal
				$('#contractModal').modal('hide');
			},
			error: function (xhr, status, error) {
				console.error('Failed to add contract.');
			}
		});
		// Fetch the submit button based on its button type
		const submitBtn = document.querySelector('button[type="submit"]');

		// Directly remove a class from the submit button
		submitBtn.classList.remove('addContract');
	});

	$('.createSchedule').on('click', function() {

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: BASEURL + '/contract/getSingleContractData',
			// Left 'id' => variabe name, Right 'id' => data
			// Send the id of a mahasiswa to the url
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {

				$('#client_name').val(data.name);
				$('#sop_number').val(data.sop_number);
				$('#device').val(data.device);
				$('#pm_frequency').val(data.pm_frequency);
				$('#start_date').val(data.start_date);
				$('#end_date').val(data.end_date);
				$('#full_name').val(data.full_name);
			}
		});
	});
}

function contractFormatter(value, row, index) {
    return [
		'<span class="ms-2 createSchedule" data-bs-toggle="modal" data-bs-target="#scheduleModal" data-id="' + row.id + '">',
		'<button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create maintenance schedule">',
		'<i class="fa-solid fa-calendar-plus"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 editContractBtn" data-bs-toggle="modal" data-bs-target="#contractModal" data-id="' + row.id + '">',
		'<button class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
		'<i class="fa-solid fa-pen-to-square"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 delContractBtn" data-bs-toggle="modal" data-bs-target="#delContractModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
		'</span>'
    ].join('')
  }

function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
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
		},{
			title: 'Client',
			field: 'name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP',
			field: 'sop_number',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'device',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			valign: 'middle',
			width: '20'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			width: '30'
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			width: '30'
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			switchable: false,
			formatter: contractFormatter
	  	}],
		onPostBody: () => {
			initializeTooltips();
			setForm();
		}
	});

	$contractTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$contractTable.bootstrapTable('getSelections').length)

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$remove.click(function () {
		var ids = getIdSelections();

		console.log(ids);
	  
		// Show the confirmation modal
		$('#delBulkContractModal').modal('show');
	  
		// Make sure to remove any previously bound click event on #bulkDeleteBtn
		$('.bulkDeleteBtn').on('click', function (event) {
			event.preventDefault();
		
			// Send an AJAX request to the server to delete the selected rows
			$.ajax({
				url: BASEURL + '/contract/delBulkContract',
				type: 'POST',
				data: { ids: ids },
				success: function (response) {
					console.log(response);
					// Hide the confirmation modal
					$('#delBulkContractModal').modal('hide');
					// Handle the success response if needed
					// For example, you can reload the table data after successful deletion
					$contractTable.bootstrapTable('refresh');
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
	initContractTable()

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})