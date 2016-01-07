'use strict';

var quadrantData = {
  gen: {
    name: 'Generator',
    id: 1
  },
  con: {
    name: 'Conceptualizer',
    id: 2
  },
  opt: {
    name: 'Optimizer',
    id: 3
  },
  imp: {
    name: 'Implementer',
    id: 4
  }
};

function getQuadrantData (quad, key) {
  return quadrantData[quad][key];
}

function getPersonQuadPlotPoints (person, quadrant) {
  if (quadrant === 'gen') {
    return { y: person.gain.exper, x: person.use.idea };
  } else if (quadrant === 'con') {
    return { y: -person.gain.think, x: person.use.idea };
  } else if (quadrant === 'opt') {
    return { y: -person.gain.think, x: -person.use.eval };
  } else if (quadrant === 'imp') {
    return { y: person.gain.exper, x: -person.use.eval };
  }
}

function median (values) {
  values.sort( function(a, b) {return a - b;} );
  var half = Math.floor(values.length / 2);
  if (values.length % 2) {
    return values[half];
  } else {
    return (values[half - 1] + values[half]) / 2.0;
  }
}

function showChars (char, times) {
  var i, str = '';
  for (i = 0; i < times; i += 1) { str += char; }
  return str;
}

function processProfiles ($scope, data) {

  $scope.team = data['team'];
  $scope.getQuadrantData = getQuadrantData;
  var experSum = 0,
    thinkSum = 0,
    experValues = [],
    thinkValues = [],
    ideaSum = 0,
    evalSum = 0,
    ideaValues = [],
    evalValues = [],
    styleCounts = {
      primary: {
        generators: 0,
        conceptualizers: 0,
        optimizers: 0,
        implementers: 0
      },
      secondary: {
        generators: 0,
        conceptualizers: 0,
        optimizers: 0,
        implementers: 0
      },
      tertiary: {
        generators: 0,
        conceptualizers: 0,
        optimizers: 0,
        implementers: 0
      },
      quaternary: {
        generators: 0,
        conceptualizers: 0,
        optimizers: 0,
        implementers: 0
      }
    };

  _.each(data['team'], function(elem, index, list) {
    // calculate "Using Knowledge" index
    elem['use']['index'] = elem['use']['idea'] - elem['use']['eval'];
    // calculate "Gaining Knowledge" index
    elem['gain']['index'] = elem['gain']['exper'] - elem['gain']['think'];

    // assign total gain points
    elem['gain']['pointsTotal'] = elem['gain']['exper'] + elem['gain']['think'];

    // assign total use points
    elem['use']['pointsTotal'] = elem['use']['idea'] + elem['use']['eval'];

    // sum aggregate experience values and push into array
    experSum += elem['gain']['exper'];
    experValues.push(elem['gain']['exper']);

    // sum aggregate think values and push into array
    thinkSum += elem['gain']['think'];
    thinkValues.push(elem['gain']['think']);

    // sum aggregate ideation values and push into array
    ideaSum += elem['use']['idea'];
    ideaValues.push(elem['use']['idea']);

    // sum aggregate eval values and push into array
    evalSum += elem['use']['eval'];
    evalValues.push(elem['use']['eval']);


    // quadrant stuff
    elem.quadScores = {
      gen: elem.gain.exper * elem.use.idea,
      con: elem.gain.think * elem.use.idea,
      opt: elem.gain.think * elem.use.eval,
      imp: elem.gain.exper * elem.use.eval
    };

    var keysSorted = Object.keys(elem.quadScores).sort(function(a,b){return elem.quadScores[a] - elem.quadScores[b]});
    elem.stylePrefs = keysSorted; // example: [0: "con", 1: "opt", 2: "gen", 3: "imp"] (lowest to highest preference)


    if (elem.stylePrefs[2] === 'gen') {
      styleCounts.secondary.generators += 1;
    } else if (elem.stylePrefs[2] === 'con') {
      styleCounts.secondary.conceptualizers += 1;
    } else if (elem.stylePrefs[2] === 'opt') {
      styleCounts.secondary.optimizers += 1;
    } else if (elem.stylePrefs[2] === 'imp') {
      styleCounts.secondary.implementers += 1;
    }

    if (elem.stylePrefs[1] === 'gen') {
      styleCounts.tertiary.generators += 1;
    } else if (elem.stylePrefs[1] === 'con') {
      styleCounts.tertiary.conceptualizers += 1;
    } else if (elem.stylePrefs[1] === 'opt') {
      styleCounts.tertiary.optimizers += 1;
    } else if (elem.stylePrefs[1] === 'imp') {
      styleCounts.tertiary.implementers += 1;
    }

    if (elem.stylePrefs[0] === 'gen') {
      styleCounts.quaternary.generators += 1;
    } else if (elem.stylePrefs[0] === 'con') {
      styleCounts.quaternary.conceptualizers += 1;
    } else if (elem.stylePrefs[0] === 'opt') {
      styleCounts.quaternary.optimizers += 1;
    } else if (elem.stylePrefs[0] === 'imp') {
      styleCounts.quaternary.implementers += 1;
    }


    // elem.quadTotals = elem.quadScores.generator + elem.quadScores.conceptualizer + elem.quadScores.optimizer + elem.quadScores.implementer;

    // assign quadrant
    if (elem['gain']['index'] > 0 && elem['use']['index'] > 0) {
      elem['quadrantId'] = 1;
      elem['quadrantName'] = 'Generator';
      styleCounts.primary.generators += 1;

    } else if (elem['gain']['index'] < 0 && elem['use']['index'] > 0) {
      elem['quadrantId'] = 2;
      elem['quadrantName'] = 'Conceptualizer';
      styleCounts.primary.conceptualizers += 1;

    } else if (elem['gain']['index'] < 0 && elem['use']['index'] < 0) {
      elem['quadrantId'] = 3;
      elem['quadrantName'] = 'Optimizer';
      styleCounts.primary.optimizers += 1;

    } else if (elem['gain']['index'] > 0 && elem['use']['index'] < 0) {
      elem['quadrantId'] = 4;
      elem['quadrantName'] = 'Implementer';
      styleCounts.primary.implementers += 1;

    } else {
      // unexpected condition
      alert('!!!');
    }


    // quadrant colors
    elem.quadColors = {
      gen: '',
      con: '',
      opt: '',
      imp: ''
    };
    elem.quadColors[elem.stylePrefs[3]] = '#3e64b5';
    elem.quadColors[elem.stylePrefs[2]] = '#9bafd9';
    elem.quadColors[elem.stylePrefs[1]] = '#bac8e5';
    elem.quadColors[elem.stylePrefs[0]] = '#d9e1f1';

  });

  $scope.getPersonQuadPlotPoints = getPersonQuadPlotPoints;

  $scope.profiles.styleCounts = styleCounts;

  $scope.profiles.experAvg = experSum / data['team'].length;
  $scope.profiles.thinkAvg = thinkSum / data['team'].length;

  $scope.profiles.experMedian = median(experValues);
  $scope.profiles.thinkMedian = median(thinkValues);

  $scope.profiles.ideaAvg = ideaSum / data['team'].length;
  $scope.profiles.evalAvg = evalSum / data['team'].length;

  $scope.profiles.ideaMedian = median(ideaValues);
  $scope.profiles.evalMedian = median(evalValues);

  var experMax = _.max(data['team'], function(it){ return it['gain']['exper']; });
  var experMin = _.min(data['team'], function(it){ return it['gain']['exper']; });
  var thinkMax = _.max(data['team'], function(it){ return it['gain']['think']; });
  var thinkMin = _.min(data['team'], function(it){ return it['gain']['think']; });
  var ideaMax = _.max(data['team'], function(it){ return it['use']['idea']; });
  var ideaMin = _.min(data['team'], function(it){ return it['use']['idea']; });
  var evalMax = _.max(data['team'], function(it){ return it['use']['eval']; });
  var evalMin = _.min(data['team'], function(it){ return it['use']['eval']; });
  $scope.profiles.experMax = experMax['gain']['exper'];
  $scope.profiles.experMin = experMin['gain']['exper'];
  $scope.profiles.thinkMax = thinkMax['gain']['think'];
  $scope.profiles.thinkMin = thinkMin['gain']['think'];
  $scope.profiles.ideaMax = ideaMax['use']['idea'];
  $scope.profiles.ideaMin = ideaMin['use']['idea'];
  $scope.profiles.evalMax = evalMax['use']['eval'];
  $scope.profiles.evalMin = evalMin['use']['eval'];

  console.log($scope.profiles);
}

