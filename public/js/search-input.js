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
	  url: 'http://localhost/taskscheduler/public/client/searchAssignee',
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
		option.textContent = assignee.nama; // Replace 'name' with the correct property from the response
		option.className = 'assigneeOption';
		option.addEventListener('click', function () {
		  document.getElementById('assignee').value = assignee.nama; // Replace 'name' with the correct property from the response
		  assigneeList.innerHTML = '';
		});
		assigneeList.appendChild(option);
	  });
	} else {
	  // Show a message when no results are found
	  const noResultsMessage = document.createElement('div');
	  noResultsMessage.textContent = 'No results found.';
	  noResultsMessage.className = 'assigneeOption';
	  assigneeList.appendChild(noResultsMessage);
	}
  }

// ---------------------------------------------------------------

// Search Input for Engineer
document.getElementById('companyName').addEventListener('input', function () {
	const searchQuery = this.value.trim();
  
	// If the search query is empty, hide the company list and return
	if (searchQuery === '') {
	  document.getElementById('companyNameList').innerHTML = '';
	  return;
	}
  
	// Make an AJAX request to fetch the company names based on the search query
	$.ajax({
	  url: 'http://localhost/taskscheduler/public/client/searchClientName',
	  type: 'GET',
	  dataType: 'json',
	  data: { keyword: searchQuery }, // Pass the search query as data
	  success: function (response) {
		displayCompanyName(response);
	  },
	  error: function (xhr, status, error) {
		console.error('Failed to fetch company names.');
	  },
	});
  });
  
  function displayCompanyName(response) {
	const companyNameList = document.getElementById('companyNameList');
	companyNameList.innerHTML = '';
  
	if (response.length > 0) {
	  response.forEach(function (company) {
		const option = document.createElement('div');
		option.textContent = company.nama; // Replace 'name' with the correct property from the response
		option.className = 'companyNameOption';
		option.addEventListener('click', function () {
		  document.getElementById('companyName').value = company.nama; // Replace 'name' with the correct property from the response
		  companyNameList.innerHTML = '';
		});
		companyNameList.appendChild(option);
	  });
	} else {
	  // Show a message when no results are found
	  const noResultsMessage = document.createElement('div');
	  noResultsMessage.textContent = 'No results found.';
	  noResultsMessage.className = 'companyNameOption';
	  companyNameList.appendChild(noResultsMessage);
	}
  }

// ---------------------------------------------------------------