// ======================================== Multi-Form Setup Script =================================

const slidePage = $('.slidePage');
const firstNextBtn = $('.next-1');
const nextBtnSec = $('.next-2');
const nextBtnThird = $('.next-3');
const nextBtnFourth = $('.next-4');
const loginBtn = $('.login');
const progressText1 = $('.step .step-num');
const progressText2 = $('.step .step-desc');
const progressCheck = $('.step .check-icon');
const bullet = $('.step .bullet');

let max = 4;
let current = 1;

// Button event handlers to go proceed to the next steps

// Setup the database configuration
$(document).on('click', '.test-btn', function() {
    
    $.ajax({
        url: BASEURL + '/Setup/setConfig',
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {

            // console.log(response);

            if (response['result'] == '1') {

                $('.test-text').css('border-color', 'white');
                $('.test-text').css('color', 'white');
                $('.test-text').html('SUCCESSFUL CONNECTION');
            } else if (response['result'] == '2') {
                alert("Configuration set failed. Please try again.");
            }else {
                alert("Something went wrong with the request. Please try again.");
            }
        },
        error: function(xhr, status, error) {
            // Handle the error if any
            alert("Error!");
            console.error(error);
        }
    });
});

$(document).on('click', '.next-1', function() {
    slidePage.css('marginLeft', '-25%');

    bullet.eq(current - 1).addClass('active');
    progressText1.eq(current - 1).addClass('active');
    progressText2.eq(current - 1).addClass('active');
    progressCheck.eq(current - 1).addClass('active');
    current += 1;
});

// Setup the necessary tables in the database
$(document).on('submit', '#dbTableSetupForm', function(event) {
    event.preventDefault();

    // slidePage.css('marginLeft', '-50%');

    // bullet.eq(current - 1).addClass('active');
    // progressText1.eq(current - 1).addClass('active');
    // progressText2.eq(current - 1).addClass('active');
    // progressCheck.eq(current - 1).addClass('active');
    // current += 1;
    
    // Get the form data
    const formData = new FormData(document.getElementById('dbTableSetupForm'));

    $("#loading-bar").show();
    
    $.ajax({
        url: BASEURL + '/Setup/setDatabase',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {

            // console.log(response);

            if (response['result'] == '1') {
                $("#loading-bar").hide();
                slidePage.css('marginLeft', '-50%');

                bullet.eq(current - 1).addClass('active');
                progressText1.eq(current - 1).addClass('active');
                progressText2.eq(current - 1).addClass('active');
                progressCheck.eq(current - 1).addClass('active');
                current += 1;
            } else if(response['result'] == '2') {
                $("#loading-bar").hide();
                alert("Database name entry failed. Please try again.");
            } else if(response['result'] == '3') {
                $("#loading-bar").hide();
                alert("Something went wrong with the request. Please try again.");
            } else {
                $("#loading-bar").hide();
                console.log(response['result']);
            }
        },
        error: function(xhr, status, error) {
            // Handle the error if any
            alert("Error!");
            console.error(error);
            $("#loading-bar").hide();
        }
    });
});

// Set the admin user
$(document).on('submit', '#adminSetupForm', function(event) {
    event.preventDefault();

    // slidePage.css('marginLeft', '-75%');

    // bullet.eq(current - 1).addClass('active');
    // progressText1.eq(current - 1).addClass('active');
    // progressText2.eq(current - 1).addClass('active');
    // progressCheck.eq(current - 1).addClass('active');
    // current += 1;
    
    // Get the form data
    const formData = new FormData(document.getElementById('adminSetupForm'));

    $.ajax({
        url: BASEURL + '/Setup/setAdmin',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {

            // console.log(response);

            if (response['result'] == '1') {
                slidePage.css('marginLeft', '-75%');

                bullet.eq(current - 1).addClass('active');
                progressText1.eq(current - 1).addClass('active');
                progressText2.eq(current - 1).addClass('active');
                progressCheck.eq(current - 1).addClass('active');
                current += 1;
            }  else if(response['result'] == '2') {
                alert("Admin entry failed. Please try again.");
            }else {
                alert("Something went wrong with the request. Please try again.");
            }
        },
        error: function(xhr, status, error) {
            // Handle the error if any
            alert("Error!");
            console.error(error);
        }
    });
});

// Set the email configuration
$(document).on('submit', '#emailConfigForm', function(event) {
    event.preventDefault();

    // slidePage.css('marginLeft', '-100%');

    // bullet.eq(current - 1).addClass('active');
    // progressText1.eq(current - 1).addClass('active');
    // progressText2.eq(current - 1).addClass('active');
    // progressCheck.eq(current - 1).addClass('active');
    // current += 1;
    
    // Get the form data
    const formData = new FormData(document.getElementById('emailConfigForm'));

    console.log($('#port').val());
    
    $.ajax({
        url: BASEURL + '/Setup/configEmail',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {

            // console.log(response);

            if (response['result'] == '1') {
                slidePage.css('marginLeft', '-100%');

                bullet.eq(current - 1).addClass('active');
                progressText1.eq(current - 1).addClass('active');
                progressText2.eq(current - 1).addClass('active');
                progressCheck.eq(current - 1).addClass('active');
                current += 1;
            } else if(response['result'] == '2') {
                alert("Email configuration failed. Please try again.");
            } else if(response['result'] == '3') {
                alert("Support data failed to be written. Please try again.");
            } else {
                alert("Something went wrong with the request. Please try again.");
            }
        },
        error: function(xhr, status, error) {
            // Handle the error if any
            alert("Error!");
            console.error(error);
        }
    });
});

// Finish the multi-step form and head to login page
loginBtn.click(function(){

    bullet.eq(current - 1).addClass('active');
    progressText1.eq(current - 1).addClass('active');
    progressText2.eq(current - 1).addClass('active');
    progressCheck.eq(current - 1).addClass('active');
    current += 1;

    window.open(BASEURL, '_self'); // Opens in a new tab/window
});

// ------------------------------------------------------------------

$('document').ready(function(){
    $("#loading-bar").hide();
});
