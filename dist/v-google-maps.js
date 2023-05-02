import { ref as O, defineComponent as b, useCssVars as B, provide as P, computed as _, onMounted as S, markRaw as I, nextTick as D, watch as y, onBeforeUnmount as A, openBlock as M, createElementBlock as N, createElementVNode as $, renderSlot as U, createCommentVNode as q, inject as C, onUnmounted as z, useSlots as J, unref as W } from "vue";
var F = function r(t, l) {
  if (t === l)
    return !0;
  if (t && l && typeof t == "object" && typeof l == "object") {
    if (t.constructor !== l.constructor)
      return !1;
    var u, a, i;
    if (Array.isArray(t)) {
      if (u = t.length, u != l.length)
        return !1;
      for (a = u; a-- !== 0; )
        if (!r(t[a], l[a]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === l.source && t.flags === l.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === l.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === l.toString();
    if (i = Object.keys(t), u = i.length, u !== Object.keys(l).length)
      return !1;
    for (a = u; a-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(l, i[a]))
        return !1;
    for (a = u; a-- !== 0; ) {
      var e = i[a];
      if (!r(t[e], l[e]))
        return !1;
    }
    return !0;
  }
  return t !== t && l !== l;
};
const R = "__googleMapsScriptId";
var V;
(function(r) {
  r[r.INITIALIZED = 0] = "INITIALIZED", r[r.LOADING = 1] = "LOADING", r[r.SUCCESS = 2] = "SUCCESS", r[r.FAILURE = 3] = "FAILURE";
})(V || (V = {}));
class G {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: t, authReferrerPolicy: l, channel: u, client: a, id: i = R, language: e, libraries: s = [], mapIds: f, nonce: v, region: d, retries: g = 3, url: m = "https://maps.googleapis.com/maps/api/js", version: n }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = l, this.channel = u, this.client = a, this.id = i || R, this.language = e, this.libraries = s, this.mapIds = f, this.nonce = v, this.region = d, this.retries = g, this.url = m, this.version = n, G.instance) {
      if (!F(this.options, G.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(G.instance.options)}`);
      return G.instance;
    }
    G.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    return this.errors.length ? V.FAILURE : this.done ? V.SUCCESS : this.loading ? V.LOADING : V.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   */
  createUrl() {
    let t = this.url;
    return t += `?callback=${this.CALLBACK}`, this.apiKey && (t += `&key=${this.apiKey}`), this.channel && (t += `&channel=${this.channel}`), this.client && (t += `&client=${this.client}`), this.libraries.length > 0 && (t += `&libraries=${this.libraries.join(",")}`), this.language && (t += `&language=${this.language}`), this.region && (t += `&region=${this.region}`), this.version && (t += `&v=${this.version}`), this.mapIds && (t += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (t += `&auth_referrer_policy=${this.authReferrerPolicy}`), t;
  }
  deleteScript() {
    const t = document.getElementById(this.id);
    t && t.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   */
  loadPromise() {
    return new Promise((t, l) => {
      this.loadCallback((u) => {
        u ? l(u.error) : t(window.google);
      });
    });
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   */
  loadCallback(t) {
    this.callbacks.push(t), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const t = this.createUrl(), l = document.createElement("script");
    l.id = this.id, l.type = "text/javascript", l.src = t, l.onerror = this.loadErrorCallback.bind(this), l.defer = !0, l.async = !0, this.nonce && (l.nonce = this.nonce), document.head.appendChild(l);
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(t) {
    if (this.errors.push(t), this.errors.length <= this.retries) {
      const l = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${l} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, l);
    } else
      this.onerrorEvent = t, this.callback();
  }
  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((t) => {
      t(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), this.done)
      this.callback();
    else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), this.callback();
        return;
      }
      this.loading || (this.loading = !0, this.setCallback(), this.setScript());
    }
  }
}
const E = O(null);
async function K(r, t = []) {
  if (E.value)
    return;
  const l = new G({
    apiKey: r,
    libraries: t
  });
  E.value = await l.load();
}
function j() {
  return {
    gmapApi: E,
    load: K
  };
}
var k = function r(t, l) {
  if (t === l)
    return !0;
  if (t && l && typeof t == "object" && typeof l == "object") {
    if (t.constructor !== l.constructor)
      return !1;
    var u, a, i;
    if (Array.isArray(t)) {
      if (u = t.length, u != l.length)
        return !1;
      for (a = u; a-- !== 0; )
        if (!r(t[a], l[a]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === l.source && t.flags === l.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === l.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === l.toString();
    if (i = Object.keys(t), u = i.length, u !== Object.keys(l).length)
      return !1;
    for (a = u; a-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(l, i[a]))
        return !1;
    for (a = u; a-- !== 0; ) {
      var e = i[a];
      if (!r(t[e], l[e]))
        return !1;
    }
    return !0;
  }
  return t !== t && l !== l;
};
const T = { class: "v-google-map__wrapper" }, Z = /* @__PURE__ */ b({
  __name: "VGoogleMap",
  props: {
    width: {
      required: !0,
      type: String
    },
    height: {
      required: !0,
      type: String
    },
    borderRadius: {
      default: "unset",
      type: String
    },
    options: {
      required: !0,
      type: Object
    },
    center: {
      default: null,
      type: Object
    },
    zoom: {
      default: null,
      type: Number
    }
  },
  emits: [
    "ready",
    "click",
    "update:zoom",
    "update:center"
  ],
  setup(r, { emit: t }) {
    const l = r;
    B((o) => ({
      22481266: r.width,
      "0ceb4087": r.height,
      "5174a33e": r.borderRadius
    }));
    const { gmapApi: u } = j(), a = O(!1), i = O(null), e = O(null);
    let s = null, f = null, v = null;
    P("google-map", i);
    const d = _({
      get() {
        return l.center;
      },
      set(o) {
        t("update:center", o);
      }
    }), g = _({
      get() {
        return l.zoom;
      },
      set(o) {
        t("update:zoom", o);
      }
    });
    S(async () => {
      if (!e.value || !u.value)
        return;
      const o = {
        ...l.options
      };
      d.value && (o.center = {
        ...d.value
      }), g.value && (o.zoom = g.value), i.value = I(new u.value.maps.Map(e.value, {
        ...o
      })), a.value = !0, await D(), m(), t("ready");
    });
    function m() {
      i.value && (s = i.value.addListener("click", c), f = i.value.addListener("dragend", () => {
        var o, p;
        d.value = ((p = (o = i.value) == null ? void 0 : o.getCenter()) == null ? void 0 : p.toJSON()) ?? null;
      }), v = i.value.addListener("zoom_changed", () => {
        var o;
        g.value = ((o = i.value) == null ? void 0 : o.getZoom()) ?? 0;
      }));
    }
    function n() {
      s && s.remove(), f && f.remove(), v && v.remove();
    }
    function c(o) {
      t("click", o);
    }
    return y(() => l.options, (o, p) => {
      !i.value || k(o, p) || i.value.setOptions(l.options);
    }, {
      deep: !0
    }), y(d, (o, p) => {
      k(o, p) || !i.value || !o || i.value.setCenter({
        ...o
      });
    }), y(g, (o, p) => {
      k(o, p) || !i.value || !o || i.value.setZoom(o);
    }), A(() => {
      n(), i.value = null;
    }), (o, p) => (M(), N("div", T, [
      $("div", {
        class: "v-google-map__container",
        ref_key: "mapRef",
        ref: e
      }, null, 512),
      a.value ? U(o.$slots, "default", { key: 0 }, void 0, !0) : q("", !0)
    ]));
  }
});
const x = (r, t) => {
  const l = r.__vccOpts || r;
  for (const [u, a] of t)
    l[u] = a;
  return l;
}, H = /* @__PURE__ */ x(Z, [["__scopeId", "data-v-7c6ab555"]]), Q = b({
  name: "VGoogleCircle",
  props: {
    options: {
      required: !0,
      type: Object
    },
    center: {
      default: null,
      type: Object
    },
    radius: {
      default: null,
      type: Number
    }
  },
  emits: [
    "click",
    "update:center",
    "update:radius"
  ],
  setup(r, { emit: t, expose: l, slots: u }) {
    const { gmapApi: a } = j(), i = C("google-map");
    S(() => {
      if (i != null && i.value && a.value) {
        const o = {
          ...r.options
        };
        d.value && (o.center = {
          ...d.value
        }), g.value && (o.radius = g.value), e.value = I(new a.value.maps.Circle({
          map: i.value,
          ...o
        })), m();
      }
    });
    const e = O(null);
    let s = null, f = null, v = null;
    const d = _({
      get() {
        return r.center;
      },
      set(o) {
        t("update:center", o);
      }
    }), g = _({
      get() {
        return r.radius;
      },
      set(o) {
        t("update:radius", o);
      }
    });
    function m() {
      e.value && (s = e.value.addListener("click", c), f = e.value.addListener("radius_changed", () => {
        var o;
        g.value = ((o = e.value) == null ? void 0 : o.getRadius()) ?? null;
      }), v = e.value.addListener("center_changed", () => {
        var p, L;
        const o = (L = (p = e.value) == null ? void 0 : p.getCenter()) == null ? void 0 : L.toJSON();
        o && (d.value = {
          ...o
        });
      }));
    }
    function n() {
      s && s.remove(), f && f.remove(), v && v.remove();
    }
    function c(o) {
      t("click", o);
    }
    return y(() => r.options, (o, p) => {
      !e.value || k(o, p) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), y(d, (o, p) => {
      k(o, p) || !e.value || !o || e.value.setCenter({
        ...o
      });
    }), y(g, (o, p) => {
      k(o, p) || !e.value || !o || e.value.setRadius(o);
    }), l({
      circle: e
    }), A(() => {
      n(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var o;
      return (o = u.default) == null ? void 0 : o.call(u);
    };
  }
}), X = b({
  name: "VGoogleMarker",
  props: {
    options: {
      required: !0,
      type: Object
    },
    modelValue: {
      default: null,
      type: Object
    }
  },
  emits: [
    "click",
    "update:model-value"
  ],
  setup(r, { emit: t, expose: l, slots: u }) {
    const { gmapApi: a } = j(), i = C("google-map"), e = O(null);
    let s = null, f = null;
    if (i != null && i.value && a.value) {
      const n = {
        ...r.options
      };
      r.modelValue && (n.position = {
        ...r.modelValue
      }), e.value = I(new a.value.maps.Marker({
        map: i.value,
        ...n
      })), d();
    }
    const v = _({
      get() {
        return r.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function d() {
      e.value && (s = e.value.addListener("click", m), f = e.value.addListener("mouseup", () => {
        var n, c;
        v.value = ((c = (n = e.value) == null ? void 0 : n.getPosition()) == null ? void 0 : c.toJSON()) ?? null;
      }));
    }
    function g() {
      s && s.remove(), f && f.remove();
    }
    function m(n) {
      t("click", n);
    }
    return y(() => r.options, (n, c) => {
      !e.value || k(n, c) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), y(v, (n, c) => {
      k(n, c) || !e.value || e.value.setPosition(n);
    }), l({
      marker: e
    }), P("marker", e), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = u.default) == null ? void 0 : n.call(u);
    };
  }
}), Y = b({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(r, { expose: t, slots: l }) {
    const { gmapApi: u } = j(), a = C("google-map");
    S(() => {
      if (a != null && a.value && u.value) {
        const e = {
          ...r.options
        };
        i.value = I(new u.value.maps.visualization.HeatmapLayer({
          map: a.value,
          ...e
        }));
      }
    });
    const i = O(null);
    return y(() => r.options, (e, s) => {
      !i.value || k(e, s) || i.value.setOptions(r.options);
    }, {
      deep: !0
    }), z(() => {
      i.value && (i.value.setMap(null), i.value = null);
    }), t({
      heatmap: i
    }), () => {
      var e;
      return (e = l.default) == null ? void 0 : e.call(l);
    };
  }
}), ee = b({
  name: "VGooglePolygon",
  props: {
    options: {
      required: !0,
      type: Object
    },
    modelValue: {
      default: null,
      type: Object
    }
  },
  emits: [
    "click",
    "update:model-value"
  ],
  setup(r, { emit: t, expose: l, slots: u }) {
    const { gmapApi: a } = j(), i = C("google-map");
    S(() => {
      if (i != null && i.value && a.value) {
        const n = {
          ...r.options
        };
        v.value && (n.paths = [
          ...v.value
        ]), e.value = I(new a.value.maps.Polygon({
          map: i.value,
          ...n
        })), d();
      }
    });
    const e = O(null);
    let s = null, f = null;
    const v = _({
      get() {
        return r.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function d() {
      e.value && (s = e.value.addListener("click", m), f = e.value.addListener("mouseup", () => {
        var c, o, p;
        const n = (p = (o = (c = e.value) == null ? void 0 : c.getPath()) == null ? void 0 : o.getArray()) == null ? void 0 : p.map((L) => L.toJSON());
        n && (v.value = [
          ...n
        ]);
      }));
    }
    function g() {
      s && s.remove(), f && f.remove();
    }
    function m(n) {
      t("click", n);
    }
    return y(() => r.options, (n, c) => {
      !e.value || k(n, c) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), y(v, (n, c) => {
      k(n, c) || !e.value || !n || e.value.setPath(n);
    }), l({
      polygon: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = u.default) == null ? void 0 : n.call(u);
    };
  }
}), te = b({
  name: "VGooglePolyline",
  props: {
    options: {
      required: !0,
      type: Object
    },
    modelValue: {
      default: null,
      type: Object
    }
  },
  emits: [
    "click",
    "update:model-value"
  ],
  setup(r, { emit: t, expose: l, slots: u }) {
    const { gmapApi: a } = j(), i = C("google-map");
    S(() => {
      if (i != null && i.value && a.value) {
        const n = {
          ...r.options
        };
        v.value && (n.path = [
          ...v.value
        ]), e.value = I(new a.value.maps.Polyline({
          ...n,
          map: i.value
        })), d();
      }
    });
    const e = O(null);
    let s = null, f = null;
    const v = _({
      get() {
        return r.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function d() {
      e.value && (s = e.value.addListener("click", m), f = e.value.addListener("mouseup", () => {
        var c, o, p;
        const n = (p = (o = (c = e.value) == null ? void 0 : c.getPath()) == null ? void 0 : o.getArray()) == null ? void 0 : p.map((L) => L.toJSON());
        n && (v.value = [
          ...n
        ]);
      }));
    }
    function g() {
      s && s.remove(), f && f.remove();
    }
    function m(n) {
      t("click", n);
    }
    return y(() => r.options, (n, c) => {
      !e.value || k(n, c) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), y(v, (n, c) => {
      k(n, c) || !e.value || !n || e.value.setPath(n);
    }), l({
      polyline: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = u.default) == null ? void 0 : n.call(u);
    };
  }
}), ne = b({
  name: "VGoogleRectangle",
  props: {
    options: {
      required: !0,
      type: Object
    },
    modelValue: {
      default: null,
      type: Object
    }
  },
  emits: [
    "click",
    "update:model-value"
  ],
  setup(r, { emit: t, expose: l, slots: u }) {
    const { gmapApi: a } = j(), i = C("google-map");
    S(() => {
      if (i != null && i.value && a.value) {
        const n = {
          ...r.options
        };
        v.value && (n.bounds = {
          ...v.value
        }), e.value = I(new a.value.maps.Rectangle({
          map: i.value,
          ...n
        })), d();
      }
    });
    const e = O(null);
    let s = null, f = null;
    const v = _({
      get() {
        return r.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function d() {
      e.value && (s = e.value.addListener("click", m), f = e.value.addListener("bounds_changed", () => {
        var c, o;
        const n = (o = (c = e.value) == null ? void 0 : c.getBounds()) == null ? void 0 : o.toJSON();
        n && (v.value = {
          ...n
        });
      }));
    }
    function g() {
      s && s.remove(), f && f.remove();
    }
    function m(n) {
      t("click", n);
    }
    return y(() => r.options, (n, c) => {
      !e.value || k(n, c) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), y(v, (n, c) => {
      k(n, c) || !e.value || !n || e.value.setBounds(n);
    }), l({
      rectangle: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = u.default) == null ? void 0 : n.call(u);
    };
  }
}), le = {
  key: 0,
  class: "v-google-info-window__container"
}, oe = /* @__PURE__ */ b({
  __name: "VGoogleInfoWindow",
  props: {
    options: {
      default: null,
      type: Object
    },
    modelValue: {
      type: Boolean,
      default: null
    }
  },
  emits: [
    "click",
    "update:model-value"
  ],
  setup(r, { expose: t, emit: l }) {
    const u = r, a = J(), { gmapApi: i } = j(), e = C("google-map"), s = C("marker", O(null));
    S(() => {
      var h;
      i.value && (d.value = I(new i.value.maps.InfoWindow({
        ...u.options,
        content: n.value ? v.value : (h = u.options) == null ? void 0 : h.content
      })), o(), c.value && L());
    });
    const f = O(!1), v = O(), d = O(null);
    let g = null, m = null;
    const n = _(() => {
      var h;
      return (h = a.default) == null ? void 0 : h.call(a).some((w) => w.type !== Comment);
    }), c = _({
      get() {
        return u.modelValue;
      },
      set(h) {
        l("update:model-value", h);
      }
    });
    function o() {
      var h;
      !(s != null && s.value) || !d.value || (m = (h = s.value) == null ? void 0 : h.addListener("click", L), g = d.value.addListener("closeclick", L));
    }
    function p() {
      m && m.remove(), g && g.remove();
    }
    function L() {
      !d.value || !(e != null && e.value) || (f.value = !f.value, f.value ? d.value.open({
        map: e.value,
        anchor: s == null ? void 0 : s.value
      }) : d.value.close(), c.value = f.value);
    }
    return y(() => u.options, (h, w) => {
      !d.value || k(h, w) || d.value.setOptions(u.options);
    }, {
      deep: !0
    }), y(c, (h) => {
      h === null || h === f.value || L();
    }), t({
      infoWindow: d
    }), A(() => {
      p(), d.value && (d.value.close(), d.value = null);
    }), (h, w) => W(n) ? (M(), N("div", le, [
      $("div", {
        ref_key: "infoWindowRef",
        ref: v
      }, [
        U(h.$slots, "default", {}, void 0, !0)
      ], 512)
    ])) : q("", !0);
  }
});
const re = /* @__PURE__ */ x(oe, [["__scopeId", "data-v-2f6a5bf7"]]), ue = (r) => {
  r.component("VGoogleMap", H), r.component("VGoogleCircle", Q), r.component("VGoogleMarker", X), r.component("VGoogleHeatmap", Y), r.component("VGooglePolygon", ee), r.component("VGooglePolyline", te), r.component("VGoogleRectangle", ne), r.component("VGoogleInfoWindow", re);
};
export {
  j as useGmapLoader,
  ue as vGoogleMaps
};
