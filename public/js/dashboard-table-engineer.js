// Engineer Bootstrap Table Extended
var $engineerDashboardTable = $('#engineer-dashboard-table');

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#formModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var maintenanceId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(maintenanceId);
	});
	
	// ==========================================================================================================
	// Set Schedule Date Event Handler starts here

	$(document).on('click', '.cancelSetDateBtn', function() {

		$(".maintenanceForm").trigger("reset");
		$('.setDateSubmitBtn').html('Set');
	});

	$(document).on('click', '.scheduledDateBtn', function() {

		$('#formModalLabel').html('Scheduled Maintenance Date');

		$('.maintenanceForm').attr('id', 'setScheduleDateForm');
	});

	// Delegate the form submission handler to the document
	$(document).on('submit', '#setScheduleDateForm', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('setScheduleDateForm'));

		$('.setDateSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Setting date...</span>');
		
		$.ajax({
			url: BASEURL + '/Dashboard/setScheduledDate',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {
				if (response['result'] == '1') {
					$('#formModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Scheduled date successfully set',
						showConfirmButton: false,
						timer: 2000
					});
					$('.setDateSubmitBtn').html('Set');
					$('#engineer-dashboard-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Scheduled date failed to be set',
						showConfirmButton: true
					});
					$('.setDateSubmitBtn').html('Set');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Entry Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.setDateSubmitBtn').html('Set');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error setting scheduled date.");
				$('.setDateSubmitBtn').html('Set');
			}
		});
	});

	// ==========================================================================================================
	// Set Actual Date Event Handler starts here

	$(document).on('click', '.actualDateBtn', function() {

		$('#formModalLabel').html('Actual Maintenance Date');

		$('.maintenanceForm').attr('id', 'setActualDateForm');
	});

	$(document).on('submit', '#setActualDateForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('setActualDateForm'));

		$('.setDateSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Setting date...</span>');

		$.ajax({
			url: BASEURL + '/Dashboard/setActualDate',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#formModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Actual date successfully set',
						showConfirmButton: false,
						timer: 2000
					});
					$('.setDateSubmitBtn').html('Set');
					$('#engineer-dashboard-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Actual date failed to be set',
						showConfirmButton: true
					});
					$('.setDateSubmitBtn').html('Set');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Entry failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.setDateSubmitBtn').html('Set');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error setting actual date.");
				$('.setDateSubmitBtn').html('Set');
			}
		});
	});
}

function reportFormatter(row) {
    return [row.report_status, row.report_date].join('<br>');
}

function filterTable() {
	// Filter the maintenance table
	$('#maintenance').change(function() {
		// Get the selected option's value
		var selectedValue = $(this).val();
		
		$.ajax({
			url: BASEURL + '/Maintenance/filterEngineerDashboard',
			data: {selectedValue : selectedValue},
			type: 'POST',
			dataType: 'json',
			success: function (data) {
		
				// Prepare the data for the Bootstrap Table
				var tableData = [];
				for (var i = 0; i < data.length; i++) {
					var rowData = {
						name: data[i].name,
						device: data[i].device,
						pm_count: data[i].pm_count,
						month: data[i].month,
						scheduled_date: data[i].scheduled_date,
						actual_date: data[i].actual_date,
						maintenance_status: data[i].maintenance_status,
						report: reportFormatter(data[i])
					};
					tableData.push(rowData);
				}
		
				// Update the data and refresh the table
				$('#engineer-dashboard-table').bootstrapTable('load', tableData);
			},
			error: function (xhr, status, error) {
				console.error('AJAX Error:' + error);
			},
		});
	});
}

function setButton() {

	$(document).on('click', '.deliveredReport', function() {

		var maintenanceId = $(this).data('id');

		$.ajax({
			url: BASEURL + '/Dashboard/setReportStatus',
			method: 'POST',
			data: {
			  id: maintenanceId
			},
			dataType: 'json',
			success: function(response) {
				if (response['result'] == '1') {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Report successfully completed',
						showConfirmButton: false,
						timer: 2000
					});
					$('#engineer-dashboard-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Report failed to be completed',
						showConfirmButton: true
					});
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Entry failed. Contact your administrator',
						showConfirmButton: true
					});
				}
			},
			error: function() {
			  // Handle the error, if any
			  alert("Error report completion.");
			}
		});
	});
}

// Formatter Function to determine the buttons for completing monthly maintenance schedule
function engineerDashboardFormatter(value, row, index) {
	// Check if the scheduled date is empty
	if (!row.scheduled_date) {
		return [
			'<span data-bs-toggle="modal" data-bs-target="#formModal" data-id="' + row.id + '">',
			'<button class="btn btn-primary scheduledDateBtn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Set the scheduled date">',
			'<i class="fa-regular fa-calendar-days"></i>',
			'</button>',
			'</span>'
		].join('')
	// Check if the actual date is empty
	} else if(!row.actual_date) {
		return [
			'<span data-bs-toggle="modal" data-bs-target="#formModal" data-id="' + row.id + '">',
			'<button class="btn btn-primary scheduledDateBtn mb-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reschedule the scheduled date">',
			'<i class="fa-regular fa-calendar-days"></i>',
			'</button>',
			'</span>',
			'<span data-bs-toggle="modal" data-bs-target="#formModal" data-id="' + row.id + '">',
			'<button class="btn btn-primary actualDateBtn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Set the actual date">',
			'<i class="fa-solid fa-calendar-check"></i>',
			'</button>',
			'</span>'
		].join('')
	// Check if the report is delivered
	} else if (row.report_status !== 'delivered') {
		return [
			'<button class="btn btn-primary deliveredReport" data-id="' + row.id + '" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Complete Report">',
			'<i class="fa-solid fa-square-check"></i>',
			'</button>'
		].join('')
	// Once the maintenance is completed, the record is stored and no longer displayed on the table
	} else {
		return [
			'<button type="button" class="btn btn-success" disabled>',
			'Completed',
			'</button>'
		].join('')
	}
}

function initEngineerDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$engineerDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'Client',
			field: 'name',
			align: 'center',
			valign: 'middle',
			sortable: true,
			width: '400'
		}, {
			title: 'Device',
			field: 'device',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'PM ke-',
			field: 'pm_count',
			align: 'center',
			valign: 'middle'
		},{
			title: 'PM Month',
			field: 'month',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Scheduled Date',
			field: 'scheduled_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Actual Date',
			field: 'actual_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Maintenance Status',
			field: 'maintenance_status',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Report Status',
			field: 'report',
			align: 'center',
			valign: 'middle',
			sortable: true,
			formatter: function (value, row) {
				return [row.report_status, row.report_date].join('<br>')
			}
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			valign: 'middle',
			switchable: false,
			formatter: engineerDashboardFormatter
		}],
		onPostBody: () => {
			initializeTooltips();
		}
	});
}

$(function() {

	initEngineerDashboardTable();

	$('#engineer-dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();
	filterTable();
	setButton();
});
