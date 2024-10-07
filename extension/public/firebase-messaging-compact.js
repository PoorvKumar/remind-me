!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app-compat"), require("@firebase/app"))
    : "function" == typeof define && define.amd
      ? define(["@firebase/app-compat", "@firebase/app"], t)
      : t(
          (e = "undefined" != typeof globalThis ? globalThis : e || self)
            .firebase,
          e.firebase.INTERNAL.modularAPIs,
        );
})(this, function (qt, Lt) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var t = e(qt),
        i = function (e, t) {
          return (i =
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
      var o,
        a = "FirebaseError",
        r =
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
            i(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((n.prototype = t.prototype), new n()));
          })(s, (o = Error)),
          s);
      function s(e, t, n) {
        t = o.call(this, t) || this;
        return (
          (t.code = e),
          (t.customData = n),
          (t.name = a),
          Object.setPrototypeOf(t, s.prototype),
          Error.captureStackTrace &&
            Error.captureStackTrace(t, c.prototype.create),
          t
        );
      }
      var c =
        ((n.prototype.create = function (e) {
          for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
          var i,
            o = t[0] || {},
            a = this.service + "/" + e,
            e = this.errors[e],
            e = e
              ? ((i = o),
                e.replace(u, function (e, t) {
                  var n = i[t];
                  return null != n ? String(n) : "<" + t + "?>";
                }))
              : "Error",
            e = this.serviceName + ": " + e + " (" + a + ").";
          return new r(a, e, o);
        }),
        n);
      function n(e, t, n) {
        (this.service = e), (this.serviceName = t), (this.errors = n);
      }
      var u = /\{\$([^}]+)}/g;
      function p(e) {
        return e && e._delegate ? e._delegate : e;
      }
      var d =
        ((l.prototype.setInstantiationMode = function (e) {
          return (this.instantiationMode = e), this;
        }),
        (l.prototype.setMultipleInstances = function (e) {
          return (this.multipleInstances = e), this;
        }),
        (l.prototype.setServiceProps = function (e) {
          return (this.serviceProps = e), this;
        }),
        (l.prototype.setInstanceCreatedCallback = function (e) {
          return (this.onInstanceCreated = e), this;
        }),
        l);
      function l(e, t, n) {
        (this.name = e),
          (this.instanceFactory = t),
          (this.type = n),
          (this.multipleInstances = !1),
          (this.serviceProps = {}),
          (this.instantiationMode = "LAZY"),
          (this.onInstanceCreated = null);
      }
      function f(n) {
        return new Promise(function (e, t) {
          (n.onsuccess = function () {
            e(n.result);
          }),
            (n.onerror = function () {
              t(n.error);
            });
        });
      }
      function g(n, i, o) {
        var a,
          e = new Promise(function (e, t) {
            f((a = n[i].apply(n, o))).then(e, t);
          });
        return (e.request = a), e;
      }
      function h(e, n, t) {
        t.forEach(function (t) {
          Object.defineProperty(e.prototype, t, {
            get: function () {
              return this[n][t];
            },
            set: function (e) {
              this[n][t] = e;
            },
          });
        });
      }
      function w(t, n, i, e) {
        e.forEach(function (e) {
          e in i.prototype &&
            (t.prototype[e] = function () {
              return g(this[n], e, arguments);
            });
        });
      }
      function y(t, n, i, e) {
        e.forEach(function (e) {
          e in i.prototype &&
            (t.prototype[e] = function () {
              return this[n][e].apply(this[n], arguments);
            });
        });
      }
      function m(e, i, t, n) {
        n.forEach(function (n) {
          n in t.prototype &&
            (e.prototype[n] = function () {
              return (
                (e = this[i]),
                (t = g(e, n, arguments)).then(function (e) {
                  if (e) return new v(e, t.request);
                })
              );
              var e, t;
            });
        });
      }
      function b(e) {
        this._index = e;
      }
      function v(e, t) {
        (this._cursor = e), (this._request = t);
      }
      function k(e) {
        this._store = e;
      }
      function I(n) {
        (this._tx = n),
          (this.complete = new Promise(function (e, t) {
            (n.oncomplete = function () {
              e();
            }),
              (n.onerror = function () {
                t(n.error);
              }),
              (n.onabort = function () {
                t(n.error);
              });
          }));
      }
      function S(e, t, n) {
        (this._db = e), (this.oldVersion = t), (this.transaction = new I(n));
      }
      function _(e) {
        this._db = e;
      }
      function T(e, t, n) {
        var t = g(indexedDB, "open", [e, t]),
          i = t.request;
        return (
          i &&
            (i.onupgradeneeded = function (e) {
              n && n(new S(i.result, e.oldVersion, i.transaction));
            }),
          t.then(function (e) {
            return new _(e);
          })
        );
      }
      function C(e) {
        return g(indexedDB, "deleteDatabase", [e]);
      }
      h(b, "_index", ["name", "keyPath", "multiEntry", "unique"]),
        w(b, "_index", IDBIndex, [
          "get",
          "getKey",
          "getAll",
          "getAllKeys",
          "count",
        ]),
        m(b, "_index", IDBIndex, ["openCursor", "openKeyCursor"]),
        h(v, "_cursor", ["direction", "key", "primaryKey", "value"]),
        w(v, "_cursor", IDBCursor, ["update", "delete"]),
        ["advance", "continue", "continuePrimaryKey"].forEach(function (n) {
          n in IDBCursor.prototype &&
            (v.prototype[n] = function () {
              var t = this,
                e = arguments;
              return Promise.resolve().then(function () {
                return (
                  t._cursor[n].apply(t._cursor, e),
                  f(t._request).then(function (e) {
                    if (e) return new v(e, t._request);
                  })
                );
              });
            });
        }),
        (k.prototype.createIndex = function () {
          return new b(this._store.createIndex.apply(this._store, arguments));
        }),
        (k.prototype.index = function () {
          return new b(this._store.index.apply(this._store, arguments));
        }),
        h(k, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]),
        w(k, "_store", IDBObjectStore, [
          "put",
          "add",
          "delete",
          "clear",
          "get",
          "getAll",
          "getKey",
          "getAllKeys",
          "count",
        ]),
        m(k, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]),
        y(k, "_store", IDBObjectStore, ["deleteIndex"]),
        (I.prototype.objectStore = function () {
          return new k(this._tx.objectStore.apply(this._tx, arguments));
        }),
        h(I, "_tx", ["objectStoreNames", "mode"]),
        y(I, "_tx", IDBTransaction, ["abort"]),
        (S.prototype.createObjectStore = function () {
          return new k(this._db.createObjectStore.apply(this._db, arguments));
        }),
        h(S, "_db", ["name", "version", "objectStoreNames"]),
        y(S, "_db", IDBDatabase, ["deleteObjectStore", "close"]),
        (_.prototype.transaction = function () {
          return new I(this._db.transaction.apply(this._db, arguments));
        }),
        h(_, "_db", ["name", "version", "objectStoreNames"]),
        y(_, "_db", IDBDatabase, ["close"]),
        ["openCursor", "openKeyCursor"].forEach(function (o) {
          [k, b].forEach(function (e) {
            o in e.prototype &&
              (e.prototype[o.replace("open", "iterate")] = function () {
                var e = ((n = arguments), Array.prototype.slice.call(n)),
                  t = e[e.length - 1],
                  n = this._store || this._index,
                  i = n[o].apply(n, e.slice(0, -1));
                i.onsuccess = function () {
                  t(i.result);
                };
              });
          });
        }),
        [b, k].forEach(function (e) {
          e.prototype.getAll ||
            (e.prototype.getAll = function (e, n) {
              var i = this,
                o = [];
              return new Promise(function (t) {
                i.iterateCursor(e, function (e) {
                  e
                    ? (o.push(e.value),
                      void 0 === n || o.length != n ? e.continue() : t(o))
                    : t(o);
                });
              });
            });
        });
      var O = "0.5.0";
      const j = 1e4,
        D = `w:${O}`,
        P = "FIS_v2",
        A = "https://firebaseinstallations.googleapis.com/v1",
        E = 36e5;
      var K, M, N;
      const x = new c("installations", "Installations", {
        "missing-app-config-values":
          'Missing App configuration value: "{$valueName}"',
        "not-registered": "Firebase Installation is not registered.",
        "installation-not-found": "Firebase Installation not found.",
        "request-failed":
          '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        "app-offline": "Could not process request. Application offline.",
        "delete-pending-registration":
          "Can't delete installation while there is a pending registration request.",
      });
      function B(e) {
        return e instanceof r && e.code.includes("request-failed");
      }
      function $({ projectId: e }) {
        return `${A}/projects/${e}/installations`;
      }
      function F(e) {
        return {
          token: e.token,
          requestStatus: 2,
          expiresIn: ((e = e.expiresIn), Number(e.replace("s", "000"))),
          creationTime: Date.now(),
        };
      }
      async function q(e, t) {
        t = (await t.json()).error;
        return x.create("request-failed", {
          requestName: e,
          serverCode: t.code,
          serverMessage: t.message,
          serverStatus: t.status,
        });
      }
      function L({ apiKey: e }) {
        return new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-goog-api-key": e,
        });
      }
      function R(e, { refreshToken: t }) {
        const n = L(e);
        return n.append("Authorization", ((t = t), `${P} ${t}`)), n;
      }
      async function V(e) {
        var t = await e();
        return 500 <= t.status && t.status < 600 ? e() : t;
      }
      function H(t) {
        return new Promise((e) => {
          setTimeout(e, t);
        });
      }
      const W = /^[cdef][\w-]{21}$/,
        U = "";
      function G() {
        try {
          const t = new Uint8Array(17),
            n = self.crypto || self.msCrypto;
          n.getRandomValues(t), (t[0] = 112 + (t[0] % 16));
          var e = (function (e) {
            const t = (function (e) {
              const t = btoa(String.fromCharCode(...e));
              return t.replace(/\+/g, "-").replace(/\//g, "_");
            })(e);
            return t.substr(0, 22);
          })(t);
          return W.test(e) ? e : U;
        } catch (e) {
          return U;
        }
      }
      function J(e) {
        return `${e.appName}!${e.appId}`;
      }
      const z = new Map();
      function Y(e, t) {
        e = J(e);
        Q(e, t),
          (function (e, t) {
            const n = (function () {
              !Z &&
                "BroadcastChannel" in self &&
                ((Z = new BroadcastChannel("[Firebase] FID Change")),
                (Z.onmessage = (e) => {
                  Q(e.data.key, e.data.fid);
                }));
              return Z;
            })();
            n && n.postMessage({ key: e, fid: t });
            0 === z.size && Z && (Z.close(), (Z = null));
          })(e, t);
      }
      function Q(e, t) {
        e = z.get(e);
        if (e) for (const n of e) n(t);
      }
      let Z = null;
      const X = "firebase-installations-database",
        ee = 1,
        te = "firebase-installations-store";
      let ne = null;
      function ie() {
        return (
          (ne =
            ne ||
            T(X, ee, (e) => {
              0 === e.oldVersion && e.createObjectStore(te);
            })),
          ne
        );
      }
      async function oe(e, t) {
        var n = J(e);
        const i = await ie(),
          o = i.transaction(te, "readwrite"),
          a = o.objectStore(te);
        var r = await a.get(n);
        return (
          await a.put(t, n),
          await o.complete,
          (r && r.fid === t.fid) || Y(e, t.fid),
          t
        );
      }
      async function ae(e) {
        e = J(e);
        const t = await ie(),
          n = t.transaction(te, "readwrite");
        await n.objectStore(te).delete(e), await n.complete;
      }
      async function re(e, t) {
        var n = J(e);
        const i = await ie(),
          o = i.transaction(te, "readwrite"),
          a = o.objectStore(te);
        var r = await a.get(n),
          t = t(r);
        return (
          void 0 === t ? await a.delete(n) : await a.put(t, n),
          await o.complete,
          !t || (r && r.fid === t.fid) || Y(e, t.fid),
          t
        );
      }
      async function se(t) {
        let n;
        var e = await re(t, (e) => {
          (e = (function (e) {
            e = e || { fid: G(), registrationStatus: 0 };
            return ue(e);
          })(e)),
            (e = (function (e, t) {
              {
                if (0 !== t.registrationStatus)
                  return 1 === t.registrationStatus
                    ? {
                        installationEntry: t,
                        registrationPromise: (async function (e) {
                          let t = await ce(e);
                          for (; 1 === t.registrationStatus; )
                            await H(100), (t = await ce(e));
                          if (0 !== t.registrationStatus) return t;
                          {
                            var {
                              installationEntry: n,
                              registrationPromise: i,
                            } = await se(e);
                            return i || n;
                          }
                        })(e),
                      }
                    : { installationEntry: t };
                if (!navigator.onLine) {
                  var n = Promise.reject(x.create("app-offline"));
                  return { installationEntry: t, registrationPromise: n };
                }
                (t = {
                  fid: t.fid,
                  registrationStatus: 1,
                  registrationTime: Date.now(),
                }),
                  (e = (async function (t, n) {
                    try {
                      var e = await (async function (e, { fid: t }) {
                        const n = $(e);
                        var i = L(e),
                          e = {
                            fid: t,
                            authVersion: P,
                            appId: e.appId,
                            sdkVersion: D,
                          };
                        const o = {
                            method: "POST",
                            headers: i,
                            body: JSON.stringify(e),
                          },
                          a = await V(() => fetch(n, o));
                        if (a.ok) {
                          e = await a.json();
                          return {
                            fid: e.fid || t,
                            registrationStatus: 2,
                            refreshToken: e.refreshToken,
                            authToken: F(e.authToken),
                          };
                        }
                        throw await q("Create Installation", a);
                      })(t, n);
                      return oe(t, e);
                    } catch (e) {
                      throw (
                        (B(e) && 409 === e.customData.serverCode
                          ? await ae(t)
                          : await oe(t, { fid: n.fid, registrationStatus: 0 }),
                        e)
                      );
                    }
                  })(e, t));
                return { installationEntry: t, registrationPromise: e };
              }
            })(t, e));
          return (n = e.registrationPromise), e.installationEntry;
        });
        return e.fid === U
          ? { installationEntry: await n }
          : { installationEntry: e, registrationPromise: n };
      }
      function ce(e) {
        return re(e, (e) => {
          if (!e) throw x.create("installation-not-found");
          return ue(e);
        });
      }
      function ue(e) {
        return 1 === (t = e).registrationStatus &&
          t.registrationTime + j < Date.now()
          ? { fid: e.fid, registrationStatus: 0 }
          : e;
        var t;
      }
      async function pe({ appConfig: e, platformLoggerProvider: t }, n) {
        const i =
          (([o, { fid: a }] = [e, n]), `${$(o)}/${a}/authTokens:generate`);
        var o, a;
        const r = R(e, n),
          s = t.getImmediate({ optional: !0 });
        s && r.append("x-firebase-client", s.getPlatformInfoString());
        t = { installation: { sdkVersion: D } };
        const c = { method: "POST", headers: r, body: JSON.stringify(t) },
          u = await V(() => fetch(i, c));
        if (u.ok) return F(await u.json());
        throw await q("Generate Auth Token", u);
      }
      async function de(i, o = !1) {
        let a;
        var e = await re(i.appConfig, (e) => {
          if (!fe(e)) throw x.create("not-registered");
          var t,
            n = e.authToken;
          if (
            o ||
            2 !== (t = n).requestStatus ||
            (function (e) {
              var t = Date.now();
              return t < e.creationTime || e.creationTime + e.expiresIn < t + E;
            })(t)
          ) {
            if (1 === n.requestStatus)
              return (
                (a = (async function (e, t) {
                  let n = await le(e.appConfig);
                  for (; 1 === n.authToken.requestStatus; )
                    await H(100), (n = await le(e.appConfig));
                  var i = n.authToken;
                  return 0 === i.requestStatus ? de(e, t) : i;
                })(i, o)),
                e
              );
            if (!navigator.onLine) throw x.create("app-offline");
            n =
              ((t = e),
              (n = { requestStatus: 1, requestTime: Date.now() }),
              Object.assign(Object.assign({}, t), { authToken: n }));
            return (
              (a = (async function (t, n) {
                try {
                  var e = await pe(t, n),
                    i = Object.assign(Object.assign({}, n), { authToken: e });
                  return await oe(t.appConfig, i), e;
                } catch (e) {
                  throw (
                    (!B(e) ||
                    (401 !== e.customData.serverCode &&
                      404 !== e.customData.serverCode)
                      ? ((n = Object.assign(Object.assign({}, n), {
                          authToken: { requestStatus: 0 },
                        })),
                        await oe(t.appConfig, n))
                      : await ae(t.appConfig),
                    e)
                  );
                }
              })(i, n)),
              n
            );
          }
          return e;
        });
        return a ? await a : e.authToken;
      }
      function le(e) {
        return re(e, (e) => {
          if (!fe(e)) throw x.create("not-registered");
          var t = e.authToken;
          return 1 === (t = t).requestStatus && t.requestTime + j < Date.now()
            ? Object.assign(Object.assign({}, e), {
                authToken: { requestStatus: 0 },
              })
            : e;
        });
      }
      function fe(e) {
        return void 0 !== e && 2 === e.registrationStatus;
      }
      async function ge(e, t = !1) {
        return (
          await (async function (e) {
            var { registrationPromise: e } = await se(e);
            e && (await e);
          })(e.appConfig),
          (await de(e, t)).token
        );
      }
      function he(e) {
        return x.create("missing-app-config-values", { valueName: e });
      }
      const we = "installations";
      Lt._registerComponent(
        new d(
          we,
          (e) => {
            e = e.getProvider("app").getImmediate();
            return {
              app: e,
              appConfig: (function (e) {
                if (!e || !e.options) throw he("App Configuration");
                if (!e.name) throw he("App Name");
                for (const t of ["projectId", "apiKey", "appId"])
                  if (!e.options[t]) throw he(t);
                return {
                  appName: e.name,
                  projectId: e.options.projectId,
                  apiKey: e.options.apiKey,
                  appId: e.options.appId,
                };
              })(e),
              platformLoggerProvider: Lt._getProvider(e, "platform-logger"),
              _delete: () => Promise.resolve(),
            };
          },
          "PUBLIC",
        ),
      ),
        Lt._registerComponent(
          new d(
            "installations-internal",
            (e) => {
              e = e.getProvider("app").getImmediate();
              const t = Lt._getProvider(e, we).getImmediate();
              return {
                getId: () =>
                  (async function (e) {
                    const { installationEntry: t, registrationPromise: n } =
                      await se(e.appConfig);
                    return (n || de(e)).catch(console.error), t.fid;
                  })(t),
                getToken: (e) => ge(t, e),
              };
            },
            "PRIVATE",
          ),
        ),
        Lt.registerVersion("@firebase/installations", O);
      const ye = "/firebase-messaging-sw.js",
        me = "/firebase-cloud-messaging-push-scope",
        be =
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
        ve = "https://fcmregistrations.googleapis.com/v1",
        ke = "google.c.a.c_id",
        Ie = "google.c.a.c_l",
        Se = "google.c.a.ts";
      function _e(e) {
        e = new Uint8Array(e);
        const t = btoa(String.fromCharCode(...e));
        return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      ((O = {})[(O.DATA_MESSAGE = 1)] = "DATA_MESSAGE"),
        (O[(O.DISPLAY_NOTIFICATION = 3)] = "DISPLAY_NOTIFICATION"),
        ((O = K = K || {}).PUSH_RECEIVED = "push-received"),
        (O.NOTIFICATION_CLICKED = "notification-clicked");
      const Te = "fcm_token_details_db",
        Ce = 5,
        Oe = "fcm_token_object_Store";
      async function je(a) {
        if ("databases" in indexedDB) {
          const t = await indexedDB.databases(),
            n = t.map((e) => e.name);
          if (!n.includes(Te)) return null;
        }
        let r = null;
        const e = await T(Te, Ce, async (e) => {
          var t;
          if (!(e.oldVersion < 2) && e.objectStoreNames.contains(Oe)) {
            const o = e.transaction.objectStore(Oe);
            var n,
              i = await o.index("fcmSenderId").get(a);
            await o.clear(),
              i &&
                (2 === e.oldVersion
                  ? (n = i).auth &&
                    n.p256dh &&
                    n.endpoint &&
                    (r = {
                      token: n.fcmToken,
                      createTime:
                        null !== (t = n.createTime) && void 0 !== t
                          ? t
                          : Date.now(),
                      subscriptionOptions: {
                        auth: n.auth,
                        p256dh: n.p256dh,
                        endpoint: n.endpoint,
                        swScope: n.swScope,
                        vapidKey:
                          "string" == typeof n.vapidKey
                            ? n.vapidKey
                            : _e(n.vapidKey),
                      },
                    })
                  : 3 === e.oldVersion
                    ? ((n = i),
                      (r = {
                        token: n.fcmToken,
                        createTime: n.createTime,
                        subscriptionOptions: {
                          auth: _e(n.auth),
                          p256dh: _e(n.p256dh),
                          endpoint: n.endpoint,
                          swScope: n.swScope,
                          vapidKey: _e(n.vapidKey),
                        },
                      }))
                    : 4 === e.oldVersion &&
                      ((i = i),
                      (r = {
                        token: i.fcmToken,
                        createTime: i.createTime,
                        subscriptionOptions: {
                          auth: _e(i.auth),
                          p256dh: _e(i.p256dh),
                          endpoint: i.endpoint,
                          swScope: i.swScope,
                          vapidKey: _e(i.vapidKey),
                        },
                      })));
          }
        });
        return (
          e.close(),
          await C(Te),
          await C("fcm_vapid_details_db"),
          await C("undefined"),
          (function (e) {
            if (!e || !e.subscriptionOptions) return !1;
            var { subscriptionOptions: t } = e;
            return (
              "number" == typeof e.createTime &&
              0 < e.createTime &&
              "string" == typeof e.token &&
              0 < e.token.length &&
              "string" == typeof t.auth &&
              0 < t.auth.length &&
              "string" == typeof t.p256dh &&
              0 < t.p256dh.length &&
              "string" == typeof t.endpoint &&
              0 < t.endpoint.length &&
              "string" == typeof t.swScope &&
              0 < t.swScope.length &&
              "string" == typeof t.vapidKey &&
              0 < t.vapidKey.length
            );
          })(r)
            ? r
            : null
        );
      }
      const De = "firebase-messaging-database",
        Pe = 1,
        Ae = "firebase-messaging-store";
      let Ee = null;
      function Ke() {
        return (
          (Ee =
            Ee ||
            T(De, Pe, (e) => {
              0 === e.oldVersion && e.createObjectStore(Ae);
            })),
          Ee
        );
      }
      async function Me(e) {
        var t = xe(e);
        const n = await Ke();
        t = await n.transaction(Ae).objectStore(Ae).get(t);
        if (t) return t;
        t = await je(e.appConfig.senderId);
        return t ? (await Ne(e, t), t) : void 0;
      }
      async function Ne(e, t) {
        e = xe(e);
        const n = await Ke(),
          i = n.transaction(Ae, "readwrite");
        return await i.objectStore(Ae).put(t, e), await i.complete, t;
      }
      function xe({ appConfig: e }) {
        return e.appId;
      }
      const Be = new c("messaging", "Messaging", {
        "missing-app-config-values":
          'Missing App configuration value: "{$valueName}"',
        "only-available-in-window":
          "This method is available in a Window context.",
        "only-available-in-sw":
          "This method is available in a service worker context.",
        "permission-default":
          "The notification permission was not granted and dismissed instead.",
        "permission-blocked":
          "The notification permission was not granted and blocked instead.",
        "unsupported-browser":
          "This browser doesn't support the API's required to use the firebase SDK.",
        "indexed-db-unsupported":
          "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
        "failed-service-worker-registration":
          "We are unable to register the default service worker. {$browserErrorMessage}",
        "token-subscribe-failed":
          "A problem occurred while subscribing the user to FCM: {$errorInfo}",
        "token-subscribe-no-token":
          "FCM returned no token when subscribing the user to push.",
        "token-unsubscribe-failed":
          "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
        "token-update-failed":
          "A problem occurred while updating the user from FCM: {$errorInfo}",
        "token-update-no-token":
          "FCM returned no token when updating the user to push.",
        "use-sw-after-get-token":
          "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
        "invalid-sw-registration":
          "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
        "invalid-bg-handler":
          "The input to setBackgroundMessageHandler() must be a function.",
        "invalid-vapid-key": "The public VAPID key must be a string.",
        "use-vapid-key-after-get-token":
          "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",
      });
      async function $e(e, t) {
        var n = { method: "DELETE", headers: await qe(e) };
        try {
          const a = await fetch(`${Fe(e.appConfig)}/${t}`, n);
          var i = await a.json();
          if (i.error) {
            var o = i.error.message;
            throw Be.create("token-unsubscribe-failed", { errorInfo: o });
          }
        } catch (e) {
          throw Be.create("token-unsubscribe-failed", { errorInfo: e });
        }
      }
      function Fe({ projectId: e }) {
        return `${ve}/projects/${e}/registrations`;
      }
      async function qe({ appConfig: e, installations: t }) {
        t = await t.getToken();
        return new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-goog-api-key": e.apiKey,
          "x-goog-firebase-installations-auth": `FIS ${t}`,
        });
      }
      function Le({ p256dh: e, auth: t, endpoint: n, vapidKey: i }) {
        const o = { web: { endpoint: n, auth: t, p256dh: e } };
        return i !== be && (o.web.applicationPubKey = i), o;
      }
      const Re = 6048e5;
      async function Ve(e) {
        const t = await (async function (e, t) {
          var n = await e.pushManager.getSubscription();
          if (n) return n;
          return e.pushManager.subscribe({
            userVisibleOnly: !0,
            applicationServerKey: (function (e) {
              e = (e + "=".repeat((4 - (e.length % 4)) % 4))
                .replace(/\-/g, "+")
                .replace(/_/g, "/");
              const t = atob(e),
                n = new Uint8Array(t.length);
              for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e);
              return n;
            })(t),
          });
        })(e.swRegistration, e.vapidKey);
        var n,
          i,
          o,
          a,
          r = {
            vapidKey: e.vapidKey,
            swScope: e.swRegistration.scope,
            endpoint: t.endpoint,
            auth: _e(t.getKey("auth")),
            p256dh: _e(t.getKey("p256dh")),
          },
          s = await Me(e.firebaseDependencies);
        if (s) {
          if (
            ((n = s.subscriptionOptions),
            (i = r.vapidKey === n.vapidKey),
            (o = r.endpoint === n.endpoint),
            (a = r.auth === n.auth),
            (n = r.p256dh === n.p256dh),
            i && o && a && n)
          )
            return Date.now() >= s.createTime + Re
              ? (async function (t, e) {
                  try {
                    var n = await (async function (e, t) {
                        var n = await qe(e),
                          i = Le(t.subscriptionOptions),
                          i = {
                            method: "PATCH",
                            headers: n,
                            body: JSON.stringify(i),
                          };
                        let o;
                        try {
                          const a = await fetch(
                            `${Fe(e.appConfig)}/${t.token}`,
                            i,
                          );
                          o = await a.json();
                        } catch (e) {
                          throw Be.create("token-update-failed", {
                            errorInfo: e,
                          });
                        }
                        if (o.error) {
                          i = o.error.message;
                          throw Be.create("token-update-failed", {
                            errorInfo: i,
                          });
                        }
                        if (!o.token) throw Be.create("token-update-no-token");
                        return o.token;
                      })(t.firebaseDependencies, e),
                      i = Object.assign(Object.assign({}, e), {
                        token: n,
                        createTime: Date.now(),
                      });
                    return await Ne(t.firebaseDependencies, i), n;
                  } catch (e) {
                    throw (await He(t), e);
                  }
                })(e, {
                  token: s.token,
                  createTime: Date.now(),
                  subscriptionOptions: r,
                })
              : s.token;
          try {
            await $e(e.firebaseDependencies, s.token);
          } catch (e) {
            console.warn(e);
          }
          return We(e.firebaseDependencies, r);
        }
        return We(e.firebaseDependencies, r);
      }
      async function He(e) {
        var t = await Me(e.firebaseDependencies);
        t &&
          (await $e(e.firebaseDependencies, t.token),
          await (async function (e) {
            e = xe(e);
            const t = await Ke(),
              n = t.transaction(Ae, "readwrite");
            await n.objectStore(Ae).delete(e), await n.complete;
          })(e.firebaseDependencies));
        const n = await e.swRegistration.pushManager.getSubscription();
        return !n || n.unsubscribe();
      }
      async function We(e, t) {
        t = {
          token: await (async function (e, t) {
            var n = await qe(e),
              t = Le(t),
              t = { method: "POST", headers: n, body: JSON.stringify(t) };
            let i;
            try {
              const o = await fetch(Fe(e.appConfig), t);
              i = await o.json();
            } catch (e) {
              throw Be.create("token-subscribe-failed", { errorInfo: e });
            }
            if (i.error) {
              t = i.error.message;
              throw Be.create("token-subscribe-failed", { errorInfo: t });
            }
            if (!i.token) throw Be.create("token-subscribe-no-token");
            return i.token;
          })(e, t),
          createTime: Date.now(),
          subscriptionOptions: t,
        };
        return await Ne(e, t), t.token;
      }
      function Ue(e) {
        var t,
          n,
          i,
          o = {
            from: e.from,
            collapseKey: e.collapse_key,
            messageId: e.fcm_message_id,
          };
        return (
          (n = o),
          (i = e).notification &&
            ((n.notification = {}),
            (t = i.notification.title) && (n.notification.title = t),
            (t = i.notification.body) && (n.notification.body = t),
            (i = i.notification.image) && (n.notification.image = i)),
          (n = o),
          (i = e).data && (n.data = i.data),
          (n = o),
          (i = e).fcmOptions &&
            ((n.fcmOptions = {}),
            (e = i.fcmOptions.link) && (n.fcmOptions.link = e),
            (i = i.fcmOptions.analytics_label) &&
              (n.fcmOptions.analyticsLabel = i)),
          o
        );
      }
      function Ge(t, n) {
        const i = [];
        for (let e = 0; e < t.length; e++)
          i.push(t.charAt(e)), e < n.length && i.push(n.charAt(e));
        return i.join("");
      }
      function Je(e) {
        return Be.create("missing-app-config-values", { valueName: e });
      }
      Ge("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o"),
        Ge("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
      class ze {
        constructor(e, t, n) {
          (this.deliveryMetricsExportedToBigQueryEnabled = !1),
            (this.onBackgroundMessageHandler = null),
            (this.onMessageHandler = null),
            (this.logEvents = []),
            (this.isLogServiceStarted = !1);
          var i = (function (e) {
            if (!e || !e.options) throw Je("App Configuration Object");
            if (!e.name) throw Je("App Name");
            var { options: t } = e;
            for (const n of [
              "projectId",
              "apiKey",
              "appId",
              "messagingSenderId",
            ])
              if (!t[n]) throw Je(n);
            return {
              appName: e.name,
              projectId: t.projectId,
              apiKey: t.apiKey,
              appId: t.appId,
              senderId: t.messagingSenderId,
            };
          })(e);
          this.firebaseDependencies = {
            app: e,
            appConfig: i,
            installations: t,
            analyticsProvider: n,
          };
        }
        _delete() {
          return Promise.resolve();
        }
      }
      async function Ye(e) {
        try {
          (e.swRegistration = await navigator.serviceWorker.register(ye, {
            scope: me,
          })),
            e.swRegistration.update().catch(() => {});
        } catch (e) {
          throw Be.create("failed-service-worker-registration", {
            browserErrorMessage: e.message,
          });
        }
      }
      async function Qe(e, t) {
        if (!navigator) throw Be.create("only-available-in-window");
        if (
          ("default" === Notification.permission &&
            (await Notification.requestPermission()),
          "granted" !== Notification.permission)
        )
          throw Be.create("permission-blocked");
        var n, i;
        return (
          (n = e),
          await ((i = null == t ? void 0 : t.vapidKey)
            ? (n.vapidKey = i)
            : n.vapidKey || (n.vapidKey = be)),
          await (async function (e, t) {
            if (
              (t || e.swRegistration || (await Ye(e)), t || !e.swRegistration)
            ) {
              if (!(t instanceof ServiceWorkerRegistration))
                throw Be.create("invalid-sw-registration");
              e.swRegistration = t;
            }
          })(e, null == t ? void 0 : t.serviceWorkerRegistration),
          Ve(e)
        );
      }
      async function Ze(e, t, n) {
        t = (function (e) {
          switch (e) {
            case K.NOTIFICATION_CLICKED:
              return "notification_open";
            case K.PUSH_RECEIVED:
              return "notification_foreground";
            default:
              throw new Error();
          }
        })(t);
        const i = await e.firebaseDependencies.analyticsProvider.get();
        i.logEvent(t, {
          message_id: n[ke],
          message_name: n[Ie],
          message_time: n[Se],
          message_device_time: Math.floor(Date.now() / 1e3),
        });
      }
      async function Xe(e, t) {
        var n,
          i = t.data;
        i.isFirebaseMessaging &&
          (e.onMessageHandler &&
            i.messageType === K.PUSH_RECEIVED &&
            ("function" == typeof e.onMessageHandler
              ? e.onMessageHandler(Ue(i))
              : e.onMessageHandler.next(Ue(i))),
          (n = i.data),
          "object" == typeof (t = n) &&
            t &&
            ke in t &&
            "1" === n["google.c.a.e"] &&
            (await Ze(e, i.messageType, n)));
      }
      function et(e) {
        return (async function (e) {
          if (!navigator) throw Be.create("only-available-in-window");
          return e.swRegistration || (await Ye(e)), He(e);
        })((e = p(e)));
      }
      function tt(e, t) {
        return (function (e, t) {
          if (!navigator) throw Be.create("only-available-in-window");
          return (
            (e.onMessageHandler = t),
            () => {
              e.onMessageHandler = null;
            }
          );
        })((e = p(e)), t);
      }
      Lt._registerComponent(
        new d(
          "messaging",
          (e) => {
            const t = new ze(
              e.getProvider("app").getImmediate(),
              e.getProvider("installations-internal").getImmediate(),
              e.getProvider("analytics-internal"),
            );
            return (
              navigator.serviceWorker.addEventListener("message", (e) =>
                Xe(t, e),
              ),
              t
            );
          },
          "PUBLIC",
        ),
      ),
        Lt._registerComponent(
          new d(
            "messaging-internal",
            (e) => {
              const t = e.getProvider("messaging").getImmediate();
              return { getToken: (e) => Qe(t, e) };
            },
            "PRIVATE",
          ),
        );
      const nt =
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
        it = "https://fcmregistrations.googleapis.com/v1",
        ot = "FCM_MSG",
        at = "google.c.a.c_id",
        rt = 3,
        st = 1;
      function ct(e) {
        e = new Uint8Array(e);
        const t = btoa(String.fromCharCode(...e));
        return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      ((O = M = M || {})[(O.DATA_MESSAGE = 1)] = "DATA_MESSAGE"),
        (O[(O.DISPLAY_NOTIFICATION = 3)] = "DISPLAY_NOTIFICATION"),
        ((O = N = N || {}).PUSH_RECEIVED = "push-received"),
        (O.NOTIFICATION_CLICKED = "notification-clicked");
      const ut = "fcm_token_details_db",
        pt = 5,
        dt = "fcm_token_object_Store";
      async function lt(a) {
        if ("databases" in indexedDB) {
          const t = await indexedDB.databases(),
            n = t.map((e) => e.name);
          if (!n.includes(ut)) return null;
        }
        let r = null;
        const e = await T(ut, pt, async (e) => {
          var t;
          if (!(e.oldVersion < 2) && e.objectStoreNames.contains(dt)) {
            const o = e.transaction.objectStore(dt);
            var n,
              i = await o.index("fcmSenderId").get(a);
            await o.clear(),
              i &&
                (2 === e.oldVersion
                  ? (n = i).auth &&
                    n.p256dh &&
                    n.endpoint &&
                    (r = {
                      token: n.fcmToken,
                      createTime:
                        null !== (t = n.createTime) && void 0 !== t
                          ? t
                          : Date.now(),
                      subscriptionOptions: {
                        auth: n.auth,
                        p256dh: n.p256dh,
                        endpoint: n.endpoint,
                        swScope: n.swScope,
                        vapidKey:
                          "string" == typeof n.vapidKey
                            ? n.vapidKey
                            : ct(n.vapidKey),
                      },
                    })
                  : 3 === e.oldVersion
                    ? ((n = i),
                      (r = {
                        token: n.fcmToken,
                        createTime: n.createTime,
                        subscriptionOptions: {
                          auth: ct(n.auth),
                          p256dh: ct(n.p256dh),
                          endpoint: n.endpoint,
                          swScope: n.swScope,
                          vapidKey: ct(n.vapidKey),
                        },
                      }))
                    : 4 === e.oldVersion &&
                      ((i = i),
                      (r = {
                        token: i.fcmToken,
                        createTime: i.createTime,
                        subscriptionOptions: {
                          auth: ct(i.auth),
                          p256dh: ct(i.p256dh),
                          endpoint: i.endpoint,
                          swScope: i.swScope,
                          vapidKey: ct(i.vapidKey),
                        },
                      })));
          }
        });
        return (
          e.close(),
          await C(ut),
          await C("fcm_vapid_details_db"),
          await C("undefined"),
          (function (e) {
            if (!e || !e.subscriptionOptions) return !1;
            var { subscriptionOptions: t } = e;
            return (
              "number" == typeof e.createTime &&
              0 < e.createTime &&
              "string" == typeof e.token &&
              0 < e.token.length &&
              "string" == typeof t.auth &&
              0 < t.auth.length &&
              "string" == typeof t.p256dh &&
              0 < t.p256dh.length &&
              "string" == typeof t.endpoint &&
              0 < t.endpoint.length &&
              "string" == typeof t.swScope &&
              0 < t.swScope.length &&
              "string" == typeof t.vapidKey &&
              0 < t.vapidKey.length
            );
          })(r)
            ? r
            : null
        );
      }
      const ft = "firebase-messaging-database",
        gt = 1,
        ht = "firebase-messaging-store";
      let wt = null;
      function yt() {
        return (
          (wt =
            wt ||
            T(ft, gt, (e) => {
              0 === e.oldVersion && e.createObjectStore(ht);
            })),
          wt
        );
      }
      async function mt(e) {
        var t = vt(e);
        const n = await yt();
        t = await n.transaction(ht).objectStore(ht).get(t);
        if (t) return t;
        t = await lt(e.appConfig.senderId);
        return t ? (await bt(e, t), t) : void 0;
      }
      async function bt(e, t) {
        e = vt(e);
        const n = await yt(),
          i = n.transaction(ht, "readwrite");
        return await i.objectStore(ht).put(t, e), await i.complete, t;
      }
      function vt({ appConfig: e }) {
        return e.appId;
      }
      const kt = new c("messaging", "Messaging", {
        "missing-app-config-values":
          'Missing App configuration value: "{$valueName}"',
        "only-available-in-window":
          "This method is available in a Window context.",
        "only-available-in-sw":
          "This method is available in a service worker context.",
        "permission-default":
          "The notification permission was not granted and dismissed instead.",
        "permission-blocked":
          "The notification permission was not granted and blocked instead.",
        "unsupported-browser":
          "This browser doesn't support the API's required to use the firebase SDK.",
        "indexed-db-unsupported":
          "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
        "failed-service-worker-registration":
          "We are unable to register the default service worker. {$browserErrorMessage}",
        "token-subscribe-failed":
          "A problem occurred while subscribing the user to FCM: {$errorInfo}",
        "token-subscribe-no-token":
          "FCM returned no token when subscribing the user to push.",
        "token-unsubscribe-failed":
          "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
        "token-update-failed":
          "A problem occurred while updating the user from FCM: {$errorInfo}",
        "token-update-no-token":
          "FCM returned no token when updating the user to push.",
        "use-sw-after-get-token":
          "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
        "invalid-sw-registration":
          "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
        "invalid-bg-handler":
          "The input to setBackgroundMessageHandler() must be a function.",
        "invalid-vapid-key": "The public VAPID key must be a string.",
        "use-vapid-key-after-get-token":
          "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",
      });
      async function It(e, t) {
        var n = { method: "DELETE", headers: await _t(e) };
        try {
          const a = await fetch(`${St(e.appConfig)}/${t}`, n);
          var i = await a.json();
          if (i.error) {
            var o = i.error.message;
            throw kt.create("token-unsubscribe-failed", { errorInfo: o });
          }
        } catch (e) {
          throw kt.create("token-unsubscribe-failed", { errorInfo: e });
        }
      }
      function St({ projectId: e }) {
        return `${it}/projects/${e}/registrations`;
      }
      async function _t({ appConfig: e, installations: t }) {
        t = await t.getToken();
        return new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-goog-api-key": e.apiKey,
          "x-goog-firebase-installations-auth": `FIS ${t}`,
        });
      }
      function Tt({ p256dh: e, auth: t, endpoint: n, vapidKey: i }) {
        const o = { web: { endpoint: n, auth: t, p256dh: e } };
        return i !== nt && (o.web.applicationPubKey = i), o;
      }
      const Ct = 6048e5;
      async function Ot(e) {
        const t = await (async function (e, t) {
          var n = await e.pushManager.getSubscription();
          if (n) return n;
          return e.pushManager.subscribe({
            userVisibleOnly: !0,
            applicationServerKey: (function (e) {
              e = (e + "=".repeat((4 - (e.length % 4)) % 4))
                .replace(/\-/g, "+")
                .replace(/_/g, "/");
              const t = atob(e),
                n = new Uint8Array(t.length);
              for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e);
              return n;
            })(t),
          });
        })(e.swRegistration, e.vapidKey);
        var n,
          i,
          o,
          a,
          r = {
            vapidKey: e.vapidKey,
            swScope: e.swRegistration.scope,
            endpoint: t.endpoint,
            auth: ct(t.getKey("auth")),
            p256dh: ct(t.getKey("p256dh")),
          },
          s = await mt(e.firebaseDependencies);
        if (s) {
          if (
            ((n = s.subscriptionOptions),
            (i = r.vapidKey === n.vapidKey),
            (o = r.endpoint === n.endpoint),
            (a = r.auth === n.auth),
            (n = r.p256dh === n.p256dh),
            i && o && a && n)
          )
            return Date.now() >= s.createTime + Ct
              ? (async function (t, e) {
                  try {
                    var n = await (async function (e, t) {
                        var n = await _t(e),
                          i = Tt(t.subscriptionOptions),
                          i = {
                            method: "PATCH",
                            headers: n,
                            body: JSON.stringify(i),
                          };
                        let o;
                        try {
                          const a = await fetch(
                            `${St(e.appConfig)}/${t.token}`,
                            i,
                          );
                          o = await a.json();
                        } catch (e) {
                          throw kt.create("token-update-failed", {
                            errorInfo: e,
                          });
                        }
                        if (o.error) {
                          i = o.error.message;
                          throw kt.create("token-update-failed", {
                            errorInfo: i,
                          });
                        }
                        if (!o.token) throw kt.create("token-update-no-token");
                        return o.token;
                      })(t.firebaseDependencies, e),
                      i = Object.assign(Object.assign({}, e), {
                        token: n,
                        createTime: Date.now(),
                      });
                    return await bt(t.firebaseDependencies, i), n;
                  } catch (e) {
                    throw (await jt(t), e);
                  }
                })(e, {
                  token: s.token,
                  createTime: Date.now(),
                  subscriptionOptions: r,
                })
              : s.token;
          try {
            await It(e.firebaseDependencies, s.token);
          } catch (e) {
            console.warn(e);
          }
          return Dt(e.firebaseDependencies, r);
        }
        return Dt(e.firebaseDependencies, r);
      }
      async function jt(e) {
        var t = await mt(e.firebaseDependencies);
        t &&
          (await It(e.firebaseDependencies, t.token),
          await (async function (e) {
            e = vt(e);
            const t = await yt(),
              n = t.transaction(ht, "readwrite");
            await n.objectStore(ht).delete(e), await n.complete;
          })(e.firebaseDependencies));
        const n = await e.swRegistration.pushManager.getSubscription();
        return !n || n.unsubscribe();
      }
      async function Dt(e, t) {
        t = {
          token: await (async function (e, t) {
            var n = await _t(e),
              t = Tt(t),
              t = { method: "POST", headers: n, body: JSON.stringify(t) };
            let i;
            try {
              const o = await fetch(St(e.appConfig), t);
              i = await o.json();
            } catch (e) {
              throw kt.create("token-subscribe-failed", { errorInfo: e });
            }
            if (i.error) {
              t = i.error.message;
              throw kt.create("token-subscribe-failed", { errorInfo: t });
            }
            if (!i.token) throw kt.create("token-subscribe-no-token");
            return i.token;
          })(e, t),
          createTime: Date.now(),
          subscriptionOptions: t,
        };
        return await bt(e, t), t.token;
      }
      At("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o"),
        At("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
      async function Pt(e, t) {
        t = (function (e, t) {
          const n = {};
          e.from && (n.project_number = e.from);
          e.fcm_message_id && (n.message_id = e.fcm_message_id);
          (n.instance_id = t),
            e.notification
              ? (n.message_type = M.DISPLAY_NOTIFICATION.toString())
              : (n.message_type = M.DATA_MESSAGE.toString());
          (n.sdk_platform = rt.toString()),
            (n.package_name = self.origin.replace(/(^\w+:|^)\/\//, "")),
            e.collapse_key && (n.collapse_key = e.collapse_key);
          (n.event = st.toString()),
            null !== (t = e.fcmOptions) &&
              void 0 !== t &&
              t.analytics_label &&
              (n.analytics_label =
                null === (e = e.fcmOptions) || void 0 === e
                  ? void 0
                  : e.analytics_label);
          return n;
        })(t, await e.firebaseDependencies.installations.getId());
        !(function (e, t) {
          const n = {};
          (n.event_time_ms = Math.floor(Date.now()).toString()),
            (n.source_extension_json_proto3 = JSON.stringify(t)),
            e.logEvents.push(n);
        })(e, t);
      }
      function At(t, n) {
        const i = [];
        for (let e = 0; e < t.length; e++)
          i.push(t.charAt(e)), e < n.length && i.push(n.charAt(e));
        return i.join("");
      }
      async function Et(e, t) {
        var n = (function ({ data: e }) {
          if (!e) return null;
          try {
            return e.json();
          } catch (e) {
            return null;
          }
        })(e);
        if (n) {
          t.deliveryMetricsExportedToBigQueryEnabled && (await Pt(t, n));
          var i,
            o,
            a = await Mt();
          if (
            a.some(
              (e) =>
                "visible" === e.visibilityState &&
                !e.url.startsWith("chrome-extension://"),
            )
          )
            return (function (e, t) {
              (t.isFirebaseMessaging = !0), (t.messageType = N.PUSH_RECEIVED);
              for (const n of e) n.postMessage(t);
            })(a, n);
          n.notification &&
            (await (function (e) {
              var { actions: t } = e,
                { maxActions: n } = Notification;
              t &&
                n &&
                t.length > n &&
                console.warn(
                  `This browser only supports ${n} actions. The remaining actions will not be displayed.`,
                );
              return self.registration.showNotification(
                null !== (n = e.title) && void 0 !== n ? n : "",
                e,
              );
            })(
              (function (e) {
                const t = Object.assign({}, e.notification);
                return (t.data = { [ot]: e }), t;
              })(n),
            )),
            t &&
              t.onBackgroundMessageHandler &&
              ((o = {
                from: (i = n).from,
                collapseKey: i.collapse_key,
                messageId: i.fcm_message_id,
              }),
              (e = o),
              (a = i).notification &&
                ((e.notification = {}),
                (n = a.notification.title) && (e.notification.title = n),
                (n = a.notification.body) && (e.notification.body = n),
                (a = a.notification.image) && (e.notification.image = a)),
              (e = o),
              (a = i).data && (e.data = a.data),
              (e = o),
              (a = i).fcmOptions &&
                ((e.fcmOptions = {}),
                (i = a.fcmOptions.link) && (e.fcmOptions.link = i),
                (a = a.fcmOptions.analytics_label) &&
                  (e.fcmOptions.analyticsLabel = a)),
              (o = o),
              "function" == typeof t.onBackgroundMessageHandler
                ? t.onBackgroundMessageHandler(o)
                : t.onBackgroundMessageHandler.next(o));
        }
      }
      async function Kt(e) {
        const t =
          null ===
            (o =
              null === (n = e.notification) || void 0 === n
                ? void 0
                : n.data) || void 0 === o
            ? void 0
            : o[ot];
        if (t && !e.action) {
          e.stopImmediatePropagation(), e.notification.close();
          var n = (function (e) {
            var t;
            var n =
              null !==
                (t =
                  null === (t = e.fcmOptions) || void 0 === t
                    ? void 0
                    : t.link) && void 0 !== t
                ? t
                : null === (n = e.notification) || void 0 === n
                  ? void 0
                  : n.click_action;
            if (n) return n;
            return (function (e) {
              return "object" == typeof e && e && at in e;
            })(e.data)
              ? self.location.origin
              : null;
          })(t);
          if (n) {
            var i,
              o = new URL(n, self.location.href),
              e = new URL(self.location.origin);
            if (o.host === e.host) {
              let e = await (async function (e) {
                var t = await Mt();
                for (const i of t) {
                  var n = new URL(i.url, self.location.href);
                  if (e.host === n.host) return i;
                }
                return null;
              })(o);
              if (
                (e
                  ? (e = await e.focus())
                  : ((e = await self.clients.openWindow(n)),
                    (i = 3e3),
                    await new Promise((e) => {
                      setTimeout(e, i);
                    })),
                e)
              )
                return (
                  (t.messageType = N.NOTIFICATION_CLICKED),
                  (t.isFirebaseMessaging = !0),
                  e.postMessage(t)
                );
            }
          }
        }
      }
      function Mt() {
        return self.clients.matchAll({
          type: "window",
          includeUncontrolled: !0,
        });
      }
      function Nt(e) {
        return kt.create("missing-app-config-values", { valueName: e });
      }
      class xt {
        constructor(e, t, n) {
          (this.deliveryMetricsExportedToBigQueryEnabled = !1),
            (this.onBackgroundMessageHandler = null),
            (this.onMessageHandler = null),
            (this.logEvents = []),
            (this.isLogServiceStarted = !1);
          var i = (function (e) {
            if (!e || !e.options) throw Nt("App Configuration Object");
            if (!e.name) throw Nt("App Name");
            var { options: t } = e;
            for (const n of [
              "projectId",
              "apiKey",
              "appId",
              "messagingSenderId",
            ])
              if (!t[n]) throw Nt(n);
            return {
              appName: e.name,
              projectId: t.projectId,
              apiKey: t.apiKey,
              appId: t.appId,
              senderId: t.messagingSenderId,
            };
          })(e);
          this.firebaseDependencies = {
            app: e,
            appConfig: i,
            installations: t,
            analyticsProvider: n,
          };
        }
        _delete() {
          return Promise.resolve();
        }
      }
      function Bt(e, t) {
        return (function (e, t) {
          if (void 0 !== self.document) throw kt.create("only-available-in-sw");
          return (
            (e.onBackgroundMessageHandler = t),
            () => {
              e.onBackgroundMessageHandler = null;
            }
          );
        })((e = p(e)), t);
      }
      Lt._registerComponent(
        new d(
          "messaging-sw",
          (e) => {
            const t = new xt(
              e.getProvider("app").getImmediate(),
              e.getProvider("installations-internal").getImmediate(),
              e.getProvider("analytics-internal"),
            );
            return (
              self.addEventListener("push", (e) => {
                e.waitUntil(Et(e, t));
              }),
              self.addEventListener("pushsubscriptionchange", (e) => {
                e.waitUntil(
                  (async function (e, t) {
                    var { newSubscription: e } = e;
                    e
                      ? ((e = await mt(t.firebaseDependencies)),
                        await jt(t),
                        (t.vapidKey =
                          null !==
                            (e =
                              null ===
                                (e =
                                  null == e ? void 0 : e.subscriptionOptions) ||
                              void 0 === e
                                ? void 0
                                : e.vapidKey) && void 0 !== e
                            ? e
                            : nt),
                        await Ot(t))
                      : await jt(t);
                  })(e, t),
                );
              }),
              self.addEventListener("notificationclick", (e) => {
                e.waitUntil(Kt(e));
              }),
              t
            );
          },
          "PUBLIC",
        ),
      );
      class $t {
        constructor(e, t) {
          (this.app = e),
            (this._delegate = t),
            (this.app = e),
            (this._delegate = t);
        }
        async getToken(e) {
          return (async function (e, t) {
            return Qe((e = p(e)), t);
          })(this._delegate, e);
        }
        async deleteToken() {
          return et(this._delegate);
        }
        onMessage(e) {
          return tt(this._delegate, e);
        }
        onBackgroundMessage(e) {
          return Bt(this._delegate, e);
        }
      }
      const Ft = {
        isSupported: function () {
          return self && "ServiceWorkerGlobalScope" in self
            ? "indexedDB" in self &&
                null !== indexedDB &&
                "PushManager" in self &&
                "Notification" in self &&
                ServiceWorkerRegistration.prototype.hasOwnProperty(
                  "showNotification",
                ) &&
                PushSubscription.prototype.hasOwnProperty("getKey")
            : "indexedDB" in window &&
                null !== indexedDB &&
                navigator.cookieEnabled &&
                "serviceWorker" in navigator &&
                "PushManager" in window &&
                "Notification" in window &&
                "fetch" in window &&
                ServiceWorkerRegistration.prototype.hasOwnProperty(
                  "showNotification",
                ) &&
                PushSubscription.prototype.hasOwnProperty("getKey");
        },
      };
      t.default.INTERNAL.registerComponent(
        new d(
          "messaging-compat",
          (e) =>
            self && "ServiceWorkerGlobalScope" in self
              ? new $t(
                  e.getProvider("app-compat").getImmediate(),
                  e.getProvider("messaging-sw").getImmediate(),
                )
              : new $t(
                  e.getProvider("app-compat").getImmediate(),
                  e.getProvider("messaging").getImmediate(),
                ),
          "PUBLIC",
        ).setServiceProps(Ft),
      ),
        t.default.registerVersion("@firebase/messaging-compat", "0.1.0");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-messaging-compat.js - be sure to load firebase-app.js first.",
      ))
    );
  }
});
//# sourceMappingURL=firebase-messaging-compat.js.map
