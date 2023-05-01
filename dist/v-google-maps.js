import { ref as v, defineComponent as _, useCssVars as b, provide as w, computed as E, onMounted as j, markRaw as A, nextTick as R, watch as I, onBeforeUnmount as $, openBlock as L, createElementBlock as M, createElementVNode as N, renderSlot as G, createCommentVNode as x } from "vue";
var D = function n(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var o, r, s;
    if (Array.isArray(e)) {
      if (o = e.length, o != t.length)
        return !1;
      for (r = o; r-- !== 0; )
        if (!n(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (s = Object.keys(e), o = s.length, o !== Object.keys(t).length)
      return !1;
    for (r = o; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[r]))
        return !1;
    for (r = o; r-- !== 0; ) {
      var l = s[r];
      if (!n(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const C = "__googleMapsScriptId";
var f;
(function(n) {
  n[n.INITIALIZED = 0] = "INITIALIZED", n[n.LOADING = 1] = "LOADING", n[n.SUCCESS = 2] = "SUCCESS", n[n.FAILURE = 3] = "FAILURE";
})(f || (f = {}));
class c {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: o, client: r, id: s = C, language: l, libraries: p = [], mapIds: d, nonce: g, region: u, retries: h = 3, url: m = "https://maps.googleapis.com/maps/api/js", version: y }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = o, this.client = r, this.id = s || C, this.language = l, this.libraries = p, this.mapIds = d, this.nonce = g, this.region = u, this.retries = h, this.url = m, this.version = y, c.instance) {
      if (!D(this.options, c.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(c.instance.options)}`);
      return c.instance;
    }
    c.instance = this;
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
    return this.errors.length ? f.FAILURE : this.done ? f.SUCCESS : this.loading ? f.LOADING : f.INITIALIZED;
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
    let e = this.url;
    return e += `?callback=${this.CALLBACK}`, this.apiKey && (e += `&key=${this.apiKey}`), this.channel && (e += `&channel=${this.channel}`), this.client && (e += `&client=${this.client}`), this.libraries.length > 0 && (e += `&libraries=${this.libraries.join(",")}`), this.language && (e += `&language=${this.language}`), this.region && (e += `&region=${this.region}`), this.version && (e += `&v=${this.version}`), this.mapIds && (e += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e += `&auth_referrer_policy=${this.authReferrerPolicy}`), e;
  }
  deleteScript() {
    const e = document.getElementById(this.id);
    e && e.remove();
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
    return new Promise((e, t) => {
      this.loadCallback((o) => {
        o ? t(o.error) : e(window.google);
      });
    });
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   */
  loadCallback(e) {
    this.callbacks.push(e), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const e = this.createUrl(), t = document.createElement("script");
    t.id = this.id, t.type = "text/javascript", t.src = e, t.onerror = this.loadErrorCallback.bind(this), t.defer = !0, t.async = !0, this.nonce && (t.nonce = this.nonce), document.head.appendChild(t);
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
      console.log(`Failed to load Google Maps script, retrying in ${t} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, t);
    } else
      this.onerrorEvent = e, this.callback();
  }
  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
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
      this.loading || (this.loading = !0, this.setCallback(), this.setScript());
    }
  }
}
const k = v(null);
async function P(n, e = []) {
  if (k.value)
    return;
  const t = new c({
    apiKey: n,
    libraries: e
  });
  k.value = await t.load();
}
function U() {
  return {
    gmapApi: k,
    load: P
  };
}
var O = function n(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var o, r, s;
    if (Array.isArray(e)) {
      if (o = e.length, o != t.length)
        return !1;
      for (r = o; r-- !== 0; )
        if (!n(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (s = Object.keys(e), o = s.length, o !== Object.keys(t).length)
      return !1;
    for (r = o; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[r]))
        return !1;
    for (r = o; r-- !== 0; ) {
      var l = s[r];
      if (!n(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const z = /* @__PURE__ */ _({
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
  setup(n, { emit: e }) {
    const t = n;
    b((i) => ({
      "3e550e08": n.width,
      "200aacb1": n.height,
      "2018c7e8": n.borderRadius
    }));
    const { gmapApi: o } = U(), r = v(!1), s = v(null), l = v(null);
    let p = null, d = null, g = null;
    w("google-map", s);
    const u = E({
      get() {
        return t.center;
      },
      set(i) {
        e("update:center", i);
      }
    }), h = E({
      get() {
        return t.zoom;
      },
      set(i) {
        e("update:zoom", i);
      }
    });
    j(async () => {
      if (!l.value || !o.value)
        return;
      const i = {
        ...t.options
      };
      u.value && (i.center = {
        ...u.value
      }), h.value && (i.zoom = h.value), s.value = A(new o.value.maps.Map(l.value, {
        ...i
      })), r.value = !0, await R(), m(), e("ready");
    });
    function m() {
      s.value && (p = s.value.addListener("click", S), d = s.value.addListener("dragend", () => {
        var i, a;
        u.value = ((a = (i = s.value) == null ? void 0 : i.getCenter()) == null ? void 0 : a.toJSON()) ?? null;
      }), g = s.value.addListener("zoom_changed", () => {
        var i;
        h.value = ((i = s.value) == null ? void 0 : i.getZoom()) ?? 0;
      }));
    }
    function y() {
      p && p.remove(), d && d.remove(), g && g.remove();
    }
    function S(i) {
      e("click", i);
    }
    return I(() => t.options, (i, a) => {
      !s.value || O(i, a) || s.value.setOptions(t.options);
    }, {
      deep: !0
    }), I(u, (i, a) => {
      O(i, a) || !s.value || !i || s.value.setCenter({
        ...i
      });
    }), I(h, (i, a) => {
      O(i, a) || !s.value || !i || s.value.setZoom(i);
    }), $(() => {
      y(), s.value = null;
    }), (i, a) => (L(), M("div", null, [
      N("div", {
        class: "v-google-map__container",
        ref_key: "mapRef",
        ref: l
      }, null, 512),
      r.value ? G(i.$slots, "default", { key: 0 }, void 0, !0) : x("", !0)
    ]));
  }
});
const q = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, r] of e)
    t[o] = r;
  return t;
}, B = /* @__PURE__ */ q(z, [["__scopeId", "data-v-028278a8"]]), K = (n) => {
  n.component("VGoogleMap", B);
};
export {
  U as useGmapLoader,
  K as vGoogleMaps
};
