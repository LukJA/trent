/* globals Chart:false, feather:false */

// gloabdefaults
var investD = {
  VFIFX: 10,
  VMMSX: 10,
  VSCGX: 10,
  VASGX: 10,
  VWIGX: 10
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

var config = {
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
      text: 'Investment Distribution'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('FundProportion-area').getContext('2d');
  window.myDoughnut = new Chart(ctx, config);
};

//  VFIFX
document.getElementById('g1plus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VFIFX'] = cons(investD['VFIFX'] + 1, 0 , 20);
  dataset.data[0] = investD['VFIFX'];
  window.myDoughnut.update();
});
document.getElementById('g1minus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VFIFX'] = cons(investD['VFIFX'] - 1, 0 , 20);
  dataset.data[0] = investD['VFIFX'];
  window.myDoughnut.update();
});

//  VMMSX
document.getElementById('g2plus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VMMSX'] = cons(investD['VMMSX'] + 1, 0 , 20);
  dataset.data[1] = investD['VMMSX'];
  window.myDoughnut.update();
});
document.getElementById('g2minus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VMMSX'] = cons(investD['VMMSX'] - 1, 0 , 20);
  dataset.data[1] = investD['VMMSX'];
  window.myDoughnut.update();
});

//  VSCGX
document.getElementById('g3plus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VSCGX'] = cons(investD['VSCGX'] + 1, 0 , 20);
  dataset.data[2] = investD['VSCGX'];
  window.myDoughnut.update();
});
document.getElementById('g3minus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VSCGX'] = cons(investD['VSCGX'] - 1, 0 , 20);
  dataset.data[2] = investD['VSCGX'];
  window.myDoughnut.update();
});

//  VASGX
document.getElementById('g4plus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VASGX'] = cons(investD['VASGX'] + 1, 0 , 20);
  dataset.data[3] = investD['VASGX'];
  window.myDoughnut.update();
});
document.getElementById('g4minus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VASGX'] = cons(investD['VASGX'] - 1, 0 , 20);
  dataset.data[3] = investD['VASGX'];
  window.myDoughnut.update();
});

//  VWIGX
document.getElementById('g5plus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VWIGX'] = cons(investD['VWIGX'] + 1, 0 , 20);
  dataset.data[4] = investD['VWIGX'];
  window.myDoughnut.update();
});
document.getElementById('g5minus').addEventListener('click', function() {
  var dataset = config.data.datasets[0];
  investD['VWIGX'] = cons(investD['VWIGX'] - 1, 0 , 20);
  dataset.data[4] = investD['VWIGX'];
  window.myDoughnut.update();
});


/*

document.getElementById('randomizeData').addEventListener('click', function() {
  config.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
      return randomScalingFactor();
    });
  });

  window.myDoughnut.update();
});

*/

/*
var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
  var newDataset = {
    backgroundColor: [],
    data: [],
    label: 'New dataset ' + config.data.datasets.length,
  };

  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());

    var colorName = colorNames[index % colorNames.length];
    var newColor = window.chartColors[colorName];
    newDataset.backgroundColor.push(newColor);
  }

  config.data.datasets.push(newDataset);
  window.myDoughnut.update();
});

document.getElementById('addData').addEventListener('click', function() {
  if (config.data.datasets.length > 0) {
    config.data.labels.push('data #' + config.data.labels.length);

    var colorName = colorNames[config.data.datasets[0].data.length % colorNames.length];
    var newColor = window.chartColors[colorName];

    config.data.datasets.forEach(function(dataset) {
      dataset.data.push(randomScalingFactor());
      dataset.backgroundColor.push(newColor);
    });

    window.myDoughnut.update();
  }
});

document.getElementById('removeDataset').addEventListener('click', function() {
  config.data.datasets.splice(0, 1);
  window.myDoughnut.update();
});

document.getElementById('removeData').addEventListener('click', function() {
  config.data.labels.splice(-1, 1); // remove the label first

  config.data.datasets.forEach(function(dataset) {
    dataset.data.pop();
    dataset.backgroundColor.pop();
  });

  window.myDoughnut.update();
});

document.getElementById('changeCircleSize').addEventListener('click', function() {
  if (window.myDoughnut.options.circumference === Math.PI) {
    window.myDoughnut.options.circumference = 2 * Math.PI;
    window.myDoughnut.options.rotation = -Math.PI / 2;
  } else {
    window.myDoughnut.options.circumference = Math.PI;
    window.myDoughnut.options.rotation = -Math.PI;
  }

  window.myDoughnut.update();
});

*/