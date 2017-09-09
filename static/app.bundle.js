webpackJsonp([0],{

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearUserGames = exports.completeTrade = exports.getUserGames = exports.removeGame = exports.addGame = undefined;

var _axios = __webpack_require__(328);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addGame = exports.addGame = function addGame(game) {
  return function (dispatch) {
    _axios2.default.post('/games/addGame', game).then(function (res) {
      dispatch({ type: 'ADD_GAME', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var removeGame = exports.removeGame = function removeGame(game) {
  return function (dispatch) {
    _axios2.default.post('/games/removeGame', game).then(function (res) {
      dispatch({ type: 'REMOVE_GAME', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var getUserGames = exports.getUserGames = function getUserGames() {
  return function (dispatch) {
    _axios2.default.get('/games/getUserGames').then(function (res) {
      dispatch({ type: 'GET_USER_GAMES', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var completeTrade = exports.completeTrade = function completeTrade(request) {
  return function (dispatch) {
    _axios2.default.post('/trades/completeTrade', request).then(function (res) {
      dispatch({ type: 'COMPLETE_TRADE', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var clearUserGames = exports.clearUserGames = function clearUserGames() {
  return { type: 'CLEAR_USER_GAMES', payload: [] };
};

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameCard = function (_Component) {
  _inherits(GameCard, _Component);

  function GameCard() {
    _classCallCheck(this, GameCard);

    return _possibleConstructorReturn(this, (GameCard.__proto__ || Object.getPrototypeOf(GameCard)).apply(this, arguments));
  }

  _createClass(GameCard, [{
    key: 'displayOwner',
    value: function displayOwner() {
      if (this.props.owner) {
        return _react2.default.createElement(
          'p',
          { className: 'owner-request-text' },
          'Owner: ',
          this.props.owner
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Well,
        null,
        _react2.default.createElement(
          _reactBootstrap.Media,
          null,
          _react2.default.createElement(
            _reactBootstrap.Media.Left,
            null,
            _react2.default.createElement('img', { src: this.props.cover, alt: this.props.name })
          ),
          _react2.default.createElement(
            _reactBootstrap.Media.Body,
            null,
            this.displayOwner(),
            _react2.default.createElement(
              _reactBootstrap.Media.Heading,
              { className: 'game-header' },
              this.props.name
            ),
            _react2.default.createElement(
              'p',
              { className: 'summary' },
              this.props.summary
            )
          )
        )
      );
    }
  }]);

  return GameCard;
}(_react.Component);

exports.default = GameCard;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(471);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _getPrototype = __webpack_require__(476);

var _getPrototype2 = _interopRequireDefault(_getPrototype);

var _isObjectLike = __webpack_require__(478);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!(0, _isObjectLike2.default)(value) || (0, _baseGetTag2.default)(value) != objectTag) {
    return false;
  }
  var proto = (0, _getPrototype2.default)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

exports.default = isPlainObject;

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(43);
var normalizeHeaderName = __webpack_require__(666);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(330);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(330);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearUserRequests = exports.getUserRequests = exports.declineTrade = exports.removeRequest = exports.addRequest = undefined;

var _axios = __webpack_require__(328);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addRequest = exports.addRequest = function addRequest(request) {
  return function (dispatch) {
    _axios2.default.post('/requests/addRequest', request).then(function (res) {
      dispatch({ type: 'ADD_REQUEST', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var removeRequest = exports.removeRequest = function removeRequest(request) {
  return function (dispatch) {
    _axios2.default.post('/requests/removeRequest', request).then(function (res) {
      dispatch({ type: 'REMOVE_REQUEST', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var declineTrade = exports.declineTrade = function declineTrade(request) {
  return function (dispatch) {
    _axios2.default.post('/trades/declineTrade', request).then(function (res) {
      dispatch({ type: 'DECLINE_TRADE', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var getUserRequests = exports.getUserRequests = function getUserRequests() {
  return function (dispatch) {
    _axios2.default.get('/requests/getUserRequests').then(function (res) {
      dispatch({ type: 'GET_USER_REQUESTS', payload: res.data });
    }).catch(function (err) {
      throw err;
    });
  };
};

var clearUserRequests = exports.clearUserRequests = function clearUserRequests() {
  return { type: 'CLEAR_USER_REQUESTS', payload: [] };
};

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createStore;

var _isPlainObject = __webpack_require__(174);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(479);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2.default)(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2.default] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2.default] = observable, _ref2;
}

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(472);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var _Symbol = _root2.default.Symbol;

exports.default = _Symbol;

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeShape = exports.subscriptionShape = undefined;

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscriptionShape = exports.subscriptionShape = _propTypes2.default.shape({
  trySubscribe: _propTypes2.default.func.isRequired,
  tryUnsubscribe: _propTypes2.default.func.isRequired,
  notifyNestedSubs: _propTypes2.default.func.isRequired,
  isSubscribed: _propTypes2.default.func.isRequired
});

var storeShape = exports.storeShape = _propTypes2.default.shape({
  subscribe: _propTypes2.default.func.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  getState: _propTypes2.default.func.isRequired
});

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = connectAdvanced;

var _hoistNonReactStatics = __webpack_require__(488);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(61);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(0);

var _Subscription = __webpack_require__(489);

var _Subscription2 = _interopRequireDefault(_Subscription);

var _PropTypes = __webpack_require__(273);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = _PropTypes.storeShape, _contextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    (0, _invariant2.default)(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        (0, _invariant2.default)(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new _Subscription2.default(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return (0, _react.createElement)(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(_react.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapMapToPropsConstant = wrapMapToPropsConstant;
exports.getDependsOnOwnProps = getDependsOnOwnProps;
exports.wrapMapToPropsFunc = wrapMapToPropsFunc;

var _verifyPlainObject = __webpack_require__(276);

var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject2.default)(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyPlainObject;

var _isPlainObject = __webpack_require__(174);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(175);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyPlainObject(value, displayName, methodName) {
  if (!(0, _isPlainObject2.default)(value)) {
    (0, _warning2.default)(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameConsoles = exports.gameConsoles = [{
  name: 'Atari 2600',
  id: 59
}, {
  name: 'Atari 5200',
  id: 66
}, {
  name: 'Atari 7800',
  id: 60
}, {
  name: 'Game Boy',
  id: 33
}, {
  name: 'Game Boy Advance',
  id: 24
}, {
  name: 'Game Boy Color',
  id: 22
}, {
  name: 'Nintendo (NES)',
  id: 18
}, {
  name: 'Nintendo (SNES)',
  id: 19
}, {
  name: 'Nintendo GameCube',
  id: 21
}, {
  name: 'Nintendo Switch',
  id: 130
}, {
  name: 'Nintendo 64',
  id: 4
}, {
  name: 'Nintendo DS',
  id: 20
}, {
  name: 'Nintendo 3DS',
  id: 37
}, {
  name: 'PlayStation',
  id: 7
}, {
  name: 'PlayStation 2',
  id: 8
}, {
  name: 'PlayStation 3',
  id: 9
}, {
  name: 'PlayStation 4',
  id: 48
}, {
  name: 'PlayStation Portable',
  id: 38
}, {
  name: 'PlayStation Vita',
  id: 46
}, {
  name: 'Sega Dreamcast',
  id: 23
}, {
  name: 'Sega Game Gear',
  id: 35
}, {
  name: 'Sega Genesis',
  id: 29
}, {
  name: 'Sega Master System',
  id: 64
}, {
  name: 'Wii',
  id: 5
}, {
  name: 'Wii U',
  id: 41
}, {
  name: 'XBox',
  id: 11
}, {
  name: 'XBox 360',
  id: 12
}, {
  name: 'XBox One',
  id: 49
}];

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(663);

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(43);
var settle = __webpack_require__(667);
var buildURL = __webpack_require__(669);
var parseHeaders = __webpack_require__(670);
var isURLSameOrigin = __webpack_require__(671);
var createError = __webpack_require__(331);
var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(672);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || request.readyState !== 4 && !xDomain) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(673);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(668);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(108);

var _reactBootstrap = __webpack_require__(35);

var _reactRouterBootstrap = __webpack_require__(335);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logout = function logout() {
  fetch('logoutUser', {
    method: 'POST',
    credentials: 'include'
  });
};

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Navbar,
        null,
        _react2.default.createElement(
          _reactBootstrap.Navbar.Header,
          null,
          _react2.default.createElement(
            _reactBootstrap.Navbar.Brand,
            null,
            _react2.default.createElement(
              'span',
              { className: 'menu-logo' },
              'GameTrader'
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { pullRight: true },
          _react2.default.createElement(
            _reactRouterBootstrap.LinkContainer,
            { to: '/AllGames' },
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { className: 'nav-text' },
              'Browse Games'
            )
          ),
          _react2.default.createElement(
            _reactRouterBootstrap.LinkContainer,
            { to: '/Dashboard' },
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { className: 'nav-text' },
              'My Games'
            )
          ),
          _react2.default.createElement(
            _reactRouterBootstrap.LinkContainer,
            { to: '/' },
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { className: 'nav-text', onClick: logout },
              'Sign out'
            )
          )
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

exports.default = Menu;

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_GAME = exports.ADD_GAME = 'ADD_GAME';
var REMOVE_GAME = exports.REMOVE_GAME = 'REMOVE_GAME';
var COMPLETE_TRADE = exports.COMPLETE_TRADE = 'COMPLETE_TRADE';
var DECLINE_TRADE = exports.DECLINE_TRADE = 'DECLINE_TRADE';
var GET_USER_GAMES = exports.GET_USER_GAMES = 'GET_USER_GAMES';
var GET_USER_REQUESTS = exports.GET_USER_REQUESTS = 'GET_USER_REQUESTS';
var CLEAR_USER_REQUESTS = exports.CLEAR_USER_REQUESTS = 'CLEAR_USER_REQUESTS';
var ADD_REQUEST = exports.ADD_REQUEST = 'ADD_REQUEST';
var REMOVE_REQUEST = exports.REMOVE_REQUEST = 'REMOVE_REQUEST';
var CLEAR_USER_GAMES = exports.CLEAR_USER_GAMES = 'CLEAR_USER_GAMES';

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(31);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(65);

var _reduxThunk = __webpack_require__(485);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = __webpack_require__(91);

var _reactRouterDom = __webpack_require__(129);

var _RoutedApp = __webpack_require__(523);

var _RoutedApp2 = _interopRequireDefault(_RoutedApp);

var _rootReducer = __webpack_require__(691);

var _rootReducer2 = _interopRequireDefault(_rootReducer);

__webpack_require__(694);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);
// import logger from 'redux-logger';

var store = (0, _redux.createStore)(_rootReducer2.default, middleware);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_RoutedApp2.default, null)
  )
), document.getElementById('app'));

if (false) {
  module.hot.accept();
}

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(329);
var isBuffer = __webpack_require__(664);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(269);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _getRawTag = __webpack_require__(474);

var _getRawTag2 = _interopRequireDefault(_getRawTag);

var _objectToString = __webpack_require__(475);

var _objectToString2 = _interopRequireDefault(_objectToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
}

exports.default = baseGetTag;

/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _freeGlobal = __webpack_require__(473);

var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal2.default || freeSelf || Function('return this')();

exports.default = root;

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

exports.default = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)))

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(269);

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

exports.default = getRawTag;

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

exports.default = objectToString;

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overArg = __webpack_require__(477);

var _overArg2 = _interopRequireDefault(_overArg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var getPrototype = (0, _overArg2.default)(Object.getPrototypeOf, Object);

exports.default = getPrototype;

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

exports.default = overArg;

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(480);

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(481);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var root; /* global window */

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128), __webpack_require__(270)(module)))

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineReducers;

var _createStore = __webpack_require__(268);

var _isPlainObject = __webpack_require__(174);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(271);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

var _compose = __webpack_require__(272);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createProvider = createProvider;

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PropTypes = __webpack_require__(273);

var _warning = __webpack_require__(175);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  (0, _warning2.default)('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return _react.Children.only(this.props.children);
    };

    return Provider;
  }(_react.Component);

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: _PropTypes.storeShape.isRequired,
    children: _propTypes2.default.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _PropTypes.storeShape.isRequired, _Provider$childContex[subscriptionKey] = _PropTypes.subscriptionShape, _Provider$childContex);

  return Provider;
}

exports.default = createProvider();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

exports.default = Subscription;

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createConnect = createConnect;

var _connectAdvanced = __webpack_require__(274);

var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

var _shallowEqual = __webpack_require__(491);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _mapDispatchToProps = __webpack_require__(492);

var _mapDispatchToProps2 = _interopRequireDefault(_mapDispatchToProps);

var _mapStateToProps = __webpack_require__(493);

var _mapStateToProps2 = _interopRequireDefault(_mapStateToProps);

var _mergeProps = __webpack_require__(494);

var _mergeProps2 = _interopRequireDefault(_mergeProps);

var _selectorFactory = __webpack_require__(495);

var _selectorFactory2 = _interopRequireDefault(_selectorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? _connectAdvanced2.default : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? _mapStateToProps2.default : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? _mapDispatchToProps2.default : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? _mergeProps2.default : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? _selectorFactory2.default : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? _shallowEqual2.default : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? _shallowEqual2.default : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? _shallowEqual2.default : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

exports.default = createConnect();

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.whenMapDispatchToPropsIsFunction = whenMapDispatchToPropsIsFunction;
exports.whenMapDispatchToPropsIsMissing = whenMapDispatchToPropsIsMissing;
exports.whenMapDispatchToPropsIsObject = whenMapDispatchToPropsIsObject;

var _redux = __webpack_require__(65);

var _wrapMapToProps = __webpack_require__(275);

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
  }) : undefined;
}

exports.default = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenMapStateToPropsIsFunction = whenMapStateToPropsIsFunction;
exports.whenMapStateToPropsIsMissing = whenMapStateToPropsIsMissing;

var _wrapMapToProps = __webpack_require__(275);

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function () {
    return {};
  }) : undefined;
}

exports.default = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMergeProps = defaultMergeProps;
exports.wrapMergePropsFunc = wrapMergePropsFunc;
exports.whenMergePropsIsFunction = whenMergePropsIsFunction;
exports.whenMergePropsIsOmitted = whenMergePropsIsOmitted;

var _verifyPlainObject = __webpack_require__(276);

var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject2.default)(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

exports.default = [whenMergePropsIsFunction, whenMergePropsIsOmitted];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.impureFinalPropsSelectorFactory = impureFinalPropsSelectorFactory;
exports.pureFinalPropsSelectorFactory = pureFinalPropsSelectorFactory;
exports.default = finalPropsSelectorFactory;

var _verifySubselectors = __webpack_require__(496);

var _verifySubselectors2 = _interopRequireDefault(_verifySubselectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    (0, _verifySubselectors2.default)(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifySubselectors;

var _warning = __webpack_require__(175);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      (0, _warning2.default)('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(129);

var _reactRouter = __webpack_require__(32);

var _GameList = __webpack_require__(524);

var _GameList2 = _interopRequireDefault(_GameList);

var _RequestList = __webpack_require__(681);

var _RequestList2 = _interopRequireDefault(_RequestList);

var _Menu = __webpack_require__(334);

var _Menu2 = _interopRequireDefault(_Menu);

var _GameBrowser = __webpack_require__(685);

var _GameBrowser2 = _interopRequireDefault(_GameBrowser);

var _Login = __webpack_require__(689);

var _Login2 = _interopRequireDefault(_Login);

var _SignUp = __webpack_require__(690);

var _SignUp2 = _interopRequireDefault(_SignUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sessionUser = 'Noodles';

// callback method to set username for welcome message
var setSessionUser = function setSessionUser(user) {
  sessionUser = user;
};

// retrieves username for welcome message
var getSessionUser = function getSessionUser() {
  return sessionUser;
};

var Main = function Main() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Menu2.default, null),
    _react2.default.createElement(_RequestList2.default, { sessionUser: sessionUser, getSessionUser: getSessionUser }),
    _react2.default.createElement(_GameList2.default, null)
  );
};

var Footer = function Footer() {
  return _react2.default.createElement(
    'div',
    { className: 'footer-style' },
    _react2.default.createElement(
      'p',
      null,
      'Copyright \xA9 2017 Chris Cantu. All Rights Reserved'
    )
  );
};
var RoutedApp = function RoutedApp() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', render: function render(props) {
          return _react2.default.createElement(_Login2.default, _extends({ setSessionUser: setSessionUser }, props));
        } }),
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/AllGames', component: _GameBrowser2.default }),
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/Dashboard', component: Main }),
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/Signup', render: function render(props) {
          return _react2.default.createElement(_SignUp2.default, _extends({ setSessionUser: setSessionUser }, props));
        } })
    ),
    _react2.default.createElement(Footer, null)
  );
};

exports.default = RoutedApp;

/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(31);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(65);

var _reactRedux = __webpack_require__(91);

__webpack_require__(108);

var _reactBootstrap = __webpack_require__(35);

var _GameItem = __webpack_require__(662);

var _GameItem2 = _interopRequireDefault(_GameItem);

var _gameActions = __webpack_require__(139);

var _gameConsoles = __webpack_require__(327);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameList = function (_Component) {
  _inherits(GameList, _Component);

  function GameList(props) {
    _classCallCheck(this, GameList);

    var _this = _possibleConstructorReturn(this, (GameList.__proto__ || Object.getPrototypeOf(GameList)).call(this, props));

    _this.state = {
      showModal: false,
      searchTerm: '',
      searchList: [],
      selectedGame: {},
      selectedConsole: 0,
      searchTermMessage: '',
      consoleSearchMessage: '',
      gameSearchMessage: ''
    };

    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.handleOnClickAdd = _this.handleOnClickAdd.bind(_this);
    _this.queryGames = _this.queryGames.bind(_this);
    _this.updateSearchTerm = _this.updateSearchTerm.bind(_this);
    _this.highlightGame = _this.highlightGame.bind(_this);
    _this.updateConsole = _this.updateConsole.bind(_this);
    _this.verifySearchQuery = _this.verifySearchQuery.bind(_this);
    _this.verifyClientDoesNotOwnGame = _this.verifyClientDoesNotOwnGame.bind(_this);
    return _this;
  }

  _createClass(GameList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // clears out any game (and DOM elements)
      // from previous sessions (from other users)
      // that do not belong to current user
      this.props.clearUserGames();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getUserGames();
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.setState({
        showModal: !this.state.showModal,
        searchList: [] // erases search result after every toggle
      });
    }
  }, {
    key: 'verifySearchQuery',
    value: function verifySearchQuery() {
      if (this.state.searchTerm.length === 0) {
        this.setState({
          searchTermMessage: 'Please enter a game title to search.'
        });
        return false;
      }

      if (this.state.selectedConsole === 0) {
        this.setState({
          consoleSearchMessage: 'Please select a gaming console.'
        });
        return false;
      }
      return true;
    }
  }, {
    key: 'queryGames',
    value: function queryGames() {
      var _this2 = this;

      this.setState({
        selectedGame: {}
      });

      if (this.verifySearchQuery()) {
        fetch('/games/findGame/' + this.state.selectedConsole + '/' + this.state.searchTerm).then(function (res) {
          res.json().then(function (result) {
            if (JSON.parse(result).length > 0) {
              // add Well only after search results have been returned
              _reactDom2.default.findDOMNode(_this2.refs['searchWell']).className = 'well';

              _this2.setState({
                searchList: JSON.parse(result)
              });
            } else {
              _this2.setState({
                gameSearchMessage: 'No games found. Please try another search term.'
              });
            }
          });
        }).catch(function (err) {
          throw err;
        });
      }
    }
  }, {
    key: 'updateSearchTerm',
    value: function updateSearchTerm(e) {
      this.setState({
        searchTerm: e.target.value,
        searchTermMessage: '',
        gameSearchMessage: ''
      });
    }
  }, {
    key: 'highlightGame',
    value: function highlightGame(highlightedGame) {
      var _this3 = this;

      // unhighlights previously selected game
      this.state.searchList.map(function (game) {
        _reactDom2.default.findDOMNode(_this3.refs[game.id]).style.backgroundColor = 'transparent';
      });
      _reactDom2.default.findDOMNode(this.refs[highlightedGame.id]).style.backgroundColor = '#46af2c';

      this.setState({
        selectedGame: highlightedGame,
        gameSearchMessage: ''
      });
    }
  }, {
    key: 'verifyClientDoesNotOwnGame',
    value: function verifyClientDoesNotOwnGame() {
      var _this4 = this;

      // checks to see if client already has game in their collection
      var doesNotOwnGame = true;

      Array.from(this.props.games.games).map(function (game) {
        if (game.id.toString() === _this4.state.selectedGame.id.toString()) {
          _this4.setState({
            gameSearchMessage: 'This game already exists in your library.'
          });
          doesNotOwnGame = false;
        }
      });
      return doesNotOwnGame;
    }
  }, {
    key: 'handleOnClickAdd',
    value: function handleOnClickAdd() {
      if (this.verifyClientDoesNotOwnGame()) {
        this.props.addGame([{
          name: this.state.selectedGame.name,
          id: this.state.selectedGame.id,
          summary: this.state.selectedGame.summary,
          cover: this.state.selectedGame.cover,
          gameConsole: this.state.selectedGame.gameConsole,
          screenshots: this.state.selectedGame.screenshots
        }]);
        this.toggleModal(); // close modal
      }
    }
  }, {
    key: 'updateConsole',
    value: function updateConsole(event) {
      this.setState({
        selectedConsole: parseInt(event.target.value, 10),
        consoleSearchMessage: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Well,
          null,
          _react2.default.createElement(
            _reactBootstrap.Grid,
            null,
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 12, xs: 12 },
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsSize: 'large', onClick: this.toggleModal, className: 'accept-button add-game-button' },
                  '+ Add Game'
                ),
                _react2.default.createElement(
                  'h1',
                  { className: 'section-header' },
                  'My Games'
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              this.props.games.games.map(function (game) {
                return _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2, xs: 4, key: game.id },
                  _react2.default.createElement(
                    'div',
                    { className: 'game-container' },
                    _react2.default.createElement(_GameItem2.default, {
                      name: game.name,
                      id: game.id,
                      summary: game.summary,
                      cover: game.cover,
                      gameConsole: game.gameConsole,
                      screenshots: game.screenshots
                    })
                  )
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal,
          {
            show: this.state.showModal,
            onHide: this.toggleModal
          },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            null,
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'Find Game'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 10, xs: 8, md: 10 },
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    null,
                    _react2.default.createElement(_reactBootstrap.FormControl, {
                      onChange: this.updateSearchTerm,
                      name: 'name',
                      type: 'text',
                      placeholder: 'Search For Games'
                    })
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.HelpBlock,
                    null,
                    this.state.searchTermMessage
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 1, xs: 1 },
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    { bsStyle: 'primary', onClick: this.queryGames },
                    'Search'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 10, xs: 9, md: 10 },
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'formControlsSelect' },
                    _react2.default.createElement(
                      _reactBootstrap.FormControl,
                      {
                        onChange: this.updateConsole,
                        componentClass: 'select'
                      },
                      _react2.default.createElement(
                        'option',
                        { value: 0 },
                        'Select Console'
                      ),
                      _gameConsoles.gameConsoles.map(function (consoleNum) {
                        return _react2.default.createElement(
                          'option',
                          { value: consoleNum.id, key: consoleNum.id },
                          consoleNum.name
                        );
                      })
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.HelpBlock,
                      null,
                      this.state.consoleSearchMessage
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.HelpBlock,
                      null,
                      this.state.gameSearchMessage
                    )
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 12, xs: 12, md: 12 },
                  _react2.default.createElement(
                    'div',
                    { ref: 'searchWell' },
                    _react2.default.createElement(
                      _reactBootstrap.Row,
                      null,
                      this.state.searchList.map(function (game) {
                        return _react2.default.createElement(
                          _reactBootstrap.Col,
                          { sm: 3, xs: 6 },
                          _react2.default.createElement(
                            'div',
                            { className: 'game-container' },
                            _react2.default.createElement(
                              'a',
                              { onClick: function onClick() {
                                  _this5.highlightGame(game);
                                }, key: game.id },
                              _react2.default.createElement('img', { className: 'game-item', src: game.cover, alt: game.name, ref: game.id, 'max-width': 90, 'max-height': 128 })
                            )
                          )
                        );
                      })
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: this.toggleModal },
              'Close'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'accept-button', onClick: this.handleOnClickAdd },
              'Add Game'
            )
          )
        )
      );
    }
  }]);

  return GameList;
}(_react.Component);

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    addGame: _gameActions.addGame,
    getUserGames: _gameActions.getUserGames,
    removeGame: _gameActions.removeGame,
    clearUserGames: _gameActions.clearUserGames
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GameList);

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = __webpack_require__(268);

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = __webpack_require__(482);

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = __webpack_require__(483);

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = __webpack_require__(484);

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = __webpack_require__(272);

var _compose2 = _interopRequireDefault(_compose);

var _warning = __webpack_require__(271);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2.default)('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2.default;
exports.combineReducers = _combineReducers2.default;
exports.bindActionCreators = _bindActionCreators2.default;
exports.applyMiddleware = _applyMiddleware2.default;
exports.compose = _compose2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

var _reactRedux = __webpack_require__(91);

var _redux = __webpack_require__(65);

var _gameConsoles = __webpack_require__(327);

var _gameActions = __webpack_require__(139);

var _GameCard = __webpack_require__(140);

var _GameCard2 = _interopRequireDefault(_GameCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameItem = function (_Component) {
  _inherits(GameItem, _Component);

  function GameItem(props) {
    _classCallCheck(this, GameItem);

    var _this = _possibleConstructorReturn(this, (GameItem.__proto__ || Object.getPrototypeOf(GameItem)).call(this, props));

    _this.state = {
      showModal: false,
      index: 0,
      direction: null
    };

    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(GameItem, [{
    key: 'handleSelect',
    value: function handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.setState({
        showModal: !this.state.showModal
      });
    }
  }, {
    key: 'convertConsoleNumToConsoleName',
    value: function convertConsoleNumToConsoleName() {
      var _this2 = this;

      var publisher = '';

      _gameConsoles.gameConsoles.map(function (gameConsole) {
        if (gameConsole.id.toString() === _this2.props.gameConsole) {
          publisher = gameConsole.name;
        }
      });
      return publisher;
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick() {
      this.props.removeGame({
        id: this.props.id
      });

      this.toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { onClick: this.toggleModal },
          _react2.default.createElement('img', { src: this.props.cover, alt: this.props.name, className: 'game-item' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal,
          {
            show: this.state.showModal,
            onHide: this.toggleModal
          },
          _react2.default.createElement(
            _reactBootstrap.Carousel,
            {
              activeIndex: this.state.index,
              direction: this.state.direction,
              onSelect: this.handleSelect
            },
            this.props.screenshots.map(function (screenshot) {
              return _react2.default.createElement(
                _reactBootstrap.Carousel.Item,
                null,
                _react2.default.createElement('img', { width: 669, height: 320, src: screenshot, alt: _this3.props.name })
              );
            })
          ),
          _react2.default.createElement(_GameCard2.default, {
            cover: this.props.cover,
            name: this.props.name,
            summary: this.props.summary
          }),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'danger', onClick: this.handleOnClick },
              'Remove Game'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.toggleModal },
              'Close'
            )
          )
        )
      );
    }
  }]);

  return GameItem;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    removeGame: _gameActions.removeGame
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GameItem);

/***/ }),

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);
var bind = __webpack_require__(329);
var Axios = __webpack_require__(665);
var defaults = __webpack_require__(208);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(333);
axios.CancelToken = __webpack_require__(679);
axios.isCancel = __webpack_require__(332);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(680);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(208);
var utils = __webpack_require__(43);
var InterceptorManager = __webpack_require__(674);
var dispatchRequest = __webpack_require__(675);
var isAbsoluteURL = __webpack_require__(677);
var combineURLs = __webpack_require__(678);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/***/ }),

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(331);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/***/ }),

/***/ 669:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error();
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
  // initialize result and counter
  var block, charCode, idx = 0, map = chars;
  // if the next str index does not exist:
  //   change the mapping table to "="
  //   check if d has no fractional digits
  str.charAt(idx | 0) || (map = '=', idx % 1);
  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);
var transformData = __webpack_require__(676);
var isCancel = __webpack_require__(332);
var defaults = __webpack_require__(208);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(43);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(333);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

var _reactRedux = __webpack_require__(91);

var _redux = __webpack_require__(65);

var _RequestItem = __webpack_require__(682);

var _RequestItem2 = _interopRequireDefault(_RequestItem);

var _requestActions = __webpack_require__(209);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestList = function (_Component) {
  _inherits(RequestList, _Component);

  function RequestList(props) {
    _classCallCheck(this, RequestList);

    var _this = _possibleConstructorReturn(this, (RequestList.__proto__ || Object.getPrototypeOf(RequestList)).call(this, props));

    _this.state = {
      sessionUser: _this.props.sessionUser
    };
    return _this;
  }

  _createClass(RequestList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // clears out any requests (and DOM elements)
      // from previous session (from other users)
      // that do not belong to current user
      this.props.clearUserRequests();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getUserRequests();
      this.setState({
        sessionUser: this.props.getSessionUser()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Well,
        null,
        _react2.default.createElement(
          _reactBootstrap.Grid,
          null,
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { sm: 6, xs: 12, md: 8 },
              _react2.default.createElement(
                'h1',
                { className: 'section-header' },
                'My Requests'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { sm: 6, xs: 12, md: 4 },
              _react2.default.createElement(
                'h3',
                { className: 'welcome-message' },
                'Welcome, ' + this.state.sessionUser
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            this.props.requests.requests.map(function (request, key) {
              return _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 2, xs: 6, key: key },
                _react2.default.createElement(_RequestItem2.default, {
                  status: request.status,
                  requestedGame: request.requestedGame,
                  imageLink: 'pic here',
                  offeredGame: request.offeredGame,
                  path: request.path
                })
              );
            })
          )
        )
      );
    }
  }]);

  return RequestList;
}(_react.Component);

