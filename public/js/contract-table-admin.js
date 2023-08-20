// Bootstrap Table Extended
var $contractTable = $('#contract-table');
var $remove = $('#remove');
var selections = [];

// Function to retrieve the selected rows from the table
function getIdSelections() {
	return $.map($contractTable.bootstrapTable('getSelections'), function (row) {
		return row.id
	})
}

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Function to filter the table
function filterTable() {

	// ================================================================= Filter Table Start =================================================================

	// Get references to the select element and the container
	const selectElement = $('#filterOptionSelect');
	const optionContainer = $('#optionContainer');

	// Control variable in tracking the selected filter for when opening and closing the modal
	let currentOption = null;
	let optionSelected;

	function updateElement(optionValue) {
		// Clear the previous filter option element if exists
		if (currentOption) {
			currentOption.remove();
		}
	
		if (optionValue === 'clientFilter') {
	
			const selectWrapper = $('<div class="form-floating mb-3" id="clientFilter"></div>');
			const clientInput = $('<input type="search" class="form-control" name="filterClient" id="filterClientName" required placeholder="clientName" autocomplete="off">');
			const clientList = $('<div id="filterClientList" class="clientNameList"></div>');
			const clientLabel = $('<label for="filterClientName">Client</label>');
			
			selectWrapper.append(clientInput);
			selectWrapper.append(clientList);
			selectWrapper.append(clientLabel);
			
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
		
			// Append the month options to the month select
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

	// End Year Filter Dropdown =================================================================

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

	// Click event to select year
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


			// Close the modal
			$("#filterTableModal").modal("hide");

			// Disable the filter button
			$('#filter').prop("disabled", true);

			let month;

			// Convert the month number to its corresponding month text
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

function setForm() {

	// Event listener for the show.bs.modal event on upon opening the modal
	$('#contractModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var contractId = button.data('id');

		// Set the value of the input field in the modal form
		$('#id').val(contractId);
	});

	$('#delContractModal').on('show.bs.modal', function(event) {

		var button = $(event.relatedTarget);
		
		var contractId = button.data('id');

		$('#contractId').val(contractId);
	});

	// ==========================================================================================================
	// Add Contract Event Handler starts here

	$(document).on('click', '.addContractBtn', function() {

		$('#contractModalLabel').html('New Contract');

		$('#id').val('');
		$('#clientName').val('');
		$('#sopNumber').val('');
		$('#deviceName').val('');
		$('#startDate').val('');
		$('#endDate').val('');
		$('#pmFreq').val('');
		$('#assignee').val('');

		$('#contractForm').attr('id', 'addContractForm');

		$('.modal-footer .contractSubmitBtn').html('Add');
	});

	// Delegate the form submission handler to the document
	$(document).on('submit', '#addContractForm', function(event) {
		event.preventDefault();
		
		// Get the form data
		const formData = new FormData(document.getElementById('addContractForm'));

		$('.contractSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Adding contract...</span>');
		
		$.ajax({
			url: BASEURL + '/contract/addContract',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Contract successfully added',
						showConfirmButton: false,
						timer: 2000
					});
					$('#contract-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract failed to be added',
						showConfirmButton: true
					});
				} else if (response['result'] == '3') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract already exists',
						showConfirmButton: true
					});
				} else if (response['result'] == '4') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client or engineer not found. Please try again',
						showConfirmButton: true
					});
					$('.modal-footer .contractSubmitBtn').html('Add');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Entry Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.modal-footer .contractSubmitBtn').html('Add');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error adding new contract");
				$('.modal-footer .contractSubmitBtn').html('Add');
			}
		});
	});

	// ==========================================================================================================
	// Edit Contract Event Handler starts here

	$(document).on('click', '.editContractBtn', function() {

		$('#contractModalLabel').html('Edit Contract');

		// Retrieve the specific id of the clicked row
		const id = $(this).data('id');
		
		$.ajax({

			url: BASEURL + '/contract/getEditContractData',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {
				$('#id').val(data.id);
				$('#clientName').val(data.name);
				$('#sopNumber').val(data.sop_number);
				$('#startDate').val(data.start_date);
				$('#endDate').val(data.end_date);
				$('#deviceName').val(data.device);
				$('#pmFreq').val(data.pm_frequency);
				$('#assignee').val(data.full_name);
			}
		});

		$('#contractForm').attr('id', 'editContractForm');

		$('.modal-footer .contractSubmitBtn').html('Save');
	});

	$(document).on('submit', '#editContractForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editContractForm'));

		$('.contractSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Saving contract...</span>');

		$.ajax({
			url: BASEURL + '/contract/editContract',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Contract successfully updated',
						showConfirmButton: false,
						timer: 2000
					});
					$('#contract-table').bootstrapTable('refresh');
				} else if (response['result'] == '2') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract failed to be updated',
						showConfirmButton: true
					});
				} else if (response['result'] == '3') {
					$('#contractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract already exists',
						showConfirmButton: true
					});
				} else if (response['result'] == '4') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Client or engineer not found. Please try again',
						showConfirmButton: true
					});
					$('.modal-footer .contractSubmitBtn').html('Save');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Updated changes failed. Contact your administrator',
						showConfirmButton: true
					});
					$('.modal-footer .contractSubmitBtn').html('Save');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error saving changes");
				$('.modal-footer .contractSubmitBtn').html('Save');
			}
		});
	});

	// ==========================================================================================================
	// Delete Contract Event Handler starts here

	$(document).on('click', '.cancelDelContractBtn', function() {

		$('.delContractSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#delContractForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delContractForm'));

		$('.delContractSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting contract...</span>');

		$.ajax({
			url: BASEURL + '/contract/delContract',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#delContractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Contract successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#contract-table').bootstrapTable('refresh');
				} else if (response['result'] == '0') {
					$('#delContractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract failed to be deleted',
						showConfirmButton: true
					});
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted record is not related elsewhere',
						showConfirmButton: true
					});
					$('#delContractModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$('#delContractModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function() {
				// Request failed, handle error here
				alert("Error deleting existing contract");
			}
		});
	});

	// ==========================================================================================================
	// Create new maintenance PM Event Handler starts here

	$(document).on('click', '.createSchedule', function() {

		const id = $(this).data('id');

		$.ajax({

			url: BASEURL + '/contract/getSingleContractData',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {

				$('#client_name').val(data.name);
				$('#sop_number').val(data.sop_number);
				$('#device').val(data.device);
				$('#pm_frequency').val(data.pm_frequency);
				$('#start_date').val(data.start_date);
				$('#end_date').val(data.end_date);
				$('#full_name').val(data.full_name);
			}
		});
	});
}

