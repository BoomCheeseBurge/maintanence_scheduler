// Admin Bootstrap Table Extended
var $maintenanceTable = $('#maintenance-table');
var $remove = $('#remove');
var selections = [];

// Function to retrieve the selected rows from the table
function getIdSelections() {
	return $.map($maintenanceTable.bootstrapTable('getSelections'), function (row) {
		return row.id
	})
}

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setForm() {

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#editMaintenanceModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var maintenanceId = button.data('id');
		var sopNum = button.data('sop');
		
		// Set the value of the input field in the modal form
		$('#editMaintenanceId').val(maintenanceId);
		$('#sopNum').val(sopNum);
	});

	let pmCount;
	let month;

	$(document).on('click', '.editMaintenanceBtn', function() {

		const id = $(this).data('id');

		$.ajax({

			url: BASEURL + '/Maintenance/getSingleMaintenanceData',
			data: {id : id},
			method: 'POST',
			dataType: 'json',
			success: function(data) {

				$('.pmCount').val(data.pm_count);
				$('#month').val(data.month);

				pmCount = data.pm_count;
				month = data.month;
			}
		});
	});

	$(document).on('click', '.cancelEditMaintenance', function() {

		$('.editMaintenanceSubmitBtn').html('Confirm');
	});

	// Delete maintenance event handler
	$(document).on('submit', '#editMaintenanceForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('editMaintenanceForm'));

		// Check if the any of the following has been changed
		if(formData.get('pmCount') != pmCount || formData.get('month') != month) {
			formData.append('anyChange', 'true');
		} else {
			formData.append('anyChange', 'false');
		}

		if(formData.get('pmCount') != pmCount || formData.get('month') != month){

			$('.editMaintenanceSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Saving maintenance...</span>');

			$.ajax({
				url: BASEURL + '/Maintenance/editMaintenance',
				type: 'POST',
				data: formData,
				contentType: false,
				processData: false,
				dataType: 'json',
				success: function(response) {

					if (response['result'] == '1') {
						$('#editMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Maintenance successfully updated',
							showConfirmButton: false,
							timer: 2000
						});
						$('#maintenance-table').bootstrapTable('refresh');
					} else if (response['result'] == "2") {
						$('#editMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Maintenance failed to be updated',
							showConfirmButton: true
						});
					} else if (response['result'] == "3") {
						$('#editMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Save changes failed. Duplication of PM count or month detected.',
							showConfirmButton: true
						});
					} else {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'Update failed. Contact your administrator',
							showConfirmButton: true
						});
						$('#editMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					}
				},
				error: function() {
				// Request failed, handle error here
				alert("Error updating existing maintenance");
				}
			});
		} else {$('#editMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');}
	});

	// Event listener for the show.bs.modal event on the scheduledDateModal
	$('#delMaintenanceModal').on('show.bs.modal', function(event) {
		// Get the button that triggered the modal
		var button = $(event.relatedTarget);
		
		// Extract the data-id attribute value from the button
		var maintenanceId = button.data('id');
		
		// Set the value of the input field in the modal form
		$('#delMaintenanceId').val(maintenanceId);
	});

	$(document).on('click', '.cancelDelMaintenance', function() {

		$('.delMaintenanceSubmitBtn').html('Confirm');
	});

	// Delete maintenance event handler
	$(document).on('submit', '#delMaintenanceForm', function(event) {
		event.preventDefault();
		
		const formData = new FormData(document.getElementById('delMaintenanceForm'));

		$('.delMaintenanceSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status">Deleting maintenance...</span>');

		$.ajax({
			url: BASEURL + '/Maintenance/delMaintenance',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(response) {

				if (response['result'] == '1') {
					$('#delMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Maintenance successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#maintenance-table').bootstrapTable('refresh');
				} else if (response['result'] == "0") {
					$('#delMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Maintenance failed to be deleted',
						showConfirmButton: true
					});
				} else if (response['result'] == "2") {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted record is not related to any contract, client, or engineer',
						showConfirmButton: true
					});
					$('#delMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion failed. Contact your administrator',
						showConfirmButton: true
					});
					$('#delMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function() {
			// Request failed, handle error here
			alert("Error deleting existing maintenance");
			}
		});
	});
}

