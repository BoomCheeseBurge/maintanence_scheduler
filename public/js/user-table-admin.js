// Bootstrap Table Extended

var $userTable = $('#user-table')

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#userModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var userId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(userId);
	});

	$('.newUserBtn').on('click', function() {

		$('#userModalLabel').html('New User');
		$('#addUser').attr('action', BASEURL + '/user/addUser');
		$('.addUserSubmitBtn').html('Add');
	});


	$('.editUserBtn').on('click', function() {

		// $('.editUserSubmitBtn').html('Save');
		// get user id
		id = $(this).data('id');

		$.ajax({
			url:  BASEURL + '/user/getUserById',
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {
				$('#editUser #id').val(data.id);
				$('#editUser #name').val(data.full_name);
				$('#editUser #email').val(data.email);
				$('#editUser #roleInput').val(data.role);
			}
			
		});
	});


	$('.deleteUserBtn').on('click', function() {

		// get user id
		id = $(this).data('id');

		$.ajax({
			url:  BASEURL + '/user/getUserById',
			data: {id : id},
			method: 'POST',
			// Return data in json file
			dataType: 'json',
			// data here refers to a temporary parameter variable that stores any data returned by the url above
			success: function(data) {
				$('#deleteUser #id').val(data.id);
				$('#deleteUser #userNameDelete').text(data.full_name);
			}
			
		});
	});
}


function editUserFormatter(value, row, index) {
    return [
		'<button type="button" class="btn btn-warning editUserBtn" data-bs-toggle="modal" data-bs-target="#editUserModal" data-id=' + row.id + '>',
		'Edit',
		'</button>',
		'<button type="button" class="btn btn-danger deleteUserBtn" data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-id=' + row.id + '>',
		'Delete',
		'</button>'
    ].join('')
}


function initUserTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen'
	}
	$userTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		columns: [
		{
			title: 'Full Name',
			field: 'full_name',
			align: 'center',
			sortable: true,
			align: 'center'
		  }, {
			title: 'E-mail',
			field: 'email',
			align: 'center',
			valign: 'middle',
		  }, {
			title: 'Role',
			field: 'role',
			align: 'center',
			valign: 'middle'
		  }, {
			title: 'View',
			field: 'view',
			align: 'center',
			switchable: 'false',
		    formatter: editUserFormatter
	  }],
	  onPostBody: setForm
	})
}

$(function() {
	initUserTable()

	$('#user-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// Create a user Add Button 
	const emptyDiv = document.querySelector('.bs-bars');

	const buttonElement = document.createElement('button');
	buttonElement.textContent = 'Add';
	buttonElement.className = 'btn btn-primary newUserBtn';
	buttonElement.setAttribute('data-bs-target', '#userModal');
	buttonElement.setAttribute('data-bs-toggle', 'modal');

	emptyDiv.appendChild(buttonElement);
})

// ---------------------------------------------------------------