function mapStateToProps(state) {
  return {
    requests: state.requests
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    getUserRequests: _requestActions.getUserRequests,
    addRequest: _requestActions.addRequest,
    removeRequest: _requestActions.removeRequest,
    clearUserRequests: _requestActions.clearUserRequests
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RequestList);

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

var _reactRedux = __webpack_require__(91);

var _redux = __webpack_require__(65);

var _gameActions = __webpack_require__(139);

var _requestActions = __webpack_require__(209);

var _requestStrings = __webpack_require__(683);

var _GameCard = __webpack_require__(140);

var _GameCard2 = _interopRequireDefault(_GameCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestItem = function (_Component) {
  _inherits(RequestItem, _Component);

  function RequestItem(props) {
    _classCallCheck(this, RequestItem);

    var _this = _possibleConstructorReturn(this, (RequestItem.__proto__ || Object.getPrototypeOf(RequestItem)).call(this, props));

    _this.state = {
      showModal: false,
      statusMessage: ''
    };

    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.acceptTrade = _this.acceptTrade.bind(_this);
    _this.declineTrade = _this.declineTrade.bind(_this);
    _this.removeTrade = _this.removeTrade.bind(_this);
    _this.getActionButtons = _this.getActionButtons.bind(_this);
    _this.getStatusMessage = _this.getStatusMessage.bind(_this);
    _this.setStatusBackgroundColor = _this.setStatusBackgroundColor.bind(_this);
    return _this;
  }

  _createClass(RequestItem, [{
    key: 'getStatusMessage',
    value: function getStatusMessage() {
      if (this.props.status === _requestStrings.ACCEPTED) {
        return 'Your Trade Offer Was Accepted!';
      } else if (this.props.status === _requestStrings.DECLINED) {
        return 'Sorry! Your Trade Offer Was Declined.';
      } else if (this.props.status === _requestStrings.CANCELLED) {
        return 'This Trade Offer Was Cancelled By ' + this.props.requestedGame.owner + '.';
      }
      return '';
    }
  }, {
    key: 'getActionButtons',
    value: function getActionButtons() {
      var _this2 = this;

      if (this.props.status === _requestStrings.PENDING) {
        if (this.props.path === _requestStrings.OUTGOING) {
          return _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'danger', onClick: function onClick() {
                _this2.declineTrade('Cancelled');
              } },
            _requestStrings.CANCEL_TRADE
          );
        } else if (this.props.path === _requestStrings.INCOMING) {
          return _react2.default.createElement(
            'div',
            { className: 'trade-modal-buttons' },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'modal-buttons', bsStyle: 'danger', onClick: function onClick() {
                  _this2.declineTrade('Declined');
                } },
              _requestStrings.DECLINE_TRADE_OFFER
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'modal-buttons accept-button', onClick: this.acceptTrade },
              _requestStrings.ACCEPT_TRADE
            )
          );
        }
      } else if (this.props.status === _requestStrings.ACCEPTED) {
        return _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'danger', onClick: this.removeTrade },
          'Remove'
        );
      } else if (this.props.status === _requestStrings.DECLINED || this.props.status === _requestStrings.CANCELLED) {
        return _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'danger', onClick: this.removeTrade },
          'Remove'
        );
      }
    }
  }, {
    key: 'setStatusBackgroundColor',
    value: function setStatusBackgroundColor(status) {
      if (status === _requestStrings.PENDING) {
        return 'request-pending';
      } else if (status === _requestStrings.ACCEPTED) {
        return 'request-accepted';
      } else if (status === _requestStrings.DECLINED || status === _requestStrings.CANCELLED) {
        return 'request-declined';
      }
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.setState({
        showModal: !this.state.showModal
      });
    }
  }, {
    key: 'removeTrade',
    value: function removeTrade() {
      this.props.removeRequest({
        requestedGameId: this.props.requestedGame.id,
        offeredGameId: this.props.offeredGame.id
      });

      // close modal after action
      this.toggleModal();
    }
  }, {
    key: 'declineTrade',
    value: function declineTrade(type) {
      this.props.declineTrade({
        type: type,
        offeredGame: this.props.offeredGame,
        requestedGame: this.props.requestedGame
      });
    }
  }, {
    key: 'acceptTrade',
    value: function acceptTrade() {
      // sends info for backend process of transaction for trader
      this.props.completeTrade({
        offeredGame: this.props.offeredGame,
        requestedGame: this.props.requestedGame
      });

      this.props.removeRequest({
        requestedGameId: this.props.requestedGame.id,
        offeredGameId: this.props.offeredGame.id
      });

      // close modal after action
      this.toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'request-image' },
        _react2.default.createElement(
          'a',
          { onClick: this.toggleModal },
          _react2.default.createElement('img', { src: this.props.requestedGame.cover, alt: this.props.requestedGame.name }),
          _react2.default.createElement(
            'p',
            { className: this.setStatusBackgroundColor(this.props.status) },
            this.props.status
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal,
          {
            show: this.state.showModal,
            onHide: this.toggleModal
          },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            null,
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              this.props.requestedGame.name,
              _react2.default.createElement(
                'p',
                { className: 'status-text ' + this.setStatusBackgroundColor(this.props.status) },
                'Status: ',
                this.props.status
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'h2',
              { className: 'modal-message' },
              this.getStatusMessage()
            ),
            _react2.default.createElement(
              'p',
              { className: 'owner-text' },
              'Owner: ',
              this.props.requestedGame.owner
            ),
            _react2.default.createElement(
              'h3',
              { className: 'modal-sub-header' },
              'Your Request'
            ),
            _react2.default.createElement(_GameCard2.default, {
              cover: this.props.requestedGame.cover,
              name: this.props.requestedGame.name,
              summary: this.props.requestedGame.summary
            }),
            _react2.default.createElement(
              'h3',
              { className: 'modal-sub-header clear-fix' },
              'Your Offer'
            ),
            _react2.default.createElement(_GameCard2.default, {
              cover: this.props.offeredGame.cover,
              name: this.props.offeredGame.name,
              summary: this.props.offeredGame.summary
            })
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            this.getActionButtons(),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: this.toggleModal },
              'Close'
            )
          )
        )
      );
    }
  }]);

  return RequestItem;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    addGame: _gameActions.addGame,
    removeRequest: _requestActions.removeRequest,
    removeGame: _gameActions.removeGame,
    completeTrade: _gameActions.completeTrade,
    declineTrade: _requestActions.declineTrade
  }, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RequestItem);

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var OUTGOING = exports.OUTGOING = 'outgoing';
var INCOMING = exports.INCOMING = 'incoming';
var PENDING = exports.PENDING = 'Pending';
var ACCEPTED = exports.ACCEPTED = 'Accepted';
var DECLINED = exports.DECLINED = 'Declined';
var CANCELLED = exports.CANCELLED = 'Cancelled';
var CANCEL_TRADE = exports.CANCEL_TRADE = 'Cancel Offer';
var ACCEPT_TRADE = exports.ACCEPT_TRADE = 'Accept Trade';
var DECLINE_TRADE_OFFER = exports.DECLINE_TRADE_OFFER = 'Decline Trade';

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(65);

