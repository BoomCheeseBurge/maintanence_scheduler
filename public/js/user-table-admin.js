// Bootstrap Table Extended

var $userTable = $('#user-table');
var $remove = $('#remove');
var selections = [];

// Function to retrieve the selected rows from the table
function getIdSelections() {
	return $.map($userTable.bootstrapTable('getSelections'), function (row) {
		return row.id
	})
}

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

	// ==========================================================================================================
	// Add User Event Handler starts here

    $(document).on('click', '.cancelAddUser', function() {

		$("#addUser").trigger("reset");
	});

	$(document).on('click', '.newUserBtn', function() {

		$('#userModalLabel').html('New User');
		$('#addUser').attr('action', BASEURL + '/User/addUser');
		$('.addUserSubmitBtn').html('Add');
	});

	// Script to handle jQuery AJAX Save Add User form submission
	$(document).on('submit', '#addUser', function(event) {
		event.preventDefault();
		
		// Get the form data
        const formData = new FormData(document.getElementById('addUser'));

        // Get form input elements
        var nameInput = $('#name');
        var emailInput = $('#email');
        var roleInput = $('#roleInput');

        // Validate each field manually
        if (nameInput.val().trim() === '') {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please enter your full name',
                showConfirmButton: true
            });
            nameInput.focus();
            return false;
        }

        if (emailInput.val().trim() === '') {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please enter your email address',
                showConfirmButton: true
            });
            emailInput.focus();
            return false;
        }

        // Validate email format using a simple regular expression
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.val())) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please enter a valid email address',
                showConfirmButton: true
            });
            emailInput.focus();
            return false;
        }

        if (roleInput.val() === null) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please choose a role',
                showConfirmButton: true
            });
            roleInput.focus();
            return false;
        }

        $('.addUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Adding user...</span>');

        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/User/addUser',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function(response) {
            // Handle the response from the server here (e.g., display success message)
            
            if (response['result'] == '1') {                
                $('.addUserSubmitBtn').html('Add');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'The email you entered already exist',
                    showConfirmButton: true
                });
            } else if (response['result'] == "2") {                
                $('#userModal [data-bs-dismiss="modal"]').trigger('click');                
                $('.addUserSubmitBtn').html('Add');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The User has been added',
                    showConfirmButton: false,
                    timer: 2000
                });
                // Refresh the table data
				$('#user-table').bootstrapTable('refresh');
            } else if (response['result'] == "3") {                
                $('.addUserSubmitBtn').html('Add');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Email failed to be sent',
                    showConfirmButton: true
                });
            } else if (response['result'] == "4") {                
                $('.addUserSubmitBtn').html('Add');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Adding User failed',
                    showConfirmButton: true
                });
            } else {                
                $('.addUserSubmitBtn').html('Add');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Adding User failed. Contact your administrator.',
                    showConfirmButton: true
                });
            }
          },
          error: function() {
            // Request failed, handle error here
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Error adding user. Contact your administrator.',
                showConfirmButton: true
            });
          }
        });
	});

	// ==========================================================================================================
	// Edit User Event Handler starts here

    let userName;
    let userEmail;
    let userRole;

    $(document).on('click', '.cancelEditUser', function() {

		$("#editUser").trigger("reset");
		$('.editUserSubmitBtn').html('Save');
	});

	$(document).on('click', '.editUserBtn', function() {

		// $('.editUserSubmitBtn').html('Save');
		// get user id
		id = $(this).data('id');

		$.ajax({
			url:  BASEURL + '/User/getUserById',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {
				$('#editUser #id').val(data.id);
				$('#editUser #name').val(data.full_name);
				$('#editUser #email').val(data.email);
				$('#editUser #roleInput').val(data.role);

                userName = data.full_name;
                userEmail = data.email;
                userRole = data.role;
			}
		});
	});

	$(document).on('submit', '#editUser', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('editUser'));

        // Check if the email has been changed
		if(formData.get('email') != userEmail) {
			formData.append('emailChanged', 'true');
		} else {
			formData.append('emailChanged', 'false');
		}

        if(formData.get('name') != userName || formData.get('email') != userEmail || formData.get('roleInput') != userRole) {

		    $('.editUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Saving user...</span>');

            // Send the AJAX request
            $.ajax({
            url: BASEURL + '/User/saveUser',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
                // Handle the response from the server here (e.g., display success message)
                if (response['result'] == '1') {
                    $('#editUserModal [data-bs-dismiss="modal"]').trigger('click');
                    $('#editUserModal .editUserSubmitBtn').html('Save');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'The User has been updated',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // Refresh the table data
                    $('#user-table').bootstrapTable('refresh');
                } else if (response['result'] == "2") {
                    $('#editUserModal .editUserSubmitBtn').html('Save');
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Email address already exists',
                        showConfirmButton: true
                    });
                } else if (response['result'] == "3") {
                    $('#editUserModal .editUserSubmitBtn').html('Save');
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Update failed',
                        showConfirmButton: true
                    });
                } else {
                    $('#editUserModal .editUserSubmitBtn').html('Save');
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Update failed. Contact your administrator.',
                        showConfirmButton: true
                    });
                }
            },
            error: function() {
                // Request failed, handle error here
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Error update. Contact your administrator.',
                    showConfirmButton: false
                });
            }
            });
        } else {$('#editUserModal [data-bs-dismiss="modal"]').trigger('click');}
	});

	// ==========================================================================================================
	// Delete User Event Handler starts here

	$(document).on('click', '.deleteUserBtn', function() {

		// get user id
		id = $(this).data('id');

		$.ajax({
			url:  BASEURL + '/User/getUserById',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {
				$('#deleteUser #id').val(data.id);
				$('#deleteUser #userNameDelete').text(data.full_name);
			}
			
		});
	});

	$(document).on('submit', '#deleteUser', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('deleteUser'));

		$('.deleteUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting user...</span>');
        
        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/User/delete',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function(response) {
            // Handle the response from the server here (e.g., display success message)
            if (response['result'] == '1') {
                $('#deleteUserModal [data-bs-dismiss="modal"]').trigger('click');
                $('.deleteUserSubmitBtn').html('Delete');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The User has been deleted',
                    showConfirmButton: false,
                    timer: 2000
                });
                // Refresh the table data
				$('#user-table').bootstrapTable('refresh');
            } else if (response['result'] == "0") {
                $('.deleteUserSubmitBtn').html('Delete');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Delete User failed',
                    showConfirmButton: true
                });
            } else if (response['result'] == "2") {
                $('.deleteUserSubmitBtn').html('Delete');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Deletion denied. Please ensure that the user to be deleted is not related to any contract',
                    showConfirmButton: true
                });     
            } else {
                $('.deleteUserSubmitBtn').html('Delete');
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Delete Failed. Error Code: ' + response['result'] + '. Contact your administrator',
                    showConfirmButton: true
                });  
            }
          },
          error: function() {
            // Request failed, handle error here
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Error deleting changes. Contact your administrator',
                showConfirmButton: true
            });
          }
        });
	});
}


