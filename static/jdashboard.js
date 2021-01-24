/* globals Chart:false, feather:false */


/* API Calls */
var userdata, currentInvestment, fundPreference;

function refreshData(){
  fetch('/api/userdata/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    userdata = data[0];
    currentInvestment = userdata['current_investment']
    fundPreference = userdata['fund_preference']
    console.debug('Success:', userdata);
  })
  .then(updatePIH)
  .catch((error) => {
    console.error('Error:', error);
  });
};

var time, static, value;

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

var predictedSalary, netExpendable;

function getPredictedSalary(){
  fetch('/api/predict-salary/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    predictedSalary = data['predicted_salary'];
    netExpendable = data['net_expendable'];
    console.debug('Success:', data);
  })
  .then()
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

var entries = [("Kids", 10),("House", 20)]
var i = 0

// HTMl defined type
function dynamicCheckTag(set, self) {
  document.getElementById(set).textContent = self;
}

function InitialiseCheckpoints(){
  var addButton = document.getElementById("add_activity");
  var tracklistTable = document.getElementById("tracklist");

  entries.forEach(checkpoint => {
    console.log(checkpoint);
    tracklistTable.innerHTML += 
    " \
    <div class='input-group mb-3'> \
        <span class='input-group-text'>$</span> \
        <input id='id" + i + "' value='2020' type='text' class='form-control' aria-label='Text input with dropdown button' placeholder='2020'> \
        <button id='bindtext" + i + "' class='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>Kids</button> \
        <ul class='dropdown-menu dropdown-menu-dark dropdown-menu-end'> \
            <li><a id='Kids" + i + "' class='dropdown-item' onclick='dynamicCheckTag(bindtext" + i +",'Kids' )>Kids</a></li> \
            <li><a id='House" + i + "' class='dropdown-item' onclick='dynamicCheckTag(bindtext" + i +",'House' )>House</a></li> \
            <li><a id='Other" + i + "' class='dropdown-item' onclick='dynamicCheckTag(bindtext" + i +",'Other' )>Other</a></li> \
        </ul> \
        </ul> \
    </div>"
    i++;
  });


  // Attach handler to the button click event
  addButton.onclick = function() {
    // Add a new row to the table using the correct activityNumber
    tracklistTable.innerHTML += 
    " \
    <div class='input-group mb-3'> \
        <span class='input-group-text'>$</span> \
        <input id='id" + i + "' type='text' class='form-control' aria-label='Text input with dropdown button' placeholder='2020'> \
        <button id='bindtext" + i + "' class='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>Pick</button> \
        <ul class='dropdown-menu dropdown-menu-dark dropdown-menu-end'> \
            <li><a id='Kids" + i + "' class='dropdown-item'>Kids</a></li> \
            <li><a id='House" + i + "' class='dropdown-item'>House</a></li> \
            <li><a id='other" + i + "' class='dropdown-item'>Other</a></li> \
        </ul> \
        </ul> \
    </div>"
    i++;
  }
};

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

  // Initialise checkpoints
  //~~~~
  InitialiseCheckpoints();
  // Select the add_activity button
};

