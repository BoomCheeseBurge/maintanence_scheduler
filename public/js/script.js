// ---------------------------------------------------------------

// Sidebar Navbar
const body = document.querySelector('body'),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
    }
});

// Hidden Sidebar
hiddenModeSwitch = body.querySelector(".hidden-toggle-switch"),
hiddenModeText = body.querySelector(".hidden-mode-text");

hiddenModeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        hiddenModeText.innerText = "Light mode";
    }else{
        hiddenModeText.innerText = "Dark mode";
    }
});

// Hidden Sidebar
const openOffcanvasButton = document.getElementById('openOffcanvas');
const myOffcanvas = new bootstrap.Offcanvas(document.getElementById('myOffcanvas'));

openOffcanvasButton.addEventListener('click', () => {
	myOffcanvas.show();
});

myOffcanvas._element.addEventListener('hidden.bs.offcanvas', () => {
	myOffcanvas._element.classList.remove('show');
	myOffcanvas._element.classList.add('showing');
});


// ---------------------------------------------------------------

// Adjust Profile Picture

// Get the username container element
const usernameContainer = document.querySelector('.username-container');

// Get the username element
const usernameElement = document.getElementById('username');

// Function to set the width of the username container
function setUsernameContainerWidth() {
    // Reset the width to auto to get the natural width of the content
    usernameContainer.style.width = 'auto';

    // Get the width of the username container after resetting
    const usernameContainerWidth = usernameContainer.offsetWidth;

    // Get the width of the username element
    const usernameWidth = usernameElement.offsetWidth;

    // Compare the widths and set the maximum width for the container
    if (usernameContainerWidth > usernameWidth) {
        usernameContainer.style.maxWidth = `${usernameWidth}px`;
    } else {
        // If the container's natural width is smaller, keep the natural width
        usernameContainer.style.maxWidth = 'none';
    }
}

// Call the function to set the initial width on page load
setUsernameContainerWidth();

// Call the function again whenever the window is resized
window.addEventListener('resize', setUsernameContainerWidth);

// ---------------------------------------------------------------

const $notificationBox = $('#notificationBox');
const $notificationBell = $('#notificationBell');

// Show/hide notification box on bell click
$notificationBell.click(function (event) {
	event.stopPropagation(); // Prevents this click from propagating to document
	$notificationBox.toggleClass('show');
});

// Close notification box if clicked outside
$(document).click(function (event) {
	if (!$notificationBox.is(event.target) && !$notificationBell.is(event.target) && $notificationBox.has(event.target).length === 0) {
		$notificationBox.removeClass('show');
	}
});

// ------------------ Notification System ------------------

$(document).ready(function () {
	const $notificationContent = $('#notificationContent');

	function getContracts() {
		$.ajax({
			url: BASEURL + '/Contract/getEndingContract',
			type: 'GET',
			dataType: 'json',
			success: function (contracts) {
				processContracts(contracts);
			},
			error: function () {
				console.error('Error retrieving contract data.');
			}
		});
	}

	function processContracts(contracts) {

		if(contracts.length > 99) {
			$("#notification-num").text('99+');
			$('#myElement').addClass('new-notification');
		} else if(contracts.length > 0) {
			$("#notification-num").text(`${contracts.length}`);
			$('#myElement').addClass('new-notification');
		} else {
			$("#notification-num").text('0');
			const $noNotificationElement = $('<div id="no-notification" class="list-group-item">You have a new notification.</div>');
			$notificationContent.append($noNotificationElement);
		}

		contracts.forEach(function (contract) {
			
			const endDate = new Date(contract.end_date);
			const currentDate = new Date();
			currentDate.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
			const timeDifference = endDate - currentDate;
			const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));			
			createNotification(contract, daysDifference);
		});
	}

	function createNotification(contract, daysDifference) {

		if(daysDifference > 7) {

			const notificationElement = $('<div class="list-group-item notification-item"></div>');
			
			notificationElement.html(`<strong>${contract.name}</strong> with SOP <strong>${contract.sop_number}</strong> is ending in <strong>${daysDifference}</strong> days.`);
			
			$notificationContent.append(notificationElement);
		} else if(daysDifference == 0) {

			const notificationElement = $('<div class="list-group-item notification-item"></div>');
			notificationElement.html(`<strong>${contract.name}</strong> with SOP <strong>${contract.sop_number}</strong> ends <strong>today</strong>!`);
			
			$notificationContent.append(notificationElement);
		}else {

			const notificationElement = $('<div class="list-group-item notification-item"></div>');
			notificationElement.html(`<strong>${contract.name}</strong> with SOP <strong>${contract.sop_number}</strong> is ending in <strong>${daysDifference}</strong> day${daysDifference === 1 ? '' : 's'}.`);
			
			$notificationContent.append(notificationElement);
		}
	}

  // Initial fetch on page load
  getContracts();
});
