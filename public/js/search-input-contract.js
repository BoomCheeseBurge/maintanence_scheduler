// Search Input for Engineer
document.getElementById('assignee').addEventListener('input', function () {
	const searchQuery = this.value.trim();
  
	// If the search query is empty, hide the assignee list and return
	if (searchQuery === '') {
	  document.getElementById('assigneeList').innerHTML = '';
	  return;
	}
  
	// Make an AJAX request to fetch the assignees based on the search query
	$.ajax({
	  url: BASEURL + '/user/searchAssignee',
	  type: 'GET',
	  dataType: 'json',
	  data: { keyword: searchQuery }, // Pass the search query as data
	  success: function (response) {
		displaySearchResults(response);
	  },
	  error: function (xhr, status, error) {
		console.error('Failed to fetch assignees.');
	  },
	});
  });
  
  function displaySearchResults(response) {
	const assigneeList = document.getElementById('assigneeList');
	assigneeList.innerHTML = '';
  
	if (response.length > 0) {
	  response.forEach(function (assignee) {
		const option = document.createElement('div');
		option.textContent = assignee.full_name; // Replace 'name' with the correct property from the response
		option.className = 'assigneeOption ms-1';
		option.addEventListener('click', function () {
		  document.getElementById('assignee').value = assignee.full_name; // Replace 'name' with the correct property from the response
		  assigneeList.innerHTML = '';
		});
		assigneeList.appendChild(option);
	  });
	} else {
	  // Show a message when no results are found
	  const noResultsMessage = document.createElement('div');
	  noResultsMessage.textContent = 'No results found.';
	  noResultsMessage.className = 'assigneeOption ms-1';
	  assigneeList.appendChild(noResultsMessage);
	}
  }

// ---------------------------------------------------------------

// Search Input for Client
document.getElementById('clientName').addEventListener('input', function () {
	const searchQuery = this.value.trim();
  
	// If the search query is empty, hide the client list and return
	if (searchQuery === '') {
	  document.getElementById('clientNameList').innerHTML = '';
	  return;
	}
  
	// Make an AJAX request to fetch the client names based on the search query
	$.ajax({
	  url: BASEURL + '/client/searchClientName',
	  type: 'GET',
	  dataType: 'json',
	  data: { keyword: searchQuery }, // Pass the search query as data
	  success: function (response) {
		displayClientName(response);
	  },
	  error: function (xhr, status, error) {
		console.error('Failed to fetch client names.');
	  },
	});
  });

  function displayClientName(response) {
	const clientNameList = document.getElementById('clientNameList');
	clientNameList.innerHTML = '';
  
	if (response.length > 0) {
	  response.forEach(function (client) {
		const option = document.createElement('div');
		option.textContent = client.name; // Replace 'name' with the correct property from the response
		option.className = 'clientNameOption ms-1';
		option.addEventListener('click', function () {
		  document.getElementById('clientName').value = client.name; // Replace 'name' with the correct property from the response
		  clientNameList.innerHTML = '';
		});
		clientNameList.appendChild(option);
	  });
	} else {
	  // Show a message when no results are found
	  const noResultsMessage = document.createElement('div');
	  noResultsMessage.textContent = 'No results found.';
	  noResultsMessage.className = 'clientNameOption ms-1';
	  clientNameList.appendChild(noResultsMessage);
	}
  }

// ---------------------------------------------------------------