function editUserFormatter(value, row, index) {

    if(row.role != 'admin') {
        return [
            '<button type="button" class="btn btn-warning btn-sm editUserBtn" data-bs-toggle="modal" data-bs-target="#editUserModal" data-id=' + row.id + '>',
            'Edit',
            '</button>',
            '<button type="button" class="btn btn-danger btn-sm deleteUserBtn" data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-id=' + row.id + '>',
            'Delete',
            '</button>'
        ].join('')
    }
}


function initUserTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$userTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		columns: [
		{
			field: 'state',
			checkbox: true,
			align: 'center',
			valign: 'middle'
		},{
			title: 'Full Name',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'E-mail',
			field: 'email',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Role',
			field: 'role',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'View',
			field: 'view',
			align: 'center',
			valign: 'middle',
			switchable: false,
		    formatter: editUserFormatter
	  	}]
	});

	$userTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$userTable.bootstrapTable('getSelections').length);

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$(document).on('click', '.cancelDelBulkUser', function() {

		$('.bulkDeleteSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#bulkDeleteUserForm', function(event) {
		event.preventDefault();

		var ids = getIdSelections();

        // console.log(ids);

		$('.bulkDeleteSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting User...</span>');

		// Send an AJAX request to the server to delete the selected rows
		$.ajax({
			url: BASEURL + '/User/delBulkUser',
			type: 'POST',
			data: { ids: ids },
			dataType: 'json',
			success: function (response) {

				if (response['result'] == '1') {
					$('#delBulkUserModal [data-bs-dismiss="modal"]').trigger('click');
					$('.deleteUserSubmitBtn').html('Delete');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Users successfully deleted',
                        showConfirmButton: false,
                        timer: 2000
                    });
					// Refresh the table data
					$('#user-table').bootstrapTable('refresh');
				} else if (response['result'] == "0") {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Users failed to be deleted',
                        showConfirmButton: true
                    });
				} else if (response['result'] == "2") {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Deletion denied. Please ensure that the users to be deleted are not related to any contract',
                        showConfirmButton: true
                    });
					$('#delBulkUserModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Deletion Failed. Error Code: ' + response['result'] + '. Contact your administrator',
                        showConfirmButton: true
                    });
					$('#delBulkUserModal [data-bs-dismiss="modal"]').trigger('click');
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
	initUserTable();

	$('#user-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});
	
	setForm();
});

// ---------------------------------------------------------------