var _reactBootstrap = __webpack_require__(35);

var _reactRedux = __webpack_require__(91);

var _Menu = __webpack_require__(334);

var _Menu2 = _interopRequireDefault(_Menu);

var _GameRequestDescription = __webpack_require__(686);

var _GameRequestDescription2 = _interopRequireDefault(_GameRequestDescription);

var _GameRequestIcon = __webpack_require__(687);

var _GameRequestIcon2 = _interopRequireDefault(_GameRequestIcon);

var _gameActions = __webpack_require__(139);

var _requestActions = __webpack_require__(209);

var _GameCard = __webpack_require__(140);

var _GameCard2 = _interopRequireDefault(_GameCard);

var _BrowserSearchBar = __webpack_require__(688);

var _BrowserSearchBar2 = _interopRequireDefault(_BrowserSearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import GameRequestItem from './GameRequestItem';


var GameBrowser = function (_Component) {
  _inherits(GameBrowser, _Component);

  function GameBrowser(props) {
    _classCallCheck(this, GameBrowser);

    var _this = _possibleConstructorReturn(this, (GameBrowser.__proto__ || Object.getPrototypeOf(GameBrowser)).call(this, props));

    _this.state = {
      showModal: false,
      requestedGame: {},
      gameOffer: [],
      offeredGame: {},
      allGames: {}
    };

    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.addGameToOffer = _this.addGameToOffer.bind(_this);
    _this.sendRequest = _this.sendRequest.bind(_this);
    _this.fetchGames = _this.fetchGames.bind(_this);
    _this.getOfferedGameFromUserLib = _this.getOfferedGameFromUserLib.bind(_this);
    return _this;
  }

  _createClass(GameBrowser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getUserGames();
      this.fetchGames('nofilter');
    }
  }, {
    key: 'getRequestedGame',
    value: function getRequestedGame() {
      if (this.state.allGames[this.state.requestedGame] !== undefined) {
        return _react2.default.createElement(_GameRequestDescription2.default, {
          name: this.state.allGames[this.state.requestedGame].name,
          summary: this.state.allGames[this.state.requestedGame].summary,
          cover: this.state.allGames[this.state.requestedGame].cover,
          key: this.state.allGames[this.state.requestedGame].id,
          screenshots: this.state.allGames[this.state.requestedGame].screenshots,
          owner: this.state.allGames[this.state.requestedGame].owner
        });
      }
      return null;
    }

    // keep function for future feature (offering multiple games at once in trade)

  }, {
    key: 'getOfferedGameFromUserLib',
    value: function getOfferedGameFromUserLib() {
      var _this2 = this;

      var offGame = {};

      this.props.userGames.games.map(function (game) {
        if (game.id === _this2.state.offeredGame.id) {
          offGame = game;
        }
      });
      return offGame;
    }
  }, {
    key: 'sendRequest',
    value: function sendRequest() {
      this.props.addRequest([{
        status: 'Pending',
        requestedGame: this.state.allGames[this.state.requestedGame],
        offeredGame: this.state.gameOffer[0],
        path: 'outgoing'
      }]);

      var gameCollection = Object.assign({}, this.state.allGames);
      gameCollection[this.state.requestedGame].status = 'requested';

      // update allGame Collection and close modal
      this.setState({
        showModal: !this.state.showModal,
        allGames: gameCollection
      });
    }
  }, {
    key: 'addGameToOffer',
    value: function addGameToOffer(event) {
      var gamesToAdd = Array.from(this.state.gameOffer);

      // for only one game offer per trade
      this.props.userGames.games.map(function (game) {
        if (game.id.toString() === event.target.value) {
          gamesToAdd[0] = game;
        }
      });

      this.setState({
        gameOffer: gamesToAdd
      });
    }
  }, {
    key: 'fetchGames',
    value: function fetchGames(filter) {
      var _this3 = this;

      var retrievedGames = {};
      var searchFilter = filter.length === 0 ? 'nofilter' : filter;

      // get all Games
      fetch('/games/getAllGames/' + searchFilter, {
        method: 'GET',
        headers: { 'Content-Type': 'text/html' },
        credentials: 'include' // need for session info to persist
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (games) {
            games.forEach(function (game) {
              var retrievedGame = _defineProperty({}, game.id, {
                name: game.name,
                id: game.id,
                summary: game.summary,
                cover: game.cover,
                owner: game.owner,
                gameConsole: game.gameConsole,
                screenshots: game.screenshots
              });
              retrievedGames = Object.assign({}, retrievedGames, retrievedGame);
            });

            _this3.setState({
              allGames: retrievedGames
            });
          });
        }
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      var game = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState({
        showModal: !this.state.showModal,
        requestedGame: game
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Menu2.default, null),
        _react2.default.createElement(
          _reactBootstrap.Well,
          null,
          _react2.default.createElement(
            _reactBootstrap.Grid,
            null,
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6, xs: 12, md: 8 },
                _react2.default.createElement(
                  'h1',
                  { className: 'section-header' },
                  'Available Games'
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6, xs: 12, md: 4 },
                _react2.default.createElement(_BrowserSearchBar2.default, { fetchGames: this.fetchGames })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              { className: 'game-browser' },
              Object.keys(this.state.allGames).map(function (game, key) {
                return _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2, xs: 4, key: key },
                  _react2.default.createElement(
                    'div',
                    { className: 'game-container' },
                    _react2.default.createElement(
                      'a',
                      { onClick: _this4.toggleModal.bind(_this4, game) },
                      _react2.default.createElement(_GameRequestIcon2.default, {
                        name: _this4.state.allGames[game].name,
                        summary: _this4.state.allGames[game].summary,
                        status: 'available',
                        cover: _this4.state.allGames[game].cover,
                        key: key
                      })
                    )
                  )
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal,
          {
            show: this.state.showModal,
            onHide: this.toggleModal
          },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            null,
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'Request Trade'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'h2',
              { className: 'modal-sub-header' },
              'Requested Game'
            ),
            this.getRequestedGame(),
            _react2.default.createElement(
              'h2',
              { className: 'modal-sub-header' },
              'Your Offer'
            ),
            this.state.gameOffer.map(function (game, key) {
              return _react2.default.createElement(_GameCard2.default, {
                cover: game.cover,
                name: game.name,
                summary: game.summary,
                key: key
              });
            }),
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              { controlId: 'formControlsSelect' },
              _react2.default.createElement(
                _reactBootstrap.FormControl,
                {
                  onChange: this.addGameToOffer,
                  componentClass: 'select',
                  placeholder: 'select'
                },
                _react2.default.createElement(
                  'option',
                  null,
                  'Select Game'
                ),
                this.props.userGames.games.map(function (game) {
                  return _react2.default.createElement(
                    'option',
                    { value: game.id },
                    game.name
                  );
                })
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: this.toggleModal },
              'Close'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                className: 'accept-button',
                onClick: this.sendRequest
              },
              'Send Trade Request'
            )
          )
        )
      );
    }
  }]);

  return GameBrowser;
}(_react.Component);

