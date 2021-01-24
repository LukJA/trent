/* globals Chart:false, feather:false */


/* API Calls */
var userdata;
var time;
var static;
var value;

function refreshData(){
  fetch('/api/userdata/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    userdata = data[0];
    console.debug('Success:', userdata);
  })
  .then(updatePIH)
  .catch((error) => {
    console.error('Error:', error);
  });
};

function getPredictedValue(){
  fetch('/api/predict-value/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    time = data['time'];
    static = data['static'];
    value = data['value'];
    console.debug('Success:', data);
  })
  .then(updatePIH)
  .catch((error) => {
    console.error('Error:', error);
  });
}


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
    labels: ["Monday", "Tuesday", "wednesday","A","B", ""],
    datasets: [{
      data: [1,1,1,1,1,1],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#007bff',
      borderWidth: 4,
      pointBackgroundColor: '#007bff'
    }, {
      data: [1,1,1,1,1,1],
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


function updatePIH(){
  if (window.chartPIH){
    var newstat = {
        data: static,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#eb4034',
        borderWidth: 2,
        pointBackgroundColor: '#eb4034'
        }
    var newval = {
        data: value,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#3489eb',
        borderWidth: 2,
        pointBackgroundColor: '#3489eb'
      }
    var newlabels = {
      labels: time.map(String)
    }
    window.chartPIH.data.datasets.pop();
    window.chartPIH.data.datasets.pop();
    window.chartPIH.data.datasets.push(newstat);
    window.chartPIH.data.datasets.push(newval);
    while(window.chartPIH.data.labels.length > 0) window.chartPIH.data.labels.pop()
    //window.chartPIH.data.labels.push(newlabels); DOESNT FUCKING WORK
    // But this works
    for(i=0;i<time.map(String).length;i++)
    {
      window.chartPIH.data.labels.push(time.map(String)[i]);
    }
    console.log("New Chart Data: ", window.chartPIH.data)
    window.chartPIH.update();
    console.debug("Updating Chart");
    document.getElementById('spinner').style.display = 'none';
  }
  else{
    console.debug("No Chart yet");
  }
}

// query type
var refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", function(){
  getPredictedValue();
});

window.onload = function(){
  // replace dummy data in charts
    
  document.getElementById('spinner').style.display = 'none';
  
  var ctx = document.getElementById('PIH-canvas')
  console.log(configPIH);
  window.chartPIH = new Chart(ctx, configPIH);

  var ctx = document.getElementById('PSNE-canvas')
  window.chartPSNE= new Chart(ctx, configPSNE);

  var ctx = document.getElementById('ASSETS-canvas')
  window.chartASSETS = new Chart(ctx, configASSETS);

  // Get new data
  getPredictedValue();
};

