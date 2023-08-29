import { defineComponent as a, computed as b, openBlock as i, createElementBlock as z, normalizeClass as $, unref as p, normalizeStyle as y, renderSlot as B } from "vue";
function r(n, o, c, e) {
  return o && (n += `-${o}`), c && (n += `__${c}`), e && (n += `--${e}`), n;
}
function g(n) {
  return {
    b: (t = "") => r(n, t, "", ""),
    e: (t = "") => t ? r(n, "", t, "") : "",
    m: (t = "") => t ? r(n, "", "", t) : "",
    be: (t = "", s = "") => t && s ? r(n, t, s, "") : "",
    bm: (t = "", s = "") => t && s ? r(n, t, "", s) : "",
    em: (t = "", s = "") => t && s ? r(n, "", t, s) : "",
    bem: (t = "", s = "", l = "") => t && s && l ? r(n, t, s, l) : "",
    is: (t, s) => s ? `is-${t}` : ""
  };
}
function h(n) {
  const o = `k-${n}`;
  return g(o);
}
const m = {
  color: String,
  size: [Number, String]
}, C = a({
  name: "k-icon"
}), E = /* @__PURE__ */ a({
  ...C,
  props: m,
  setup(n) {
    const o = n, c = h("icon"), e = b(() => !o.size && !o.color ? {} : {
      ...o.size ? { "font-size": o.size + "px" } : {},
      ...o.color ? { color: o.color } : {}
    });
    return (u, _) => (i(), z("i", {
      class: $(p(c).b()),
      style: y(e.value)
    }, [
      B(u.$slots, "default")
    ], 6));
  }
});
function I(n) {
  return n.install = function(o) {
    const { name: c } = n;
    o.component(c, n);
  }, n;
}
const P = I(E);
export {
  P as default,
  m as iconProps
};