function mapPropstoState(state) {
  return {
    userGames: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    addRequest: _requestActions.addRequest,
    getUserGames: _gameActions.getUserGames
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapPropstoState, mapDispatchToProps)(GameBrowser);

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

var _GameCard = __webpack_require__(140);

var _GameCard2 = _interopRequireDefault(_GameCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameRequestDescription = function (_Component) {
  _inherits(GameRequestDescription, _Component);

  function GameRequestDescription(props) {
    _classCallCheck(this, GameRequestDescription);

    var _this = _possibleConstructorReturn(this, (GameRequestDescription.__proto__ || Object.getPrototypeOf(GameRequestDescription)).call(this, props));

    _this.state = {
      index: 0,
      direction: null
    };

    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.getScreenShots = _this.getScreenShots.bind(_this);
    return _this;
  }

  _createClass(GameRequestDescription, [{
    key: 'getScreenShots',
    value: function getScreenShots() {
      var _this2 = this;

      if (this.props.screenshots.length > 0) {
        // checks if screenshots available
        return _react2.default.createElement(
          _reactBootstrap.Carousel,
          {
            activeIndex: this.state.index,
            direction: this.state.direction,
            onSelect: this.handleSelect
          },
          this.props.screenshots.map(function (screenshot) {
            return _react2.default.createElement(
              _reactBootstrap.Carousel.Item,
              { key: _this2.props.id },
              _react2.default.createElement('img', {
                width: 569,
                height: 320,
                src: screenshot,
                alt: _this2.props.name,
                key: _this2.props.id
              })
            );
          })
        );
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.getScreenShots(),
        _react2.default.createElement(_GameCard2.default, {
          cover: this.props.cover,
          name: this.props.name,
          summary: this.props.summary,
          owner: this.props.owner
        })
      );
    }
  }]);

  return GameRequestDescription;
}(_react.Component);

exports.default = GameRequestDescription;

/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameRequestIcon = function (_Component) {
  _inherits(GameRequestIcon, _Component);

  function GameRequestIcon() {
    _classCallCheck(this, GameRequestIcon);

    return _possibleConstructorReturn(this, (GameRequestIcon.__proto__ || Object.getPrototypeOf(GameRequestIcon)).apply(this, arguments));
  }

  _createClass(GameRequestIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Thumbnail,
          { src: this.props.cover, alt: this.props.name },
          _react2.default.createElement(
            'h5',
            { className: 'game-request-icon-caption' },
            this.props.name
          )
        )
      );
    }
  }]);

  return GameRequestIcon;
}(_react.Component);