/* Controllers */

angular.module('myApp.controllers', [])
  /*
   * NavMainCtrl
   * inspired by: http://stackoverflow.com/a/18894679/17252
   */
  .controller('NavMainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (paths) {
      // if we get a string instead of an array, turn into array with single string element
      if (_.isString(paths)) { paths = [paths]; }

      var i, len = paths.length;

      for (i = 0; i < len; i += 1) {
        if ($location.path() === paths[i]) {
          return true;
        }
      };
      return false;
    };
  }])
  .controller('rawDataCtrl', ['$scope', '$http', function($scope, $http) {

    // appending date in querystring as cache buster
    $http.get('assets/data/profiles.json?d=' + Date.now()).success(function(data) {
      $scope.profiles = data;
      processProfiles($scope, data);
    });

    $scope.showChars = showChars;

  }])
  .controller('knowledgeGainCtrl', ['$scope', '$http', function($scope, $http) {

    // appending date in querystring as cachebuster
    $http.get('assets/data/profiles.json?d=' + Date.now()).success(function(data) {
      $scope.profiles = data;
      $scope.predicate = 'initials';
      processProfiles($scope, data);
    });

  }])
  .controller('knowledgeUsageCtrl', ['$scope', '$http', function($scope, $http) {

    // appending date in querystring as cachebuster
    $http.get('assets/data/profiles.json?d=' + Date.now()).success(function(data) {
      $scope.profiles = data;
      $scope.predicate = 'initials';
      processProfiles($scope, data);
    });

  }])
  .controller('teamCtrl', ['$scope', '$http', function($scope, $http) {

    // appending date in querystring as cachebuster
    $http.get('assets/data/profiles.json?d=' + Date.now()).success(function(data) {
      $scope.profiles = data;
      processProfiles($scope, data);
    });

  }])
  .controller('allChartsCtrl', ['$scope', '$http', function($scope, $http) {

    // appending date in querystring as cache buster
    $http.get('assets/data/profiles.json?d=' + Date.now()).success(function(data) {
      // $scope.team = data.team;
      $scope.profiles = data;
      processProfiles($scope, data);
      console.log(data.team);

      $scope.mult = 1.9;
      $scope.cellSize = 45;
    });

    // $scope.showChars = showChars;

  }]);
