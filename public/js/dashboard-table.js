// Admin Bootstrap Table Extended
var $adminDashboardTable = $('#admin-dashboard-table')

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setForm() {
	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delMaintenanceModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var maintenanceId = button.data('id');
		
		// Set the value of the input field in the modal form
		$('#maintenanceId').val(maintenanceId);
	});
}

function adminDashboardFormatter(value, row, index) {
	return [
		'<span class="ms-2 delMaintenanceBtn" data-bs-toggle="modal" data-bs-target="#delMaintenanceModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
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
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'No',
			field: 'm_id',
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
			field: 'sopNumber',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'Device',
			field: 'deviceName',
			align: 'center',
			sortable: true,
			align: 'center'
		  },{
			title: 'PM ke-',
			field: 'pmCount',
			align: 'center',
			align: 'center',
		  }, {
			title: 'Scheduled Date',
			field: 'scheduledDate',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Actual Date',
			field: 'actualDate',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Maintenance Status',
			field: 'maintenanceStatus',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Report Status',
			field: 'reportStatus',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'Action',
			field: 'action',
			align: 'center',
			switchable: false,
		    formatter: adminDashboardFormatter
	  }],
	  onPostBody: () => {
		initializeTooltips();
		setForm();
	  }
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
	});

	$('.scheduledDateBtn').on('click', function() {

		$('#formModalLabel').html('Scheduled Maintenance Date');
		$('.modal-body form').attr('action', BASEURL + '/maintenance/setScheduledDate');
	});

	$('.actualDateBtn').on('click', function() {

		$('#formModalLabel').html('Actual Maintenance Date');
		$('.modal-body form').attr('action', BASEURL + '/maintenance/setActualDate');
	});
}

function setButton() {

	$('.deliveredReport').on('click', function() {

		var maintenanceId = $(this).data('id');

		$.ajax({
			url: BASEURL + '/maintenance/setReportStatus',
			method: 'POST',
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

		// Refresh the table data
		$('#engineer-dashboard-table').bootstrapTable('refresh');
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
			'<button class="btn btn-primary scheduledDateBtn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reschedule the scheduled date">',
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
			'<button class="btn btn-primary deliveredReport" data-id="' + row.id + '" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Report Delivered">',
			'<i class="fa-solid fa-square-check"></i>',
			'</button>'
		].join('')
	// Once the maintenance is completed, the record is stored and no longer displayed on the table
	} else {
		return [
			'<button type="button" class="btn btn-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="This maintenance is completed" disabled>',
			'Completed',
			'</button>'
		].join('')
	}
}

function initEngineerDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$engineerDashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
		title: 'No',
		field: 'id',
		align: 'center',
		valign: 'middle',
		switchable: false
		}, {
		title: 'Client',
		field: 'name',
		align: 'center',
		sortable: true,
		align: 'center',
		width: '400'
		}, {
		title: 'Device',
		field: 'device',
		align: 'center',
		sortable: true,
		align: 'center'
		}, {
		title: 'PM ke-',
		field: 'pm_count',
		align: 'center',
		align: 'center'
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
		width: '150',
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