exports.default = GameRequestIcon;

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrowserSearchBar = function (_Component) {
  _inherits(BrowserSearchBar, _Component);

  function BrowserSearchBar(props) {
    _classCallCheck(this, BrowserSearchBar);

    var _this = _possibleConstructorReturn(this, (BrowserSearchBar.__proto__ || Object.getPrototypeOf(BrowserSearchBar)).call(this, props));

    _this.state = {
      searchTerm: ''
    };

    _this.updateSearchTerm = _this.updateSearchTerm.bind(_this);
    _this.filterAvailableGames = _this.filterAvailableGames.bind(_this);
    return _this;
  }

  _createClass(BrowserSearchBar, [{
    key: 'updateSearchTerm',
    value: function updateSearchTerm(e) {
      this.setState({
        searchTerm: e.target.value
      });
    }
  }, {
    key: 'filterAvailableGames',
    value: function filterAvailableGames() {
      this.props.fetchGames(this.state.searchTerm);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'nav-search' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'primary', onClick: this.filterAvailableGames },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'search' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { sm: 10, xs: 10, md: 10 },
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            null,
            _react2.default.createElement(_reactBootstrap.FormControl, {
              onChange: this.updateSearchTerm,
              name: 'name',
              type: 'text',
              placeholder: 'Search Games'
            })
          )
        )
      );
    }
  }]);

  return BrowserSearchBar;
}(_react.Component);

