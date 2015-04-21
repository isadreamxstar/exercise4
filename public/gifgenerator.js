(function(S, ma, na, ea) {
    function sa(c, j, k, s, T) {
        function h(c) {
            var d = $('<div class="text-slide-wrap"><div class="opt">Range to display text on:</div><input class="text-start sml-input" type="text"/><input class="text-end sml-input" type="text"/><div class="textDurSlide"></div></div>');
            c.append(d);
            x.push({
                start: 0,
                end: 100
            });
            var h = u,
                a = d.width() - 140 - 4,
                c = new Slider(d.find(".text-start"), d.find(".textDurSlide"), 0, {
                    step: 0.1,
                    sliderWidth: a,
                    fill: !0,
                    update: function(a) {
                        x[h].start = a
                    }
                }),
                d = new Slider(d.find(".text-end"),
                    d.find(".textDurSlide"), 0, {
                        step: 0.1,
                        sliderWidth: a,
                        fill: !0,
                        update: function(a) {
                            x[h].end = a
                        }
                    });
            c.rightBound(d);
            d.leftBound(c);
            c.set(0);
            d.set(100);
            u++;
            50 <= u && j.find(".mm-another-text").remove()
        }
        var g = this,
            o, p, L, u = 0,
            w, y, E, B, A, z, C, H = {
                w: 0,
                h: 0,
                id: 0,
                name: "gif"
            },
            x = [],
            U = g.setDimensions = function(h, g) {
                w = h;
                y = g;
                E = c.width();
                B = c.height() - (T || 0);
                A = w / y > E / B ? E : B / y * w;
                z = y / w > B / E ? B : E / w * y;
                C.css({
                    width: A,
                    height: z,
                    marginTop: (B - z) / 2,
                    marginLeft: -A / 2
                });
                H.w = A;
                H.h = z;
                p && p.setWidth(A)
            };
        g.destroy = function() {
            C.remove();
            j.hide();
            j.find(".mm-text-boxes").html("")
        };
        g.displayWidth = function() {
            return A
        };
        g.displayHeight = function() {
            return z
        };
        g.memeData = function(c, d) {
            if (!p) return !1;
            for (var h = p.memeData(c, d), a = 0; a < x.length; a++) h["text_start" + a] = x[a].start, h["text_end" + a] = x[a].end;
            return h
        };
        g.initCaptioner = function() {
            p || (p = g.mm = new MemeMaker([H], {
                noDraw: !0,
                numTexts: 1,
                textAdded: h,
                $preview: C,
                $previewOuter: C,
                settingsDiv: j
            }), p.init(), p.select(0), j.find(".mm-opts").show())
        };
        g.initCropper = function() {
            if (!L) {
                var c = $('<div class="box cropBox gif-crop-box">');
                L = g.cropper = new Dragger(c,
                    C);
                C.append(c);
                j.find(".mm-toggle-drag").prop("checked", !0).change();
                L.setVals(0, 0, C.width(), C.height(), !0);
                C.removeClass("no-events")
            }
        };
        g.getFinalCropVals = function(c, d) {
            var h = c / A,
                a = d / z,
                g = L.getVals();
            g.x = Math.round(g.x * h);
            g.w = Math.round(g.w * h);
            g.y = Math.round(g.y * a);
            g.h = Math.round(g.h * a);
            return g
        };
        g.setProgress = function(c) {
            if (p)
                for (o = 0; o < x.length; o++) x[o].start / 100 <= c && x[o].end / 100 >= c ? p.showBox(o) : p.hideBox(o)
        };
        g.showAll = function() {
            if (p)
                for (o = 0; o < u; o++) p.showBox(o)
        };
        C = $('<div class="mm-preview no-events"><canvas class="mm-canv"></canvas><img class="mm-img"/></div>').insertAfter(c);
        U(k, s);
        j.show()
    }

    function ta(d) {
        c() ? d.mm.addTextAuto() : upgradeBox("You can add <b>unlimited</b> textboxes and get a bunch of other cool upgrades with Imgflip Pro!", oa + "_text")
    }

    function c() {
        return I.user && I.user.pro
    }

    function s(c) {
        _gaq.push(["_trackEvent"].concat(c))
    }
    var Ba = +new Date,
        Z = $(".g-preview-wrap"),
        oa = 0 === S.location.pathname.search(/\/gifgenerator/) ? "vgif" : "igif";
    (function(d, j) {
        function k() {
            return c() ? 9999 : 360
        }

        function W(a) {
            M = Math.max(a >> 0, 5)
        }

        function T(a) {
            q = Math.max(a >> 0, 20);
            b && b.setDimensions(q,
                r);
            B();
            y();
            z()
        }

        function h(a) {
            r = Math.max(a >> 0, 20);
            b && b.setDimensions(q, r);
            B();
            y();
            z()
        }

        function g(a) {
            ba = 1 > a ? 1 : 10 < a ? 10 : a >> 0
        }

        function o() {
            $("#igif-upload input").change(A);
            $("#make-gif").click(U);
            $("#igif-auto-arrange").click(x);
            na.resize(debounce(z));
            ea.on("click", ".reset", function() {
                s(["igif_reset", c() ? "pro" : "basic", I.user.id ? "logged-in" : "anon"]);
                w()
            }).on("click", ".g-add-text", L).on("click", ".g-crop", p).on("click", ".mm-another-text", function() {
                ta(b)
            }).on("click", ".g-reverse", function() {
                l = $(this).prop("checked")
            }).on("click",
                ".g-rotate", H)
        }

        function p() {
            $(".g-crop").hide();
            u();
            b.initCropper()
        }

        function L() {
            $(".g-add-text").hide();
            u();
            b.initCaptioner()
        }

        function u() {
            b || (b = new sa($("#igif-preview"), $(".g-overlay-settings"), q, r))
        }

        function w() {
            X && ($("#igif").addClass("g-no-media"), clearTimeout(N), $("#igif-upload input, #igif-title").val(""), $("#igif-arrange").html(""), $("#igif-tags").val("gifs,"), $(".g-add-text,.g-crop").show(), $(".mm-opts").hide(), b && (b.destroy(), b = void 0), a = [], F = [], r = q = 200, M = 500, ba = 10, Y.set(q), ca.set(r), ga.set(M),
                ha.set(ba), O.width = q, O.height = r, $("#igif-final").remove())
        }

        function y() {
            a.length && (m = 0, clearTimeout(N), N = setTimeout(E, M))
        }

        function E() {
            a[m] && ia.drawImage(a[m].img, 0, 0, a[m].img.width, a[m].img.height, 0, 0, q, r);
            b && a.length && b.setProgress(m / (a.length - 1));
            l ? m-- : m++; - 1 === m ? m = a.length - 1 : m === a.length && (m = 0);
            N = setTimeout(E, M)
        }

        function B() {
            if (a.length) {
                $("#igif-arrange").html("");
                O.width = q;
                O.height = r;
                var c = q / r;
                q > r ? (P = ja, J = P / c) : (J = ja, P = c * J);
                for (var f = 0; f < a.length; f++) a[f] && (a[f].thumb.width = P, a[f].thumb.height =
                    J, c = a[f].thumb.getContext("2d"), c.fillStyle = "#fff", c.fillRect(0, 0, P, J), c.drawImage(a[f].img, 0, 0, a[f].img.width, a[f].img.height, 0, 0, P, J), $("#igif-arrange").append($('<div class="igif-canv-wrap">').html(a[f].thumb).append('<div class="igif-canv-label">' + a[f].file.name + "</div>")))
            }
        }

        function A(c) {
            function f() {
                for (var c = 0, b = 0; b < l; b++) a[b] && a[b].img.complete && c++;
                if (0 < c) {
                    if (V) {
                        var b = a[0].img.width,
                            d = a[0].img.height;
                        if (b > G || d > G) b > d ? (d *= G / b, b = G) : (b *= G / d, d = G);
                        if (!b || !d) b = d = 200;
                        Y.set(Math.round(b));
                        ca.set(Math.round(d))
                    }
                    B();
                    y();
                    z()
                }
                c < l && 20 > n++ && setTimeout(f, 50)
            }
            F = c.target.files;
            var c = [],
                b = a.length,
                V = 0 === b,
                i, d;
            for (d = 0; i = F[d]; d++) i.type.match("^image") && c.push(i);
            var h = c.length;
            a.length += h;
            for (d = 0; d < h; d++) {
                i = c[d];
                var g = new FileReader;
                g.onload = function(f, c) {
                    return function(b) {
                        var d = j.createElement("canvas"),
                            i = new Image;
                        i.src = b.target.result;
                        var V = new Image;
                        V.src = b.target.result;
                        a[c] = {
                            file: f,
                            img: i,
                            thumb: d,
                            original: V,
                            rotation: 0
                        }
                    }
                }(i, d + b);
                g.readAsDataURL(i)
            }
            var l = a.length,
                n = 0;
            l && (f(), $("#igif").removeClass("g-no-media"))
        }

        function z() {
            function c(Q) {
                w = h.outerWidth();
                e = h.outerHeight();
                g = i.offset();
                l = g.top;
                r = g.left;
                n = i.width() / w >> 0;
                q = Math.ceil(d / n);
                j = $(this);
                j.addClass("hovering");
                u = D.offset();
                Q.preventDefault();
                o = Q.clientX;
                p = Q.clientY;
                m = (j.offset().left + w / 2 - r) / w >> 0;
                m > n - 1 ? m = n - 1 : 0 > m && (m = 0);
                k = 0;
                d > n && (k = (j.offset().top + e / 2 - l) / e >> 0, k >= q ? k = q - 1 : 0 > k && (k = 0));
                s = m + n * k;
                ea.on("vmousemove", f).on("vmouseup", b)
            }

            function f(Q) {
                x = j.offset();
                var a = (x.left + w / 2 - r) / w >> 0;
                a > n - 1 ? a = n - 1 : 0 > a && (a = 0);
                var c = (x.top + e / 2 - l) / e >> 0;
                c >= q && (c = q - 1);
                0 > c && (c =
                    0);
                a + c * n >= d && (a = d - c * n - 1);
                var f = a + n * c;
                f !== s && (C(s, f), o += (a - m) * w, p += (c - k) * e, m = a, k = c, s = f);
                j.css({
                    top: Q.clientY - p,
                    left: Q.clientX - o
                });
                A = na.scrollTop() + Q.clientY;
                A > u.top && A < u.top + D.height() && Q.clientX > u.left && Q.clientX < u.left + D.width() ? D.addClass("on") : D.removeClass("on")
            }

            function b() {
                ea.off("vmouseup", b).off("vmousemove", f);
                if (D.hasClass("on")) {
                    var e = s;
                    a[e] && (clearTimeout(N), a.splice(e, 1), B(), y(), z());
                    D.removeClass("on")
                } else j.css({
                    top: 0,
                    left: 0
                }).removeClass("hovering");
                y()
            }
            var d = a.length;
            if (!(1 > d)) {
                var i =
                    $("#igif-arrange"),
                    h = i.find(".igif-canv-wrap"),
                    g, l, r, n, q, j, o, p, m, k, s, x, u, A, w, e;
                h.off("vmousedown").on("vmousedown", c)
            }
        }

        function C(c, f) {
            if (c === f) return !1;
            var b = $(".igif-canv-wrap:eq(" + c + ")");
            f < c ? b.insertBefore($(".igif-canv-wrap:eq(" + f + ")")) : b.insertAfter($(".igif-canv-wrap:eq(" + f + ")"));
            var d = Array(a.length),
                i = 0;
            $(".igif-canv-wrap canvas").each(function() {
                for (var c = 0; c < a.length; c++)
                    if (a[c].thumb === this) {
                        d[i++] = a[c];
                        break
                    }
            });
            a = d
        }

        function H() {
            clearTimeout(N);
            for (var c = j.createElement("canvas"), f = c.getContext("2d"),
                    b, d, i = 0; i < a.length; i++) b = a[i].img.width, d = a[i].img.height, a[i].rotation = 270 === a[i].rotation ? 0 : a[i].rotation + 90, c.width = d, c.height = b, f.save(), f.translate(d / 2, b / 2), f.rotate(2 * (a[i].rotation / 360) * Math.PI), f.translate(-a[i].original.width / 2, -a[i].original.height / 2), f.drawImage(a[i].original, 0, 0), f.restore(), a[i].img.src = c.toDataURL();
            b = $("#igif-height").val();
            ca.set($("#igif-width").val());
            Y.set(b)
        }

        function x() {
            clearTimeout(N);
            a.sort(function(a, c) {
                var b = parseInt(a.file.name),
                    d = parseInt(c.file.name);
                return b !==
                    d ? b > d ? R : -1 * R : a.file.name > c.file.name ? R : -1 * R
            });
            R *= -1;
            B();
            y();
            z()
        }

        function U() {
            if (a.length) {
                var c = $("#igif-width").val(),
                    b = $("#igif-height").val();
                if (c > k() || b > k()) return upgradeBox("You can make GIFs larger than " + k() + "x" + k() + " and get other cool upgrades with Imgflip Pro!", "igif_max_width"), !1;
                var d = $("#igif .gen-private").prop("checked");
                d || preloadShareScript();
                loading("Computing...");
                S(function(a) {
                    loading(!1);
                    Z(a, d)
                })
            }
        }

        function S(c) {
            var f = {
                x: 0,
                y: 0,
                w: q,
                h: r
            };
            b && b.cropper && (f = b.getFinalCropVals(q, r));
            var h = new GIF({
                    workers: d.workers || 4,
                    quality: ba,
                    width: f.w,
                    height: f.h
                }),
                g = $("<canvas>")[0];
            g.width = f.w;
            g.height = f.h;
            var g = g.getContext("2d"),
                i;
            b && b.mm && (i = b.mm.canv());
            for (var j, k, m, o, n, p = 0; p < a.length; p++) n = l ? a.length - 1 - p : p, j = Math.round(a[n].img.width / q * f.x), k = Math.round(a[n].img.height / r * f.y), m = Math.round(a[n].img.width / q * f.w), o = Math.round(a[n].img.height / r * f.h), g.drawImage(a[n].img, j, k, m, o, 0, 0, f.w, f.h), i && (b.setProgress(n / (a.length - 1)), j = Math.round(i.width / q * f.x), k = Math.round(i.height / r * f.y), m = Math.round(i.width /
                q * f.w), o = Math.round(i.height / r * f.h), g.drawImage(i, j, k, m, o, 0, 0, f.w, f.h)), signCanvas(g, f.w, f.h), h.addFrame(g, {
                copy: !0,
                delay: M
            });
            h.on("progress", progress);
            h.on("finished", function(a) {
                var b = new FileReader;
                b.onload = function(a) {
                    c(a.target.result)
                };
                b.readAsDataURL(a)
            });
            h.render()
        }

        function Z(a, b) {
            var g = !1;
            if (0.75 * a.length > (c() ? 16E6 : 4E6)) g = b = !0;
            imgDonePopup(a, !0);
            var h = $("#igif-title").val();
            $.ajax({
                url: "/gifdoneImages",
                type: "post",
                data: {
                    title: h,
                    imgData: a.substr(a.search(",") + 1),
                    tags: $("#igif-tags").val(),
                    nsfw: $("#igif .gen-nsfw").prop("checked") ? 1 : "",
                    "private": b ? 1 : "",
                    anon: $("#igif .gen-anon").prop("checked") ? 1 : ""
                },
                success: function(a) {
                    a ? fa(JSON.parse(a), b, g, h) : alert("Oh noez! Bad image data - make sure you're using a modern browser, such as Google Chrome")
                },
                error: function() {
                    loading(!1);
                    d.imgDoneBox.hide();
                    DLG("Error generating GIF", "Try again in a minute.")
                }
            })
        }

        function fa(a, b, g, h) {
            imgDone(a, b, "gif", function() {
                d.location = "/images-to-gif"
            }, h || "An animated GIF");
            g && (a = "<p>Image was automatically set to private (not stored on imgflip.com) because the size exceeded " +
                (c() ? 16E6 : 4E6) / 1E6 + "MB.", c() || (a += ' To save larger GIFs directly on imgflip, and for more cool features, check out <a style="color:#fff" href="/pro?from=igif_max_filesize">Imgflip Pro</a>!'), $("#doneLinks").append(a + "</p>"))
        }
        if ("igif" === oa) {
            var a = [],
                Y, ca, ga, ha, X = !1,
                N, F, O, ia, D, ba, M, m, q, r, P, J, b, l = !1,
                G = 300,
                ja = 116;
            (d.igif = {}).init = function() {
                X || (X = !0, !d.File || !d.FileReader || !d.FileList || !d.Blob ? alert("The File APIs are not fully supported in this browser. Please install Chrome, Firefox or another modern browser.") :
                    (O = $("#igif-preview")[0], ia = O.getContext("2d"), D = $("#igif-remove"), Y = new Slider("#igif-width", "#wSlide", 0, {
                        min: 10,
                        max: c() ? 1080 : 360,
                        update: T
                    }), ca = new Slider("#igif-height", "#hSlide", 0, {
                        min: 10,
                        max: c() ? 1080 : 360,
                        update: h
                    }), ga = new Slider("#igif-delay", "#delaySlide", 0, {
                        min: 10,
                        max: 1E3,
                        update: W
                    }), ha = new Slider("#igif-quality", "#qualitySlide", 0, {
                        min: 1,
                        max: 10,
                        update: g
                    }), $("#igif-tags").autotag({
                        items: tagArray,
                        maxTags: 6
                    }), o(), w()))
            };
            var R = !0
        }
    })(S, ma);
    (function(d) {
        function j() {
            return c() ? 180 : 50
        }

        function k() {
            return c() ?
                40 : 10
        }

        function W() {
            return c() ? 12E6 : 35E5
        }

        function T() {
            return c() ? 7E7 : 35E6
        }

        function h(e, a, c) {
            d.scrollTo(0, 0);
            "g" === e && (e = "Generating Gif... this may take several seconds.");
            switch (c) {
                case D:
                    c = "#f44";
                    break;
                case ba:
                    c = "#3a3";
                    break;
                case M:
                    c = "#f70";
                    break;
                default:
                    c = "#333"
            }
            $("#gif-msg").css({
                display: e || a ? "block" : "none",
                opacity: 0,
                color: c
            }).animate({
                opacity: 1
            }, 300).find("img").css({
                display: a ? "block" : "none"
            }).next().html(e || "")
        }

        function g() {
            var e = parseFloat(ra.val()),
                a = parseFloat(pa.val()),
                c = parseFloat(n.val()),
                b = (c - a) * e >> 0;
            0 > b ? b = 0 : b > j() && (e *= j() / b, b = j());
            var d = la.val() * ka.val() * b;
            d > W() && (e *= W() / d, b = (c - a) * e >> 0, d = W());
            var f = "#4c4";
            5 >= e ? f = "#f33" : 10 >= e && (f = "#f90");
            ua.find(".text").html(e.toFixed(1) + " FPS");
            ua.find(".fill").css({
                background: f,
                width: e > r ? "100%" : 100 * (e / r) + "%"
            });
            wa.find(".text").html(b + "/" + j() + " frames used");
            wa.find(".fill").width(100 * (b / j()) + "%");
            ya.find(".text").html((d / 1E6).toFixed(1) + "M/" + (W() / 1E6).toFixed(1) + "M px used");
            ya.find(".fill").width(100 * (d / W()) + "%");
            a = c - a;
            c = a > k() ? "#f33" : "";
            xa.find(".text").html(Math.round(a) +
                "/" + k() + " seconds used");
            xa.find(".fill").css({
                background: c,
                width: a > k() ? "100%" : 100 * (a / k()) + "%"
            })
        }

        function o() {
            $("#vgif").addClass("g-no-media");
            v = null;
            i = b = l = 0;
            for (var e = 32, a = ""; e--;) a += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [62 * Math.random() >> 0];
            K = a;
            $("#ran2").val("");
            $("#youtube-id").val("");
            $("#video-src").val("");
            $(".sz").removeClass("on");
            $(".z1").addClass("on");
            t && (t.destroy(), t = void 0);
            X();
            va ? va = !1 : (ja.set(r), R.set(100), aa.set(0), f.set(0));
            v && G.update();
            $("#vidInfo").add(Z).html("");
            $("#related-gifs").html("");
            $("#yt-dl-wrap").remove();
            $(".g-add-text,.g-crop").show();
            $("#vgif-play,#frame-label,.mm-opts,#related-wrap").hide();
            $("#url").prop("disabled", !1);
            $("#vgif-upload-panel").removeClass("hidden");
            h()
        }

        function p() {
            var e = parseFloat(pa.val()),
                a = parseFloat(n.val());
            if (!(!b && !l || e >= a)) {
                t && t.setProgress(0);
                u();
                L(e);
                b ? b.playVideo() : l && l.play();
                var c = w();
                clearTimeout(qa);
                (function Ca() {
                    var b = w();
                    b === c && (b = e);
                    t && t.setProgress((b - e) / (a - e));
                    b >= a ? (u(), t && t.showAll()) : qa = setTimeout(Ca,
                        5)
                })()
            }
        }

        function L(e) {
            b && b.seekTo ? b.seekTo(e) : l && (l.currentTime = e)
        }

        function u() {
            b && b.pauseVideo ? b.pauseVideo() : l && l.pause && l.pause()
        }

        function w() {
            if (b && b.getCurrentTime) return b.getCurrentTime();
            if (l) return l.currentTime
        }

        function y(e, a, c, d) {
            v = {};
            v.w = a;
            v.h = c;
            v.scale = a / c;
            v.dur = e;
            var g = ia,
                h = c / a * ia >> 0;
            $("#vgif-upload-panel").addClass("hidden");
            $("#vidInfo").html(e + "s @ " + a + "x" + c);
            la.val(g);
            ka.val(h);
            $("#yt-dl-wrap").remove();
            $("#vgif").removeClass("g-no-media");
            (b || l) && $("#vgif-play").show();
            G.update();
            aa.max(e);
            f.max(e);
            0 == n.val() && f.set(Math.min(2.5, e));
            b && b.mute ? b.mute() : l && (l.muted = !0);
            u();
            d || (Z.html("<img id='vgif-preview' class='shadow' width='" + m + "' src='/tempUploads/" + K + ".jpg?lolz=" + (new Date).getTime() + "'/>").show(), $("#frame-label").show());
            $("#vgif-tags").autotag({
                items: tagArray,
                maxTags: 6
            })
        }

        function E(e) {
            P ? (h("Initializing Youtube", !0), Z.html('<div id="yt-replace-me"></div>').show(), b = new YT.Player("yt-replace-me", {
                width: m,
                height: q,
                videoId: e,
                playerVars: {
                    cc_load_policy: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    theme: "light",
                    origin: "https://imgflip.com"
                },
                events: {
                    onReady: function() {
                        h();
                        y(b.getDuration(), 400, 226, !0)
                    }
                }
            }), B(e), $("#video-src").val(e), $("#youtube-id").val(e), S(e)) : J = function() {
                E(e)
            }
        }

        function B(e) {
            $.ajax({
                url: "/ajax_get_video_from_url",
                dataType: "json",
                data: "url=" + e + "&ran=" + K,
                success: function(a) {
                    a.error ? (s(["video_url_error", "downloadAsync: " + a.error, e, F()]), error_dialog(a.error)) : A(a)
                },
                error: function() {
                    DLG("Error Downloading Video", 'Sorry about that. Hit "reset" and then re-enter the video URL.')
                }
            })
        }

        function A(e) {
            if (v) {
                v.w = e.w;
                v.h = e.h;
                v.scale = e.w / e.h;
                v.dur = e.dur;
                var a = e.h / e.w * la.val() >> 0;
                aa.max(v.dur);
                f.max(v.dur);
                n.val() > v.dur && (n.val((10 * v.dur >> 0) / 10), f.update());
                $("#vidInfo").html(e.dur + "s @ " + e.w + "x" + e.h);
                ka.val(a);
                g();
                $("#ran2").val(K)
            } else setTimeout(function() {
                A(e)
            }, 50)
        }

        function z() {
            var e = $("#url").val().trim();
            if (e === V || "" === e || 11 > e.length) return !1;
            var a = 0,
                b = /youtu\.be\/([a-zA-Z0-9\-_]{11})|v=([a-zA-Z0-9\-_]{11})|(^[a-zA-Z0-9\-_]{11}$)/.exec(e);
            if (b) a = b[1] || b[2] || b[3];
            else if (/\b(youtu\.be|youtube\.com)\//.test(e)) return h("Invalid Youtube URL. Make sure the URL contains the 11-character video ID (eg 9bZkp7q19f0)", !1, D), s(["video_url_error", "invalid youtube url", e, F()]), !1;
            if (!a) {
                var d = [];
                C(e, function(a) {
                    d.push(a);
                    return ""
                });
                if (!d[0]) return h('Invalid URL: A valid URL generally starts with "http" and does not contain spaces', !1, D), s(["video_url_error", "no valid urls", e, F()]), !1;
                e !== d[0] && (e = d[0], $("#url").val(e))
            }
            V = e;
            o();
            s(["video_url_valid", O(e), e, F()]);
            a ? (s(["video_url_youtube", a, O(e), F()]), h("Checking Youtube video", 1), z.youtubeAPIRequested || ($.getScript("https://www.youtube.com/player_api"), z.youtubeAPIRequested = !0), $.ajax({
                url: "/ajax_get_video_size",
                dataType: "json",
                data: {
                    url: a
                },
                success: function(b) {
                    h();
                    if (b.manual_download) {
                        $("#yt-dl-wrap").remove();
                        $("#vgif .g-settings-section").prepend('<div id="yt-dl-wrap"><b>You\'re the first one to use this video!</b> If you <span class="a show-login">login</span> or <span class="a show-login">signup</span>, you\'ll be able to use any Youtube video seamlessly (it\'s free). If you prefer not to login, you can <a target="_blank" href="https://www.google.com?q=download youtube videos">download the Youtube video yourself</a>, and then upload it by clicking the "Upload Video" button.<div class="yt-login b but show-login">Login for free</div></div>')
                    } else if (b.error) {
                        s(["video_url_error",
                            "ajax_get_video_size: " + b.error, e, F()
                        ]);
                        error_dialog(b.error)
                    } else if (b.filesize > T()) {
                        b = "That video's file size is " + Math.round(b.filesize / 1E6) + "MB.";
                        c() ? error_dialog(b + " Videos must be smaller than " + T() / 1E6 + "MB.") : upgradeBox(b + " You can use videos larger than " + T() / 1E6 + "MB and get other cool upgrades with Imgflip Pro!", "yt_filesize")
                    } else E(a)
                }
            })) : (h("Downloading Video", 1), $("#video-src").val(e), $.ajax({
                url: "/ajax_get_video_from_url",
                type: "get",
                dataType: "json",
                data: {
                    url: e,
                    ran: K,
                    getImg: 1
                },
                success: function(a) {
                    h();
                    a.error ? (s(["video_url_error", "getVideoFromUrl: " + a.error, e, F()]), !c() && "Video must be under 35MB" === a.error ? upgradeBox("You can use videos larger than " + T() / 1E6 + "MB and get other cool upgrades with Imgflip Pro!", "non_yt_filesize") : error_dialog(a.error)) : ($("#ran2").val(K), y(a.dur, a.w, a.h, !1))
                }
            }));
            return !0
        }

        function C(a, c, b) {
            b || (b = {});
            var d = /(?:((?:\b[a-z][a-z0-9.+-]*:)?\/\/)|\bwww\.)/gi,
                f = /[\s\r\n]|$/,
                g = /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/,
                h = /[a-z0-9-]=["']?$/i;
            for (d.lastIndex =
                0;;) {
                var i = d.exec(a);
                if (!i) break;
                i = i.index;
                if (b.ignoreHtml) {
                    var j = a.slice(Math.max(i - 3, 0), i);
                    if (j && h.test(j)) continue
                }
                var j = i + a.slice(i).search(f),
                    k = a.slice(i, j).replace(g, "");
                if (!b.ignore || !b.ignore.test(k)) j = i + k.length, k = c(k, i, j, a), a = a.slice(0, i) + k + a.slice(j), d.lastIndex = i + k.length
            }
            d.lastIndex = 0;
            return a
        }

        function H() {
            clearTimeout(za);
            za = setTimeout(z, 200)
        }

        function x() {
            da.val() && (h("Getting Video Info", 1), $.ajax({
                dataType: "json",
                url: "/ajax_get_video_info",
                data: {
                    ran: K,
                    getImg: 1
                },
                success: function(a) {
                    h();
                    a.error ? error_dialog(a.error) : (y(a.dur, a.w, a.h, !1), $("#ran2").val(K))
                }
            }))
        }

        function U(a, b) {
            la.val(a);
            ka.val(a / v.scale >> 0);
            $(".sz").removeClass("on");
            $(b).addClass("on");
            G.update();
            g()
        }

        function S(a) {
            var b = na.width();
            1400 > b || (b = Math.min((b - 1080) / 2 >> 0, 300), $("#related-wrap").fadeOut(), $.ajax({
                url: "/ajax_get_related_gifs",
                data: "youtube_id=" + a,
                success: function(a) {
                    for (var e = "", c, a = JSON.parse(a), d = 0; d < a.length; d++) c = a[d].id.toString(36), e += '<a href="/gif/' + c + '"><img src="//i.imgflip.com/2/' + c + '.jpg"/></a>';
                    e && ($("#related-gifs").html(e), $("#related-wrap").width(b).fadeIn(), hoverGifs("#related-gifs"))
                }
            }))
        }

        function ea(a) {
            if (a) {
                o();
                var b;
                if (d.File) {
                    b = da[0].files[0];
                    if (0 === b.size || b.size > (c() ? 1E8 : 35E6)) {
                        h();
                        0 === b.size ? error_dialog("This video's file size is zero :(") : (s(["gifgen video upload size limit", c() ? "pro" : "basic", I.user.id ? "logged-in" : "anon"]), a = "This video's file size is " + Math.round(b.size / 1E6) + "MB.", c() ? error_dialog(a + " Videos must be smaller than " + (c() ? 1E8 : 35E6) / 1E6 + "MB") : upgradeBox(a + " You can upload videos larger than " +
                            (c() ? 1E8 : 35E6) / 1E6 + "MB and get more awesome upgrades with Imgflip Pro!", "upload_filesize"));
                        s(["video_upload_error_filesize", fa(b, !1), b.type + " " + da.val(), b.size]);
                        return
                    }
                    var a = ma.createElement("video"),
                        a = a.canPlayType ? a.canPlayType(b.type) : "",
                        f = navigator.userAgent,
                        g = ("probably" === a || a && -1 !== f.search(/chrom/i) && -1 === f.search(/android/i)) && Aa;
                    g && (a = Aa(b), a = $('<video id="vgif-preview" width="' + m + '" controls><source type="' + b.type + '" src="' + a + '"></source></video>'), l = a[0], a.one("canplay", function() {
                        y(l.duration.toFixed(2),
                            l.videoWidth, l.videoHeight, !0)
                    }), Z.html(a).show())
                }
                h("Uploading Video", 1);
                $("#url").prop("disabled", !0);
                $("#videoUpFrame").off("load").on("load", function() {
                    $("#url").prop("disabled", !1);
                    h();
                    g ? $("#ran2").val(K) : x();
                    s(["video_upload_loaded", fa(b, g), (b ? b.type + " " : "") + da.val(), b ? b.size : 0])
                });
                s(["video_upload_valid", fa(b, g), (b ? b.type + " " : "") + da.val(), b ? b.size : 0]);
                $("#vgif-upform").attr("target", "videoUpFrame").find('input[name="ran"]').val(K).end().submit()
            }
        }

        function fa(a, b) {
            return "" + (I.user.id ? "logged-in" :
                "logged-out") + (c() ? " pro" : " non-pro") + (a ? " FileSupport" : "") + (b ? " instantHTML5" : "")
        }

        function a() {
            $("#url").bind("paste", H).change(H).keyup(H);
            da.change(function() {
                ea($(this).val())
            });
            $(".z0").click(function() {
                U(100, this)
            });
            $(".z1").click(function() {
                U(260, this)
            });
            $(".z2").click(function() {
                U(360, this)
            });
            $(".z3").click(function() {
                c() ? U(480, this) : upgradeBox("You can make bigger GIFs with Imgflip Pro!", "width_480")
            });
            $(".show-adv").click(function() {
                var a = $(".adv"),
                    b = $(".g-show-adv");
                "none" === a.css("display") ?
                    (a.slideDown(200), b.text("Less Options \u25b2")) : (a.slideUp(200), b.text("More Options \u25bc"))
            });
            $("#vgif-play").click(p);
            $("#vgif").on("mousedown", ".m", u).on("click", ".reset", function() {
                s(["vgif_reset", c() ? "pro" : "basic", I.user.id ? "logged-in" : "anon"]);
                o();
                $("#vgif-upload input,#url").val("");
                V = ""
            }).on("click", ".mm-another-text", function() {
                ta(t)
            });
            $(".g-add-text").click(ca);
            $(".g-crop").click(Y);
            $("#vgif-form").submit(N)
        }

        function Y() {
            $(".g-crop").hide();
            ga();
            t.initCropper()
        }

        function ca() {
            $(".g-add-text").hide();
            ga();
            t.initCaptioner()
        }

        function ga() {
            if (!t) {
                var a = b ? $("#yt-replace-me") : $("#vgif-preview");
                t = new sa(a, $(".g-overlay-settings"), v.w, v.h, b ? 30 : 0)
            }
        }

        function ha(a) {
            g();
            (b || l) && Da(a)
        }

        function X() {
            if (!X.done) {
                X.done = !0;
                var a = $("#vgif .g-preview-section").width() - 4;
                G = new Slider("#vw", "#vwSlide", 0, {
                    min: 10,
                    max: c() ? 640 : 360,
                    update: function(a) {
                        g();
                        ka.val(a / v.scale >> 0)
                    }
                });
                ja = new Slider("#fps", "#fpsSlide", 0, {
                    min: 1,
                    max: 30,
                    step: 0.1,
                    update: g
                });
                R = new Slider("#speed", "#speedSlide", 0, {
                    min: 10,
                    max: 300,
                    step: 0.1
                });
                aa = new Slider("#vstart",
                    "#durSlide", 1, {
                        step: 0.01,
                        sliderWidth: a,
                        update: ha,
                        fill: !0,
                        markWidth: 24
                    });
                f = new Slider("#end", "#durSlide", 2, {
                    step: 0.01,
                    sliderWidth: a,
                    update: ha,
                    fill: !0,
                    markWidth: 24
                });
                aa.rightBound(f);
                f.leftBound(aa)
            }
        }

        function N() {
            var a = {},
                b;
            $("#vgif-form").find("*").quickEach(function() {
                (b = this.attr("name")) && (a[b] = "checkbox" === this.attr("type") ? this.prop("checked") ? 1 : 0 : this.val())
            });
            var f = a.vw,
                g = a.vh,
                j = a.start = parseFloat(pa.val()),
                l = a.end = parseFloat(n.val());
            if (f > (c() ? 640 : 360) && !c()) return upgradeBox("You can make GIFs wider than " +
                (c() ? 640 : 360) + "px and get other cool upgrades with Imgflip Pro!", "max_width"), !1;
            if (1 > a.fps || 30 < a.fps) return MSG("Valid Fps range is 1 to 30", "red"), !1;
            if (1 > a.speed) return MSG("Speed must be greater than 1%", "red"), !1;
            if (1 > f || 1 > g || f * g > (c() ? 2073600 : 96E4)) return MSG("Invalid gif dimensions.", "red"), !1;
            if (l - j > k()) return c() ? MSG("Choose a video segment less than " + k() + " seconds", "red") : upgradeBox("You can use video segments longer than " + k() + " seconds with Imgflip Pro!", "max_dur"), !1;
            if (0 > j) return MSG("Start time cannot be less than 0",
                "red"), !1;
            if (j >= l) return MSG("Start time cannot be greater than end time", "red"), !1;
            if (l > v.dur) return MSG("End time cannot be greater than the video duration", "red"), !1;
            if ("" === a.ran2) return i || h("Waiting for download to complete", 1, M), i = setTimeout(function() {
                $("#vgif-form").submit()
            }, 100), !1;
            clearTimeout(i);
            if (t && (j = f / t.displayWidth(), l = g / t.displayHeight(), t.mm && (a.meme_data = JSON.stringify(t.memeData(j, l))), t.cropper)) a.crop_vals = JSON.stringify(t.getFinalCropVals(f, g));
            a["private"] || preloadShareScript();
            h();
            loading("Generating GIF...");
            $.ajax({
                url: "/ajax_gif_done",
                type: "post",
                dataType: "json",
                data: a,
                success: function(b) {
                    loading(!1);
                    if (b.errors[0]) DLG("Error generating GIF", b.errors.join("<br/>"));
                    else {
                        imgDonePopup();
                        var c = $('<div class="done-info">' + b.info_display + "</div>");
                        $("#doneImage").after(c);
                        b.msgs[0] && c.after('<div class="done-msgs"><li>' + b.msgs.join("</li><li>") + "</li></div>");
                        imgDone(b, a["private"], "gif", function() {
                            d.location = "/gifgenerator"
                        }, a.title || "An animated GIF")
                    }
                },
                error: function() {
                    loading(!1);
                    DLG("Error generating GIF", "Try again in a minute.")
                }
            });
            return !1
        }

        function F() {
            return +new Date - Ba
        }

        function O(a) {
            var b = ma.createElement("a");
            b.href = a;
            return b.hostname
        }
        if ("vgif" === oa) {
            var ia = 260,
                D = 2,
                ba = 3,
                M = 4,
                m = Math.min(420, $(".g-preview-section").width()),
                q = 2 / 3 * m,
                r = 20,
                P = !1,
                J, b, l, G, ja, R, aa, f, va = !0,
                V, i, K, t, ra = $("#fps"),
                pa = $("#vstart"),
                n = $("#end"),
                la = $("#vw"),
                ka = $("#vh"),
                ua = $("#vgif-fps"),
                wa = $("#vgif-frames"),
                xa = $("#vgif-dur"),
                ya = $("#vgif-pixels"),
                da = $("#vgif-upload-input"),
                Aa = d.URL && URL.createObjectURL.bind(URL) ||
                d.webkitURL && webkitURL.createObjectURL.bind(webkitURL) || d.createObjectURL,
                qa, Da = debounce(function(a) {
                    clearTimeout(qa);
                    u();
                    L(a)
                }, 100);
            d.onYouTubeIframeAPIReady = function() {
                P = !0;
                J && J()
            };
            var za;
            d.msg = h;
            $(function() {
                v = null;
                var b = $("#url").val();
                b && "Paste any video URL" !== b && H();
                a()
            })
        }
    })(S);
    webkitWarn("Imgflip GIF Generator");
    hoverGifs("#mm-recs");
    var ra = +new Date;
    S.onerror = function(c, j, k) {
        s(["jsError", c, j + " [" + k + "]", +new Date - ra])
    }
})(window, document, $w, $d);