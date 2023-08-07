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
