import { ref as M, defineComponent as I, getCurrentInstance as D, onMounted as R, markRaw as x, nextTick as te, watch as b, provide as ne, onBeforeUnmount as S, openBlock as re, createElementBlock as oe, Fragment as Ae, createElementVNode as se, normalizeClass as Ie, renderSlot as ie, createCommentVNode as ae, inject as A, mergeModels as xe, useModel as Se, useSlots as ve, computed as z } from "vue";
function Pe(o, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function f(l) {
      try {
        u(n.next(l));
      } catch (h) {
        a(h);
      }
    }
    function r(l) {
      try {
        u(n.throw(l));
      } catch (h) {
        a(h);
      }
    }
    function u(l) {
      l.done ? i(l.value) : s(l.value).then(f, r);
    }
    u((n = n.apply(o, [])).next());
  });
}
function Le(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var je = function o(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var n, s, i;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length) return !1;
      for (s = n; s-- !== 0; )
        if (!o(e[s], t[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, i[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var a = i[s];
      if (!o(e[a], t[a])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, Re = /* @__PURE__ */ Le(je);
const ce = "__googleMapsScriptId";
var F;
(function(o) {
  o[o.INITIALIZED = 0] = "INITIALIZED", o[o.LOADING = 1] = "LOADING", o[o.SUCCESS = 2] = "SUCCESS", o[o.FAILURE = 3] = "FAILURE";
})(F || (F = {}));
class Z {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: n, client: s, id: i = ce, language: a, libraries: f = [], mapIds: r, nonce: u, region: l, retries: h = 3, url: v = "https://maps.googleapis.com/maps/api/js", version: m }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = n, this.client = s, this.id = i || ce, this.language = a, this.libraries = f, this.mapIds = r, this.nonce = u, this.region = l, this.retries = h, this.url = v, this.version = m, Z.instance) {
      if (!Re(this.options, Z.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Z.instance.options)}`);
      return Z.instance;
    }
    Z.instance = this;
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
    return this.errors.length ? F.FAILURE : this.done ? F.SUCCESS : this.loading ? F.LOADING : F.INITIALIZED;
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
      this.loadCallback((n) => {
        n ? t(n.error) : e(window.google);
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
    const n = {
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
    Object.keys(n).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i) => !n[i] && delete n[i]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((i) => {
      let a, f, r, u = "The Google Maps JavaScript API", l = "google", h = "importLibrary", v = "__ib__", m = document, d = window;
      d = d[l] || (d[l] = {});
      const c = d.maps || (d.maps = {}), y = /* @__PURE__ */ new Set(), p = new URLSearchParams(), k = () => (
        // @ts-ignore
        a || (a = new Promise((w, g) => Pe(this, void 0, void 0, function* () {
          var _;
          yield f = m.createElement("script"), f.id = this.id, p.set("libraries", [...y] + "");
          for (r in i)
            p.set(r.replace(/[A-Z]/g, (G) => "_" + G[0].toLowerCase()), i[r]);
          p.set("callback", l + ".maps." + v), f.src = this.url + "?" + p, c[v] = w, f.onerror = () => a = g(Error(u + " could not load.")), f.nonce = this.nonce || ((_ = m.querySelector("script[nonce]")) === null || _ === void 0 ? void 0 : _.nonce) || "", m.head.append(f);
        })))
      );
      c[h] ? console.warn(u + " only loads once. Ignoring:", i) : c[h] = (w, ...g) => y.add(w) && k().then(() => c[h](w, ...g));
    })(n);
    const s = this.libraries.map((i) => this.importLibrary(i));
    s.length || s.push(this.importLibrary("core")), Promise.all(s).then(() => this.callback(), (i) => {
      const a = new ErrorEvent("error", { error: i });
      this.loadErrorCallback(a);
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
const N = M(null), ge = M(null), ye = M(null), ke = M(null), we = M(null);
async function Te(o, e = []) {
  N.value || (N.value = new Z({
    apiKey: o,
    libraries: e
  }), ge.value = await N.value.importLibrary("core"), ye.value = await N.value.importLibrary("maps"), ke.value = await N.value.importLibrary("marker"), we.value = await N.value.importLibrary("visualization"));
}
function T() {
  return {
    maps: ye,
    init: Te,
    core: ge,
    loader: N,
    markers: ke,
    visualization: we
  };
}
function Ge(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var H, he;
function Ue() {
  return he || (he = 1, H = function o(e, t) {
    if (e === t) return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      if (e.constructor !== t.constructor) return !1;
      var n, s, i;
      if (Array.isArray(e)) {
        if (n = e.length, n != t.length) return !1;
        for (s = n; s-- !== 0; )
          if (!o(e[s], t[s])) return !1;
        return !0;
      }
      if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
      if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
      if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
      for (s = n; s-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, i[s])) return !1;
      for (s = n; s-- !== 0; ) {
        var a = i[s];
        if (!o(e[a], t[a])) return !1;
      }
      return !0;
    }
    return e !== e && t !== t;
  }), H;
}
var Ne = Ue();
const E = /* @__PURE__ */ Ge(Ne), P = Symbol("map"), Me = Symbol("marker"), _e = Symbol("marker-clusterer"), Ze = /* @__PURE__ */ I({
  __name: "VGoogleMap",
  props: {
    class: {},
    zoom: {},
    options: {},
    center: {}
  },
  emits: ["ready", "update:zoom", "click", "update:center"],
  setup(o, { expose: e, emit: t }) {
    const n = o, s = t, { maps: i } = T(), a = M(!1), f = D(), r = M(n.zoom), u = M(n.center), l = M(null), h = M(null);
    let v = null, m = null, d = null;
    R(async () => {
      var p, k;
      !i.value || !h.value || (l.value = x(
        new i.value.Map(h.value, {
          ...n.options,
          zoom: n.zoom ?? ((p = n.options) == null ? void 0 : p.zoom),
          center: n.center ?? ((k = n.options) == null ? void 0 : k.center)
        })
      ), a.value = !0, await te(), c(), s("ready"));
    });
    function c() {
      var k;
      if (y(), !l.value) return;
      const p = (k = f == null ? void 0 : f.vnode) == null ? void 0 : k.props;
      p != null && p.onClick && (v = l.value.addListener("click", (w) => {
        s("click", w);
      })), p != null && p["onUpdate:center"] && (m = l.value.addListener("dragend", () => {
        var g, _;
        const w = (_ = (g = l.value) == null ? void 0 : g.getCenter()) == null ? void 0 : _.toJSON();
        w && (u.value = { ...w }, s("update:center", u.value));
      })), p != null && p["onUpdate:zoom"] && (d = l.value.addListener("zoom_changed", () => {
        var w;
        r.value = ((w = l.value) == null ? void 0 : w.getZoom()) ?? 0, s("update:zoom", r.value);
      }));
    }
    function y() {
      v == null || v.remove(), m == null || m.remove(), d == null || d.remove();
    }
    return b(
      () => n.options,
      (p, k) => {
        !l.value || E(p, k) || l.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), b(
      () => n.center,
      (p) => {
        !l.value || !p || E(p, u.value) || l.value.setCenter({ ...p });
      }
    ), b(
      () => n.zoom,
      (p) => {
        !l.value || !p || E(p, r.value) || l.value.setZoom(p);
      }
    ), e({
      map: l
    }), ne(P, l), S(() => {
      y(), l.value = null;
    }), (p, k) => (re(), oe(Ae, null, [
      se("div", {
        ref_key: "mapRef",
        ref: h,
        class: Ie(n.class)
      }, null, 2),
      a.value ? ie(p.$slots, "default", { key: 0 }) : ae("", !0)
    ], 64));
  }
}), Fe = I({
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
  setup(o, { emit: e, expose: t, slots: n }) {
    const { maps: s } = T(), i = A(P, M(null)), a = D(), f = M(o.center), r = M(o.radius), u = M(null);
    let l = null, h = null, v = null;
    R(() => {
      var c, y;
      i.value && s.value && (u.value = x(
        new s.value.Circle({
          ...o.options,
          map: i.value,
          center: o.center ?? ((c = o.options) == null ? void 0 : c.center),
          radius: o.radius ?? ((y = o.options) == null ? void 0 : y.radius)
        })
      ), m());
    });
    function m() {
      var y;
      if (d(), !u.value) return;
      const c = (y = a == null ? void 0 : a.vnode) == null ? void 0 : y.props;
      c != null && c.onClick && (l = u.value.addListener("click", (p) => {
        e("click", p);
      })), c != null && c["onUpdate:radius"] && (h = u.value.addListener("radius_changed", () => {
        var p;
        r.value = ((p = u.value) == null ? void 0 : p.getRadius()) ?? 0, e("update:radius", r.value);
      })), c != null && c["onUpdate:center"] && (v = u.value.addListener("center_changed", () => {
        var k, w;
        const p = (w = (k = u.value) == null ? void 0 : k.getCenter()) == null ? void 0 : w.toJSON();
        p && (f.value = { ...p }, e("update:center", f.value));
      }));
    }
    function d() {
      l == null || l.remove(), h == null || h.remove(), v == null || v.remove();
    }
    return b(
      () => o.options,
      (c, y) => {
        !u.value || E(c, y) || u.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.center,
      (c) => {
        !u.value || !c || E(c, f.value) || u.value.setCenter({ ...c });
      }
    ), b(
      () => o.radius,
      (c) => {
        !u.value || !c || E(c, r.value) || u.value.setRadius(c);
      }
    ), t({
      circle: u
    }), S(() => {
      d(), u.value && (u.value.setMap(null), u.value = null);
    }), () => {
      var c;
      return (c = n.default) == null ? void 0 : c.call(n);
    };
  }
}), De = I({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(o, { expose: e, slots: t }) {
    const { visualization: n } = T(), s = A(P, M(null)), i = M(null);
    return R(() => {
      s.value && n.value && (i.value = x(
        new n.value.HeatmapLayer({
          map: s.value,
          ...o.options
        })
      ));
    }), b(
      () => o.options,
      (a, f) => {
        !i.value || E(a, f) || i.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), e({
      heatmap: i
    }), S(() => {
      i.value && (i.value.setMap(null), i.value = null);
    }), () => {
      var a;
      return (a = t.default) == null ? void 0 : a.call(t);
    };
  }
}), $e = I({
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
  setup(o, { emit: e, expose: t, slots: n }) {
    const { maps: s } = T(), i = A(P, M(null)), a = D(), f = M(o.modelValue), r = M(null);
    let u = null, l = null, h = null, v = null;
    R(() => {
      var c;
      i.value && s.value && (r.value = x(
        new s.value.Polygon({
          ...o.options,
          map: i.value,
          paths: o.modelValue ? [...o.modelValue] : (c = o.options) == null ? void 0 : c.paths
        })
      ), m());
    });
    function m() {
      var y;
      if (d(), !r.value) return;
      const c = (y = a == null ? void 0 : a.vnode) == null ? void 0 : y.props;
      c != null && c.onClick && (u = r.value.addListener("click", (p) => {
        e("click", p);
      })), c != null && c.onMouseout && (h = r.value.addListener(
        "mouseout",
        (p) => {
          e("mouseout", p);
        }
      )), c != null && c.onMouseover && (v = r.value.addListener(
        "mouseover",
        (p) => {
          e("mouseover", p);
        }
      )), c != null && c["onUpdate:modelValue"] && (l = r.value.addListener("mouseup", () => {
        var k, w, g;
        const p = (g = (w = (k = r.value) == null ? void 0 : k.getPath()) == null ? void 0 : w.getArray()) == null ? void 0 : g.map((_) => _.toJSON());
        p && (f.value = [...p], e("update:model-value", f.value));
      }));
    }
    function d() {
      u == null || u.remove(), l == null || l.remove(), h == null || h.remove(), v == null || v.remove();
    }
    return b(
      () => o.options,
      (c, y) => {
        !r.value || E(c, y) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (c) => {
        !r.value || !c || E(c, f.value) || r.value.setPath(c);
      }
    ), t({
      polygon: r
    }), S(() => {
      d(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var c;
      return (c = n.default) == null ? void 0 : c.call(n);
    };
  }
}), Ve = {
  key: 0,
  style: { display: "none" }
}, Ee = /* @__PURE__ */ I({
  __name: "VGoogleInfoWindow",
  props: /* @__PURE__ */ xe({
    options: { default: null }
  }, {
    modelValue: { type: Boolean, default: !1, required: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o, { expose: e }) {
    const t = o, n = Se(o, "modelValue"), s = ve(), { maps: i } = T(), a = A(P, M(null)), f = A(Me, M(null)), r = M(!1), u = M(), l = M(null);
    let h = null, v = null;
    R(async () => {
      var k;
      i.value && (l.value = x(
        new i.value.InfoWindow({
          ...t.options,
          content: m.value && !d.value ? u.value : (k = t.options) == null ? void 0 : k.content
        })
      ), await te(), c(), n.value && p());
    });
    const m = z(() => {
      var k, w;
      return ((w = (k = s.default) == null ? void 0 : k.call(s, {})) == null ? void 0 : w[0]) ?? null;
    }), d = z(() => {
      var k;
      return ((k = m.value) == null ? void 0 : k.type) === Comment;
    });
    function c() {
      !f.value || !l.value || (v = f.value.addListener("click", p), h = l.value.addListener("closeclick", p));
    }
    function y() {
      v == null || v.remove(), h == null || h.remove();
    }
    function p() {
      !l.value || !a.value || (r.value = !r.value, r.value ? l.value.open({
        map: a.value,
        anchor: f.value
      }) : l.value.close(), n.value = r.value);
    }
    return b(
      () => t.options,
      (k, w) => {
        !l.value || E(k, w) || l.value.setOptions(t.options);
      },
      {
        deep: !0
      }
    ), b(n, (k) => {
      k === null || k === r.value || p();
    }), e({
      infoWindow: l
    }), S(() => {
      y(), l.value && (l.value.close(), l.value = null);
    }), (k, w) => m.value && !d.value ? (re(), oe("div", Ve, [
      se("div", {
        ref_key: "contentRef",
        ref: u
      }, [
        ie(k.$slots, "default")
      ], 512)
    ])) : ae("", !0);
  }
}), Be = {
  key: 0,
  style: { display: "none" }
}, ze = /* @__PURE__ */ I({
  __name: "VGoogleMarker",
  props: {
    options: { default: void 0 },
    modelValue: { default: null }
  },
  emits: ["click", "update:model-value"],
  setup(o, { expose: e, emit: t }) {
    const n = o, s = t, i = ve(), { markers: a } = T(), f = A(P, M(null)), r = A(_e, M(null)), u = D(), l = M(), h = M(n.modelValue);
    let v = null, m = null;
    const d = M(
      null
    );
    R(async () => {
      var g, _;
      a.value && (d.value = x(
        new a.value.AdvancedMarkerElement({
          ...n.options,
          position: n.modelValue ?? ((g = n.options) == null ? void 0 : g.position),
          map: r.value === null ? f.value : null,
          content: c.value && !y.value && !p.value ? l.value : (_ = n.options) == null ? void 0 : _.content
        })
      ), await te(), r.value && r.value.addMarker(d.value), k());
    });
    const c = z(() => {
      var g, _;
      return ((_ = (g = i.default) == null ? void 0 : g.call(i, {})) == null ? void 0 : _[0]) ?? null;
    }), y = z(() => {
      var g;
      return ((g = c.value) == null ? void 0 : g.type) === Comment;
    }), p = z(() => {
      var g;
      return ((g = c.value) == null ? void 0 : g.type) === Ee;
    });
    function k() {
      var _;
      if (w(), !d.value) return;
      const g = (_ = u == null ? void 0 : u.vnode) == null ? void 0 : _.props;
      g != null && g["onUpdate:modelValue"] && (m = d.value.addListener("dragend", (G) => {
        var $;
        const C = ($ = G.latLng) == null ? void 0 : $.toJSON();
        C && (h.value = { ...C }, s("update:model-value", h.value));
      })), g != null && g.onClick && (v = d.value.addListener("click", (G) => {
        s("click", G);
      }));
    }
    function w() {
      v == null || v.remove(), m == null || m.remove();
    }
    return b(
      () => n.options,
      (g, _) => {
        !d.value || E(g, _) || (g != null && g.title && (d.value.title = g.title), g != null && g.zIndex && (d.value.zIndex = g.zIndex), g != null && g.content && (d.value.content = g.content), g != null && g.position && (d.value.position = g.position), g != null && g.gmpDraggable && (d.value.gmpDraggable = g.gmpDraggable));
      },
      {
        deep: !0
      }
    ), b(
      () => n.modelValue,
      (g) => {
        !d.value || E(g, h.value) || (d.value.position = g);
      }
    ), e({
      marker: d
    }), ne(Me, d), S(() => {
      w(), d.value && (r.value && r.value.removeMarker(d.value), d.value.map = null, d.value = null);
    }), (g, _) => c.value && !y.value ? (re(), oe("div", Be, [
      se("div", {
        ref_key: "contentRef",
        ref: l
      }, [
        ie(g.$slots, "default")
      ], 512)
    ])) : ae("", !0);
  }
}), qe = I({
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
  emits: ["click", "contextmenu", "update:model-value"],
  setup(o, { emit: e, expose: t, slots: n }) {
    const { maps: s } = T(), i = A(P, M(null)), a = D(), f = M(o.modelValue), r = M(null);
    let u = null, l = null, h = null;
    R(() => {
      var d;
      i.value && s.value && (r.value = x(
        new s.value.Polyline({
          ...o.options,
          map: i.value,
          path: o.modelValue ? [...o.modelValue] : (d = o.options) == null ? void 0 : d.path
        })
      ), v());
    });
    function v() {
      var c;
      if (m(), !r.value) return;
      const d = (c = a == null ? void 0 : a.vnode) == null ? void 0 : c.props;
      console.log(d == null ? void 0 : d.onContextmenu), d != null && d.onClick && (u = r.value.addListener("click", (y) => {
        e("click", y);
      })), d != null && d.onContextmenu && (h = r.value.addListener(
        "contextmenu",
        (y) => {
          e("contextmenu", y);
        }
      )), d != null && d["onUpdate:modelValue"] && (l = r.value.addListener("mouseup", () => {
        var p, k, w;
        const y = (w = (k = (p = r.value) == null ? void 0 : p.getPath()) == null ? void 0 : k.getArray()) == null ? void 0 : w.map((g) => g.toJSON());
        y && (f.value = [...y], e("update:model-value", f.value));
      }));
    }
    function m() {
      u == null || u.remove(), l == null || l.remove(), h == null || h.remove();
    }
    return b(
      () => o.options,
      (d, c) => {
        !r.value || E(d, c) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (d) => {
        !r.value || !d || E(d, f.value) || r.value.setPath(d);
      }
    ), t({
      polyline: r
    }), S(() => {
      m(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var d;
      return (d = n.default) == null ? void 0 : d.call(n);
    };
  }
}), Je = I({
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
  setup(o, { emit: e, expose: t, slots: n }) {
    const { maps: s } = T(), i = A(P, M(null)), a = D(), f = M(o.modelValue), r = M(null);
    let u = null, l = null;
    R(() => {
      var m;
      i.value && s.value && (r.value = x(
        new s.value.Rectangle({
          ...o.options,
          map: i.value,
          bounds: o.modelValue ?? ((m = o.options) == null ? void 0 : m.bounds)
        })
      ), h());
    });
    function h() {
      var d;
      if (v(), !r.value) return;
      const m = (d = a == null ? void 0 : a.vnode) == null ? void 0 : d.props;
      m != null && m.onClick && (u = r.value.addListener("click", (c) => {
        e("click", c);
      })), m != null && m["onUpdate:modelValue"] && (l = r.value.addListener("bounds_changed", () => {
        var y, p;
        const c = (p = (y = r.value) == null ? void 0 : y.getBounds()) == null ? void 0 : p.toJSON();
        c && (f.value = { ...c }, e("update:model-value", f.value));
      }));
    }
    function v() {
      u == null || u.remove(), l == null || l.remove();
    }
    return b(
      () => o.options,
      (m, d) => {
        !r.value || E(m, d) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (m) => {
        !r.value || !m || E(m, f.value) || r.value.setBounds(m);
      }
    ), t({
      rectangle: r
    }), S(() => {
      v(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var m;
      return (m = n.default) == null ? void 0 : m.call(n);
    };
  }
}), de = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], W = 1, V = 8;
class le {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(e) {
    if (!(e instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [t, n] = new Uint8Array(e, 0, 2);
    if (t !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const s = n >> 4;
    if (s !== W)
      throw new Error(`Got v${s} data when expected v${W}.`);
    const i = de[n & 15];
    if (!i)
      throw new Error("Unrecognized array type.");
    const [a] = new Uint16Array(e, 2, 1), [f] = new Uint32Array(e, 4, 1);
    return new le(f, a, i, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, t = 64, n = Float64Array, s) {
    if (isNaN(e) || e < 0) throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.ArrayType = n, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const i = de.indexOf(this.ArrayType), a = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, f = e * this.IndexArrayType.BYTES_PER_ELEMENT, r = (8 - f % 8) % 8;
    if (i < 0)
      throw new Error(`Unexpected typed array class: ${n}.`);
    s && s instanceof ArrayBuffer ? (this.data = s, this.ids = new this.IndexArrayType(this.data, V, e), this.coords = new this.ArrayType(this.data, V + f + r, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(V + a + f + r), this.ids = new this.IndexArrayType(this.data, V, e), this.coords = new this.ArrayType(this.data, V + f + r, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (W << 4) + i]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(e, t) {
    const n = this._pos >> 1;
    return this.ids[n] = n, this.coords[this._pos++] = e, this.coords[this._pos++] = t, n;
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
  range(e, t, n, s) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: i, coords: a, nodeSize: f } = this, r = [0, i.length - 1, 0], u = [];
    for (; r.length; ) {
      const l = r.pop() || 0, h = r.pop() || 0, v = r.pop() || 0;
      if (h - v <= f) {
        for (let y = v; y <= h; y++) {
          const p = a[2 * y], k = a[2 * y + 1];
          p >= e && p <= n && k >= t && k <= s && u.push(i[y]);
        }
        continue;
      }
      const m = v + h >> 1, d = a[2 * m], c = a[2 * m + 1];
      d >= e && d <= n && c >= t && c <= s && u.push(i[m]), (l === 0 ? e <= d : t <= c) && (r.push(v), r.push(m - 1), r.push(1 - l)), (l === 0 ? n >= d : s >= c) && (r.push(m + 1), r.push(h), r.push(1 - l));
    }
    return u;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, t, n) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: s, coords: i, nodeSize: a } = this, f = [0, s.length - 1, 0], r = [], u = n * n;
    for (; f.length; ) {
      const l = f.pop() || 0, h = f.pop() || 0, v = f.pop() || 0;
      if (h - v <= a) {
        for (let y = v; y <= h; y++)
          fe(i[2 * y], i[2 * y + 1], e, t) <= u && r.push(s[y]);
        continue;
      }
      const m = v + h >> 1, d = i[2 * m], c = i[2 * m + 1];
      fe(d, c, e, t) <= u && r.push(s[m]), (l === 0 ? e - n <= d : t - n <= c) && (f.push(v), f.push(m - 1), f.push(1 - l)), (l === 0 ? e + n >= d : t + n >= c) && (f.push(m + 1), f.push(h), f.push(1 - l));
    }
    return r;
  }
}
function X(o, e, t, n, s, i) {
  if (s - n <= t) return;
  const a = n + s >> 1;
  be(o, e, a, n, s, i), X(o, e, t, n, a - 1, 1 - i), X(o, e, t, a + 1, s, 1 - i);
}
function be(o, e, t, n, s, i) {
  for (; s > n; ) {
    if (s - n > 600) {
      const u = s - n + 1, l = t - n + 1, h = Math.log(u), v = 0.5 * Math.exp(2 * h / 3), m = 0.5 * Math.sqrt(h * v * (u - v) / u) * (l - u / 2 < 0 ? -1 : 1), d = Math.max(n, Math.floor(t - l * v / u + m)), c = Math.min(s, Math.floor(t + (u - l) * v / u + m));
      be(o, e, t, d, c, i);
    }
    const a = e[2 * t + i];
    let f = n, r = s;
    for (B(o, e, n, t), e[2 * s + i] > a && B(o, e, n, s); f < r; ) {
      for (B(o, e, f, r), f++, r--; e[2 * f + i] < a; ) f++;
      for (; e[2 * r + i] > a; ) r--;
    }
    e[2 * n + i] === a ? B(o, e, n, r) : (r++, B(o, e, r, s)), r <= t && (n = r + 1), t <= r && (s = r - 1);
  }
}
function B(o, e, t, n) {
  Y(o, t, n), Y(e, 2 * t, 2 * n), Y(e, 2 * t + 1, 2 * n + 1);
}
function Y(o, e, t) {
  const n = o[e];
  o[e] = o[t], o[t] = n;
}
function fe(o, e, t, n) {
  const s = o - t, i = e - n;
  return s * s + i * i;
}
const Ke = {
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
}, pe = Math.fround || /* @__PURE__ */ ((o) => (e) => (o[0] = +e, o[0]))(new Float32Array(1)), U = 2, j = 3, Q = 4, L = 5, Oe = 6;
class He {
  constructor(e) {
    this.options = Object.assign(Object.create(Ke), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: n, maxZoom: s } = this.options;
    t && console.time("total time");
    const i = `prepare ${e.length} points`;
    t && console.time(i), this.points = e;
    const a = [];
    for (let r = 0; r < e.length; r++) {
      const u = e[r];
      if (!u.geometry) continue;
      const [l, h] = u.geometry.coordinates, v = pe(J(l)), m = pe(K(h));
      a.push(
        v,
        m,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        r,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && a.push(0);
    }
    let f = this.trees[s + 1] = this._createTree(a);
    t && console.timeEnd(i);
    for (let r = s; r >= n; r--) {
      const u = +Date.now();
      f = this.trees[r] = this._createTree(this._cluster(f, r)), t && console.log("z%d: %d clusters in %dms", r, f.numItems, +Date.now() - u);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let n = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const s = Math.max(-90, Math.min(90, e[1]));
    let i = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const a = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      n = -180, i = 180;
    else if (n > i) {
      const h = this.getClusters([n, s, 180, a], t), v = this.getClusters([-180, s, i, a], t);
      return h.concat(v);
    }
    const f = this.trees[this._limitZoom(t)], r = f.range(J(n), K(a), J(i), K(s)), u = f.data, l = [];
    for (const h of r) {
      const v = this.stride * h;
      l.push(u[v + L] > 1 ? me(u, v, this.clusterProps) : this.points[u[v + j]]);
    }
    return l;
  }
  getChildren(e) {
    const t = this._getOriginId(e), n = this._getOriginZoom(e), s = "No cluster with the specified id.", i = this.trees[n];
    if (!i) throw new Error(s);
    const a = i.data;
    if (t * this.stride >= a.length) throw new Error(s);
    const f = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), r = a[t * this.stride], u = a[t * this.stride + 1], l = i.within(r, u, f), h = [];
    for (const v of l) {
      const m = v * this.stride;
      a[m + Q] === e && h.push(a[m + L] > 1 ? me(a, m, this.clusterProps) : this.points[a[m + j]]);
    }
    if (h.length === 0) throw new Error(s);
    return h;
  }
  getLeaves(e, t, n) {
    t = t || 10, n = n || 0;
    const s = [];
    return this._appendLeaves(s, e, t, n, 0), s;
  }
  getTile(e, t, n) {
    const s = this.trees[this._limitZoom(e)], i = Math.pow(2, e), { extent: a, radius: f } = this.options, r = f / a, u = (n - r) / i, l = (n + 1 + r) / i, h = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - r) / i, u, (t + 1 + r) / i, l),
      s.data,
      t,
      n,
      i,
      h
    ), t === 0 && this._addTileFeatures(
      s.range(1 - r / i, u, 1, l),
      s.data,
      i,
      n,
      i,
      h
    ), t === i - 1 && this._addTileFeatures(
      s.range(0, u, r / i, l),
      s.data,
      -1,
      n,
      i,
      h
    ), h.features.length ? h : null;
  }
  getClusterExpansionZoom(e) {
    let t = this._getOriginZoom(e) - 1;
    for (; t <= this.options.maxZoom; ) {
      const n = this.getChildren(e);
      if (t++, n.length !== 1) break;
      e = n[0].properties.cluster_id;
    }
    return t;
  }
  _appendLeaves(e, t, n, s, i) {
    const a = this.getChildren(t);
    for (const f of a) {
      const r = f.properties;
      if (r && r.cluster ? i + r.point_count <= s ? i += r.point_count : i = this._appendLeaves(e, r.cluster_id, n, s, i) : i < s ? i++ : e.push(f), e.length === n) break;
    }
    return i;
  }
  _createTree(e) {
    const t = new le(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let n = 0; n < e.length; n += this.stride) t.add(e[n], e[n + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, n, s, i, a) {
    for (const f of e) {
      const r = f * this.stride, u = t[r + L] > 1;
      let l, h, v;
      if (u)
        l = Ce(t, r, this.clusterProps), h = t[r], v = t[r + 1];
      else {
        const c = this.points[t[r + j]];
        l = c.properties;
        const [y, p] = c.geometry.coordinates;
        h = J(y), v = K(p);
      }
      const m = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (h * i - n)),
          Math.round(this.options.extent * (v * i - s))
        ]],
        tags: l
      };
      let d;
      u || this.options.generateId ? d = t[r + j] : d = this.points[t[r + j]].id, d !== void 0 && (m.id = d), a.features.push(m);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: n, extent: s, reduce: i, minPoints: a } = this.options, f = n / (s * Math.pow(2, t)), r = e.data, u = [], l = this.stride;
    for (let h = 0; h < r.length; h += l) {
      if (r[h + U] <= t) continue;
      r[h + U] = t;
      const v = r[h], m = r[h + 1], d = e.within(r[h], r[h + 1], f), c = r[h + L];
      let y = c;
      for (const p of d) {
        const k = p * l;
        r[k + U] > t && (y += r[k + L]);
      }
      if (y > c && y >= a) {
        let p = v * c, k = m * c, w, g = -1;
        const _ = ((h / l | 0) << 5) + (t + 1) + this.points.length;
        for (const G of d) {
          const C = G * l;
          if (r[C + U] <= t) continue;
          r[C + U] = t;
          const $ = r[C + L];
          p += r[C] * $, k += r[C + 1] * $, r[C + Q] = _, i && (w || (w = this._map(r, h, !0), g = this.clusterProps.length, this.clusterProps.push(w)), i(w, this._map(r, C)));
        }
        r[h + Q] = _, u.push(p / y, k / y, 1 / 0, _, -1, y), i && u.push(g);
      } else {
        for (let p = 0; p < l; p++) u.push(r[h + p]);
        if (y > 1)
          for (const p of d) {
            const k = p * l;
            if (!(r[k + U] <= t)) {
              r[k + U] = t;
              for (let w = 0; w < l; w++) u.push(r[k + w]);
            }
          }
      }
    }
    return u;
  }
  // get index of the point from which the cluster originated
  _getOriginId(e) {
    return e - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(e) {
    return (e - this.points.length) % 32;
  }
  _map(e, t, n) {
    if (e[t + L] > 1) {
      const a = this.clusterProps[e[t + Oe]];
      return n ? Object.assign({}, a) : a;
    }
    const s = this.points[e[t + j]].properties, i = this.options.map(s);
    return n && i === s ? Object.assign({}, i) : i;
  }
}
function me(o, e, t) {
  return {
    type: "Feature",
    id: o[e + j],
    properties: Ce(o, e, t),
    geometry: {
      type: "Point",
      coordinates: [We(o[e]), Ye(o[e + 1])]
    }
  };
}
function Ce(o, e, t) {
  const n = o[e + L], s = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, i = o[e + Oe], a = i === -1 ? {} : Object.assign({}, t[i]);
  return Object.assign(a, {
    cluster: !0,
    cluster_id: o[e + j],
    point_count: n,
    point_count_abbreviated: s
  });
}
function J(o) {
  return o / 360 + 0.5;
}
function K(o) {
  const e = Math.sin(o * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function We(o) {
  return (o - 0.5) * 360;
}
function Ye(o) {
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
function Qe(o, e) {
  var t = {};
  for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && e.indexOf(n) < 0 && (t[n] = o[n]);
  if (o != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(o); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(o, n[s]) && (t[n[s]] = o[n[s]]);
  return t;
}
class O {
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
class ee {
  constructor({ markers: e, position: t }) {
    this.markers = e, t && (t instanceof google.maps.LatLng ? this._position = t : this._position = new google.maps.LatLng(t));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const t of this.markers)
      e.extend(O.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => O.getVisible(e)).length;
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
    this.marker && (O.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
class Xe {
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
    return et(e);
  }
}
const et = (o) => o.map((t) => new ee({
  position: O.getPosition(t),
  markers: [t]
}));
class tt extends Xe {
  constructor(e) {
    var { maxZoom: t, radius: n = 60 } = e, s = Qe(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new He(Object.assign({ maxZoom: this.maxZoom, radius: n }, s));
  }
  calculate(e) {
    let t = !1;
    const n = { zoom: e.map.getZoom() };
    if (!E(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const s = this.markers.map((i) => {
        const a = O.getPosition(i);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [a.lng(), a.lat()]
          },
          properties: { marker: i }
        };
      });
      this.superCluster.load(s);
    }
    return t || (this.state.zoom <= this.maxZoom || n.zoom <= this.maxZoom) && (t = !E(this.state, n)), this.state = n, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: n }) {
    if (n.cluster)
      return new ee({
        markers: this.superCluster.getLeaves(n.cluster_id, 1 / 0).map((i) => i.properties.marker),
        position: { lat: t, lng: e }
      });
    const s = n.marker;
    return new ee({
      markers: [s],
      position: O.getPosition(s)
    });
  }
}
class nt {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const n = t.map((i) => i.count), s = n.reduce((i, a) => i + a, 0);
    this.clusters = {
      count: t.length,
      markers: {
        mean: s / t.length,
        sum: s,
        min: Math.min(...n),
        max: Math.max(...n)
      }
    };
  }
}
class rt {
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
  render({ count: e, position: t }, n, s) {
    const a = `<svg fill="${e > Math.max(10, n.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, f = `Cluster of ${e} markers`, r = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (O.isAdvancedMarkerAvailable(s)) {
      const h = new DOMParser().parseFromString(a, "image/svg+xml").documentElement;
      h.setAttribute("transform", "translate(0 25)");
      const v = {
        map: s,
        position: t,
        zIndex: r,
        title: f,
        content: h
      };
      return new google.maps.marker.AdvancedMarkerElement(v);
    }
    const u = {
      position: t,
      zIndex: r,
      title: f,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(a)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(u);
  }
}
function ot(o, e) {
  for (let t in e.prototype)
    o.prototype[t] = e.prototype[t];
}
class ue {
  constructor() {
    ot(ue, google.maps.OverlayView);
  }
}
var q;
(function(o) {
  o.CLUSTERING_BEGIN = "clusteringbegin", o.CLUSTERING_END = "clusteringend", o.CLUSTER_CLICK = "click";
})(q || (q = {}));
const st = (o, e, t) => {
  t.fitBounds(e.bounds);
};
class it extends ue {
  constructor({ map: e, markers: t = [], algorithmOptions: n = {}, algorithm: s = new tt(n), renderer: i = new rt(), onClusterClick: a = st }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = s, this.renderer = i, this.onClusterClick = a, e && this.setMap(e);
  }
  addMarker(e, t) {
    this.markers.includes(e) || (this.markers.push(e), t || this.render());
  }
  addMarkers(e, t) {
    e.forEach((n) => {
      this.addMarker(n, !0);
    }), t || this.render();
  }
  removeMarker(e, t) {
    const n = this.markers.indexOf(e);
    return n === -1 ? !1 : (O.setMap(e, null), this.markers.splice(n, 1), t || this.render(), !0);
  }
  removeMarkers(e, t) {
    let n = !1;
    return e.forEach((s) => {
      n = this.removeMarker(s, !0) || n;
    }), n && !t && this.render(), n;
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
      google.maps.event.trigger(this, q.CLUSTERING_BEGIN, this);
      const { clusters: t, changed: n } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (n || n == null) {
        const s = /* @__PURE__ */ new Set();
        for (const a of t)
          a.markers.length == 1 && s.add(a.markers[0]);
        const i = [];
        for (const a of this.clusters)
          a.marker != null && (a.markers.length == 1 ? s.has(a.marker) || O.setMap(a.marker, null) : i.push(a.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => i.forEach((a) => O.setMap(a, null)));
      }
      google.maps.event.trigger(this, q.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((e) => O.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new nt(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((n) => {
      n.markers.length === 1 ? n.marker = n.markers[0] : (n.marker = this.renderer.render(n, e, t), n.markers.forEach((s) => O.setMap(s, null)), this.onClusterClick && n.marker.addListener(
        "click",
        /* istanbul ignore next */
        (s) => {
          google.maps.event.trigger(this, q.CLUSTER_CLICK, n), this.onClusterClick(s, n, t);
        }
      )), O.setMap(n.marker, t);
    });
  }
}
const at = I({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object
    }
  },
  setup(o, { slots: e }) {
    const t = A(P, M(null)), n = M(null);
    return t.value && (n.value = x(
      new it({
        ...o.options,
        map: t.value
      })
    )), ne(_e, n), S(() => {
      n.value && (n.value.setMap(null), n.value.clearMarkers(), n.value = null);
    }), () => {
      var s;
      return (s = e.default) == null ? void 0 : s.call(e);
    };
  }
});
function ut(o) {
  o.component("VGoogleMap", Ze), o.component("VGoogleCircle", Fe), o.component("VGoogleMarker", ze), o.component("VGoogleHeatmap", De), o.component("VGooglePolygon", $e), o.component("VGooglePolyline", qe), o.component("VGoogleRectangle", Je), o.component("VGoogleInfoWindow", Ee), o.component("VGoogleMarkerClusterer", at);
}
export {
  T as useGoogleMapsLoader,
  ut as vGoogleMaps
};