exports.default = BrowserSearchBar;

/***/ }),

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(108);

var _reactBootstrap = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = {
      user: {
        username: '',
        password: ''
      },
      usernameHelp: '',
      passwordHelp: ''
    };

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.validateLogin = _this.validateLogin.bind(_this);
    _this.goToSignUp = _this.goToSignUp.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var loggedInUser = Object.assign({}, this.state.user);
      loggedInUser[e.target.name] = e.target.value;

      this.setState({
        user: loggedInUser,
        usernameHelp: '',
        passwordHelp: ''
      });
    }

    // client-side verification

  }, {
    key: 'validateLogin',
    value: function validateLogin() {
      // if username is filled
      if (this.state.user.username.length === 0) {
        this.setState({
          usernameHelp: 'Please enter a username.'
        });
        return false;
        // if password field is filled
      } else if (this.state.user.password.length === 0) {
        this.setState({
          passwordHelp: 'Please enter a password.'
        });
        return false;
      }

      // if validation check passes, send credentials to server
      return true;
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick() {
      var _this2 = this;

      if (this.validateLogin()) {
        fetch('/users/loginUser', {
          method: 'POST',
          credentials: 'include', // need to include this for session to persist in other routes
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.user)
        }).then(function (res) {
          if (res.ok) {
            res.json().then(function (redir) {
              if (redir.validation === 'valid') {
                _this2.props.setSessionUser(_this2.state.user.username);
                _this2.props.history.push(redir.redirect);
              } else {
                _this2.setState(_defineProperty({}, redir.field, redir.validation));
              }
            });
          }
        });
      }
    }
  }, {
    key: 'goToSignUp',
    value: function goToSignUp() {
      this.props.history.push('/Signup');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 12, xs: 12 },
            _react2.default.createElement(
              'div',
              { className: 'signup-page-image' },
              _react2.default.createElement(
                'h1',
                { className: 'signup-title' },
                'GameTrader'
              ),
              _react2.default.createElement(
                'h2',
                { className: 'signup-subtitle' },
                'Trade Your Games With Others and Game On.'
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'username',
                type: 'text',
                placeholder: 'Username',
                onChange: this.handleOnChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.usernameHelp
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                onChange: this.handleOnChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.passwordHelp
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'login-button request-accepted ', bsStyle: 'primary', onClick: this.handleOnClick },
              'Log in'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'signup-button', bsStyle: 'primary', onClick: this.goToSignUp },
              'Sign Up'
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;

/***/ }),

