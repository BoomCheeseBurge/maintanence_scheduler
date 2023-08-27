// eCharts
let eC = $('#lateReportChart');

// ========================================================================== Script for Yearly View Dropdown Start ==========================================================================

function addYearlyDropdown() {

	// Create the icon
	let icon = $('<i class="fa-solid fa-calendar-days fa-xl me-2 calendarIcon"></i>');

	// Create the custom dropdown
	let cD = $('<div class="custom-dropdown mb-3"></div>');

	// Create the input element
	let iE = $('<input type="text" class="selected-year" placeholder="Select year" readonly>');

	// Create the year list wrapper
	let yLW = $('<div class="year-list-wrapper ms-4"></div>');

	// Create the year list
	let yLi = $('<ul class="only-year-list"></ul>');
	yLW.append(yLi);

	// Append all the elements to the custom dropdown
	cD.append(icon);
	cD.append(iE);
	cD.append(yLW);

	// Append the custom dropdown to the container
	cD.insertBefore(eC);

	var dropdown = $('.custom-dropdown');
	var input = dropdown.find('.selected-year');
	var yearListWrapper = dropdown.find('.year-list-wrapper');

	// Function to dynamically generate year options
	function generateYearOptions() {
		var currentYear = new Date().getFullYear();
		var minYear = currentYear - 100;
		var maxYear = currentYear + 100;

		var yearList = dropdown.find('.only-year-list');
		yearList.empty();

		for (var year = minYear; year <= maxYear; year++) {
			var yearOption = $('<li></li>');
			yearOption.text(year);
			yearOption.attr('data-value', year);
			yearList.append(yearOption);
		}
	}

	// Function to scroll the year list to the current year option
	function scrollYearListToCurrentYear() {
		var yearList = dropdown.find('.only-year-list');
		var currentYear = new Date().getFullYear();
		// Current year is subtracted by 2 since the scrollbar will not be positioned exactly at the current year option without doing so
		var currentYearMinusTwo = currentYear - 2;
		var currentYearOption = yearList.find('li[data-value="' + currentYearMinusTwo + '"]'); // Find the option for the adjusted currentYear
	
		if (currentYearOption.length > 0) {
		currentYearOption[0].scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
		}
	}

	// Function to show the year dropdown list when the input is clicked
	input.click(function () {

		yearListWrapper.slideToggle(200);

		// Scroll to the current year option
		scrollYearListToCurrentYear();
	});

	// Click event on year list to select year
	yearListWrapper.on('click', 'li', function () {
		var selectedYear = $(this).data('value');
		input.val(selectedYear);

		// Slide up the year dropdown after selection
		yearListWrapper.slideUp(200);

		initializeYearlyViewChart(selectedYear);
	});

	// Hide the dropdown lists when the user clicks outside the dropdown
	$(document).click(function (event) {
	  if (!dropdown.is(event.target) && dropdown.has(event.target).length === 0) {
		yearListWrapper.hide();
	  }
	});

	// Generate the year options on page load
	generateYearOptions();
}

function removeYearlyDropdown() {

	$('.calendarIcon').remove();
	$('.custom-dropdown').remove();
}

// ========================================================================== Script for Yearly View Dropdown End ==========================================================================

// ========================================================================== Script for Monthly View Dropdown Start ==========================================================================

