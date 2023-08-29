import { defineComponent as z, ref as d, reactive as $, computed as m, watch as M, onMounted as f, createVNode as b } from "vue";
function g(t) {
  return t.install = function(s) {
    const { name: a } = t;
    s.component(a, t);
  }, t;
}
function r(t, s, a, c) {
  return s && (t += `-${s}`), a && (t += `__${a}`), c && (t += `--${c}`), t;
}
function _(t) {
  return {
    b: (e = "") => r(t, e, "", ""),
    e: (e = "") => e ? r(t, "", e, "") : "",
    m: (e = "") => e ? r(t, "", "", e) : "",
    be: (e = "", n = "") => e && n ? r(t, e, n, "") : "",
    bm: (e = "", n = "") => e && n ? r(t, e, "", n) : "",
    em: (e = "", n = "") => e && n ? r(t, "", e, n) : "",
    bem: (e = "", n = "", u = "") => e && n && u ? r(t, e, n, u) : "",
    is: (e, n) => n ? `is-${e}` : ""
  };
}
function w(t) {
  const s = `k-${t}`;
  return _(s);
}
const T = /* @__PURE__ */ z({
  name: "KVirtualList",
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      default: 8,
      type: Number
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(t, {
    slots: s
  }) {
    const a = w("vl"), c = d(), i = d(), l = $({
      // 计算显示的区域
      start: 0,
      end: t.remain
    }), o = m(() => Math.min(l.start, t.remain)), h = m(() => Math.min(t.remain, t.items.length - l.end)), y = m(() => t.items.slice(l.start - o.value, l.end + h.value)), e = d(0), n = () => {
      const v = c.value.scrollTop;
      l.start = Math.floor(v / t.size), l.end = l.start + t.remain, e.value = l.start * t.size - t.size * o.value;
    };
    function u() {
      c.value.style.height = t.remain * t.size + "px", i.value.style.height = t.items.length * t.size + "px";
    }
    return M(() => t.items, () => u()), f(() => u()), () => b("div", {
      class: a.b(),
      ref: c,
      onScroll: n
    }, [b("div", {
      class: a.e("scroll-bar"),
      ref: i
    }, null), b("div", {
      class: a.e("scroll-list"),
      style: {
        transform: `translate3d(0,${e.value}px,0)`
      }
    }, [y.value.map((v, V) => s.default({
      node: v
    }))])]);
  }
}), A = g(T);
export {
  A as default
};
