/* globals Chart:false, feather:false */


/* API Calls */
var userdata;

function refreshData(){

  fetch('/api/userdata/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    userdata = data[0];
    console.debug('Success:', userdata);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

};


// query type
var refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", function(){
  refreshData();
  console.debug("Pressed Refresh");
});

// HTMl defined type
function testButtonFunc() {
    document.getElementById("UI1").innerHTML = Date();
}


var configPIH = {
  type: 'line',
  data: {
    labels: ["Monday", "Tuesday", "wednesday"],
    datasets: [{
      data: [15339,21345,23489],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted Investment Holdings',
      fontSize: 20
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
};

var configPSNE = {
  type: 'line',
  data: {
    labels: ["Monday", "Tuesday", "wednesday"],
    datasets: [{
      data: [15339,21345,23489],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted Salary and Net Expendable',
      fontSize: 20
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
};

var configASSETS = {
  type: 'pie',
  data: {
    datasets: [{
      data: [1,2,3,4,5],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue'
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Assets Distribution',
      fontSize: 20
    },
    responsive: true
  }
};

window.onload = function(){
  var ctx = document.getElementById('PIH-canvas')
  var cPIH = new Chart(ctx, configPIH);

  var ctx = document.getElementById('PSNE-canvas')
  var cPIH = new Chart(ctx, configPSNE);

  var ctx = document.getElementById('ASSETS-canvas')
  var cPIH = new Chart(ctx, configASSETS);

  // Updatable loading spinner
  setTimeout(function(){
    document.getElementById('spinner').style.display = 'none';
  }, 500); 
};