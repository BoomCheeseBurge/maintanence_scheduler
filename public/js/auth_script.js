$(function() {

    const BASEURL = "http://localhost/taskscheduler/public"

    // Set the value to empty and the placeholder for password type input element in Dashboard index view
    var currentPasswordInput = $("#currentPassword");
    currentPasswordInput.val('');
    currentPasswordInput.attr('placeholder', 'Enter your current password');

    // When Click Reset password Button on ForgottenPassword Index View
    $('.resetPassword').on('click', function() {

        const email = $('#typeEmail').val();
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validRegex)) 
        {
            alert('Email is not valid!');
            return;
        }
        
        $('.resetPassword').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Sending email...</span>');

        $.ajax({
            url: BASEURL + '/forgottenpassword/validateEmail',
            data: {email : email},
            method: 'post',
            dataType: 'json',
            success: function(data) {
                if ( (data['taken'] == "email_send_success") ){
                    $('#typeEmail').remove();
                    $('.form-label').remove();
                    $('.resetPassword').remove();
                    $('#customAlertContainer').attr('style', 'display:none;');
                    $('.card-text').html('<div class="alert alert-success fade show customAlertContainer" role="alert"><strong>We\'ve sent a password reset link to your email - ' + email + '</strong></div>');
                } else if ( (data['taken'] == "email_not_exist") ) {
                    $('.resetPassword').html('Reset Password');
                    $('#customAlertContainer').attr('style', 'display:block;');
                    $("#customAlertContainer .alert-message").text('Email does not exist!');
                } else if ( (data['taken'] == "email_send_fail") ) {
                    $('.resetPassword').html('Reset Password');
                    $('#customAlertContainer').attr('style', 'display:block;');
                    $("#customAlertContainer .alert-message").text('Reset password failed! Please submit again.');
                }
            }
        });

    });

    // Reset Password from ForgottenPassword reset_password View
    // Function to handle form submission
    $('#resetPasswordForm').submit(function(event) {
        event.preventDefault();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();
        var token = $('#token').val();

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match. Please retype your passwords.");
            // Clear the password fields for re-typing
            $('#newPassword').val('');
            $('#confirmPassword').val('');
            return;
        }

        // If the passwords match, send data to the backend using AJAX
        $.ajax({
        type: 'POST',
        url: BASEURL + '/forgottenpassword/change_password',
        data: { newPassword: newPassword, token: token },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                // Password reset successful, show success message
                alert("Password reset successful!");
                window.location.href = BASEURL + '/login';
            } else {
                // Password reset failed, show error message
                alert("Password reset failed. Please try again.");
            }
        },
        error: function() {
            // AJAX request error, show error message
            alert("An error occurred. Please try again.");
        }
        });
    });
    
    
    // Validate photo from user edit profile modal
    // <!-- Script to handle photo preview and client-side validation -->
    const photoInput = document.getElementById('photo');

    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        const fileSize = file.size; // File size in bytes
        const allowedFileSize = 5 * 1024 * 1024; // 5 MB (adjust as needed)

        // Validate file size (optional)
        if (fileSize > allowedFileSize) {
          alert('File size exceeds the allowed limit (5 MB). Please select a smaller file.');
          // Clear the file input to allow the user to select a different file
          photoInput.value = '';
          return;
        }

        // Validate file type (optional, as the 'accept' attribute is already set to "image/*")
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          alert('Invalid file type. Only JPEG, PNG, and GIF images are allowed.');
          // Clear the file input to allow the user to select a different file
          photoInput.value = '';
          return;
        }

        // If all validations pass, you can display the photo preview (as shown in the previous code)
        const reader = new FileReader();

        reader.addEventListener('load', (readerEvent) => {
          const imageUrl = readerEvent.target.result;
          // Display photo preview in 'photoPreview' (if available) or any other desired element
          // For example:
          const photoPreview = document.getElementById('photoPreview');
          photoPreview.innerHTML = `<img src="${imageUrl}" alt="User Photo" style="max-width: 100px; max-height: 100px;">`;
        });

        reader.readAsDataURL(file);
      }
    });


    // <!-- Script to handle jQuery AJAX Edit User Profile form submission -->
    $('#btnSaveChangesUserProfile').on('click', function() {
        // Get the form data
        const formData = new FormData(document.getElementById('editProfileForm'));
    
        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/user/updateUserProfile',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            // Change username and photo if changed by the user
            $('#username').text(formData.get('name'));
            $('#userPhoto').attr('src', BASEURL + '/img/users/' + formData.get('photo')['name']);
          },
          error: function() {
            // Request failed, handle error here
            alert("Error saving changes.");
          }
        });
    });
  

    // Get user data
    // $('.editUserProfileModal').on('click', function() {

    //     const id = $(this).data('id');
       
    //     $.ajax({
    //         url: BASEURL + '/user/getUserById',
    //         data: {id : id},
    //         method: 'post',
    //         dataType: 'json',
    //         success: function(data) {
    //             console.log(data)
    //         },
    //         error: function() {
    //             // AJAX request error, show error message
    //             alert("An error occurred. Please try again.");
    //         }
    //     })
        
    // });


    // Save Change Password from Change Password Modal - Dashboard index View
    // Handle click event for the "Save Password" button
    $('#saveChangePasswordForm').on('click', function() {
        
        // Get the form data
        const formData = {
        userid: $('#userid').val(),
        currentPassword: $('#currentPassword').val(),
        newPassword: $('#newPassword').val(),
        confirmNewPassword: $('#confirmNewPassword').val()
        };

        // Perform form validation
        if (!formData.currentPassword) {
            alert("Current Passwor cannot be empty");
            return;
        } else if (!formData.newPassword) {
            alert("New Password cannot be empty");
            return;
        } else if (!formData.confirmNewPassword) {
            alert("Confirm New Password cannot be empty");
            return;
        }

        if (!formData.newPassword || !formData.confirmNewPassword) {
            alert("Current Passwor cannot be empty");
            return;
        }
        
        if ( formData.newPassword !== formData.confirmNewPassword ) {
            alert("New Password and Confirm Password do not match. Please retype your passwords.");
            // Clear the password fields for re-typing
            $('#newPassword').val('');
            $('#confirmNewPassword').val('');
            return;
        }
        
        // If the form is valid, you can use the formData object to handle the form submission
        $.ajax({
        url: BASEURL + '/user/changepassword', // Replace with the server-side script to handle form data
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            // Handle the response from the server here (e.g., display success message)
            if (response['result'] == "1") {
                $('[data-bs-dismiss="modal"]').trigger('click');
                alert("Password Changed");
            } else if (response['result'] == "3") {
                alert("Wrong Current Password");
            } else if (response['result'] == "2") {
                alert("Update to database failed");
            } else if (response['result'] == "4") {
                alert("Invalid request method");
            } else {
                alert("Password cannot be changed. Contact your administrator");
            }
        },
        error: function() {
            // Handle any errors that occur during form submission
            alert("Error saving password.");
        }
        });
    });

    // Script to handle jQuery AJAX Save Add User form submission
    $('#addUser').submit(function(event) {
        event.preventDefault();
        
        // Get the form data
        const formData = new FormData(document.getElementById('addUser'));

        // Get form input elements
        var nameInput = $('#name');
        var emailInput = $('#email');
        var roleInput = $('#roleInput');

        // Validate each field manually
        if (nameInput.val().trim() === '') {
            alert('Please enter your full name.');
            nameInput.focus();
            return false;
        }

        if (emailInput.val().trim() === '') {
            alert('Please enter your email address.');
            emailInput.focus();
            return false;
        }

        // Validate email format using a simple regular expression
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.val())) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return false;
        }

        if (roleInput.val() === null) {
            alert('Please choose a role.');
            roleInput.focus();
            return false;
        }

        $('.addUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Adding user...</span>');

        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/user/adduser',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function(response) {
            // Handle the response from the server here (e.g., display success message)
            if (response['result'] == '1') {                
                $('.addUserSubmitBtn').html('Add');
                alert("Email already exists!");
            } else if (response['result'] == "2") {                
                $('#userModal [data-bs-dismiss="modal"]').trigger('click');                
                $('.addUserSubmitBtn').html('Add');
                setTimeout(function() {
                    alert("User added!");
                }, 0);
                // Refresh the table data
				$('#user-table').bootstrapTable('refresh');
            } else if (response['result'] == "3") {                
                $('.addUserSubmitBtn').html('Add');
                alert("Email failed to be sent!");
            } else if (response['result'] == "4") {                
                $('.addUserSubmitBtn').html('Add');
                alert("User failed to be added!");
            } else {                
                $('.addUserSubmitBtn').html('Add');
                alert("User cannot be changed. Contact your administrator");
            }
          },
          error: function() {
            // Request failed, handle error here
            alert("Error saving changes.");
          }
        });
    });

    // Script to handle jQuery AJAX Save Edit User form submission
	$('#editUser').submit(function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('editUser'));

		$('.editUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Saving user...</span>');

        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/user/saveuser',
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
                $('.addUserSubmitBtn').html('Add');
                setTimeout(function() {
                    alert("Successfully Updated!");
                }, 0);
                // Refresh the table data
				$('#user-table').bootstrapTable('refresh');
            } else if (response['result'] == "2") {
                $('#editUserModal .editUserSubmitBtn').html('Save');
                alert("Save Failed!");
            } else {
                $('#editUserModal .editUserSubmitBtn').html('Save');
                alert("Save Failed. Contact your administrator.");
            }
          },
          error: function() {
            // Request failed, handle error here
            alert("Error saving changes.");
          }
        });
	});


    // Script to handle jQuery AJAX Delete User form submission
	$('#deleteUser').submit(function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('deleteUser'));

		$('.deleteUserSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting user...</span>');
        
        // Send the AJAX request
        $.ajax({
          url: BASEURL + '/user/delete',
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
                setTimeout(function() {
                    alert("Successfully Deleted!");
                }, 0);
                // Refresh the table data
				$('#user-table').bootstrapTable('refresh');
            } else if (response['result'] == "2") {
                $('.deleteUserSubmitBtn').html('Delete');
                alert("Delete Failed!");
            } else {
                $('.deleteUserSubmitBtn').html('Delete');
                alert("Delete Failed. Contact your administrator.");
            }
          },
          error: function(response) {
            // Request failed, handle error here
            console.log(response);
            alert("Error deleting changes. Contact your administrator.");
          }
        });
	});

});

// Custom Alert
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the container where you want to display the alert
    const alertContainer = document.getElementById("customAlertContainer");
    
    if (alertContainer) {
        // Create the Bootstrap alert element
        const alertElement = document.createElement("div");
        alertElement.classList.add("alert", "alert-danger");
    
        // Add the content and close button to the alert element
        alertElement.innerHTML = `
        <span class="alert-message"></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        `;
    
        // Append the alert to the container
        alertContainer.appendChild(alertElement);
    
        // Handle the close button click event to prevent alert from being dismissed
        alertElement.querySelector(".close").addEventListener("click", function(event) {
        event.preventDefault();
        // Hide the alert instead of removing it
        alertElement.classList.remove("show");
        $('#customAlertContainer').attr('style', 'display:none;');
        });
    }
});
  