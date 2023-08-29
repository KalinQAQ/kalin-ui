import { defineComponent as lt, computed as H, ref as ft, resolveComponent as ht, openBlock as E, createElementBlock as z, normalizeClass as F, unref as U, createElementVNode as x, toDisplayString as st, createVNode as R, withCtx as X, createTextVNode as Z, Fragment as ut, renderList as ot, renderSlot as $t } from "vue";
function yt(l) {
  return l.install = function(k) {
    const { name: b } = l;
    k.component(b, l);
  }, l;
}
function B(l, k, b, M) {
  return k && (l += `-${k}`), b && (l += `__${b}`), M && (l += `--${M}`), l;
}
function mt(l) {
  return {
    b: (c = "") => B(l, c, "", ""),
    e: (c = "") => c ? B(l, "", c, "") : "",
    m: (c = "") => c ? B(l, "", "", c) : "",
    be: (c = "", y = "") => c && y ? B(l, c, y, "") : "",
    bm: (c = "", y = "") => c && y ? B(l, c, "", y) : "",
    em: (c = "", y = "") => c && y ? B(l, "", c, y) : "",
    bem: (c = "", y = "", p = "") => c && y && p ? B(l, c, y, p) : "",
    is: (c, y) => y ? `is-${c}` : ""
  };
}
function it(l) {
  const k = `k-${l}`;
  return mt(k);
}
var vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pt(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var dt = { exports: {} };
(function(l, k) {
  (function(b, M) {
    l.exports = M();
  })(vt, function() {
    var b = 1e3, M = 6e4, q = 36e5, Y = "millisecond", _ = "second", h = "minute", S = "hour", c = "day", y = "week", p = "month", tt = "quarter", O = "year", T = "date", et = "Invalid Date", nt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, V = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, G = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(a) {
      var n = ["th", "st", "nd", "rd"], t = a % 100;
      return "[" + a + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
    } }, L = function(a, n, t) {
      var r = String(a);
      return !r || r.length >= n ? a : "" + Array(n + 1 - r.length).join(t) + a;
    }, at = { s: L, z: function(a) {
      var n = -a.utcOffset(), t = Math.abs(n), r = Math.floor(t / 60), e = t % 60;
      return (n <= 0 ? "+" : "-") + L(r, 2, "0") + ":" + L(e, 2, "0");
    }, m: function a(n, t) {
      if (n.date() < t.date())
        return -a(t, n);
      var r = 12 * (t.year() - n.year()) + (t.month() - n.month()), e = n.clone().add(r, p), s = t - e < 0, o = n.clone().add(r + (s ? -1 : 1), p);
      return +(-(r + (t - e) / (s ? e - o : o - e)) || 0);
    }, a: function(a) {
      return a < 0 ? Math.ceil(a) || 0 : Math.floor(a);
    }, p: function(a) {
      return { M: p, y: O, w: y, d: c, D: T, h: S, m: h, s: _, ms: Y, Q: tt }[a] || String(a || "").toLowerCase().replace(/s$/, "");
    }, u: function(a) {
      return a === void 0;
    } }, W = "en", C = {};
    C[W] = G;
    var N = function(a) {
      return a instanceof m;
    }, d = function a(n, t, r) {
      var e;
      if (!n)
        return W;
      if (typeof n == "string") {
        var s = n.toLowerCase();
        C[s] && (e = s), t && (C[s] = t, e = s);
        var o = n.split("-");
        if (!e && o.length > 1)
          return a(o[0]);
      } else {
        var f = n.name;
        C[f] = n, e = f;
      }
      return !r && e && (W = e), e || !r && W;
    }, i = function(a, n) {
      if (N(a))
        return a.clone();
      var t = typeof n == "object" ? n : {};
      return t.date = a, t.args = arguments, new m(t);
    }, u = at;
    u.l = d, u.i = N, u.w = function(a, n) {
      return i(a, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var m = function() {
      function a(t) {
        this.$L = d(t.locale, null, !0), this.parse(t);
      }
      var n = a.prototype;
      return n.parse = function(t) {
        this.$d = function(r) {
          var e = r.date, s = r.utc;
          if (e === null)
            return /* @__PURE__ */ new Date(NaN);
          if (u.u(e))
            return /* @__PURE__ */ new Date();
          if (e instanceof Date)
            return new Date(e);
          if (typeof e == "string" && !/Z$/i.test(e)) {
            var o = e.match(nt);
            if (o) {
              var f = o[2] - 1 || 0, $ = (o[7] || "0").substring(0, 3);
              return s ? new Date(Date.UTC(o[1], f, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, $)) : new Date(o[1], f, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, $);
            }
          }
          return new Date(e);
        }(t), this.$x = t.x || {}, this.init();
      }, n.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, n.$utils = function() {
        return u;
      }, n.isValid = function() {
        return this.$d.toString() !== et;
      }, n.isSame = function(t, r) {
        var e = i(t);
        return this.startOf(r) <= e && e <= this.endOf(r);
      }, n.isAfter = function(t, r) {
        return i(t) < this.startOf(r);
      }, n.isBefore = function(t, r) {
        return this.endOf(r) < i(t);
      }, n.$g = function(t, r, e) {
        return u.u(t) ? this[r] : this.set(e, t);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(t, r) {
        var e = this, s = !!u.u(r) || r, o = u.p(t), f = function(I, g) {
          var A = u.w(e.$u ? Date.UTC(e.$y, g, I) : new Date(e.$y, g, I), e);
          return s ? A : A.endOf(c);
        }, $ = function(I, g) {
          return u.w(e.toDate()[I].apply(e.toDate("s"), (s ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(g)), e);
        }, v = this.$W, D = this.$M, w = this.$D, P = "set" + (this.$u ? "UTC" : "");
        switch (o) {
          case O:
            return s ? f(1, 0) : f(31, 11);
          case p:
            return s ? f(1, D) : f(0, D + 1);
          case y:
            var j = this.$locale().weekStart || 0, Q = (v < j ? v + 7 : v) - j;
            return f(s ? w - Q : w + (6 - Q), D);
          case c:
          case T:
            return $(P + "Hours", 0);
          case S:
            return $(P + "Minutes", 1);
          case h:
            return $(P + "Seconds", 2);
          case _:
            return $(P + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(t) {
        return this.startOf(t, !1);
      }, n.$set = function(t, r) {
        var e, s = u.p(t), o = "set" + (this.$u ? "UTC" : ""), f = (e = {}, e[c] = o + "Date", e[T] = o + "Date", e[p] = o + "Month", e[O] = o + "FullYear", e[S] = o + "Hours", e[h] = o + "Minutes", e[_] = o + "Seconds", e[Y] = o + "Milliseconds", e)[s], $ = s === c ? this.$D + (r - this.$W) : r;
        if (s === p || s === O) {
          var v = this.clone().set(T, 1);
          v.$d[f]($), v.init(), this.$d = v.set(T, Math.min(this.$D, v.daysInMonth())).$d;
        } else
          f && this.$d[f]($);
        return this.init(), this;
      }, n.set = function(t, r) {
        return this.clone().$set(t, r);
      }, n.get = function(t) {
        return this[u.p(t)]();
      }, n.add = function(t, r) {
        var e, s = this;
        t = Number(t);
        var o = u.p(r), f = function(D) {
          var w = i(s);
          return u.w(w.date(w.date() + Math.round(D * t)), s);
        };
        if (o === p)
          return this.set(p, this.$M + t);
        if (o === O)
          return this.set(O, this.$y + t);
        if (o === c)
          return f(1);
        if (o === y)
          return f(7);
        var $ = (e = {}, e[h] = M, e[S] = q, e[_] = b, e)[o] || 1, v = this.$d.getTime() + t * $;
        return u.w(v, this);
      }, n.subtract = function(t, r) {
        return this.add(-1 * t, r);
      }, n.format = function(t) {
        var r = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || et;
        var s = t || "YYYY-MM-DDTHH:mm:ssZ", o = u.z(this), f = this.$H, $ = this.$m, v = this.$M, D = e.weekdays, w = e.months, P = e.meridiem, j = function(g, A, K, rt) {
          return g && (g[A] || g(r, s)) || K[A].slice(0, rt);
        }, Q = function(g) {
          return u.s(f % 12 || 12, g, "0");
        }, I = P || function(g, A, K) {
          var rt = g < 12 ? "AM" : "PM";
          return K ? rt.toLowerCase() : rt;
        };
        return s.replace(V, function(g, A) {
          return A || function(K) {
            switch (K) {
              case "YY":
                return String(r.$y).slice(-2);
              case "YYYY":
                return u.s(r.$y, 4, "0");
              case "M":
                return v + 1;
              case "MM":
                return u.s(v + 1, 2, "0");
              case "MMM":
                return j(e.monthsShort, v, w, 3);
              case "MMMM":
                return j(w, v);
              case "D":
                return r.$D;
              case "DD":
                return u.s(r.$D, 2, "0");
              case "d":
                return String(r.$W);
              case "dd":
                return j(e.weekdaysMin, r.$W, D, 2);
              case "ddd":
                return j(e.weekdaysShort, r.$W, D, 3);
              case "dddd":
                return D[r.$W];
              case "H":
                return String(f);
              case "HH":
                return u.s(f, 2, "0");
              case "h":
                return Q(1);
              case "hh":
                return Q(2);
              case "a":
                return I(f, $, !0);
              case "A":
                return I(f, $, !1);
              case "m":
                return String($);
              case "mm":
                return u.s($, 2, "0");
              case "s":
                return String(r.$s);
              case "ss":
                return u.s(r.$s, 2, "0");
              case "SSS":
                return u.s(r.$ms, 3, "0");
              case "Z":
                return o;
            }
            return null;
          }(g) || o.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(t, r, e) {
        var s, o = this, f = u.p(r), $ = i(t), v = ($.utcOffset() - this.utcOffset()) * M, D = this - $, w = function() {
          return u.m(o, $);
        };
        switch (f) {
          case O:
            s = w() / 12;
            break;
          case p:
            s = w();
            break;
          case tt:
            s = w() / 3;
            break;
          case y:
            s = (D - v) / 6048e5;
            break;
          case c:
            s = (D - v) / 864e5;
            break;
          case S:
            s = D / q;
            break;
          case h:
            s = D / M;
            break;
          case _:
            s = D / b;
            break;
          default:
            s = D;
        }
        return e ? s : u.a(s);
      }, n.daysInMonth = function() {
        return this.endOf(p).$D;
      }, n.$locale = function() {
        return C[this.$L];
      }, n.locale = function(t, r) {
        if (!t)
          return this.$L;
        var e = this.clone(), s = d(t, r, !0);
        return s && (e.$L = s), e;
      }, n.clone = function() {
        return u.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, a;
    }(), J = m.prototype;
    return i.prototype = J, [["$ms", Y], ["$s", _], ["$m", h], ["$H", S], ["$W", c], ["$M", p], ["$y", O], ["$D", T]].forEach(function(a) {
      J[a[1]] = function(n) {
        return this.$g(n, a[0], a[1]);
      };
    }), i.extend = function(a, n) {
      return a.$i || (a(n, m, i), a.$i = !0), i;
    }, i.locale = d, i.isDayjs = N, i.unix = function(a) {
      return i(1e3 * a);
    }, i.en = C[W], i.Ls = C, i.p = {}, i;
  });
})(dt);
var Dt = dt.exports;
const ct = /* @__PURE__ */ pt(Dt), Mt = {
  // v-model = modelValue + update: modelValue
  modelValue: {
    // v-model绑定的属性
    type: Date
  },
  range: {
    type: Array
  }
}, gt = {
  "update:modelValue": (l) => l instanceof Date
}, bt = ["onClick"], wt = lt({
  name: "k-calendar"
}), _t = /* @__PURE__ */ lt({
  ...wt,
  props: Mt,
  emits: gt,
  setup(l, { emit: k }) {
    const b = l, M = it("calendar"), q = it("calendar-table"), Y = it("calendar-day"), _ = ct(), h = H(() => b.modelValue ? ct(b.modelValue) : _), S = ct().startOf("week").day(), c = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ], y = H(() => [
      ...c.slice(S),
      ...c.slice(0, S)
    ]), p = H(() => {
      let d = [];
      const i = h.value.startOf("month").day(), u = h.value.subtract(1, "month").endOf("month").date(), m = i - S, J = Array.from({ length: m }).map((e, s) => u - (m - s - 1)).map((e) => ({
        text: e,
        type: "prev"
      })), a = h.value.daysInMonth(), n = Array.from({ length: a }).map(
        (e, s) => ({
          text: s + 1,
          type: "current"
        })
      );
      d = [...J, ...n];
      const t = 42 - d.length, r = Array.from({
        length: t
      }).map((e, s) => ({
        text: s + 1,
        type: "next"
      }));
      return d.push(...r), Array.from({ length: 6 }).map((e, s) => {
        const o = s * 7;
        return d.slice(o, o + 7);
      });
    }), tt = H(() => h.value.subtract(1, "month").date(1)), O = H(() => h.value.add(1, "month").date(1)), T = H(() => h.value.subtract(1, "year").date(1)), et = H(() => h.value.add(1, "year").date(1));
    function nt(d) {
      L.value = d, k("update:modelValue", d.toDate());
    }
    function V(d) {
      const u = {
        "prev-month": tt.value,
        "next-month": O.value,
        "prev-year": T.value,
        "next-year": et.value,
        today: _
      }[d];
      nt(u);
    }
    function G(d, i) {
      switch (i) {
        case "prev":
          return h.value.startOf("month").subtract(1, "month").date(d);
        case "current":
          return h.value.date(d);
        case "next":
          return h.value.startOf("month").add(1, "month").date(d);
      }
    }
    const L = ft();
    function at({ text: d, type: i }) {
      const u = G(d, i);
      nt(u);
    }
    function W({ text: d, type: i }) {
      const u = [i], m = G(d, i);
      return m.isSame(L.value, "day") && u.push(Y.is("selected", !0)), m.isSame(_, "day") && u.push(Y.is("today", !0)), u;
    }
    const C = H(() => `${h.value.year()}年${h.value.month() + 1}月${h.value.day()}日`);
    function N({ text: d, type: i }) {
      const u = G(d, i);
      return {
        isSelected: u.isSame(L.value),
        day: u.format("YYYY-MM-DD"),
        date: u.toDate(),
        type: i
      };
    }
    return (d, i) => {
      const u = ht("k-button");
      return E(), z("div", {
        class: F(U(M).b())
      }, [
        x("div", {
          class: F(U(M).e("header"))
        }, [
          x("div", {
            class: F(U(M).e("title"))
          }, st(C.value), 3),
          x("div", {
            class: F(U(M).e("button-group"))
          }, [
            R(u, {
              onClick: i[0] || (i[0] = (m) => V("prev-year"))
            }, {
              default: X(() => [
                Z(" 前一年 ")
              ]),
              _: 1
            }),
            R(u, {
              onClick: i[1] || (i[1] = (m) => V("prev-month"))
            }, {
              default: X(() => [
                Z(" 上个月 ")
              ]),
              _: 1
            }),
            R(u, {
              onClick: i[2] || (i[2] = (m) => V("today"))
            }, {
              default: X(() => [
                Z(" 今天 ")
              ]),
              _: 1
            }),
            R(u, {
              onClick: i[3] || (i[3] = (m) => V("next-month"))
            }, {
              default: X(() => [
                Z(" 下个月 ")
              ]),
              _: 1
            }),
            R(u, {
              onClick: i[4] || (i[4] = (m) => V("next-year"))
            }, {
              default: X(() => [
                Z(" 下一年 ")
              ]),
              _: 1
            })
          ], 2)
        ], 2),
        x("div", {
          class: F(U(M).e("body"))
        }, [
          x("table", {
            class: F(U(q).b()),
            cellpadding: "0",
            cellspacing: "0"
          }, [
            x("thead", null, [
              x("tr", null, [
                (E(!0), z(ut, null, ot(y.value, (m) => (E(), z("th", { key: m }, st(m), 1))), 128))
              ])
            ]),
            x("tbody", null, [
              (E(!0), z(ut, null, ot(p.value, (m, J) => (E(), z("tr", { key: J }, [
                (E(!0), z(ut, null, ot(m, (a, n) => (E(), z("td", {
                  key: n,
                  class: F([U(Y).b(), W(a)]),
                  onClick: (t) => at(a)
                }, [
                  $t(d.$slots, "date-cell", {
                    data: N(a)
                  }, () => [
                    Z(st(a.text), 1)
                  ])
                ], 10, bt))), 128))
              ]))), 128))
            ])
          ], 2)
        ], 2)
      ], 2);
    };
  }
}), kt = yt(_t);
export {
  gt as calendarEmits,
  Mt as calendarProps,
  kt as default
};
