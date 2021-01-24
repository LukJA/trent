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
  .then(updatePSNE)
  .then(updateASSETS)
  .catch((error) => {
    console.error('Error:', error);
  });
};

var time, static, value, lower, upper;

function getPredictedValue(){
  fetch('/api/predict-value/', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    time = data['time'];
    static = data['static'];
    value = data['value'];
    lower = data['lower'];
    upper = data['upper'];
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

// Predicted investment holdings
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
        },
        scaleLabel: {
          display: true,
          labelString: '$'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Years from now'
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
    labels: ["VFIFX","VMMSX","VSCGX","VASGX","VMIGX"]
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

var color = Chart.helpers.color;

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
    var newupper = {
        data: upper,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: color(window.chartColors.blue).alpha(0.1).rgbString(),
        borderWidth: 0,
        pointRadius: 0,
      }
    var newlower = {
        data: lower,
        lineTension: 0,
        backgroundColor: color(window.chartColors.blue).alpha(0.1).rgbString(),
        borderColor: color(window.chartColors.blue).alpha(0.1).rgbString(),
        borderWidth: 0,
        fill: 2,
        pointRadius: 0,
      }
    var newlabels = {
      labels: time.map(String)
    }
    window.chartPIH.data.datasets.pop();
    window.chartPIH.data.datasets.pop();
    window.chartPIH.data.datasets.push(newstat);
    window.chartPIH.data.datasets.push(newval);
    window.chartPIH.data.datasets.push(newupper);
    window.chartPIH.data.datasets.push(newlower);
    while(window.chartPIH.data.labels.length > 0) window.chartPIH.data.labels.pop()
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


function updateASSETS(){
  if (window.chartASSETS){

    var total = 0;
    var proportion = [];
    currentInvestment.forEach(ment => {
      total += ment[0]
    });
    currentInvestment.forEach(ment => {
      proportion.push(ment[0]/total);
    });
    console.log("Current investement:", currentInvestment);
    console.log("New Proportions:", proportion);
    var newstat = {
        data: proportion,
        backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
        ],
        label: 'Dataset 1'
        }

    var newlabels = {
      labels: time.map(String)
    }
    window.chartASSETS.data.datasets.pop();
    window.chartASSETS.data.datasets.push(newstat);

    console.log("New Chart Data: ", window.chartASSETS.data)
    window.chartASSETS.update();
    console.debug("Updating Chart");
    document.getElementById('spinner').style.display = 'none';
  }
  else{
    console.debug("No Chart yet");
  }
}

var slider = document.getElementById("customRange20");
var output = document.getElementById("ranget");
output.innerHTML = slider.value;

slider.onmouseup = function() {
  output.innerHTML = this.value;
  updatePSNE(this.value);
}


function updatePSNE(t=10){
  var t0 = 2020;
  var n = t;
  tn = t0 + n;
  var labelsvv = [];
  var salary = [];
  var i;

  // Generate Labels
  for (i = 0; i < n; i++) {
    labelsvv.push(i+t0);
  }

  var a,b,c,d,e;

  if (userdata.job == "Tech"){
    a = 1.722;
    b = -164.483;
    c = 5102.335;
    d = 30544.535;
    e = 30000;
  }
  if (userdata.job== "Finance"){
    a = -42.170;
    b = 2003.89;
    c = -5752.958;
    d = 66581.237;
    e = 55000;
  }
  else
  {
    a = 2.044;
    b = -137.947;
    c = 3399.435;
    d = 22896;
    e = 24000;
  }
  var j;
  // Generate sal
  for (j = 0; j < n; j++) {
    var x = (a*j**3 +b*j**2 + c*j + d) * (userdata.salary/e);
    salary.push(x);
  }

  
  var newdat = {
    data: salary,
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: '#eb4034',
    borderWidth: 2,
    pointBackgroundColor: '#eb4034'
  }


  window.chartPSNE.data.datasets.pop();
  window.chartPSNE.data.datasets.push(newdat);
  while(window.chartPSNE.data.labels.length > 0) window.chartPSNE.data.labels.pop()
  for(i=0;i<labelsvv.map(String).length;i++)
  {
    window.chartPSNE.data.labels.push(labelsvv.map(String)[i]);
  }
  console.log("New Chart Data: ", window.chartPIH.data)
  window.chartPSNE.update();
  console.debug("Updating Chart");
  document.getElementById('spinner').style.display = 'none';
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
// var refreshButton = document.getElementById("refreshButton");
// refreshButton.addEventListener("click", function(){
//   getPredictedValue();
// });

// Assets Distro



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
  refreshData();

  // Initialise checkpoints
  //~~~~
  InitialiseCheckpoints();
  // Select the add_activity button
};

