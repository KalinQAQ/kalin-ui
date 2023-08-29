import { defineComponent as f, inject as l, computed as u, h as p } from "vue";
function i(t) {
  return t.install = function(e) {
    const { name: n } = t;
    e.component(n, t);
  }, t;
}
const d = {
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
}, g = f({
  name: "k-col",
  props: d,
  setup(t, { slots: e }) {
    const n = l("KRow", 0), r = u(() => {
      const o = [];
      return ["span", "offset"].forEach((s) => {
        const a = t[s];
        typeof a == "number" && a > 0 && o.push(`k-col-${s}-${t[s]}`);
      }), ["k-col", ...o];
    }), c = u(() => n !== 0 ? {
      paddingLeft: n / 2 + "px",
      paddingRight: n / 2 + "px"
    } : {});
    return () => {
      var o;
      return p(
        t.tag,
        {
          class: r.value,
          style: c.value
        },
        (o = e.default) == null ? void 0 : o.call(e)
      );
    };
  }
}), m = i(g);
export {
  d as colProps,
  m as default
};