function maintenanceFormatter(value, row, index) {
	return [
		'<span class="ms-2 editMaintenanceBtn" data-bs-toggle="modal" data-bs-target="#editMaintenanceModal" data-id="' + row.id + '" data-sop="' + row.sop_number + '">',
		'<button class="btn btn-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
		'<i class="fa-solid fa-pen-to-square"></i>',
		'</button>',
		'</span>',
		'<span class="ms-2 delMaintenanceBtn" data-bs-toggle="modal" data-bs-target="#delMaintenanceModal" data-id="' + row.id + '">',
		'<button class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">',
		'<i class="fa-solid fa-trash-can"></i>',
		'</button>',
		'</span>'
	].join('')
}

function filterTable() {

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

		if(selectedYear !== "" || (selectedMonth !== null && selectedYear !== "")) {

			// Close the modal using the modal method
			$("#filterTableModal").modal("hide");

			// Disable the filter button
			$('#filter').prop("disabled", true);

			$.ajax({
				url: BASEURL + '/Maintenance/filterTable',
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
					$('#maintenance-table').bootstrapTable('load', tableData);
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
					url: BASEURL + '/Maintenance/getMaintenanceList',
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
						$('#maintenance-table').bootstrapTable('load', tableData);
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
}

function initMaintenanceTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$maintenanceTable.bootstrapTable('destroy').bootstrapTable({
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
			title: 'PM Month',
			field: 'month',
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
		}, {
			title: 'Action',
			field: 'action',
			align: 'center',
			valign: 'middle',
			switchable: false,
		    formatter: maintenanceFormatter
	  	}],
		onPostBody: () => {
		  initializeTooltips();
		}
	});

	$maintenanceTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$maintenanceTable.bootstrapTable('getSelections').length);

		// save your data, here just save the current page
		selections = getIdSelections()
		// push or splice the selections if you want to save all data selections
	});

	$(document).on('click', '.cancelDelBulkMaintenance', function() {

		$('.bulkDeleteSubmitBtn').html('Confirm');
	});

	$(document).on('submit', '#bulkDeleteMaintenanceForm', function(event) {
		event.preventDefault();

		var ids = getIdSelections();

		$('.bulkDeleteSubmitBtn').html('<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span><span role="status" class="ms-1">Deleting Maintenance...</span>');

		// Send an AJAX request to the server to delete the selected rows
		$.ajax({
			url: BASEURL + '/Maintenance/delBulkMaintenance',
			type: 'POST',
			data: { ids: ids },
			dataType: 'json',
			success: function (response) {

				if (response['result'] == ids.length) {
					$('#delBulkMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Maintenance successfully deleted',
						showConfirmButton: false,
						timer: 2000
					});
					$('#maintenance-table').bootstrapTable('refresh');
					$remove.prop('disabled', true);
				} else if (response['result'] == '0') {
					$('#delBulkMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Maintenance failed to be deleted',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
				} else if (response['result'] == '2') {
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion denied. Please ensure the deleted records are not related to any contract, client, or engineer',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
				} else {
					$('#editClientModal [data-bs-dismiss="modal"]').trigger('click');
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Deletion Failed. Contact your administrator',
						showConfirmButton: true
					});
					$remove.prop('disabled', true);
					$('#delBulkMaintenanceModal [data-bs-dismiss="modal"]').trigger('click');
				}
			},
			error: function () {
				// Handle the error if any
				alert("Error deleting existing maintenance");
			}
		});
	});
}

$(document).ready(function () {

	initMaintenanceTable();

	$('#maintenance-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();
	filterTable();
});
