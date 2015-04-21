(function(p, ga, ha, O, na) {
    function ba(c, d, n, p) {
        function v() {
            s.hide();
            $(ga).off("click", v)
        }

        function A(d) {
            z.val(d);
            c.css("background", d);
            v();
            p(d)
        }

        function w(c) {
            return function() {
                A(n[c])
            }
        }
        c.addClass("picker");
        for (var s = $("<div/>", {
                "class": "pickpop"
            }), j = $("<div/>", {
                "class": "colorPanel"
            }), z = $("<input/>", {
                "class": "color-input",
                type: "text",
                value: n[d],
                maxlength: 7,
                tabindex: -1
            }), q, u = 0; u < n.length; u++) q = $("<div/>", {
            "class": "colorBox",
            css: {
                background: n[u]
            }
        }), q.click(w(u)), j.append(q);
        z.change(function() {
            A(z.val())
        });
        s.click(cancelEvent).html(j.append(z));
        c.css("background-color", n[d]).click(function(c) {
            cancelEvent(c);
            "none" === s.css("display") ? (s.show(), O.click(v)) : v()
        }).html(s)
    }

    function P(c, d, n) {
        var d = d ? 1 : "",
            B = $(".gen-anon").prop("checked") && !d ? 1 : "",
            v = $(".gen-private").prop("checked") && !d ? 1 : "",
            A = -1 != p.location.href.search("memegenerator");
        if (mm.useCanvas) {
            var w = mm.ctx(),
                s = mm.canv(),
                j = mm.setMeme(),
                z = mm.getText(),
                q = Math.min(460, j.w),
                u;
            s.width < q && (u = s.width, mm.setWidth(q));
            signCanvas(w, s.width, s.height);
            w = s.toDataURL("image/jpeg");
            u && mm.setWidth(u);
            A && Q(w, !0);
            u = mm.memeData();
            for (q = 0; q < u.boxes.length; q++)
                if (s = u.boxes[q], "image" === s.type && 0.5 < s.w / j.w && 0.5 < s.h / j.h) {
                    u.template = 0;
                    break
                }
            $.extend(u, {
                imgData: w.substr(w.search(",") + 1),
                meme: j.name,
                text: z,
                type: "jpeg",
                anon: B,
                "private": v,
                isReply: d,
                stream_id: +n
            });
            $.ajax({
                url: "/ajax_meme_done_canvas",
                type: "post",
                data: u,
                success: function(d) {
                    if (d) {
                        d = JSON.parse(d);
                        d.error === "s3" ? c(d, true) : c(d, v)
                    } else alert("Oh noez! Bad image data - make sure you're using a modern browser");
                    _gaq.push(["_trackEvent",
                        "memedoneCanvas " + (d ? "Success" : "Failure"), j.id + " - " + j.name, I.user.user || "anon"
                    ])
                }
            })
        } else d = $.extend(mm.memeData(), {
            anon: B,
            "private": v,
            isReply: d,
            stream_id: +n
        }), loading("Generating Meme..."), $.ajax({
            url: "/ajax_meme_done",
            type: "post",
            data: d,
            success: function(d) {
                loading(!1);
                d ? (A && Q(), c(JSON.parse(d), v)) : alert("Error making meme ;(");
                _gaq.push(["_trackEvent", "memedoneAjax " + (d ? "Success" : "Failure"), "derp", I.user.user || "anon"])
            }
        })
    }

    function ia(c, d) {
        V(c, d, "meme", function() {
                mm.reset();
                imgDoneBox.hide()
            }, mm.setMeme().name ||
            "Untitled")
    }

    function W() {
        X || (X = !0, $.getScript("//s.po.st/static/v3/post-widget.js"))
    }

    function Q(c, d) {
        W();
        p.scrollTo(0, 0);
        p.imgDoneBox = new Box({
            html: '<div id="done"><img id="doneImage"' + (c ? ' src="' + c + '"' : "") + '/><div><div id="doneShare"></div><div id="doneUrl">' + (d ? '<img src="//s.imgflip.com/preloader.gif"/>' : "") + '</div></div><div id="doneLinks"></div></div>',
            bg: "transparent",
            top: 20,
            hideX: !0,
            noMaskClick: !0
        })
    }

    function V(c, d, n, B, v) {
        _gaq.push("_trackPageview");
        var A = {
                meme: "jpg",
                gif: "gif",
                pie: "png",
                demotivational: "jpg"
            }[n],
            w = parseInt(c.iid).toString(36),
            s = ("gif" === A ? "/gif/" : "/i/") + w,
            j = !0,
            z = $("#doneImage"),
            q = $("#doneUrl");
        if (z.attr("src")) {
            if (!d) {
                var u = new Image;
                $(u).load(function() {
                    z.attr("src", $(this).attr("src"))
                });
                u.src = IMAGE_DOMAIN + w + "." + A
            }
        } else z.attr("src", (d ? "//i2.imgflip.com/" : IMAGE_DOMAIN) + w + "." + A);
        O.on("contextmenu", "#doneImage", function() {
            j = !1
        });
        q.html(embedCodes(w, A, d, !d && "gif" !== n, n)).find(".img-code").click(function() {
            $(this).select();
            j = !1
        }).on("focus", function() {
            j = !1
        });
        !d && !I.user.id ? (n = '<div class="done-msg">You are not logged in! If you want to claim or delete this image, ' +
            ('<a class="done-link" target="_blank" href="/login?claim_iid=' + c.iid + '">Login and claim it</a>'), n += ' or <a class="done-link" target="_blank" href="/signup?claim_iid=' + c.iid + '">Signup and claim it</a>', q.append(n + "</div>")) : !d && 0 < I.user.subsLeft && (q.append('<div class="done-msg">You have ' + I.user.subsLeft + " remaining submission" + (1 != I.user.subsLeft ? "s" : "") + ' today. <span id="done-submit" class="done-link a">Submit this image</span></div>'), $("#done-submit").click(function() {
            submitImg(c.iid)
        }));
        n =
            $('<div class="l but">&larr; Change settings</div>').click(function() {
                j && !p.doneshare && $.get("/ajax_delete_creation?iid=" + c.iid);
                imgDoneBox.hide()
            });
        B = $('<div class="l but">Make another</div>').click(B);
        q = $("#doneLinks");
        q.html(n);
        d ? (v = "This image is private. It will only be stored on imgflip servers long enough for you to download it.", "s3" === c.error && (v = '<span style="color:red">Whoops! Temporary error while uploading to clouds. You can download your image directly, or reload and try again.</span>'),
            $("#doneShare").html(v)) : (d = $("<a class='l but' href='" + s + "'>Go to image page</a>"), d.click(function() {
            j = false
        }), q.append(d), insertShares("#doneShare", w, A, v));
        q.append(B)
    }
    var va = p.File && p.FileReader && p.FileList;
    MemeMaker = function(c, d) {
        function n() {
            c[i].w += c[i].h;
            c[i].h = c[i].w - c[i].h;
            c[i].w -= c[i].h;
            c[i].rotation = 270 === c[i].rotation ? 0 : ~~c[i].rotation + 90;
            f.select(i)
        }

        function B(a) {
            a ? D.removeClass("no-events").find(".cropBox").removeClass("off") : D.addClass("no-events").find(".cropBox").addClass("off");
            y.find(".mm-toggle-drag").prop("checked", a)
        }

        function v() {
            var a = $("#mm-upload"),
                k = $("#mm-show-upload");
            "none" === a.css("display") ? (v.oldText = k.text(), a.slideDown(200), k.text("Hide upload frame")) : (a.slideUp(200), k.text(v.oldText))
        }

        function A() {
            if (va) {
                var a = $("#mm-upload-file")[0].files[0];
                if (-1 === a.type.search(/^image/)) MSG("File is not an image", "red");
                else {
                    var k = new FileReader;
                    k.onload = function(a) {
                        G = new Image;
                        G.src = a.target.result;
                        a = function() {
                            c.custom = {
                                id: 0,
                                name: "Custom Image",
                                w: G.width,
                                h: G.height
                            };
                            f.select("custom")
                        };
                        G.complete ? a() : G.onload = a
                    };
                    k.readAsDataURL(a);
                    v()
                }
            } else alert("To use a fully private template, your browser needs to support the HTML5 File API. All modern browsers support the File API. If you cannot upgrade your browser right away, you can still create your meme if you set the template as public.")
        }

        function w(a, k, t) {
            function b() {
                E.updateColors()
            }
            var d = '<div class="text-wrap"><textarea placeholder="' + ("top" == a ? "TOP TEXT" : "bottom" == a ? "BOTTOM TEXT" : "MORE TEXT") + '" class="mm-text"></textarea><div class="fontOps"><div class="picker mm-font-color-picker" title="Change Font Color"></div>';
            ca || (d += '<div class="picker mm-outline-color-picker" title="Change Outline Color"></div><input class="ow" type="number" maxlength="1" min="0" max="9" title="Change Outline Width" tabindex="-1"/>');
            d = $(d + "</div></div>");
            y.find(".mm-text-boxes").append(d);
            var E = new z(d, a, k);
            e.push(E);
            t && E.autoResize(c[i].w, c[i].h);
            ba(d.find(".mm-font-color-picker"), 1, da, b);
            ca || ba(d.find(".mm-outline-color-picker"), 0, da, b);
            2 < e.length && s(E.$box);
            oa && oa(d)
        }

        function s(a) {
            a.css({
                background: "#fff"
            }).animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).css({
                        background: "none",
                        opacity: 1
                    })
                })
        }

        function j() {
            if (Y) {
                J.naturalWidth ? 0 < c[i].rotation ? (m.translate(g.width / 2, g.height / 2), m.rotate(c[i].rotation / 180 * Math.PI), 180 === c[i].rotation ? (m.translate(-g.width / 2, -g.height / 2), m.drawImage(J, 0, 0, g.width, g.height), m.translate(g.width / 2, g.height / 2)) : (m.translate(-g.height / 2, -g.width / 2), m.drawImage(J, 0, 0, g.height, g.width), m.translate(g.height / 2, g.width / 2)), m.rotate(-c[i].rotation / 180 * Math.PI), m.translate(-g.width / 2, -g.height / 2)) : m.drawImage(J,
                    0, 0, g.width, g.height) : m.clearRect(0, 0, g.width, g.height);
                pa && pa(m, g);
                m.shadowBlur = 0;
                F && m.drawImage(F, 0, 0);
                for (var a = 0; a < e.length; a++) "image" === e[a].type && !e[a].hidden && e[a].draw();
                for (a = 0; a < e.length; a++) "text" === e[a].type && !e[a].hidden && e[a].draw()
            } else
                for (a = 0; a < e.length; a++) e[a].hidden || e[a].draw()
        }

        function z(a, k, c) {
            if (Y) return new q(a, k, c);
            var c = c || {},
                b = this,
                d;
            b.type = "text";
            b.align = k;
            b.size = c.maxFontSize || y.find(".mm-size").val() >> 0 || qa;
            b.outline_width = 2;
            b.text = "";
            b.font_color = "#ffffff";
            b.outline_color =
                "#000000";
            b.font = (y.find(".mm-font").val() || "impact") + ",impac";
            b.$text_wrap = a;
            var e = b.$box = $("<div/>", {
                    "class": "box cropBox off"
                }),
                f = a.find(".mm-text");
            e.hover(function() {
                clearTimeout(H);
                $(".cropBox").removeClass("off")
            }, function() {
                H = setTimeout(function() {
                    $(".cropBox").addClass("off")
                }, 10)
            });
            y.find(".mm-font").change(function() {
                l($(this).val())
            });
            y.find(".mm-size").change(function() {
                b.size = d = $(this).val() >> 0;
                b.draw()
            }).keyup(function() {
                b.size = d = $(this).val() >> 0;
                b.draw()
            });
            a.find(".ow").change(function() {
                b.outline_width =
                    $(this).val() >> 0;
                4 < b.outline_width && (b.outline_width = 4);
                b.draw()
            }).keyup(function() {
                b.outline_width = $(this).val() >> 0;
                4 < b.outline_width && (b.outline_width = 4);
                b.draw()
            }).val(b.outline_width);
            var k = b.setText = function() {
                    b.text = R ? f.val().toUpperCase() : f.val();
                    b.draw()
                },
                l = b.setFont = function(a) {
                    b.font = (a || "impact") + ",impac";
                    b.draw()
                };
            b.getFont = function() {
                return b.font.split(",")[0]
            };
            b.updateColors = function() {
                b.font_color = a.find(".mm-font-color-picker .color-input").val();
                b.outline_color = a.find(".mm-outline-color-picker .color-input").val();
                b.draw()
            };
            b.getVals = function() {
                var a = m.getVals();
                return [a.x / h >> 0, a.y / h >> 0, a.w / h >> 0, a.h / h >> 0, d / 1.32 / h >> 0]
            };
            b.setVals = function(a, b, k, d) {
                m.setVals(a * h >> 0, b * h >> 0, k * h >> 0, d * h >> 0)
            };
            b.setAlign = function(a) {
                b.align = a
            };
            b.autoResize = function(a, k) {
                var d = a * h - 10,
                    c = k * h / 4,
                    e = 5;
                "bottom" === b.align ? e = 3 * c - 15 : "middle" === b.align && (e = 1.5 * c - 2);
                m.setVals(5, e, d, c)
            };
            b.draw = function() {
                var a = m.getVals(),
                    k = b.text,
                    c = k.length,
                    t = 2 + c / 30 >> 0,
                    f = k.split(" ").length,
                    l = Math.sqrt(c * a.h / a.w / 2.8) + 0.5 >> 0;
                l || (l = 1);
                l > f && (l = f);
                for (var j = c / l, i = [],
                        f = [], x = -1; x <= l; x++) f[x] = {};
                var h = 0,
                    h = 0,
                    g = (1.32 * b.size >> 0) + 2; - 6 > d - g && (g = d + 6);
                var T, x = $("#testline");
                do {
                    g -= 2;
                    T = 1.21 * g / 1.32 >> 0;
                    for (var r = 0; r <= l; r++)
                        if (r == l ? i[r] = c : (h = (j * r >> 0) - t, 0 > h && (h = 0), h = r ? k.indexOf(" ", h) : 0, i[r] = -1 == h ? c : h), r) f[r - 1].text = k.substr(i[r - 1], i[r] - i[r - 1]);
                    for (var h = 4 + 0.1 * g / 1.32, K = 0, o = h * (l - 1), r = 0; r < l; r++) x.css({
                        font: "400 " + g + "px/" + T + "px " + b.font,
                        height: T
                    }).text(f[r].text), f[r].w = x.width(), f[r].h = T, f[r].w > K && (K = f[r].w), o += T
                } while (!(K <= a.w && o <= a.h));
                d = g;
                x = a.h - o;
                "top" === b.align && (x = 0);
                "middle" ===
                b.align && (x /= 2);
                f[-1].h = 0;
                for (var j = x, r = "", p, n = b.outline_width, x = 0; x < l; x++) {
                    k = f[x].w;
                    c = f[x].h;
                    t = (a.w - k) / 2;
                    j = j + f[x - 1].h + (x ? h : 0);
                    i = f[x].text;
                    for (K = t - n; K <= t + n; K++)
                        for (o = j - n; o <= j + n; o++) p = K == t && o == j ? "z-index:2;color:" + b.font_color + ";" : "color:" + b.outline_color + ";", r += "<div class='line' style='font:400 " + g + "px/" + T + "px " + b.font + ";" + p + "top:" + o + "px;left:" + K + "px;width:" + k + "px;height:" + c + "px;'>" + i + "</div>"
                }
                e.find(".line").remove();
                e.append(r)
            };
            var m = new Dragger(e, D, b.draw);
            f.change(k).keyup(k);
            ea.after(e)
        }

        function q(a,
            k, c) {
            var c = c || {},
                b = this,
                d, e, f, l = !ca && y.find(".mm-use-shadow").prop("checked");
            b.type = "text";
            b.align = k;
            b.size = c.maxFontSize || y.find(".mm-size").val() >> 0 || qa;
            b.outline_width = l ? 5 : 1;
            b.text = "";
            b.font_color = "#ffffff";
            b.outline_color = "#000000";
            b.font = (y.find(".mm-font").val() || "impact") + ",impac";
            b.$text_wrap = a;
            var k = b.$box = $("<div/>", {
                    "class": "box cropBox off"
                }),
                i = new Dragger(k, D, j),
                g = a.find(".mm-text");
            k.hover(function() {
                clearTimeout(H);
                $(".cropBox").removeClass("off")
            }, function() {
                H = setTimeout(function() {
                        $(".cropBox").addClass("off")
                    },
                    10)
            }).on("vmousedown", function() {
                $(".cropBox").removeClass("off")
            });
            y.find(".mm-font").change(function() {
                S($(this).val())
            }).end().find(".mm-size").change(function() {
                b.size = d = $(this).val() >> 0;
                j()
            }).keyup(function() {
                b.size = d = $(this).val() >> 0;
                j()
            }).end().find(".mm-use-shadow").change(function() {
                l = !!$(this).prop("checked");
                a.find(".ow").val(b.outline_width = l ? 5 : 1);
                j()
            });
            a.find(".ow").change(function() {
                b.outline_width = $(this).val() >> 0;
                j()
            }).keyup(function() {
                b.outline_width = $(this).val() >> 0;
                j()
            }).val(b.outline_width);
            var n = b.setText = function() {
                    b.text = R ? g.val().toUpperCase() : g.val();
                    j()
                },
                S = b.setFont = function(a) {
                    b.font = (a || "impact") + ",impac";
                    j()
                };
            b.getFont = function() {
                return b.font.split(",")[0]
            };
            b.updateColors = function() {
                b.font_color = a.find(".mm-font-color-picker .color-input").val();
                b.outline_color = a.find(".mm-outline-color-picker .color-input").val();
                j()
            };
            b.getVals = function() {
                var a = i.getVals();
                return [a.x / h >> 0, a.y / h >> 0, a.w / h >> 0, a.h / h >> 0, d / 1.32 / h >> 0]
            };
            b.setVals = function(a, b, c, k) {
                i.setVals(a * h >> 0, b * h >> 0, c * h >> 0, k *
                    h >> 0)
            };
            b.setAlign = function(a) {
                b.align = a
            };
            b.autoResize = function(a, c) {
                var k, d, t, l;
                if (a !== e || c !== f) e = a, f = c, t = a * h - 10, l = c * h / 4, d = k = 5, "bottom" === b.align ? d = 3 * l - 13 : "middle" === b.align && (d = 1.5 * l - 2);
                else {
                    l = C / Z;
                    var j = i.getVals();
                    k = l * j.x;
                    d = l * j.y;
                    t = l * j.w;
                    l *= j.h
                }
                i.setVals(k, d, t, l)
            };
            b.draw = function() {
                var a = i.getVals();
                m.shadowBlur = l ? b.outline_width : 0;
                m.shadowColor = l ? b.outline_color : "";
                var c = b.text,
                    k = c.length,
                    e = 2 + k / 30 >> 0,
                    f = c.split(" ").length,
                    t = Math.sqrt(k * a.h / a.w / 2.8) + 0.5 >> 0;
                t || (t = 1);
                t > f && (t = f);
                for (var j = k / t, E = [],
                        f = [], h = -1; h <= t; h++) f[h] = {};
                var g = 0,
                    g = 0,
                    h = b.size + 2; - 6 > d - h && (h = d + 6);
                do {
                    h -= 2;
                    m.font = h + "px " + b.font;
                    for (var o = 0; o <= t; o++)
                        if (o == t ? E[o] = k : (g = (j * o >> 0) - e, 0 > g && (g = 0), g = o ? c.indexOf(" ", g) : 0, E[o] = -1 == g ? k : g), o) f[o - 1].text = c.substr(E[o - 1], E[o] - E[o - 1]);
                    for (var g = 4 + 0.1 * h, n = 0, S = g * (t - 1), o = 0; o < t; o++) f[o].w = m.measureText(f[o].text).width, f[o].h = 0.85 * h, f[o].w > n && (n = f[o].w), S += 0.85 * h
                } while (n > a.w || S > a.h);
                d = h;
                c = a.h - S;
                "top" === b.align && (c = 0);
                "middle" === b.align && (c /= 2);
                f[-1].h = 0;
                k = c;
                for (h = 0; h < t; h++)
                    if (c = (a.w - f[h].w) / 2, k +=
                        f[h].h, h && (k += g), e = f[h].text, m.fillStyle = b.font_color, l)
                        for (j = 0; 6 > j; j++) m.fillText(e, a.x + c, a.y + k);
                    else m.strokeStyle = b.outline_color, m.lineWidth = b.outline_width, m.fillText(e, a.x + c, a.y + k), ca || m.strokeText(e, a.x + c, a.y + k)
            };
            g.change(n).keyup(n);
            N.after(k);
            c.coords && (c = c.coords, i.setVals(c[0], c[1], c[2], c[3]))
        }

        function u(a) {
            var k, d;
            this.type = "image";
            this.element = a;
            var b = this.$box = $("<div/>", {
                    "class": "box cropBox off"
                }),
                e = new Dragger(b, D, j);
            b.hover(function() {
                    clearTimeout(H);
                    $(".cropBox").removeClass("off")
                },
                function() {
                    H = setTimeout(function() {
                        $(".cropBox").addClass("off")
                    }, 10)
                });
            this.getVals = function() {
                var a = e.getVals();
                return [a.x / h >> 0, a.y / h >> 0, a.w / h >> 0, a.h / h >> 0]
            };
            this.autoResize = function(b, c) {
                var f, j, g, i;
                if (b !== k || c !== d) k = b, d = c, f = j = Math.min(b * h / 3 >> 0, c * h / 3 >> 0), a.width > a.height ? (g = f, i = a.height / a.width * g) : (i = f, g = a.width / a.height * i);
                else {
                    i = C / Z;
                    var m = e.getVals();
                    f = i * m.x;
                    j = i * m.y;
                    g = i * m.w;
                    i *= m.h
                }
                e.setVals(f, j, g, i)
            };
            this.draw = function() {
                var b = e.getVals();
                m.drawImage(a, ~~b.x, ~~b.y, ~~b.w, ~~b.h)
            };
            N.after(b);
            this.autoResize(c[i].w,
                c[i].h)
        }

        function O(a) {
            function c(a) {
                for (var e = 0, f = 0; f < b; f++) d[f] && d[f].complete && e++;
                0 < e && j();
                e !== b && 20 > a && setTimeout(function() {
                    c(a + 1)
                }, 75)
            }
            for (var a = a.target.files, d = [], b = 0, f = 0, h; h = a[f]; f++)
                if (h.type.match("image.*")) {
                    var i = new FileReader;
                    i.onload = function(a) {
                        var b = new Image;
                        b.src = a.target.result;
                        d.push(b);
                        e.push(new u(b))
                    };
                    i.readAsDataURL(h);
                    b++
                }
            c(0)
        }

        function P() {
            var a = L.find(".draw");
            a.hasClass("set") ? (a.removeClass("set"), a.text("Draw"), L.find(".add-img, .add-scumbag, .mm-rotate").show(), L.find(".picker,.erase").hide(),
                $(".box").show(), N.off("mousedown", Q).off("mousemove", V), $(ga).off("mouseup", W)) : (a.addClass("set"), a.text("Stop Drawing"), L.find(".add-img, .add-scumbag, .mm-rotate").hide(), L.find(".picker,.erase").show(), $(".box").hide(), N.mousedown(Q).mousemove(V), $(ga).mouseup(W))
        }

        function Q(a) {
            a.preventDefault();
            var c = a.clientX - $(this).offset().left + $(p).scrollLeft(),
                a = a.clientY - $(this).offset().top + $(p).scrollTop();
            M.beginPath();
            m.beginPath();
            M.moveTo(c, a);
            m.moveTo(c, a);
            m.save();
            m.shadowBlur = 0;
            m.strokeStyle =
                fa;
            M.strokeStyle = fa;
            $("body").addClass("nosel");
            aa = !0
        }

        function V(a) {
            if (aa) {
                var c = a.clientX - $(this).offset().left + $(p).scrollLeft(),
                    a = a.clientY - $(this).offset().top + $(p).scrollTop();
                M.lineTo(c, a);
                M.stroke();
                m.lineTo(c, a);
                m.stroke()
            }
        }

        function W() {
            aa && (m.restore(), aa = 0, $("body").removeClass("nosel"), U = !0)
        }

        function X() {
            $("#mygen").hide();
            $("#memewrap").show();
            $(".mm-tab").removeClass("set");
            $("#memetab").addClass("set");
            if (!$("#memewrap").html()) {
                var a = 0,
                    k = "",
                    d = 0,
                    b, f = "//s.imgflip.com/ms" + spriteNum + ".jpg",
                    e;
                for (e in c) c.hasOwnProperty(e) && !isNaN(e) && (a++, b = 'style="background:url(' + f + ") " + -50 * d + 'px 0px;"', d++, k += '<div class="im" ' + b + " onclick=\"mm.changeMeme('" + e + '\')" alt="' + c[e].name + ' Meme Image" title="Make ' + c[e].name + ' Meme"></div>');
                $("#memewrap").append(k + '<a class="y but" id="allTemplates" href="/memetemplates">View All Meme Templates</a>')
            }
            ra()
        }

        function ja() {
            $("#memewrap").hide();
            $("#mygen").show();
            $(".mm-tab").removeClass("set");
            $("#mytab").addClass("set");
            ja.done || (!I.user.id && -1 !== p.location.href.search("memegenerator") ?
                $("#mygen").append("<div style='line-height:50px;padding-left:10px;'><a rel='nofollow' href='/login?redirect=/memegenerator'>Login</a> or <a rel='nofollow' href='/signup?redirect=/memegenerator'>Signup</a> to view any custom templates you upload!") : ($.getJSON("/ajax_get_my_generators", function(a) {
                    if (a.error) MSG(a.error, "red");
                    else {
                        $.extend(c, a);
                        var a = 0,
                            d = "",
                            e, b, f;
                        for (f in c) e = c[f], isNaN(f) && "U" != f && (b = "custom" === f ? G.src : IMAGE_DOMAIN + "2/" + e.id.toString(36) + ".jpg", d += "<img class='im um' src='" + b + "' onclick='mm.changeMeme(\"" +
                            f + "\")' title='" + e.name + "'/>", a++);
                        d ? $("#mygen").append(d) : $("#mygen").append("<div style='line-height:50px;padding-left:10px;'>Upload an image to create your first custom generator!</div>");
                        ra()
                    }
                }), ja.done = !0))
        }

        function ra() {
            $(".im").hover(function() {
                var a = $("#mm-meme-title"),
                    d = $(this).hasClass("um") ? this.title : this.title.substr(5, this.title.length - 10),
                    d = d || ka;
                d == c[i].name ? a.text(d).css({
                    "font-weight": 700
                }) : a.text(d).css({
                    "font-weight": 400
                })
            }, function() {
                $("#mm-meme-title").text(c[i].name || ka).css({
                    "font-weight": 700
                })
            })
        }
        var d = d || {},
            f = this,
            ka = "Untitled Template",
            sa = $(d.$previewOuter || "#mm-preview-outer"),
            D = $(d.$preview || ".mm-preview"),
            N = D.find(".mm-canv"),
            ea = D.find(".mm-img"),
            y = $(d.settingsDiv || "#mm-settings"),
            ta = $("#mm-search"),
            C = sa.width(),
            Z = C,
            ia = d.noDraw,
            la = d.numTexts >> 0,
            qa = d.fontSize || 50,
            R = d.forceCaps !== na ? !!d.forceCaps : !0,
            ca = d.disableOutline,
            da = "#000000 #ffffff #995555 #ff3333 #ff8800 #eeee00 #22ee22 #3333ff #00bff3 #dd00cc".split(" "),
            ma = d.scumbagPath || "/img_util/scumbag_hat2.png",
            U = !1,
            h = 1,
            oa = d.textAdded,
            pa =
            d.preDraw,
            m, F, M, ua, fa, J, e, H, aa, i, G, g = N[0],
            L, Y = f.useCanvas = g.getContext && g.toDataURL && (m = g.getContext("2d")) && -1 === navigator.userAgent.search("Android 2.");
        f.hideBox = function(a) {
            e[a].hidden = !0;
            j()
        };
        f.showBox = function(a) {
            e[a].hidden = !1;
            j()
        };
        f.setWidth = function(a) {
            Z = C || a;
            C = a;
            f.select(i, !1)
        };
        f.setFont = function(a) {
            for (var c = 0; c < e.length; c++) "text" === e[c].type && e[c].setFont(a)
        };
        f.ctx = function() {
            return m
        };
        f.canv = function() {
            return g
        };
        f.setMeme = function() {
            return c[i]
        };
        f.text = f.getText = function(a) {
            if (a !== na) return e[a] ?
                (e[a].text || "").trim() : "";
            for (var a = "", c = 0; c < e.length; c++) e[c].text && (a += (a ? " " : "") + e[c].text.trim());
            return a
        };
        f.boxCount = function(a) {
            for (var c = 0, d = e.length - 1; 0 <= d; d--)(!a || e[d].type === a) && c++;
            return c
        };
        f.hasDrawing = function() {
            return U
        };
        f.isEmpty = function() {
            return !f.getText() && !f.boxCount("image") && !f.hasDrawing()
        };
        f.memeData = function(a, d) {
            for (var f = 0, b = [], h, j = 0, g = 0, a = a || 1, d = d || 1, l = 0; l < e.length; l++) h = e[l].getVals(), b.push({
                    type: e[l].type,
                    x: a * h[0] >> 0,
                    y: d * h[1] >> 0,
                    w: a * h[2] >> 0,
                    h: d * h[3] >> 0
                }), "text" ===
                e[l].type ? ($.extend(b[l], {
                    color: e[l].font_color,
                    outline_width: e[l].outline_width,
                    outline_color: e[l].outline_color,
                    text: R ? e[l].text.toUpperCase() : e[l].text
                }), h[4] > f && (f = h[4])) : "image" === e[l].type && (j++, -1 !== e[l].element.src.search(ma) && g++);
            return {
                boxes: b,
                size: f * d >> 0,
                template: 100 < c[i].id ? c[i].id : "",
                font: e[0].getFont(),
                force_caps: R ? 1 : 0,
                num_imgs: j,
                num_scumbag_hats: g,
                has_drawing: U ? 1 : 0
            }
        };
        f.ajaxSetPositions = function() {
            for (var a = [], d = 0; d < e.length; d++) "text" === e[d].type && a.push(e[d].getVals());
            loading("Setting Meme Positions");
            $.ajax({
                url: "/ajax_set_meme_positions",
                data: {
                    meme_id: c[i].id,
                    positions: a
                },
                success: function() {
                    loading(!1)
                }
            })
        };
        f.reset = function() {
            $(".mm-text").val("");
            $(".gen-anon, .gen-private").attr("checked", !1);
            for (var a = e.length - 1; 0 <= a; a--) 2 > a ? e[a].text = "" : f.removeBox(a);
            $("#mm-preview-outer .draw").hasClass("set") && P();
            Y && (F.width = F.width, U = !1);
            j()
        };
        f.removeBox = function(a) {
            e[a].$box.remove();
            e[a].$text_wrap && e[a].$text_wrap.remove();
            e.splice(a, 1)
        };
        f.getImgUrl = function(a) {
            return 0 === a.id ? G ? G.src : "" : IMAGE_DOMAIN +
                a.id.toString(36) + ".jpg"
        };
        f.select = function(a, d) {
            i = a;
            var g, b = c[a],
                n = b.w,
                p = b.h,
                o = f.getImgUrl(b);
            h = Math.min(1, C / b.w);
            $("#mm-meme-title").text(b.name || ka);
            var l;
            if (!1 !== d) {
                for (g = e.length - 1; 0 <= g; g--) "text" !== e[g].type && f.removeBox(g);
                var q = Math.min(2, e.length);
                if (b.positions) {
                    l = JSON.parse(b.positions);
                    for (g = e.length; g < e.length + l.length - f.boxCount("text"); g++) f.addText("middle");
                    q = l.length
                } else 1 < e.length && (e[0].setAlign("top"), e[1].setAlign("bottom"));
                for (g = e.length - 1; g >= q; g--) f.removeBox(g)
            }
            for (g = 0; g <
                e.length; g++) e[g].autoResize(n, p), !1 !== d && (l && l[g]) && (e[g].setAlign("middle"), e[g].setVals(l[g][0], l[g][1], l[g][2], l[g][3]));
            C !== Z && (Z = C);
            n > C && (p = C / n * p >> 0, n = C);
            if (Y) {
                if (0 === o.search(/^(http|\/\/)/) && (o = b.url_name ? "/s/meme/" + b.url_name + ".jpg" : "/readImage?iid=" + b.id), N.attr({
                        width: n,
                        height: p
                    }), F && ($(F).attr({
                        width: n,
                        height: p
                    }), M.lineWidth = 2, M.shadowBlur = 0, U = !1), m.lineWidth = 2, g = $(J).attr("src"), o !== g) $(J).load(j), o && $(J).attr("src", o)
            } else ea.css({
                width: n,
                height: p
            }).attr("src", o);
            j();
            $("#mm-meme-title").css({
                "font-weight": 700
            })
        };
        f.changeMeme = function(a) {
            a != i && f.select(a)
        };
        f.addTextAuto = function() {
            w(1 < e.length ? "middle" : "top", {}, !0)
        };
        f.init = function() {
            e = [];
            i = H = aa = 0;
            var a;
            if (Y) {
                if (J = ea[0], a = N, !ia) {
                    $("#drawPanel,.draw-panel").remove();
                    L = $('<div class="draw-panel clearfix">');
                    var d = $('<div class="erase l but sml" title="erase all drawing">erase</div>'),
                        g = $('<div class="draw l but sml">Draw</div>'),
                        b = $('<div title="Change Line Color"></div>'),
                        h = $('<div class="add-scumbag l but sml"><img alt="Add scumbag hat to meme" src="' + ma +
                            '"/> Add Scumbag Hat</div>'),
                        m = $('<div class="add-img l but sml">Add Image</div>'),
                        o = $('<div class="mm-rotate l but sml" title="Rotate image"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M41.038,24.1l-7.152,9.342L26.734,24.1H31.4c-0.452-4.397-4.179-7.842-8.696-7.842c-4.82,0-8.742,3.922-8.742,8.742 s3.922,8.742,8.742,8.742c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5c-7.576,0-13.742-6.165-13.742-13.742 s6.166-13.742,13.742-13.742c7.274,0,13.23,5.686,13.697,12.842H41.038z"/></svg></div>'),
                        l = $('<input type="file" name="img_file" class="hidden-file-input"/>');
                    m.append(l);
                    L.append(d).append(g).append(b).append(m).append(h).append(o);
                    F = $("<canvas/>")[0];
                    M = F.getContext("2d");
                    ua = $("<img/>", {
                        width: 210,
                        height: 220,
                        src: ma
                    })[0];
                    g.click(P);
                    d.click(function() {
                        F.width = F.width;
                        U = !1;
                        j()
                    });
                    h.click(function() {
                        e.push(new u(ua));
                        j();
                        B(!0)
                    });
                    o.click(n);
                    l.change(function(a) {
                        O(a);
                        B(!0)
                    });
                    D.before(L);
                    fa = da[3];
                    ba(b, 3, da, function(a) {
                        fa = a
                    })
                }
            } else a = ea;
            1 < la && w("top");
            0 < la && w("bottom");
            for (d = 2; d < la; d++) w("middle");
            var q = $("#memewrap");
            ta.keyup(function(a) {
                for (var b = q.find(".im"), d = ta.val(), e = d.toLowerCase(), g = 0, h, i = -1; c[g];) h = -1 !== c[g].name.toLowerCase().search(e) || -1 !== (c[g].altNames || "").toLowerCase().search(e), b.eq(g).css("display", h ? "inline-block" : "none"), h && -1 === i && (i = g), g++;
                13 === a.which && (-1 !== i ? f.changeMeme(i) : p.location = "/memesearch?q=" + d)
            });
            a.hover(function() {
                clearTimeout(H);
                D.find(".cropBox").removeClass("off")
            }, function() {
                H = setTimeout(function() {
                    D.find(".cropBox").addClass("off")
                }, 10)
            }).click(function(a) {
                a.preventDefault()
            }).show();
            y.find(".mm-add-text").click(f.addTextAuto);
            y.find(".mm-nocaps").click(function() {
                var a = !R;
                R = !!a;
                for (var b = 0; b < e.length; b++) "text" == e[b].type && e[b].setText();
                y.find(".mm-nocaps").text((a ? "No" : "") + " Caps")
            });
            y.find(".mm-reset").click(f.reset);
            y.find(".mm-toggle-drag").change(function() {
                B($(this).prop("checked"))
            });
            var s = ha.width();
            700 > s && B(!1);
            $("#mm-show-upload").click(v);
            var z = $("#mm-upload-public");
            z.click(function() {
                $("#mm-upload-name-wrap").toggle(z.prop("checked"))
            });
            $("#mm-upload").submit(function() {
                if (!$("#mm-upload-file").val()) return MSG("No file selected",
                    "red"), !1;
                if (!z.prop("checked")) return A(), !1
            });
            $("form").keydown(function(a) {
                if (13 == a.which) return !1
            });
            $("#genSubmit").attr("checked", !1);
            y.find(".mm-toggle-opts").click(function() {
                var a = y.find(".mm-opts"),
                    b = $(this);
                "none" === a.css("display") ? (a.slideDown(200), b.text("Hide Options \u25b2")) : (a.slideUp(200), b.text("Advanced Options \u25bc"))
            });
            ha.resize(throttle(function() {
                var a = ha.width();
                a !== s && (s = a, f.setWidth(Math.min(c[i].w, sa.width())))
            }))
        };
        f.initPopMemes = function() {
            $("#memetab").click(X);
            $("#mytab").click(ja);
            X()
        };
        f.addText = w;
        f.preview = j
    };
    p.ColorPicker = ba;
    p.generate = P;
    var X = !1;
    p.preloadShareScript = W;
    p.imgDonePopup = Q;
    p.imgDone = V;
    memeInit = function() {
        $(".mm-generate").click(function() {
            P(ia)
        });
        $("#shareGen").click(function() {
            $(this).select()
        });
        $(".draw").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "draw", mm.setMeme().name])
        });
        $(".add-img").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "add image", mm.setMeme().name])
        });
        $(".add-scumbag").click(function() {
            _gaq.push(["_trackEvent", "draw panel",
                "add scumbag", mm.setMeme().name
            ])
        });
        $(".mm-rotate").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "rotate", mm.setMeme().name])
        });
        O.on("click", ".mm-set-positions", function() {
            mm.ajaxSetPositions()
        })
    };
    showGenerator = function(c) {
        I.user.id ? 1E3 > I.user.points ? error_dialog("You must earn 1,000 points to use meme comments!") : (getMemes(), O.on("click", ".mm-generate", function() {
            mm.isEmpty() ? alert("Your meme is empty! Add something to it or click Cancel") : (loading("Generating Meme..."), P(function(d) {
                comment(img.id,
                    d.iid, c)
            }, !0), BOX.hide())
        }).on("click", ".mm-cancel", function() {
            BOX.hide()
        })) : showLogin()
    };
    getMemes = function() {
        loading("Materializing Meme Generator...");
        $.ajax({
            dataType: "json",
            url: "/ajax_get_meme_list",
            success: function(c) {
                loading(!1);
                c.error ? error_dialog(c.error) : (BOX.show({
                    html: c.html,
                    bg: "transparent",
                    noMaskClick: !0
                }), mm = new MemeMaker(c.memes, {
                    numTexts: 2
                }), mm.init(), mm.initPopMemes(), mm.select(0))
            }
        })
    }
})(window, document, $(window), $(document));