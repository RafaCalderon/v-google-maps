import { ref as k, defineComponent as A, useCssVars as ye, provide as Q, computed as O, onMounted as U, markRaw as I, nextTick as ke, watch as M, onBeforeUnmount as j, openBlock as ae, createElementBlock as le, createElementVNode as ue, renderSlot as ce, createCommentVNode as he, inject as b, onUnmounted as we, useSlots as _e } from "vue";
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
    function l(u) {
      try {
        p(n.next(u));
      } catch (c) {
        r(c);
      }
    }
    function a(u) {
      try {
        p(n.throw(u));
      } catch (c) {
        r(c);
      }
    }
    function p(u) {
      u.done ? o(u.value) : s(u.value).then(l, a);
    }
    p((n = n.apply(i, e || [])).next());
  });
}
var Le = function i(e, t) {
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
class N {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: n, client: s, id: o = ne, language: r, libraries: l = [], mapIds: a, nonce: p, region: u, retries: c = 3, url: v = "https://maps.googleapis.com/maps/api/js", version: h }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = n, this.client = s, this.id = o || ne, this.language = r, this.libraries = l, this.mapIds = a, this.nonce = p, this.region = u, this.retries = c, this.url = v, this.version = h, N.instance) {
      if (!Le(this.options, N.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(N.instance.options)}`);
      return N.instance;
    }
    N.instance = this;
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
      let r, l, a, p = "The Google Maps JavaScript API", u = "google", c = "importLibrary", v = "__ib__", h = document, m = window;
      m = m[u] || (m[u] = {});
      const d = m.maps || (m.maps = {}), f = /* @__PURE__ */ new Set(), g = new URLSearchParams(), y = () => (
        // @ts-ignore
        r || (r = new Promise((w, C) => Me(this, void 0, void 0, function* () {
          var E;
          yield l = h.createElement("script"), l.id = this.id, g.set("libraries", [...f] + "");
          for (a in o)
            g.set(a.replace(/[A-Z]/g, (z) => "_" + z[0].toLowerCase()), o[a]);
          g.set("callback", u + ".maps." + v), l.src = this.url + "?" + g, d[v] = w, l.onerror = () => r = C(Error(p + " could not load.")), l.nonce = this.nonce || ((E = h.querySelector("script[nonce]")) === null || E === void 0 ? void 0 : E.nonce) || "", h.head.append(l);
        })))
      );
      d[c] ? console.warn(p + " only loads once. Ignoring:", o) : d[c] = (w, ...C) => f.add(w) && y().then(() => d[c](w, ...C));
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
async function Oe(i, e = []) {
  if (K.value)
    return;
  const t = new N({
    apiKey: i,
    libraries: e
  });
  K.value = await t.load();
}
function R() {
  return {
    gmapApi: K,
    load: Oe
  };
}
function be(i) {
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
const _ = /* @__PURE__ */ be(Ce), x = Symbol("map"), pe = Symbol("marker"), de = Symbol("marker-clusterer"), Ee = { class: "v-google-map__wrapper" }, Ae = /* @__PURE__ */ A({
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
    ye((f) => ({
      "4fc8e44e": i.width,
      11873374: i.height,
      "5a101f2a": i.borderRadius
    }));
    const { gmapApi: s } = R(), o = k(!1), r = k(null), l = k(null);
    let a = null, p = null, u = null;
    Q(x, r);
    const c = O({
      get() {
        return n.center;
      },
      set(f) {
        t("update:center", f);
      }
    }), v = O({
      get() {
        return n.zoom;
      },
      set(f) {
        t("update:zoom", f);
      }
    });
    U(async () => {
      if (!l.value || !s.value)
        return;
      const f = {
        ...n.options
      };
      c.value && (f.center = {
        ...c.value
      }), v.value && (f.zoom = v.value), r.value = I(
        new s.value.maps.Map(l.value, {
          ...f
        })
      ), o.value = !0, await ke(), h(), t("ready");
    });
    function h() {
      r.value && (a = r.value.addListener("click", d), p = r.value.addListener("dragend", () => {
        var f, g;
        c.value = ((g = (f = r.value) == null ? void 0 : f.getCenter()) == null ? void 0 : g.toJSON()) ?? null;
      }), u = r.value.addListener("zoom_changed", () => {
        var f;
        v.value = ((f = r.value) == null ? void 0 : f.getZoom()) ?? 0;
      }));
    }
    function m() {
      a && a.remove(), p && p.remove(), u && u.remove();
    }
    function d(f) {
      t("click", f);
    }
    return M(
      () => n.options,
      (f, g) => {
        !r.value || _(f, g) || r.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), M(
      c,
      (f, g) => {
        _(f, g) || !r.value || !f || r.value.setCenter({
          ...f
        });
      }
    ), M(v, (f, g) => {
      _(f, g) || !r.value || !f || r.value.setZoom(f);
    }), e({
      map: r
    }), j(() => {
      m(), r.value = null;
    }), (f, g) => (ae(), le("div", Ee, [
      ue("div", {
        class: "v-google-map__container",
        ref_key: "mapRef",
        ref: l
      }, null, 512),
      o.value ? ce(f.$slots, "default", { key: 0 }, void 0, !0) : he("", !0)
    ]));
  }
});
const fe = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, s] of e)
    t[n] = s;
  return t;
}, Ie = /* @__PURE__ */ fe(Ae, [["__scopeId", "data-v-52ac4172"]]), xe = A({
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
    const { gmapApi: s } = R(), o = b(x, k(null));
    U(() => {
      if (o.value && s.value) {
        const d = {
          ...i.options
        };
        u.value && (d.center = {
          ...u.value
        }), c.value && (d.radius = c.value), r.value = I(
          new s.value.maps.Circle({
            map: o.value,
            ...d
          })
        ), v();
      }
    });
    const r = k(null);
    let l = null, a = null, p = null;
    const u = O({
      get() {
        return i.center;
      },
      set(d) {
        e("update:center", d);
      }
    }), c = O({
      get() {
        return i.radius;
      },
      set(d) {
        e("update:radius", d);
      }
    });
    function v() {
      r.value && (l = r.value.addListener("click", m), a = r.value.addListener("radius_changed", () => {
        var d;
        c.value = ((d = r.value) == null ? void 0 : d.getRadius()) ?? null;
      }), p = r.value.addListener("center_changed", () => {
        var f, g;
        const d = (g = (f = r.value) == null ? void 0 : f.getCenter()) == null ? void 0 : g.toJSON();
        d && (u.value = {
          ...d
        });
      }));
    }
    function h() {
      l && l.remove(), a && a.remove(), p && p.remove();
    }
    function m(d) {
      e("click", d);
    }
    return M(
      () => i.options,
      (d, f) => {
        !r.value || _(d, f) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      u,
      (d, f) => {
        _(d, f) || !r.value || !d || r.value.setCenter({
          ...d
        });
      }
    ), M(c, (d, f) => {
      _(d, f) || !r.value || !d || r.value.setRadius(d);
    }), t({
      circle: r
    }), j(() => {
      h(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var d;
      return (d = n.default) == null ? void 0 : d.call(n);
    };
  }
}), Se = A({
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
    const { gmapApi: s } = R(), o = b(x, k(null)), r = b(de, k(null)), l = k(null);
    let a = null, p = null;
    if (o.value && s.value) {
      const m = {
        ...i.options
      };
      i.modelValue && (m.position = {
        ...i.modelValue
      }), l.value = I(
        new s.value.maps.Marker({
          map: r.value === null ? o.value : null,
          ...m
        })
      ), r.value && r.value.addMarker(l.value), c();
    }
    const u = O({
      get() {
        return i.modelValue;
      },
      set(m) {
        e("update:model-value", m);
      }
    });
    function c() {
      l.value && (a = l.value.addListener("click", h), p = l.value.addListener("mouseup", () => {
        var m, d;
        u.value = ((d = (m = l.value) == null ? void 0 : m.getPosition()) == null ? void 0 : d.toJSON()) ?? null;
      }));
    }
    function v() {
      a && a.remove(), p && p.remove();
    }
    function h(m) {
      e("click", m);
    }
    return M(
      () => i.options,
      (m, d) => {
        !l.value || _(m, d) || l.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      u,
      (m, d) => {
        _(m, d) || !l.value || l.value.setPosition(m);
      }
    ), t({
      marker: l
    }), Q(pe, l), j(() => {
      v(), l.value && (r.value && r.value.removeMarker(l.value), l.value.setMap(null), l.value = null);
    }), () => {
      var m;
      return (m = n.default) == null ? void 0 : m.call(n);
    };
  }
}), Pe = A({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: !0,
      type: Object
    }
  },
  setup(i, { expose: e, slots: t }) {
    const { gmapApi: n } = R(), s = b(x, k(null));
    U(() => {
      if (s.value && n.value) {
        const r = {
          ...i.options
        };
        o.value = I(
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
}), je = A({
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
  setup(i, { emit: e, expose: t, slots: n }) {
    const { gmapApi: s } = R(), o = b(x, k(null));
    U(() => {
      if (o.value && s.value) {
        const g = {
          ...i.options
        };
        c.value && (g.paths = [...c.value]), r.value = I(
          new s.value.maps.Polygon({
            map: o.value,
            ...g
          })
        ), v();
      }
    });
    const r = k(null);
    let l = null, a = null, p = null, u = null;
    const c = O({
      get() {
        return i.modelValue;
      },
      set(g) {
        e("update:model-value", g);
      }
    });
    function v() {
      r.value && (l = r.value.addListener("click", m), p = r.value.addListener("mouseout", f), u = r.value.addListener("mouseover", d), a = r.value.addListener("mouseup", () => {
        var y, w, C;
        const g = (C = (w = (y = r.value) == null ? void 0 : y.getPath()) == null ? void 0 : w.getArray()) == null ? void 0 : C.map((E) => E.toJSON());
        g && (c.value = [...g]);
      }));
    }
    function h() {
      l && l.remove(), a && a.remove(), p && p.remove(), u && u.remove();
    }
    function m(g) {
      e("click", g);
    }
    function d(g) {
      e("mouseover", g);
    }
    function f(g) {
      e("mouseout", g);
    }
    return M(
      () => i.options,
      (g, y) => {
        !r.value || _(g, y) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      c,
      (g, y) => {
        _(g, y) || !r.value || !g || r.value.setPath(g);
      }
    ), t({
      polygon: r
    }), j(() => {
      h(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var g;
      return (g = n.default) == null ? void 0 : g.call(n);
    };
  }
}), Re = A({
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
    const { gmapApi: s } = R(), o = b(x, k(null));
    U(() => {
      if (o.value && s.value) {
        const h = {
          ...i.options
        };
        p.value && (h.path = [...p.value]), r.value = I(
          new s.value.maps.Polyline({
            ...h,
            map: o.value
          })
        ), u();
      }
    });
    const r = k(null);
    let l = null, a = null;
    const p = O({
      get() {
        return i.modelValue;
      },
      set(h) {
        e("update:model-value", h);
      }
    });
    function u() {
      r.value && (l = r.value.addListener("click", v), a = r.value.addListener("mouseup", () => {
        var m, d, f;
        const h = (f = (d = (m = r.value) == null ? void 0 : m.getPath()) == null ? void 0 : d.getArray()) == null ? void 0 : f.map((g) => g.toJSON());
        h && (p.value = [...h]);
      }));
    }
    function c() {
      l && l.remove(), a && a.remove();
    }
    function v(h) {
      e("click", h);
    }
    return M(
      () => i.options,
      (h, m) => {
        !r.value || _(h, m) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      p,
      (h, m) => {
        _(h, m) || !r.value || !h || r.value.setPath(h);
      }
    ), t({
      polyline: r
    }), j(() => {
      c(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var h;
      return (h = n.default) == null ? void 0 : h.call(n);
    };
  }
}), Te = A({
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
    const { gmapApi: s } = R(), o = b(x, k(null));
    U(() => {
      if (o.value && s.value) {
        const h = {
          ...i.options
        };
        p.value && (h.bounds = {
          ...p.value
        }), r.value = I(
          new s.value.maps.Rectangle({
            map: o.value,
            ...h
          })
        ), u();
      }
    });
    const r = k(null);
    let l = null, a = null;
    const p = O({
      get() {
        return i.modelValue;
      },
      set(h) {
        e("update:model-value", h);
      }
    });
    function u() {
      r.value && (l = r.value.addListener("click", v), a = r.value.addListener("bounds_changed", () => {
        var m, d;
        const h = (d = (m = r.value) == null ? void 0 : m.getBounds()) == null ? void 0 : d.toJSON();
        h && (p.value = {
          ...h
        });
      }));
    }
    function c() {
      l && l.remove(), a && a.remove();
    }
    function v(h) {
      e("click", h);
    }
    return M(
      () => i.options,
      (h, m) => {
        !r.value || _(h, m) || r.value.setOptions(i.options);
      },
      {
        deep: !0
      }
    ), M(
      p,
      (h, m) => {
        _(h, m) || !r.value || !h || r.value.setBounds(h);
      }
    ), t({
      rectangle: r
    }), j(() => {
      c(), r.value && (r.value.setMap(null), r.value = null);
    }), () => {
      var h;
      return (h = n.default) == null ? void 0 : h.call(n);
    };
  }
}), Ge = {
  key: 0,
  class: "v-google-info-window__container"
}, Ne = /* @__PURE__ */ A({
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
    const n = i, s = _e(), { gmapApi: o } = R(), r = b(x, k(null)), l = b(pe, k(null));
    U(() => {
      var y;
      o.value && (u.value = I(
        new o.value.maps.InfoWindow({
          ...n.options,
          content: h.value ? p.value : (y = n.options) == null ? void 0 : y.content
        })
      ), d(), m.value && g());
    });
    const a = k(!1), p = k(), u = k(null);
    let c = null, v = null;
    const h = O(() => {
      var y;
      return (y = s.default) == null ? void 0 : y.call(s).some((w) => w.type !== Comment);
    }), m = O({
      get() {
        return n.modelValue;
      },
      set(y) {
        t("update:model-value", y);
      }
    });
    function d() {
      !l.value || !u.value || (v = l.value.addListener("click", g), c = u.value.addListener("closeclick", g));
    }
    function f() {
      v && v.remove(), c && c.remove();
    }
    function g() {
      !u.value || !r.value || (a.value = !a.value, a.value ? u.value.open({
        map: r.value,
        anchor: l.value
      }) : u.value.close(), m.value = a.value);
    }
    return M(
      () => n.options,
      (y, w) => {
        !u.value || _(y, w) || u.value.setOptions(n.options);
      },
      {
        deep: !0
      }
    ), M(m, (y) => {
      y === null || y === a.value || g();
    }), e({
      infoWindow: u
    }), j(() => {
      f(), u.value && (u.value.close(), u.value = null);
    }), (y, w) => h.value ? (ae(), le("div", Ge, [
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
      const u = a.pop() || 0, c = a.pop() || 0, v = a.pop() || 0;
      if (c - v <= l) {
        for (let f = v; f <= c; f++) {
          const g = r[2 * f], y = r[2 * f + 1];
          g >= e && g <= n && y >= t && y <= s && p.push(o[f]);
        }
        continue;
      }
      const h = v + c >> 1, m = r[2 * h], d = r[2 * h + 1];
      m >= e && m <= n && d >= t && d <= s && p.push(o[h]), (u === 0 ? e <= m : t <= d) && (a.push(v), a.push(h - 1), a.push(1 - u)), (u === 0 ? n >= m : s >= d) && (a.push(h + 1), a.push(c), a.push(1 - u));
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
      const u = l.pop() || 0, c = l.pop() || 0, v = l.pop() || 0;
      if (c - v <= r) {
        for (let f = v; f <= c; f++)
          se(o[2 * f], o[2 * f + 1], e, t) <= p && a.push(s[f]);
        continue;
      }
      const h = v + c >> 1, m = o[2 * h], d = o[2 * h + 1];
      se(m, d, e, t) <= p && a.push(s[h]), (u === 0 ? e - n <= m : t - n <= d) && (l.push(v), l.push(h - 1), l.push(1 - u)), (u === 0 ? e + n >= m : t + n >= d) && (l.push(h + 1), l.push(c), l.push(1 - u));
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
      const p = s - n + 1, u = t - n + 1, c = Math.log(p), v = 0.5 * Math.exp(2 * c / 3), h = 0.5 * Math.sqrt(c * v * (p - v) / p) * (u - p / 2 < 0 ? -1 : 1), m = Math.max(n, Math.floor(t - u * v / p + h)), d = Math.min(s, Math.floor(t + (p - u) * v / p + h));
      me(i, e, t, m, d, o);
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
}, oe = Math.fround || ((i) => (e) => (i[0] = +e, i[0]))(new Float32Array(1)), G = 2, P = 3, H = 4, S = 5, ge = 6;
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
      const [u, c] = p.geometry.coordinates, v = oe(D(u)), h = oe(B(c));
      r.push(
        v,
        h,
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
      const c = this.getClusters([n, s, 180, r], t), v = this.getClusters([-180, s, o, r], t);
      return c.concat(v);
    }
    const l = this.trees[this._limitZoom(t)], a = l.range(D(n), B(r), D(o), B(s)), p = l.data, u = [];
    for (const c of a) {
      const v = this.stride * c;
      u.push(p[v + S] > 1 ? ie(p, v, this.clusterProps) : this.points[p[v + P]]);
    }
    return u;
  }
  getChildren(e) {
    const t = this._getOriginId(e), n = this._getOriginZoom(e), s = "No cluster with the specified id.", o = this.trees[n];
    if (!o)
      throw new Error(s);
    const r = o.data;
    if (t * this.stride >= r.length)
      throw new Error(s);
    const l = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), a = r[t * this.stride], p = r[t * this.stride + 1], u = o.within(a, p, l), c = [];
    for (const v of u) {
      const h = v * this.stride;
      r[h + H] === e && c.push(r[h + S] > 1 ? ie(r, h, this.clusterProps) : this.points[r[h + P]]);
    }
    if (c.length === 0)
      throw new Error(s);
    return c;
  }
  getLeaves(e, t, n) {
    t = t || 10, n = n || 0;
    const s = [];
    return this._appendLeaves(s, e, t, n, 0), s;
  }
  getTile(e, t, n) {
    const s = this.trees[this._limitZoom(e)], o = Math.pow(2, e), { extent: r, radius: l } = this.options, a = l / r, p = (n - a) / o, u = (n + 1 + a) / o, c = {
      features: []
    };
    return this._addTileFeatures(
      s.range((t - a) / o, p, (t + 1 + a) / o, u),
      s.data,
      t,
      n,
      o,
      c
    ), t === 0 && this._addTileFeatures(
      s.range(1 - a / o, p, 1, u),
      s.data,
      o,
      n,
      o,
      c
    ), t === o - 1 && this._addTileFeatures(
      s.range(0, p, a / o, u),
      s.data,
      -1,
      n,
      o,
      c
    ), c.features.length ? c : null;
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
      const a = l * this.stride, p = t[a + S] > 1;
      let u, c, v;
      if (p)
        u = ve(t, a, this.clusterProps), c = t[a], v = t[a + 1];
      else {
        const d = this.points[t[a + P]];
        u = d.properties;
        const [f, g] = d.geometry.coordinates;
        c = D(f), v = B(g);
      }
      const h = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (c * o - n)),
          Math.round(this.options.extent * (v * o - s))
        ]],
        tags: u
      };
      let m;
      p || this.options.generateId ? m = t[a + P] : m = this.points[t[a + P]].id, m !== void 0 && (h.id = m), r.features.push(h);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, t) {
    const { radius: n, extent: s, reduce: o, minPoints: r } = this.options, l = n / (s * Math.pow(2, t)), a = e.data, p = [], u = this.stride;
    for (let c = 0; c < a.length; c += u) {
      if (a[c + G] <= t)
        continue;
      a[c + G] = t;
      const v = a[c], h = a[c + 1], m = e.within(a[c], a[c + 1], l), d = a[c + S];
      let f = d;
      for (const g of m) {
        const y = g * u;
        a[y + G] > t && (f += a[y + S]);
      }
      if (f > d && f >= r) {
        let g = v * d, y = h * d, w, C = -1;
        const E = ((c / u | 0) << 5) + (t + 1) + this.points.length;
        for (const z of m) {
          const T = z * u;
          if (a[T + G] <= t)
            continue;
          a[T + G] = t;
          const te = a[T + S];
          g += a[T] * te, y += a[T + 1] * te, a[T + H] = E, o && (w || (w = this._map(a, c, !0), C = this.clusterProps.length, this.clusterProps.push(w)), o(w, this._map(a, T)));
        }
        a[c + H] = E, p.push(g / f, y / f, 1 / 0, E, -1, f), o && p.push(C);
      } else {
        for (let g = 0; g < u; g++)
          p.push(a[c + g]);
        if (f > 1)
          for (const g of m) {
            const y = g * u;
            if (!(a[y + G] <= t)) {
              a[y + G] = t;
              for (let w = 0; w < u; w++)
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
    if (e[t + S] > 1) {
      const r = this.clusterProps[e[t + ge]];
      return n ? Object.assign({}, r) : r;
    }
    const s = this.points[e[t + P]].properties, o = this.options.map(s);
    return n && o === s ? Object.assign({}, o) : o;
  }
}
function ie(i, e, t) {
  return {
    type: "Feature",
    id: i[e + P],
    properties: ve(i, e, t),
    geometry: {
      type: "Point",
      coordinates: [Fe(i[e]), $e(i[e + 1])]
    }
  };
}
function ve(i, e, t) {
  const n = i[e + S], s = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, o = i[e + ge], r = o === -1 ? {} : Object.assign({}, t[o]);
  return Object.assign(r, {
    cluster: !0,
    cluster_id: i[e + P],
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
class L {
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
      e.extend(L.getPosition(t));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => L.getVisible(e)).length;
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
    this.marker && (L.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
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
  position: L.getPosition(t),
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
        const r = L.getPosition(o);
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
      position: L.getPosition(s)
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
    if (L.isAdvancedMarkerAvailable(s)) {
      const u = document.createElement("div");
      u.innerHTML = r;
      const c = u.firstElementChild;
      c.setAttribute("transform", "translate(0 25)");
      const v = {
        map: s,
        position: t,
        zIndex: a,
        title: l,
        content: c
      };
      return new google.maps.marker.AdvancedMarkerElement(v);
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
    return n === -1 ? !1 : (L.setMap(e, null), this.markers.splice(n, 1), t || this.render(), !0);
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
          r.marker != null && (r.markers.length == 1 ? s.has(r.marker) || L.setMap(r.marker, null) : o.push(r.marker));
        this.clusters = t, this.renderClusters(), requestAnimationFrame(() => o.forEach((r) => L.setMap(r, null)));
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
    this.markers.forEach((e) => L.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new Je(this.markers, this.clusters), t = this.getMap();
    this.clusters.forEach((n) => {
      n.markers.length === 1 ? n.marker = n.markers[0] : (n.marker = this.renderer.render(n, e, t), n.markers.forEach((s) => L.setMap(s, null)), this.onClusterClick && n.marker.addListener(
        "click",
        /* istanbul ignore next */
        (s) => {
          google.maps.event.trigger(this, $.CLUSTER_CLICK, n), this.onClusterClick(s, n, t);
        }
      )), L.setMap(n.marker, t);
    });
  }
}
const Qe = A({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object
    }
  },
  setup(i, { slots: e }) {
    const t = b(x, k(null)), n = k(null);
    return t.value && (n.value = I(
      new Ye({
        map: t.value,
        ...i.options
      })
    )), Q(de, n), j(() => {
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
  R as useGmapLoader,
  et as vGoogleMaps
};
