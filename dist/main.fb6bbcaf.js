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
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/object-creators/cell-creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genereraDinCell = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var genereraDinCell = function genereraDinCell(c, minCell, foodlist, nrOfChildrenCells) {
  var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Math.random() * (window.innerWidth - 10 - minCell.diameter) + minCell.diameter;
  var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Math.random() * (window.innerHeight - 10 - minCell.diameter) + minCell.diameter;

  var Cell = /*#__PURE__*/function () {
    function Cell(x, y, radius, color, energi, celldelningsProgress, hastighet, jumpLength) {
      _classCallCheck(this, Cell);

      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.energi = energi;
      this.celldelningsProgress = celldelningsProgress;
      this.hastighet = hastighet;
      this.jumpLength = jumpLength;
    }

    _createClass(Cell, [{
      key: "draw",
      value: function draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.beginPath();
        c.fillStyle = "#3df322";
        c.fillRect(this.x - this.radius, this.y + this.radius * 1.5, this.radius * 2 / 1000 * this.celldelningsProgress, 3);
        c.stroke();
        c.fillStyle = "#aaf322";
        c.fillRect(this.x - this.radius, this.y + this.radius * 1.1, this.radius * 2 / 1000 * this.energi, 3);
      }
    }, {
      key: "update",
      value: function update() {
        this.jump();
        this.draw();

        if (this.energi >= 0) {
          this.energi -= 1;
        }

        if (this.celldelningsProgress >= 0) {
          this.celldelningsProgress -= 0.2;
        }
      }
    }, {
      key: "jump",
      value: function jump() {
        var jumpY = Math.random();
        var jumpX = Math.random();

        if (jumpX > 0.6666) {
          if (this.x < window.innerWidth - this.radius) this.x += this.jumpLength;
        }

        if (jumpX < 0.3334) {
          if (this.x > 0 + this.radius) this.x -= this.jumpLength;
        }

        if (jumpY > 0.6666) {
          if (this.y < window.innerHeight - this.radius) this.y += this.jumpLength;
        }

        if (jumpY < 0.3334) {
          if (this.y > 0 + this.radius) this.y -= this.jumpLength;
        }
      }
    }]);

    return Cell;
  }();

  var Food = /*#__PURE__*/function () {
    function Food(x, y, radius, color) {
      _classCallCheck(this, Food);

      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }

    _createClass(Food, [{
      key: "draw",
      value: function draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      }
    }]);

    return Food;
  }();

  var food = new Food(30, 10, 10, "lightgreen");
  var cell = new Cell(10, 30, 10, "#000000", 1000, 1000, 1, 1);
  var cells = [cell];
  var diameter = minCell.diameter,
      hastighet = minCell.hastighet,
      energi = minCell.energi,
      matTillCelldelning = minCell.matTillCelldelning;
  c.beginPath();
  c.arc(x - diameter / 2, y - diameter / 2, diameter / 2, 0, Math.PI * 2, false);
  c.strokeStyle = "#000";
  c.stroke();
  c.fillRect(x, y, 100, 10);
  var animateX = x;
  var animateY = y;
  var rundansEnergi = energi;
  var rundansMatTillCelldelning = matTillCelldelning;

  function animateFood() {
    requestAnimationFrame(animateFood);
    cells.forEach(function (cell) {
      return cell.update();
    });
    food.draw();

    if (rundansEnergi >= 0) {
      rundansEnergi -= 1;
    }

    if (rundansMatTillCelldelning >= 0) {
      rundansMatTillCelldelning -= 0.2;
    }

    for (var _food in foodlist) {
      var _foodlist$_food = foodlist[_food],
          _x = _foodlist$_food.x,
          _y = _foodlist$_food.y,
          _diameter = _foodlist$_food.diameter;
      c.beginPath();
      c.arc(_x, _y, _diameter, 0, Math.PI * 2, false);
      c.strokeStyle = "#44af2a";
      c.fillStyle = "#44af2a";
      c.fill();
      c.stroke();

      if (animateX - minCell.diameter < _x && _x < animateX) {
        if (animateY - minCell.diameter < _y && _y < animateY) {
          if (rundansEnergi >= 1000) {
            rundansMatTillCelldelning++;
          } else rundansEnergi += 2;
        }
      }
    }

    if (rundansMatTillCelldelning > 1000) {
      nrOfChildrenCells += 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      genereraDinCell(c, minCell, foodlist, nrOfChildrenCells, animateX, animateY);
      rundansMatTillCelldelning = 0;
      rundansEnergi = 500;
    }
  }

  animateFood();

  function animate() {
    var id = requestAnimationFrame(animate);

    if (rundansEnergi <= 0) {
      nrOfChildrenCells -= 1;
      document.querySelector(".cells").textContent = nrOfChildrenCells;
      cancelAnimationFrame(id);
    }

    c.beginPath();
    c.arc(animateX - diameter / 2, animateY - diameter / 2, diameter / 2, 0, Math.PI * 2, false);
    c.fillStyle = "#000";
    c.fill();
    c.strokeStyle = "#000";
    c.stroke();
    c.beginPath();
    c.fillStyle = "#3df322";
    c.fillRect(animateX - diameter, animateY + diameter / 4, diameter / 1000 * rundansMatTillCelldelning, 3);
    c.stroke();
    c.fillStyle = "#aaf322";
    c.fillRect(animateX - diameter, animateY + diameter / 6, diameter / 1000 * rundansEnergi, 3);
    var directionY = Math.random();

    if (directionY > 0.6666) {
      if (animateY < window.innerHeight - diameter) animateY += hastighet;
    }

    if (directionY < 0.3334) {
      if (animateY > 0 + diameter) animateY -= hastighet;
    }

    var directionX = Math.random();

    if (directionX > 0.6666) {
      if (animateX < window.innerWidth - diameter) animateX += hastighet;
    }

    if (directionX < 0.3334) {
      if (animateX > 0 + diameter) animateX -= hastighet;
    }
  }

  animate();
}; // export const genereraMotståndarCell = (c, stateOfGame) => {
//   const { svårighetsgrad } = stateOfGame;
//   const diameter = (Math.random() * (50 - 25) + 25) * svårighetsgrad;
//   const x =
//     (Math.random() * (window.innerWidth - 10 - diameter) + diameter) *
//     svårighetsgrad;
//   const y =
//     (Math.random() * (window.innerHeight - 10 - diameter) + diameter) *
//     svårighetsgrad;
//   c.beginPath();
//   c.arc(
//     x - diameter / 2,
//     y - diameter / 2,
//     diameter / 2,
//     0,
//     Math.PI * 2,
//     false
//   );
//   c.strokeStyle = "#ea4f00";
//   c.stroke();
//   let animateX = x;
//   let animateY = y;
//   function animate() {
//     requestAnimationFrame(animate);
//     c.beginPath();
//     c.arc(
//       animateX - diameter / 2,
//       animateY - diameter / 2,
//       diameter / 2,
//       0,
//       Math.PI * 2,
//       false
//     );
//     c.strokeStyle = "#ea4f00";
//     c.fillStyle = "#ea4f00";
//     c.fill();
//     c.stroke();
//     const directionY = Math.random();
//     if (directionY > 0.6666) {
//       if (animateY < window.innerHeight - diameter) animateY++;
//     }
//     if (directionY < 0.3334) {
//       if (animateY > 0 + diameter) animateY--;
//     }
//     const directionX = Math.random();
//     if (directionX > 0.6666) {
//       if (animateX < window.innerWidth - diameter) animateX++;
//     }
//     if (directionX < 0.3334) {
//       if (animateX > 0 + diameter) animateX--;
//     }
//   }
//   animate();
// };


