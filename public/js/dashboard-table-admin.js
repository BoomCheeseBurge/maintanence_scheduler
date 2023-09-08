// Admin Bootstrap Table Extended
var $dashboardTable = $('#dashboard-table');
var $remove = $('#remove');
var selections = [];

// Function to retrieve the selected rows from the table
function getIdSelections() {
	return $.map($dashboardTable.bootstrapTable('getSelections'), function (row) {
		return row.id
	})
}

// Function to initialize Bootstrap 5.3 tooltips
function initializeTooltips() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function reportFormatter(row) {
    return [row.reportStatus, row.reportDate].join('<br>');
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
						$('#dashboard-table').bootstrapTable('refresh');
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
					$('#dashboard-table').bootstrapTable('refresh');
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
		'<button class="btn btn-warning btn-sm mb-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">',
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
	// Filter the maintenance table
	$('#maintenance').change(function() {
		// Get the selected option's value
		var selectedValue = $(this).val();
		
		$.ajax({
			url: BASEURL + '/Maintenance/filterMaintenance',
			data: {selectedValue : selectedValue},
			type: 'POST',
			dataType: 'json',
			success: function (data) {
		
				// Prepare the data for the Bootstrap Table
				var tableData = [];
				for (var i = 0; i < data.length; i++) {
					var rowData = {
						engineer_name: data[i].engineer_name,
						client_name: data[i].client_name,
						sopNumber: data[i].sopNumber,
						deviceName: data[i].deviceName,
						pmCount: data[i].pmCount,
						pmMonth: data[i].pmMonth,
						scheduledDate: data[i].scheduledDate,
						actualDate: data[i].actualDate,
						maintenanceStatus: data[i].maintenanceStatus,
						report: reportFormatter(data[i])
					};
					tableData.push(rowData);
				}
		
				// Update the data and refresh the table
				$('#dashboard-table').bootstrapTable('load', tableData);
			},
			error: function (xhr, status, error) {
				console.error('AJAX Error:' + error);
			},
		});
	});
}

function initDashboardTable() {
	var icons = {
		columns: 'bi-layout-sidebar-inset-reverse',
		fullscreen: 'bi-arrows-fullscreen',
		clearSearch: 'bi bi-x-lg'
	}
	$dashboardTable.bootstrapTable('destroy').bootstrapTable({
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
			field: 'engineer_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'Client',
			field: 'client_name',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'SOP No',
			field: 'sopNumber',
			align: 'center',
			valign: 'middle'
		},{
			title: 'Device',
			field: 'deviceName',
			align: 'center',
			valign: 'middle',
			sortable: true
		},{
			title: 'PM ke-',
			field: 'pmCount',
			align: 'center',
			valign: 'middle'
		},{
			title: 'PM Month',
			field: 'pmMonth',
			align: 'center',
			valign: 'middle'
		}, {
			title: 'Scheduled Date',
			field: 'scheduledDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Actual Date',
			field: 'actualDate',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Maintenance Status',
			field: 'maintenanceStatus',
			align: 'center',
			valign: 'middle',
			sortable: true
		}, {
			title: 'Report Status',
			field: 'report',
			align: 'center',
			valign: 'middle',
			sortable: true,
			formatter: function (value, row) {
				return [row.reportStatus, row.reportDate].join('<br>')
			}
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

	$dashboardTable.on('check.bs.table uncheck.bs.table ' +
		'check-all.bs.table uncheck-all.bs.table',
	function () {
		$remove.prop('disabled', !$dashboardTable.bootstrapTable('getSelections').length);

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
					$('#dashboard-table').bootstrapTable('refresh');
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

$(function() {
	initDashboardTable();

	$('#dashboard-table').bootstrapTable('refreshOptions', {
		buttonsOrder: ['refresh', 'columns', 'export', 'fullscreen']
	});

	setForm();
	filterTable();
})
