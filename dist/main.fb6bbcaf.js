// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/object-creators/food-creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genereraMat = void 0;

var genereraMat = function genereraMat(c) {
  var foodlist = [];

  for (var i = 0; i < 900; i++) {
    var radius = Math.random() * (2 - 0) + 0;
    var x = Math.random() * (702 - radius) + radius;
    var y = Math.random() * (580 - radius) + radius;
    foodlist.push({
      x: x,
      y: y,
      radius: radius
    });
  }

  return foodlist;
};

exports.genereraMat = genereraMat;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

var _foodCreator = require("./object-creators/food-creator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

// import Controls from "./controls";
// import Sensor from "./sensor";
var canvas = document.querySelector(".plan");
var diagramCanvas = document.querySelector(".diagram");
diagramCanvas.width = 580;
diagramCanvas.height = 200;
canvas.width = 702;
canvas.height = 580;
var c = canvas.getContext("2d");
var dc = diagramCanvas.getContext("2d");
document.querySelector(".cells").textContent = 1;
var foodlist = (0, _foodCreator.genereraMat)(c);

var _move = /*#__PURE__*/new WeakSet();

var _jump = /*#__PURE__*/new WeakSet();

var Cell = /*#__PURE__*/function () {
  function Cell(id, children, x, y, maxSpeed, speed, acceleration, orientation, radius, r, g, b, o, r2, g2, b2, o2, energi, celldelningsProgress, jumpLength, energiUpptagning, delningsEffektivitet) {
    _classCallCheck(this, Cell);

    _classPrivateMethodInitSpec(this, _jump);

    _classPrivateMethodInitSpec(this, _move);

    this.id = id;
    this.children = children;
    this.x = x;
    this.y = y;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.orientation = orientation;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.o = o;
    this.r2 = r2;
    this.g2 = g2;
    this.b2 = b2;
    this.o2 = o2;
    this.color = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(o, ")");
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet; // this.speed = 0;

    this.speed = speed;
    this.dead = false; // this.sensor = new Sensor(this);
    // this.controls = new Controls();
  }

  _createClass(Cell, [{
    key: "draw",
    value: function draw() {
      if (cells.length < 100 && cells.length > 0) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(-this.orientation);
        c.beginPath();
        c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        var grd = c.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        grd.addColorStop(0, "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.o, ")"));
        grd.addColorStop(1, "rgba(".concat(this.r2, ",").concat(this.g2, ",").concat(this.b2, ",").concat(this.o2, ")"));

        if (this.dead) {
          c.strokeStyle = "black";
          c.stroke();
        }

        c.fillStyle = grd;
        c.fill();
        c.beginPath();
        c.fillStyle = "#3df322";
        c.fillRect(-this.radius, +this.radius * 1.5, this.radius * 2 / 1000 * this.celldelningsProgress, 3);
        c.fillStyle = "blue";
        c.fillRect(-this.radius, +this.radius * 1.1, this.radius * 2 / 1000 * this.energi, 3);
        c.restore(); // this.sensor.draw(c);
      } else {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        var _grd = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        _grd.addColorStop(0, "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.o, ")"));

        _grd.addColorStop(1, "rgba(".concat(this.r2, ",").concat(this.g2, ",").concat(this.b2, ",").concat(this.o2, ")"));

        if (this.dead) {
          c.strokeStyle = "black";
          c.stroke();
        }

        c.fillStyle = _grd;
        c.fill();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      _classPrivateMethodGet(this, _move, _move2).call(this); // this.sensor.update(foods);


      _classPrivateMethodGet(this, _jump, _jump2).call(this);

      this.draw();

      if (this.energi >= 0) {
        this.energi -= this.speed / 4 + Math.pow(this.jumpLength, 3) / 3 + Math.pow(this.radius, 2) / 8000 + 0.5;
      }

      if (this.celldelningsProgress >= 0) {
        this.celldelningsProgress -= this.speed / 4 + Math.pow(this.jumpLength, 3) / 3 + Math.pow(this.radius, 3) / 2500 + 0.5;
      }

      for (var food in foods) {
        var _foods$food = foods[food],
            x = _foods$food.x,
            y = _foods$food.y,
            radius = _foods$food.radius;

        if (this.x < x + this.radius && x - this.radius < this.x) {
          if (this.y < y + this.radius && y - this.radius < this.y) {
            if (foods[food].radius >= 0.05) {
              foods[food].radius -= 0.005;
            }

            if (this.energi >= 1000) {
              this.celldelningsProgress += this.delningsEffektivitet * radius * 2;
            } else if (foods[food].radius > 1.1) this.energi += this.energiUpptagning * radius * 4;
          }
        }
      }

      if (this.celldelningsProgress > 1000) {
        this.children++;
        var newID = [].concat(_toConsumableArray(this.id), [this.children]);
        cells.push(new Cell(newID, 0, this.x, this.y, this.maxSpeed * (Math.random() * (1.2 - 0.8) + 0.8), this.speed * (Math.random() * (1.2 - 0.8) + 0.8), this.acceleration * (Math.random() * (1.2 - 0.8) + 0.8), Math.random() * 10 - 0, this.radius * (Math.random() * (1.1 - 0.9) + 0.9), this.r * (Math.random() * (1.2 - 0.8) + 0.8), this.g * (Math.random() * (1.2 - 0.8) + 0.8), this.b * (Math.random() * (1.2 - 0.8) + 0.8), this.o * (Math.random() * (1.2 - 0.8) + 0.8), this.r2 * (Math.random() * (1.2 - 0.8) + 0.8), this.g2 * (Math.random() * (1.2 - 0.8) + 0.8), this.b2 * (Math.random() * (1.2 - 0.8) + 0.8), this.o2 * (Math.random() * (1.2 - 0.8) + 0.8), 500, 0, this.jumpLength * (Math.random() * (1.2 - 0.8) + 0.8), this.energiUpptagning * (Math.random() * (1.2 - 0.8) + 0.8), this.delningsEffektivitet * (Math.random() * (1.2 - 0.8) + 0.8)));
        document.querySelector(".cells").textContent = cells.length;
        this.celldelningsProgress = 0;
        this.energi = 500;
      }

      if (this.energi <= 0) {
        this.dead = true;
        deadCells.push(this);
        var filteredArray = cells.filter(function (cell) {
          return cell.id !== _this.id;
        });
        cells = filteredArray;
        document.querySelector(".cells").textContent = cells.length;
      }
    }
  }]);

  return Cell;
}();

function _move2() {
  if (this.x > 702 - this.radius) {
    this.orientation += 0.1;
  }

  if (this.x < 0 + this.radius) {
    this.orientation += 0.1;
  }

  if (this.y > 580 - this.radius) {
    this.orientation += 0.1;
  }

  if (this.y < 0 + this.radius) {
    this.orientation += 0.1;
  } // if (this.controls.forward) {
  //   this.speed += this.acceleration;
  // }
  // if (this.controls.reverse) {
  //   this.speed -= this.acceleration;
  // }


  if (this.speed > this.maxSpeed) {
    this.speed = this.maxSpeed;
  }

  if (this.speed < -this.maxSpeed / 2) {
    this.speed = -this.maxSpeed / 2;
  } // if (this.speed > 0) {
  //   this.speed -= this.friction;
  // }
  // if (this.speed < 0) {
  //   this.speed += this.friction;
  // }
  // if (Math.abs(this.speed) < this.friction) {
  //   this.speed = 0;
  // }
  // if (this.controls.left) {
  //   this.orientation += 0.03;
  // }
  // if (this.controls.right) {
  //   this.orientation -= 0.03;
  // }


  this.x -= Math.sin(this.orientation) * this.speed;
  this.y -= Math.cos(this.orientation) * this.speed;
}

function _jump2() {
  var jumpY = Math.random();
  var jumpX = Math.random();

  if (jumpX > 0.6666) {
    if (this.x < 702 - this.radius) this.x += this.jumpLength;
  }

  if (jumpX < 0.3334) {
    if (this.x > 0 + this.radius) this.x -= this.jumpLength;
  }

  if (jumpY > 0.6666) {
    if (this.y < 580 - this.radius) this.y += this.jumpLength;
  }

  if (jumpY < 0.3334) {
    if (this.y > 0 + this.radius) this.y -= this.jumpLength;
  }
}

var Food = /*#__PURE__*/function () {
  function Food(x, y, radius, color) {
    _classCallCheck(this, Food);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  } // #createPolygon() {
  //   const points = [];
  //   const rad = Math.hypot(this.radius, this.radius);
  //   const alpha = Math.atan2(this.radius, this.height);
  //   points.push({
  //     x: this.x - Math.sin(-alpha) * rad,
  //     y: this.y - Math.cos(-alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(alpha) * rad,
  //     y: this.y - Math.cos(alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(Math.PI - alpha) * rad,
  //     y: this.y - Math.cos(Math.PI - alpha) * rad,
  //   });
  //   points.push({
  //     x: this.x - Math.sin(Math.PI + alpha) * rad,
  //     y: this.y - Math.cos(Math.PI + alpha) * rad,
  //   });
  //   return points;
  // }


  _createClass(Food, [{
    key: "draw",
    value: function draw() {
      // this.polygon = this.#createPolygon();
      c.beginPath(); // c.moveTo(this.polygon[0].x, this.polygon[0].y);
      // for (let i = 1; i < this.polygon.length; i++) {
      //   c.lineTo(this.polygon[i].x, this.polygon[i].y);
      // }
      // c.fill();

      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    }
  }]);

  return Food;
}();

var cell = new Cell([1], 0, 400, 200, 1, 0.09, 0.1, 0, 10, 100, 100, 100, 0.5, 100, 100, 100, 0.5, 500, 0, 1, 1, 1);
var cells = [cell];
var deadCells = [];
var foods = [];

for (var food in foodlist) {
  var _foodlist$food = foodlist[food],
      x = _foodlist$food.x,
      y = _foodlist$food.y,
      radius = _foodlist$food.radius;
  foods[food] = new Food(x, y, radius, "darkgreen");
}

var cellLength = 1;
var diagramX = 0;
var prevYSize = diagramCanvas.height / 2 + 100 - Math.pow(10, 2);
var prevYFoodRadius = diagramCanvas.height / 2 + 128 - Math.pow(2, 6);
var prevYPopJump = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
var prevYPopEnergyEff = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
var prevYBreedingEff = diagramCanvas.height / 2 + 1 - Math.pow(1, 6);
var prevYSpeed = diagramCanvas.height / 2 - Math.pow(0.09, 6);

function animate() {
  c.clearRect(0, 0, 702, 580);
  var animationID = requestAnimationFrame(animate);
  foods.forEach(function (food) {
    return food.draw();
  });
  cells.forEach(function (cell) {
    return cell.update();
  });
  foods.forEach(function (food) {
    if (food.radius < 1) food.radius += 0.0003;
    if (food.radius < 3) food.radius += 0.00001;
    if (food.radius < 5) food.radius += 0.000001;
    if (food.radius < 7) food.radius += 0.0000001;
    food.radius += 0.00000001;
  });

  if (cellLength !== cells.length) {
    cellLength = cells.length;
    var popRadius = 0;
    var popJump = 0;
    var popEnergiEff = 0;
    var popCelldelningsEff = 0;
    var popSpeed = 0;
    var statsParagraph = "";
    var statsRubriker = "Radius: \xA0Wiggle: \xA0Energy effectivity: \xA0Breeding effectivity: \xA0Speed: \xA0Generation: ";
    achivementsToPrint = "";

    for (Cell in cells) {
      if (cells[Cell].id.length > 9) {
        Achivements.tenGenerations = true;
      }

      if (cells[Cell].id.length > 19) {
        Achivements.twentyGenerations = true;
      }

      if (cells[Cell].id.length > 49) {
        Achivements.fiftyGenerations = true;
      }

      if (cells[Cell].id.length > 79) {
        Achivements.eightyGenerations = true;
      }

      if (cells[Cell].id.length > 99) {
        Achivements.hundredGenerations = true;
      }

      if (cells[Cell].speed > 0.1) {
        Achivements.firstCellWalking = true;
      }

      if (cells[Cell].speed > 0.5) {
        Achivements.firstCellRunning = true;
      }

      if (cells[Cell].speed > 1) {
        Achivements.usainBolt = true;
      }

      if (cells[Cell].radius > 12) {
        Achivements.bigMamaIsHere = true;
      }

      if (cells[Cell].radius > 15) {
        Achivements.hugeMamaIsHere = true;
      }

      if (cells[Cell].children > 4) {
        Achivements.genghisKhan = true;
      }

      if (cells[Cell].jumpLength < 0.1) {
        Achivements.adhdFinnalyCured = true;
      }

      statsParagraph += "\xA0".concat(cells[Cell].radius < 10 ? cells[Cell].radius.toFixed(3) : cells[Cell].radius.toFixed(2), "\xA0\xA0\xA0\xA0\xA0 ").concat(cells[Cell].jumpLength.toFixed(2), "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 ").concat(cells[Cell].energiUpptagning.toFixed(2), "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 ").concat(cells[Cell].delningsEffektivitet.toFixed(2), "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 ").concat(cells[Cell].speed.toFixed(3), "\n    \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0").concat(cells[Cell].id.length, "\xA0\xA0\xA0\xA0\xA0 ");
      popRadius += cells[Cell].radius / cells.length;
      popJump += cells[Cell].jumpLength / cells.length;
      popEnergiEff += cells[Cell].energiUpptagning / cells.length;
      popCelldelningsEff += cells[Cell].delningsEffektivitet / cells.length;

      if (cells[Cell].speed > 0.01) {
        popSpeed += cells[Cell].speed / cells.length;
      }
    }

    var foodRadiusSnitt = 0;

    if (cells.length < 100) {
      foods.forEach(function (food, i) {
        foodRadiusSnitt += foods[i].radius;
      });
    }

    foodRadiusSnitt /= 900;
    dc.beginPath();
    dc.moveTo(diagramX, prevYSize);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 + 100 - Math.pow(popRadius, 2));
    dc.strokeStyle = "red";
    dc.lineWidth = 1;
    dc.stroke();
    prevYSize = diagramCanvas.height / 2 + 100 - Math.pow(popRadius, 2);
    dc.beginPath();
    dc.moveTo(diagramX, prevYFoodRadius);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 + 64 - Math.pow(foodRadiusSnitt, 6));
    dc.strokeStyle = "green";
    dc.lineWidth = 1;
    dc.stroke();
    prevYFoodRadius = diagramCanvas.height / 2 + 64 - Math.pow(foodRadiusSnitt, 6);
    dc.beginPath();
    dc.moveTo(diagramX, prevYPopJump);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 + 1 - Math.pow(popJump, 8));
    dc.strokeStyle = "yellow";
    dc.lineWidth = 1;
    dc.stroke();
    prevYPopJump = diagramCanvas.height / 2 + 1 - Math.pow(popJump, 8);
    dc.beginPath();
    dc.moveTo(diagramX, prevYPopEnergyEff);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 + 1 - Math.pow(popEnergiEff, 8));
    dc.strokeStyle = "blue";
    dc.lineWidth = 1;
    dc.stroke();
    prevYPopEnergyEff = diagramCanvas.height / 2 + 1 - Math.pow(popEnergiEff, 8);
    dc.beginPath();
    dc.moveTo(diagramX, prevYBreedingEff);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 + 1 - Math.pow(popCelldelningsEff, 8));
    dc.strokeStyle = "lightgreen";
    dc.lineWidth = 1;
    dc.stroke();
    prevYBreedingEff = diagramCanvas.height / 2 + 1 - Math.pow(popCelldelningsEff, 8);
    dc.beginPath();
    dc.moveTo(diagramX, prevYSpeed);
    dc.lineTo(diagramX + 1, diagramCanvas.height / 2 - Math.pow(popSpeed, 6));
    dc.strokeStyle = "black";
    dc.lineWidth = 1;
    dc.stroke();
    prevYSpeed = diagramCanvas.height / 2 - Math.pow(popSpeed, 12);
    diagramX += 0.25;
    document.querySelector(".cell-statistik").textContent = statsRubriker + statsParagraph;
    var stats = "Alive: Size: ".concat(popRadius.toFixed(2), " -- Wiggle: ").concat(popJump.toFixed(2), " -- Energy efficiency: ").concat(popEnergiEff.toFixed(2), " -- Breeding efficiency: ").concat(popCelldelningsEff.toFixed(2), " -- Speed: ").concat(popSpeed.toFixed(2));
    document.querySelector(".alive-stats").textContent = stats;
    var deadPopRadius = 0;
    var deadPopJump = 0;
    var deadPopEnergiEff = 0;
    var deadPopCelldelningsEff = 0;
    var deadPopSpeed = 0.0;

    for (Cell in deadCells) {
      deadPopRadius += deadCells[Cell].radius / deadCells.length;
      deadPopJump += deadCells[Cell].jumpLength / deadCells.length;
      deadPopEnergiEff += deadCells[Cell].energiUpptagning / deadCells.length;
      deadPopCelldelningsEff += deadCells[Cell].delningsEffektivitet / deadCells.length;

      if (deadCells[Cell].speed > 0.01) {
        deadPopSpeed += deadCells[Cell].speed / deadCells.length;
      }
    }

    var deadStats = "Dead: Size: ".concat(deadPopRadius.toFixed(2), " -- Wiggle: ").concat(deadPopJump.toFixed(2), " -- Energy efficiency: ").concat(deadPopEnergiEff.toFixed(2), " -- Breeding efficiency: ").concat(deadPopCelldelningsEff.toFixed(2), " -- Speed: ").concat(deadPopSpeed.toFixed(2));
    document.querySelector(".dead-stats").textContent = deadStats; //When fist child have been born

    if (cells.length > 1) {
      Achivements.firstChild = true;
    }

    if (cells.length > 9) {
      Achivements.thisIsAGoodSim = true;
    }

    if (cells.length > 19) {
      Achivements.thisIsAGreateSim = true;
    }

    if (cells.length > 39) {
      Achivements.thisIsAFantasticSim = true;
    }

    if (cells.length > 59) {
      Achivements.thisIsAnAmazingSim = true;
    }

    if (cells.length > 79) {
      Achivements.thisIsAIncredibleSim = true;
    }

    if (cells.length > 99) {
      Achivements.winningRound = true;
    }

    if (cells.length + deadCells.length > 100) {
      Achivements.hundredCells = true;
    }

    if (cells.length + deadCells.length > 500) {
      Achivements.fiveHundredCells = true;
    }

    Object.keys(Achivements).forEach(function (key) {
      return achivementsToPrint += "".concat(key, " ").concat(Achivements[key], " ");
    });
    document.querySelector(".achivements").textContent = achivementsToPrint;

    if (cells.length > 99 || cells.length === 0) {
      canvas.height = 20000; //Start of test

      var allCells = cells.concat(deadCells);
      allCells.sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
      });
      allCells.sort(function (a, b) {
        if (a.id.length < b.id.length) {
          return -1;
        }

        if (a.id.length > b.id.length) {
          return +1;
        }
      });
      var _y = 30;
      var _x = 0;
      var lastCellsGeneration = 0;
      var pappasGenerationsBarn = 1;
      var lastCellsPapi = 1;
      console.log(allCells);

      for (Cell in allCells) {
        var generation = allCells[Cell].id.length;
        allCells[Cell].radius *= 0.5;
        _y = 20 * generation;
        _x += 15;

        if (JSON.stringify(allCells[Cell].id.slice(0, -1)) !== JSON.stringify(lastCellsPapi)) {
          _x += 10;
        }

        if (lastCellsGeneration !== generation) {
          _x = 702 / 2 - 20 * (pappasGenerationsBarn / 2) + 12.5;
          pappasGenerationsBarn = 0;
        }

        lastCellsPapi = allCells[Cell].id.slice(0, -1);
        pappasGenerationsBarn += allCells[Cell].children;
        lastCellsGeneration = generation;
        allCells[Cell].x = _x;
        allCells[Cell].y = _y;
        allCells[Cell].energi = 0;
        allCells[Cell].celldelningsProgress = 0;
        allCells[Cell].draw();
      }

      for (var i = 0; i < allCells[allCells.length - 1].id.length + 1; i++) {
        for (Cell in allCells) {
          if (allCells[Cell].id.length === i) {
            var cellToGetParent = Cell;
            var parentCell = allCells[Cell].id.slice(0, -1);
            console.log(parentCell);

            for (Cell in allCells) {
              if (JSON.stringify(allCells[Cell].id) === JSON.stringify(parentCell)) {
                c.beginPath();
                c.lineWidth = 0.5;
                c.strokeStyle = "black";
                c.moveTo(allCells[Cell].x, allCells[Cell].y + allCells[Cell].radius);
                c.lineTo(allCells[cellToGetParent].x, allCells[cellToGetParent].y - allCells[cellToGetParent].radius);
                c.stroke();
              }
            }
          }
        }
      }

      for (Cell in allCells) {
        allCells[Cell].draw();
      }

      cancelAnimationFrame(animationID);
    }
  }
} //List of achevements