function contractFormatter(value, row, index) {
    return [
		'<span class="ms-2 createSchedule" data-bs-toggle="modal" data-bs-target="#scheduleModal" data-id="' + row.id + '">',
		'<button class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create maintenance schedule">',
		'<i class="fa-solid fa-calendar-plus"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 editContractBtn" data-bs-toggle="modal" data-bs-target="#contractModal" data-id="' + row.id + '">',
		'<button class="btn btn-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
		'<i class="fa-solid fa-pen-to-square"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 delContractBtn" data-bs-toggle="modal" data-bs-target="#delContractModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
		'</span>'
    ].join('')
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
			field: 'state',
			checkbox: true,
			align: 'center',
			valign: 'middle'
		},{
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
			valign: 'middle',
			width: '20'
		}, {
			title: 'Start Date',
			field: 'start_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			width: '30'
		}, {
			title: 'End Date',
			field: 'end_date',
			align: 'center',
			valign: 'middle',
			sortable: true,
			width: '30'
		},{
			title: 'Engineer',
			field: 'full_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			switchable: false,
			formatter: contractFormatter
	  	}],
		onPostBody: () => {
			initializeTooltips();
		}
	});

	$contractTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$contractTable.bootstrapTable('getSelections').length)

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$(document).on('click', '.cancelDelBulkContract', function() {

		$('.bulkDeleteSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#bulkDeleteContractForm', function(event) {
		event.preventDefault();

		var ids = getIdSelections();

		$('.bulkDeleteSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting Contract...</span>');
	
		// Send an AJAX request to the server to delete the selected rows
		$.ajax({
			url: BASEURL + '/contract/delBulkContract',
			type: 'POST',
			data: { ids: ids },
			dataType: 'json',
			success: function (response) {

				if (response['result'] == ids.length) {
					$('#delBulkContractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Contracts successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#contract-table').bootstrapTable('refresh');
					$remove.prop('disabled', true);
				} else if (response['result'] == '0') {
					$('#delBulkContractModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Contract failed to be deleted',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
				} else if (response['result'] == '2') {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted records are not related elsewhere',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkContractModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkContractModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function () {
				// Handle the error if any
				alert("Error deleting existing contracts");
			}
		});
	});
}

$(function() {
	initContractTable();

	$('#contract-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();

	filterTable();
})