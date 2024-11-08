import { ref as M, defineComponent as A, mergeModels as z, useModel as K, onMounted as j, markRaw as I, nextTick as ee, watch as E, provide as te, onBeforeUnmount as S, openBlock as re, createElementBlock as ne, Fragment as Ce, createElementVNode as se, normalizeClass as Ae, renderSlot as oe, createCommentVNode as ie, inject as C, computed as O, useSlots as me } from "vue";
function Ie(o, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(n) {
      n(i);
    });
  }
  return new (t || (t = Promise))(function(i, n) {
    function h(d) {
      try {
        l(r.next(d));
      } catch (p) {
        n(p);
      }
    }
    function a(d) {
      try {
        l(r.throw(d));
      } catch (p) {
        n(p);
      }
    }
    function l(d) {
      d.done ? i(d.value) : s(d.value).then(h, a);
    }
    l((r = r.apply(o, [])).next());
  });
}
function Se(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Le = function o(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, s, i;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (s = r; s-- !== 0; )
        if (!o(e[s], t[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (i = Object.keys(e), r = i.length, r !== Object.keys(t).length) return !1;
    for (s = r; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, i[s])) return !1;
    for (s = r; s-- !== 0; ) {
      var n = i[s];
      if (!o(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, xe = /* @__PURE__ */ Se(Le);
const ce = "__googleMapsScriptId";
var $;
(function(o) {
  o[o.INITIALIZED = 0] = "INITIALIZED", o[o.LOADING = 1] = "LOADING", o[o.SUCCESS = 2] = "SUCCESS", o[o.FAILURE = 3] = "FAILURE";
})($ || ($ = {}));
class F {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: r, client: s, id: i = ce, language: n, libraries: h = [], mapIds: a, nonce: l, region: d, retries: p = 3, url: u = "https://maps.googleapis.com/maps/api/js", version: f }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = r, this.client = s, this.id = i || ce, this.language = n, this.libraries = h, this.mapIds = a, this.nonce = l, this.region = d, this.retries = p, this.url = u, this.version = f, F.instance) {
      if (!xe(this.options, F.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(F.instance.options)}`);
      return F.instance;
    }
    F.instance = this;
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
    return this.errors.length ? $.FAILURE : this.done ? $.SUCCESS : this.loading ? $.LOADING : $.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    let e = this.url;
    return e += "?callback=__googleMapsCallback&loading=async", this.apiKey && (e += `&key=${this.apiKey}`), this.channel && (e += `&channel=${this.channel}`), this.client && (e += `&client=${this.client}`), this.libraries.length > 0 && (e += `&libraries=${this.libraries.join(",")}`), this.language && (e += `&language=${this.language}`), this.region && (e += `&region=${this.region}`), this.version && (e += `&v=${this.version}`), this.mapIds && (e += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e += `&auth_referrer_policy=${this.authReferrerPolicy}`), e;
  }
  deleteScript() {
    const e = document.getElementById(this.id);
    e && e.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((e, t) => {
      this.loadCallback((r) => {
        r ? t(r.error) : e(window.google);
      });
    });
  }
  importLibrary(e) {
    return this.execute(), google.maps.importLibrary(e);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(e) {
    this.callbacks.push(e), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var e, t;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const r = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(r).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i) => !r[i] && delete r[i]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((i) => {
      let n, h, a, l = "The Google Maps JavaScript API", d = "google", p = "importLibrary", u = "__ib__", f = document, c = window;
      c = c[d] || (c[d] = {});
      const g = c.maps || (c.maps = {}), v = /* @__PURE__ */ new Set(), y = new URLSearchParams(), k = () => (
        // @ts-ignore
        n || (n = new Promise((m, w) => Ie(this, void 0, void 0, function* () {
          var T;
          yield h = f.createElement("script"), h.id = this.id, y.set("libraries", [...v] + "");
          for (a in i)
            y.set(a.replace(/[A-Z]/g, (H) => "_" + H[0].toLowerCase()), i[a]);
          y.set("callback", d + ".maps." + u), h.src = this.url + "?" + y, g[u] = m, h.onerror = () => n = w(Error(l + " could not load.")), h.nonce = this.nonce || ((T = f.querySelector("script[nonce]")) === null || T === void 0 ? void 0 : T.nonce) || "", f.head.append(h);
        })))
      );
      g[p] ? console.warn(l + " only loads once. Ignoring:", i) : g[p] = (m, ...w) => v.add(m) && k().then(() => g[p](m, ...w));
    })(r);
    const s = this.libraries.map((i) => this.importLibrary(i));
    s.length || s.push(this.importLibrary("core")), Promise.all(s).then(() => this.callback(), (i) => {
      const n = new ErrorEvent("error", { error: i });
      this.loadErrorCallback(n);
    });
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
  loadErrorCallback(e) {
    if (this.errors.push(e), this.errors.length <= this.retries) {
      const t = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${t} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, t);
    } else
      this.onerrorEvent = e, this.callback();
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((e) => {
      e(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), !this.loading)
      if (this.done)
        this.callback();
      else {
        if (window.google && window.google.maps && window.google.maps.version) {
          console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match."), this.callback();
          return;
        }
        this.loading = !0, this.setScript();
      }
  }
}
const Z = M(null), ve = M(null), ge = M(null), ye = M(null), ke = M(null);
async function Pe(o, e = []) {
  Z.value || (Z.value = new F({
    apiKey: o,
    libraries: e
  }), ve.value = await Z.value.importLibrary("core"), ge.value = await Z.value.importLibrary("maps"), ye.value = await Z.value.importLibrary("marker"), ke.value = await Z.value.importLibrary("visualization"));
}
function R() {
  return {
    maps: ge,
    init: Pe,
    core: ve,
    loader: Z,
    markers: ye,
    visualization: ke
  };
}
function je(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Re = function o(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, s, i;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (s = r; s-- !== 0; )
        if (!o(e[s], t[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (i = Object.keys(e), r = i.length, r !== Object.keys(t).length) return !1;
    for (s = r; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, i[s])) return !1;
    for (s = r; s-- !== 0; ) {
      var n = i[s];
      if (!o(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const _ = /* @__PURE__ */ je(Re), L = Symbol("map"), Me = Symbol("marker"), we = Symbol("marker-clusterer"), Te = /* @__PURE__ */ A({
  __name: "VGoogleMap",
  props: /* @__PURE__ */ z({
    class: {},
    options: {}
  }, {
    zoom: {
      default: null
    },
    zoomModifiers: {},
    center: {
      default: null
    },
    centerModifiers: {}
  }),
  emits: /* @__PURE__ */ z(["ready", "click"], ["update:zoom", "update:center"]),
  setup(o, { expose: e, emit: t }) {
    const r = o, s = t, i = K(o, "zoom"), n = K(o, "center"), { maps: h } = R(), a = M(!1), l = M(null);
    let d = null, p = null, u = null;
    const f = M(null);
    j(async () => {
      var v, y;
      !h.value || !f.value || (l.value = I(
        new h.value.Map(f.value, {
          ...r.options,
          zoom: i.value ?? ((v = r.options) == null ? void 0 : v.zoom),
          center: n.value ?? ((y = r.options) == null ? void 0 : y.center)
        })
      ), a.value = !0, await ee(), c(), s("ready"));
    });
    function c() {
      l.value && (d = l.value.addListener("click", (v) => {
        s("click", v);
      }), p = l.value.addListener("dragend", () => {
        var v, y;
        n.value = ((y = (v = l.value) == null ? void 0 : v.getCenter()) == null ? void 0 : y.toJSON()) ?? null;
      }), u = l.value.addListener("zoom_changed", () => {
        var v;
        i.value = ((v = l.value) == null ? void 0 : v.getZoom()) ?? 0;
      }));
    }
    function g() {
      d == null || d.remove(), p == null || p.remove(), u == null || u.remove();
    }
    return E(
      () => r.options,
      (v, y) => {
        !l.value || _(v, y) || l.value.setOptions(r.options);
      },
      {
        deep: !0
      }
    ), E(
      n,
      (v, y) => {
        _(v, y) || !l.value || !v || l.value.setCenter({
          ...v
        });
      }
    ), E(i, (v, y) => {
      _(v, y) || !l.value || !v || l.value.setZoom(v);
    }), e({
      map: l
    }), te(L, l), S(() => {
      g(), l.value = null;
    }), (v, y) => (re(), ne(Ce, null, [
      se("div", {
        ref_key: "mapRef",
        ref: f,
        class: Ae(r.class)
      }, null, 2),
      a.value ? oe(v.$slots, "default", { key: 0 }) : ie("", !0)
    ], 64));
  }
}), Ge = A({
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
  emits: ["click", "update:center", "update:radius"],
  setup(o, { emit: e, expose: t, slots: r }) {
    const { maps: s } = R(), i = C(L, M(null)), n = M(null);
    let h = null, a = null, l = null;
    j(() => {
      var c, g;
      i.value && s.value && (n.value = I(
        new s.value.Circle({
          ...o.options,
          map: i.value,
          center: d.value ?? ((c = o.options) == null ? void 0 : c.center),
          radius: p.value ?? ((g = o.options) == null ? void 0 : g.radius)
        })
      ), u());
    });
    const d = O({
      get() {
        return o.center;
      },
      set(c) {
        e("update:center", c);
      }
    }), p = O({
      get() {
        return o.radius;
      },
      set(c) {
        e("update:radius", c);
      }
    });
    function u() {
      n.value && (h = n.value.addListener("click", (c) => {
        e("click", c);
      }), a = n.value.addListener("radius_changed", () => {
        var c;
        p.value = ((c = n.value) == null ? void 0 : c.getRadius()) ?? null;
      }), l = n.value.addListener("center_changed", () => {
        var g, v;
        const c = (v = (g = n.value) == null ? void 0 : g.getCenter()) == null ? void 0 : v.toJSON();
        c && (d.value = {
          ...c
        });
      }));
    }
    function f() {
      h == null || h.remove(), a == null || a.remove(), l == null || l.remove();
    }
    return E(
      () => o.options,
      (c, g) => {
        !n.value || _(c, g) || n.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), E(
      d,
      (c, g) => {
        !n.value || !c || _(c, g) || n.value.setCenter({
          ...c
        });
      }
    ), E(p, (c, g) => {
      !n.value || !c || _(c, g) || n.value.setRadius(c);
    }), t({
      circle: n
    }), S(() => {
      f(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var c;
      return (c = r.default) == null ? void 0 : c.call(r);
    };
  }
}), Ne = A({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(o, { expose: e, slots: t }) {
    const { visualization: r } = R(), s = C(L, M(null)), i = M(null);
    return j(() => {
      s.value && r.value && (i.value = I(
        new r.value.HeatmapLayer({
          map: s.value,
          ...o.options
        })
      ));
    }), E(
      () => o.options,
      (n, h) => {
        !i.value || _(n, h) || i.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), e({
      heatmap: i
    }), S(() => {
      i.value && (i.value.setMap(null), i.value = null);
    }), () => {
      var n;
      return (n = t.default) == null ? void 0 : n.call(t);
    };
  }
}), Ze = A({
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
  emits: ["click", "mouseover", "mouseout", "update:model-value"],
  setup(o, { emit: e, expose: t, slots: r }) {
    const { maps: s } = R(), i = C(L, M(null)), n = M(null);
    let h = null, a = null, l = null, d = null;
    j(() => {
      var c;
      i.value && s.value && (n.value = I(
        new s.value.Polygon({
          ...o.options,
          map: i.value,
          paths: p.value ? [...p.value] : (c = o.options) == null ? void 0 : c.paths
        })
      ), u());
    });
    const p = O({
      get() {
        return o.modelValue;
      },
      set(c) {
        e("update:model-value", c);
      }
    });
    function u() {
      n.value && (h = n.value.addListener("click", (c) => {
        e("click", c);
      }), l = n.value.addListener("mouseout", (c) => {
        e("mouseout", c);
      }), d = n.value.addListener(
        "mouseover",
        (c) => {
          e("mouseover", c);
        }
      ), a = n.value.addListener("mouseup", () => {
        var g, v, y;
        const c = (y = (v = (g = n.value) == null ? void 0 : g.getPath()) == null ? void 0 : v.getArray()) == null ? void 0 : y.map((k) => k.toJSON());
        c && (p.value = [...c]);
      }));
    }
    function f() {
      h == null || h.remove(), a == null || a.remove(), l == null || l.remove(), d == null || d.remove();
    }
    return E(
      () => o.options,
      (c, g) => {
        !n.value || _(c, g) || n.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), E(
      p,
      (c, g) => {
        !n.value || !c || _(c, g) || n.value.setPath(c);
      }
    ), t({
      polygon: n
    }), S(() => {
      f(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var c;
      return (c = r.default) == null ? void 0 : c.call(r);
    };
  }
}), Fe = {
  key: 0,
  style: { display: "none" }
}, _e = /* @__PURE__ */ A({
  __name: "VGoogleInfoWindow",
  props: /* @__PURE__ */ z({
    options: { default: null }
  }, {
    modelValue: { type: Boolean, default: !1, required: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o, { expose: e }) {
    const t = o, r = K(o, "modelValue"), s = me(), { maps: i } = R(), n = C(L, M(null)), h = C(Me, M(null)), a = M(!1), l = M(), d = M(null);
    let p = null, u = null;
    j(async () => {
      var k;
      i.value && (d.value = I(
        new i.value.InfoWindow({
          ...t.options,
          content: f.value && !c.value ? l.value : (k = t.options) == null ? void 0 : k.content
        })
      ), await ee(), g(), r.value && y());
    });
    const f = O(() => {
      var k, m;
      return ((m = (k = s.default) == null ? void 0 : k.call(s)) == null ? void 0 : m[0]) ?? null;
    }), c = O(() => {
      var k;
      return ((k = f.value) == null ? void 0 : k.type) === Comment;
    });
    function g() {
      !h.value || !d.value || (u = h.value.addListener("click", y), p = d.value.addListener("closeclick", y));
    }
    function v() {
      u && u.remove(), p && p.remove();
    }
    function y() {
      !d.value || !n.value || (a.value = !a.value, a.value ? d.value.open({
        map: n.value,
        anchor: h.value
      }) : d.value.close(), r.value = a.value);
    }
    return E(
      () => t.options,
      (k, m) => {
        !d.value || _(k, m) || d.value.setOptions(t.options);
      },
      {
        deep: !0
      }
    ), E(r, (k) => {
      k === null || k === a.value || y();
    }), e({
      infoWindow: d
    }), S(() => {
      v(), d.value && (d.value.close(), d.value = null);
    }), (k, m) => f.value && !c.value ? (re(), ne("div", Fe, [
      se("div", {
        ref_key: "contentRef",
        ref: l
      }, [
        oe(k.$slots, "default")
      ], 512)
    ])) : ie("", !0);
  }
}), $e = {
  key: 0,
  style: { display: "none" }
}, De = /* @__PURE__ */ A({
  __name: "VGoogleMarker",
  props: /* @__PURE__ */ z({
    options: { default: void 0 }
  }, {
    modelValue: {
      default: null,
      required: !1
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ z(["click"], ["update:modelValue"]),
  setup(o, { expose: e, emit: t }) {
    const r = o, s = t, i = K(o, "modelValue"), n = me(), { markers: h } = R(), a = C(L, M(null)), l = C(we, M(null)), d = M();
    let p = null, u = null;
    const f = M(
      null
    );
    j(async () => {
      var m, w;
      h.value && (f.value = I(
        new h.value.AdvancedMarkerElement({
          ...r.options,
          position: i.value ?? ((m = r.options) == null ? void 0 : m.position),
          map: l.value === null ? a.value : null,
          content: c.value && !g.value && !v.value ? d.value : (w = r.options) == null ? void 0 : w.content
        })
      ), await ee(), l.value && l.value.addMarker(f.value), y());
    });
    const c = O(() => {
      var m, w;
      return ((w = (m = n.default) == null ? void 0 : m.call(n)) == null ? void 0 : w[0]) ?? null;
    }), g = O(() => {
      var m;
      return ((m = c.value) == null ? void 0 : m.type) === Comment;
    }), v = O(() => {
      var m;
      return ((m = c.value) == null ? void 0 : m.type) === _e;
    });
    function y() {
      f.value && (u = f.value.addListener("dragend", (m) => {
        var w;
        i.value = ((w = m.latLng) == null ? void 0 : w.toJSON()) ?? null;
      }), p = f.value.addListener("click", (m) => {
        s("click", m);
      }));
    }
    function k() {
      p == null || p.remove(), u == null || u.remove();
    }
    return E(
      () => r.options,
      (m, w) => {
        !f.value || _(m, w) || (m != null && m.title && (f.value.title = m.title), m != null && m.zIndex && (f.value.zIndex = m.zIndex), m != null && m.content && (f.value.content = m.content), m != null && m.position && (f.value.position = m.position), m != null && m.gmpDraggable && (f.value.gmpDraggable = m.gmpDraggable));
      },
      {
        deep: !0
      }
    ), E(i, (m, w) => {
      !f.value || _(m, w) || (f.value.position = m);
    }), e({
      marker: f
    }), te(Me, f), S(() => {
      k(), f.value && (l.value && l.value.removeMarker(f.value), f.value.map = null, f.value = null);
    }), (m, w) => c.value && !g.value ? (re(), ne("div", $e, [
      se("div", {
        ref_key: "contentRef",
        ref: d
      }, [
        oe(m.$slots, "default")
      ], 512)
    ])) : ie("", !0);
  }
}), Ue = A({
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
  emits: ["click", "update:model-value"],
  setup(o, { emit: e, expose: t, slots: r }) {
    const { maps: s } = R(), i = C(L, M(null)), n = M(null);
    let h = null, a = null;
    j(() => {
      var u;
      i.value && s.value && (n.value = I(
        new s.value.Polyline({
          ...o.options,
          map: i.value,
          path: l.value ? [...l.value] : (u = o.options) == null ? void 0 : u.path
        })
      ), d());
    });
    const l = O({
      get() {
        return o.modelValue;
      },
      set(u) {
        e("update:model-value", u);
      }
    });
    function d() {
      n.value && (h = n.value.addListener("click", (u) => {
        e("click", u);
      }), a = n.value.addListener("mouseup", () => {
        var f, c, g;
        const u = (g = (c = (f = n.value) == null ? void 0 : f.getPath()) == null ? void 0 : c.getArray()) == null ? void 0 : g.map((v) => v.toJSON());
        u && (l.value = [...u]);
      }));
    }
    function p() {
      h == null || h.remove(), a == null || a.remove();
    }
    return E(
      () => o.options,
      (u, f) => {
        !n.value || _(u, f) || n.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), E(
      l,
      (u, f) => {
        !n.value || !u || _(u, f) || n.value.setPath(u);
      }
    ), t({
      polyline: n
    }), S(() => {
      p(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var u;
      return (u = r.default) == null ? void 0 : u.call(r);
    };
  }
}), Be = A({
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
  emits: ["click", "update:model-value"],
  setup(o, { emit: e, expose: t, slots: r }) {
    const { maps: s } = R(), i = C(L, M(null)), n = M(null);
    let h = null, a = null;
    j(() => {
      var u;
      i.value && s.value && (n.value = I(
        new s.value.Rectangle({
          ...o.options,
          map: i.value,
          bounds: l.value ?? ((u = o.options) == null ? void 0 : u.bounds)
        })
      ), d());
    });
    const l = O({
      get() {
        return o.modelValue;
      },
      set(u) {
        e("update:model-value", u);
      }
    });
    function d() {
      n.value && (h = n.value.addListener("click", (u) => {
        e("click", u);
      }), a = n.value.addListener("bounds_changed", () => {
        var f, c;
        const u = (c = (f = n.value) == null ? void 0 : f.getBounds()) == null ? void 0 : c.toJSON();
        u && (l.value = {
          ...u
        });
      }));
    }
    function p() {
      h == null || h.remove(), a == null || a.remove();
    }
    return E(
      () => o.options,
      (u, f) => {
        !n.value || _(u, f) || n.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), E(
      l,
      (u, f) => {
        !n.value || !u || _(u, f) || n.value.setBounds(u);
      }
    ), t({
      rectangle: n
    }), S(() => {
      p(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var u;
      return (u = r.default) == null ? void 0 : u.call(r);
    };
  }
}), he = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], W = 1, D = 8;
class ae {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(e) {
    if (!(e instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [t, r] = new Uint8Array(e, 0, 2);
    if (t !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const s = r >> 4;
    if (s !== W)
      throw new Error(`Got v${s} data when expected v${W}.`);
    const i = he[r & 15];
    if (!i)
      throw new Error("Unrecognized array type.");
    const [n] = new Uint16Array(e, 2, 1), [h] = new Uint32Array(e, 4, 1);
    return new ae(h, n, i, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, t = 64, r = Float64Array, s) {
    if (isNaN(e) || e < 0) throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.ArrayType = r, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const i = he.indexOf(this.ArrayType), n = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, h = e * this.IndexArrayType.BYTES_PER_ELEMENT, a = (8 - h % 8) % 8;
    if (i < 0)
      throw new Error(`Unexpected typed array class: ${r}.`);
    s && s instanceof ArrayBuffer ? (this.data = s, this.ids = new this.IndexArrayType(this.data, D, e), this.coords = new this.ArrayType(this.data, D + h + a, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(D + n + h + a), this.ids = new this.IndexArrayType(this.data, D, e), this.coords = new this.ArrayType(this.data, D + h + a, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (W << 4) + i]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(e, t) {
    const r = this._pos >> 1;
    return this.ids[r] = r, this.coords[this._pos++] = e, this.coords[this._pos++] = t, r;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const e = this._pos >> 1;
    if (e !== this.numItems)
      throw new Error(`Added ${e} items when expected ${this.numItems}.`);
    return V(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(e, t, r, s) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: i, coords: n, nodeSize: h } = this, a = [0, i.length - 1, 0], l = [];
    for (; a.length; ) {
      const d = a.pop() || 0, p = a.pop() || 0, u = a.pop() || 0;
      if (p - u <= h) {
        for (let v = u; v <= p; v++) {
          const y = n[2 * v], k = n[2 * v + 1];
          y >= e && y <= r && k >= t && k <= s && l.push(i[v]);
        }
        continue;
      }
      const f = u + p >> 1, c = n[2 * f], g = n[2 * f + 1];
      c >= e && c <= r && g >= t && g <= s && l.push(i[f]), (d === 0 ? e <= c : t <= g) && (a.push(u), a.push(f - 1), a.push(1 - d)), (d === 0 ? r >= c : s >= g) && (a.push(f + 1), a.push(p), a.push(1 - d));
    }
    return l;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, t, r) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: s, coords: i, nodeSize: n } = this, h = [0, s.length - 1, 0], a = [], l = r * r;
    for (; h.length; ) {
      const d = h.pop() || 0, p = h.pop() || 0, u = h.pop() || 0;
      if (p - u <= n) {
        for (let v = u; v <= p; v++)
          pe(i[2 * v], i[2 * v + 1], e, t) <= l && a.push(s[v]);
        continue;
      }
      const f = u + p >> 1, c = i[2 * f], g = i[2 * f + 1];
      pe(c, g, e, t) <= l && a.push(s[f]), (d === 0 ? e - r <= c : t - r <= g) && (h.push(u), h.push(f - 1), h.push(1 - d)), (d === 0 ? e + r >= c : t + r >= g) && (h.push(f + 1), h.push(p), h.push(1 - d));
    }
    return a;
  }
}
function V(o, e, t, r, s, i) {
  if (s - r <= t) return;
  const n = r + s >> 1;
  Ee(o, e, n, r, s, i), V(o, e, t, r, n - 1, 1 - i), V(o, e, t, n + 1, s, 1 - i);
}
function Ee(o, e, t, r, s, i) {
  for (; s > r; ) {
    if (s - r > 600) {
      const l = s - r + 1, d = t - r + 1, p = Math.log(l), u = 0.5 * Math.exp(2 * p / 3), f = 0.5 * Math.sqrt(p * u * (l - u) / l) * (d - l / 2 < 0 ? -1 : 1), c = Math.max(r, Math.floor(t - d * u / l + f)), g = Math.min(s, Math.floor(t + (l - d) * u / l + f));
      Ee(o, e, t, c, g, i);
    }
    const n = e[2 * t + i];
    let h = r, a = s;
    for (U(o, e, r, t), e[2 * s + i] > n && U(o, e, r, s); h < a; ) {
      for (U(o, e, h, a), h++, a--; e[2 * h + i] < n; ) h++;
      for (; e[2 * a + i] > n; ) a--;
    }
    e[2 * r + i] === n ? U(o, e, r, a) : (a++, U(o, e, a, s)), a <= t && (r = a + 1), t <= a && (s = a - 1);
  }
}
function U(o, e, t, r) {
  Y(o, t, r), Y(e, 2 * t, 2 * r), Y(e, 2 * t + 1, 2 * r + 1);
}
function Y(o, e, t) {
  const r = o[e];
  o[e] = o[t], o[t] = r;
}
function pe(o, e, t, r) {
  const s = o - t, i = e - r;
  return s * s + i * i;
}
const ze = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: !1,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: !1,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (o) => o
  // props => ({sum: props.my_value})
}, de = Math.fround || /* @__PURE__ */ ((o) => (e) => (o[0] = +e, o[0]))(new Float32Array(1)), N = 2, P = 3, Q = 4, x = 5, be = 6;
class qe {
  constructor(e) {
    this.options = Object.assign(Object.create(ze), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: r, maxZoom: s } = this.options;
    t && console.time("total time");
    const i = `prepare ${e.length} points`;
    t && console.time(i), this.points = e;
    const n = [];
    for (let a = 0; a < e.length; a++) {
      const l = e[a];
      if (!l.geometry) continue;
      const [d, p] = l.geometry.coordinates, u = de(q(d)), f = de(J(p));
      n.push(
        u,
        f,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        a,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && n.push(0);
    }
    let h = this.trees[s + 1] = this._createTree(n);
    t && console.timeEnd(i);
    for (let a = s; a >= r; a--) {
      const l = +Date.now();
      h = this.trees[a] = this._createTree(this._cluster(h, a)), t && console.log("z%d: %d clusters in %dms", a, h.numItems, +Date.now() - l);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let r = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const s = Math.max(-90, Math.min(90, e[1]));
    let i = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const n = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      r = -180, i = 180;
    else if (r > i) {
      const p = this.getClusters([r, s, 180, n], t), u = this.getClusters([-180, s, i, n], t);
      return p.concat(u);
    }
    const h = this.trees[this._limitZoom(t)], a = h.range(q(r), J(n), q(i), J(s)), l = h.data, d = [];
    for (const p of a) {
      const u = this.stride * p;
      d.push(l[u + x] > 1 ? fe(l, u, this.clusterProps) : this.points[l[u + P]]);
    }
    return d;
  }
  getChildren(e) {
    const t = this._getOriginId(e), r = this._getOriginZoom(e), s = "No cluster with the specified id.", i = this.trees[r];
    if (!i) throw new Error(s);
    const n = i.data;
    if (t * this.stride >= n.length) throw new Error(s);
    const h = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), a = n[t * this.stride], l = n[t * this.stride + 1], d = i.within(a, l, h), p = [];
    for (const u of d) {
      const f = u * this.stride;
      n[f + Q] === e && p.push(n[f + x] > 1 ? fe(n, f, this.clusterProps) : this.points[n[f + P]]);
    }
    if (p.length === 0) throw new Error(s);
    return p;
  }
  getLeaves(e, t, r) {
    t = t || 10, r = r || 0;
    const s = [];
    return this._appendLeaves(s, e, t, r, 0), s;
  }
  getTile(e, t, r) {
    const s = this.trees[this._limitZoom(e)], i = Math.pow(2, e), { extent: n, radius: h } = this.options, a = h / n, l = (r - a) / i, d = (r + 1 + a) / i, p = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - a) / i, l, (t + 1 + a) / i, d),
      s.data,
      t,
      r,
      i,
      p
    ), t === 0 && this._addTileFeatures(
      s.range(1 - a / i, l, 1, d),
      s.data,
      i,
      r,
      i,
      p
    ), t === i - 1 && this._addTileFeatures(
      s.range(0, l, a / i, d),
      s.data,
      -1,
      r,
      i,
      p
    ), p.features.length ? p : null;
  }
  getClusterExpansionZoom(e) {
    let t = this._getOriginZoom(e) - 1;
    for (; t <= this.options.maxZoom; ) {
      const r = this.getChildren(e);
      if (t++, r.length !== 1) break;
      e = r[0].properties.cluster_id;
    }
    return t;
  }
  _appendLeaves(e, t, r, s, i) {
    const n = this.getChildren(t);
    for (const h of n) {
      const a = h.properties;
      if (a && a.cluster ? i + a.point_count <= s ? i += a.point_count : i = this._appendLeaves(e, a.cluster_id, r, s, i) : i < s ? i++ : e.push(h), e.length === r) break;
    }
    return i;
  }
  _createTree(e) {
    const t = new ae(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let r = 0; r < e.length; r += this.stride) t.add(e[r], e[r + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, r, s, i, n) {
    for (const h of e) {
      const a = h * this.stride, l = t[a + x] > 1;
      let d, p, u;
      if (l)
        d = Oe(t, a, this.clusterProps), p = t[a], u = t[a + 1];
      else {
        const g = this.points[t[a + P]];
        d = g.properties;
        const [v, y] = g.geometry.coordinates;
        p = q(v), u = J(y);
      }
      const f = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (p * i - r)),
          Math.round(this.options.extent * (u * i - s))
        ]],
        tags: d
      };
      let c;
      l || this.options.generateId ? c = t[a + P] : c = this.points[t[a + P]].id, c !== void 0 && (f.id = c), n.features.push(f);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: r, extent: s, reduce: i, minPoints: n } = this.options, h = r / (s * Math.pow(2, t)), a = e.data, l = [], d = this.stride;
    for (let p = 0; p < a.length; p += d) {
      if (a[p + N] <= t) continue;
      a[p + N] = t;
      const u = a[p], f = a[p + 1], c = e.within(a[p], a[p + 1], h), g = a[p + x];
      let v = g;
      for (const y of c) {
        const k = y * d;
        a[k + N] > t && (v += a[k + x]);
      }
      if (v > g && v >= n) {
        let y = u * g, k = f * g, m, w = -1;
        const T = ((p / d | 0) << 5) + (t + 1) + this.points.length;
        for (const H of c) {
          const G = H * d;
          if (a[G + N] <= t) continue;
          a[G + N] = t;
          const ue = a[G + x];
          y += a[G] * ue, k += a[G + 1] * ue, a[G + Q] = T, i && (m || (m = this._map(a, p, !0), w = this.clusterProps.length, this.clusterProps.push(m)), i(m, this._map(a, G)));
        }
        a[p + Q] = T, l.push(y / v, k / v, 1 / 0, T, -1, v), i && l.push(w);
      } else {
        for (let y = 0; y < d; y++) l.push(a[p + y]);
        if (v > 1)
          for (const y of c) {
            const k = y * d;
            if (!(a[k + N] <= t)) {
              a[k + N] = t;
              for (let m = 0; m < d; m++) l.push(a[k + m]);
            }
          }
      }
    }
    return l;
  }
  // get index of the point from which the cluster originated
  _getOriginId(e) {
    return e - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(e) {
    return (e - this.points.length) % 32;
  }
  _map(e, t, r) {
    if (e[t + x] > 1) {
      const n = this.clusterProps[e[t + be]];
      return r ? Object.assign({}, n) : n;
    }
    const s = this.points[e[t + P]].properties, i = this.options.map(s);
    return r && i === s ? Object.assign({}, i) : i;
  }
}
function fe(o, e, t) {
  return {
    type: "Feature",
    id: o[e + P],
    properties: Oe(o, e, t),
    geometry: {
      type: "Point",
      coordinates: [Je(o[e]), Ke(o[e + 1])]
    }
  };
}
function Oe(o, e, t) {
  const r = o[e + x], s = r >= 1e4 ? `${Math.round(r / 1e3)}k` : r >= 1e3 ? `${Math.round(r / 100) / 10}k` : r, i = o[e + be], n = i === -1 ? {} : Object.assign({}, t[i]);
  return Object.assign(n, {
    cluster: !0,
    cluster_id: o[e + P],
    point_count: r,
    point_count_abbreviated: s
  });
}
function q(o) {
  return o / 360 + 0.5;
}
function J(o) {
  const e = Math.sin(o * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function Je(o) {
  return (o - 0.5) * 360;
}
function Ke(o) {
  const e = (180 - o * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(e)) / Math.PI - 90;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function He(o, e) {
  var t = {};
  for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && e.indexOf(r) < 0 && (t[r] = o[r]);
  if (o != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(o); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(o, r[s]) && (t[r[s]] = o[r[s]]);
  return t;
}
class b {
  static isAdvancedMarkerAvailable(e) {
    return google.maps.marker && e.getMapCapabilities().isAdvancedMarkersAvailable === !0;
  }
  static isAdvancedMarker(e) {
    return google.maps.marker && e instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(e, t) {
    this.isAdvancedMarker(e) ? e.map = t : e.setMap(t);
  }
  static getPosition(e) {
    if (this.isAdvancedMarker(e)) {
      if (e.position) {
        if (e.position instanceof google.maps.LatLng)
          return e.position;
        if (e.position.lat && e.position.lng)
          return new google.maps.LatLng(e.position.lat, e.position.lng);
      }
      return new google.maps.LatLng(null);
    }
    return e.getPosition();
  }
  static getVisible(e) {
    return this.isAdvancedMarker(e) ? !0 : e.getVisible();
  }
}
class X {
  constructor({ markers: e, position: t }) {
    this.markers = e, t && (t instanceof google.maps.LatLng ? this._position = t : this._position = new google.maps.LatLng(t));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const t of this.markers)
      e.extend(b.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => b.getVisible(e)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(e) {
    this.markers.push(e);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    this.marker && (b.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
class We {
  constructor({ maxZoom: e = 16 }) {
    this.maxZoom = e;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers: e }) {
    return Ye(e);
  }
}
const Ye = (o) => o.map((t) => new X({
  position: b.getPosition(t),
  markers: [t]
}));
class Qe extends We {
  constructor(e) {
    var { maxZoom: t, radius: r = 60 } = e, s = He(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new qe(Object.assign({ maxZoom: this.maxZoom, radius: r }, s));
  }
  calculate(e) {
    let t = !1;
    const r = { zoom: e.map.getZoom() };
    if (!_(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const s = this.markers.map((i) => {
        const n = b.getPosition(i);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [n.lng(), n.lat()]
          },
          properties: { marker: i }
        };
      });
      this.superCluster.load(s);
    }
    return t || (this.state.zoom <= this.maxZoom || r.zoom <= this.maxZoom) && (t = !_(this.state, r)), this.state = r, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: r }) {
    if (r.cluster)
      return new X({
        markers: this.superCluster.getLeaves(r.cluster_id, 1 / 0).map((i) => i.properties.marker),
        position: { lat: t, lng: e }
      });
    const s = r.marker;
    return new X({
      markers: [s],
      position: b.getPosition(s)
    });
  }
}
class Ve {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const r = t.map((i) => i.count), s = r.reduce((i, n) => i + n, 0);
    this.clusters = {
      count: t.length,
      markers: {
        mean: s / t.length,
        sum: s,
        min: Math.min(...r),
        max: Math.max(...r)
      }
    };
  }
}
class Xe {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count: e, position: t }, r, s) {
    const n = `<svg fill="${e > Math.max(10, r.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, h = `Cluster of ${e} markers`, a = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (b.isAdvancedMarkerAvailable(s)) {
      const p = new DOMParser().parseFromString(n, "image/svg+xml").documentElement;
      p.setAttribute("transform", "translate(0 25)");
      const u = {
        map: s,
        position: t,
        zIndex: a,
        title: h,
        content: p
      };
      return new google.maps.marker.AdvancedMarkerElement(u);
    }
    const l = {
      position: t,
      zIndex: a,
      title: h,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(n)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(l);
  }
}
function et(o, e) {
  for (let t in e.prototype)
    o.prototype[t] = e.prototype[t];
}
class le {
  constructor() {
    et(le, google.maps.OverlayView);
  }
}
var B;
(function(o) {
  o.CLUSTERING_BEGIN = "clusteringbegin", o.CLUSTERING_END = "clusteringend", o.CLUSTER_CLICK = "click";
})(B || (B = {}));
const tt = (o, e, t) => {
  t.fitBounds(e.bounds);
};
class rt extends le {
  constructor({ map: e, markers: t = [], algorithmOptions: r = {}, algorithm: s = new Qe(r), renderer: i = new Xe(), onClusterClick: n = tt }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = s, this.renderer = i, this.onClusterClick = n, e && this.setMap(e);
  }
  addMarker(e, t) {
    this.markers.includes(e) || (this.markers.push(e), t || this.render());
  }
  addMarkers(e, t) {
    e.forEach((r) => {
      this.addMarker(r, !0);
    }), t || this.render();
  }
  removeMarker(e, t) {
    const r = this.markers.indexOf(e);
    return r === -1 ? !1 : (b.setMap(e, null), this.markers.splice(r, 1), t || this.render(), !0);
  }
  removeMarkers(e, t) {
    let r = !1;
    return e.forEach((s) => {
      r = this.removeMarker(s, !0) || r;
    }), r && !t && this.render(), r;
  }
  clearMarkers(e) {
    this.markers.length = 0, e || this.render();
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const e = this.getMap();
    if (e instanceof google.maps.Map && e.getProjection()) {
      google.maps.event.trigger(this, B.CLUSTERING_BEGIN, this);
      const { clusters: t, changed: r } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (r || r == null) {
        const s = /* @__PURE__ */ new Set();
        for (const n of t)
          n.markers.length == 1 && s.add(n.markers[0]);
        const i = [];
        for (const n of this.clusters)
          n.marker != null && (n.markers.length == 1 ? s.has(n.marker) || b.setMap(n.marker, null) : i.push(n.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => i.forEach((n) => b.setMap(n, null)));
      }
      google.maps.event.trigger(this, B.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((e) => b.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new Ve(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((r) => {
      r.markers.length === 1 ? r.marker = r.markers[0] : (r.marker = this.renderer.render(r, e, t), r.markers.forEach((s) => b.setMap(s, null)), this.onClusterClick && r.marker.addListener(
        "click",
        /* istanbul ignore next */
        (s) => {
          google.maps.event.trigger(this, B.CLUSTER_CLICK, r), this.onClusterClick(s, r, t);
        }
      )), b.setMap(r.marker, t);
    });
  }
}
const nt = A({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object
    }
  },
  setup(o, { slots: e }) {
    const t = C(L, M(null)), r = M(null);
    return t.value && (r.value = I(
      new rt({
        ...o.options,
        map: t.value
      })
    )), te(we, r), S(() => {
      r.value && (r.value.setMap(null), r.value.clearMarkers(), r.value = null);
    }), () => {
      var s;
      return (s = e.default) == null ? void 0 : s.call(e);
    };
  }
});
function ot(o) {
  o.component("VGoogleMap", Te), o.component("VGoogleCircle", Ge), o.component("VGoogleMarker", De), o.component("VGoogleHeatmap", Ne), o.component("VGooglePolygon", Ze), o.component("VGooglePolyline", Ue), o.component("VGoogleRectangle", Be), o.component("VGoogleInfoWindow", _e), o.component("VGoogleMarkerClusterer", nt);
}
export {
  R as useGoogleMapsLoader,
  ot as vGoogleMaps
};
