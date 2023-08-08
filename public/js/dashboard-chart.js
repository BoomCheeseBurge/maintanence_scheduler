// Make the AJAX request using $.ajax
$.ajax({
  url: BASEURL + '/maintenance/getDataForEngineerPerformance', // Replace with the actual URL to fetch data from the server
  type: 'GET',
  dataType: 'json',
  success: function (data) {

    // Process the data and convert it into the format expected by ECharts
    var processedData = processData(data); // Implement this function to map your data to ECharts format

    // Initialize the ECharts instance based on the prepared DOM
    var myChart = echarts.init(document.getElementById('myChart'));

    // Specify the configuration items and data for the chart
    var option = {
      title: {
        text: 'Engineer Late Report',
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: processedData.engineerNames
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Late Report Count',
        type: 'bar',
        data: processedData.lateCounts
      }]
    };

    // Display the chart using the configuration items and data
    myChart.setOption(option);
  },
  error: function (xhr, status, error) {
    console.error('Failed to fetch data.');
  },
});

// Function to process your data and convert it into the format expected by ECharts
function processData(data) {
  // Implement this function according to your data format and ECharts requirements
  // For example, extract labels and values from your JSON data
  var engineerNames = data.map((item) => item.full_name);
  var lateCounts = data.map((item) => item.late_count);

  return {
    engineerNames: engineerNames,
    lateCounts: lateCounts,
  };
}

//----------------------------------------------------------------

// Function to initialize the chart with yearly view data
function initializeYearlyViewChart() {
  // Make an AJAX request to fetch the yearly view data
  $.ajax({
    url: BASEURL + '/maintenance/getDataForEngineerPerformance',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        // Process the data and convert it into the format expected by ECharts
        var processedData = processData(data); // Implement this function to map your data to ECharts format

        // Initialize the ECharts instance based on the prepared DOM
        var lateReportChart = echarts.init(document.getElementById('lateReportChart'));

        // Specify the configuration items and data for the chart
        var option = {
          title: {
            text: 'Yearly Engineer Late Report',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: processedData.engineerNames
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'Late Report Count',
            type: 'bar',
            data: processedData.lateCounts
          }]
        };

        // Display the chart using the configuration items and data
        lateReportChart.setOption(option);

        // Disable the yearly view button after chart initialization
        $('#yearlyViewBtn').prop('disabled', true);
        // Enable the monthly view button after chart initialization
        $('#monthlyViewBtn').prop('disabled', false);
    },
    error: function (xhr, status, error) {
      console.error('Failed to fetch yearly view data.');
    },
  });
}

// Function to initialize the chart with monthly view data
function initializeMonthlyViewChart() {
  // Make an AJAX request to fetch the monthly view data
  $.ajax({
    url: BASEURL + '/maintenance/getDataForEngineerPerformance',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        // Process the data and convert it into the format expected by ECharts
        var processedData = processData(data); // Implement this function to map your data to ECharts format

        // Initialize the ECharts instance based on the prepared DOM
        var lateReportChart = echarts.init(document.getElementById('lateReportChart'));

        // Specify the configuration items and data for the chart
        var option = {
          title: {
            text: 'Monthly Engineer Late Report',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: processedData.engineerNames
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'Late Report Count',
            type: 'bar',
            data: processedData.lateCounts
          }]
        };

        // Display the chart using the configuration items and data
        lateReportChart.setOption(option);

        // Disable the monthly view button after chart initialization
        $('#monthlyViewBtn').prop('disabled', true);
        // Enable the yearly view button after chart initialization
        $('#yearlyViewBtn').prop('disabled', false);
    },
    error: function (xhr, status, error) {
      console.error('Failed to fetch monthly view data.');
    },
  });
}

$(document).ready(function () {
  // On page load, initialize the chart with yearly view data
  initializeYearlyViewChart();

  // Attach click event to the monthly view button to switch the chart view
  $('#monthlyViewBtn').on('click', function () {
    initializeMonthlyViewChart();
  });

  // Attach click event to the yearly view button to switch the chart view
  $('#yearlyViewBtn').on('click', function () {
    initializeYearlyViewChart();
  });
});
