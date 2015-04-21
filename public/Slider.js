function Slider(C, l, D, e) {
    function v(a) {
        if (h)
            for (var b = 0; b < h; b++)
                if (a <= i[b]) {
                    var f = i[b - 1];
                    return (b - 1 + (a - f) / (i[b] - f)) * j / (h - 1) - d / 2 >> 0
                }
        return (a - k) / (m - k) * j - d / 2 >> 0
    }

    function p(a, b) {
        a = parseFloat(a || q.val());
        c = a < k ? -d / 2 : a > m ? j - d / 2 : v(a);
        g.css("left", c);
        w(a, b)
    }

    function w(a, b) {
        if (E) {
            var f = n ? x : g,
                c = n ? g : y,
                f = f.position().left;
            s.css({
                left: f + d / 2,
                width: c.position().left - f
            })
        }
        z && !b && z(a)
    }

    function A(a) {
        a.preventDefault();
        a = a.clientX - t + c >> 0;
        n && n.left() > a ? a = n.left() : u && u.left() < a ? a = u.left() : a < -d / 2 ? a = -d / 2 >> 0 : a > j - d / 2 && (a = j -
            d / 2 >> 0);
        if (a !== c) {
            t += a - c;
            c = a;
            g.css("left", c);
            a = c;
            if (h) var a = (a + d / 2) / j,
            b = a * (h - 1) >> 0, f = i[b], a = (f + (a - b / (h - 1)) * (h - 1) * ((i[b + 1] || m) - f)).toFixed(1 / r / 10 >> 0);
            else a = parseFloat((Math.round(((a + d / 2) / j * (m - k) + k) / r) * r).toFixed(Math.log(1 / r) / Math.log(10) >> 0));
            q.val(a);
            w(a)
        }
    }

    function B() {
        $("body").removeClass("nosel");
        $(document).off("vmousemove", A).off("vmouseup", B)
    }
    var e = e || {}, l = $(l),
        q = $(C),
        o, k = e.min || 0,
        m = e.max || 100,
        r = e.step || 1,
        z = e.update,
        E = e.fill,
        j = e.sliderWidth || 200,
        d = e.markWidth || 20,
        i = e.medians || [],
        h = i.length;
    h && (k = i[0], m = i[h - 1]);
    var g = $("<div/>", {
        "class": "mark m" + D
    }),
        t, n, u, x, y, s, c = v(q.val());
    l.hasClass("slider") ? (o = l.find(".slide-bar"), o.append(g), s = l.find(".fill")) : (s = $('<div class="fill">'), l.addClass("slider"), o = $("<div/>", {
        "class": "slide-bar",
        width: j
    }), o.append(s).append(g), l.append(o));
    g.css("left", c);
    this.min = function(a) {
        if (a) {
            k = a;
            p()
        }
        return k
    };
    this.max = function(a) {
        if (a) {
            m = a;
            p()
        }
        return m
    };
    this.marker = function() {
        return g
    };
    this.leftBound = function(a) {
        n = a;
        x = a.marker()
    };
    this.rightBound = function(a) {
        u =
            a;
        y = a.marker()
    };
    this.left = function() {
        return c
    };
    this.set = function(a, b) {
        var c = Math.log(1 / r) / Math.log(10) >> 0,
            a = Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
        q.val(a);
        p(a, b)
    };
    this.setBG = function(a) {
        o.css("background", a)
    };
    this.update = p;
    q.change(function() {
        p()
    });
    g.on("vmousedown", function(a) {
        c = parseInt(g.css("left"));
        t = a.clientX;
        $("body").addClass("nosel");
        cancelEvent(a);
        $(document).on("vmousemove", A).on("vmouseup", B)
    })
};
