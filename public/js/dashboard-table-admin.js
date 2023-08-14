// Admin Bootstrap Table Extended
var $dashboardTable = $('#dashboard-table');
var $remove = $('#remove');
var selections = [];

// Function to retrieve the selected rows from the table
function getIdSelections() {
	return $.map($dashboardTable.bootstrapTable('getSelections'), function (row) {
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
	console.log("hi");
	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delMaintenanceModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var maintenanceId = button.data('id');
		
		// Set the value of the input field in the modal form
		$('#maintenanceId').val(maintenanceId);
	});

	$(document).on('click', '.cancelDelMaintenance', function() {

		$('.delMaintenanceSubmitBtn').html('Confirm');
	});

	// Delete maintenance event handler
	$(document).on('submit', '#delMaintenanceForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delMaintenanceForm'));

		$('.delMaintenanceSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting maintenance...</span>');

		$.ajax({
			url: BASEURL + '/maintenance/delMaintenance',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#delMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Maintenance', ' successfully', ' deleted', 'success');
					$('#dashboard-table').bootstrapTable('refresh');
				} else if (response['result'] == "2") {
					setFlasher('Maintenance', ' failed', ' to be deleted', 'danger');
				} else {
					alert("Deletion failed. Contact your administrator.");
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error saving changes.");
			}
		});
	});
}

function dashboardFormatter(value, row, index) {
	return [
		'<span class="ms-2 delMaintenanceBtn" data-bs-toggle="modal" data-bs-target="#delMaintenanceModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
	].join('')
  }

function initDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$dashboardTable.bootstrapTable('destroy').bootstrapTable({
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
			title: 'Engineer',
			field: 'engineer_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'Client',
			field: 'client_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP No',
			field: 'sopNumber',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'deviceName',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM ke-',
			field: 'pmCount',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Scheduled Date',
			field: 'scheduledDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Actual Date',
			field: 'actualDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Maintenance Status',
			field: 'maintenanceStatus',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Report Status',
			field: 'reportStatus',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			valign: 'middle',
			switchable: false,
		    formatter: dashboardFormatter
	  }],
	  onPostBody: () => {
		initializeTooltips();
	  }
	});

	$dashboardTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$dashboardTable.bootstrapTable('getSelections').length)

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$(document).on('click', '.cancelDelBulkMaintenance', function() {

		$('.bulkDeleteSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#bulkDeleteMaintenanceForm', function(event) {
		event.preventDefault();

		var ids = getIdSelections();

		$('.bulkDeleteSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting Maintenance...</span>');

		// Send an AJAX request to the server to delete the selected rows
		$.ajax({
			url: BASEURL + '/dashboard/delBulkMaintenance',
			type: 'POST',
			data: { ids: ids },
			dataType: 'json',
			success: function (response) {

				if (response['result'] == '1') {
					$('#delBulkMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					setFlasher('Maintenance', ' successfully', ' deleted', 'success');
					$('#dashboard-table').bootstrapTable('refresh');
					$remove.prop('disabled', true);
				} else if (response['result'] == '2') {
					setFlasher('Maintenance', ' failed', ' to be deleted', 'danger');
					$remove.prop('disabled', true);
				} else {
					alert("Deletion Failed. Contact your administrator.");
					$remove.prop('disabled', true);
				}
			},
			error: function (xhr, status, error) {
				// Handle the error if any
				console.error(error);
			}
		});
	});
}

$(function() {
	initDashboardTable();

	$('#dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();
})
