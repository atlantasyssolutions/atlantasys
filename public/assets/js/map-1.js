!(function() {
    var r = {
            53: function() {
                !(function() {
                    const r = {
                        init() {
                            new jsVectorMap({
                                selector: "#bsb-map-1",
                                map: "world_merc",
                                markers: [{
                                        name: "India",
                                        coords: [20.5937, 78.9629]
                                    },
                                    {
                                        name: "Qatar",
                                        coords: [25.3548, 51.1839]
                                    },
                                    {
                                        name: "Bahrain",
                                        coords: [26.0667, 50.5577]
                                    },
                                    {
                                        name: "Malaysia",
                                        coords: [4.2105, 101.9758]
                                    },
                                    {
                                        name: "Singapore",
                                        coords: [1.3521, 103.8198]
                                    },
                                    {
                                        name: "Philippines",
                                        coords: [12.8797, 121.7740]
                                    },
                                    {
                                        name: "Kuwait",
                                        coords: [29.3117, 47.4818]
                                    }
                                ],
                                series: {
                                    markers: [{
                                        attribute: "fill",
                                        scale: {
                                            India: "rgb(0, 65, 187)",
                                            Brazil: "rgb(220, 53, 69)",
                                            Russia: "rgb(255, 193, 7)",
                                            USA: "rgb(13, 110, 253)"
                                        },
                                        values: {
                                            0: "India"
                                        },
                                    }, ],
                                    regions: [{
                                        attribute: "fill",
                                        legend: {
                                            title: "Sales"
                                        },
                                        scale: {
                                            India: "rgb(0, 65, 187)",
                                            Brazil: "rgb(220, 53, 69)",
                                            Russia: "rgb(255, 193, 7)",
                                            USA: "rgb(13, 110, 253)"
                                        },
                                        values: {
                                            IN: "India"
                                        },
                                    }, ],
                                },
                            });
                        },
                    };

                    function e() {
                        r.init();
                    }
                    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e(), window.addEventListener("load", function() {}, !1);
                })();
            },
        },
        e = {};

    function t(n) {
        var a = e[n];
        if (void 0 !== a) return a.exports;
        var i = (e[n] = {
            exports: {}
        });
        return r[n](i, i.exports, t), i.exports;
    }
    (t.n = function(r) {
        var e =
            r && r.__esModule ?
            function() {
                return r.default;
            } :
            function() {
                return r;
            };
        return t.d(e, {
            a: e
        }), e;
    }),
    (t.d = function(r, e) {
        for (var n in e) t.o(e, n) && !t.o(r, n) && Object.defineProperty(r, n, {
            enumerable: !0,
            get: e[n]
        });
    }),
    (t.o = function(r, e) {
        return Object.prototype.hasOwnProperty.call(r, e);
    }),
    (function() {
        "use strict";
        t(53);
    })();
})();