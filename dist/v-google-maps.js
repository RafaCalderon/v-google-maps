import { ref as L, defineComponent as b, useCssVars as B, provide as P, computed as _, onMounted as S, markRaw as I, nextTick as D, watch as k, onBeforeUnmount as A, openBlock as M, createElementBlock as N, createElementVNode as $, renderSlot as U, createCommentVNode as q, inject as C, onUnmounted as z, useSlots as J, unref as W } from "vue";
var F = function o(t, l) {
  if (t === l)
    return !0;
  if (t && l && typeof t == "object" && typeof l == "object") {
    if (t.constructor !== l.constructor)
      return !1;
    var r, i, u;
    if (Array.isArray(t)) {
      if (r = t.length, r != l.length)
        return !1;
      for (i = r; i-- !== 0; )
        if (!o(t[i], l[i]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === l.source && t.flags === l.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === l.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === l.toString();
    if (u = Object.keys(t), r = u.length, r !== Object.keys(l).length)
      return !1;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(l, u[i]))
        return !1;
    for (i = r; i-- !== 0; ) {
      var e = u[i];
      if (!o(t[e], l[e]))
        return !1;
    }
    return !0;
  }
  return t !== t && l !== l;
};
const R = "__googleMapsScriptId";
var V;
(function(o) {
  o[o.INITIALIZED = 0] = "INITIALIZED", o[o.LOADING = 1] = "LOADING", o[o.SUCCESS = 2] = "SUCCESS", o[o.FAILURE = 3] = "FAILURE";
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
  constructor({ apiKey: t, authReferrerPolicy: l, channel: r, client: i, id: u = R, language: e, libraries: c = [], mapIds: f, nonce: p, region: v, retries: g = 3, url: h = "https://maps.googleapis.com/maps/api/js", version: n }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = l, this.channel = r, this.client = i, this.id = u || R, this.language = e, this.libraries = c, this.mapIds = f, this.nonce = p, this.region = v, this.retries = g, this.url = h, this.version = n, G.instance) {
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
      this.loadCallback((r) => {
        r ? l(r.error) : t(window.google);
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
const E = L(null);
async function K(o, t = []) {
  if (E.value)
    return;
  const l = new G({
    apiKey: o,
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
var O = function o(t, l) {
  if (t === l)
    return !0;
  if (t && l && typeof t == "object" && typeof l == "object") {
    if (t.constructor !== l.constructor)
      return !1;
    var r, i, u;
    if (Array.isArray(t)) {
      if (r = t.length, r != l.length)
        return !1;
      for (i = r; i-- !== 0; )
        if (!o(t[i], l[i]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === l.source && t.flags === l.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === l.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === l.toString();
    if (u = Object.keys(t), r = u.length, r !== Object.keys(l).length)
      return !1;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(l, u[i]))
        return !1;
    for (i = r; i-- !== 0; ) {
      var e = u[i];
      if (!o(t[e], l[e]))
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
  setup(o, { expose: t, emit: l }) {
    const r = o;
    B((a) => ({
      "77cd9c80": o.width,
      "6816f9ad": o.height,
      c9433038: o.borderRadius
    }));
    const { gmapApi: i } = j(), u = L(!1), e = L(null), c = L(null);
    let f = null, p = null, v = null;
    P("google-map", e);
    const g = _({
      get() {
        return r.center;
      },
      set(a) {
        l("update:center", a);
      }
    }), h = _({
      get() {
        return r.zoom;
      },
      set(a) {
        l("update:zoom", a);
      }
    });
    S(async () => {
      if (!c.value || !i.value)
        return;
      const a = {
        ...r.options
      };
      g.value && (a.center = {
        ...g.value
      }), h.value && (a.zoom = h.value), e.value = I(new i.value.maps.Map(c.value, {
        ...a
      })), u.value = !0, await D(), n(), l("ready");
    });
    function n() {
      e.value && (f = e.value.addListener("click", s), p = e.value.addListener("dragend", () => {
        var a, m;
        g.value = ((m = (a = e.value) == null ? void 0 : a.getCenter()) == null ? void 0 : m.toJSON()) ?? null;
      }), v = e.value.addListener("zoom_changed", () => {
        var a;
        h.value = ((a = e.value) == null ? void 0 : a.getZoom()) ?? 0;
      }));
    }
    function d() {
      f && f.remove(), p && p.remove(), v && v.remove();
    }
    function s(a) {
      l("click", a);
    }
    return k(() => r.options, (a, m) => {
      !e.value || O(a, m) || e.value.setOptions(r.options);
    }, {
      deep: !0
    }), k(g, (a, m) => {
      O(a, m) || !e.value || !a || e.value.setCenter({
        ...a
      });
    }), k(h, (a, m) => {
      O(a, m) || !e.value || !a || e.value.setZoom(a);
    }), t({
      map: e
    }), A(() => {
      d(), e.value = null;
    }), (a, m) => (M(), N("div", T, [
      $("div", {
        class: "v-google-map__container",
        ref_key: "mapRef",
        ref: c
      }, null, 512),
      u.value ? U(a.$slots, "default", { key: 0 }, void 0, !0) : q("", !0)
    ]));
  }
});
const x = (o, t) => {
  const l = o.__vccOpts || o;
  for (const [r, i] of t)
    l[r] = i;
  return l;
}, H = /* @__PURE__ */ x(Z, [["__scopeId", "data-v-6a7d8b8f"]]), Q = b({
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
  setup(o, { emit: t, expose: l, slots: r }) {
    const { gmapApi: i } = j(), u = C("google-map");
    S(() => {
      if (u != null && u.value && i.value) {
        const s = {
          ...o.options
        };
        v.value && (s.center = {
          ...v.value
        }), g.value && (s.radius = g.value), e.value = I(new i.value.maps.Circle({
          map: u.value,
          ...s
        })), h();
      }
    });
    const e = L(null);
    let c = null, f = null, p = null;
    const v = _({
      get() {
        return o.center;
      },
      set(s) {
        t("update:center", s);
      }
    }), g = _({
      get() {
        return o.radius;
      },
      set(s) {
        t("update:radius", s);
      }
    });
    function h() {
      e.value && (c = e.value.addListener("click", d), f = e.value.addListener("radius_changed", () => {
        var s;
        g.value = ((s = e.value) == null ? void 0 : s.getRadius()) ?? null;
      }), p = e.value.addListener("center_changed", () => {
        var a, m;
        const s = (m = (a = e.value) == null ? void 0 : a.getCenter()) == null ? void 0 : m.toJSON();
        s && (v.value = {
          ...s
        });
      }));
    }
    function n() {
      c && c.remove(), f && f.remove(), p && p.remove();
    }
    function d(s) {
      t("click", s);
    }
    return k(() => o.options, (s, a) => {
      !e.value || O(s, a) || e.value.setOptions(o.options);
    }, {
      deep: !0
    }), k(v, (s, a) => {
      O(s, a) || !e.value || !s || e.value.setCenter({
        ...s
      });
    }), k(g, (s, a) => {
      O(s, a) || !e.value || !s || e.value.setRadius(s);
    }), l({
      circle: e
    }), A(() => {
      n(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var s;
      return (s = r.default) == null ? void 0 : s.call(r);
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
  setup(o, { emit: t, expose: l, slots: r }) {
    const { gmapApi: i } = j(), u = C("google-map"), e = L(null);
    let c = null, f = null;
    if (u != null && u.value && i.value) {
      const n = {
        ...o.options
      };
      o.modelValue && (n.position = {
        ...o.modelValue
      }), e.value = I(new i.value.maps.Marker({
        map: u.value,
        ...n
      })), v();
    }
    const p = _({
      get() {
        return o.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function v() {
      e.value && (c = e.value.addListener("click", h), f = e.value.addListener("mouseup", () => {
        var n, d;
        p.value = ((d = (n = e.value) == null ? void 0 : n.getPosition()) == null ? void 0 : d.toJSON()) ?? null;
      }));
    }
    function g() {
      c && c.remove(), f && f.remove();
    }
    function h(n) {
      t("click", n);
    }
    return k(() => o.options, (n, d) => {
      !e.value || O(n, d) || e.value.setOptions(o.options);
    }, {
      deep: !0
    }), k(p, (n, d) => {
      O(n, d) || !e.value || e.value.setPosition(n);
    }), l({
      marker: e
    }), P("marker", e), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = r.default) == null ? void 0 : n.call(r);
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
  setup(o, { expose: t, slots: l }) {
    const { gmapApi: r } = j(), i = C("google-map");
    S(() => {
      if (i != null && i.value && r.value) {
        const e = {
          ...o.options
        };
        u.value = I(new r.value.maps.visualization.HeatmapLayer({
          map: i.value,
          ...e
        }));
      }
    });
    const u = L(null);
    return k(() => o.options, (e, c) => {
      !u.value || O(e, c) || u.value.setOptions(o.options);
    }, {
      deep: !0
    }), z(() => {
      u.value && (u.value.setMap(null), u.value = null);
    }), t({
      heatmap: u
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
  setup(o, { emit: t, expose: l, slots: r }) {
    const { gmapApi: i } = j(), u = C("google-map");
    S(() => {
      if (u != null && u.value && i.value) {
        const n = {
          ...o.options
        };
        p.value && (n.paths = [
          ...p.value
        ]), e.value = I(new i.value.maps.Polygon({
          map: u.value,
          ...n
        })), v();
      }
    });
    const e = L(null);
    let c = null, f = null;
    const p = _({
      get() {
        return o.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function v() {
      e.value && (c = e.value.addListener("click", h), f = e.value.addListener("mouseup", () => {
        var d, s, a;
        const n = (a = (s = (d = e.value) == null ? void 0 : d.getPath()) == null ? void 0 : s.getArray()) == null ? void 0 : a.map((m) => m.toJSON());
        n && (p.value = [
          ...n
        ]);
      }));
    }
    function g() {
      c && c.remove(), f && f.remove();
    }
    function h(n) {
      t("click", n);
    }
    return k(() => o.options, (n, d) => {
      !e.value || O(n, d) || e.value.setOptions(o.options);
    }, {
      deep: !0
    }), k(p, (n, d) => {
      O(n, d) || !e.value || !n || e.value.setPath(n);
    }), l({
      polygon: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = r.default) == null ? void 0 : n.call(r);
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
  setup(o, { emit: t, expose: l, slots: r }) {
    const { gmapApi: i } = j(), u = C("google-map");
    S(() => {
      if (u != null && u.value && i.value) {
        const n = {
          ...o.options
        };
        p.value && (n.path = [
          ...p.value
        ]), e.value = I(new i.value.maps.Polyline({
          ...n,
          map: u.value
        })), v();
      }
    });
    const e = L(null);
    let c = null, f = null;
    const p = _({
      get() {
        return o.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function v() {
      e.value && (c = e.value.addListener("click", h), f = e.value.addListener("mouseup", () => {
        var d, s, a;
        const n = (a = (s = (d = e.value) == null ? void 0 : d.getPath()) == null ? void 0 : s.getArray()) == null ? void 0 : a.map((m) => m.toJSON());
        n && (p.value = [
          ...n
        ]);
      }));
    }
    function g() {
      c && c.remove(), f && f.remove();
    }
    function h(n) {
      t("click", n);
    }
    return k(() => o.options, (n, d) => {
      !e.value || O(n, d) || e.value.setOptions(o.options);
    }, {
      deep: !0
    }), k(p, (n, d) => {
      O(n, d) || !e.value || !n || e.value.setPath(n);
    }), l({
      polyline: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = r.default) == null ? void 0 : n.call(r);
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
  setup(o, { emit: t, expose: l, slots: r }) {
    const { gmapApi: i } = j(), u = C("google-map");
    S(() => {
      if (u != null && u.value && i.value) {
        const n = {
          ...o.options
        };
        p.value && (n.bounds = {
          ...p.value
        }), e.value = I(new i.value.maps.Rectangle({
          map: u.value,
          ...n
        })), v();
      }
    });
    const e = L(null);
    let c = null, f = null;
    const p = _({
      get() {
        return o.modelValue;
      },
      set(n) {
        t("update:model-value", n);
      }
    });
    function v() {
      e.value && (c = e.value.addListener("click", h), f = e.value.addListener("bounds_changed", () => {
        var d, s;
        const n = (s = (d = e.value) == null ? void 0 : d.getBounds()) == null ? void 0 : s.toJSON();
        n && (p.value = {
          ...n
        });
      }));
    }
    function g() {
      c && c.remove(), f && f.remove();
    }
    function h(n) {
      t("click", n);
    }
    return k(() => o.options, (n, d) => {
      !e.value || O(n, d) || e.value.setOptions(o.options);
    }, {
      deep: !0
    }), k(p, (n, d) => {
      O(n, d) || !e.value || !n || e.value.setBounds(n);
    }), l({
      rectangle: e
    }), A(() => {
      g(), e.value && (e.value.setMap(null), e.value = null);
    }), () => {
      var n;
      return (n = r.default) == null ? void 0 : n.call(r);
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
  setup(o, { expose: t, emit: l }) {
    const r = o, i = J(), { gmapApi: u } = j(), e = C("google-map"), c = C("marker", L(null));
    S(() => {
      var y;
      u.value && (v.value = I(new u.value.maps.InfoWindow({
        ...r.options,
        content: n.value ? p.value : (y = r.options) == null ? void 0 : y.content
      })), s(), d.value && m());
    });
    const f = L(!1), p = L(), v = L(null);
    let g = null, h = null;
    const n = _(() => {
      var y;
      return (y = i.default) == null ? void 0 : y.call(i).some((w) => w.type !== Comment);
    }), d = _({
      get() {
        return r.modelValue;
      },
      set(y) {
        l("update:model-value", y);
      }
    });
    function s() {
      var y;
      !(c != null && c.value) || !v.value || (h = (y = c.value) == null ? void 0 : y.addListener("click", m), g = v.value.addListener("closeclick", m));
    }
    function a() {
      h && h.remove(), g && g.remove();
    }
    function m() {
      !v.value || !(e != null && e.value) || (f.value = !f.value, f.value ? v.value.open({
        map: e.value,
        anchor: c == null ? void 0 : c.value
      }) : v.value.close(), d.value = f.value);
    }
    return k(() => r.options, (y, w) => {
      !v.value || O(y, w) || v.value.setOptions(r.options);
    }, {
      deep: !0
    }), k(d, (y) => {
      y === null || y === f.value || m();
    }), t({
      infoWindow: v
    }), A(() => {
      a(), v.value && (v.value.close(), v.value = null);
    }), (y, w) => W(n) ? (M(), N("div", le, [
      $("div", {
        ref_key: "infoWindowRef",
        ref: p
      }, [
        U(y.$slots, "default", {}, void 0, !0)
      ], 512)
    ])) : q("", !0);
  }
});
const re = /* @__PURE__ */ x(oe, [["__scopeId", "data-v-2f6a5bf7"]]), ue = (o) => {
  o.component("VGoogleMap", H), o.component("VGoogleCircle", Q), o.component("VGoogleMarker", X), o.component("VGoogleHeatmap", Y), o.component("VGooglePolygon", ee), o.component("VGooglePolyline", te), o.component("VGoogleRectangle", ne), o.component("VGoogleInfoWindow", re);
};
export {
  j as useGmapLoader,
  ue as vGoogleMaps
};
