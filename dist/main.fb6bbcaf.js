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

  for (var i = 0; i < 400; i++) {
    var radius = Math.random() * (3 - 2) + 2;
    var x = Math.random() * (window.innerWidth - 10 - radius) + radius;
    var y = Math.random() * (window.innerHeight - 10 - radius) + radius;
    foodlist.push({
      x: x,
      y: y,
      radius: radius
    });
  }

  console.log(foodlist);
  return foodlist;
};

exports.genereraMat = genereraMat;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

var _foodCreator = require("./object-creators/food-creator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var canvas = document.querySelector(".plan");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
var c = canvas.getContext("2d");
var nrOfChildrenCells = 1;
document.querySelector(".cells").textContent = nrOfChildrenCells;
var foodlist = (0, _foodCreator.genereraMat)(c);

var Cell = /*#__PURE__*/function () {
  function Cell(id, children, x, y, radius, r, g, b, energi, celldelningsProgress, hastighet, jumpLength, energiUpptagning, delningsEffektivitet) {
    _classCallCheck(this, Cell);

    this.id = id;
    this.children = children;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    this.energi = energi;
    this.celldelningsProgress = celldelningsProgress;
    this.hastighet = hastighet;
    this.jumpLength = jumpLength;
    this.energiUpptagning = energiUpptagning;
    this.delningsEffektivitet = delningsEffektivitet;
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
      var _this = this;

      this.jump();
      this.draw();

      if (this.energi >= 0) {
        this.energi -= 0.3;
      }

      if (this.celldelningsProgress >= 0) {
        this.celldelningsProgress -= 0.2;
      }

      for (var food in foods) {
        var _foods$food = foods[food],
            x = _foods$food.x,
            y = _foods$food.y,
            radius = _foods$food.radius; //TODO Gör maten mindre när man äter av den.

        foods.forEach(function (food) {
          if (food.radius < 1) food.radius += 0.0000002;
          if (food.radius < 2) food.radius += 0.00000002;
          if (food.radius < 3) food.radius += 0.000000005;
          food.radius += 0.0000000005;
        });

        if (this.x < x + this.radius && x - this.radius < this.x) {
          if (this.y < y + this.radius && y - this.radius < this.y) {
            if (foods[food].radius >= 0.1) {
              foods[food].radius -= 0.005;
            }

            if (this.energi >= 1000) {
              this.celldelningsProgress += this.delningsEffektivitet * radius;
            } else if (foods[food].radius > 1.1) this.energi += this.energiUpptagning * radius - 0.13;
          }
        }
      }

      if (this.celldelningsProgress > 1000) {
        nrOfChildrenCells += 1;
        document.querySelector(".cells").textContent = nrOfChildrenCells;
        this.children++;
        var newID = "".concat(this.id, "-").concat(this.children);
        cells.push(new Cell(newID, 0, this.x, this.y, this.radius * (Math.random() * (0.95 - 1.05) + 1.05), this.r * (Math.random() * (0.96 - 1.04) + 1.04), this.g * (Math.random() * (0.96 - 1.04) + 1.04), this.b * (Math.random() * (0.96 - 1.04) + 1.04), 500, 0, this.hastighet, this.jumpLength * (Math.random() * (0.95 - 1.05) + 1.05), this.energiUpptagning * (Math.random() * (0.95 - 1.05) + 1.05), this.delningsEffektivitet * (Math.random() * (0.95 - 1.05) + 1.05)));
        console.log(cells);
        this.celldelningsProgress = 0;
        this.energi = 500;
      }

      if (this.energi <= 0) {
        nrOfChildrenCells -= 1;
        document.querySelector(".cells").textContent = nrOfChildrenCells;
        var filteredArray = cells.filter(function (cell) {
          return cell.id !== _this.id;
        });
        cells = filteredArray;
        console.log(cells);
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

var cell = new Cell("1", 0, 400, 200, 20, 125, 125, 125, 500, 0, 1, 1, 1, 3);
var cells = [cell];
var foods = [];

for (var food in foodlist) {
  var _foodlist$food = foodlist[food],
      x = _foodlist$food.x,
      y = _foodlist$food.y,
      radius = _foodlist$food.radius;
  foods[food] = new Food(x, y, radius, "lightgreen");
}

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var animationID = requestAnimationFrame(animate);
  cells.forEach(function (cell) {
    return cell.update();
  });
  foods.forEach(function (food) {
    return food.draw();
  });

  if (cells.length > 99) {
    c.clearRect(0, 0, innerWidth, innerHeight);
    var _x = 0;
    var _y = 0;

    for (Cell in cells) {
      if (Cell % 15 === 0) {
        _y += 40;
        _x = 0;
      }

      _x += 40;
      cells[Cell].x = _x;
      cells[Cell].y = _y;
      cells[Cell].energi = 0;
      cells[Cell].celldelningsProgress = 0;
      cells[Cell].draw();
    }

    cancelAnimationFrame(animationID);
  }
}

animate();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51747" + '/');

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