/***/ 690:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(108);

var _reactBootstrap = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_Component) {
  _inherits(SignUp, _Component);

  function SignUp(props) {
    _classCallCheck(this, SignUp);

    var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

    _this.state = {
      newUser: {
        username: '',
        password1: '',
        password2: '',
        email: '',
        city: '',
        state: ''
      },
      usernameHelp: '',
      password1Help: '',
      password2Help: '',
      emailHelp: '',
      cityHelp: '',
      stateHelp: ''

    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.sendUserInfoToDB = _this.sendUserInfoToDB.bind(_this);
    _this.validateSignUp = _this.validateSignUp.bind(_this);
    return _this;
  }

  _createClass(SignUp, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var user = Object.assign({}, this.state.newUser);
      user[event.target.name] = event.target.value;

      this.setState({
        newUser: user,
        usernameHelp: '',
        password1Help: '',
        password2Help: '',
        emailHelp: '',
        cityHelp: '',
        stateHelp: ''
      });
    }
  }, {
    key: 'checkLengthOfField',
    value: function checkLengthOfField(field) {
      if (field.length > 0) {
        return true;
      }
      return false;
    }

    // client-side verification

  }, {
    key: 'validateSignUp',
    value: function validateSignUp() {
      var _this2 = this;

      var user = this.state.newUser;

      // makes sure all fields are filled out with at least one characer
      Object.keys(user).map(function (field) {
        var help = field + 'Help';
        if (user[field].length === 0) {
          var fieldString = void 0;

          if (field.toString() === 'city') {
            fieldString = 'zip code';
          } else if (field.toString() !== 'password1' && field.toString() !== 'password2') {
            fieldString = field;
          } else {
            fieldString = 'password';
          }

          _this2.setState(_defineProperty({}, help, 'Please enter a valid ' + fieldString + '.'));

          return false;
        }
      });

      if (user.username.length < 2 || user.username.split(' ').length > 1) {
        this.setState({
          usernameHelp: 'Username must be at least 2 characters and contain no spaces.'
        });
        return false;
      }

      if (user.password1.length < 6 || user.password1.split(' ').length > 1) {
        this.setState({
          password1Help: 'Password must be at least 6 characters and contain no spaces.'
        });
        return false;
      }

      if (user.password2.length < 6) {
        this.setState({
          password2Help: 'Password must be at least 6 characters.'
        });
        return false;
      }

      if (user.password2 !== user.password1) {
        this.setState({
          password2Help: 'Passwords must match.'
        });
        return false;
      }

      if (!user.email.match(/^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}$/)) {
        this.setState({
          emailHelp: 'Please enter a valid email.'
        });
        return false;
      }

      if (!user.city.match(/^[0-9]{5}$/)) {
        this.setState({
          cityHelp: 'Please enter a valid zip code.'
        });
        return false;
      }

      return true;
    }
  }, {
    key: 'sendUserInfoToDB',
    value: function sendUserInfoToDB() {
      var _this3 = this;

      if (this.validateSignUp()) {
        fetch('/users/addUser', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.newUser)
        }).then(function (res) {
          if (res.ok) {
            res.json().then(function (result) {
              if (result.validation !== 'valid') {
                _this3.setState({
                  usernameHelp: result.validation
                });
              } else {
                _this3.props.setSessionUser(_this3.state.newUser.username);
                _this3.props.history.push(result.redirect);
              }
            });
          }
        }).catch(function (err) {
          return 'Error in sending data to server:' + err.message;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 12, xs: 12 },
            _react2.default.createElement(
              'div',
              { className: 'signup-page-image' },
              _react2.default.createElement(
                'h1',
                { className: 'signup-title' },
                'GameTrader'
              ),
              _react2.default.createElement(
                'h2',
                { className: 'signup-subtitle' },
                'Trade Your Games With Others and Game On.'
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'username',
                type: 'text',
                placeholder: 'Username',
                onChange: this.handleChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.usernameHelp
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'password1',
                type: 'password',
                placeholder: 'Password',
                onChange: this.handleChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.password1Help
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'password2',
                type: 'password',
                placeholder: 'Reenter Password',
                onChange: this.handleChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.password2Help
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'email',
                type: 'text',
                placeholder: 'Email',
                onChange: this.handleChange
              }),
              _react2.default.createElement(
                _reactBootstrap.HelpBlock,
                null,
                this.state.emailHelp
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 2, smOffset: 4, xs: 4, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, {
                name: 'city',
                type: 'text',
                placeholder: 'zip code',
                onChange: this.handleChange
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.HelpBlock,
              null,
              this.state.cityHelp
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 4, smOffset: 4, xs: 6, xsOffset: 3 },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'submit-new-user-button request-accepted', bsStyle: 'primary', onClick: this.sendUserInfoToDB },
              'Submit'
            )
          )
        )
      );
    }
  }]);

  return SignUp;
}(_react.Component);

