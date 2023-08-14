// Search Input to Edit Client
document.getElementById('searchClientName').addEventListener('input', function () {
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
		  document.getElementById('searchClientName').value = client.name; // Replace 'name' with the correct property from the response
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

// Search Input to Delete Client
document.getElementById('delClientName').addEventListener('input', function () {
	const searchQuery = this.value.trim();
  
	// If the search query is empty, hide the client list and return
	if (searchQuery === '') {
	  document.getElementById('delClientNameList').innerHTML = '';
	  return;
	}
  
	// Make an AJAX request to fetch the client names based on the search query
	$.ajax({
	  url: BASEURL + '/client/searchClientName',
	  type: 'GET',
	  dataType: 'json',
	  data: { keyword: searchQuery }, // Pass the search query as data
	  success: function (response) {
		displayDelClientName(response);
	  },
	  error: function (xhr, status, error) {
		console.error('Failed to fetch client names.');
	  },
	});
  });

  function displayDelClientName(response) {
	const clientNameList = document.getElementById('delClientNameList');
	clientNameList.innerHTML = '';
  
	if (response.length > 0) {
	  response.forEach(function (client) {
		const option = document.createElement('div');
		option.textContent = client.name; // Replace 'name' with the correct property from the response
		option.className = 'clientNameOption ms-1';
		option.addEventListener('click', function () {
		  document.getElementById('delClientName').value = client.name; // Replace 'name' with the correct property from the response
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