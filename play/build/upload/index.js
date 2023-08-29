import { defineComponent as g, ref as b, openBlock as y, createElementBlock as F, withModifiers as _, renderSlot as h, normalizeClass as C, unref as k, createBlock as D, withCtx as P, createElementVNode as L, watch as U, computed as B, Fragment as j, createVNode as z, normalizeProps as q, guardReactiveProps as A, createTextVNode as M, toDisplayString as V } from "vue";
function w(t) {
  return t.install = function(s) {
    const { name: a } = t;
    s.component(a, t);
  }, t;
}
const H = ["onDragover", "onDrop"], I = /* @__PURE__ */ g({
  __name: "upload-dragger",
  emits: ["file"],
  setup(t, { emit: s }) {
    const a = b(!1), u = (r) => {
      r.stopPropagation(), s("file", Array.from(r.dataTransfer.files));
    }, d = function() {
      a.value = !0;
    };
    return (r, o) => (y(), F("div", {
      onDragover: _(d, ["prevent"]),
      onDragleave: o[0] || (o[0] = _((l) => a.value = !1, ["prevent"])),
      onDrop: _(u, ["prevent"])
    }, [
      h(r.$slots, "default")
    ], 40, H));
  }
}), R = {
  FileList: {
    type: Array,
    default: () => []
  },
  action: {
    type: String,
    default: ""
  },
  multiple: {
    type: Boolean,
    default: !1
  },
  // input中所需要的类型
  name: {
    type: String,
    default: "file"
  },
  accept: {
    type: String,
    default: ""
  },
  // 上传文件调用ajax 需要的
  method: {
    type: String,
    default: "post"
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  },
  drag: {
    type: Boolean,
    default: !1
  }
}, i = () => {
}, $ = {
  ...R,
  onPreview: {
    // 预览的时候 可以用这个回调拿到上次的图片
    type: Function,
    default: i
  },
  beforeUpload: {
    type: Function,
    default: i
  },
  onChange: {
    type: Function,
    default: i
  },
  beforeRemove: {
    type: Function,
    default: i
  },
  onRemove: {
    type: Function,
    default: i
  },
  onProgress: {
    type: Function,
    default: i
  },
  onSuccess: {
    type: Function,
    default: i
  },
  onError: {
    type: Function,
    default: i
  }
};
let T = 0;
const X = () => T++;
function p(t, s, a, u) {
  return s && (t += `-${s}`), a && (t += `__${a}`), u && (t += `--${u}`), t;
}
function G(t) {
  return {
    b: (e = "") => p(t, e, "", ""),
    e: (e = "") => e ? p(t, "", e, "") : "",
    m: (e = "") => e ? p(t, "", "", e) : "",
    be: (e = "", c = "") => e && c ? p(t, e, c, "") : "",
    bm: (e = "", c = "") => e && c ? p(t, e, "", c) : "",
    em: (e = "", c = "") => e && c ? p(t, "", e, c) : "",
    bem: (e = "", c = "", m = "") => e && c && m ? p(t, e, c, m) : "",
    is: (e, c) => c ? `is-${e}` : ""
  };
}
function J(t) {
  const s = `k-${t}`;
  return G(s);
}
const v = () => {
}, K = {
  ...R,
  beforeUpload: $.beforeUpload,
  onStart: {
    type: Function,
    default: v
  },
  onProgress: {
    type: Function,
    default: v
  },
  onRemove: {
    type: Function,
    default: v
  },
  onError: {
    type: Function,
    default: v
  },
  onSuccess: {
    type: Function,
    default: v
  }
};
function Q(t) {
  const s = new XMLHttpRequest(), a = t.action;
  if (s.open(t.method, a, !0), s.upload.addEventListener("progress", (r) => {
    const o = r;
    o.pecetange = r.total > 0 ? r.loaded / r.total * 100 : 0, t.onProgress(o);
  }), t.headers)
    for (const [r, o] of Object.entries(t.headers))
      s.setRequestHeader(r, o);
  const d = new FormData();
  if (t.data)
    for (const [r, o] of Object.entries(t.data))
      d.append(r, o);
  return d.append(t.name, t.file), s.onload = function() {
    s.status < 300 && s.status >= 200 ? t.onSuccess(s.response) : t.onError({ status: s.status });
  }, s.addEventListener("error", function(r) {
    t.onError(r);
  }), s.send(d), s;
}
const W = ["name", "accept", "multiple"], Y = g({
  name: "k-upload",
  inheritAttrs: !1
}), Z = /* @__PURE__ */ g({
  ...Y,
  props: K,
  setup(t) {
    const s = t, a = J("upload");
    async function u(n) {
      if (d.value.value = "", await s.beforeUpload(n) === !1)
        return s.onRemove(n);
      const { method: c, name: m, action: E, headers: O, data: S } = s;
      Q({
        method: c,
        name: m,
        file: n,
        action: E,
        headers: O,
        data: S,
        onError: (f) => {
          s.onError(f, n);
        },
        onSuccess: (f) => {
          s.onSuccess(f, n);
        },
        onProgress: (f) => {
          s.onProgress(f, n);
        }
      });
    }
    const d = b();
    function r(n) {
      for (let e = 0; e < n.length; e++) {
        const c = n[e];
        c.uid = X(), s.onStart(c), u(c);
      }
    }
    const o = (n) => {
      const e = n.target.files;
      r(e);
    }, l = () => {
      var n;
      d.value.value = "", (n = d.value) == null || n.click();
    };
    return (n, e) => (y(), F("div", {
      class: C([k(a).b()]),
      onClick: l
    }, [
      n.drag ? (y(), D(I, {
        key: 0,
        onFile: r
      }, {
        default: P(() => [
          h(n.$slots, "default")
        ]),
        _: 3
      })) : h(n.$slots, "default", { key: 1 }),
      L("input", {
        ref_key: "inputRef",
        ref: d,
        type: "file",
        name: n.name,
        accept: n.accept,
        multiple: n.multiple,
        onChange: o
      }, null, 40, W)
    ], 2));
  }
}), N = g({
  name: "k-upload"
}), x = /* @__PURE__ */ g({
  ...N,
  props: $,
  emits: ["onUpdate:file-list"],
  setup(t, { emit: s }) {
    const a = t, u = b(a.FileList);
    U(u, (o) => {
      s("onUpdate:file-list", o);
    });
    const d = (o) => u.value.find((l) => l.uid === o.uid), r = B(() => ({
      ...a,
      onStart: (o) => {
        const l = {
          uid: o.uid,
          name: o.name,
          percentage: 0,
          raw: o,
          size: o.size,
          status: "start"
        };
        l.url = URL.createObjectURL(o), u.value = [...u.value, l], a.onChange(l);
      },
      onProgress: (o, l) => {
        const n = d(l);
        n.status = "uploading", n.percentage = o.pecetange, a.onProgress(o, n, u.value);
      },
      onRemove: async (o) => {
        const l = d(o);
        if (await a.beforeRemove(l, u.value) !== !1) {
          const e = u.value;
          e.splice(e.indexOf(l), 1), a.onRemove(l, u.value);
        }
      },
      onError: (o, l) => {
        const n = d(l);
        n.status = "error";
        const e = u.value;
        e.splice(e.indexOf(n), 1), a.onError(o, n, e);
      },
      onSuccess: (o, l) => {
        const n = d(l);
        n.status = "success";
        const e = u.value;
        a.onSuccess(o, n, e);
      }
    }));
    return (o, l) => (y(), F(j, null, [
      z(Z, q(A(r.value)), {
        default: P(() => [
          h(o.$slots, "default")
        ]),
        _: 3
      }, 16),
      M(" " + V(u.value) + " ", 1)
    ], 64));
  }
}), te = w(x);
export {
  R as baseProps,
  te as default,
  X as genId,
  $ as uploadProps
};
