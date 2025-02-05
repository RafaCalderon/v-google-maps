import { ref as M, defineComponent as I, getCurrentInstance as D, onMounted as T, markRaw as S, nextTick as te, watch as b, provide as ne, onBeforeUnmount as P, openBlock as re, createElementBlock as oe, Fragment as Ae, createElementVNode as se, normalizeClass as xe, renderSlot as ie, createCommentVNode as ae, inject as A, mergeModels as Ie, useModel as Se, useSlots as ve, computed as z } from "vue";
function Pe(o, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function h(l) {
      try {
        u(n.next(l));
      } catch (c) {
        a(c);
      }
    }
    function r(l) {
      try {
        u(n.throw(l));
      } catch (c) {
        a(c);
      }
    }
    function u(l) {
      l.done ? i(l.value) : s(l.value).then(h, r);
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
  constructor({ apiKey: e, authReferrerPolicy: t, channel: n, client: s, id: i = ce, language: a, libraries: h = [], mapIds: r, nonce: u, region: l, retries: c = 3, url: g = "https://maps.googleapis.com/maps/api/js", version: p }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = n, this.client = s, this.id = i || ce, this.language = a, this.libraries = h, this.mapIds = r, this.nonce = u, this.region = l, this.retries = c, this.url = g, this.version = p, Z.instance) {
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
      let a, h, r, u = "The Google Maps JavaScript API", l = "google", c = "importLibrary", g = "__ib__", p = document, d = window;
      d = d[l] || (d[l] = {});
      const m = d.maps || (d.maps = {}), f = /* @__PURE__ */ new Set(), v = new URLSearchParams(), k = () => (
        // @ts-ignore
        a || (a = new Promise((w, y) => Pe(this, void 0, void 0, function* () {
          var _;
          yield h = p.createElement("script"), h.id = this.id, v.set("libraries", [...f] + "");
          for (r in i)
            v.set(r.replace(/[A-Z]/g, (x) => "_" + x[0].toLowerCase()), i[r]);
          v.set("callback", l + ".maps." + g), h.src = this.url + "?" + v, m[g] = w, h.onerror = () => a = y(Error(u + " could not load.")), h.nonce = this.nonce || ((_ = p.querySelector("script[nonce]")) === null || _ === void 0 ? void 0 : _.nonce) || "", p.head.append(h);
        })))
      );
      m[c] ? console.warn(u + " only loads once. Ignoring:", i) : m[c] = (w, ...y) => f.add(w) && k().then(() => m[c](w, ...y));
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
function G() {
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
const E = /* @__PURE__ */ Ge(Ne), L = Symbol("map"), Me = Symbol("marker"), _e = Symbol("marker-clusterer"), Ze = /* @__PURE__ */ I({
  __name: "VGoogleMap",
  props: {
    class: {},
    zoom: {},
    options: {},
    center: {}
  },
  emits: ["ready", "update:zoom", "click", "update:center"],
  setup(o, { expose: e, emit: t }) {
    const n = o, s = t, { maps: i } = G(), a = M(!1), h = D(), r = M(n.zoom), u = M(n.center), l = M(null), c = M(null);
    let g = null, p = null, d = null;
    T(async () => {
      var v, k;
      !i.value || !c.value || (l.value = S(
        new i.value.Map(c.value, {
          ...n.options,
          zoom: n.zoom ?? ((v = n.options) == null ? void 0 : v.zoom),
          center: n.center ?? ((k = n.options) == null ? void 0 : k.center)
        })
      ), a.value = !0, await te(), m(), s("ready"));
    });
    function m() {
      var k;
      if (f(), !l.value) return;
      const v = (k = h == null ? void 0 : h.vnode) == null ? void 0 : k.props;
      v != null && v.onClick && (g = l.value.addListener("click", (w) => {
        s("click", w);
      })), v != null && v["onUpdate:center"] && (p = l.value.addListener("dragend", () => {
        var y, _;
        const w = (_ = (y = l.value) == null ? void 0 : y.getCenter()) == null ? void 0 : _.toJSON();
        w && (u.value = { ...w }, s("update:center", u.value));
      })), v != null && v["onUpdate:zoom"] && (d = l.value.addListener("zoom_changed", () => {
        var w;
        r.value = ((w = l.value) == null ? void 0 : w.getZoom()) ?? 0, s("update:zoom", r.value);
      }));
    }
    function f() {
      g == null || g.remove(), p == null || p.remove(), d == null || d.remove();
    }
    return b(
      () => n.options,
      (v, k) => {
        !l.value || E(v, k) || l.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), b(
      () => n.center,
      (v) => {
        !l.value || !v || E(v, u.value) || l.value.setCenter({ ...v });
      }
    ), b(
      () => n.zoom,
      (v) => {
        !l.value || !v || E(v, r.value) || l.value.setZoom(v);
      }
    ), e({
      map: l
    }), ne(L, l), P(() => {
      f(), l.value = null;
    }), (v, k) => (re(), oe(Ae, null, [
      se("div", {
        ref_key: "mapRef",
        ref: c,
        class: xe(n.class)
      }, null, 2),
      a.value ? ie(v.$slots, "default", { key: 0 }) : ae("", !0)
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
    const { maps: s } = G(), i = A(L, M(null)), a = D(), h = M(o.center), r = M(o.radius), u = M(null);
    let l = null, c = null, g = null;
    T(() => {
      var m, f;
      i.value && s.value && (u.value = S(
        new s.value.Circle({
          ...o.options,
          map: i.value,
          center: o.center ?? ((m = o.options) == null ? void 0 : m.center),
          radius: o.radius ?? ((f = o.options) == null ? void 0 : f.radius)
        })
      ), p());
    });
    function p() {
      var f;
      if (d(), !u.value) return;
      const m = (f = a == null ? void 0 : a.vnode) == null ? void 0 : f.props;
      m != null && m.onClick && (l = u.value.addListener("click", (v) => {
        e("click", v);
      })), m != null && m["onUpdate:radius"] && (c = u.value.addListener("radius_changed", () => {
        var v;
        r.value = ((v = u.value) == null ? void 0 : v.getRadius()) ?? 0, e("update:radius", r.value);
      })), m != null && m["onUpdate:center"] && (g = u.value.addListener("center_changed", () => {
        var k, w;
        const v = (w = (k = u.value) == null ? void 0 : k.getCenter()) == null ? void 0 : w.toJSON();
        v && (h.value = { ...v }, e("update:center", h.value));
      }));
    }
    function d() {
      l == null || l.remove(), c == null || c.remove(), g == null || g.remove();
    }
    return b(
      () => o.options,
      (m, f) => {
        !u.value || E(m, f) || u.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.center,
      (m) => {
        !u.value || !m || E(m, h.value) || u.value.setCenter({ ...m });
      }
    ), b(
      () => o.radius,
      (m) => {
        !u.value || !m || E(m, r.value) || u.value.setRadius(m);
      }
    ), t({
      circle: u
    }), P(() => {
      d(), u.value && (u.value.setMap(null), u.value = null);
    }), () => {
      var m;
      return (m = n.default) == null ? void 0 : m.call(n);
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
    const { visualization: n } = G(), s = A(L, M(null)), i = M(null);
    return T(() => {
      s.value && n.value && (i.value = S(
        new n.value.HeatmapLayer({
          map: s.value,
          ...o.options
        })
      ));
    }), b(
      () => o.options,
      (a, h) => {
        !i.value || E(a, h) || i.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), e({
      heatmap: i
    }), P(() => {
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
  emits: ["click", "mouseover", "mouseout", "contextmenu", "update:model-value"],
  setup(o, { emit: e, expose: t, slots: n }) {
    const { maps: s } = G(), i = A(L, M(null)), a = D(), h = M(o.modelValue), r = M(null);
    let u = null, l = null, c = null, g = null, p = null;
    T(() => {
      var f;
      i.value && s.value && (r.value = S(
        new s.value.Polygon({
          ...o.options,
          map: i.value,
          paths: o.modelValue ? [...o.modelValue] : (f = o.options) == null ? void 0 : f.paths
        })
      ), d());
    });
    function d() {
      var v;
      if (m(), !r.value) return;
      const f = (v = a == null ? void 0 : a.vnode) == null ? void 0 : v.props;
      f != null && f.onClick && (u = r.value.addListener("click", (k) => {
        e("click", k);
      })), f != null && f.onContextmenu && (p = r.value.addListener(
        "contextmenu",
        (k) => {
          e("contextmenu", k);
        }
      )), f != null && f.onMouseout && (c = r.value.addListener(
        "mouseout",
        (k) => {
          e("mouseout", k);
        }
      )), f != null && f.onMouseover && (g = r.value.addListener(
        "mouseover",
        (k) => {
          e("mouseover", k);
        }
      )), f != null && f["onUpdate:modelValue"] && (l = r.value.addListener("mouseup", () => {
        var w, y, _;
        const k = (_ = (y = (w = r.value) == null ? void 0 : w.getPath()) == null ? void 0 : y.getArray()) == null ? void 0 : _.map((x) => x.toJSON());
        k && (h.value = [...k], e("update:model-value", h.value));
      }));
    }
    function m() {
      u == null || u.remove(), l == null || l.remove(), c == null || c.remove(), g == null || g.remove(), p == null || p.remove();
    }
    return b(
      () => o.options,
      (f, v) => {
        !r.value || E(f, v) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (f) => {
        !r.value || !f || E(f, h.value) || r.value.setPath(f);
      }
    ), t({
      polygon: r
    }), P(() => {
      m(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var f;
      return (f = n.default) == null ? void 0 : f.call(n);
    };
  }
}), Ve = {
  key: 0,
  style: { display: "none" }
}, Ee = /* @__PURE__ */ I({
  __name: "VGoogleInfoWindow",
  props: /* @__PURE__ */ Ie({
    options: { default: null }
  }, {
    modelValue: { type: Boolean, default: !1, required: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o, { expose: e }) {
    const t = o, n = Se(o, "modelValue"), s = ve(), { maps: i } = G(), a = A(L, M(null)), h = A(Me, M(null)), r = M(!1), u = M(), l = M(null);
    let c = null, g = null;
    T(async () => {
      var k;
      i.value && (l.value = S(
        new i.value.InfoWindow({
          ...t.options,
          content: p.value && !d.value ? u.value : (k = t.options) == null ? void 0 : k.content
        })
      ), await te(), m(), n.value && v());
    });
    const p = z(() => {
      var k, w;
      return ((w = (k = s.default) == null ? void 0 : k.call(s, {})) == null ? void 0 : w[0]) ?? null;
    }), d = z(() => {
      var k;
      return ((k = p.value) == null ? void 0 : k.type) === Comment;
    });
    function m() {
      !h.value || !l.value || (g = h.value.addListener("click", v), c = l.value.addListener("closeclick", v));
    }
    function f() {
      g == null || g.remove(), c == null || c.remove();
    }
    function v() {
      !l.value || !a.value || (r.value = !r.value, r.value ? l.value.open({
        map: a.value,
        anchor: h.value
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
      k === null || k === r.value || v();
    }), e({
      infoWindow: l
    }), P(() => {
      f(), l.value && (l.value.close(), l.value = null);
    }), (k, w) => p.value && !d.value ? (re(), oe("div", Ve, [
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
    const n = o, s = t, i = ve(), { markers: a } = G(), h = A(L, M(null)), r = A(_e, M(null)), u = D(), l = M(), c = M(n.modelValue);
    let g = null, p = null;
    const d = M(
      null
    );
    T(async () => {
      var y, _;
      a.value && (d.value = S(
        new a.value.AdvancedMarkerElement({
          ...n.options,
          position: n.modelValue ?? ((y = n.options) == null ? void 0 : y.position),
          map: r.value === null ? h.value : null,
          content: m.value && !f.value && !v.value ? l.value : (_ = n.options) == null ? void 0 : _.content
        })
      ), await te(), r.value && r.value.addMarker(d.value), k());
    });
    const m = z(() => {
      var y, _;
      return ((_ = (y = i.default) == null ? void 0 : y.call(i, {})) == null ? void 0 : _[0]) ?? null;
    }), f = z(() => {
      var y;
      return ((y = m.value) == null ? void 0 : y.type) === Comment;
    }), v = z(() => {
      var y;
      return ((y = m.value) == null ? void 0 : y.type) === Ee;
    });
    function k() {
      var _;
      if (w(), !d.value) return;
      const y = (_ = u == null ? void 0 : u.vnode) == null ? void 0 : _.props;
      y != null && y["onUpdate:modelValue"] && (p = d.value.addListener("dragend", (x) => {
        var $;
        const C = ($ = x.latLng) == null ? void 0 : $.toJSON();
        C && (c.value = { ...C }, s("update:model-value", c.value));
      })), y != null && y.onClick && (g = d.value.addListener("click", (x) => {
        s("click", x);
      }));
    }
    function w() {
      g == null || g.remove(), p == null || p.remove();
    }
    return b(
      () => n.options,
      (y, _) => {
        !d.value || E(y, _) || (y != null && y.title && (d.value.title = y.title), y != null && y.zIndex && (d.value.zIndex = y.zIndex), y != null && y.content && (d.value.content = y.content), y != null && y.position && (d.value.position = y.position), y != null && y.gmpDraggable && (d.value.gmpDraggable = y.gmpDraggable));
      },
      {
        deep: !0
      }
    ), b(
      () => n.modelValue,
      (y) => {
        !d.value || E(y, c.value) || (d.value.position = y);
      }
    ), e({
      marker: d
    }), ne(Me, d), P(() => {
      w(), d.value && (r.value && r.value.removeMarker(d.value), d.value.map = null, d.value = null);
    }), (y, _) => m.value && !f.value ? (re(), oe("div", Be, [
      se("div", {
        ref_key: "contentRef",
        ref: l
      }, [
        ie(y.$slots, "default")
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
    const { maps: s } = G(), i = A(L, M(null)), a = D(), h = M(o.modelValue), r = M(null);
    let u = null, l = null, c = null;
    T(() => {
      var d;
      i.value && s.value && (r.value = S(
        new s.value.Polyline({
          ...o.options,
          map: i.value,
          path: o.modelValue ? [...o.modelValue] : (d = o.options) == null ? void 0 : d.path
        })
      ), g());
    });
    function g() {
      var m;
      if (p(), !r.value) return;
      const d = (m = a == null ? void 0 : a.vnode) == null ? void 0 : m.props;
      d != null && d.onClick && (u = r.value.addListener("click", (f) => {
        e("click", f);
      })), d != null && d.onContextmenu && (c = r.value.addListener(
        "contextmenu",
        (f) => {
          e("contextmenu", f);
        }
      )), d != null && d["onUpdate:modelValue"] && (l = r.value.addListener("mouseup", () => {
        var v, k, w;
        const f = (w = (k = (v = r.value) == null ? void 0 : v.getPath()) == null ? void 0 : k.getArray()) == null ? void 0 : w.map((y) => y.toJSON());
        f && (h.value = [...f], e("update:model-value", h.value));
      }));
    }
    function p() {
      u == null || u.remove(), l == null || l.remove(), c == null || c.remove();
    }
    return b(
      () => o.options,
      (d, m) => {
        !r.value || E(d, m) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (d) => {
        !r.value || !d || E(d, h.value) || r.value.setPath(d);
      }
    ), t({
      polyline: r
    }), P(() => {
      p(), r.value && (r.value.setMap(null), r.value = null);
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
    const { maps: s } = G(), i = A(L, M(null)), a = D(), h = M(o.modelValue), r = M(null);
    let u = null, l = null;
    T(() => {
      var p;
      i.value && s.value && (r.value = S(
        new s.value.Rectangle({
          ...o.options,
          map: i.value,
          bounds: o.modelValue ?? ((p = o.options) == null ? void 0 : p.bounds)
        })
      ), c());
    });
    function c() {
      var d;
      if (g(), !r.value) return;
      const p = (d = a == null ? void 0 : a.vnode) == null ? void 0 : d.props;
      p != null && p.onClick && (u = r.value.addListener("click", (m) => {
        e("click", m);
      })), p != null && p["onUpdate:modelValue"] && (l = r.value.addListener("bounds_changed", () => {
        var f, v;
        const m = (v = (f = r.value) == null ? void 0 : f.getBounds()) == null ? void 0 : v.toJSON();
        m && (h.value = { ...m }, e("update:model-value", h.value));
      }));
    }
    function g() {
      u == null || u.remove(), l == null || l.remove();
    }
    return b(
      () => o.options,
      (p, d) => {
        !r.value || E(p, d) || r.value.setOptions(o.options);
      },
      {
        deep: !0
      }
    ), b(
      () => o.modelValue,
      (p) => {
        !r.value || !p || E(p, h.value) || r.value.setBounds(p);
      }
    ), t({
      rectangle: r
    }), P(() => {
      g(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var p;
      return (p = n.default) == null ? void 0 : p.call(n);
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
    const [a] = new Uint16Array(e, 2, 1), [h] = new Uint32Array(e, 4, 1);
    return new le(h, a, i, e);
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
    const i = de.indexOf(this.ArrayType), a = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, h = e * this.IndexArrayType.BYTES_PER_ELEMENT, r = (8 - h % 8) % 8;
    if (i < 0)
      throw new Error(`Unexpected typed array class: ${n}.`);
    s && s instanceof ArrayBuffer ? (this.data = s, this.ids = new this.IndexArrayType(this.data, V, e), this.coords = new this.ArrayType(this.data, V + h + r, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(V + a + h + r), this.ids = new this.IndexArrayType(this.data, V, e), this.coords = new this.ArrayType(this.data, V + h + r, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (W << 4) + i]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
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
    const { ids: i, coords: a, nodeSize: h } = this, r = [0, i.length - 1, 0], u = [];
    for (; r.length; ) {
      const l = r.pop() || 0, c = r.pop() || 0, g = r.pop() || 0;
      if (c - g <= h) {
        for (let f = g; f <= c; f++) {
          const v = a[2 * f], k = a[2 * f + 1];
          v >= e && v <= n && k >= t && k <= s && u.push(i[f]);
        }
        continue;
      }
      const p = g + c >> 1, d = a[2 * p], m = a[2 * p + 1];
      d >= e && d <= n && m >= t && m <= s && u.push(i[p]), (l === 0 ? e <= d : t <= m) && (r.push(g), r.push(p - 1), r.push(1 - l)), (l === 0 ? n >= d : s >= m) && (r.push(p + 1), r.push(c), r.push(1 - l));
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
    const { ids: s, coords: i, nodeSize: a } = this, h = [0, s.length - 1, 0], r = [], u = n * n;
    for (; h.length; ) {
      const l = h.pop() || 0, c = h.pop() || 0, g = h.pop() || 0;
      if (c - g <= a) {
        for (let f = g; f <= c; f++)
          fe(i[2 * f], i[2 * f + 1], e, t) <= u && r.push(s[f]);
        continue;
      }
      const p = g + c >> 1, d = i[2 * p], m = i[2 * p + 1];
      fe(d, m, e, t) <= u && r.push(s[p]), (l === 0 ? e - n <= d : t - n <= m) && (h.push(g), h.push(p - 1), h.push(1 - l)), (l === 0 ? e + n >= d : t + n >= m) && (h.push(p + 1), h.push(c), h.push(1 - l));
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
      const u = s - n + 1, l = t - n + 1, c = Math.log(u), g = 0.5 * Math.exp(2 * c / 3), p = 0.5 * Math.sqrt(c * g * (u - g) / u) * (l - u / 2 < 0 ? -1 : 1), d = Math.max(n, Math.floor(t - l * g / u + p)), m = Math.min(s, Math.floor(t + (u - l) * g / u + p));
      be(o, e, t, d, m, i);
    }
    const a = e[2 * t + i];
    let h = n, r = s;
    for (B(o, e, n, t), e[2 * s + i] > a && B(o, e, n, s); h < r; ) {
      for (B(o, e, h, r), h++, r--; e[2 * h + i] < a; ) h++;
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
}, pe = Math.fround || /* @__PURE__ */ ((o) => (e) => (o[0] = +e, o[0]))(new Float32Array(1)), U = 2, R = 3, Q = 4, j = 5, Oe = 6;
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
      const [l, c] = u.geometry.coordinates, g = pe(J(l)), p = pe(K(c));
      a.push(
        g,
        p,
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
    let h = this.trees[s + 1] = this._createTree(a);
    t && console.timeEnd(i);
    for (let r = s; r >= n; r--) {
      const u = +Date.now();
      h = this.trees[r] = this._createTree(this._cluster(h, r)), t && console.log("z%d: %d clusters in %dms", r, h.numItems, +Date.now() - u);
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
      const c = this.getClusters([n, s, 180, a], t), g = this.getClusters([-180, s, i, a], t);
      return c.concat(g);
    }
    const h = this.trees[this._limitZoom(t)], r = h.range(J(n), K(a), J(i), K(s)), u = h.data, l = [];
    for (const c of r) {
      const g = this.stride * c;
      l.push(u[g + j] > 1 ? me(u, g, this.clusterProps) : this.points[u[g + R]]);
    }
    return l;
  }
  getChildren(e) {
    const t = this._getOriginId(e), n = this._getOriginZoom(e), s = "No cluster with the specified id.", i = this.trees[n];
    if (!i) throw new Error(s);
    const a = i.data;
    if (t * this.stride >= a.length) throw new Error(s);
    const h = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), r = a[t * this.stride], u = a[t * this.stride + 1], l = i.within(r, u, h), c = [];
    for (const g of l) {
      const p = g * this.stride;
      a[p + Q] === e && c.push(a[p + j] > 1 ? me(a, p, this.clusterProps) : this.points[a[p + R]]);
    }
    if (c.length === 0) throw new Error(s);
    return c;
  }
  getLeaves(e, t, n) {
    t = t || 10, n = n || 0;
    const s = [];
    return this._appendLeaves(s, e, t, n, 0), s;
  }
  getTile(e, t, n) {
    const s = this.trees[this._limitZoom(e)], i = Math.pow(2, e), { extent: a, radius: h } = this.options, r = h / a, u = (n - r) / i, l = (n + 1 + r) / i, c = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - r) / i, u, (t + 1 + r) / i, l),
      s.data,
      t,
      n,
      i,
      c
    ), t === 0 && this._addTileFeatures(
      s.range(1 - r / i, u, 1, l),
      s.data,
      i,
      n,
      i,
      c
    ), t === i - 1 && this._addTileFeatures(
      s.range(0, u, r / i, l),
      s.data,
      -1,
      n,
      i,
      c
    ), c.features.length ? c : null;
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
    for (const h of a) {
      const r = h.properties;
      if (r && r.cluster ? i + r.point_count <= s ? i += r.point_count : i = this._appendLeaves(e, r.cluster_id, n, s, i) : i < s ? i++ : e.push(h), e.length === n) break;
    }
    return i;
  }
  _createTree(e) {
    const t = new le(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let n = 0; n < e.length; n += this.stride) t.add(e[n], e[n + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, n, s, i, a) {
    for (const h of e) {
      const r = h * this.stride, u = t[r + j] > 1;
      let l, c, g;
      if (u)
        l = Ce(t, r, this.clusterProps), c = t[r], g = t[r + 1];
      else {
        const m = this.points[t[r + R]];
        l = m.properties;
        const [f, v] = m.geometry.coordinates;
        c = J(f), g = K(v);
      }
      const p = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (c * i - n)),
          Math.round(this.options.extent * (g * i - s))
        ]],
        tags: l
      };
      let d;
      u || this.options.generateId ? d = t[r + R] : d = this.points[t[r + R]].id, d !== void 0 && (p.id = d), a.features.push(p);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: n, extent: s, reduce: i, minPoints: a } = this.options, h = n / (s * Math.pow(2, t)), r = e.data, u = [], l = this.stride;
    for (let c = 0; c < r.length; c += l) {
      if (r[c + U] <= t) continue;
      r[c + U] = t;
      const g = r[c], p = r[c + 1], d = e.within(r[c], r[c + 1], h), m = r[c + j];
      let f = m;
      for (const v of d) {
        const k = v * l;
        r[k + U] > t && (f += r[k + j]);
      }
      if (f > m && f >= a) {
        let v = g * m, k = p * m, w, y = -1;
        const _ = ((c / l | 0) << 5) + (t + 1) + this.points.length;
        for (const x of d) {
          const C = x * l;
          if (r[C + U] <= t) continue;
          r[C + U] = t;
          const $ = r[C + j];
          v += r[C] * $, k += r[C + 1] * $, r[C + Q] = _, i && (w || (w = this._map(r, c, !0), y = this.clusterProps.length, this.clusterProps.push(w)), i(w, this._map(r, C)));
        }
        r[c + Q] = _, u.push(v / f, k / f, 1 / 0, _, -1, f), i && u.push(y);
      } else {
        for (let v = 0; v < l; v++) u.push(r[c + v]);
        if (f > 1)
          for (const v of d) {
            const k = v * l;
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
    if (e[t + j] > 1) {
      const a = this.clusterProps[e[t + Oe]];
      return n ? Object.assign({}, a) : a;
    }
    const s = this.points[e[t + R]].properties, i = this.options.map(s);
    return n && i === s ? Object.assign({}, i) : i;
  }
}
function me(o, e, t) {
  return {
    type: "Feature",
    id: o[e + R],
    properties: Ce(o, e, t),
    geometry: {
      type: "Point",
      coordinates: [We(o[e]), Ye(o[e + 1])]
    }
  };
}
function Ce(o, e, t) {
  const n = o[e + j], s = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, i = o[e + Oe], a = i === -1 ? {} : Object.assign({}, t[i]);
  return Object.assign(a, {
    cluster: !0,
    cluster_id: o[e + R],
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
</svg>`, h = `Cluster of ${e} markers`, r = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (O.isAdvancedMarkerAvailable(s)) {
      const c = new DOMParser().parseFromString(a, "image/svg+xml").documentElement;
      c.setAttribute("transform", "translate(0 25)");
      const g = {
        map: s,
        position: t,
        zIndex: r,
        title: h,
        content: c
      };
      return new google.maps.marker.AdvancedMarkerElement(g);
    }
    const u = {
      position: t,
      zIndex: r,
      title: h,
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
    const t = A(L, M(null)), n = M(null);
    return t.value && (n.value = S(
      new it({
        ...o.options,
        map: t.value
      })
    )), ne(_e, n), P(() => {
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
  G as useGoogleMapsLoader,
  ut as vGoogleMaps
};
