import { ref as k, defineComponent as A, mergeModels as J, useModel as K, onMounted as P, markRaw as C, nextTick as ee, watch as _, provide as te, onBeforeUnmount as I, openBlock as re, createElementBlock as ne, Fragment as Oe, createElementVNode as se, normalizeClass as Ae, renderSlot as oe, createCommentVNode as ie, inject as O, computed as b, useSlots as me } from "vue";
function Ce(i, e, t, r) {
  function s(o) {
    return o instanceof t ? o : new t(function(n) {
      n(o);
    });
  }
  return new (t || (t = Promise))(function(o, n) {
    function c(l) {
      try {
        h(r.next(l));
      } catch (f) {
        n(f);
      }
    }
    function a(l) {
      try {
        h(r.throw(l));
      } catch (f) {
        n(f);
      }
    }
    function h(l) {
      l.done ? o(l.value) : s(l.value).then(c, a);
    }
    h((r = r.apply(i, [])).next());
  });
}
function Ie(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Se = function i(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, s, o;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (s = r; s-- !== 0; )
        if (!i(e[s], t[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length) return !1;
    for (s = r; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[s])) return !1;
    for (s = r; s-- !== 0; ) {
      var n = o[s];
      if (!i(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, Le = /* @__PURE__ */ Ie(Se);
const ce = "__googleMapsScriptId";
var G;
(function(i) {
  i[i.INITIALIZED = 0] = "INITIALIZED", i[i.LOADING = 1] = "LOADING", i[i.SUCCESS = 2] = "SUCCESS", i[i.FAILURE = 3] = "FAILURE";
})(G || (G = {}));
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
  constructor({ apiKey: e, authReferrerPolicy: t, channel: r, client: s, id: o = ce, language: n, libraries: c = [], mapIds: a, nonce: h, region: l, retries: f = 3, url: p = "https://maps.googleapis.com/maps/api/js", version: m }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = r, this.client = s, this.id = o || ce, this.language = n, this.libraries = c, this.mapIds = a, this.nonce = h, this.region = l, this.retries = f, this.url = p, this.version = m, F.instance) {
      if (!Le(this.options, F.instance.options))
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
    return this.errors.length ? G.FAILURE : this.done ? G.SUCCESS : this.loading ? G.LOADING : G.INITIALIZED;
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
      (o) => !r[o] && delete r[o]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((o) => {
      let n, c, a, h = "The Google Maps JavaScript API", l = "google", f = "importLibrary", p = "__ib__", m = document, d = window;
      d = d[l] || (d[l] = {});
      const g = d.maps || (d.maps = {}), u = /* @__PURE__ */ new Set(), v = new URLSearchParams(), y = () => (
        // @ts-ignore
        n || (n = new Promise((M, $) => Ce(this, void 0, void 0, function* () {
          var R;
          yield c = m.createElement("script"), c.id = this.id, v.set("libraries", [...u] + "");
          for (a in o)
            v.set(a.replace(/[A-Z]/g, (H) => "_" + H[0].toLowerCase()), o[a]);
          v.set("callback", l + ".maps." + p), c.src = this.url + "?" + v, g[p] = M, c.onerror = () => n = $(Error(h + " could not load.")), c.nonce = this.nonce || ((R = m.querySelector("script[nonce]")) === null || R === void 0 ? void 0 : R.nonce) || "", m.head.append(c);
        })))
      );
      g[f] ? console.warn(h + " only loads once. Ignoring:", o) : g[f] = (M, ...$) => u.add(M) && y().then(() => g[f](M, ...$));
    })(r);
    const s = this.libraries.map((o) => this.importLibrary(o));
    s.length || s.push(this.importLibrary("core")), Promise.all(s).then(() => this.callback(), (o) => {
      const n = new ErrorEvent("error", { error: o });
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
const Z = k(null), ve = k(null), ge = k(null), ye = k(null), ke = k(null);
async function xe(i, e = []) {
  Z.value || (Z.value = new F({
    apiKey: i,
    libraries: e
  }), ve.value = await Z.value.importLibrary("core"), ge.value = await Z.value.importLibrary("maps"), ye.value = await Z.value.importLibrary("marker"), ke.value = await Z.value.importLibrary("visualization"));
}
function j() {
  return {
    maps: ge,
    init: xe,
    core: ve,
    loader: Z,
    markers: ye,
    visualization: ke
  };
}
function Pe(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var je = function i(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, s, o;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (s = r; s-- !== 0; )
        if (!i(e[s], t[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length) return !1;
    for (s = r; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[s])) return !1;
    for (s = r; s-- !== 0; ) {
      var n = o[s];
      if (!i(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const w = /* @__PURE__ */ Pe(je), S = Symbol("map"), Me = Symbol("marker"), we = Symbol("marker-clusterer"), Qe = /* @__PURE__ */ A({
  __name: "VGoogleMap",
  props: /* @__PURE__ */ J({
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
  emits: /* @__PURE__ */ J(["ready", "click"], ["update:zoom", "update:center"]),
  setup(i, { expose: e, emit: t }) {
    const r = i, s = t, o = K(i, "zoom"), n = K(i, "center"), { maps: c } = j(), a = k(!1), h = k(null);
    let l = null, f = null, p = null;
    const m = k(null);
    P(async () => {
      var u, v;
      !c.value || !m.value || (h.value = C(
        new c.value.Map(m.value, {
          ...r.options,
          zoom: o.value ?? ((u = r.options) == null ? void 0 : u.zoom),
          center: n.value ?? ((v = r.options) == null ? void 0 : v.center)
        })
      ), a.value = !0, await ee(), d(), s("ready"));
    });
    function d() {
      h.value && (l = h.value.addListener("click", (u) => {
        s("click", u);
      }), f = h.value.addListener("dragend", () => {
        var u, v;
        n.value = ((v = (u = h.value) == null ? void 0 : u.getCenter()) == null ? void 0 : v.toJSON()) ?? null;
      }), p = h.value.addListener("zoom_changed", () => {
        var u;
        o.value = ((u = h.value) == null ? void 0 : u.getZoom()) ?? 0;
      }));
    }
    function g() {
      l == null || l.remove(), f == null || f.remove(), p == null || p.remove();
    }
    return _(
      () => r.options,
      (u, v) => {
        !h.value || w(u, v) || h.value.setOptions(r.options);
      },
      {
        deep: !0
      }
    ), _(
      n,
      (u, v) => {
        w(u, v) || !h.value || !u || h.value.setCenter({
          ...u
        });
      }
    ), _(o, (u, v) => {
      w(u, v) || !h.value || !u || h.value.setZoom(u);
    }), e({
      map: h
    }), te(S, h), I(() => {
      g(), h.value = null;
    }), (u, v) => (re(), ne(Oe, null, [
      se("div", {
        ref_key: "mapRef",
        ref: m,
        class: Ae(r.class)
      }, null, 2),
      a.value ? oe(u.$slots, "default", { key: 0 }) : ie("", !0)
    ], 64));
  }
}), Xe = A({
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
  setup(i, { emit: e, expose: t, slots: r }) {
    const { maps: s } = j(), o = O(S, k(null)), n = k(null);
    let c = null, a = null, h = null;
    P(() => {
      var d, g;
      o.value && s.value && (n.value = C(
        new s.value.Circle({
          ...i.options,
          map: o.value,
          center: l.value ?? ((d = i.options) == null ? void 0 : d.center),
          radius: f.value ?? ((g = i.options) == null ? void 0 : g.radius)
        })
      ), p());
    });
    const l = b({
      get() {
        return i.center;
      },
      set(d) {
        e("update:center", d);
      }
    }), f = b({
      get() {
        return i.radius;
      },
      set(d) {
        e("update:radius", d);
      }
    });
    function p() {
      n.value && (c = n.value.addListener("click", (d) => {
        e("click", d);
      }), a = n.value.addListener("radius_changed", () => {
        var d;
        f.value = ((d = n.value) == null ? void 0 : d.getRadius()) ?? null;
      }), h = n.value.addListener("center_changed", () => {
        var g, u;
        const d = (u = (g = n.value) == null ? void 0 : g.getCenter()) == null ? void 0 : u.toJSON();
        d && (l.value = {
          ...d
        });
      }));
    }
    function m() {
      c == null || c.remove(), a == null || a.remove(), h == null || h.remove();
    }
    return _(
      () => i.options,
      (d, g) => {
        !n.value || w(d, g) || n.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), _(
      l,
      (d, g) => {
        !n.value || !d || w(d, g) || n.value.setCenter({
          ...d
        });
      }
    ), _(f, (d, g) => {
      !n.value || !d || w(d, g) || n.value.setRadius(d);
    }), t({
      circle: n
    }), I(() => {
      m(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var d;
      return (d = r.default) == null ? void 0 : d.call(r);
    };
  }
}), Ve = A({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(i, { expose: e, slots: t }) {
    const { visualization: r } = j(), s = O(S, k(null)), o = k(null);
    return P(() => {
      s.value && r.value && (o.value = C(
        new r.value.HeatmapLayer({
          map: s.value,
          ...i.options
        })
      ));
    }), _(
      () => i.options,
      (n, c) => {
        !o.value || w(n, c) || o.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), e({
      heatmap: o
    }), I(() => {
      o.value && (o.value.setMap(null), o.value = null);
    }), () => {
      var n;
      return (n = t.default) == null ? void 0 : n.call(t);
    };
  }
}), et = A({
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
  setup(i, { emit: e, expose: t, slots: r }) {
    const { maps: s } = j(), o = O(S, k(null)), n = k(null);
    let c = null, a = null, h = null, l = null;
    P(() => {
      var d;
      o.value && s.value && (n.value = C(
        new s.value.Polygon({
          ...i.options,
          map: o.value,
          paths: f.value ? [...f.value] : (d = i.options) == null ? void 0 : d.paths
        })
      ), p());
    });
    const f = b({
      get() {
        return i.modelValue;
      },
      set(d) {
        e("update:model-value", d);
      }
    });
    function p() {
      n.value && (c = n.value.addListener("click", (d) => {
        e("click", d);
      }), h = n.value.addListener("mouseout", (d) => {
        e("mouseout", d);
      }), l = n.value.addListener(
        "mouseover",
        (d) => {
          e("mouseover", d);
        }
      ), a = n.value.addListener("mouseup", () => {
        var g, u, v;
        const d = (v = (u = (g = n.value) == null ? void 0 : g.getPath()) == null ? void 0 : u.getArray()) == null ? void 0 : v.map((y) => y.toJSON());
        d && (f.value = [...d]);
      }));
    }
    function m() {
      c == null || c.remove(), a == null || a.remove(), h == null || h.remove(), l == null || l.remove();
    }
    return _(
      () => i.options,
      (d, g) => {
        !n.value || w(d, g) || n.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), _(
      f,
      (d, g) => {
        !n.value || !d || w(d, g) || n.value.setPath(d);
      }
    ), t({
      polygon: n
    }), I(() => {
      m(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var d;
      return (d = r.default) == null ? void 0 : d.call(r);
    };
  }
}), Re = {
  key: 0,
  style: { display: "none" }
}, Te = /* @__PURE__ */ A({
  __name: "VGoogleInfoWindow",
  props: /* @__PURE__ */ J({
    options: { default: null }
  }, {
    modelValue: { type: Boolean, default: !1, required: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i, { expose: e }) {
    const t = i, r = K(i, "modelValue"), s = me(), { maps: o } = j(), n = O(S, k(null)), c = O(Me, k(null)), a = k(!1), h = k(), l = k(null);
    let f = null, p = null;
    P(async () => {
      var y;
      o.value && (l.value = C(
        new o.value.InfoWindow({
          ...t.options,
          content: m.value && !d.value ? h.value : (y = t.options) == null ? void 0 : y.content
        })
      ), await ee(), g(), r.value && v());
    });
    const m = b(() => {
      var y, M;
      return ((M = (y = s.default) == null ? void 0 : y.call(s)) == null ? void 0 : M[0]) ?? null;
    }), d = b(() => {
      var y;
      return ((y = m.value) == null ? void 0 : y.type) === Comment;
    });
    function g() {
      !c.value || !l.value || (p = c.value.addListener("click", v), f = l.value.addListener("closeclick", v));
    }
    function u() {
      p && p.remove(), f && f.remove();
    }
    function v() {
      !l.value || !n.value || (a.value = !a.value, a.value ? l.value.open({
        map: n.value,
        anchor: c.value
      }) : l.value.close(), r.value = a.value);
    }
    return _(
      () => t.options,
      (y, M) => {
        !l.value || w(y, M) || l.value.setOptions(t.options);
      },
      {
        deep: !0
      }
    ), _(r, (y) => {
      y === null || y === a.value || v();
    }), e({
      infoWindow: l
    }), I(() => {
      u(), l.value && (l.value.close(), l.value = null);
    }), (y, M) => m.value && !d.value ? (re(), ne("div", Re, [
      se("div", {
        ref_key: "contentRef",
        ref: h
      }, [
        oe(y.$slots, "default")
      ], 512)
    ])) : ie("", !0);
  }
}), Ne = {
  key: 0,
  style: { display: "none" }
}, tt = /* @__PURE__ */ A({
  __name: "VGoogleMarker",
  props: /* @__PURE__ */ J({
    options: {}
  }, {
    modelValue: {
      default: null,
      required: !1
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i, { expose: e }) {
    const t = i, r = K(i, "modelValue"), s = me(), { markers: o } = j(), n = O(S, k(null)), c = O(we, k(null)), a = k();
    let h = null;
    const l = k(
      null
    );
    P(async () => {
      var u, v;
      o.value && (l.value = C(
        new o.value.AdvancedMarkerElement({
          ...t.options,
          position: r.value ?? ((u = t.options) == null ? void 0 : u.position),
          map: c.value === null ? n.value : null,
          content: f.value && !p.value && !m.value ? a.value : (v = t.options) == null ? void 0 : v.content
        })
      ), await ee(), c.value && c.value.addMarker(l.value), d());
    });
    const f = b(() => {
      var u, v;
      return ((v = (u = s.default) == null ? void 0 : u.call(s)) == null ? void 0 : v[0]) ?? null;
    }), p = b(() => {
      var u;
      return ((u = f.value) == null ? void 0 : u.type) === Comment;
    }), m = b(() => {
      var u;
      return ((u = f.value) == null ? void 0 : u.type) === Te;
    });
    function d() {
      l.value && (h = l.value.addListener("dragend", (u) => {
        var v;
        r.value = ((v = u.latLng) == null ? void 0 : v.toJSON()) ?? null;
      }));
    }
    function g() {
      h == null || h.remove();
    }
    return _(
      () => t.options,
      (u, v) => {
        !l.value || w(u, v) || (u != null && u.title && (l.value.title = u.title), u != null && u.zIndex && (l.value.zIndex = u.zIndex), u != null && u.content && (l.value.content = u.content), u != null && u.position && (l.value.position = u.position), u != null && u.gmpDraggable && (l.value.gmpDraggable = u.gmpDraggable));
      },
      {
        deep: !0
      }
    ), _(
      r,
      (u, v) => {
        !l.value || w(u, v) || (l.value.position = u);
      }
    ), e({
      marker: l
    }), te(Me, l), I(() => {
      g(), l.value && (c.value && c.value.removeMarker(l.value), l.value.map = null, l.value = null);
    }), (u, v) => f.value && !p.value ? (re(), ne("div", Ne, [
      se("div", {
        ref_key: "contentRef",
        ref: a
      }, [
        oe(u.$slots, "default")
      ], 512)
    ])) : ie("", !0);
  }
}), rt = A({
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
  setup(i, { emit: e, expose: t, slots: r }) {
    const { maps: s } = j(), o = O(S, k(null)), n = k(null);
    let c = null, a = null;
    P(() => {
      var p;
      o.value && s.value && (n.value = C(
        new s.value.Polyline({
          ...i.options,
          map: o.value,
          path: h.value ? [...h.value] : (p = i.options) == null ? void 0 : p.path
        })
      ), l());
    });
    const h = b({
      get() {
        return i.modelValue;
      },
      set(p) {
        e("update:model-value", p);
      }
    });
    function l() {
      n.value && (c = n.value.addListener("click", (p) => {
        e("click", p);
      }), a = n.value.addListener("mouseup", () => {
        var m, d, g;
        const p = (g = (d = (m = n.value) == null ? void 0 : m.getPath()) == null ? void 0 : d.getArray()) == null ? void 0 : g.map((u) => u.toJSON());
        p && (h.value = [...p]);
      }));
    }
    function f() {
      c == null || c.remove(), a == null || a.remove();
    }
    return _(
      () => i.options,
      (p, m) => {
        !n.value || w(p, m) || n.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), _(
      h,
      (p, m) => {
        !n.value || !p || w(p, m) || n.value.setPath(p);
      }
    ), t({
      polyline: n
    }), I(() => {
      f(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var p;
      return (p = r.default) == null ? void 0 : p.call(r);
    };
  }
}), nt = A({
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
  setup(i, { emit: e, expose: t, slots: r }) {
    const { maps: s } = j(), o = O(S, k(null)), n = k(null);
    let c = null, a = null;
    P(() => {
      var p;
      o.value && s.value && (n.value = C(
        new s.value.Rectangle({
          ...i.options,
          map: o.value,
          bounds: h.value ?? ((p = i.options) == null ? void 0 : p.bounds)
        })
      ), l());
    });
    const h = b({
      get() {
        return i.modelValue;
      },
      set(p) {
        e("update:model-value", p);
      }
    });
    function l() {
      n.value && (c = n.value.addListener("click", (p) => {
        e("click", p);
      }), a = n.value.addListener("bounds_changed", () => {
        var m, d;
        const p = (d = (m = n.value) == null ? void 0 : m.getBounds()) == null ? void 0 : d.toJSON();
        p && (h.value = {
          ...p
        });
      }));
    }
    function f() {
      c == null || c.remove(), a == null || a.remove();
    }
    return _(
      () => i.options,
      (p, m) => {
        !n.value || w(p, m) || n.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), _(
      h,
      (p, m) => {
        !n.value || !p || w(p, m) || n.value.setBounds(p);
      }
    ), t({
      rectangle: n
    }), I(() => {
      f(), n.value && (n.value.setMap(null), n.value = null);
    }), () => {
      var p;
      return (p = r.default) == null ? void 0 : p.call(r);
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
    const o = he[r & 15];
    if (!o)
      throw new Error("Unrecognized array type.");
    const [n] = new Uint16Array(e, 2, 1), [c] = new Uint32Array(e, 4, 1);
    return new ae(c, n, o, e);
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
    const o = he.indexOf(this.ArrayType), n = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, c = e * this.IndexArrayType.BYTES_PER_ELEMENT, a = (8 - c % 8) % 8;
    if (o < 0)
      throw new Error(`Unexpected typed array class: ${r}.`);
    s && s instanceof ArrayBuffer ? (this.data = s, this.ids = new this.IndexArrayType(this.data, D, e), this.coords = new this.ArrayType(this.data, D + c + a, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(D + n + c + a), this.ids = new this.IndexArrayType(this.data, D, e), this.coords = new this.ArrayType(this.data, D + c + a, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (W << 4) + o]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
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
    return X(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
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
    const { ids: o, coords: n, nodeSize: c } = this, a = [0, o.length - 1, 0], h = [];
    for (; a.length; ) {
      const l = a.pop() || 0, f = a.pop() || 0, p = a.pop() || 0;
      if (f - p <= c) {
        for (let u = p; u <= f; u++) {
          const v = n[2 * u], y = n[2 * u + 1];
          v >= e && v <= r && y >= t && y <= s && h.push(o[u]);
        }
        continue;
      }
      const m = p + f >> 1, d = n[2 * m], g = n[2 * m + 1];
      d >= e && d <= r && g >= t && g <= s && h.push(o[m]), (l === 0 ? e <= d : t <= g) && (a.push(p), a.push(m - 1), a.push(1 - l)), (l === 0 ? r >= d : s >= g) && (a.push(m + 1), a.push(f), a.push(1 - l));
    }
    return h;
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
    const { ids: s, coords: o, nodeSize: n } = this, c = [0, s.length - 1, 0], a = [], h = r * r;
    for (; c.length; ) {
      const l = c.pop() || 0, f = c.pop() || 0, p = c.pop() || 0;
      if (f - p <= n) {
        for (let u = p; u <= f; u++)
          pe(o[2 * u], o[2 * u + 1], e, t) <= h && a.push(s[u]);
        continue;
      }
      const m = p + f >> 1, d = o[2 * m], g = o[2 * m + 1];
      pe(d, g, e, t) <= h && a.push(s[m]), (l === 0 ? e - r <= d : t - r <= g) && (c.push(p), c.push(m - 1), c.push(1 - l)), (l === 0 ? e + r >= d : t + r >= g) && (c.push(m + 1), c.push(f), c.push(1 - l));
    }
    return a;
  }
}
function X(i, e, t, r, s, o) {
  if (s - r <= t) return;
  const n = r + s >> 1;
  _e(i, e, n, r, s, o), X(i, e, t, r, n - 1, 1 - o), X(i, e, t, n + 1, s, 1 - o);
}
function _e(i, e, t, r, s, o) {
  for (; s > r; ) {
    if (s - r > 600) {
      const h = s - r + 1, l = t - r + 1, f = Math.log(h), p = 0.5 * Math.exp(2 * f / 3), m = 0.5 * Math.sqrt(f * p * (h - p) / h) * (l - h / 2 < 0 ? -1 : 1), d = Math.max(r, Math.floor(t - l * p / h + m)), g = Math.min(s, Math.floor(t + (h - l) * p / h + m));
      _e(i, e, t, d, g, o);
    }
    const n = e[2 * t + o];
    let c = r, a = s;
    for (U(i, e, r, t), e[2 * s + o] > n && U(i, e, r, s); c < a; ) {
      for (U(i, e, c, a), c++, a--; e[2 * c + o] < n; ) c++;
      for (; e[2 * a + o] > n; ) a--;
    }
    e[2 * r + o] === n ? U(i, e, r, a) : (a++, U(i, e, a, s)), a <= t && (r = a + 1), t <= a && (s = a - 1);
  }
}
function U(i, e, t, r) {
  Y(i, t, r), Y(e, 2 * t, 2 * r), Y(e, 2 * t + 1, 2 * r + 1);
}
function Y(i, e, t) {
  const r = i[e];
  i[e] = i[t], i[t] = r;
}
function pe(i, e, t, r) {
  const s = i - t, o = e - r;
  return s * s + o * o;
}
const Ze = {
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
  map: (i) => i
  // props => ({sum: props.my_value})
}, de = Math.fround || /* @__PURE__ */ ((i) => (e) => (i[0] = +e, i[0]))(new Float32Array(1)), N = 2, x = 3, Q = 4, L = 5, Ee = 6;
class Fe {
  constructor(e) {
    this.options = Object.assign(Object.create(Ze), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: r, maxZoom: s } = this.options;
    t && console.time("total time");
    const o = `prepare ${e.length} points`;
    t && console.time(o), this.points = e;
    const n = [];
    for (let a = 0; a < e.length; a++) {
      const h = e[a];
      if (!h.geometry) continue;
      const [l, f] = h.geometry.coordinates, p = de(z(l)), m = de(q(f));
      n.push(
        p,
        m,
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
    let c = this.trees[s + 1] = this._createTree(n);
    t && console.timeEnd(o);
    for (let a = s; a >= r; a--) {
      const h = +Date.now();
      c = this.trees[a] = this._createTree(this._cluster(c, a)), t && console.log("z%d: %d clusters in %dms", a, c.numItems, +Date.now() - h);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let r = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const s = Math.max(-90, Math.min(90, e[1]));
    let o = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const n = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      r = -180, o = 180;
    else if (r > o) {
      const f = this.getClusters([r, s, 180, n], t), p = this.getClusters([-180, s, o, n], t);
      return f.concat(p);
    }
    const c = this.trees[this._limitZoom(t)], a = c.range(z(r), q(n), z(o), q(s)), h = c.data, l = [];
    for (const f of a) {
      const p = this.stride * f;
      l.push(h[p + L] > 1 ? fe(h, p, this.clusterProps) : this.points[h[p + x]]);
    }
    return l;
  }
  getChildren(e) {
    const t = this._getOriginId(e), r = this._getOriginZoom(e), s = "No cluster with the specified id.", o = this.trees[r];
    if (!o) throw new Error(s);
    const n = o.data;
    if (t * this.stride >= n.length) throw new Error(s);
    const c = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), a = n[t * this.stride], h = n[t * this.stride + 1], l = o.within(a, h, c), f = [];
    for (const p of l) {
      const m = p * this.stride;
      n[m + Q] === e && f.push(n[m + L] > 1 ? fe(n, m, this.clusterProps) : this.points[n[m + x]]);
    }
    if (f.length === 0) throw new Error(s);
    return f;
  }
  getLeaves(e, t, r) {
    t = t || 10, r = r || 0;
    const s = [];
    return this._appendLeaves(s, e, t, r, 0), s;
  }
  getTile(e, t, r) {
    const s = this.trees[this._limitZoom(e)], o = Math.pow(2, e), { extent: n, radius: c } = this.options, a = c / n, h = (r - a) / o, l = (r + 1 + a) / o, f = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - a) / o, h, (t + 1 + a) / o, l),
      s.data,
      t,
      r,
      o,
      f
    ), t === 0 && this._addTileFeatures(
      s.range(1 - a / o, h, 1, l),
      s.data,
      o,
      r,
      o,
      f
    ), t === o - 1 && this._addTileFeatures(
      s.range(0, h, a / o, l),
      s.data,
      -1,
      r,
      o,
      f
    ), f.features.length ? f : null;
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
  _appendLeaves(e, t, r, s, o) {
    const n = this.getChildren(t);
    for (const c of n) {
      const a = c.properties;
      if (a && a.cluster ? o + a.point_count <= s ? o += a.point_count : o = this._appendLeaves(e, a.cluster_id, r, s, o) : o < s ? o++ : e.push(c), e.length === r) break;
    }
    return o;
  }
  _createTree(e) {
    const t = new ae(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let r = 0; r < e.length; r += this.stride) t.add(e[r], e[r + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, r, s, o, n) {
    for (const c of e) {
      const a = c * this.stride, h = t[a + L] > 1;
      let l, f, p;
      if (h)
        l = be(t, a, this.clusterProps), f = t[a], p = t[a + 1];
      else {
        const g = this.points[t[a + x]];
        l = g.properties;
        const [u, v] = g.geometry.coordinates;
        f = z(u), p = q(v);
      }
      const m = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (f * o - r)),
          Math.round(this.options.extent * (p * o - s))
        ]],
        tags: l
      };
      let d;
      h || this.options.generateId ? d = t[a + x] : d = this.points[t[a + x]].id, d !== void 0 && (m.id = d), n.features.push(m);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: r, extent: s, reduce: o, minPoints: n } = this.options, c = r / (s * Math.pow(2, t)), a = e.data, h = [], l = this.stride;
    for (let f = 0; f < a.length; f += l) {
      if (a[f + N] <= t) continue;
      a[f + N] = t;
      const p = a[f], m = a[f + 1], d = e.within(a[f], a[f + 1], c), g = a[f + L];
      let u = g;
      for (const v of d) {
        const y = v * l;
        a[y + N] > t && (u += a[y + L]);
      }
      if (u > g && u >= n) {
        let v = p * g, y = m * g, M, $ = -1;
        const R = ((f / l | 0) << 5) + (t + 1) + this.points.length;
        for (const H of d) {
          const T = H * l;
          if (a[T + N] <= t) continue;
          a[T + N] = t;
          const ue = a[T + L];
          v += a[T] * ue, y += a[T + 1] * ue, a[T + Q] = R, o && (M || (M = this._map(a, f, !0), $ = this.clusterProps.length, this.clusterProps.push(M)), o(M, this._map(a, T)));
        }
        a[f + Q] = R, h.push(v / u, y / u, 1 / 0, R, -1, u), o && h.push($);
      } else {
        for (let v = 0; v < l; v++) h.push(a[f + v]);
        if (u > 1)
          for (const v of d) {
            const y = v * l;
            if (!(a[y + N] <= t)) {
              a[y + N] = t;
              for (let M = 0; M < l; M++) h.push(a[y + M]);
            }
          }
      }
    }
    return h;
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
    if (e[t + L] > 1) {
      const n = this.clusterProps[e[t + Ee]];
      return r ? Object.assign({}, n) : n;
    }
    const s = this.points[e[t + x]].properties, o = this.options.map(s);
    return r && o === s ? Object.assign({}, o) : o;
  }
}
function fe(i, e, t) {
  return {
    type: "Feature",
    id: i[e + x],
    properties: be(i, e, t),
    geometry: {
      type: "Point",
      coordinates: [$e(i[e]), Ge(i[e + 1])]
    }
  };
}
function be(i, e, t) {
  const r = i[e + L], s = r >= 1e4 ? `${Math.round(r / 1e3)}k` : r >= 1e3 ? `${Math.round(r / 100) / 10}k` : r, o = i[e + Ee], n = o === -1 ? {} : Object.assign({}, t[o]);
  return Object.assign(n, {
    cluster: !0,
    cluster_id: i[e + x],
    point_count: r,
    point_count_abbreviated: s
  });
}
function z(i) {
  return i / 360 + 0.5;
}
function q(i) {
  const e = Math.sin(i * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function $e(i) {
  return (i - 0.5) * 360;
}
function Ge(i) {
  const e = (180 - i * 360) * Math.PI / 180;
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
function De(i, e) {
  var t = {};
  for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && e.indexOf(r) < 0 && (t[r] = i[r]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(i); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[s]) && (t[r[s]] = i[r[s]]);
  return t;
}
class E {
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
class V {
  constructor({ markers: e, position: t }) {
    this.markers = e, t && (t instanceof google.maps.LatLng ? this._position = t : this._position = new google.maps.LatLng(t));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const t of this.markers)
      e.extend(E.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => E.getVisible(e)).length;
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
    this.marker && (E.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
class Ue {
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
    return Be(e);
  }
}
const Be = (i) => i.map((t) => new V({
  position: E.getPosition(t),
  markers: [t]
}));
class ze extends Ue {
  constructor(e) {
    var { maxZoom: t, radius: r = 60 } = e, s = De(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new Fe(Object.assign({ maxZoom: this.maxZoom, radius: r }, s));
  }
  calculate(e) {
    let t = !1;
    const r = { zoom: e.map.getZoom() };
    if (!w(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const s = this.markers.map((o) => {
        const n = E.getPosition(o);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [n.lng(), n.lat()]
          },
          properties: { marker: o }
        };
      });
      this.superCluster.load(s);
    }
    return t || (this.state.zoom <= this.maxZoom || r.zoom <= this.maxZoom) && (t = !w(this.state, r)), this.state = r, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: r }) {
    if (r.cluster)
      return new V({
        markers: this.superCluster.getLeaves(r.cluster_id, 1 / 0).map((o) => o.properties.marker),
        position: { lat: t, lng: e }
      });
    const s = r.marker;
    return new V({
      markers: [s],
      position: E.getPosition(s)
    });
  }
}
class qe {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const r = t.map((o) => o.count), s = r.reduce((o, n) => o + n, 0);
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
class Je {
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
</svg>`, c = `Cluster of ${e} markers`, a = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (E.isAdvancedMarkerAvailable(s)) {
      const f = new DOMParser().parseFromString(n, "image/svg+xml").documentElement;
      f.setAttribute("transform", "translate(0 25)");
      const p = {
        map: s,
        position: t,
        zIndex: a,
        title: c,
        content: f
      };
      return new google.maps.marker.AdvancedMarkerElement(p);
    }
    const h = {
      position: t,
      zIndex: a,
      title: c,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(n)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(h);
  }
}
function Ke(i, e) {
  for (let t in e.prototype)
    i.prototype[t] = e.prototype[t];
}
class le {
  constructor() {
    Ke(le, google.maps.OverlayView);
  }
}
var B;
(function(i) {
  i.CLUSTERING_BEGIN = "clusteringbegin", i.CLUSTERING_END = "clusteringend", i.CLUSTER_CLICK = "click";
})(B || (B = {}));
const He = (i, e, t) => {
  t.fitBounds(e.bounds);
};
class We extends le {
  constructor({ map: e, markers: t = [], algorithmOptions: r = {}, algorithm: s = new ze(r), renderer: o = new Je(), onClusterClick: n = He }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = s, this.renderer = o, this.onClusterClick = n, e && this.setMap(e);
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
    return r === -1 ? !1 : (E.setMap(e, null), this.markers.splice(r, 1), t || this.render(), !0);
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
        const o = [];
        for (const n of this.clusters)
          n.marker != null && (n.markers.length == 1 ? s.has(n.marker) || E.setMap(n.marker, null) : o.push(n.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => o.forEach((n) => E.setMap(n, null)));
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
    this.markers.forEach((e) => E.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new qe(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((r) => {
      r.markers.length === 1 ? r.marker = r.markers[0] : (r.marker = this.renderer.render(r, e, t), r.markers.forEach((s) => E.setMap(s, null)), this.onClusterClick && r.marker.addListener(
        "click",
        /* istanbul ignore next */
        (s) => {
          google.maps.event.trigger(this, B.CLUSTER_CLICK, r), this.onClusterClick(s, r, t);
        }
      )), E.setMap(r.marker, t);
    });
  }
}
const st = A({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object
    }
  },
  setup(i, { slots: e }) {
    const t = O(S, k(null)), r = k(null);
    return t.value && (r.value = C(
      new We({
        ...i.options,
        map: t.value
      })
    )), te(we, r), I(() => {
      r.value && (r.value.setMap(null), r.value.clearMarkers(), r.value = null);
    }), () => {
      var s;
      return (s = e.default) == null ? void 0 : s.call(e);
    };
  }
});
export {
  Xe as VGoogleCircle,
  Ve as VGoogleHeatmap,
  Te as VGoogleInfoWindow,
  Qe as VGoogleMap,
  tt as VGoogleMarker,
  st as VGoogleMarkerClusterer,
  et as VGooglePolygon,
  rt as VGooglePolyline,
  nt as VGoogleRectangle,
  j as useGoogleMapsLoader
};
