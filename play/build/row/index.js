import { defineComponent as u, provide as f, computed as a, h as g } from "vue";
function s(t) {
  return t.install = function(n) {
    const { name: r } = t;
    n.component(r, t);
  }, t;
}
const o = {
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: "start"
  }
}, l = u({
  name: "k-row",
  props: o,
  setup(t, { slots: n }) {
    f("KRow", t.gutter);
    const r = a(() => [
      "k-row",
      t.justify !== "start" ? `is-justify-${t.justify}` : ""
    ]), i = a(() => {
      const e = {
        marginLeft: "",
        marginRight: ""
      };
      return t.gutter && (e.marginLeft = `-${t.gutter / 2}px`, e.marginRight = e.marginLeft), e;
    });
    return () => {
      var e;
      return g(
        t.tag,
        {
          class: r.value,
          style: i.value
        },
        (e = n.default) == null ? void 0 : e.call(n)
      );
    };
  }
}), m = s(l);
export {
  m as default,
  o as rowProps
};
