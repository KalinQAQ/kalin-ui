import { defineComponent as d, createVNode as y, computed as M, openBlock as i, createElementBlock as _, normalizeClass as v, unref as s, normalizeStyle as E, renderSlot as z, useSlots as P, createBlock as u, withCtx as C, resolveDynamicComponent as k, createCommentVNode as p } from "vue";
const w = /* @__PURE__ */ d({
  name: "Loading",
  render() {
    return y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024",
      class: "loading"
    }, [y("path", {
      d: "M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z",
      fill: "currentColor"
    }, null)]);
  }
});
function l(n, e, c, a) {
  return e && (n += `-${e}`), c && (n += `__${c}`), a && (n += `--${a}`), n;
}
function S(n) {
  return {
    b: (t = "") => l(n, t, "", ""),
    e: (t = "") => t ? l(n, "", t, "") : "",
    m: (t = "") => t ? l(n, "", "", t) : "",
    be: (t = "", r = "") => t && r ? l(n, t, r, "") : "",
    bm: (t = "", r = "") => t && r ? l(n, t, "", r) : "",
    em: (t = "", r = "") => t && r ? l(n, "", t, r) : "",
    bem: (t = "", r = "", g = "") => t && r && g ? l(n, t, r, g) : "",
    is: (t, r) => r ? `is-${t}` : ""
  };
}
function h(n) {
  const e = `k-${n}`;
  return S(e);
}
const I = {
  color: String,
  size: [Number, String]
}, L = d({
  name: "k-icon"
}), T = /* @__PURE__ */ d({
  ...L,
  props: I,
  setup(n) {
    const e = n, c = h("icon"), a = M(() => !e.size && !e.color ? {} : {
      ...e.size ? { "font-size": e.size + "px" } : {},
      ...e.color ? { color: e.color } : {}
    });
    return (m, b) => (i(), _("i", {
      class: v(s(c).b()),
      style: E(a.value)
    }, [
      z(m.$slots, "default")
    ], 6));
  }
});
function B(n) {
  return n.install = function(e) {
    const { name: c } = n;
    e.component(c, n);
  }, n;
}
const f = B(T), V = {
  size: String,
  type: {
    type: String,
    validator: (n) => [
      "primary",
      "success",
      "warning",
      "danger",
      "info",
      "default"
    ].includes(n),
    default: ""
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String,
    default: "button"
  },
  iconPlacement: {
    type: String,
    default: ""
  }
}, A = {
  click: (n) => n instanceof MouseEvent,
  mousedown: (n) => n instanceof MouseEvent
}, D = ["type", "disabled"], j = d({
  name: "k-button",
  inheritAttrs: !1
}), q = /* @__PURE__ */ d({
  ...j,
  props: V,
  emits: A,
  setup(n, { emit: e }) {
    const c = h("button"), a = P(), m = (o) => {
      e("click", o);
    }, b = (o) => {
      e("mousedown", o);
    };
    return (o, $) => (i(), _("button", {
      class: v([
        s(c).b(),
        s(c).m(o.type),
        s(c).m(o.size),
        s(c).is("round", o.round),
        s(c).is("loading", o.loading),
        s(c).is("disabled", o.disabled)
      ]),
      type: o.nativeType,
      disabled: o.disabled || o.loading,
      onClick: m,
      onMousedown: b
    }, [
      o.iconPlacement === "left" ? (i(), u(s(f), { key: 0 }, {
        default: C(() => [
          o.loading ? (i(), u(s(w), { key: 0 })) : s(a).icon ? (i(), u(k(s(a).icon), { key: 1 })) : p("", !0)
        ]),
        _: 1
      })) : p("", !0),
      z(o.$slots, "default"),
      o.iconPlacement === "right" ? (i(), u(s(f), { key: 1 }, {
        default: C(() => [
          o.loading ? (i(), u(s(w), { key: 0 })) : s(a).icon ? (i(), u(k(s(a).icon), { key: 1 })) : p("", !0)
        ]),
        _: 1
      })) : p("", !0)
    ], 42, D));
  }
}), H = B(q);
export {
  H as default
};
