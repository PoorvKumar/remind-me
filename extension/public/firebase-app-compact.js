!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define(t)
      : ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).firebase =
          t());
})(this, function () {
  "use strict";
  var r = function (e, t) {
    return (r =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t)
          Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      })(e, t);
  };
  function e(e, a, s, c) {
    return new (s = s || Promise)(function (n, t) {
      function r(e) {
        try {
          o(c.next(e));
        } catch (e) {
          t(e);
        }
      }
      function i(e) {
        try {
          o(c.throw(e));
        } catch (e) {
          t(e);
        }
      }
      function o(e) {
        var t;
        e.done
          ? n(e.value)
          : ((t = e.value) instanceof s
              ? t
              : new s(function (e) {
                  e(t);
                })
            ).then(r, i);
      }
      o((c = c.apply(e, a || [])).next());
    });
  }
  function n(n, r) {
    var i,
      o,
      a,
      s = {
        label: 0,
        sent: function () {
          if (1 & a[0]) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      },
      e = { next: t(0), throw: t(1), return: t(2) };
    return (
      "function" == typeof Symbol &&
        (e[Symbol.iterator] = function () {
          return this;
        }),
      e
    );
    function t(t) {
      return function (e) {
        return (function (t) {
          if (i) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((i = 1),
                o &&
                  (a =
                    2 & t[0]
                      ? o.return
                      : t[0]
                        ? o.throw || ((a = o.return) && a.call(o), 0)
                        : o.next) &&
                  !(a = a.call(o, t[1])).done)
              )
                return a;
              switch (((o = 0), (t = a ? [2 & t[0], a.value] : t)[0])) {
                case 0:
                case 1:
                  a = t;
                  break;
                case 4:
                  return s.label++, { value: t[1], done: !1 };
                case 5:
                  s.label++, (o = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !(a = 0 < (a = s.trys).length && a[a.length - 1]) &&
                    (6 === t[0] || 2 === t[0])
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3]))) {
                    s.label = t[1];
                    break;
                  }
                  if (6 === t[0] && s.label < a[1]) {
                    (s.label = a[1]), (a = t);
                    break;
                  }
                  if (a && s.label < a[2]) {
                    (s.label = a[2]), s.ops.push(t);
                    break;
                  }
                  a[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              t = r.call(n, s);
            } catch (e) {
              (t = [6, e]), (o = 0);
            } finally {
              i = a = 0;
            }
          if (5 & t[0]) throw t[1];
          return { value: t[0] ? t[1] : void 0, done: !0 };
        })([t, e]);
      };
    }
  }
  function f(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      r = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return {
            value: (e = e && r >= e.length ? void 0 : e) && e[r++],
            done: !e,
          };
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined.",
    );
  }
  function u(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var r,
      i,
      o = n.call(e),
      a = [];
    try {
      for (; (void 0 === t || 0 < t--) && !(r = o.next()).done; )
        a.push(r.value);
    } catch (e) {
      i = { error: e };
    } finally {
      try {
        r && !r.done && (n = o.return) && n.call(o);
      } finally {
        if (i) throw i.error;
      }
    }
    return a;
  }
  function a(e, t) {
    for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
    return e;
  }
  function s(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
      case Date:
        return new Date(t.getTime());
      case Object:
        void 0 === e && (e = {});
        break;
      case Array:
        e = [];
        break;
      default:
        return t;
    }
    for (var n in t)
      t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = s(e[n], t[n]));
    return e;
  }
  var i =
    ((t.prototype.wrapCallback = function (n) {
      var r = this;
      return function (e, t) {
        e ? r.reject(e) : r.resolve(t),
          "function" == typeof n &&
            (r.promise.catch(function () {}), 1 === n.length ? n(e) : n(e, t));
      };
    }),
    t);
  function t() {
    var n = this;
    (this.reject = function () {}),
      (this.resolve = function () {}),
      (this.promise = new Promise(function (e, t) {
        (n.resolve = e), (n.reject = t);
      }));
  }
  var o,
    c = "FirebaseError",
    l =
      ((function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " +
              String(t) +
              " is not a constructor or null",
          );
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      })(p, (o = Error)),
      p);
  function p(e, t, n) {
    t = o.call(this, t) || this;
    return (
      (t.code = e),
      (t.customData = n),
      (t.name = c),
      Object.setPrototypeOf(t, p.prototype),
      Error.captureStackTrace && Error.captureStackTrace(t, h.prototype.create),
      t
    );
  }
  var h =
    ((d.prototype.create = function (e) {
      for (var t = [], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      var r,
        i = t[0] || {},
        o = this.service + "/" + e,
        e = this.errors[e],
        e = e
          ? ((r = i),
            e.replace(m, function (e, t) {
              var n = r[t];
              return null != n ? String(n) : "<" + t + "?>";
            }))
          : "Error",
        e = this.serviceName + ": " + e + " (" + o + ").";
      return new l(o, e, i);
    }),
    d);
  function d(e, t, n) {
    (this.service = e), (this.serviceName = t), (this.errors = n);
  }
  var m = /\{\$([^}]+)}/g;
  function v(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function g(e, t) {
    if (e === t) return 1;
    for (
      var n = Object.keys(e), r = Object.keys(t), i = 0, o = n;
      i < o.length;
      i++
    ) {
      var a = o[i];
      if (!r.includes(a)) return;
      var s = e[a],
        c = t[a];
      if (b(s) && b(c)) {
        if (!g(s, c)) return;
      } else if (s !== c) return;
    }
    for (var l = 0, p = r; l < p.length; l++) {
      a = p[l];
      if (!n.includes(a)) return;
    }
    return 1;
  }
  function b(e) {
    return null !== e && "object" == typeof e;
  }
  function y(e, t) {
    t = new I(e, t);
    return t.subscribe.bind(t);
  }
  var I =
    ((w.prototype.next = function (t) {
      this.forEachObserver(function (e) {
        e.next(t);
      });
    }),
    (w.prototype.error = function (t) {
      this.forEachObserver(function (e) {
        e.error(t);
      }),
        this.close(t);
    }),
    (w.prototype.complete = function () {
      this.forEachObserver(function (e) {
        e.complete();
      }),
        this.close();
    }),
    (w.prototype.subscribe = function (e, t, n) {
      var r,
        i = this;
      if (void 0 === e && void 0 === t && void 0 === n)
        throw new Error("Missing Observer.");
      void 0 ===
        (r = (function (e, t) {
          if ("object" != typeof e || null === e) return !1;
          for (var n = 0, r = t; n < r.length; n++) {
            var i = r[n];
            if (i in e && "function" == typeof e[i]) return !0;
          }
          return !1;
        })(e, ["next", "error", "complete"])
          ? e
          : { next: e, error: t, complete: n }).next && (r.next = E),
        void 0 === r.error && (r.error = E),
        void 0 === r.complete && (r.complete = E);
      n = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(function () {
            try {
              i.finalError ? r.error(i.finalError) : r.complete();
            } catch (e) {}
          }),
        this.observers.push(r),
        n
      );
    }),
    (w.prototype.unsubscribeOne = function (e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        --this.observerCount,
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }),
    (w.prototype.forEachObserver = function (e) {
      if (!this.finalized)
        for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e);
    }),
    (w.prototype.sendOne = function (e, t) {
      var n = this;
      this.task.then(function () {
        if (void 0 !== n.observers && void 0 !== n.observers[e])
          try {
            t(n.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }),
    (w.prototype.close = function (e) {
      var t = this;
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(function () {
          (t.observers = void 0), (t.onNoObservers = void 0);
        }));
    }),
    w);
  function w(e, t) {
    var n = this;
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(function () {
          e(n);
        })
        .catch(function (e) {
          n.error(e);
        });
  }
  function E() {}
  var _ =
    ((O.prototype.setInstantiationMode = function (e) {
      return (this.instantiationMode = e), this;
    }),
    (O.prototype.setMultipleInstances = function (e) {
      return (this.multipleInstances = e), this;
    }),
    (O.prototype.setServiceProps = function (e) {
      return (this.serviceProps = e), this;
    }),
    (O.prototype.setInstanceCreatedCallback = function (e) {
      return (this.onInstanceCreated = e), this;
    }),
    O);
  function O(e, t, n) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  var C = "[DEFAULT]",
    N =
      ((L.prototype.get = function (e) {
        var t = this.normalizeInstanceIdentifier(e);
        if (!this.instancesDeferred.has(t)) {
          e = new i();
          if (
            (this.instancesDeferred.set(t, e),
            this.isInitialized(t) || this.shouldAutoInitialize())
          )
            try {
              var n = this.getOrInitializeService({ instanceIdentifier: t });
              n && e.resolve(n);
            } catch (e) {}
        }
        return this.instancesDeferred.get(t).promise;
      }),
      (L.prototype.getImmediate = function (t) {
        var e = this.normalizeInstanceIdentifier(
            null == t ? void 0 : t.identifier,
          ),
          t =
            null !== (t = null == t ? void 0 : t.optional) && void 0 !== t && t;
        if (!this.isInitialized(e) && !this.shouldAutoInitialize()) {
          if (t) return null;
          throw Error("Service " + this.name + " is not available");
        }
        try {
          return this.getOrInitializeService({ instanceIdentifier: e });
        } catch (e) {
          if (t) return null;
          throw e;
        }
      }),
      (L.prototype.getComponent = function () {
        return this.component;
      }),
      (L.prototype.setComponent = function (e) {
        var t, n;
        if (e.name !== this.name)
          throw Error(
            "Mismatching Component " +
              e.name +
              " for Provider " +
              this.name +
              ".",
          );
        if (this.component)
          throw Error(
            "Component for " + this.name + " has already been provided",
          );
        if (((this.component = e), this.shouldAutoInitialize())) {
          if ("EAGER" === e.instantiationMode)
            try {
              this.getOrInitializeService({ instanceIdentifier: C });
            } catch (e) {}
          try {
            for (
              var r = f(this.instancesDeferred.entries()), i = r.next();
              !i.done;
              i = r.next()
            ) {
              var o = u(i.value, 2),
                a = o[0],
                s = o[1],
                c = this.normalizeInstanceIdentifier(a);
              try {
                var l = this.getOrInitializeService({ instanceIdentifier: c });
                s.resolve(l);
              } catch (e) {}
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              i && !i.done && (n = r.return) && n.call(r);
            } finally {
              if (t) throw t.error;
            }
          }
        }
      }),
      (L.prototype.clearInstance = function (e) {
        this.instancesDeferred.delete((e = void 0 === e ? C : e)),
          this.instancesOptions.delete(e),
          this.instances.delete(e);
      }),
      (L.prototype.delete = function () {
        return e(this, void 0, void 0, function () {
          var t;
          return n(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  (t = Array.from(this.instances.values())),
                  [
                    4,
                    Promise.all(
                      a(
                        a(
                          [],
                          u(
                            t
                              .filter(function (e) {
                                return "INTERNAL" in e;
                              })
                              .map(function (e) {
                                return e.INTERNAL.delete();
                              }),
                          ),
                        ),
                        u(
                          t
                            .filter(function (e) {
                              return "_delete" in e;
                            })
                            .map(function (e) {
                              return e._delete();
                            }),
                        ),
                      ),
                    ),
                  ]
                );
              case 1:
                return e.sent(), [2];
            }
          });
        });
      }),
      (L.prototype.isComponentSet = function () {
        return null != this.component;
      }),
      (L.prototype.isInitialized = function (e) {
        return this.instances.has((e = void 0 === e ? C : e));
      }),
      (L.prototype.getOptions = function (e) {
        return this.instancesOptions.get((e = void 0 === e ? C : e)) || {};
      }),
      (L.prototype.initialize = function (e) {
        var t,
          n,
          r = (e = void 0 === e ? {} : e).options,
          r = void 0 === r ? {} : r,
          i = this.normalizeInstanceIdentifier(e.instanceIdentifier);
        if (this.isInitialized(i))
          throw Error(this.name + "(" + i + ") has already been initialized");
        if (!this.isComponentSet())
          throw Error(
            "Component " + this.name + " has not been registered yet",
          );
        var o = this.getOrInitializeService({
          instanceIdentifier: i,
          options: r,
        });
        try {
          for (
            var a = f(this.instancesDeferred.entries()), s = a.next();
            !s.done;
            s = a.next()
          ) {
            var c = u(s.value, 2),
              l = c[0],
              p = c[1];
            i === this.normalizeInstanceIdentifier(l) && p.resolve(o);
          }
        } catch (e) {
          t = { error: e };
        } finally {
          try {
            s && !s.done && (n = a.return) && n.call(a);
          } finally {
            if (t) throw t.error;
          }
        }
        return o;
      }),
      (L.prototype.onInit = function (e, t) {
        var n = this.normalizeInstanceIdentifier(t),
          r =
            null !== (t = this.onInitCallbacks.get(n)) && void 0 !== t
              ? t
              : new Set();
        r.add(e), this.onInitCallbacks.set(n, r);
        t = this.instances.get(n);
        return (
          t && e(t, n),
          function () {
            r.delete(e);
          }
        );
      }),
      (L.prototype.invokeOnInitCallbacks = function (e, t) {
        var n,
          r,
          i = this.onInitCallbacks.get(t);
        if (i)
          try {
            for (var o = f(i), a = o.next(); !a.done; a = o.next()) {
              var s = a.value;
              try {
                s(e, t);
              } catch (e) {}
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              a && !a.done && (r = o.return) && r.call(o);
            } finally {
              if (n) throw n.error;
            }
          }
      }),
      (L.prototype.getOrInitializeService = function (e) {
        var t = e.instanceIdentifier,
          n = e.options,
          r = void 0 === n ? {} : n,
          e = this.instances.get(t);
        if (
          !e &&
          this.component &&
          ((e = this.component.instanceFactory(this.container, {
            instanceIdentifier: (n = t) === C ? void 0 : n,
            options: r,
          })),
          this.instances.set(t, e),
          this.instancesOptions.set(t, r),
          this.invokeOnInitCallbacks(e, t),
          this.component.onInstanceCreated)
        )
          try {
            this.component.onInstanceCreated(this.container, t, e);
          } catch (e) {}
        return e || null;
      }),
      (L.prototype.normalizeInstanceIdentifier = function (e) {
        return (
          void 0 === e && (e = C),
          !this.component || this.component.multipleInstances ? e : C
        );
      }),
      (L.prototype.shouldAutoInitialize = function () {
        return (
          !!this.component && "EXPLICIT" !== this.component.instantiationMode
        );
      }),
      L);
  function L(e, t) {
    (this.name = e),
      (this.container = t),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  var S =
    ((A.prototype.addComponent = function (e) {
      var t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          "Component " +
            e.name +
            " has already been registered with " +
            this.name,
        );
      t.setComponent(e);
    }),
    (A.prototype.addOrOverwriteComponent = function (e) {
      this.getProvider(e.name).isComponentSet() &&
        this.providers.delete(e.name),
        this.addComponent(e);
    }),
    (A.prototype.getProvider = function (e) {
      if (this.providers.has(e)) return this.providers.get(e);
      var t = new N(e, this);
      return this.providers.set(e, t), t;
    }),
    (A.prototype.getProviders = function () {
      return Array.from(this.providers.values());
    }),
    A);
  function A(e) {
    (this.name = e), (this.providers = new Map());
  }
  var D,
    R = [];
  ((F = D = D || {})[(F.DEBUG = 0)] = "DEBUG"),
    (F[(F.VERBOSE = 1)] = "VERBOSE"),
    (F[(F.INFO = 2)] = "INFO"),
    (F[(F.WARN = 3)] = "WARN"),
    (F[(F.ERROR = 4)] = "ERROR"),
    (F[(F.SILENT = 5)] = "SILENT");
  function P(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    if (!(t < e.logLevel)) {
      var i = new Date().toISOString(),
        o = z[t];
      if (!o)
        throw new Error(
          "Attempted to log a message with an invalid logType (value: " +
            t +
            ")",
        );
      console[o].apply(console, a(["[" + i + "]  " + e.name + ":"], n));
    }
  }
  var k = {
      debug: D.DEBUG,
      verbose: D.VERBOSE,
      info: D.INFO,
      warn: D.WARN,
      error: D.ERROR,
      silent: D.SILENT,
    },
    j = D.INFO,
    z =
      (((le = {})[D.DEBUG] = "log"),
      (le[D.VERBOSE] = "log"),
      (le[D.INFO] = "info"),
      (le[D.WARN] = "warn"),
      (le[D.ERROR] = "error"),
      le),
    F =
      (Object.defineProperty(T.prototype, "logLevel", {
        get: function () {
          return this._logLevel;
        },
        set: function (e) {
          if (!(e in D))
            throw new TypeError(
              'Invalid value "' + e + '" assigned to `logLevel`',
            );
          this._logLevel = e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (T.prototype.setLogLevel = function (e) {
        this._logLevel = "string" == typeof e ? k[e] : e;
      }),
      Object.defineProperty(T.prototype, "logHandler", {
        get: function () {
          return this._logHandler;
        },
        set: function (e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Value assigned to `logHandler` must be a function",
            );
          this._logHandler = e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(T.prototype, "userLogHandler", {
        get: function () {
          return this._userLogHandler;
        },
        set: function (e) {
          this._userLogHandler = e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (T.prototype.debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._userLogHandler &&
          this._userLogHandler.apply(this, a([this, D.DEBUG], e)),
          this._logHandler.apply(this, a([this, D.DEBUG], e));
      }),
      (T.prototype.log = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._userLogHandler &&
          this._userLogHandler.apply(this, a([this, D.VERBOSE], e)),
          this._logHandler.apply(this, a([this, D.VERBOSE], e));
      }),
      (T.prototype.info = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._userLogHandler &&
          this._userLogHandler.apply(this, a([this, D.INFO], e)),
          this._logHandler.apply(this, a([this, D.INFO], e));
      }),
      (T.prototype.warn = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._userLogHandler &&
          this._userLogHandler.apply(this, a([this, D.WARN], e)),
          this._logHandler.apply(this, a([this, D.WARN], e));
      }),
      (T.prototype.error = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._userLogHandler &&
          this._userLogHandler.apply(this, a([this, D.ERROR], e)),
          this._logHandler.apply(this, a([this, D.ERROR], e));
      }),
      T);
  function T(e) {
    (this.name = e),
      (this._logLevel = j),
      (this._logHandler = P),
      (this._userLogHandler = null),
      R.push(this);
  }
  function x(a, t) {
    for (var e = 0, n = R; e < n.length; e++)
      !(function (e) {
        var o = null;
        t && t.level && (o = k[t.level]),
          (e.userLogHandler =
            null === a
              ? null
              : function (e, t) {
                  for (var n = [], r = 2; r < arguments.length; r++)
                    n[r - 2] = arguments[r];
                  var i = n
                    .map(function (e) {
                      if (null == e) return null;
                      if ("string" == typeof e) return e;
                      if ("number" == typeof e || "boolean" == typeof e)
                        return e.toString();
                      if (e instanceof Error) return e.message;
                      try {
                        return JSON.stringify(e);
                      } catch (e) {
                        return null;
                      }
                    })
                    .filter(function (e) {
                      return e;
                    })
                    .join(" ");
                  t >= (null != o ? o : e.logLevel) &&
                    a({
                      level: D[t].toLowerCase(),
                      message: i,
                      args: n,
                      type: e.name,
                    });
                });
      })(n[e]);
  }
  class H {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      const e = this.container.getProviders();
      return e
        .map((e) => {
          if (
            (function (e) {
              e = e.getComponent();
              return "VERSION" === (null == e ? void 0 : e.type);
            })(e)
          ) {
            e = e.getImmediate();
            return `${e.library}/${e.version}`;
          }
          return null;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const $ = "@firebase/app",
    M = new F("@firebase/app");
  var B;
  const V = "[DEFAULT]",
    U = {
      "@firebase/app": "fire-core",
      "@firebase/app-compat": "fire-core-compat",
      "@firebase/analytics": "fire-analytics",
      "@firebase/analytics-compat": "fire-analytics-compat",
      "@firebase/app-check": "fire-app-check",
      "@firebase/app-check-compat": "fire-app-check-compat",
      "@firebase/auth": "fire-auth",
      "@firebase/auth-compat": "fire-auth-compat",
      "@firebase/database": "fire-rtdb",
      "@firebase/database-compat": "fire-rtdb-compat",
      "@firebase/functions": "fire-fn",
      "@firebase/functions-compat": "fire-fn-compat",
      "@firebase/installations": "fire-iid",
      "@firebase/installations-compat": "fire-iid-compat",
      "@firebase/messaging": "fire-fcm",
      "@firebase/messaging-compat": "fire-fcm-compat",
      "@firebase/performance": "fire-perf",
      "@firebase/performance-compat": "fire-perf-compat",
      "@firebase/remote-config": "fire-rc",
      "@firebase/remote-config-compat": "fire-rc-compat",
      "@firebase/storage": "fire-gcs",
      "@firebase/storage-compat": "fire-gcs-compat",
      "@firebase/firestore": "fire-fst",
      "@firebase/firestore-compat": "fire-fst-compat",
      "fire-js": "fire-js",
      firebase: "fire-js-all",
    },
    G = new Map(),
    W = new Map();
  function Y(t, n) {
    try {
      t.container.addComponent(n);
    } catch (e) {
      M.debug(
        `Component ${n.name} failed to register with FirebaseApp ${t.name}`,
        e,
      );
    }
  }
  function K(e, t) {
    e.container.addOrOverwriteComponent(t);
  }
  function J(e) {
    var t = e.name;
    if (W.has(t))
      return (
        M.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    W.set(t, e);
    for (const n of G.values()) Y(n, e);
    return !0;
  }
  function X(e, t) {
    return e.container.getProvider(t);
  }
  const Z = new h("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
  });
  class q {
    constructor(e, t, n) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = n),
        this.container.addComponent(new _("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
      return this.checkDestroyed(), this._name;
    }
    get options() {
      return this.checkDestroyed(), this._options;
    }
    get config() {
      return this.checkDestroyed(), this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw Z.create("app-deleted", { appName: this._name });
    }
  }
  const Q = "9.0.0";
  function ee(e, t = {}) {
    if ("object" != typeof t) {
      const r = t;
      t = { name: r };
    }
    var n = Object.assign({ name: V, automaticDataCollectionEnabled: !1 }, t);
    const r = n.name;
    if ("string" != typeof r || !r)
      throw Z.create("bad-app-name", { appName: String(r) });
    t = G.get(r);
    if (t) {
      if (g(e, t.options) && g(n, t.config)) return t;
      throw Z.create("duplicate-app", { appName: r });
    }
    const i = new S(r);
    for (const o of W.values()) i.addComponent(o);
    n = new q(e, n, i);
    return G.set(r, n), n;
  }
  async function te(e) {
    var t = e.name;
    G.has(t) &&
      (G.delete(t),
      await Promise.all(e.container.getProviders().map((e) => e.delete())),
      (e.isDeleted = !0));
  }
  function ne(e, t, n) {
    var r;
    let i = null !== (r = U[e]) && void 0 !== r ? r : e;
    n && (i += `-${n}`);
    (e = i.match(/\s|\//)), (n = t.match(/\s|\//));
    if (e || n) {
      const o = [`Unable to register library "${i}" with version "${t}":`];
      return (
        e &&
          o.push(
            `library name "${i}" contains illegal characters (whitespace or "/")`,
          ),
        e && n && o.push("and"),
        n &&
          o.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`,
          ),
        void M.warn(o.join(" "))
      );
    }
    J(new _(`${i}-version`, () => ({ library: i, version: t }), "VERSION"));
  }
  function re(e, t) {
    if (null !== e && "function" != typeof e)
      throw Z.create("invalid-log-argument");
    x(e, t);
  }
  function ie(e) {
    var t;
    (t = e),
      R.forEach(function (e) {
        e.setLogLevel(t);
      });
  }
  J(new _("platform-logger", (e) => new H(e), "PRIVATE")),
    ne($, "0.7.0", B),
    ne("fire-js", "");
  var oe = Object.freeze({
    __proto__: null,
    SDK_VERSION: Q,
    _DEFAULT_ENTRY_NAME: V,
    _addComponent: Y,
    _addOrOverwriteComponent: K,
    _apps: G,
    _clearComponents: function () {
      W.clear();
    },
    _components: W,
    _getProvider: X,
    _registerComponent: J,
    _removeServiceInstance: function (e, t, n = V) {
      X(e, t).clearInstance(n);
    },
    deleteApp: te,
    getApp: function (e = V) {
      var t = G.get(e);
      if (!t) throw Z.create("no-app", { appName: e });
      return t;
    },
    getApps: function () {
      return Array.from(G.values());
    },
    initializeApp: ee,
    onLog: re,
    registerVersion: ne,
    setLogLevel: ie,
    FirebaseError: l,
  });
  class ae {
    constructor(e, t) {
      (this._delegate = e),
        (this.firebase = t),
        Y(e, new _("app-compat", () => this, "PUBLIC")),
        (this.container = e.container);
    }
    get automaticDataCollectionEnabled() {
      return this._delegate.automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this._delegate.automaticDataCollectionEnabled = e;
    }
    get name() {
      return this._delegate.name;
    }
    get options() {
      return this._delegate.options;
    }
    delete() {
      return new Promise((e) => {
        this._delegate.checkDestroyed(), e();
      }).then(
        () => (this.firebase.INTERNAL.removeApp(this.name), te(this._delegate)),
      );
    }
    _getService(e, t = V) {
      this._delegate.checkDestroyed();
      const n = this._delegate.container.getProvider(e);
      return (
        n.isInitialized() ||
          "EXPLICIT" !==
            (null === (e = n.getComponent()) || void 0 === e
              ? void 0
              : e.instantiationMode) ||
          n.initialize(),
        n.getImmediate({ identifier: t })
      );
    }
    _removeServiceInstance(e, t = V) {
      this._delegate.container.getProvider(e).clearInstance(t);
    }
    _addComponent(e) {
      Y(this._delegate, e);
    }
    _addOrOverwriteComponent(e) {
      K(this._delegate, e);
    }
    toJSON() {
      return {
        name: this.name,
        automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
        options: this.options,
      };
    }
  }
  const se = new h("app-compat", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  });
  function ce(i) {
    const n = {},
      o = {
        __esModule: !0,
        initializeApp: function (e, t = {}) {
          e = ee(e, t);
          if (v(n, e.name)) return n[e.name];
          t = new i(e, o);
          return (n[e.name] = t);
        },
        app: a,
        registerVersion: ne,
        setLogLevel: ie,
        onLog: re,
        apps: null,
        SDK_VERSION: Q,
        INTERNAL: {
          registerComponent: function (n) {
            const r = n.name,
              t = r.replace("-compat", "");
            {
              var e;
              J(n) &&
                "PUBLIC" === n.type &&
                ((e = (e = a()) => {
                  if ("function" != typeof e[t])
                    throw se.create("invalid-app-argument", { appName: r });
                  return e[t]();
                }),
                void 0 !== n.serviceProps && s(e, n.serviceProps),
                (o[t] = e),
                (i.prototype[t] = function (...e) {
                  const t = this._getService.bind(this, r);
                  return t.apply(this, n.multipleInstances ? e : []);
                }));
            }
            return "PUBLIC" === n.type ? o[t] : null;
          },
          removeApp: function (e) {
            delete n[e];
          },
          useAsService: function (e, t) {
            if ("serverAuth" === t) return null;
            return t;
          },
          modularAPIs: oe,
        },
      };
    function a(e) {
      if (((e = e || V), !v(n, e))) throw se.create("no-app", { appName: e });
      return n[e];
    }
    return (
      (o.default = o),
      Object.defineProperty(o, "apps", {
        get: function () {
          return Object.keys(n).map((e) => n[e]);
        },
      }),
      (a.App = i),
      o
    );
  }
  var le = (function e() {
    const t = ce(ae);
    return (
      (t.INTERNAL = Object.assign(Object.assign({}, t.INTERNAL), {
        createFirebaseNamespace: e,
        extendNamespace: function (e) {
          s(t, e);
        },
        createSubscribe: y,
        ErrorFactory: h,
        deepExtend: s,
      })),
      t
    );
  })();
  const pe = new F("@firebase/app-compat");
  if (
    "object" == typeof self &&
    self.self === self &&
    void 0 !== self.firebase
  ) {
    pe.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);
    const ue = self.firebase.SDK_VERSION;
    ue &&
      0 <= ue.indexOf("LITE") &&
      pe.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `);
  }
  const fe = le;
  ne("@firebase/app-compat", "0.1.0", void 0);
  return fe.registerVersion("firebase", "9.0.0", "app-compat-cdn"), fe;
});
//# sourceMappingURL=firebase-app-compat.js.map
