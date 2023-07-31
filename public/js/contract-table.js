// Bootstrap Table Extended
var $contractTable = $('#contract-table');

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

	$('.addContractBtn').on('click', function() {

		$('#contractModalLabel').html('New Contract');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/contract/addContract');

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

	$('.editContractBtn').on('click', function() {

		$('#contractModalLabel').html('Edit Contract');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/contract/editContract');

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: 'http://localhost/taskscheduler/public/contract/getEditContractData',
			// Left 'id' => variabe name, Right 'id' => data
			// Send the id of a mahasiswa to the url
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

		$('.modal-footer .contractSubmitBtn').html('Save');
	});

	$('.createSchedule').on('click', function() {

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: 'http://localhost/taskscheduler/public/contract/getSingleContractData',
			// Left 'id' => variabe name, Right 'id' => data
			// Send the id of a mahasiswa to the url
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {
				$('#name').val(data.name);
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
		'<button type="button" class="btn btn-warning editContractBtn" data-bs-toggle="modal" data-bs-target="#contractModal" data-id="' + row.id + '">',
		'Edit',
		'</button>',
		'<span class="ms-2 createSchedule" data-bs-toggle="modal" data-bs-target="#scheduleModal" data-id="' + row.id + '">',
		'<button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create maintenance schedule">',
		'<i class="fa-solid fa-calendar-plus"></i>',
		'</button>',
		'</span>'
    ].join('')
  }

function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Client',
			field: 'name',
			align: 'center',
			sortable: true,
			align: 'center'
		},{
			title: 'SOP',
			field: 'sop_number',
			align: 'center',
			align: 'center'
		},{
			title: 'Device',
			field: 'device',
			align: 'center',
			sortable: true,
			align: 'center'
		},{
			title: 'PM Frequency',
			field: 'pm_frequency',
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
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			sortable: true,
			align: 'center'
		}, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
			width: 150,
		    formatter: contractFormatter
	  }],
	  onPostBody: () => {
		initializeTooltips();
		setForm();
	  }
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