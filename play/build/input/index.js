import { defineComponent as z, inject as Y, useSlots as Z, useAttrs as x, watch as ee, ref as O, onMounted as te, resolveComponent as ne, openBlock as d, createElementBlock as g, normalizeClass as f, unref as a, createElementVNode as S, renderSlot as E, createCommentVNode as v, mergeProps as se, createBlock as P, withCtx as R, createTextVNode as $, nextTick as oe } from "vue";
function le(e) {
  return e.install = function(t) {
    const { name: n } = e;
    t.component(n, e);
  }, e;
}
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const re = () => {
}, G = Object.assign, ce = Array.isArray, ae = (e) => typeof e == "function", T = (e) => typeof e == "string", ie = (e) => typeof e == "symbol";
let ue;
function pe(e, t = ue) {
  t && t.active && t.effects.push(e);
}
const C = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, W = (e) => (e.w & p) > 0, q = (e) => (e.n & p) > 0, de = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= p;
}, fe = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const l = t[s];
      W(l) && !q(l) ? l.delete(e) : t[n++] = l, l.w &= ~p, l.n &= ~p;
    }
    t.length = n;
  }
};
let _ = 0, p = 1;
const D = 30;
let i;
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class he {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, pe(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = i, n = k;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = i, i = this, k = !0, p = 1 << ++_, _ <= D ? de(this) : I(this), this.fn();
    } finally {
      _ <= D && fe(this), p = 1 << --_, i = this.parent, k = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    i === this ? this.deferStop = !0 : this.active && (I(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function I(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let k = !0;
function M(e, t) {
  let n = !1;
  _ <= D ? q(e) || (e.n |= p, n = !W(e)) : n = !e.has(i), n && (e.add(i), i.deps.push(e), process.env.NODE_ENV !== "production" && i.onTrack && i.onTrack(
    G(
      {
        effect: i
      },
      t
    )
  ));
}
function j(e, t) {
  const n = ce(e) ? e : [...e];
  for (const s of n)
    s.computed && A(s, t);
  for (const s of n)
    s.computed || A(s, t);
}
function A(e, t) {
  (e !== i || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(G({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ie)
);
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function ye(e) {
  k && i && (e = V(e), process.env.NODE_ENV !== "production" ? M(e.dep || (e.dep = C()), {
    target: e,
    type: "get",
    key: "value"
  }) : M(e.dep || (e.dep = C())));
}
function ve(e, t) {
  e = V(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? j(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : j(n));
}
class ge {
  constructor(t, n, s, l) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new he(t, () => {
      this._dirty || (this._dirty = !0, ve(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !l, this.__v_isReadonly = s;
  }
  get value() {
    const t = V(this);
    return ye(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function F(e, t, n = !1) {
  let s, l;
  const u = ae(e);
  u ? (s = e, l = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : re) : (s = e.get, l = e.set);
  const y = new ge(s, l, u || !l, n);
  return process.env.NODE_ENV !== "production" && t && !n && (y.effect.onTrack = t.onTrack, y.effect.onTrigger = t.onTrigger), y;
}
function h(e, t, n, s) {
  return t && (e += `-${t}`), n && (e += `__${n}`), s && (e += `--${s}`), e;
}
function _e(e) {
  return {
    b: (o = "") => h(e, o, "", ""),
    e: (o = "") => o ? h(e, "", o, "") : "",
    m: (o = "") => o ? h(e, "", "", o) : "",
    be: (o = "", c = "") => o && c ? h(e, o, c, "") : "",
    bm: (o = "", c = "") => o && c ? h(e, o, "", c) : "",
    em: (o = "", c = "") => o && c ? h(e, "", o, c) : "",
    bem: (o = "", c = "", b = "") => o && c && b ? h(e, o, c, b) : "",
    is: (o, c) => c ? `is-${o}` : ""
  };
}
function we(e) {
  const t = `k-${e}`;
  return _e(t);
}
const be = {
  modelValue: {
    // v-model绑定的属性
    type: [Number, String],
    default: ""
  },
  // 输入框类型
  type: { type: String, default: "text" },
  // 输入提示
  placeholder: { type: String },
  // 是否禁用
  disabled: { type: Boolean, default: !1 },
  //是否仅读
  readonly: { type: Boolean, default: !1 },
  // 是否带有清空按钮
  clearable: { type: Boolean },
  // 密码框是否显示密码
  showPassword: { type: Boolean, default: !1 },
  // input配合的label属性
  label: { type: String }
}, Ee = {
  "update:modelValue": (e) => T(e),
  input: (e) => T(e),
  change: (e) => T(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  keydown: (e) => e instanceof Event,
  // input相关事件
  clear: () => !0
  // 清空事件
}, ke = ["type", "placeholder", "disabled", "readonly"], Ve = z({
  name: "k-input",
  inheritAttrs: !1
}), me = /* @__PURE__ */ z({
  ...Ve,
  props: be,
  emits: Ee,
  setup(e, { emit: t }) {
    const n = e, s = Y("form-item"), l = we("input"), u = Z(), y = x();
    ee(
      // 监控值的变化，设置输入框的值
      () => n.modelValue,
      () => {
        s == null || s.validate("change"), m();
      }
    );
    const w = O(null), m = () => {
      const r = w.value;
      r && (r.value = String(n.modelValue));
    };
    te(() => {
      m();
    });
    const o = async () => {
      var r;
      await oe(), (r = w.value) == null || r.focus();
    }, c = O(!1), b = F(() => n.modelValue && n.showPassword && !n.disabled && !n.readonly), H = () => {
      c.value = !c.value, o();
    }, J = F(() => n.modelValue && n.clearable && !n.disabled && !n.readonly), K = () => {
      t("input", ""), t("update:modelValue", ""), t("clear"), o();
    }, L = (r) => {
      const N = r.target.value;
      t("input", N), t("update:modelValue", N);
    }, Q = (r) => {
      t("change", r.target.value);
    }, U = (r) => {
      t("focus", r);
    }, X = (r) => {
      s == null || s.validate("blur"), t("blur", r);
    };
    return (r, N) => {
      const B = ne("k-icon");
      return d(), g("div", {
        class: f([a(l).b()])
      }, [
        S("div", {
          class: f(a(l).e("group"))
        }, [
          a(u).prepend ? (d(), g("div", {
            key: 0,
            class: f(a(l).be("group", "prepend"))
          }, [
            E(r.$slots, "prepend")
          ], 2)) : v("", !0),
          S("div", {
            class: f([a(l).e("wrapper")])
          }, [
            a(u).prefixIcon ? (d(), g("span", {
              key: 0,
              class: f(a(l).e("prefix"))
            }, [
              E(r.$slots, "prefixIcon")
            ], 2)) : v("", !0),
            S("input", se(a(y), {
              ref_key: "input",
              ref: w,
              type: r.showPassword ? c.value ? "text" : "password" : r.type,
              class: a(l).e("inner"),
              placeholder: r.placeholder,
              disabled: r.disabled,
              readonly: r.readonly,
              onInput: L,
              onChange: Q,
              onBlur: X,
              onFocus: U
            }), null, 16, ke),
            a(b) ? (d(), P(B, {
              key: 1,
              style: { "line-height": "16px", "font-weight": "bold" },
              onClick: H
            }, {
              default: R(() => [
                $(" e ")
              ]),
              _: 1
            })) : v("", !0),
            a(J) ? (d(), P(B, {
              key: 2,
              style: { "line-height": "16px", "font-weight": "bold" },
              onClick: K
            }, {
              default: R(() => [
                $(" x ")
              ]),
              _: 1
            })) : v("", !0),
            a(u).sufixIcon ? (d(), g("span", {
              key: 3,
              class: f(a(l).e("suffix"))
            }, [
              E(r.$slots, "sufixIcon")
            ], 2)) : v("", !0)
          ], 2),
          a(u).append ? (d(), g("div", {
            key: 1,
            class: f(a(l).be("group", "append"))
          }, [
            E(r.$slots, "append")
          ], 2)) : v("", !0)
        ], 2)
      ], 2);
    };
  }
}), Se = le(me);
export {
  Se as Input,
  Se as default,
  Ee as inputEmits,
  be as inputProps
};
