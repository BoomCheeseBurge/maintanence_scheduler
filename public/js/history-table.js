// Admin Bootstrap Table Extended
var $historyTable = $('#history-table')

function initHistoryTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$historyTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
        exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Client',
			field: 'name',
			align: 'center',
			valign: 'middle',
			sortable: true,
			filterControl: 'input'
		}, {
			title: 'SOP No',
			field: 'sop_number',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Device',
			field: 'device',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'PM ke-',
			field: 'pm_count',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Scheduled Date',
			field: 'scheduled_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			filterControl: 'datepicker'
		}, {
			title: 'Actual Date',
			field: 'actual_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			filterControl: 'datepicker'
		}, {
			title: 'Report Date',
			field: 'report_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		}]
	});
}

$(document).ready(function () {

	initHistoryTable()

	$('#history-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	})

	// ================================================================= Filter Table Start =================================================================

	// Script for adding Month and Year for echarts
	var dropdown = $('.filter-dropdown');
	var input = dropdown.find('.filter-year');
	var yearListWrapper = dropdown.find('.filter-year-list-wrapper');

	// Function to dynamically generate year options
	function generateYearOptions() {
		var currentYear = new Date().getFullYear();
		var minYear = currentYear - 100;
		var maxYear = currentYear + 100;

		var yearList = dropdown.find('.filter-year-list');
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
		var yearList = dropdown.find('.filter-year-list');
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
	});

	// Hide the dropdown lists when the user clicks outside the dropdown
	$(document).click(function (event) {
	  if (!dropdown.is(event.target) && dropdown.has(event.target).length === 0) {
		yearListWrapper.hide();
	  }
	});

	// Generate the year options on page load
	generateYearOptions();

	// ================================================================= Filter Table End =================================================================

	// ================================================================= Filter Query Start ===============================================================

	// Keep track of whether the alert has been shown
	let alertShown = false;

	$('.filterSubmitBtn').click(function(event) {
		
		event.preventDefault();

		// Retrieve values from the dropdowns
		let selectedMonth = $('#monthSelect').val();
		let selectedYear = $('.filter-year').val();

		console.log(selectedMonth);
		console.log(selectedYear);

		if(selectedYear !== "" || (selectedMonth !== null && selectedYear !== "")) {

			// Close the modal using the modal method
			$("#filterTableModal").modal("hide");

			// Disable the filter button
			$('#filter').prop("disabled", true);

			$.ajax({
				url: BASEURL + '/maintenance/filterTable',
				type: 'POST',
				dataType: 'json',
				data: {
					month: selectedMonth,
					year: selectedYear,
				},
				success: function (data) {
			
					// Prepare the data for the Bootstrap Table
					var tableData = [];
					for (var i = 0; i < data.length; i++) {
						var rowData = {
							full_name: data[i].full_name,
							name: data[i].name,
							sop_number: data[i].sop_number,
							device: data[i].device,
							pm_frequency: data[i].pm_frequency,
							pm_count: data[i].pm_count,
							scheduled_date: data[i].scheduled_date,
							actual_date: data[i].actual_date,
							report_date: data[i].report_date
						};
						tableData.push(rowData);
					}
			
					// Update the data and refresh the table
					$('#history-table').bootstrapTable('load', tableData);
				},
				error: function (xhr, status, error) {
					console.error('AJAX Error:' + error);
				},
			});

			let month;

			switch (selectedMonth) {
				case '1':
					month = "January";
					break;
				case '2':
					month = "February";
					break;
				case '3':
					month = "March";
					break;
				case '4':
					month = "April";
					break;
				case '5':
					month = "May";
					break;
				case '6':
					month = "June";
					break;
				case '7':
					month = "July";
					break;
				case '8':
					month = "August";
					break;
				case '9':
					month = "September";
					break;
				case '10':
					month = "October";
					break;
				case '11':
					month = "November";
					break;
				case '12':
					month = "December";
					break;
				default:
					month = "";
			  }

			let tagContainer = $('<div class="tag-container"></div>');
			let tag = $('<div class="tag"></div>');
			let tagText = $('<span class="tag-text me-1">' + month + ' ' + selectedYear + '</span>');
			let tagClose = $('<button type="button" class="btn-close tag-close" aria-label="Close"></button>');
		
			tagContainer.append(tag);
			tag.append(tagText);
			tag.append(tagClose);
		
			tagClose.click(function () {
				// Remove the keyword tag 
			  	tagContainer.remove();

				// Enable the filter button
				$('#filter').prop("disabled", false);

				$.ajax({
					url: BASEURL + '/maintenance/getMaintenanceHistory',
					type: 'POST',
					dataType: 'json',
					success: function (data) {
				
						// Prepare the data for the Bootstrap Table
						var tableData = [];
						for (var i = 0; i < data.length; i++) {
							var rowData = {
								full_name: data[i].full_name,
								name: data[i].name,
								sop_number: data[i].sop_number,
								device: data[i].device,
								pm_frequency: data[i].pm_frequency,
								pm_count: data[i].pm_count,
								scheduled_date: data[i].scheduled_date,
								actual_date: data[i].actual_date,
								report_date: data[i].report_date
							};
							tableData.push(rowData);
						}
				
						// Update the data and refresh the table
						$('#history-table').bootstrapTable('load', tableData);
					},
					error: function (xhr, status, error) {
						console.error('AJAX Error:' + error);
					},
				});

			});
		
			$('#toolbar').append(tagContainer);
		} else {

			if (!alertShown) {
				// Show an alert when no input is given or the year input is empty
				let alert = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fa-solid fa-triangle-exclamation me-2"></i>Don\'t leave empty input!<button type="button" id="closeFormAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
				$('#filterForm').prepend(alert);
				alertShown = true;
			}
		}
	});

	// Attach click event handler to the parent element and use event delegation
	$('#filterForm').on('click', '#closeFormAlert', function() {
		alertShown = false;
	});

	// ================================================================= Filter Query End =================================================================
});
