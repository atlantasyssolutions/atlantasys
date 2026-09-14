window._iub = window._iub || [];
window._iub.googleConsentModeV2 = true;

(function() {
    "use strict";
    const _ = {
            COOKIE: "cookie",
            LOCAL_STORAGE: "local_storage"
        },
        m = function(e) {
            return Array.isArray ? Array.isArray(e) : {}.toString.call(e) === "[object Array]"
        },
        C = (e, o, n, t) => {
            let s;
            const i = e || {},
                r = o || {};
            return s = m(i) ? [] : {}, Object.keys(i).forEach(a => {
                s[a] = i[a]
            }), Object.keys(r).forEach(a => {
                typeof r[a] != "object" || r[a] === null || r[a] instanceof HTMLElement ? s[a] = r[a] : (typeof s[a] != "object" && (s[a] = m(r[a]) ? [] : {}), s[a] = C(s[a], r[a]))
            }), s
        },
        v = (e, o) => C(e, o);

    function S(e, o) {
        var n, t, s, i;
        return e === void 0 && (e = {}), o === void 0 && (o = {}), v((n = (t = o) == null ? void 0 : t.storage) != null ? n : {}, (s = (i = e) == null ? void 0 : i.storage) != null ? s : {})
    }
    let f = null;

    function D(e, o) {
        return e === void 0 && (e = {}), o === void 0 && (o = {}), f || (f = v(o != null ? o : {}, e != null ? e : {}), f)
    }

    function k(e, o) {
        const n = [],
            t = document.cookie.split(/\s*;\s*/);
        for (let i = 0; i < t.length; i++) {
            const r = t[i].split("="),
                a = r[0],
                l = r[1],
                p = a.match(new RegExp("^" + e + "(-(\\d+))?$"));
            if (!p) continue;
            const u = parseInt(p[2], 10) || 0;
            n[u] = l
        }
        if (!n.length) return "";
        const s = n.join("");
        try {
            return JSON.parse(s)
        } catch {
            return JSON.parse(decodeURIComponent(s))
        }
    }

    function O(e, o) {
        const n = window.localStorage.getItem(e);
        return n === null ? "" : JSON.parse(n)
    }

    function I(e, o, n) {
        let t = "";
        switch (n) {
            case _.LOCAL_STORAGE:
                t = O(e);
                break;
            case _.COOKIE:
            default:
                t = k(e);
                break
        }
        return t
    }

    function A() {
        var e;
        const o = D(_iub.csConfiguration, _iub.csSiteConf);
        return o.siteId && (e = o.storage) != null && e.useSiteId ? "s" + o.siteId : o.cookiePolicyId
    }

    function M() {
        const e = S(_iub.csConfiguration, _iub.csSiteConf),
            o = (e == null ? void 0 : e.type) || _.COOKIE,
            n = A(),
            t = I("_iub_cs-" + n, !1, o),
            s = I("_iub_cs-" + n + "-uspr", !1, o);
        return {
            coreStorage: t,
            usprStorage: s
        }
    }
    const c = {
        analytics_storage: {
            purposes: [4],
            usPurposes: ["s"]
        },
        ad_storage: {
            purposes: [5],
            usPurposes: ["s", "sh", "adv"]
        },
        functionality_storage: {
            purposes: [2],
            usPurposes: []
        },
        personalization_storage: {
            purposes: [3],
            usPurposes: []
        },
        security_storage: {
            purposes: [2],
            usPurposes: []
        },
        ad_personalization: {
            purposes: [5],
            usPurposes: ["sh", "adv"]
        },
        ad_user_data: {
            purposes: [5],
            usPurposes: ["sh", "adv"]
        }
    };

    function T() {
        const e = M(),
            o = e.coreStorage,
            n = e.usprStorage,
            t = {};
        let s = !1,
            i = !1,
            r = null;
        return o && (o.purposes ? (s = !0, Object.keys(o.purposes).map(a => {
            t[a] = o.purposes[a]
        })) : r = o.consent || !1), n && (i = !0, Object.keys(n).map(a => {
            t[a] = n[a]
        })), {
            hasPurposes: s,
            hasUSPurposes: i,
            allPurposes: t,
            coreConsent: r
        }
    }

    function g(e) {
        let o = e === void 0 ? {
                dataLayerName: "dataLayer",
                gtagName: "gtag"
            } : e,
            n = o.dataLayerName,
            t = o.gtagName;
        n && (window[n] = window[n] || [], t && typeof window[t] != "function" && (window[t] = function() {
            window[n].push(arguments)
        }))
    }

    function b(e, o) {
        return e === void 0 && (e = "dataLayer"), h("consent", "default", e, o) !== !1
    }

    function h(e, o, n, t) {
        if (n === void 0 && (n = "dataLayer"), !window[n] || !window[n].length) return !1;
        for (let s = 0; s < window[n].length; s++) {
            const i = window[n][s];
            if (i) {
                if (t) {
                    if (i === e && window[n][s + 1] === o) return s
                } else if (i[0] === e && i[1] === o) return s
            }
        }
        return !1
    }

    function L(e) {
        const o = T(),
            n = o.allPurposes,
            t = o.hasPurposes,
            s = o.hasUSPurposes,
            i = o.coreConsent,
            r = {};
        return Object.keys(e).forEach(a => {
            const l = e[a],
                p = !t && i === null && s;
            let u = !1;
            t && l.purposes && (u = l.purposes.every(y => n[y])), !t && i !== null && (u = i), s && (u || p) && l.usPurposes && (u = l.usPurposes.every(y => n[y])), r[a] = u ? "granted" : "denied"
        }), r
    }

    function d() {
        return !!window._iub && !!window._iub.csConfiguration && window._iub.csConfiguration.googleConsentMode !== !1
    }

    function N() {
        return !!window._iub && !!window._iub.csConfiguration && window._iub.csConfiguration.uetConsentMode !== !1
    }

    function j() {
        return !!window._iub && window._iub.googleConsentModeV2 !== !1
    }

    function E() {
        return !!window._iub && !!window._iub.csConfiguration && window._iub.csConfiguration.googleEnableAdvertiserConsentMode === !0
    }

    function U() {
        window._iub && window._iub instanceof Object && (_iub.comoImplementationLogged = !0)
    }

    function G() {
        return !!window._iub && window._iub instanceof Object && _iub.comoImplementationLogged !== !0
    }

    function P() {
        return window._iub && window._iub.csConfiguration && window._iub.csConfiguration.logLevel ? window._iub.csConfiguration.logLevel : "warning"
    }

    function F() {
        const e = P();
        ["debug", "info"].indexOf(e) !== -1 && console.info("[IUBCS|INFO]: The default consent or the TCF stub has been correctly found before Google Tag Manager is initialized.")
    }

    function x() {
        const e = P();
        ["debug", "info", "warn"].indexOf(e) !== -1 && console.warn("[IUBCS|WARN]: Google Tag Manager initialized before setting the default consent or before embedding the TCF stub.")
    }

    function z() {
        if (!d() || !G()) return;
        U();
        const e = "google_tag_manager" in window,
            o = "__tcfapi" in window,
            n = E();
        e && !b() && !n || e && !o && n ? x() : F()
    }

    function J(e, o) {
        if (e == null) return {};
        var n = {};
        for (var t in e)
            if ({}.hasOwnProperty.call(e, t)) {
                if (o.indexOf(t) !== -1) continue;
                n[t] = e[t]
            }
        return n
    }
    const W = ["ad_user_data", "ad_personalization"];

    function w() {
        var e, o;
        return ((e = window._iub.csConfiguration) == null ? void 0 : e.googleConsentModeDataLayerName) || ((o = window._iub.csSiteConf) == null ? void 0 : o.googleConsentModeDataLayerName) || "dataLayer"
    }

    function R(e) {
        var o;
        if (!d()) return;
        const n = w();
        if (z(), ((o = (e != null ? e : {}).skipIfDataLayer) != null ? o : !0) && b(n)) return;
        g({
            dataLayerName: n,
            gtagName: "gtag"
        });
        let i = c;
        j() || (c.ad_user_data, c.ad_personalization, i = J(c, W));
        const r = L(i);
        window.gtag("consent", "default", r)
    }

    function V(e) {
        if (!d()) return;
        const o = w();
        g({
            dataLayerName: o,
            gtagName: "gtag"
        }), window.gtag("set", "url_passthrough", e != null ? e : !0)
    }

    function $(e) {
        if (!d()) return;
        const o = w();
        g({
            dataLayerName: o,
            gtagName: "gtag"
        }), window.gtag("set", "ads_data_redaction", e != null ? e : !0)
    }

    function q() {
        if (!d()) return;
        const e = w();
        g({
            dataLayerName: e,
            gtagName: "gtag"
        }), h("set", "developer_id.dZTJkMz", e) === !1 && window.gtag("set", "developer_id.dZTJkMz", !0)
    }

    function K() {
        return "_iub" in window && _iub.csConfiguration && _iub.csConfiguration.googleConsentMode === "template"
    }

    function B(e) {
        var o;
        if (!N() || ((o = (e != null ? e : {}).skipIfDataLayer) != null ? o : !0) && b("uetq", !0)) return;
        g({
            dataLayerName: "uetq",
            gtagName: null
        });
        const s = {
                ad_storage: c.ad_storage
            },
            i = L(s);
        window.uetq.push("consent", "default", i)
    }

    function Z() {
        if (window._iub = window._iub || [], B({
                skipIfDataLayer: !1
            }), !K()) {
            var e, o, n, t;
            q(), R({
                skipIfDataLayer: !1
            }), V((e = (o = _iub.csConfiguration) == null ? void 0 : o.googleUrlPassthrough) != null ? e : !0), $((n = (t = _iub.csConfiguration) == null ? void 0 : t.googleAdsDataRedaction) != null ? n : !0)
        }
    }
    window._iub = window._iub || [], _iub.syncjsVersion = "0.0.38", Z()
})();