// Function to add the custom dropdown
function addMonthlyDropdown() {

	// Create the icon
	let icon = $('<i class="fa-solid fa-calendar-days fa-xl me-2 calendarIcon"></i>');

	// Create the custom dropdown
	let cD = $('<div class="custom-dropdown mb-3"></div>');

	// Create the input element
	let iE = $('<input type="text" class="selected-value" placeholder="Select mm/yyyy" readonly>');

	// Create the year list wrapper
	let yLW = $('<div class="year-list-wrapper ms-4"></div>');

	// Create the year list
	let yLi = $('<ul class="year-list"></ul>');
	yLW.append(yLi);

	// Create the month wrapper
	let mW = $('<div class="month-wrapper"></div>');

	// Create the year label
	let yL = $('<div class="year-label"></div>');
	mW.append(yL);

	// Create the month list
	let mL = $('<ul class="month-list"></ul>');
	mW.append(mL);

	// Append all the elements to the custom dropdown
	cD.append(icon);
	cD.append(iE);
	cD.append(yLW);
	cD.append(mW);

	// Append the custom dropdown to the container
	cD.insertBefore(eC);

	// Script for adding Month and Year for echarts
	var dropdown = $('.custom-dropdown');
	var input = dropdown.find('.selected-value');
	var yearListWrapper = dropdown.find('.year-list-wrapper');
	var monthWrapper = dropdown.find('.month-wrapper');
	var yearOptions = yearListWrapper.find('.year-list li');
	var yearLabel = monthWrapper.find('.year-label');
  
	// Variable to keep track of whether a year and month have been selected
	var yearSelected = false;
	var monthSelected = false;
  
	// Function to get the full month name from the acronym
	function getFullMonthName(monthAcronym) {
	  var monthMap = {
		Jan: 'January',
		Feb: 'February',
		Mar: 'March',
		Apr: 'April',
		May: 'May',
		Jun: 'June',
		Jul: 'July',
		Aug: 'August',
		Sep: 'September',
		Oct: 'October',
		Nov: 'November',
		Dec: 'December',
	  };
	  return monthMap[monthAcronym];
	}
  
	// Function to dynamically generate year options
	  function generateYearOptions() {
		var currentYear = new Date().getFullYear();
		var minYear = currentYear - 100;
		var maxYear = currentYear + 100;
  		
		var yearList = dropdown.find('.year-list');
		yearList.empty();
  
		for (var year = minYear; year <= maxYear; year++) {
		  var yearOption = $('<li></li>');
		  yearOption.text(year);
		  yearOption.attr('data-value', year);
		  yearList.append(yearOption);
		}
  
		// Generate the month tiles for the selected year
		generateMonthTiles(currentYear);
	  }
  
	// Function to dynamically generate month tiles for the selected year
	function generateMonthTiles(selectedYear) {
	  var monthList = monthWrapper.find('.month-list');
	  monthList.empty(); // Clear previous month tiles
  
	  // Array of month acronyms
	  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
	  // Generate month tiles for the selected year
	  for (var i = 0; i < months.length; i++) {
		var monthTile = $('<li class="month-tile"></li>'); // Add class="month-tile"
		monthTile.text(months[i]); // Display month acronym on the tile
		monthTile.attr('data-year', selectedYear); // Set data-year attribute
		monthTile.attr('data-value', months[i]); // Set data-value attribute
		monthList.append(monthTile);
	  }
  
	  yearLabel.text(selectedYear);
	}
  
	// Function to scroll the year list to the current year option
	function scrollYearListToCurrentYear() {
		var yearList = dropdown.find('.year-list');
		var currentYear = new Date().getFullYear();
		// Current year is subtracted by 2 since the scrollbar will not be positioned exactly at the current year option without doing so
		var currentYearMinusTwo = currentYear - 2;
		var currentYearOption = yearList.find('li[data-value="' + currentYearMinusTwo + '"]'); // Find the option for the adjusted currentYear
	
		if (currentYearOption.length > 0) {
		currentYearOption[0].scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
		}
	}
  
	// Function to show the year dropdown list when the input is clicked
	input.click(function () {
		yearListWrapper.slideToggle(200);
		monthWrapper.slideUp(200);
	
		// Scroll to the current year option
		scrollYearListToCurrentYear();
	});
  
  
	// Click event on year list to toggle month tiles
	yearListWrapper.on('click', 'li', function () { // Use yearListWrapper
	  var year = $(this).data('value');
	  input.attr('data-year', year);
	  input.val(year);
	  yearOptions.removeClass('selected');
	  $(this).addClass('selected');
  
	  // Slide out the month tiles below the selected year
	  generateMonthTiles(year);
	  monthWrapper.slideDown(200); // Slide down the month tiles
	  yearListWrapper.slideUp(200); // Hide the year dropdown after selection
  
	  // Mark year as selected
	  yearSelected = true;
	});

	// Store month values for query
	function getMonthNumber(fullMonthName) {
		var monthMap = {
		  'January': 1,
		  'February': 2,
		  'March': 3,
		  'April': 4,
		  'May': 5,
		  'June': 6,
		  'July': 7,
		  'August': 8,
		  'September': 9,
		  'October': 10,
		  'November': 11,
		  'December': 12,
		};
		return monthMap[fullMonthName];
	}
  
	// Update the input value when a month is clicked
	$(document).on('click', '.month-list li', function () {
	  var selectedMonth = $(this).data('value'); // Get the acronym
	  var selectedYear = input.val() || new Date().getFullYear();
	  var fullMonthName = getFullMonthName(selectedMonth);
	  input.val(fullMonthName + ' ' + selectedYear);

		// Get the month number from the full month name
		var monthNumber = getMonthNumber(fullMonthName);

		initializeMonthlyViewChart(monthNumber, selectedYear);
  
	  // Hide the month list after a month is selected
	  monthWrapper.slideUp(200);
  
	  // Mark month as selected
	  monthSelected = true;
	});
  
	// Hide the dropdown lists when the user clicks outside the dropdown
	$(document).click(function (event) {
	  if (!dropdown.is(event.target) && dropdown.has(event.target).length === 0) {
		yearListWrapper.hide();
		monthWrapper.hide();
  
		// If the user clicked away and year is selected but month is not, set default month (January)
		if (yearSelected && !monthSelected) {
		  input.val('January ' + input.val());
		  let parsedYear = input.val(); 
		  initializeMonthlyViewChart(0, parsedYear);
		}
  
		// Reset selection tracking
		yearSelected = false;
		monthSelected = false;
	  }
	});
  
	// Generate the year options on page load
	generateYearOptions();
  }

  // Function to remove the custom dropdown
