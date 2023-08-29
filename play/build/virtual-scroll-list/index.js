import { defineComponent as N, ref as k, onMounted as x, onUpdated as R, createVNode as v, onBeforeMount as B } from "vue";
function E(t) {
  return t.install = function(a) {
    const { name: u } = t;
    a.component(u, t);
  }, t;
}
const D = {
  dataSources: {
    // 传入要渲染的总数居
    type: Array,
    required: !0,
    default: () => []
  },
  dataKey: {
    // 每项数据的标识
    type: String,
    required: !0
  },
  keeps: {
    // 默认显示的个数
    type: Number,
    default: 30
  },
  estimateSize: {
    // 大约的高度
    type: Number,
    default: 80
  },
  dataComponent: {
    // 用户告诉我们用哪个组件来渲染
    type: [Object, Function],
    required: !0
  }
}, K = {
  uniqueKey: {
    type: [String, Number]
  },
  source: {
    type: Object,
    required: !0
  },
  component: {
    type: [Object, Function]
  }
};
function O(t, a) {
  let u = 0, c = "INIT", s = 0, d = 0;
  const f = /* @__PURE__ */ new Map(), l = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0
  };
  function h() {
    return c === "FIXED";
  }
  function m() {
    return h() ? d : s || t.estimateSize;
  }
  function i(e) {
    if (!e)
      return 0;
    let n = 0;
    for (let o = 0; o < e; o++) {
      const r = f.get(t.uniqueIds[o]);
      n += typeof r == "number" ? r : m();
    }
    return n;
  }
  function p() {
    return h() ? d * l.start : i(l.start);
  }
  function I() {
    return (t.uniqueIds.length - 1 - l.end) * m();
  }
  function z(e, n) {
    l.start = e, l.end = n, l.padFront = p(), l.padBehind = I(), a({ ...l });
  }
  function y(e, n) {
    const o = t.uniqueIds.length, r = t.keeps;
    o < r ? (e = 0, n = o - 1) : n - e < r - 1 && (e = n - r + 1), z(e, n);
  }
  function q() {
    if (h())
      return Math.floor(u / m());
    {
      let e = 0, n = t.uniqueIds.length, o = 0, r = 0;
      for (; e <= n; ) {
        if (o = e + Math.floor((n - e) / 2), r = i(o), r == u)
          return o;
        r < u ? e = o + 1 : r > u && (n = o - 1);
      }
      return e > 0 ? --e : 0;
    }
  }
  function g(e) {
    const n = e + t.keeps - 1;
    return Math.min(n, t.uniqueIds.length - 1);
  }
  function S() {
    const e = q();
    if (e > l.start)
      return;
    const n = Math.max(e - t.buffer, 0);
    y(n, g(n));
  }
  function F() {
    const e = q();
    e < l.start + t.buffer || y(e, g(e));
  }
  function M(e) {
    const n = e < u ? "FRONT" : "BEHIND";
    u = e, n === "FRONT" ? S() : n === "BEHIND" && F();
  }
  function b(e, n) {
    f.set(e, n), c === "INIT" ? (d = n, c = "FIXED") : c === "FIXED" && d !== n && (c = "DYNAMIC", d = 0), c === "DYNAMIC" && f.size < Math.min(t.keeps, t.uniqueIds.length) && (s = [...f.values()].reduce((o, r) => o + r, 0) / f.size);
  }
  return y(0, t.keeps - 1), {
    handleScroll: M,
    saveSize: b
  };
}
const V = /* @__PURE__ */ N({
  name: "virtual-item",
  props: K,
  emits: ["itemResize"],
  // @itemResize
  setup(t, {
    emit: a
  }) {
    const u = k(null);
    function c() {
      var s;
      a("itemResize", t.uniqueKey, (s = u.value) == null ? void 0 : s.offsetHeight);
    }
    return x(c), R(c), () => {
      const {
        component: s,
        source: d,
        uniqueKey: f
      } = t;
      return s && v("div", {
        key: f,
        ref: u
      }, [v(s, {
        source: d
      }, null)]);
    };
  }
}), C = /* @__PURE__ */ N({
  name: "k-virtual-scroll-list",
  props: D,
  setup(t, {}) {
    const a = k(null), u = (i) => {
      a.value = i;
    }, c = () => {
      const {
        dataSources: i,
        dataKey: p
      } = t;
      return i.map((I) => I[p]);
    };
    let s;
    const d = () => {
      s = O({
        keeps: t.keeps,
        buffer: Math.round(t.keeps / 3),
        uniqueIds: c(),
        estimateSize: t.estimateSize
      }, u);
    };
    B(() => {
      d();
    });
    function f() {
      const i = [], {
        start: p,
        end: I
      } = a.value, {
        dataSources: z,
        dataComponent: y,
        dataKey: q
      } = t;
      for (let g = p; g <= I; g++) {
        const S = z[g];
        if (S) {
          const F = S[q];
          i.push(
            // <dataComponent key={uniqueKey} source={dataSource}></dataComponent>
            v(V, {
              uniqueKey: F,
              source: S,
              component: y,
              onItemResize: l
            }, null)
          );
        }
      }
      return i;
    }
    function l(i, p) {
      s.saveSize(i, p);
    }
    const h = k();
    function m() {
      if (h.value) {
        const i = h.value.scrollTop;
        s.handleScroll(i);
      }
    }
    return () => {
      const {
        padBehind: i,
        padFront: p
      } = a.value, I = {
        padding: `${p}px 0 ${i}px`
      };
      return v("div", {
        onScroll: m,
        ref: h
      }, [v("div", {
        style: I
      }, [f()])]);
    };
  }
}), w = E(C);
export {
  w as default,
  K as virtualItemProps,
  D as virtualProps
};
