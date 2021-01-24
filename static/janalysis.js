/* globals Chart:false, feather:false */

// gloabdefaults
var investD = {
  VFIFX: 10,
  VMMSX: 10,
  VSCGX: 10,
  VASGX: 10,
  VWIGX: 10
};

var careerIndustry = "";
var currentSalary = 20000;
var t0 = 2020;
var n = 10;

var cleanLabels =[];
var cleanSalary =[];


tn = t0 + n;
var i;
// Generate Labels
for (i = t0; i < tn; i++) {
  cleanLabels.push(String(i));
  cleanSalary.push(i*2 + currentSalary)
}



function cons(num, min, max){
  const MIN = min || 1;
  const MAX = max || 20;
  const parsed = parseInt(num)
  return Math.min(Math.max(parsed, MIN), MAX)
}

// Investments

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var configFund = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [
        investD['VFIFX'],
        investD['VMMSX'],
        investD['VSCGX'],
        investD['VASGX'],
        investD['VWIGX'],

      ],
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
      'VFIFX',
      'VMMSX',
      'VSCGX',
      'VASGX',
      'VWIGX'
    ]
  },
  options: {
    circumference: Math.PI,
    rotation: -Math.PI,
    responsive: true,
    legend: {
     position: 'top',
    },
    title: {
      display: true,
      text: 'Investment Distribution',
      fontSize: 30,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};



//  VFIFX
document.getElementById('g1plus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VFIFX'] = cons(investD['VFIFX'] + 1, 0 , 20);
  dataset.data[0] = investD['VFIFX'];
  window.myDoughnut.update();
});
document.getElementById('g1minus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VFIFX'] = cons(investD['VFIFX'] - 1, 0 , 20);
  dataset.data[0] = investD['VFIFX'];
  window.myDoughnut.update();
});

//  VMMSX
document.getElementById('g2plus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VMMSX'] = cons(investD['VMMSX'] + 1, 0 , 20);
  dataset.data[1] = investD['VMMSX'];
  window.myDoughnut.update();
});
document.getElementById('g2minus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VMMSX'] = cons(investD['VMMSX'] - 1, 0 , 20);
  dataset.data[1] = investD['VMMSX'];
  window.myDoughnut.update();
});

//  VSCGX
document.getElementById('g3plus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VSCGX'] = cons(investD['VSCGX'] + 1, 0 , 20);
  dataset.data[2] = investD['VSCGX'];
  window.myDoughnut.update();
});
document.getElementById('g3minus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VSCGX'] = cons(investD['VSCGX'] - 1, 0 , 20);
  dataset.data[2] = investD['VSCGX'];
  window.myDoughnut.update();
});

//  VASGX
document.getElementById('g4plus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VASGX'] = cons(investD['VASGX'] + 1, 0 , 20);
  dataset.data[3] = investD['VASGX'];
  window.myDoughnut.update();
});
document.getElementById('g4minus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VASGX'] = cons(investD['VASGX'] - 1, 0 , 20);
  dataset.data[3] = investD['VASGX'];
  window.myDoughnut.update();
});

//  VWIGX
document.getElementById('g5plus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VWIGX'] = cons(investD['VWIGX'] + 1, 0 , 20);
  dataset.data[4] = investD['VWIGX'];
  window.myDoughnut.update();
});
document.getElementById('g5minus').addEventListener('click', function() {
  var dataset = configFund.data.datasets[0];
  investD['VWIGX'] = cons(investD['VWIGX'] - 1, 0 , 20);
  dataset.data[4] = investD['VWIGX'];
  window.myDoughnut.update();
});

var color = Chart.helpers.color;

var configSal = {
  type: 'line',
  data: {
    labels: cleanLabels,
    datasets: [{
      data: cleanSalary,
      backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
      borderColor: window.chartColors.red,
      type: 'line',
      fill: true,
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Salary Progression',
      fontSize: 30
    },
    tooltips: {
      enabled: false,
      mode: 'index',
      intersect: false,
    },
    hover: {
      //enabled: false,
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'GNI'
        },
        ticks: {
          min: 0
        }
      }]
    }
  }
};


// Industry select
document.getElementById('tech').addEventListener('click', function() {
  careerIndustry = "Tech";
  document.getElementById('bindtext').textContent = "Tech";
  updateSalary();
});
document.getElementById('finance').addEventListener('click', function() {
  careerIndustry = "Finance";
  document.getElementById('bindtext').textContent = "Finance";

  updateSalary();
});
document.getElementById('other').addEventListener('click', function() {
  careerIndustry = "Other";
  document.getElementById('bindtext').textContent = "Other";
  updateSalary();
});
document.getElementById('salaryBox').addEventListener('focusout', function() {
  currentSalary =  parseInt(document.getElementById('salaryBox').value);
  console.log(document.getElementById('salaryBox').value);
  updatePSNE();
});


function updateSalary(){
  tn = t0 + n;
  var labels = [];
  var i;

  // Generate Labels
  for (i = t0; i < tn; i++) {
    labels.push(String(i));
  }

  var a,b,c,d,e;

  if (careerIndustry == "Tech"){
    a = 1.722;
    b = -164.483;
    c = 5102.335;
    d = 30544.535;
    e = 30000;
  }
  if (careerIndustry == "Finance"){
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

  var salary = [currentSalary];
  var j;
  // Generate sal
  for (j = 0; j < n; j++) {
    var x = (a*j**3 +b*j**2 + c*j + d) * (currentSalary/e);
    salary.push(x);
  }


/*
  var dataset = configSal.data.datasets[0];
  dataset.label = labels;
  dataset.data = salary;
  //dataset.label = ["A","B","C"];
  //dataset.data = [1,2,3];
  window.myLine.update();*/
  
  var newval = {
    data: salary,
    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
    borderColor: window.chartColors.red,
    type: 'line',
    fill: true,
  }
  var newlabels = {
    labels: labels
  }

  window.myLine.data.datasets.pop();
  window.myLine.data.datasets.push(newval);
  while(window.myLine.data.labels.length > 0) window.myLine.data.labels.pop()
  //window.chartPIH.data.labels.push(newlabels); DOESNT FUCKING WORK
  // But this works
  for(i=0;i<labels.length;i++)
  {
    window.myLine.data.labels.push(labels[i]);
  }
  console.log("New Chart Data: ", window.myLine.data)
  window.myLine.update();
  console.debug("Updating Chart");
  document.getElementById('spinner').style.display = 'none';
    
  console.log(labels, salary);
}


// OnLoad

window.onload = function(){
  var ctx = document.getElementById('SalaryProp-area').getContext('2d');
  window.myLine = new Chart(ctx, configSal);

  var ctx = document.getElementById('FundProportion-area').getContext('2d');
  window.myDoughnut = new Chart(ctx, configFund);

  //updateSalary();

  // Updatable loading spinner
  setTimeout(function(){
    document.getElementById('spinner').style.display = 'none';
  }, 500); 
};