function removeMonthlyDropdown() {
	$('.calendarIcon').remove();
	$('.custom-dropdown').remove();
  }

// ========================================================================== Script for Monthly View Dropdown End ==========================================================================
  
// Function to process your data and convert it into the format expected by ECharts
function processData(data) {
  // Implement this function according to your data format and ECharts requirements
  // For example, extract labels and values from your JSON data
  let engineerNames = data.map((item) => item.full_name);
  let lateCounts = data.map((item) => item.late_count);

  return {
    engineerNames: engineerNames,
    lateCounts: lateCounts,
  };
}

//----------------------------------------------------------------

// Function to initialize the chart with yearly view data
function initializeYearlyViewChart(year) {
  // Make an AJAX request to fetch the yearly view data
  $.ajax({
    url: BASEURL + '/Maintenance/getYearlyEngineerPerformance',
    type: 'GET',
    dataType: 'json',
	data: {year : year},
    success: function (data) {
        // Process the data and convert it into the format expected by ECharts
        let processedData = processData(data); // Implement this function to map your data to ECharts format

        // Initialize the ECharts instance based on the prepared DOM
        let lateReportChart = echarts.init(document.getElementById('lateReportChart'));

        // Specify the configuration items and data for the chart
        let option = {
          title: {
            text: 'Yearly Engineer Late Report',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: processedData.engineerNames
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'Late Report Count',
            type: 'bar',
            data: processedData.lateCounts,
			barWidth: '40%'
          }]
        };

        // Display the chart using the configuration items and data
        lateReportChart.setOption(option);

        // Disable the yearly view button after chart initialization
        $('#yearlyViewBtn').prop('disabled', true);
        // Enable the monthly view button after chart initialization
        $('#monthlyViewBtn').prop('disabled', false);
    },
    error: function (xhr, status, error) {
      console.error('Failed to fetch yearly view data.');
    }
  });
}

// Function to initialize the chart with monthly view data
function initializeMonthlyViewChart(month,year) {
  // Make an AJAX request to fetch the monthly view data
  $.ajax({
    url: BASEURL + '/Maintenance/getMonthlyEngineerPerformance',
    type: 'GET',
    dataType: 'json',
	data: {
		month: month,
		year: year
	},
    success: function (data) {
        // Process the data and convert it into the format expected by ECharts
        let processedData = processData(data); // Implement this function to map your data to ECharts format

        // Initialize the ECharts instance based on the prepared DOM
        let lateReportChart = echarts.init(document.getElementById('lateReportChart'));

        // Specify the configuration items and data for the chart
        let option = {
          title: {
            text: 'Monthly Engineer Late Report',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: processedData.engineerNames
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'Late Report Count',
            type: 'bar',
            data: processedData.lateCounts,
			barWidth: '40%'
          }]
        };

        // Display the chart using the configuration
        lateReportChart.setOption(option);

        // Disable the monthly view button after chart initialization
        $('#monthlyViewBtn').prop('disabled', true);
        // Enable the yearly view button after chart initialization
        $('#yearlyViewBtn').prop('disabled', false);
    },
    error: function (xhr, status, error) {
      console.error('Failed to fetch monthly view data.');
    },
  });
}

$(document).ready(function () {

	// Create a new Date object to get the current date
	var currentDate = new Date();

	// Get the current month (0 to 11; 0 = January, 11 = December)
	var currentMonth = currentDate.getMonth() + 1; // Add 1 because months are 0-based
	
	// Get the current year (e.g., 2023)
	var currentYear = currentDate.getFullYear();

  // On page load, initialize the chart with yearly view data
  initializeYearlyViewChart(currentYear);
  addYearlyDropdown();

  $('#monthlyViewBtn').on('click', function () {

	initializeMonthlyViewChart(currentMonth, currentYear);

	removeYearlyDropdown();

	addMonthlyDropdown();
	
  });

  $('#yearlyViewBtn').on('click', function () {

    initializeYearlyViewChart(currentYear);

	removeMonthlyDropdown();

	addYearlyDropdown();
  });
});
