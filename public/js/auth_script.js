$(function() {

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
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The email you entered is not valid',
                showConfirmButton: true
            });
            return;
        }
        
        $('.resetPassword').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Sending email...</span>');

        $.ajax({
            url: BASEURL + '/ForgottenPassword/validateEmail',
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
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'New Password and Confirm Password do not match. Please retype your passwords.',
                showConfirmButton: true
            });
            // Clear the password fields for re-typing
            $('#newPassword').val('');
            $('#confirmPassword').val('');
            return;
        }

        // If the passwords match, send data to the backend using AJAX
        $.ajax({
        type: 'POST',
        url: BASEURL + '/ForgottenPassword/change_password',
        data: { newPassword: newPassword, token: token },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                // Password reset successful, show success message
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password reset successful',
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.href = BASEURL + '/Login';
            } else {
                // Password reset failed, show error message
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Password reset failed. Please try again.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        },
        error: function() {
            // AJAX request error, show error message
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'An error occurred. Please try again or contact your adminsitrator.',
                showConfirmButton: true
            });
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
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'File size exceeds the allowed limit (5 MB). Please select a smaller file.',
                showConfirmButton: true
            });
            // Clear the file input to allow the user to select a different file
            photoInput.value = '';
            return;
        }

        // Validate file type (optional, as the 'accept' attribute is already set to "image/*")
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Invalid file type. Only JPEG, PNG, and GIF images are allowed.',
                showConfirmButton: true
            });
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
          url: BASEURL + '/User/updateUserProfile',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            // Change username and photo if changed by the user
            $('#username').text(formData.get('name'));
            // If the user changed the photo profile
            if ((formData.get('photo')['name'].trim() !== '')) {
                // The 'name' property of 'photo' in formData is not empty.
                $('#userPhoto').attr('src', BASEURL + '/img/users/' + formData.get('photo')['name']);
            }  
          },
          error: function() {
            // Request failed, handle error here
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Error saving changes. Try again or contact your administrator.',
                showConfirmButton: true
            });
          }
        });
    });

    let configEmail;
    
    $('#emailConfigModalBtn').on('click', function(event) {
        event.preventDefault();

		$.ajax({
			url: BASEURL + '/User/getEmailConfig',
			method: 'POST',
            contentType: false,
            processData: false,
			dataType: 'json',
			success: function(data) {     
				$('#supEmail').val(data.supportEmail);
                configEmail = data.supportEmail;
			},
            error: function(xhr, status, error) {
                // Handle the error if any
                alert("Error!");
                console.error(error);
            }
		});
	});

    $(document).on('click', '.cancelConfigForm', function() {

        $("#configEmailForm").trigger("reset");
		$('.emailConfigSubmitBtn').html('Save Changes');
	});

    $(document).on('submit', '#configEmailForm', function(event) {
        event.preventDefault();
        
        // Get the form data
        const formData = new FormData(document.getElementById('configEmailForm'));

        if(formData.get('supEmail') != configEmail) {
            $('.emailConfigSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Updating...</span>');
            
            $.ajax({
                url: BASEURL + '/User/setEmailConfig',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function(response) {
        
                    // console.log(response);
        
                    if (response['result'] == '1') {
                        $('#emailConfigModal [data-bs-dismiss="modal"]').trigger('click');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Email configuration successfully updated',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        $("#configEmailForm").trigger("reset");
                    } else if(response['result'] == '2') {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Updated data failed to be written. Please try again',
                            showConfirmButton: true
                        });
                    } else {
                        console.log(response);
                    }
                },
                error: function(xhr, status, error) {
                    // Handle the error if any
                    alert("Error!");
                    console.error(error);
                }
            });
        } else {$('[data-bs-dismiss="modal"]').trigger('click');}
    });

    $(document).on('click', '.cancelChangePassForm', function() {

        $("#changePasswordForm").trigger("reset");
	});

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
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Current Password cannot be empty',
                showConfirmButton: true
            });
            return;
        } else if (!formData.newPassword) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'New Password cannot be empty',
                showConfirmButton: true
            });
            return;
        } else if (!formData.confirmNewPassword) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Confirm New Password cannot be empty',
                showConfirmButton: true
            });
            return;
        }

        if (!formData.newPassword || !formData.confirmNewPassword) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'New Password or Confirm Password cannot be empty',
                showConfirmButton: true
            });
            return;
        }
        
        if ( formData.newPassword !== formData.confirmNewPassword ) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'New Password and Confirm Password do not match. Please retype your passwords.',
                showConfirmButton: true
            });
            // Clear the password fields for re-typing
            $('#newPassword').val('');
            $('#confirmNewPassword').val('');
            return;
        }
        
        // If the form is valid, you can use the formData object to handle the form submission
        $.ajax({
        url: BASEURL + '/User/changePassword', // Replace with the server-side script to handle form data
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            // Handle the response from the server here (e.g., display success message)
            if (response['result'] == "1") {
                $('#changePasswordModal [data-bs-dismiss="modal"]').trigger('click');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password has been updated',
                    showConfirmButton: false,
                    timer: 2000
                });
                $("#changePasswordForm").trigger("reset");
            } else if (response['result'] == "3") {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Wrong Current Password',
                    showConfirmButton: true
                });
            } else if (response['result'] == "2") {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Update to database failed',
                    showConfirmButton: true
                });
            } else if (response['result'] == "4") {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Invalid request method',
                    showConfirmButton: true
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Password cannot be changed. Try again or contact your administrator.',
                    showConfirmButton: true
                });
            }
        },
        error: function() {
            // Handle any errors that occur during form submission
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Error saving password. Try again or contact your administrator.',
                showConfirmButton: true
            });
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
  