exports.genereraDinCell = genereraDinCell;
},{}],"js/object-creators/food-creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genereraMat = void 0;

var genereraMat = function genereraMat(c, svårighetsgrad) {
  var foodlist = [];

  for (var i = 0; i < 50 / svårighetsgrad; i++) {
    var diameter = Math.random() * (5 - 2) + 2;
    var x = Math.random() * (window.innerWidth - 10 - diameter) + diameter;
    var y = Math.random() * (window.innerHeight - 10 - diameter) + diameter;
    foodlist.push({
      x: x,
      y: y,
      diameter: diameter
    });
  }

  console.log(foodlist);
  return foodlist;
};

exports.genereraMat = genereraMat;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

var _cellCreator = require("./object-creators/cell-creator");

var _foodCreator = require("./object-creators/food-creator");

var canvas = document.querySelector(".plan");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
var c = canvas.getContext("2d");
var stateOfGame = {
  svårighetsgrad: 1,
  antalMotståndare: 5
};
var minCell = {
  dnaMängd: 1,
  diameter: Math.random() * (50 - 25) + 25,
  hastighet: Math.random() * (5 - 0) + 0,
  energi: 1000,
  matTillCelldelning: 0
};
var nrOfChildrenCells = 1;

var startaRunda = function startaRunda(c, stateOfGame, minCell) {
  var antalMotståndare = stateOfGame.antalMotståndare,
      svårighetsgrad = stateOfGame.svårighetsgrad;

  function cleanScreenOnNewFrame() {
    requestAnimationFrame(cleanScreenOnNewFrame);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  cleanScreenOnNewFrame();
  var foodlist = (0, _foodCreator.genereraMat)(c, svårighetsgrad);
  (0, _cellCreator.genereraDinCell)(c, minCell, foodlist, nrOfChildrenCells); //   for (let i = 0; i < antalMotståndare; i++) {
  //     genereraMotståndarCell(c, stateOfGame, foodlist);
  //   }
};

startaRunda(c, stateOfGame, minCell);
},{"../scss/main.scss":"scss/main.scss","./object-creators/cell-creator":"js/object-creators/cell-creator.js","./object-creators/food-creator":"js/object-creators/food-creator.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54536" + '/');

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