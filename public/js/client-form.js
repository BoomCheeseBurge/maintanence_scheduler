$(function() {
	// Initialize the counter variable
	let picCounter = 2;

	// Container for the delete button
	const deleteButton = $(`<button type="button" class="btn btn-danger delete-pic mb-4">-</button>`);

	// Click event for the plus button
	$('#addPicFieldsBtn').click(function() {
		// Create a unique ID for the new set of input fields
		const uniqueId = `picClient${picCounter}`;
		
		// Create a new PIC fields div
		const picFieldsDiv = $(`<div class="pic-fields" id="${uniqueId}">`);
		// Add the input fields to the div
		picFieldsDiv.append(`<h6>PIC Client ${picCounter}</h6>`);
		picFieldsDiv.append('<div class="form-floating mb-1">' +
			'<input type="text" class="form-control" name="picName[]" required placeholder="picName">' +
			`<label ${uniqueId}-name>PIC Name</label>` +
			'</div>');
		picFieldsDiv.append('<div class="form-floating mb-4">' +
			'<input type="email" class="form-control" name="picEmail[]" required placeholder="picEmail">' +
			`<label for="${uniqueId}-email">PIC Email</label>` +
			'</div>');
		
		// Append the delete button to the newly added PIC fields div
		picFieldsDiv.append(deleteButton);

		// Append the new PIC fields div to the container
		$('#picFieldsContainer').append(picFieldsDiv);

		// Increment the counter
		picCounter++;
	});
	
	// Event delegation to handle the click event of delete buttons
	$('#picFieldsContainer').on('click', '.delete-pic', function() {
		// Get the parent div of the delete button (i.e., the PIC fields div)
		const picFieldsDiv = $(this).closest('.pic-fields');
		const picFieldsId = picFieldsDiv.attr('id');

		// Remove the current set of input fields
		picFieldsDiv.remove();

		// Decrement the counter
		picCounter--;

		// Get the previous set of PIC fields and add the delete button to it
		if (picCounter > 2) {
			const prevPicFieldsId = `picClient${picCounter - 1}`;
			const prevPicFieldsDiv = $(`#${prevPicFieldsId}`);
			const deleteButton = $('<button type="button" class="btn btn-danger delete-pic mb-4">Delete</button>');
			prevPicFieldsDiv.append(deleteButton);
		}
	});
});