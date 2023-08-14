// Search Input to Filter Contract
document.getElementById('filterClientName').addEventListener('input', function () {
	const searchQuery = this.value.trim();
  
	// If the search query is empty, hide the client list and return
	if (searchQuery === '') {
	  document.getElementById('filterClientList').innerHTML = '';
	  return;
	}
  
	// Make an AJAX request to fetch the client names based on the search query
	$.ajax({
	  url: BASEURL + '/client/searchClientName',
	  type: 'GET',
	  dataType: 'json',
	  data: { keyword: searchQuery }, // Pass the search query as data
	  success: function (response) {
		displayFilteredClientName(response);
	  },
	  error: function (xhr, status, error) {
		console.error('Failed to fetch client names.');
	  },
	});
  });

  function displayFilteredClientName(response) {
	const clientNameList = document.getElementById('filterClientList');
	clientNameList.innerHTML = '';
  
	if (response.length > 0) {
	  response.forEach(function (client) {
		const option = document.createElement('div');
		option.textContent = client.name; // Replace 'name' with the correct property from the response
		option.className = 'clientNameOption ms-1';
		option.addEventListener('click', function () {
		  document.getElementById('filterClientName').value = client.name; // Replace 'name' with the correct property from the response
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