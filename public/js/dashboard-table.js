// Admin Bootstrap Table Extended
var $adminDashboardTable = $('#admin-dashboard-table')

function adminDashboardFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">',
		'Edit',
		'</button>'
    ].join('')
  }

function initAdminDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$adminDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle',
			switchable: false
		},{
			title: 'Engineer',
			field: 'engineer_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'Client',
			field: 'client_name',
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
			title: 'PM ke-',
			field: 'pm_count',
			align: 'center',
			align: 'center',
		  }, {
			title: 'Scheduled Date',
			field: 'scheduled_date',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Actual Date',
			field: 'actual_date',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Maintenance Status',
			field: 'maintenance_status',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Report Status',
			field: 'report_status',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: false,
		    formatter: adminDashboardFormatter
	  }]
	})
}

// ---------------------------------------------------------------------------------------

// Engineer Bootstrap Table Extended
var $engineerDashboardTable = $('#engineer-dashboard-table')

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

		console.log(maintenanceId);
	});

	$('.scheduledDateBtn').on('click', function() {

		$('#formModalLabel').html('Scheduled Maintenance Date');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/maintenance/setScheduledDate');
	});

	$('.actualDateBtn').on('click', function() {

		$('#formModalLabel').html('Actual Maintenance Date');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/maintenance/setActualDate');
	});
}

function setButton() {
	$('#maintenanceTable').on('click', 'button[data-action="finishedMaintenance"]', function() {
		// Get the maintenance ID and perform the necessary action
		var maintenanceId = $(this).data('id');
		
		// Implement your logic to mark the maintenance as completed
		// Send the updated data to the server using an AJAX request
		// Update the table data accordingly
		$.ajax({
			url: 'http://localhost/taskscheduler/public/maintenance/setMaintenanceStatus', // Replace with the correct URL to your updateScheduleDate function
			type: 'POST',
			data: {
			  maintenanceId: maintenanceId
			},
			success: function(response) {
			  // Update the table data accordingly
			  // For example, you can update the table row to display the "Completed" status
			  // or you can reload the entire table to fetch the updated data from the server
			},
			error: function(xhr, status, error) {
			  // Handle the error, if any
			  console.error(error);
			}
		  });
	});

	$('#maintenanceTable').on('click', 'button[data-action="deliveredReport"]', function() {
		// Get the maintenance ID and perform the necessary action
		var maintenanceId = $(this).data('id');
		
		// Implement your logic to submit the maintenance report
		// Send the updated data to the server using an AJAX request
		// Update the table data accordingly
		$.ajax({
			url: 'http://localhost/taskscheduler/public/maintenance/setReportStatus', // Replace with the correct URL to your updateScheduleDate function
			type: 'POST',
			data: {
			  id: maintenanceId
			},
			success: function(response) {
			  // Update the table data accordingly
			  // For example, you can update the table row to display the "Completed" status
			  // or you can reload the entire table to fetch the updated data from the server
			},
			error: function(xhr, status, error) {
			  // Handle the error, if any
			  console.error(error);
			}
		  });
	});
}

// Formatter Function to determine the buttons for completing monthly maintenance schedule
function engineerDashboardFormatter(value, row, index) {
	// Check if the scheduled date is empty
	if (!row.scheduled_date) {
		return '<span data-bs-toggle="modal" data-bs-target="#formModal" data-id="' + row.id + '"><button class="btn btn-primary scheduledDateBtn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Set the scheduled date"><i class="fa-regular fa-calendar-days"></i></button></span>';		
	// Check if the actual date is empty
	} else if(!row.actual_date) {
		return '<span data-bs-toggle="modal" data-bs-target="#formModal" data-id="' + row.id + '"><button class="btn btn-primary actualDateBtn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Set the actual date"><i class="fa-solid fa-calendar-check"></i></button></span>';
	// Check if the maintenance is finished
	} else if (!row.maintenance_status) {
		return '<button class="btn btn-primary" data-id="' + row.id + '" data-action="finishedMaintenance" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Maintenance Finished"><i class="fa-solid fa-square-check"></i></button>';
	// Check if the report is delivered
	} else if (!row.report_status) {
		return '<button class="btn btn-primary" data-id="' + row.id + '" data-action="deliveredReport" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Report Delivered"><i class="fa-solid fa-file-circle-check"></i></button>';
	// Once the maintenance is completed, the record is stored and no longer displayed on the table
	} else {
		return;
	}
}

function initEngineerDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$engineerDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
		title: 'No',
		field: 'id',
		align: 'center',
		valign: 'middle',
		switchable: false
		}, {
		title: 'Client',
		field: 'client_name',
		align: 'center',
		sortable: true,
		align: 'center'
		}, {
		title: 'SOP No',
		field: 'sopnumber',
		align: 'center',
		sortable: true,
		align: 'center'
		}, {
		title: 'PM ke-',
		field: 'pm_count',
		align: 'center',
		align: 'center',
		}, {
		title: 'Scheduled Date',
		field: 'scheduled_date',
		align: 'center',
		valign: 'middle'
		}, {
		title: 'Actual Date',
		field: 'actual_date',
		align: 'center',
		valign: 'middle'
		}, {
		title: 'Maintenance Status',
		field: 'maintenance_status',
		align: 'center',
		valign: 'middle'
		}, {
		title: 'Report Status',
		field: 'report_status',
		align: 'center',
		valign: 'middle'
		}, {
		title: 'Action',
		field: 'action',
		align: 'center',
		switchable: false,
		formatter: engineerDashboardFormatter
	  }],
	  // Bootstrap Table specific property that is an option which allows to specify a function to be executed after the table body is rendered and data is loaded into the table.
	  onPostBody: () => {
		initializeTooltips();
		setForm();
		setButton();
	  }
	});
}

$(function() {
	initAdminDashboardTable()

	$('#admin-dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	initEngineerDashboardTable()

	$('#engineer-dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})