var Achivements = {
  //When fist child have been born
  firstChild: false,
  //When 10 cells on the plane
  thisIsAGoodSim: false,
  //When 20 cells on the plane
  thisIsAGreateSim: false,
  //When 40 cells on the plane
  thisIsAFantasticSim: false,
  //When 60 cells on the plane
  thisIsAnAmazingSim: false,
  //When 80 cells on the plane
  thisIsAIncredibleSim: false,
  //When 100 cells on the plane
  winningRound: false,
  //When 10 generations have been born
  tenGenerations: false,
  //When 20 generations have been born
  twentyGenerations: false,
  //When 50 generations have been born
  fiftyGenerations: false,
  //When 80 generations have been born
  eightyGenerations: false,
  //When 100 generations have been born
  hundredGenerations: false,
  //When a cell is faster than 0.1 speed
  firstCellWalking: false,
  //When a cell is faster than 0.5 speed
  firstCellRunning: false,
  //When a cell is faster than 0.5 speed
  usainBolt: false,
  //When a cell has been born with size >= 12
  bigMamaIsHere: false,
  //When a cell has been born with size >= 15
  hugeMamaIsHere: false,
  //When a cell has had > 5 children
  genghisKhan: false,
  //When a cell wiggle < 0.1
  adhdFinnalyCured: false,
  //When total nr of cells been alive >= 100
  hundredCells: false,
  //When total nr of cells been alive >= 500
  fiveHundredCells: false
};
var achivementsToPrint = "";
Object.keys(Achivements).forEach(function (key) {
  return achivementsToPrint += "".concat(key, " ").concat(Achivements[key], " ");
});
document.querySelector(".achivements").textContent = achivementsToPrint;
document.querySelector(".cell-statistik").textContent = "Radius: \xA0Wiggle: \xA0Energy effectivity: \xA0Breeding effectivity: \xA0Speed: \xA0Generation: \xA010.00\xA0\xA0\xA0\xA0\xA0 1.00\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 1.00\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 1.00\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 0.09\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA01\xA0\xA0\xA0\xA0\xA0";
animate(); //                             1
//   1,1         1,2          1,3        1,4           1,5
//  1,1,1   1,2,1   1,2,2               1,4,1  1,5,1  1,5,2  1,5,3
//1. se till att alla rader är centrerade horrisontelt genom att sätta x till mitten och subtrahera med bredden på halva nästa rad när det är generationsbyte - KLAR
//2. Se till att syskon hamnar närmare varandra än kusiner
//3. Se till att barnen hamnar under sina föräldrar
},{"../scss/main.scss":"scss/main.scss","./object-creators/food-creator":"js/object-creators/food-creator.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50282" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map