// Bootstrap Table Extended
var $contractTable = $('#contract-table');

function filterTable() {

	// ================================================================= Filter Table Start =================================================================

	// Get references to the select element and the container
	const selectElement = $('#filterOptionSelect');
	const optionContainer = $('#optionContainer');

	let currentOption = null;
	let optionSelected;

	function updateElement(optionValue) {
		// Clear the previous element if exists
		if (currentOption) {
			currentOption.remove(); // Use jQuery's remove() method
		}
	
		if (optionValue === 'clientFilter') {
	
			const selectWrapper = $('<div class="form-floating mb-3" id="clientFilter"></div>');
			const clientInput = $('<input type="search" class="form-control" name="filterClient" id="filterClientName" required placeholder="clientName" autocomplete="off">');
			const clientList = $('<div id="filterClientList" class="clientNameList"></div>');
			const clientLabel = $('<label for="filterClientName">Client</label>');
			
			selectWrapper.append(clientInput);
			selectWrapper.append(clientList);
			selectWrapper.append(clientLabel);
			
			// Append the selectWrapper jQuery object to the optionContainer
			optionContainer.append(selectWrapper);
	
			// Update the current element reference
			currentOption = selectWrapper;
			optionSelected = 'client';

			addButton.show();
	
		} else if (optionValue === 'endDateFilter') {

			// Create the select element for months
			const monthSelect = $('<select class="form-select" id="endMonth"></select>');
			const months = ["None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
			// Add the disabled and selected option for "Month"
			monthSelect.append($('<option disabled selected>Month</option>'));
		
			for (let i = 0; i <= 12; i++) {
				const option = $('<option></option>').attr('value', i).text(months[i]);
				monthSelect.append(option);
			}
		
			// Create the input and dropdown for years
			const yearInput = $('<input type="text" class="end-year" placeholder="Year" readonly>');
			const yearList = $('<ul class="end-year-list"></ul>');
			const yearListWrapper = $('<div class="end-year-list-wrapper"></div>').append(yearList);
			const yearDropdown = $('<div class="end-year-dropdown mb-3"></div>').append(yearInput, yearListWrapper);
		
			// Append the created elements to the respective containers
			const yearContainer = $('<div class="row" id="endDateFilter"></div>');
			const monthCol = $('<div class="col"></div>').append(monthSelect);
			const yearCol = $('<div class="col"></div>').append(yearDropdown);
			
			yearContainer.append(monthCol, yearCol);
			optionContainer.append(yearContainer);

			// Update the current element reference
			currentOption = yearContainer;
			optionSelected = 'endDate';

			// Generate the year options on click
			generateEndYearOptions();

			addButton.show();
		}
	}

	// Listen for changes in the select element
	selectElement.on('change', function() {
		const selectedOptionValue = selectElement.val();
		updateElement(selectedOptionValue);
	});

	// End Year Filter =================================================================

	var dropdownEY = $('.end-year-dropdown');

	// Function to dynamically generate year options
	function generateEndYearOptions() {
		var currentYear = new Date().getFullYear();
		var minYear = currentYear - 100;
		var maxYear = currentYear + 100;

		var yearList = $('.end-year-list');
		yearList.empty();

		for (var year = minYear; year <= maxYear; year++) {
			var yearOption = $('<li></li>');
			yearOption.text(year);
			yearOption.attr('data-value', year);
			yearList.append(yearOption);
		}
	}

	// Function to scroll the year list to the current year option
	function scrollEndYearListToCurrentYear() {

		var yearList = $('.end-year-list');
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
	$(document).on('click', '.end-year', function () {

		$('.end-year-list-wrapper').slideToggle(200);

		scrollEndYearListToCurrentYear();
	});

	// Click event to select year (using event delegation)
	$('body').on('click', '.end-year-list-wrapper li', function () {
		var selectedYear = $(this).attr('data-value'); // Use .attr() instead of .data()
		$('.end-year').val(selectedYear);

		// Slide up the year dropdown after selection
		$('.end-year-list-wrapper').slideUp(200);
	});

	// Hide the dropdown lists when the user clicks outside the dropdown
	$('body').on('click', function (event) {
		if (!dropdownEY.is(event.target) && dropdownEY.has(event.target).length === 0) {
			$('.end-year-list-wrapper').hide();
		}
	});


	// Second Filter Option Field =================================================================

	// Get references to the select element and the container
	const selectElement2 = $('#filterOptionSelect2');
	const optionContainer2 = $('#optionContainer2');

	let currentOption2 = null;

	function updateElement2(optionValue) {
		// Clear the previous element if exists
		if (currentOption2) {
			currentOption2.remove(); // Use jQuery's remove() method
		}
	
		if (optionValue === 'clientFilter') {
	
			const selectWrapper = $('<div class="form-floating mb-3" id="clientFilter"></div>');
			const clientInput = $('<input type="search" class="form-control" name="filterClient" id="filterClientName" required placeholder="clientName" autocomplete="off">');
			const clientList = $('<div id="filterClientList" class="clientNameList"></div>');
			const clientLabel = $('<label for="filterClientName">Client</label>');
			
			selectWrapper.append(clientInput);
			selectWrapper.append(clientList);
			selectWrapper.append(clientLabel);
			
			// Append the selectWrapper jQuery object to the optionContainer2
			optionContainer2.append(selectWrapper);
	
			// Update the current element reference
			currentOption2 = selectWrapper;
	
		} else if (optionValue === 'endDateFilter') {

			// Create the select element for months
			const monthSelect = $('<select class="form-select" id="endMonth"></select>');
			const months = ["None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
			// Add the disabled and selected option for "Month"
			monthSelect.append($('<option disabled selected>Month</option>'));
		
			for (let i = 0; i <= 12; i++) {
				const option = $('<option></option>').attr('value', i).text(months[i]);
				monthSelect.append(option);
			}
		
			// Create the input and dropdown for years
			const yearInput = $('<input type="text" class="end-year" placeholder="Year" readonly>');
			const yearList = $('<ul class="end-year-list"></ul>');
			const yearListWrapper = $('<div class="end-year-list-wrapper"></div>').append(yearList);
			const yearDropdown = $('<div class="end-year-dropdown mb-3"></div>').append(yearInput, yearListWrapper);
		
			// Append the created elements to the respective containers
			const yearContainer = $('<div class="row" id="endDateFilter"></div>');
			const monthCol = $('<div class="col"></div>').append(monthSelect);
			const yearCol = $('<div class="col"></div>').append(yearDropdown);
			
			yearContainer.append(monthCol, yearCol);
			optionContainer2.append(yearContainer);

			// Update the current element reference
			currentOption2 = yearContainer;

			// Generate the year options on click
			generateEndYearOptions();
		}
	}

	// Listen for changes in the select element
	selectElement2.on('change', function() {
		const selectedOptionValue = selectElement2.val();
		updateElement2(selectedOptionValue);
	});

	// Add Filter Field =================================================================
	const filterFieldContainer = $('#addFilterField');
	const modalContainer = $('#filterModalBody');

	const addButton = $('#addFilterBtn');
	const deleteButton = $('<button type="button" class="btn btn-danger delete-button mt-2"><i class="fa-solid fa-minus"></i></button>');

	function resetFilterModal() {
		filterFieldContainer.hide();

		if(optionSelected === 'client') {

			$('#filterOptionSelect option[value="endDateFilter"]').prop('disabled', false);
			$('#filterOptionSelect2 option[value="clientFilter"]').prop('disabled', false);

			$('#clientFilter').remove();
			$('#endDateFilter').remove();
			
			$('#filterOptionSelect2').val('Choose filter');

		} else if(optionSelected === 'endDate') {

			$('#filterOptionSelect option[value="clientFilter"]').prop('disabled', false);
			$('#filterOptionSelect2 option[value="endDateFilter"]').prop('disabled', false);

			$('#clientFilter').remove();
			$('#endDateFilter').remove();

			$('#filterOptionSelect2').val('Choose filter');
		}
		deleteButton.remove();
		addButton.show();
		$('#filterOptionSelect').val('Choose filter'); // Clear the selection
	}
	
	modalContainer.on('click', '.delete-button', function() {
		filterFieldContainer.hide();

		if(optionSelected === 'client') {

			$('#filterOptionSelect option[value="endDateFilter"]').prop('disabled', false);
			$('#filterOptionSelect2 option[value="clientFilter"]').prop('disabled', false);
			$('#endDateFilter').remove();
			$('#filterOptionSelect2').val('Choose filter');

		} else if(optionSelected === 'endDate') {

			$('#filterOptionSelect option[value="clientFilter"]').prop('disabled', false);
			$('#filterOptionSelect2 option[value="endDateFilter"]').prop('disabled', false);
			$('#clientFilter').remove();
			$('#filterOptionSelect2').val('Choose filter');
		}

		deleteButton.remove();
		addButton.show();
	});

	modalContainer.on('click', '#addFilterBtn', function() {
		filterFieldContainer.show();

		if(optionSelected === 'client') {
			$('#filterOptionSelect option[value="endDateFilter"]').prop('disabled', true);
			$('#filterOptionSelect2 option[value="clientFilter"]').prop('disabled', true);

		} else if (optionSelected === 'endDate') {
			$('#filterOptionSelect option[value="clientFilter"]').prop('disabled', true);
			$('#filterOptionSelect2 option[value="endDateFilter"]').prop('disabled', true);
		}

		modalContainer.append(deleteButton);
		addButton.hide();
	});

	$('#filter').on('click', function() {

		$('#addFilterField').hide();
		addButton.hide();

	});

	$('.cancelContractFilter').on('click', function() {

		resetFilterModal();

	});

	// ================================================================= Filter Table End =================================================================

	// ================================================================= Filter Query Start ===============================================================

	// Keep track of whether the alert has been shown
	let alertShown = false;

	$('.filterSubmitBtn').click(function(event) {
		
		event.preventDefault();

		// Retrieve values from the dropdowns
		let clientName = $('#filterClientName').val();
		let endMonth = $('#endMonth').val();
		let endYear = $('.end-year').val();

		if ((clientName && endMonth && endYear) || (clientName || (!clientName && endYear) || (endMonth && endYear))) {


			// Close the modal using the modal method
			$("#filterTableModal").modal("hide");

			// Disable the filter button
			$('#filter').prop("disabled", true);

			let month;

			switch (endMonth) {
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

			const tagContainer1 = $('<div class="tag-container ms-2"></div>');
			const tagContainer2 = $('<div class="tag-container ms-2"></div>');
			const tag1 = $('<div class="tag"></div>');
			const tag2 = $('<div class="tag"></div>');
			const tagText1 = $('<span class="tag-text me-1">' + month + ' ' + endYear + '</span>');
			const tagText2 = $('<span class="tag-text me-1">' + clientName + '</span>');
			const tagClose1 = $('<button type="button" class="btn-close tag-close" aria-label="Close"></button>');
			const tagClose2 = $('<button type="button" class="btn-close tag-close" aria-label="Close"></button>')
			
			let activeFilters = []; // Initialize an array to track active filters

			if(clientName && endMonth && endYear) {

				activeFilters.push('client');
				activeFilters.push('monthYear');

				tagContainer1.append(tag1);
				tag1.append(tagText1);
				tag1.append(tagClose1);

				tagContainer2.append(tag2);
				tag2.append(tagText2);
				tag2.append(tagClose2);

				$('#toolbar').append(tagContainer1);
				$('#toolbar').append(tagContainer2);

			} else if(!clientName && endYear) {

				activeFilters.push('monthYear');

				clientName = null;

				if(!endMonth) {
					endMonth = null;
				}

				tagContainer1.append(tag1);
				tag1.append(tagText1);
				tag1.append(tagClose1);
				$('#toolbar').append(tagContainer1);
				
			} else if(clientName) {

				activeFilters.push('client');

				endMonth = null;
				endYear = null;

				tagContainer2.append(tag2);
				tag2.append(tagText2);
				tag2.append(tagClose2);
				$('#toolbar').append(tagContainer2);
			}

			function updateTable() {
				$.ajax({
					url: BASEURL + '/contract/filterTable',
					type: 'POST',
					dataType: 'json',
					data: {
						clientName: clientName,
						endMonth: endMonth,
						endYear: endYear,
					},
					success: function (data) {
				
						// Prepare the data for the Bootstrap Table
						var tableData = [];
						for (var i = 0; i < data.length; i++) {
							var rowData = {
								name: data[i].name,
								sop_number: data[i].sop_number,
								device: data[i].device,
								pm_frequency: data[i].pm_frequency,
								start_date: data[i].start_date,
								end_date: data[i].end_date,
								full_name: data[i].full_name
							};
							tableData.push(rowData);
						}
				
						// Update the data and refresh the table
						$('#contract-table').bootstrapTable('load', tableData);
					},
					error: function (xhr, status, error) {
						console.error('AJAX Error:' + error);
					},
				});
			}

			updateTable();
		
			tagClose1.click(function () {
				// Remove the keyword tag 
			  	tagContainer1.remove();

				// Remove the 'monthYear' from active filters
				const index = activeFilters.indexOf('monthYear');
				if (index > -1) {
					activeFilters.splice(index, 1);
				}

				endMonth = null;
				endYear = null;

				// If there are still active filters, update the table
				if (activeFilters.length > 0) {
					updateTable();
				} else {
					// If no active filters left, update the table to show all data
					$('#contract-table').bootstrapTable('refresh');
					$('#filter').prop("disabled", false);

					resetFilterModal();
				}
			});

			tagClose2.click(function () {
				// Remove the keyword tag 
			  	tagContainer2.remove();

				// Remove the 'monthYear' from active filters
				const index = activeFilters.indexOf('client');
				if (index > -1) {
					activeFilters.splice(index, 1);
				}

				clientName = null;

				// If there are still active filters, update the table
				if (activeFilters.length > 0) {
					updateTable();
				} else {
					// If no active filters left, update the table to show all data
					$('#contract-table').bootstrapTable('refresh');
					$('#filter').prop("disabled", false);

					resetFilterModal();
				}				
			});
		} else {

			if (!alertShown) {
				// Show an alert when no input is given or the year input is empty
				let alert = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fa-solid fa-triangle-exclamation me-2"></i>Invalid Input<button type="button" id="closeFormAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
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
}

function initContractTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$contractTable.bootstrapTable('destroy').bootstrapTable({
		icons: icons,
		exportTypes: ['csv', 'excel', 'pdf'],
		locale: 'en-US',
		classes: 'table table-bordered table-condensed custom-font-size',
		columns: [
		{
			title: 'Client',
			field: 'name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP',
			field: 'sop_number',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'device',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM Frequency',
			field: 'pm_frequency',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}]
	});
}

$(document).ready(function () {
	initContractTable();

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	filterTable();
});