exports.default = SignUp;

/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(65);

var _gameReducer = __webpack_require__(692);

var _requestReducer = __webpack_require__(693);

exports.default = (0, _redux.combineReducers)({ games: _gameReducer.gameReducer, requests: _requestReducer.requestReducer });

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameReducer = undefined;

var _actionTypes = __webpack_require__(337);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var gameReducer = exports.gameReducer = function gameReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { games: [] };
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ADD_GAME:
      // payload is the added game
      return { games: [].concat(_toConsumableArray(state.games), _toConsumableArray(action.payload)) };
    case _actionTypes.REMOVE_GAME:
      return { games: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.GET_USER_GAMES:
      // payload is collection of games retrieved from db
      return { games: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.COMPLETE_TRADE:
      // payload is collection of games retrieved from db
      return { games: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.CLEAR_USER_GAMES:
      // payload is empty set
      return { games: [] };
    default:
      return state;
  }
};

/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestReducer = undefined;

var _actionTypes = __webpack_require__(337);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ******* ADD REQUEST ****//
var requestReducer = exports.requestReducer = function requestReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { requests: [] };
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ADD_REQUEST:
      return { requests: [].concat(_toConsumableArray(state.requests), _toConsumableArray(action.payload)) };
    case _actionTypes.REMOVE_REQUEST:
      return { requests: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.GET_USER_REQUESTS:
      return { requests: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.DECLINE_TRADE:
      return { requests: [].concat(_toConsumableArray(action.payload)) };
    case _actionTypes.CLEAR_USER_REQUESTS:
      return { requests: [] };
    default:
      return state;
  }
};

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.connectAdvanced = exports.createProvider = exports.Provider = undefined;

var _Provider = __webpack_require__(486);

var _Provider2 = _interopRequireDefault(_Provider);

var _connectAdvanced = __webpack_require__(274);

var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

var _connect = __webpack_require__(490);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Provider = _Provider2.default;
exports.createProvider = _Provider.createProvider;
exports.connectAdvanced = _connectAdvanced2.default;
exports.connect = _connect2.default;

/***/ })

},[371]);