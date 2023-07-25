// Bootstrap Table Extended
var $clientTable = $('#client-table')

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#clientModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var clientId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(clientId);

		console.log(clientId);
	});

	$('.addClientBtn').on('click', function() {

		$('#clientModalLabel').html('New Client');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/client/addClient');
		$('.modal-footer button[type=submit]').html('Add');
	});

	$('.editClientBtn').on('click', function() {

		$('#clientModalLabel').html('Edit Client');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/client/editClient');
		$('.modal-footer button[type=submit]').html('Save');
	});
}

function editClientFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning editClientBtn" data-bs-toggle="modal" data-bs-target="#clientModal">',
		'Edit',
		'</button>'
    ].join('')
  }

function initClientTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$clientTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		locale: 'en-US',
		columns: [
		{
			title: 'No',
			field: 'id',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Name',
			field: 'client_name',
			align: 'center',
			sortable: true,
			align: 'center'
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
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
		    formatter: editClientFormatter
	  }],
	  onPostBody: setForm
	})
}

$(function() {
	initClientTable()

	$('#client-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// Create a Client Add Button 
	const emptyDiv = document.querySelector('.bs-bars');

	const buttonElement = document.createElement('button');
	buttonElement.textContent = 'Add';
	buttonElement.className = 'btn btn-primary addClientBtn';
	buttonElement.setAttribute('data-bs-target', '#clientModal');
	buttonElement.setAttribute('data-bs-toggle', 'modal');

	emptyDiv.appendChild(buttonElement);

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
		const picFieldsId = picFieldsDiv.attr('id');

		// Remove the current set of input fields
		picFieldsDiv.remove();

		// Decrement the counter
		picCounter--;

		// Get the previous set of PIC fields and add the delete button to it
		if (picCounter > 2) {
			const prevPicFieldsId = `picClient${picCounter - 1}`;
			const prevPicFieldsDiv = $(`#${prevPicFieldsId}`);
			const deleteButton = $('<button type="button" class="btn btn-danger delete-pic mb-4">Delete</button>');
			prevPicFieldsDiv.append(deleteButton);
		}
	});
})

// ---------------------------------------------------------------