// Date Range Picker
$('input[name="daterange"]').daterangepicker();

// ---------------------------------------------------------------

// Sidebar Navbar
const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
    }
});

// ---------------------------------------------------------------

// Event Calendar
$(function() {
	var events = new Array();
	$.ajax({
	  url: 'http://localhost/taskscheduler/public/maintenance/getSchedule',
	  dataType: 'json',
	  success: function (response) {
		var result = response.data;
		$.each(result, function (i, item) {
			const startDate = moment(result[i].start);
			const endDate = moment(result[i].end);

			// Add one day to the end date
			// Adding a day to the end date is necessary as FullCalendar decrease the end date from the table by one day for some reason
			endDate.add(1, 'day');

			events.push({
				event_id: result[i].event_id,
				title: result[i].title,
				start: startDate.format('YYYY-MM-DD'),
				end: endDate.format('YYYY-MM-DD')
			});
		})
  
		var calendar = new FullCalendar.Calendar($('#calendar')[0], {
			headerToolbar: {
				left: 'prevYear,prev,next,nextYear today',
				center: 'title',
				right: 'dayGridMonth,dayGridWeek,dayGridDay'
			},
			editable: true,
			selectable: true,
			// Show add new maintenance scheduled modal when a date or range of date is selected
			select: function (info) {
				// Parse the start and end dates using moment.js
				const startDate = moment(info.start);
				const endDate = moment(info.end);
				
				// Subtract one day from the end date
				endDate.subtract(1, 'day');
				
				// Set the values in the input fields
				$('#new_start_date').val(startDate.format('YYYY-MM-DD'));
				$('#new_end_date').val(endDate.format('YYYY-MM-DD'));
				
				// Show the modal
				$('#new_schedule_Modal').modal('show');
				calendar.unselect();
			},			  
			events: events,
			// Show update maintenance schedule modal when an event is clicked
			eventClick: function (info) {
				// Parse the start and end dates using moment.js
				const startDate = moment(info.event.start);
				const endDate = moment(info.event.end);

				// Subtract one day from the end date
				endDate.subtract(1, 'day');

				// Set the values in the input fields
				$('#update_start_date').val(startDate.format('YYYY-MM-DD'));
				$('#update_end_date').val(endDate.format('YYYY-MM-DD'));
				$('#update_schedule_Modal').modal('show');
			},
			// Display the id of the clicked event
			eventDidMount: function(info) {
				var eventId = info.event.extendedProps.event_id;
				
				info.el.addEventListener('click', function() {
				  alert(eventId);
				});
			}
		});
		calendar.render(); // Render the calendar
	  },
	  error: function (xhr, status, error) { // Update the error handler function parameters
		alert('Error: ' + error); // Display the error message
	  }
	});
  });
  
  
  function save_event() {
    var event_name=$("#event_name").val();
    var event_start_date=$("#event_start_date").val();
    var event_end_date=$("#event_end_date").val();
    if(event_name=="" || event_start_date=="" || event_end_date=="")
    {
      alert("Please enter all required details.");
      return false;
    }
    $.ajax({
      url: 'http://localhost/taskscheduler/public/task/updateSchedule',
      type:'POST',
      dataType: 'json',
      data: {event_name:event_name,event_start_date:event_start_date,event_end_date:event_end_date},
      success:function(response){
        $('#event_entry_modal').modal('hide');
        if(response.status == true)
        {
          alert(response.msg);
          location.reload();
        }
        else
        {
          alert(response.msg);
        }
        },
        error: function (xhr, status) {
          console.log('ajax error = ' + xhr.statusText);
          alert(response.msg);
        }
    });    
    return false;
  }

// ---------------------------------------------------------------

// Button

// Run the script when the whole webpage is ready/loaded-in
$(function() {

	$('.addDataBtn').on('click', function() {

		$('#formModalLabel').html('Scheduled Maintenance Date');
		$('.modal-footer button[type=submit]').html('Add');
		// To clean the form if a user previously clicked on the 'edit' button
		$('#nama').val('');
        $('#nrp').val('');
        $('#email').val('');
        $('#jurusan').val('');
        $('#id').val('');
	});

	// Find an HTML element that has the specified class and run corresponding the event
	$('.showModal').on('click', function() {

		$('#formModalLabel').html('Edit Data Mahasiswa');
		$('.modal-footer button[type=submit]').html('Edit');
		$('.modal-body form').attr('action', 'http://localhost/taskscheduler/public/mahasiswa/edit');

		// Retrieve the specific id of a mahasiswa
		const id = $(this).data('id');
		console.log(id);

		// Request data without reloading the whole webpage
		$.ajax({

			// Retrieve data from here
			url: 'http://localhost/taskscheduler/public/mahasiswa/getEdit',
			// Left 'id' => variabe name, Right 'id' => data
			// Send the id of a mahasiswa to the url
			data: {id : id},
			method: 'post',
			// Return data in json file
			dataType: 'json',
			success: function(data) {
				$('#nama').val(data.nama);
				$('#nrp').val(data.nrp);
				$('#email').val(data.email);
				$('#jurusan').val(data.jurusan);
				$('#id').val(data.id);
			}
		});
	});
});