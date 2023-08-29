import { defineComponent as G, inject as Pe, ref as se, provide as me, onMounted as Re, openBlock as we, createElementBlock as be, normalizeClass as M, unref as D, createElementVNode as Y, renderSlot as J, createTextVNode as ae, toDisplayString as fe, reactive as Ve, toRefs as De } from "vue";
function _e(r) {
  return r.install = function(e) {
    const { name: t } = r;
    e.component(t, r);
  }, r;
}
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Te = () => {
}, qe = Object.assign, Se = Array.isArray, $e = (r) => typeof r == "function", Me = (r) => typeof r == "symbol";
let Be;
function Le(r, e = Be) {
  e && e.active && e.effects.push(r);
}
const oe = (r) => {
  const e = new Set(r);
  return e.w = 0, e.n = 0, e;
}, Ee = (r) => (r.w & P) > 0, Fe = (r) => (r.n & P) > 0, ze = ({ deps: r }) => {
  if (r.length)
    for (let e = 0; e < r.length; e++)
      r[e].w |= P;
}, Ie = (r) => {
  const { deps: e } = r;
  if (e.length) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      Ee(i) && !Fe(i) ? i.delete(r) : e[t++] = i, i.w &= ~P, i.n &= ~P;
    }
    e.length = t;
  }
};
let B = 0, P = 1;
const Q = 30;
let F;
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Ue {
  constructor(e, t = null, n) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, Le(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = F, t = Z;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = F, F = this, Z = !0, P = 1 << ++B, B <= Q ? ze(this) : ce(this), this.fn();
    } finally {
      B <= Q && Ie(this), P = 1 << --B, F = this.parent, Z = t, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    F === this ? this.deferStop = !0 : this.active && (ce(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ce(r) {
  const { deps: e } = r;
  if (e.length) {
    for (let t = 0; t < e.length; t++)
      e[t].delete(r);
    e.length = 0;
  }
}
let Z = !0;
function ue(r, e) {
  let t = !1;
  B <= Q ? Fe(r) || (r.n |= P, t = !Ee(r)) : t = !r.has(F), t && (r.add(F), F.deps.push(r), process.env.NODE_ENV !== "production" && F.onTrack && F.onTrack(
    qe(
      {
        effect: F
      },
      e
    )
  ));
}
function de(r, e) {
  const t = Se(r) ? r : [...r];
  for (const n of t)
    n.computed && pe(n, e);
  for (const n of t)
    n.computed || pe(n, e);
}
function pe(r, e) {
  (r !== F || r.allowRecurse) && (process.env.NODE_ENV !== "production" && r.onTrigger && r.onTrigger(qe({ effect: r }, e)), r.scheduler ? r.scheduler() : r.run());
}
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Me)
);
function K(r) {
  const e = r && r.__v_raw;
  return e ? K(e) : r;
}
function We(r) {
  Z && F && (r = K(r), process.env.NODE_ENV !== "production" ? ue(r.dep || (r.dep = oe()), {
    target: r,
    type: "get",
    key: "value"
  }) : ue(r.dep || (r.dep = oe())));
}
function Je(r, e) {
  r = K(r);
  const t = r.dep;
  t && (process.env.NODE_ENV !== "production" ? de(t, {
    target: r,
    type: "set",
    key: "value",
    newValue: e
  }) : de(t));
}
class Ze {
  constructor(e, t, n, i) {
    this._setter = t, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Ue(e, () => {
      this._dirty || (this._dirty = !0, Je(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = n;
  }
  get value() {
    const e = K(this);
    return We(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function ke(r, e, t = !1) {
  let n, i;
  const a = $e(r);
  a ? (n = r, i = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Te) : (n = r.get, i = r.set);
  const s = new Ze(n, i, a || !i, t);
  return process.env.NODE_ENV !== "production" && e && !t && (s.effect.onTrack = e.onTrack, s.effect.onTrigger = e.onTrigger), s;
}
function V(r, e, t, n) {
  return e && (r += `-${e}`), t && (r += `__${t}`), n && (r += `--${n}`), r;
}
function Ge(r) {
  return {
    b: (d = "") => V(r, d, "", ""),
    e: (d = "") => d ? V(r, "", d, "") : "",
    m: (d = "") => d ? V(r, "", "", d) : "",
    be: (d = "", p = "") => d && p ? V(r, d, p, "") : "",
    bm: (d = "", p = "") => d && p ? V(r, d, "", p) : "",
    em: (d = "", p = "") => d && p ? V(r, "", d, p) : "",
    bem: (d = "", p = "", v = "") => d && p && v ? V(r, d, p, v) : "",
    is: (d, p) => p ? `is-${d}` : ""
  };
}
function Oe(r) {
  const e = `k-${r}`;
  return Ge(e);
}
const Ke = {
  model: Object,
  rules: {
    type: Object
  },
  showMessage: {
    type: Boolean,
    default: !0
  }
}, Ye = {
  validate: (r, e, t) => {
  }
}, Ae = Symbol(), He = {
  prop: String,
  label: String,
  rules: [Object, Array],
  showMessage: {
    type: Boolean,
    default: !0
  }
};
function T() {
  return T = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
    }
    return r;
  }, T.apply(this, arguments);
}
function Qe(r, e) {
  r.prototype = Object.create(e.prototype), r.prototype.constructor = r, I(r, e);
}
function X(r) {
  return X = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, X(r);
}
function I(r, e) {
  return I = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, I(r, e);
}
function Xe() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function k(r, e, t) {
  return Xe() ? k = Reflect.construct.bind() : k = function(i, a, s) {
    var f = [null];
    f.push.apply(f, a);
    var o = Function.bind.apply(i, f), d = new o();
    return s && I(d, s.prototype), d;
  }, k.apply(null, arguments);
}
function Ce(r) {
  return Function.toString.call(r).indexOf("[native code]") !== -1;
}
function C(r) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return C = function(n) {
    if (n === null || !Ce(n))
      return n;
    if (typeof n != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(n))
        return e.get(n);
      e.set(n, i);
    }
    function i() {
      return k(n, arguments, X(this).constructor);
    }
    return i.prototype = Object.create(n.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), I(i, n);
  }, C(r);
}
var et = /%[sdj%]/g, xe = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (xe = function(e, t) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && t.every(function(n) {
    return typeof n == "string";
  }) && console.warn(e, t);
});
function ee(r) {
  if (!r || !r.length)
    return null;
  var e = {};
  return r.forEach(function(t) {
    var n = t.field;
    e[n] = e[n] || [], e[n].push(t);
  }), e;
}
function O(r) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    t[n - 1] = arguments[n];
  var i = 0, a = t.length;
  if (typeof r == "function")
    return r.apply(null, t);
  if (typeof r == "string") {
    var s = r.replace(et, function(f) {
      if (f === "%%")
        return "%";
      if (i >= a)
        return f;
      switch (f) {
        case "%s":
          return String(t[i++]);
        case "%d":
          return Number(t[i++]);
        case "%j":
          try {
            return JSON.stringify(t[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return f;
      }
    });
    return s;
  }
  return r;
}
function tt(r) {
  return r === "string" || r === "url" || r === "hex" || r === "email" || r === "date" || r === "pattern";
}
function _(r, e) {
  return !!(r == null || e === "array" && Array.isArray(r) && !r.length || tt(e) && typeof r == "string" && !r);
}
function rt(r, e, t) {
  var n = [], i = 0, a = r.length;
  function s(f) {
    n.push.apply(n, f || []), i++, i === a && t(n);
  }
  r.forEach(function(f) {
    e(f, s);
  });
}
function le(r, e, t) {
  var n = 0, i = r.length;
  function a(s) {
    if (s && s.length) {
      t(s);
      return;
    }
    var f = n;
    n = n + 1, f < i ? e(r[f], a) : t([]);
  }
  a([]);
}
function nt(r) {
  var e = [];
  return Object.keys(r).forEach(function(t) {
    e.push.apply(e, r[t] || []);
  }), e;
}
var ye = /* @__PURE__ */ function(r) {
  Qe(e, r);
  function e(t, n) {
    var i;
    return i = r.call(this, "Async Validation Error") || this, i.errors = t, i.fields = n, i;
  }
  return e;
}(/* @__PURE__ */ C(Error));
function it(r, e, t, n, i) {
  if (e.first) {
    var a = new Promise(function(b, h) {
      var w = function(c) {
        return n(c), c.length ? h(new ye(c, ee(c))) : b(i);
      }, u = nt(r);
      le(u, t, w);
    });
    return a.catch(function(b) {
      return b;
    }), a;
  }
  var s = e.firstFields === !0 ? Object.keys(r) : e.firstFields || [], f = Object.keys(r), o = f.length, d = 0, p = [], v = new Promise(function(b, h) {
    var w = function(g) {
      if (p.push.apply(p, g), d++, d === o)
        return n(p), p.length ? h(new ye(p, ee(p))) : b(i);
    };
    f.length || (n(p), b(i)), f.forEach(function(u) {
      var g = r[u];
      s.indexOf(u) !== -1 ? le(g, t, w) : rt(g, t, w);
    });
  });
  return v.catch(function(b) {
    return b;
  }), v;
}
function st(r) {
  return !!(r && r.message !== void 0);
}
function at(r, e) {
  for (var t = r, n = 0; n < e.length; n++) {
    if (t == null)
      return t;
    t = t[e[n]];
  }
  return t;
}
function he(r, e) {
  return function(t) {
    var n;
    return r.fullFields ? n = at(e, r.fullFields) : n = e[t.field || r.fullField], st(t) ? (t.field = t.field || r.fullField, t.fieldValue = n, t) : {
      message: typeof t == "function" ? t() : t,
      fieldValue: n,
      field: t.field || r.fullField
    };
  };
}
function ge(r, e) {
  if (e) {
    for (var t in e)
      if (e.hasOwnProperty(t)) {
        var n = e[t];
        typeof n == "object" && typeof r[t] == "object" ? r[t] = T({}, r[t], n) : r[t] = n;
      }
  }
  return r;
}
var je = function(e, t, n, i, a, s) {
  e.required && (!n.hasOwnProperty(e.field) || _(t, s || e.type)) && i.push(O(a.messages.required, e.fullField));
}, ft = function(e, t, n, i, a) {
  (/^\s+$/.test(t) || t === "") && i.push(O(a.messages.whitespace, e.fullField));
}, W, ot = function() {
  if (W)
    return W;
  var r = "[a-fA-F\\d:]", e = function(m) {
    return m && m.includeBoundaries ? "(?:(?<=\\s|^)(?=" + r + ")|(?<=" + r + ")(?=\\s|$))" : "";
  }, t = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + n + ":){7}(?:" + n + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + n + ":){6}(?:" + t + "|:" + n + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + n + ":){5}(?::" + t + "|(?::" + n + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + n + ":){4}(?:(?::" + n + "){0,1}:" + t + "|(?::" + n + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + n + ":){3}(?:(?::" + n + "){0,2}:" + t + "|(?::" + n + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + n + ":){2}(?:(?::" + n + "){0,3}:" + t + "|(?::" + n + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + n + ":){1}(?:(?::" + n + "){0,4}:" + t + "|(?::" + n + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + n + "){0,5}:" + t + "|(?::" + n + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + t + "$)|(?:^" + i + "$)"), s = new RegExp("^" + t + "$"), f = new RegExp("^" + i + "$"), o = function(m) {
    return m && m.exact ? a : new RegExp("(?:" + e(m) + t + e(m) + ")|(?:" + e(m) + i + e(m) + ")", "g");
  };
  o.v4 = function(l) {
    return l && l.exact ? s : new RegExp("" + e(l) + t + e(l), "g");
  }, o.v6 = function(l) {
    return l && l.exact ? f : new RegExp("" + e(l) + i + e(l), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", p = "(?:\\S+(?::\\S*)?@)?", v = o.v4().source, b = o.v6().source, h = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", w = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", u = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", c = '(?:[/?#][^\\s"]*)?', A = "(?:" + d + "|www\\.)" + p + "(?:localhost|" + v + "|" + b + "|" + h + w + u + ")" + g + c;
  return W = new RegExp("(?:^" + A + "$)", "i"), W;
}, ve = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, L = {
  integer: function(e) {
    return L.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return L.number(e) && !L.integer(e);
  },
  array: function(e) {
    return Array.isArray(e);
  },
  regexp: function(e) {
    if (e instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(e);
    } catch {
      return !1;
    }
  },
  date: function(e) {
    return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
  },
  number: function(e) {
    return isNaN(e) ? !1 : typeof e == "number";
  },
  object: function(e) {
    return typeof e == "object" && !L.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(ve.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(ot());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(ve.hex);
  }
}, ct = function(e, t, n, i, a) {
  if (e.required && t === void 0) {
    je(e, t, n, i, a);
    return;
  }
  var s = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], f = e.type;
  s.indexOf(f) > -1 ? L[f](t) || i.push(O(a.messages.types[f], e.fullField, e.type)) : f && typeof t !== e.type && i.push(O(a.messages.types[f], e.fullField, e.type));
}, ut = function(e, t, n, i, a) {
  var s = typeof e.len == "number", f = typeof e.min == "number", o = typeof e.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, p = t, v = null, b = typeof t == "number", h = typeof t == "string", w = Array.isArray(t);
  if (b ? v = "number" : h ? v = "string" : w && (v = "array"), !v)
    return !1;
  w && (p = t.length), h && (p = t.replace(d, "_").length), s ? p !== e.len && i.push(O(a.messages[v].len, e.fullField, e.len)) : f && !o && p < e.min ? i.push(O(a.messages[v].min, e.fullField, e.min)) : o && !f && p > e.max ? i.push(O(a.messages[v].max, e.fullField, e.max)) : f && o && (p < e.min || p > e.max) && i.push(O(a.messages[v].range, e.fullField, e.min, e.max));
}, S = "enum", dt = function(e, t, n, i, a) {
  e[S] = Array.isArray(e[S]) ? e[S] : [], e[S].indexOf(t) === -1 && i.push(O(a.messages[S], e.fullField, e[S].join(", ")));
}, pt = function(e, t, n, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(t) || i.push(O(a.messages.pattern.mismatch, e.fullField, t, e.pattern));
    else if (typeof e.pattern == "string") {
      var s = new RegExp(e.pattern);
      s.test(t) || i.push(O(a.messages.pattern.mismatch, e.fullField, t, e.pattern));
    }
  }
}, y = {
  required: je,
  whitespace: ft,
  type: ct,
  range: ut,
  enum: dt,
  pattern: pt
}, lt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t, "string") && !e.required)
      return n();
    y.required(e, t, i, s, a, "string"), _(t, "string") || (y.type(e, t, i, s, a), y.range(e, t, i, s, a), y.pattern(e, t, i, s, a), e.whitespace === !0 && y.whitespace(e, t, i, s, a));
  }
  n(s);
}, yt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && y.type(e, t, i, s, a);
  }
  n(s);
}, ht = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (t === "" && (t = void 0), _(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && (y.type(e, t, i, s, a), y.range(e, t, i, s, a));
  }
  n(s);
}, gt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && y.type(e, t, i, s, a);
  }
  n(s);
}, vt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), _(t) || y.type(e, t, i, s, a);
  }
  n(s);
}, mt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && (y.type(e, t, i, s, a), y.range(e, t, i, s, a));
  }
  n(s);
}, wt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && (y.type(e, t, i, s, a), y.range(e, t, i, s, a));
  }
  n(s);
}, bt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (t == null && !e.required)
      return n();
    y.required(e, t, i, s, a, "array"), t != null && (y.type(e, t, i, s, a), y.range(e, t, i, s, a));
  }
  n(s);
}, _t = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && y.type(e, t, i, s, a);
  }
  n(s);
}, qt = "enum", Et = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a), t !== void 0 && y[qt](e, t, i, s, a);
  }
  n(s);
}, Ft = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t, "string") && !e.required)
      return n();
    y.required(e, t, i, s, a), _(t, "string") || y.pattern(e, t, i, s, a);
  }
  n(s);
}, Ot = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t, "date") && !e.required)
      return n();
    if (y.required(e, t, i, s, a), !_(t, "date")) {
      var o;
      t instanceof Date ? o = t : o = new Date(t), y.type(e, o, i, s, a), o && y.range(e, o.getTime(), i, s, a);
    }
  }
  n(s);
}, At = function(e, t, n, i, a) {
  var s = [], f = Array.isArray(t) ? "array" : typeof t;
  y.required(e, t, i, s, a, f), n(s);
}, H = function(e, t, n, i, a) {
  var s = e.type, f = [], o = e.required || !e.required && i.hasOwnProperty(e.field);
  if (o) {
    if (_(t, s) && !e.required)
      return n();
    y.required(e, t, i, f, a, s), _(t, s) || y.type(e, t, i, f, a);
  }
  n(f);
}, xt = function(e, t, n, i, a) {
  var s = [], f = e.required || !e.required && i.hasOwnProperty(e.field);
  if (f) {
    if (_(t) && !e.required)
      return n();
    y.required(e, t, i, s, a);
  }
  n(s);
}, z = {
  string: lt,
  method: yt,
  number: ht,
  boolean: gt,
  regexp: vt,
  integer: mt,
  float: wt,
  array: bt,
  object: _t,
  enum: Et,
  pattern: Ft,
  date: Ot,
  url: H,
  hex: H,
  email: H,
  required: At,
  any: xt
};
function te() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var e = JSON.parse(JSON.stringify(this));
      return e.clone = this.clone, e;
    }
  };
}
var re = te(), U = /* @__PURE__ */ function() {
  function r(t) {
    this.rules = null, this._messages = re, this.define(t);
  }
  var e = r.prototype;
  return e.define = function(n) {
    var i = this;
    if (!n)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof n != "object" || Array.isArray(n))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(n).forEach(function(a) {
      var s = n[a];
      i.rules[a] = Array.isArray(s) ? s : [s];
    });
  }, e.messages = function(n) {
    return n && (this._messages = ge(te(), n)), this._messages;
  }, e.validate = function(n, i, a) {
    var s = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var f = n, o = i, d = a;
    if (typeof o == "function" && (d = o, o = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, f), Promise.resolve(f);
    function p(u) {
      var g = [], c = {};
      function A(m) {
        if (Array.isArray(m)) {
          var E;
          g = (E = g).concat.apply(E, m);
        } else
          g.push(m);
      }
      for (var l = 0; l < u.length; l++)
        A(u[l]);
      g.length ? (c = ee(g), d(g, c)) : d(null, f);
    }
    if (o.messages) {
      var v = this.messages();
      v === re && (v = te()), ge(v, o.messages), o.messages = v;
    } else
      o.messages = this.messages();
    var b = {}, h = o.keys || Object.keys(this.rules);
    h.forEach(function(u) {
      var g = s.rules[u], c = f[u];
      g.forEach(function(A) {
        var l = A;
        typeof l.transform == "function" && (f === n && (f = T({}, f)), c = f[u] = l.transform(c)), typeof l == "function" ? l = {
          validator: l
        } : l = T({}, l), l.validator = s.getValidationMethod(l), l.validator && (l.field = u, l.fullField = l.fullField || u, l.type = s.getType(l), b[u] = b[u] || [], b[u].push({
          rule: l,
          value: c,
          source: f,
          field: u
        }));
      });
    });
    var w = {};
    return it(b, o, function(u, g) {
      var c = u.rule, A = (c.type === "object" || c.type === "array") && (typeof c.fields == "object" || typeof c.defaultField == "object");
      A = A && (c.required || !c.required && u.value), c.field = u.field;
      function l(q, R) {
        return T({}, R, {
          fullField: c.fullField + "." + q,
          fullFields: c.fullFields ? [].concat(c.fullFields, [q]) : [q]
        });
      }
      function m(q) {
        q === void 0 && (q = []);
        var R = Array.isArray(q) ? q : [q];
        !o.suppressWarning && R.length && r.warning("async-validator:", R), R.length && c.message !== void 0 && (R = [].concat(c.message));
        var j = R.map(he(c, f));
        if (o.first && j.length)
          return w[c.field] = 1, g(j);
        if (!A)
          g(j);
        else {
          if (c.required && !u.value)
            return c.message !== void 0 ? j = [].concat(c.message).map(he(c, f)) : o.error && (j = [o.error(c, O(o.messages.required, c.field))]), g(j);
          var $ = {};
          c.defaultField && Object.keys(u.value).map(function(N) {
            $[N] = c.defaultField;
          }), $ = T({}, $, u.rule.fields);
          var ne = {};
          Object.keys($).forEach(function(N) {
            var x = $[N], Ne = Array.isArray(x) ? x : [x];
            ne[N] = Ne.map(l.bind(null, N));
          });
          var ie = new r(ne);
          ie.messages(o.messages), u.rule.options && (u.rule.options.messages = o.messages, u.rule.options.error = o.error), ie.validate(u.value, u.rule.options || o, function(N) {
            var x = [];
            j && j.length && x.push.apply(x, j), N && N.length && x.push.apply(x, N), g(x.length ? x : null);
          });
        }
      }
      var E;
      if (c.asyncValidator)
        E = c.asyncValidator(c, u.value, m, u.source, o);
      else if (c.validator) {
        try {
          E = c.validator(c, u.value, m, u.source, o);
        } catch (q) {
          console.error == null || console.error(q), o.suppressValidatorError || setTimeout(function() {
            throw q;
          }, 0), m(q.message);
        }
        E === !0 ? m() : E === !1 ? m(typeof c.message == "function" ? c.message(c.fullField || c.field) : c.message || (c.fullField || c.field) + " fails") : E instanceof Array ? m(E) : E instanceof Error && m(E.message);
      }
      E && E.then && E.then(function() {
        return m();
      }, function(q) {
        return m(q);
      });
    }, function(u) {
      p(u);
    }, f);
  }, e.getType = function(n) {
    if (n.type === void 0 && n.pattern instanceof RegExp && (n.type = "pattern"), typeof n.validator != "function" && n.type && !z.hasOwnProperty(n.type))
      throw new Error(O("Unknown rule type %s", n.type));
    return n.type || "string";
  }, e.getValidationMethod = function(n) {
    if (typeof n.validator == "function")
      return n.validator;
    var i = Object.keys(n), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? z.required : z[this.getType(n)] || void 0;
  }, r;
}();
U.register = function(e, t) {
  if (typeof t != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  z[e] = t;
};
U.warning = xe;
U.messages = re;
U.validators = z;
const jt = G({
  name: "k-form-item"
}), Nt = /* @__PURE__ */ G({
  ...jt,
  props: He,
  setup(r) {
    const e = r, t = Pe(Ae), n = Oe("form-item"), i = se(""), a = se(""), s = (h) => h ? Array.isArray(h) ? h : [h] : [], f = ke(() => {
      const h = s(e.rules), w = t == null ? void 0 : t.rules;
      if (w && e.prop) {
        const u = w[e.prop];
        u && h.push(...s(u));
      }
      return h;
    }), o = (h) => f.value.filter((u) => !u.trigger || !h ? !0 : Array.isArray(u.trigger) ? u.trigger.includes(h) : u.trigger === h), d = (h) => {
      i.value = h, t == null || t.emit("validate", e.prop, !0, "");
    }, p = (h) => {
      const { errors: w } = h;
      i.value = w ? "error" : "success", a.value = w ? w[0].message : "", t == null || t.emit("validate", e.prop, !1, a.value);
    }, b = {
      ...e,
      validate: async (h, w) => {
        const u = o(h), g = e.prop, c = new U({
          [g]: u
        }), A = t == null ? void 0 : t.model;
        return c.validate({
          [g]: A[g]
        }).then(() => {
          d("success");
        }).catch((l) => (p(l), Promise.reject(l)));
      }
    };
    return me("form-item", b), Re(() => {
      t == null || t.addField(b);
    }), (h, w) => (we(), be("div", {
      class: M([
        D(n).b(),
        D(n).is("success", i.value == "success"),
        D(n).is("error", i.value === "error")
      ])
    }, [
      Y("label", {
        class: M(D(n).e("label"))
      }, [
        J(h.$slots, "label", {}, () => [
          ae(fe(h.label), 1)
        ])
      ], 2),
      Y("div", {
        class: M(D(n).e("content"))
      }, [
        J(h.$slots, "default"),
        Y("div", {
          class: M(D(n).e("error"))
        }, [
          J(h.$slots, "error", {}, () => [
            ae(fe(a.value), 1)
          ])
        ], 2)
      ], 2)
    ], 2));
  }
}), Pt = G({
  name: "k-form"
}), Rt = /* @__PURE__ */ G({
  ...Pt,
  props: Ke,
  emits: Ye,
  setup(r, { expose: e, emit: t }) {
    const n = r, i = Oe("form"), a = [], s = async (o) => {
      let d = {};
      for (const p of a)
        try {
          await p.validate("");
        } catch (v) {
          d = {
            ...d,
            ...v.fields
          };
        }
      if (Object.keys(d).length === 0)
        return o == null ? void 0 : o(!0);
      if (o)
        o == null || o(!1, d);
      else
        return Promise.reject(d);
    }, f = (o) => {
      a.push(o);
    };
    return me(
      Ae,
      Ve({
        ...De(n),
        emit: t,
        addField: f
      })
    ), e({
      validate: s
    }), (o, d) => (we(), be("form", {
      class: M(D(i).b())
    }, [
      J(o.$slots, "default")
    ], 2));
  }
}), Dt = _e(Nt), Tt = _e(Rt), St = {};
export {
  Tt as Form,
  Dt as FormItem,
  St as default
};
