import { defineComponent as k, createVNode as C, computed as z, openBlock as g, createElementBlock as x, normalizeClass as S, unref as u, normalizeStyle as W, renderSlot as G, inject as H, toRef as le, ref as v, watch as T, onMounted as q, createElementVNode as E, withDirectives as se, vModelCheckbox as ae, Fragment as oe, createTextVNode as re, toDisplayString as ce, createCommentVNode as j, withCtx as J, createBlock as V, reactive as ie, provide as de, useSlots as ue } from "vue";
function I(t) {
  return t.install = function(a) {
    const { name: l } = t;
    a.component(l, t);
  }, t;
}
function B(t, a, l, d) {
  return a && (t += `-${a}`), l && (t += `__${l}`), d && (t += `--${d}`), t;
}
function fe(t) {
  return {
    b: (n = "") => B(t, n, "", ""),
    e: (n = "") => n ? B(t, "", n, "") : "",
    m: (n = "") => n ? B(t, "", "", n) : "",
    be: (n = "", c = "") => n && c ? B(t, n, c, "") : "",
    bm: (n = "", c = "") => n && c ? B(t, n, "", c) : "",
    em: (n = "", c = "") => n && c ? B(t, "", n, c) : "",
    bem: (n = "", c = "", m = "") => n && c && m ? B(t, n, c, m) : "",
    is: (n, c) => c ? `is-${n}` : ""
  };
}
function N(t) {
  const a = `k-${t}`;
  return fe(a);
}
const ye = {
  // as const 是一种 TypeScript 语言的语法，在这里它是用来告诉编译器将定义的对象的属性设为只读，确保对象在运行过程中不会被错误地写入其他值。
  data: {
    type: Array,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  laelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  onLoad: Function,
  selectedKeys: {
    type: Array
  },
  selectable: {
    type: Boolean,
    default: !0
  },
  multiple: {
    type: Boolean,
    default: !1
  },
  showCheckbox: {
    type: Boolean,
    default: !1
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  }
}, he = {
  node: {
    type: Object,
    required: !0
  },
  expanded: {
    type: Boolean,
    required: !0
  },
  loadingKeys: {
    type: Object,
    required: !0
  },
  selectedKeys: {
    type: Array,
    default: []
  },
  showCheckbox: {
    type: Boolean,
    required: !1
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean
}, pe = {
  toggle: (t) => t,
  select: (t) => t,
  check: (t, a) => typeof a == "boolean"
}, ke = {
  // 内部发射的事件，用来同步响应式数据
  "update:selectedKeys": (t) => t
}, O = Symbol(), me = {
  node: {
    type: Object,
    required: !0
  }
}, be = /* @__PURE__ */ k({
  name: "Switcher",
  render() {
    return C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32"
    }, [C("path", {
      d: "M12 8l10 8l-10 8z"
    }, null)]);
  }
}), ve = {
  color: String,
  size: [Number, String]
}, ge = k({
  name: "k-icon"
}), Ce = /* @__PURE__ */ k({
  ...ge,
  props: ve,
  setup(t) {
    const a = t, l = N("icon"), d = z(() => !a.size && !a.color ? {} : {
      ...a.size ? { "font-size": a.size + "px" } : {},
      ...a.color ? { color: a.color } : {}
    });
    return (h, f) => (g(), x("i", {
      class: S(u(l).b()),
      style: W(d.value)
    }, [
      G(h.$slots, "default")
    ], 6));
  }
}), Ke = I(Ce), we = /* @__PURE__ */ k({
  name: "Loading",
  render() {
    return C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024",
      class: "loading"
    }, [C("path", {
      d: "M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z",
      fill: "currentColor"
    }, null)]);
  }
}), Se = /* @__PURE__ */ k({
  name: "KTreeNodeContent",
  props: me,
  setup(t) {
    const a = H(O), l = le(t, "node");
    return () => a != null && a.slots.default ? a == null ? void 0 : a.slots.default({
      node: l.value
    }) : l.value.label;
  }
}), $e = {
  modelValue: {
    type: [Boolean, String, Number]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String
  }
}, ze = {
  "update:modelValue": (t) => typeof t == "boolean",
  change: (t) => typeof t == "boolean"
}, Be = ["disabled", "value"], Le = k({
  name: "k-checkbox"
}), xe = /* @__PURE__ */ k({
  ...Le,
  props: $e,
  emits: ze,
  setup(t, { emit: a }) {
    const l = t, d = N("checkbox"), h = v(), f = z({
      get() {
        return l.modelValue;
      },
      set(r) {
        a("update:modelValue", r);
      }
    });
    function p(r) {
      h.value.indeterminate = r;
    }
    function K(r) {
      const c = !!r.target.checked;
      a("change", c);
    }
    return T(() => l.indeterminate, p), q(() => {
      p(l.indeterminate);
    }), (r, n) => (g(), x("label", {
      class: S(u(d).b())
    }, [
      E("span", {
        class: S(u(d).e("input"))
      }, [
        se(E("input", {
          ref_key: "inputRef",
          ref: h,
          "onUpdate:modelValue": n[0] || (n[0] = (c) => f.value = c),
          type: "checkbox",
          disabled: r.disabled,
          value: r.label,
          onChange: K
        }, null, 40, Be), [
          [ae, f.value]
        ])
      ], 2),
      r.$slots.default || r.label ? (g(), x("span", {
        key: 0,
        class: S(u(d).e("label"))
      }, [
        G(r.$slots, "default"),
        r.$slots.default ? j("", !0) : (g(), x(oe, { key: 0 }, [
          re(ce(r.label), 1)
        ], 64))
      ], 2)) : j("", !0)
    ], 2));
  }
}), _e = I(xe), Ee = /* @__PURE__ */ k({
  __name: "treeNode",
  props: he,
  emits: pe,
  setup(t, { emit: a }) {
    const l = t, d = N("tree-node");
    function h() {
      a("toggle", l.node);
    }
    const f = z(() => {
      var n;
      return (n = l.loadingKeys) == null ? void 0 : n.has(l.node.key);
    }), p = z(() => l.selectedKeys.includes(l.node.key)), K = (n) => {
      n != null && n.disabled || a("select", n);
    };
    function r(n) {
      a("check", l.node, n);
    }
    return H(O), (n, c) => {
      var m;
      return g(), x("div", {
        class: S([
          u(d).b(),
          u(d).is("selected", p.value),
          u(d).is("disabled", n.node.disabled)
        ])
      }, [
        E("div", {
          class: S([u(d).e("content")]),
          style: W({ paddingLeft: `${n.node.level * 16}px` })
        }, [
          E("span", {
            class: S([
              u(d).e("expand-icon"),
              { expanded: n.expanded && !((m = n.node) != null && m.isLeaf) },
              u(d).is("leaf", n.node.isLeaf)
            ]),
            onClick: h
          }, [
            C(u(Ke), {
              size: "25",
              color: "pink"
            }, {
              default: J(() => [
                f.value ? (g(), V(u(we), { key: 1 })) : (g(), V(u(be), { key: 0 }))
              ]),
              _: 1
            })
          ], 2),
          n.showCheckbox ? (g(), V(u(_e), {
            key: 0,
            disabled: n.disabled,
            "model-value": n.checked,
            indeterminate: n.indeterminate,
            onChange: r
          }, null, 8, ["disabled", "model-value", "indeterminate"])) : j("", !0),
          E("span", {
            class: S(u(d).e("label")),
            onClick: c[0] || (c[0] = ($) => K(n.node))
          }, [
            C(u(Se), { node: n.node }, null, 8, ["node"])
          ], 2)
        ], 6)
      ], 2);
    };
  }
}), Ne = /* @__PURE__ */ k({
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
    slots: a
  }) {
    const l = N("vl"), d = v(), h = v(), f = ie({
      // 计算显示的区域
      start: 0,
      end: t.remain
    }), p = z(() => Math.min(f.start, t.remain)), K = z(() => Math.min(t.remain, t.items.length - f.end)), r = z(() => t.items.slice(f.start - p.value, f.end + K.value)), n = v(0), c = () => {
      const $ = d.value.scrollTop;
      f.start = Math.floor($ / t.size), f.end = f.start + t.remain, n.value = f.start * t.size - t.size * p.value;
    };
    function m() {
      d.value.style.height = t.remain * t.size + "px", h.value.style.height = t.items.length * t.size + "px";
    }
    return T(() => t.items, () => m()), q(() => m()), () => C("div", {
      class: l.b(),
      ref: d,
      onScroll: c
    }, [C("div", {
      class: l.e("scroll-bar"),
      ref: h
    }, null), C("div", {
      class: l.e("scroll-list"),
      style: {
        transform: `translate3d(0,${n.value}px,0)`
      }
    }, [r.value.map(($, P) => a.default({
      node: $
    }))])]);
  }
}), Ve = k({ name: "k-tree" }), Te = /* @__PURE__ */ k({
  ...Ve,
  props: ye,
  emits: ke,
  setup(t, { emit: a }) {
    const l = t, d = N("tree"), h = v([]);
    function f(e, s, o) {
      return {
        getKey(i) {
          return i[e];
        },
        getLabel(i) {
          return i[s];
        },
        getChildren(i) {
          return i[o];
        }
      };
    }
    const p = f(
      l.keyField,
      l.laelField,
      l.childrenField
    );
    function K(e, s = null) {
      function o(y, w = null) {
        return y.map((b) => {
          const M = p.getChildren(b) || [], A = {
            key: p.getKey(b),
            label: p.getLabel(b),
            children: [],
            // 默认为空
            rawNode: b,
            level: w ? w.level + 1 : 0,
            disabled: !!b.disabled,
            // 判断节点是否自带isLeaf 如果自带了 以自带的为准，否则看一下是否有children属性
            // 对 || 的增强
            isLeaf: b.isLeaf ?? M.length == 0,
            parentKey: w == null ? void 0 : w.key
          };
          return M.length > 0 && (A.children = o(M, A)), A;
        });
      }
      return o(e, s);
    }
    T(
      () => l.data,
      (e) => {
        h.value = K(e);
      },
      { immediate: !0 }
    );
    const r = v(new Set(l.defaultExpandedKeys)), n = z(() => {
      const e = r.value, s = [], o = h.value || [], i = [];
      for (let y = o.length - 1; y >= 0; --y)
        i.push(o[y]);
      for (; i.length; ) {
        const y = i.pop();
        if (y && (s.push(y), e.has(y.key) && y.children))
          for (let b = y.children.length - 1; b >= 0; --b)
            i.push(y.children[b]);
      }
      return s;
    });
    function c(e) {
      return r.value.has(e.key);
    }
    function m(e) {
      r.value.delete(e.key);
    }
    const $ = v(/* @__PURE__ */ new Set());
    function P(e) {
      if (!e.children.length && !e.isLeaf) {
        const s = $.value;
        if (!s.has(e.key)) {
          s.add(e.key);
          const { onLoad: o } = l;
          o && o(e.rawNode).then((i) => {
            e.rawNode.children = i, e.children = K(i, e), s.delete(e.key);
          });
        }
      }
    }
    function Q(e) {
      r.value.add(e.key), P(e);
    }
    function X(e) {
      r.value.has(e.key) && !$.value.has(e.key) ? m(e) : Q(e);
    }
    const R = v([]);
    T(
      () => l.selectedKeys,
      // 监控selectedKeys
      (e) => {
        e && (R.value = e);
      },
      {
        immediate: !0
      }
    );
    function Y(e) {
      let s = Array.from(R.value);
      if (l.selectable) {
        if (l.multiple) {
          const o = s.findIndex((i) => i === e.key);
          o > -1 ? s.splice(o, 1) : s.push(e.key);
        } else
          s.includes(e.key) ? s = [] : s = [e.key];
        a("update:selectedKeys", s);
      }
    }
    de(O, {
      slots: ue()
    });
    const L = v(new Set(l.defaultCheckedKeys));
    function Z(e) {
      return L.value.has(e.key);
    }
    function ee(e) {
      return !!e.disabled;
    }
    const _ = v(/* @__PURE__ */ new Set());
    function te(e) {
      return _.value.has(e.key);
    }
    function F(e, s) {
      if (!e)
        return;
      const o = L.value;
      s && _.value.delete(e.key), o[s ? "add" : "delete"](e.key);
      const i = e.children;
      i && i.forEach((y) => {
        y.disabled || F(y, s);
      });
    }
    function D(e) {
      return n.value.find((s) => s.key === e);
    }
    function U(e) {
      if (e.parentKey) {
        const s = D(e.parentKey);
        if (s) {
          let o = !0, i = !1;
          const y = s.children;
          for (const w of y)
            L.value.has(w.key) ? i = !0 : _.value.has(w.key) ? (o = !1, i = !0) : o = !1;
          o ? (L.value.add(s.key), _.value.delete(s.key)) : i && (L.value.delete(s.key), _.value.add(s.key)), U(s);
        }
      }
    }
    function ne(e, s) {
      F(e, s), U(e);
    }
    return q(() => {
      L.value.forEach((e) => {
        F(D(e), !0);
      });
    }), (e, s) => (g(), x("div", {
      class: S(u(d).b())
    }, [
      C(u(Ne), {
        items: n.value,
        remain: 8,
        size: 35
      }, {
        default: J(({ node: o }) => [
          (g(), V(Ee, {
            key: o.key,
            node: o,
            expanded: c(o),
            "loading-keys": $.value,
            "selected-keys": R.value,
            disabled: ee(o),
            "show-checkbox": e.showCheckbox,
            checked: Z(o),
            indeterminate: te(o),
            onSelect: Y,
            onToggle: (i) => X(o),
            onCheck: ne
          }, null, 8, ["node", "expanded", "loading-keys", "selected-keys", "disabled", "show-checkbox", "checked", "indeterminate", "onToggle"]))
        ]),
        _: 1
      }, 8, ["items"])
    ], 2));
  }
}), Fe = I(Te);
export {
  Fe as default,
  ke as treeEmitts,
  O as treeInjectKey,
  me as treeNodeContentProps,
  pe as treeNodeEmitts,
  he as treeNodeProps,
  ye as treeProps
};
