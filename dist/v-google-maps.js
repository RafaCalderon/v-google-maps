import { ref as k, defineComponent as C, useCssVars as ye, provide as Q, computed as L, onMounted as N, markRaw as E, nextTick as ke, watch as M, onBeforeUnmount as S, openBlock as ae, createElementBlock as le, createElementVNode as ue, renderSlot as ce, createCommentVNode as he, inject as O, onUnmounted as we, useSlots as _e } from "vue";
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
function Me(i, e, t, n) {
  function s(o) {
    return o instanceof t ? o : new t(function(r) {
      r(o);
    });
  }
  return new (t || (t = Promise))(function(o, r) {
    function l(c) {
      try {
        p(n.next(c));
      } catch (h) {
        r(h);
      }
    }
    function a(c) {
      try {
        p(n.throw(c));
      } catch (h) {
        r(h);
      }
    }
    function p(c) {
      c.done ? o(c.value) : s(c.value).then(l, a);
    }
    p((n = n.apply(i, e || [])).next());
  });
}
var be = function i(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, s, o;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (s = n; s-- !== 0; )
        if (!i(e[s], t[s]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[s]))
        return !1;
    for (s = n; s-- !== 0; ) {
      var r = o[s];
      if (!i(e[r], t[r]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const ne = "__googleMapsScriptId";
var V;
(function(i) {
  i[i.INITIALIZED = 0] = "INITIALIZED", i[i.LOADING = 1] = "LOADING", i[i.SUCCESS = 2] = "SUCCESS", i[i.FAILURE = 3] = "FAILURE";
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
  constructor({ apiKey: e, authReferrerPolicy: t, channel: n, client: s, id: o = ne, language: r, libraries: l = [], mapIds: a, nonce: p, region: c, retries: h = 3, url: g = "https://maps.googleapis.com/maps/api/js", version: u }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = n, this.client = s, this.id = o || ne, this.language = r, this.libraries = l, this.mapIds = a, this.nonce = p, this.region = c, this.retries = h, this.url = g, this.version = u, G.instance) {
      if (!be(this.options, G.instance.options))
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
   * @deprecated
   */
  createUrl() {
    let e = this.url;
    return e += "?callback=__googleMapsCallback", this.apiKey && (e += `&key=${this.apiKey}`), this.channel && (e += `&channel=${this.channel}`), this.client && (e += `&client=${this.client}`), this.libraries.length > 0 && (e += `&libraries=${this.libraries.join(",")}`), this.language && (e += `&language=${this.language}`), this.region && (e += `&region=${this.region}`), this.version && (e += `&v=${this.version}`), this.mapIds && (e += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e += `&auth_referrer_policy=${this.authReferrerPolicy}`), e;
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
      (o) => !n[o] && delete n[o]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((o) => {
      let r, l, a, p = "The Google Maps JavaScript API", c = "google", h = "importLibrary", g = "__ib__", u = document, d = window;
      d = d[c] || (d[c] = {});
      const f = d.maps || (d.maps = {}), m = /* @__PURE__ */ new Set(), v = new URLSearchParams(), y = () => (
        // @ts-ignore
        r || (r = new Promise((w, U) => Me(this, void 0, void 0, function* () {
          var j;
          yield l = u.createElement("script"), l.id = this.id, v.set("libraries", [...m] + "");
          for (a in o)
            v.set(a.replace(/[A-Z]/g, (z) => "_" + z[0].toLowerCase()), o[a]);
          v.set("callback", c + ".maps." + g), l.src = this.url + "?" + v, f[g] = w, l.onerror = () => r = U(Error(p + " could not load.")), l.nonce = this.nonce || ((j = u.querySelector("script[nonce]")) === null || j === void 0 ? void 0 : j.nonce) || "", u.head.append(l);
        })))
      );
      f[h] ? console.warn(p + " only loads once. Ignoring:", o) : f[h] = (w, ...U) => m.add(w) && y().then(() => f[h](w, ...U));
    })(n);
    const s = this.libraries.map((o) => this.importLibrary(o));
    s.length || s.push(this.importLibrary("core")), Promise.all(s).then(() => this.callback(), (o) => {
      const r = new ErrorEvent("error", { error: o });
      this.loadErrorCallback(r);
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
    if (this.resetIfRetryingFailed(), this.done)
      this.callback();
    else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), this.callback();
        return;
      }
      this.loading || (this.loading = !0, this.setScript());
    }
  }
}
const K = k(null);
async function Le(i, e = []) {
  if (K.value)
    return;
  const t = new G({
    apiKey: i,
    libraries: e
  });
  K.value = await t.load();
}
function P() {
  return {
    gmapApi: K,
    load: Le
  };
}
function Oe(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Ce = function i(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, s, o;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (s = n; s-- !== 0; )
        if (!i(e[s], t[s]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[s]))
        return !1;
    for (s = n; s-- !== 0; ) {
      var r = o[s];
      if (!i(e[r], t[r]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const _ = /* @__PURE__ */ Oe(Ce), A = Symbol("map"), pe = Symbol("marker"), de = Symbol("marker-clusterer"), Ee = { class: "v-google-map__wrapper" }, Ae = /* @__PURE__ */ C({
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
      default: "initial",
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
  emits: ["ready", "click", "update:zoom", "update:center"],
  setup(i, { expose: e, emit: t }) {
    const n = i;
    ye((m) => ({
      "4fc8e44e": i.width,
      11873374: i.height,
      "5a101f2a": i.borderRadius
    }));
    const { gmapApi: s } = P(), o = k(!1), r = k(null), l = k(null);
    let a = null, p = null, c = null;
    Q(A, r);
    const h = L({
      get() {
        return n.center;
      },
      set(m) {
        t("update:center", m);
      }
    }), g = L({
      get() {
        return n.zoom;
      },
      set(m) {
        t("update:zoom", m);
      }
    });
    N(async () => {
      if (!l.value || !s.value)
        return;
      const m = {
        ...n.options
      };
      h.value && (m.center = {
        ...h.value
      }), g.value && (m.zoom = g.value), r.value = E(
        new s.value.maps.Map(l.value, {
          ...m
        })
      ), o.value = !0, await ke(), u(), t("ready");
    });
    function u() {
      r.value && (a = r.value.addListener("click", f), p = r.value.addListener("dragend", () => {
        var m, v;
        h.value = ((v = (m = r.value) == null ? void 0 : m.getCenter()) == null ? void 0 : v.toJSON()) ?? null;
      }), c = r.value.addListener("zoom_changed", () => {
        var m;
        g.value = ((m = r.value) == null ? void 0 : m.getZoom()) ?? 0;
      }));
    }
    function d() {
      a && a.remove(), p && p.remove(), c && c.remove();
    }
    function f(m) {
      t("click", m);
    }
    return M(
      () => n.options,
      (m, v) => {
        !r.value || _(m, v) || r.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), M(
      h,
      (m, v) => {
        _(m, v) || !r.value || !m || r.value.setCenter({
          ...m
        });
      }
    ), M(g, (m, v) => {
      _(m, v) || !r.value || !m || r.value.setZoom(m);
    }), e({
      map: r
    }), S(() => {
      d(), r.value = null;
    }), (m, v) => (ae(), le("div", Ee, [
      ue("div", {
        class: "v-google-map__container",
        ref_key: "mapRef",
        ref: l
      }, null, 512),
      o.value ? ce(m.$slots, "default", { key: 0 }, void 0, !0) : he("", !0)
    ]));
  }
});
const fe = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, s] of e)
    t[n] = s;
  return t;
}, Ie = /* @__PURE__ */ fe(Ae, [["__scopeId", "data-v-52ac4172"]]), xe = C({
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
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = P(), o = O(A, k(null));
    N(() => {
      if (o.value && s.value) {
        const f = {
          ...i.options
        };
        c.value && (f.center = {
          ...c.value
        }), h.value && (f.radius = h.value), r.value = E(
          new s.value.maps.Circle({
            map: o.value,
            ...f
          })
        ), g();
      }
    });
    const r = k(null);
    let l = null, a = null, p = null;
    const c = L({
      get() {
        return i.center;
      },
      set(f) {
        e("update:center", f);
      }
    }), h = L({
      get() {
        return i.radius;
      },
      set(f) {
        e("update:radius", f);
      }
    });
    function g() {
      r.value && (l = r.value.addListener("click", d), a = r.value.addListener("radius_changed", () => {
        var f;
        h.value = ((f = r.value) == null ? void 0 : f.getRadius()) ?? null;
      }), p = r.value.addListener("center_changed", () => {
        var m, v;
        const f = (v = (m = r.value) == null ? void 0 : m.getCenter()) == null ? void 0 : v.toJSON();
        f && (c.value = {
          ...f
        });
      }));
    }
    function u() {
      l && l.remove(), a && a.remove(), p && p.remove();
    }
    function d(f) {
      e("click", f);
    }
    return M(
      () => i.options,
      (f, m) => {
        !r.value || _(f, m) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      c,
      (f, m) => {
        _(f, m) || !r.value || !f || r.value.setCenter({
          ...f
        });
      }
    ), M(h, (f, m) => {
      _(f, m) || !r.value || !f || r.value.setRadius(f);
    }), t({
      circle: r
    }), S(() => {
      u(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var f;
      return (f = n.default) == null ? void 0 : f.call(n);
    };
  }
}), Se = C({
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
  emits: ["click", "update:model-value"],
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = P(), o = O(A, k(null)), r = O(de, k(null)), l = k(null);
    let a = null, p = null;
    if (o.value && s.value) {
      const d = {
        ...i.options
      };
      i.modelValue && (d.position = {
        ...i.modelValue
      }), l.value = E(
        new s.value.maps.Marker({
          map: r.value === null ? o.value : null,
          ...d
        })
      ), r.value && r.value.addMarker(l.value), h();
    }
    const c = L({
      get() {
        return i.modelValue;
      },
      set(d) {
        e("update:model-value", d);
      }
    });
    function h() {
      l.value && (a = l.value.addListener("click", u), p = l.value.addListener("mouseup", () => {
        var d, f;
        c.value = ((f = (d = l.value) == null ? void 0 : d.getPosition()) == null ? void 0 : f.toJSON()) ?? null;
      }));
    }
    function g() {
      a && a.remove(), p && p.remove();
    }
    function u(d) {
      e("click", d);
    }
    return M(
      () => i.options,
      (d, f) => {
        !l.value || _(d, f) || l.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      c,
      (d, f) => {
        _(d, f) || !l.value || l.value.setPosition(d);
      }
    ), t({
      marker: l
    }), Q(pe, l), S(() => {
      g(), l.value && (r.value && r.value.removeMarker(l.value), l.value.setMap(null), l.value = null);
    }), () => {
      var d;
      return (d = n.default) == null ? void 0 : d.call(n);
    };
  }
}), Pe = C({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(i, { expose: e, slots: t }) {
    const { gmapApi: n } = P(), s = O(A, k(null));
    N(() => {
      if (s.value && n.value) {
        const r = {
          ...i.options
        };
        o.value = E(
          new n.value.maps.visualization.HeatmapLayer({
            map: s.value,
            ...r
          })
        );
      }
    });
    const o = k(null);
    return M(
      () => i.options,
      (r, l) => {
        !o.value || _(r, l) || o.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), we(() => {
      o.value && (o.value.setMap(null), o.value = null);
    }), e({
      heatmap: o
    }), () => {
      var r;
      return (r = t.default) == null ? void 0 : r.call(t);
    };
  }
}), je = C({
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
  emits: ["click", "update:model-value"],
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = P(), o = O(A, k(null));
    N(() => {
      if (o.value && s.value) {
        const u = {
          ...i.options
        };
        p.value && (u.paths = [...p.value]), r.value = E(
          new s.value.maps.Polygon({
            map: o.value,
            ...u
          })
        ), c();
      }
    });
    const r = k(null);
    let l = null, a = null;
    const p = L({
      get() {
        return i.modelValue;
      },
      set(u) {
        e("update:model-value", u);
      }
    });
    function c() {
      r.value && (l = r.value.addListener("click", g), a = r.value.addListener("mouseup", () => {
        var d, f, m;
        const u = (m = (f = (d = r.value) == null ? void 0 : d.getPath()) == null ? void 0 : f.getArray()) == null ? void 0 : m.map((v) => v.toJSON());
        u && (p.value = [...u]);
      }));
    }
    function h() {
      l && l.remove(), a && a.remove();
    }
    function g(u) {
      e("click", u);
    }
    return M(
      () => i.options,
      (u, d) => {
        !r.value || _(u, d) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      p,
      (u, d) => {
        _(u, d) || !r.value || !u || r.value.setPath(u);
      }
    ), t({
      polygon: r
    }), S(() => {
      h(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var u;
      return (u = n.default) == null ? void 0 : u.call(n);
    };
  }
}), Re = C({
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
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = P(), o = O(A, k(null));
    N(() => {
      if (o.value && s.value) {
        const u = {
          ...i.options
        };
        p.value && (u.path = [...p.value]), r.value = E(
          new s.value.maps.Polyline({
            ...u,
            map: o.value
          })
        ), c();
      }
    });
    const r = k(null);
    let l = null, a = null;
    const p = L({
      get() {
        return i.modelValue;
      },
      set(u) {
        e("update:model-value", u);
      }
    });
    function c() {
      r.value && (l = r.value.addListener("click", g), a = r.value.addListener("mouseup", () => {
        var d, f, m;
        const u = (m = (f = (d = r.value) == null ? void 0 : d.getPath()) == null ? void 0 : f.getArray()) == null ? void 0 : m.map((v) => v.toJSON());
        u && (p.value = [...u]);
      }));
    }
    function h() {
      l && l.remove(), a && a.remove();
    }
    function g(u) {
      e("click", u);
    }
    return M(
      () => i.options,
      (u, d) => {
        !r.value || _(u, d) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      p,
      (u, d) => {
        _(u, d) || !r.value || !u || r.value.setPath(u);
      }
    ), t({
      polyline: r
    }), S(() => {
      h(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var u;
      return (u = n.default) == null ? void 0 : u.call(n);
    };
  }
}), Te = C({
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
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = P(), o = O(A, k(null));
    N(() => {
      if (o.value && s.value) {
        const u = {
          ...i.options
        };
        p.value && (u.bounds = {
          ...p.value
        }), r.value = E(
          new s.value.maps.Rectangle({
            map: o.value,
            ...u
          })
        ), c();
      }
    });
    const r = k(null);
    let l = null, a = null;
    const p = L({
      get() {
        return i.modelValue;
      },
      set(u) {
        e("update:model-value", u);
      }
    });
    function c() {
      r.value && (l = r.value.addListener("click", g), a = r.value.addListener("bounds_changed", () => {
        var d, f;
        const u = (f = (d = r.value) == null ? void 0 : d.getBounds()) == null ? void 0 : f.toJSON();
        u && (p.value = {
          ...u
        });
      }));
    }
    function h() {
      l && l.remove(), a && a.remove();
    }
    function g(u) {
      e("click", u);
    }
    return M(
      () => i.options,
      (u, d) => {
        !r.value || _(u, d) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      p,
      (u, d) => {
        _(u, d) || !r.value || !u || r.value.setBounds(u);
      }
    ), t({
      rectangle: r
    }), S(() => {
      h(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var u;
      return (u = n.default) == null ? void 0 : u.call(n);
    };
  }
}), Ge = {
  key: 0,
  class: "v-google-info-window__container"
}, Ne = /* @__PURE__ */ C({
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
  emits: ["click", "update:model-value"],
  setup(i, { expose: e, emit: t }) {
    const n = i, s = _e(), { gmapApi: o } = P(), r = O(A, k(null)), l = O(pe, k(null));
    N(() => {
      var y;
      o.value && (c.value = E(
        new o.value.maps.InfoWindow({
          ...n.options,
          content: u.value ? p.value : (y = n.options) == null ? void 0 : y.content
        })
      ), f(), d.value && v());
    });
    const a = k(!1), p = k(), c = k(null);
    let h = null, g = null;
    const u = L(() => {
      var y;
      return (y = s.default) == null ? void 0 : y.call(s).some((w) => w.type !== Comment);
    }), d = L({
      get() {
        return n.modelValue;
      },
      set(y) {
        t("update:model-value", y);
      }
    });
    function f() {
      !l.value || !c.value || (g = l.value.addListener("click", v), h = c.value.addListener("closeclick", v));
    }
    function m() {
      g && g.remove(), h && h.remove();
    }
    function v() {
      !c.value || !r.value || (a.value = !a.value, a.value ? c.value.open({
        map: r.value,
        anchor: l.value
      }) : c.value.close(), d.value = a.value);
    }
    return M(
      () => n.options,
      (y, w) => {
        !c.value || _(y, w) || c.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), M(d, (y) => {
      y === null || y === a.value || v();
    }), e({
      infoWindow: c
    }), S(() => {
      m(), c.value && (c.value.close(), c.value = null);
    }), (y, w) => u.value ? (ae(), le("div", Ge, [
      ue("div", {
        ref_key: "infoWindowRef",
        ref: p
      }, [
        ce(y.$slots, "default", {}, void 0, !0)
      ], 512)
    ])) : he("", !0);
  }
});
const Ue = /* @__PURE__ */ fe(Ne, [["__scopeId", "data-v-e43ab925"]]), re = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], q = 1, Z = 8;
class X {
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
    if (s !== q)
      throw new Error(`Got v${s} data when expected v${q}.`);
    const o = re[n & 15];
    if (!o)
      throw new Error("Unrecognized array type.");
    const [r] = new Uint16Array(e, 2, 1), [l] = new Uint32Array(e, 4, 1);
    return new X(l, r, o, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, t = 64, n = Float64Array, s) {
    if (isNaN(e) || e < 0)
      throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+t, 2), 65535), this.ArrayType = n, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const o = re.indexOf(this.ArrayType), r = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, l = e * this.IndexArrayType.BYTES_PER_ELEMENT, a = (8 - l % 8) % 8;
    if (o < 0)
      throw new Error(`Unexpected typed array class: ${n}.`);
    s && s instanceof ArrayBuffer ? (this.data = s, this.ids = new this.IndexArrayType(this.data, Z, e), this.coords = new this.ArrayType(this.data, Z + l + a, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(Z + r + l + a), this.ids = new this.IndexArrayType(this.data, Z, e), this.coords = new this.ArrayType(this.data, Z + l + a, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (q << 4) + o]), new Uint16Array(this.data, 2, 1)[0] = t, new Uint32Array(this.data, 4, 1)[0] = e);
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
    return W(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
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
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: o, coords: r, nodeSize: l } = this, a = [0, o.length - 1, 0], p = [];
    for (; a.length; ) {
      const c = a.pop() || 0, h = a.pop() || 0, g = a.pop() || 0;
      if (h - g <= l) {
        for (let m = g; m <= h; m++) {
          const v = r[2 * m], y = r[2 * m + 1];
          v >= e && v <= n && y >= t && y <= s && p.push(o[m]);
        }
        continue;
      }
      const u = g + h >> 1, d = r[2 * u], f = r[2 * u + 1];
      d >= e && d <= n && f >= t && f <= s && p.push(o[u]), (c === 0 ? e <= d : t <= f) && (a.push(g), a.push(u - 1), a.push(1 - c)), (c === 0 ? n >= d : s >= f) && (a.push(u + 1), a.push(h), a.push(1 - c));
    }
    return p;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, t, n) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: s, coords: o, nodeSize: r } = this, l = [0, s.length - 1, 0], a = [], p = n * n;
    for (; l.length; ) {
      const c = l.pop() || 0, h = l.pop() || 0, g = l.pop() || 0;
      if (h - g <= r) {
        for (let m = g; m <= h; m++)
          se(o[2 * m], o[2 * m + 1], e, t) <= p && a.push(s[m]);
        continue;
      }
      const u = g + h >> 1, d = o[2 * u], f = o[2 * u + 1];
      se(d, f, e, t) <= p && a.push(s[u]), (c === 0 ? e - n <= d : t - n <= f) && (l.push(g), l.push(u - 1), l.push(1 - c)), (c === 0 ? e + n >= d : t + n >= f) && (l.push(u + 1), l.push(h), l.push(1 - c));
    }
    return a;
  }
}
function W(i, e, t, n, s, o) {
  if (s - n <= t)
    return;
  const r = n + s >> 1;
  me(i, e, r, n, s, o), W(i, e, t, n, r - 1, 1 - o), W(i, e, t, r + 1, s, 1 - o);
}
function me(i, e, t, n, s, o) {
  for (; s > n; ) {
    if (s - n > 600) {
      const p = s - n + 1, c = t - n + 1, h = Math.log(p), g = 0.5 * Math.exp(2 * h / 3), u = 0.5 * Math.sqrt(h * g * (p - g) / p) * (c - p / 2 < 0 ? -1 : 1), d = Math.max(n, Math.floor(t - c * g / p + u)), f = Math.min(s, Math.floor(t + (p - c) * g / p + u));
      me(i, e, t, d, f, o);
    }
    const r = e[2 * t + o];
    let l = n, a = s;
    for (F(i, e, n, t), e[2 * s + o] > r && F(i, e, n, s); l < a; ) {
      for (F(i, e, l, a), l++, a--; e[2 * l + o] < r; )
        l++;
      for (; e[2 * a + o] > r; )
        a--;
    }
    e[2 * n + o] === r ? F(i, e, n, a) : (a++, F(i, e, a, s)), a <= t && (n = a + 1), t <= a && (s = a - 1);
  }
}
function F(i, e, t, n) {
  J(i, t, n), J(e, 2 * t, 2 * n), J(e, 2 * t + 1, 2 * n + 1);
}
function J(i, e, t) {
  const n = i[e];
  i[e] = i[t], i[t] = n;
}
function se(i, e, t, n) {
  const s = i - t, o = e - n;
  return s * s + o * o;
}
const Ve = {
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
}, oe = Math.fround || ((i) => (e) => (i[0] = +e, i[0]))(new Float32Array(1)), T = 2, x = 3, H = 4, I = 5, ge = 6;
class Ze {
  constructor(e) {
    this.options = Object.assign(Object.create(Ve), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: t, minZoom: n, maxZoom: s } = this.options;
    t && console.time("total time");
    const o = `prepare ${e.length} points`;
    t && console.time(o), this.points = e;
    const r = [];
    for (let a = 0; a < e.length; a++) {
      const p = e[a];
      if (!p.geometry)
        continue;
      const [c, h] = p.geometry.coordinates, g = oe(D(c)), u = oe(B(h));
      r.push(
        g,
        u,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        a,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && r.push(0);
    }
    let l = this.trees[s + 1] = this._createTree(r);
    t && console.timeEnd(o);
    for (let a = s; a >= n; a--) {
      const p = +Date.now();
      l = this.trees[a] = this._createTree(this._cluster(l, a)), t && console.log("z%d: %d clusters in %dms", a, l.numItems, +Date.now() - p);
    }
    return t && console.timeEnd("total time"), this;
  }
  getClusters(e, t) {
    let n = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const s = Math.max(-90, Math.min(90, e[1]));
    let o = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const r = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      n = -180, o = 180;
    else if (n > o) {
      const h = this.getClusters([n, s, 180, r], t), g = this.getClusters([-180, s, o, r], t);
      return h.concat(g);
    }
    const l = this.trees[this._limitZoom(t)], a = l.range(D(n), B(r), D(o), B(s)), p = l.data, c = [];
    for (const h of a) {
      const g = this.stride * h;
      c.push(p[g + I] > 1 ? ie(p, g, this.clusterProps) : this.points[p[g + x]]);
    }
    return c;
  }
  getChildren(e) {
    const t = this._getOriginId(e), n = this._getOriginZoom(e), s = "No cluster with the specified id.", o = this.trees[n];
    if (!o)
      throw new Error(s);
    const r = o.data;
    if (t * this.stride >= r.length)
      throw new Error(s);
    const l = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), a = r[t * this.stride], p = r[t * this.stride + 1], c = o.within(a, p, l), h = [];
    for (const g of c) {
      const u = g * this.stride;
      r[u + H] === e && h.push(r[u + I] > 1 ? ie(r, u, this.clusterProps) : this.points[r[u + x]]);
    }
    if (h.length === 0)
      throw new Error(s);
    return h;
  }
  getLeaves(e, t, n) {
    t = t || 10, n = n || 0;
    const s = [];
    return this._appendLeaves(s, e, t, n, 0), s;
  }
  getTile(e, t, n) {
    const s = this.trees[this._limitZoom(e)], o = Math.pow(2, e), { extent: r, radius: l } = this.options, a = l / r, p = (n - a) / o, c = (n + 1 + a) / o, h = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - a) / o, p, (t + 1 + a) / o, c),
      s.data,
      t,
      n,
      o,
      h
    ), t === 0 && this._addTileFeatures(
      s.range(1 - a / o, p, 1, c),
      s.data,
      o,
      n,
      o,
      h
    ), t === o - 1 && this._addTileFeatures(
      s.range(0, p, a / o, c),
      s.data,
      -1,
      n,
      o,
      h
    ), h.features.length ? h : null;
  }
  getClusterExpansionZoom(e) {
    let t = this._getOriginZoom(e) - 1;
    for (; t <= this.options.maxZoom; ) {
      const n = this.getChildren(e);
      if (t++, n.length !== 1)
        break;
      e = n[0].properties.cluster_id;
    }
    return t;
  }
  _appendLeaves(e, t, n, s, o) {
    const r = this.getChildren(t);
    for (const l of r) {
      const a = l.properties;
      if (a && a.cluster ? o + a.point_count <= s ? o += a.point_count : o = this._appendLeaves(e, a.cluster_id, n, s, o) : o < s ? o++ : e.push(l), e.length === n)
        break;
    }
    return o;
  }
  _createTree(e) {
    const t = new X(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let n = 0; n < e.length; n += this.stride)
      t.add(e[n], e[n + 1]);
    return t.finish(), t.data = e, t;
  }
  _addTileFeatures(e, t, n, s, o, r) {
    for (const l of e) {
      const a = l * this.stride, p = t[a + I] > 1;
      let c, h, g;
      if (p)
        c = ve(t, a, this.clusterProps), h = t[a], g = t[a + 1];
      else {
        const f = this.points[t[a + x]];
        c = f.properties;
        const [m, v] = f.geometry.coordinates;
        h = D(m), g = B(v);
      }
      const u = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (h * o - n)),
          Math.round(this.options.extent * (g * o - s))
        ]],
        tags: c
      };
      let d;
      p || this.options.generateId ? d = t[a + x] : d = this.points[t[a + x]].id, d !== void 0 && (u.id = d), r.features.push(u);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: n, extent: s, reduce: o, minPoints: r } = this.options, l = n / (s * Math.pow(2, t)), a = e.data, p = [], c = this.stride;
    for (let h = 0; h < a.length; h += c) {
      if (a[h + T] <= t)
        continue;
      a[h + T] = t;
      const g = a[h], u = a[h + 1], d = e.within(a[h], a[h + 1], l), f = a[h + I];
      let m = f;
      for (const v of d) {
        const y = v * c;
        a[y + T] > t && (m += a[y + I]);
      }
      if (m > f && m >= r) {
        let v = g * f, y = u * f, w, U = -1;
        const j = ((h / c | 0) << 5) + (t + 1) + this.points.length;
        for (const z of d) {
          const R = z * c;
          if (a[R + T] <= t)
            continue;
          a[R + T] = t;
          const te = a[R + I];
          v += a[R] * te, y += a[R + 1] * te, a[R + H] = j, o && (w || (w = this._map(a, h, !0), U = this.clusterProps.length, this.clusterProps.push(w)), o(w, this._map(a, R)));
        }
        a[h + H] = j, p.push(v / m, y / m, 1 / 0, j, -1, m), o && p.push(U);
      } else {
        for (let v = 0; v < c; v++)
          p.push(a[h + v]);
        if (m > 1)
          for (const v of d) {
            const y = v * c;
            if (!(a[y + T] <= t)) {
              a[y + T] = t;
              for (let w = 0; w < c; w++)
                p.push(a[y + w]);
            }
          }
      }
    }
    return p;
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
    if (e[t + I] > 1) {
      const r = this.clusterProps[e[t + ge]];
      return n ? Object.assign({}, r) : r;
    }
    const s = this.points[e[t + x]].properties, o = this.options.map(s);
    return n && o === s ? Object.assign({}, o) : o;
  }
}
function ie(i, e, t) {
  return {
    type: "Feature",
    id: i[e + x],
    properties: ve(i, e, t),
    geometry: {
      type: "Point",
      coordinates: [Fe(i[e]), $e(i[e + 1])]
    }
  };
}
function ve(i, e, t) {
  const n = i[e + I], s = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, o = i[e + ge], r = o === -1 ? {} : Object.assign({}, t[o]);
  return Object.assign(r, {
    cluster: !0,
    cluster_id: i[e + x],
    point_count: n,
    point_count_abbreviated: s
  });
}
function D(i) {
  return i / 360 + 0.5;
}
function B(i) {
  const e = Math.sin(i * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function Fe(i) {
  return (i - 0.5) * 360;
}
function $e(i) {
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
  for (var n in i)
    Object.prototype.hasOwnProperty.call(i, n) && e.indexOf(n) < 0 && (t[n] = i[n]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(i); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, n[s]) && (t[n[s]] = i[n[s]]);
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
class Y {
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
class Be {
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
    return ze(e);
  }
}
const ze = (i) => i.map((t) => new Y({
  position: b.getPosition(t),
  markers: [t]
}));
class qe extends Be {
  constructor(e) {
    var { maxZoom: t, radius: n = 60 } = e, s = De(e, ["maxZoom", "radius"]);
    super({ maxZoom: t }), this.state = { zoom: -1 }, this.superCluster = new Ze(Object.assign({ maxZoom: this.maxZoom, radius: n }, s));
  }
  calculate(e) {
    let t = !1;
    const n = { zoom: e.map.getZoom() };
    if (!_(e.markers, this.markers)) {
      t = !0, this.markers = [...e.markers];
      const s = this.markers.map((o) => {
        const r = b.getPosition(o);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [r.lng(), r.lat()]
          },
          properties: { marker: o }
        };
      });
      this.superCluster.load(s);
    }
    return t || (this.state.zoom <= this.maxZoom || n.zoom <= this.maxZoom) && (t = !_(this.state, n)), this.state = n, t && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: t };
  }
  cluster({ map: e }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(e.getZoom())).map((t) => this.transformCluster(t));
  }
  transformCluster({ geometry: { coordinates: [e, t] }, properties: n }) {
    if (n.cluster)
      return new Y({
        markers: this.superCluster.getLeaves(n.cluster_id, 1 / 0).map((o) => o.properties.marker),
        position: { lat: t, lng: e }
      });
    const s = n.marker;
    return new Y({
      markers: [s],
      position: b.getPosition(s)
    });
  }
}
class Je {
  constructor(e, t) {
    this.markers = { sum: e.length };
    const n = t.map((o) => o.count), s = n.reduce((o, r) => o + r, 0);
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
class He {
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
    const r = `<svg fill="${e > Math.max(10, n.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, l = `Cluster of ${e} markers`, a = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (b.isAdvancedMarkerAvailable(s)) {
      const c = document.createElement("div");
      c.innerHTML = r;
      const h = c.firstElementChild;
      h.setAttribute("transform", "translate(0 25)");
      const g = {
        map: s,
        position: t,
        zIndex: a,
        title: l,
        content: h
      };
      return new google.maps.marker.AdvancedMarkerElement(g);
    }
    const p = {
      position: t,
      zIndex: a,
      title: l,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(r)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(p);
  }
}
function Ke(i, e) {
  for (let t in e.prototype)
    i.prototype[t] = e.prototype[t];
}
class ee {
  constructor() {
    Ke(ee, google.maps.OverlayView);
  }
}
var $;
(function(i) {
  i.CLUSTERING_BEGIN = "clusteringbegin", i.CLUSTERING_END = "clusteringend", i.CLUSTER_CLICK = "click";
})($ || ($ = {}));
const We = (i, e, t) => {
  t.fitBounds(e.bounds);
};
class Ye extends ee {
  constructor({ map: e, markers: t = [], algorithmOptions: n = {}, algorithm: s = new qe(n), renderer: o = new He(), onClusterClick: r = We }) {
    super(), this.markers = [...t], this.clusters = [], this.algorithm = s, this.renderer = o, this.onClusterClick = r, e && this.setMap(e);
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
    return n === -1 ? !1 : (b.setMap(e, null), this.markers.splice(n, 1), t || this.render(), !0);
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
      google.maps.event.trigger(this, $.CLUSTERING_BEGIN, this);
      const { clusters: t, changed: n } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (n || n == null) {
        const s = /* @__PURE__ */ new Set();
        for (const r of t)
          r.markers.length == 1 && s.add(r.markers[0]);
        const o = [];
        for (const r of this.clusters)
          r.marker != null && (r.markers.length == 1 ? s.has(r.marker) || b.setMap(r.marker, null) : o.push(r.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => o.forEach((r) => b.setMap(r, null)));
      }
      google.maps.event.trigger(this, $.CLUSTERING_END, this);
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
    const e = new Je(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((n) => {
      n.markers.length === 1 ? n.marker = n.markers[0] : (n.marker = this.renderer.render(n, e, t), n.markers.forEach((s) => b.setMap(s, null)), this.onClusterClick && n.marker.addListener(
        "click",
        /* istanbul ignore next */
        (s) => {
          google.maps.event.trigger(this, $.CLUSTER_CLICK, n), this.onClusterClick(s, n, t);
        }
      )), b.setMap(n.marker, t);
    });
  }
}
const Qe = C({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object
    }
  },
  setup(i, { slots: e }) {
    const t = O(A, k(null)), n = k(null);
    return t.value && (n.value = E(
      new Ye({
        map: t.value,
        ...i.options
      })
    )), Q(de, n), S(() => {
      n.value && (n.value.setMap(null), n.value.clearMarkers(), n.value = null);
    }), () => {
      var s;
      return (s = e.default) == null ? void 0 : s.call(e);
    };
  }
});
function et(i) {
  i.component("VGoogleMap", Ie), i.component("VGoogleCircle", xe), i.component("VGoogleMarker", Se), i.component("VGoogleHeatmap", Pe), i.component("VGooglePolygon", je), i.component("VGooglePolyline", Re), i.component("VGoogleRectangle", Te), i.component("VGoogleInfoWindow", Ue), i.component("VGoogleMarkerClusterer", Qe);
}
export {
  P as useGmapLoader,
  et as vGoogleMaps
};
