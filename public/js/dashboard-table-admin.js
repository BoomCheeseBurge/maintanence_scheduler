// Admin Bootstrap Table Extended
var $dashboardTable = $('#dashboard-table')

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
		fullscreen: 'bi-arrows-fullscreen'
	}
	$dashboardTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
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
		    formatter: dashboardFormatter
	  }],
	  onPostBody: () => {
		initializeTooltips();
		setForm();
	  }
	})
}

$(function() {
	initDashboardTable()

	$('#dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})
})
