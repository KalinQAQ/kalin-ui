import { defineComponent as v, ref as V, computed as $, watch as C, onMounted as f, openBlock as b, createElementBlock as i, normalizeClass as m, unref as p, createElementVNode as k, withDirectives as B, vModelCheckbox as _, renderSlot as E, Fragment as w, createTextVNode as M, toDisplayString as D, createCommentVNode as y } from "vue";
function c(e, a, s, l) {
  return a && (e += `-${a}`), s && (e += `__${s}`), l && (e += `--${l}`), e;
}
function R(e) {
  return {
    b: (t = "") => c(e, t, "", ""),
    e: (t = "") => t ? c(e, "", t, "") : "",
    m: (t = "") => t ? c(e, "", "", t) : "",
    be: (t = "", n = "") => t && n ? c(e, t, n, "") : "",
    bm: (t = "", n = "") => t && n ? c(e, t, "", n) : "",
    em: (t = "", n = "") => t && n ? c(e, "", t, n) : "",
    bem: (t = "", n = "", g = "") => t && n && g ? c(e, t, n, g) : "",
    is: (t, n) => n ? `is-${t}` : ""
  };
}
function z(e) {
  const a = `k-${e}`;
  return R(a);
}
const F = {
  modelValue: {
    type: [Boolean, String, Number]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String
  }
}, I = {
  "update:modelValue": (e) => typeof e == "boolean",
  change: (e) => typeof e == "boolean"
}, P = ["disabled", "value"], T = v({
  name: "k-checkbox"
}), U = /* @__PURE__ */ v({
  ...T,
  props: F,
  emits: I,
  setup(e, { emit: a }) {
    const s = e, l = z("checkbox"), u = V(), r = $({
      get() {
        return s.modelValue;
      },
      set(o) {
        a("update:modelValue", o);
      }
    });
    function d(o) {
      u.value.indeterminate = o;
    }
    function h(o) {
      const n = !!o.target.checked;
      a("change", n);
    }
    return C(() => s.indeterminate, d), f(() => {
      d(s.indeterminate);
    }), (o, t) => (b(), i("label", {
      class: m(p(l).b())
    }, [
      k("span", {
        class: m(p(l).e("input"))
      }, [
        B(k("input", {
          ref_key: "inputRef",
          ref: u,
          "onUpdate:modelValue": t[0] || (t[0] = (n) => r.value = n),
          type: "checkbox",
          disabled: o.disabled,
          value: o.label,
          onChange: h
        }, null, 40, P), [
          [_, r.value]
        ])
      ], 2),
      o.$slots.default || o.label ? (b(), i("span", {
        key: 0,
        class: m(p(l).e("label"))
      }, [
        E(o.$slots, "default"),
        o.$slots.default ? y("", !0) : (b(), i(w, { key: 0 }, [
          M(D(o.label), 1)
        ], 64))
      ], 2)) : y("", !0)
    ], 2));
  }
});
function j(e) {
  return e.install = function(a) {
    const { name: s } = e;
    a.component(s, e);
  }, e;
}
const A = j(U);
export {
  I as checkboxEmits,
  F as checkboxProps,
  A as default
};
