/*! lil-uuid - v0.1 - MIT License - https://github.com/lil-js/uuid */
(function(e, i) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], i);
  } else if (typeof exports === 'object') {
    i(exports);
    if (typeof module === 'object' && module !== null) {
      module.exports = exports.uuid;
    }
  } else {
    i((e.lil = e.lil || {}));
  }
})(this, function(e) {
  var i = '0.1.0';
  var t = {
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  };
  function A() {
    var e = '',
      i,
      t;
    for (i = 0; i < 32; i++) {
      t = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) e += '-';
      e += (i === 12 ? 4 : i === 16 ? (t & 3) | 8 : t).toString(16);
    }
    return e;
  }
  function o(e, i) {
    var A = t[i || 'all'];
    return (A && A.test(e)) || false;
  }
  A.isUUID = o;
  A.VERSION = i;
  e.uuid = A;
  e.isUUID = o;
});
//# sourceMappingURL=uuid.min.js.map;
// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian https://github.com/florian/lostorage.js
!(function(a, b) {
  var c = {
      isArray:
        Array.isArray ||
        function(a) {
          return '[object Array]' === Object.prototype.toString.call(a);
        },
      isPlainObj: function(a) {
        return a === Object(a);
      },
      toArray: function(a) {
        return Array.prototype.slice.call(a);
      },
      prepareArgs: function(a, b) {
        return (a = c.toArray(a)), a.unshift(b), a;
      },
      getObjKeyByValue: function(a, b) {
        for (var c in a) if (a.hasOwnProperty(c) && a[c] === b) return c;
      },
      retrieve: function(a, b) {
        return null == a ? b : a;
      },
      serialize: function(a) {
        return JSON.stringify(a);
      },
      unserialize: function(a) {
        return null == a ? b : JSON.parse(a);
      }
    },
    d = function(a, b) {
      (this.prefix = a), (this.store = b);
    };
  (d.prototype.addPrefix = function(a) {
    return this.prefix + a;
  }),
    (d.prototype.get = function(a, d) {
      d = d || b;
      var e;
      if (c.isArray(a)) {
        for (var f = {}, g = 0, h = a.length; g < h; g++)
          (e = a[g]), (f[e] = this.get(e, d));
        return f;
      }
      return (
        (e = this.addPrefix(a)),
        c.retrieve(c.unserialize(this.store.getItem(e)), d)
      );
    }),
    (d.prototype.set = function(a, b) {
      if (c.isPlainObj(a))
        for (var d in a) a.hasOwnProperty(d) && this.set(d, a[d]);
      else (a = this.addPrefix(a)), this.store.setItem(a, c.serialize(b));
      return this;
    }),
    (d.prototype.invert = function(a) {
      return this.set(a, !this.get(a));
    }),
    (d.prototype.add = function(a, b) {
      return this.set(a, this.get(a) + parseInt(b, 10));
    }),
    (d.prototype.increase = function(a, b) {
      return this.add(a, c.retrieve(b, 1));
    }),
    (d.prototype.decrease = function(a, b) {
      return this.add(a, -c.retrieve(b, 1));
    }),
    (d.prototype.concat = function(a, b) {
      return this.set(a, this.get(a) + b);
    }),
    (d.prototype.push = function(a, b) {
      var d = c.toArray(arguments),
        e = this.get(a, []);
      return d.splice(0, 1), e.push.apply(e, d), this.set(a, e);
    }),
    (d.prototype.extend = function(a, b, d) {
      var e = this.get(a, {});
      if (c.isPlainObj(b))
        for (var f in b) b.hasOwnProperty(f) && (e[f] = b[f]);
      else e[b] = d;
      return this.set(a, e);
    }),
    (d.prototype.remove = function(a) {
      a = c.isArray(a) ? a : c.toArray(arguments);
      for (var b = 0, d = a.length; b < d; b++) {
        var e = this.addPrefix(a[b]);
        this.store.removeItem(e);
      }
      return this;
    }),
    (d.prototype.empty = function() {
      return this.store.clear(), this;
    }),
    (d.prototype.all = function() {
      for (var a = {}, b = 0, d = this.store.length; b < d; b++) {
        var e = this.store.key(b);
        if (0 === e.indexOf(this.prefix)) {
          var f = c.unserialize(this.store.getItem(e));
          (e = e.substring(this.prefix.length)), (a[e] = f);
        }
      }
      return a;
    }),
    'function' == typeof define && define.amd
      ? define(function() {
          return { xStore: d };
        })
      : 'undefined' != typeof exports
      ? (module.exports = d)
      : (a.xStore = d);
})(window);
!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = e || self).ConfettiGenerator = t());
})(this, function() {
  'use strict';
  return function(e) {
    var a = {
      target: 'confetti-holder',
      max: 80,
      size: 1,
      animate: !0,
      respawn: !0,
      props: ['circle', 'square', 'triangle', 'line'],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126]
      ],
      clock: 25,
      interval: null,
      rotate: !1,
      start_from_edge: !1,
      width: window.innerWidth,
      height: window.innerHeight
    };
    if (
      (e &&
        (e.target && (a.target = e.target),
        e.max && (a.max = e.max),
        e.size && (a.size = e.size),
        null != e.animate && (a.animate = e.animate),
        null != e.respawn && (a.respawn = e.respawn),
        e.props && (a.props = e.props),
        e.colors && (a.colors = e.colors),
        e.clock && (a.clock = e.clock),
        null != e.start_from_edge && (a.start_from_edge = e.start_from_edge),
        e.width && (a.width = e.width),
        e.height && (a.height = e.height),
        null != e.rotate && (a.rotate = e.rotate)),
      'object' != typeof a.target && 'string' != typeof a.target)
    )
      throw new TypeError('The target parameter should be a node or string');
    if (
      ('object' == typeof a.target &&
        (null === a.target || !a.target instanceof HTMLCanvasElement)) ||
      ('string' == typeof a.target &&
        (null === document.getElementById(a.target) ||
          !document.getElementById(a.target) instanceof HTMLCanvasElement))
    )
      throw new ReferenceError(
        'The target element does not exist or is not a canvas element'
      );
    var t =
        'object' == typeof a.target
          ? a.target
          : document.getElementById(a.target),
      o = t.getContext('2d'),
      r = [];
    function n(e, t) {
      e = e || 1;
      var r = Math.random() * e;
      return t ? Math.floor(r) : r;
    }
    var i = a.props.reduce(function(e, t) {
      return e + (t.weight || 1);
    }, 0);
    function s() {
      var e =
        a.props[
          (function() {
            for (var e = Math.random() * i, t = 0; t < a.props.length; ++t) {
              var r = a.props[t].weight || 1;
              if (e < r) return t;
              e -= r;
            }
          })()
        ];
      return {
        prop: e.type ? e.type : e,
        x: n(a.width),
        y: a.start_from_edge
          ? a.clock < 0
            ? parseFloat(a.height) + 10
            : -10
          : n(a.height),
        src: e.src,
        radius: n(4) + 1,
        size: e.size,
        rotate: a.rotate,
        line: Math.floor(n(65) - 30),
        angles: [n(10, !0) + 2, n(10, !0) + 2, n(10, !0) + 2, n(10, !0) + 2],
        color: a.colors[n(a.colors.length, !0)],
        rotation: (n(360, !0) * Math.PI) / 180,
        speed: n(a.clock / 7) + a.clock / 30
      };
    }
    function l(e) {
      if (e)
        switch (
          ((o.fillStyle = o.strokeStyle =
            'rgba(' + e.color + ', ' + (3 < e.radius ? 0.8 : 0.4) + ')'),
          o.beginPath(),
          e.prop)
        ) {
          case 'circle':
            o.moveTo(e.x, e.y),
              o.arc(e.x, e.y, e.radius * a.size, 0, 2 * Math.PI, !0),
              o.fill();
            break;
          case 'triangle':
            o.moveTo(e.x, e.y),
              o.lineTo(e.x + e.angles[0] * a.size, e.y + e.angles[1] * a.size),
              o.lineTo(e.x + e.angles[2] * a.size, e.y + e.angles[3] * a.size),
              o.closePath(),
              o.fill();
            break;
          case 'line':
            o.moveTo(e.x, e.y),
              o.lineTo(e.x + e.line * a.size, e.y + 5 * e.radius),
              (o.lineWidth = 2 * a.size),
              o.stroke();
            break;
          case 'square':
            o.save(),
              o.translate(e.x + 15, e.y + 5),
              o.rotate(e.rotation),
              o.fillRect(-15 * a.size, -5 * a.size, 15 * a.size, 5 * a.size),
              o.restore();
            break;
          case 'svg':
            o.save();
            var t = new window.Image();
            t.src = e.src;
            var r = e.size || 15;
            o.translate(e.x + r / 2, e.y + r / 2),
              e.rotate && o.rotate(e.rotation),
              o.drawImage(
                t,
                (-r / 2) * a.size,
                (-r / 2) * a.size,
                r * a.size,
                r * a.size
              ),
              o.restore();
        }
    }
    function c() {
      (a.animate = !1),
        clearInterval(a.interval),
        requestAnimationFrame(function() {
          o.clearRect(0, 0, t.width, t.height);
          var e = t.width;
          (t.width = 1), (t.width = e);
        });
    }
    return {
      render: function() {
        (t.width = a.width), (t.height = a.height), (r = []);
        for (var e = 0; e < a.max; e++) r.push(s());
        return requestAnimationFrame(function e() {
          for (var t in (o.clearRect(0, 0, a.width, a.height), r)) l(r[t]);
          !(function() {
            for (var e = 0; e < a.max; e++) {
              var t = r[e];
              t &&
                (a.animate && (t.y += t.speed),
                t.rotate && (t.rotation += t.speed / 35),
                ((0 <= t.speed && a.height < t.y) ||
                  (t.speed < 0 && t.y < 0)) &&
                  (a.respawn
                    ? ((r[e] = t),
                      (r[e].x = n(a.width, !0)),
                      (r[e].y = t.speed < 0 ? parseFloat(a.height) : -10))
                    : (r[e] = void 0)));
            }
            r.every(function(e) {
              return void 0 === e;
            }) && c();
          })(),
            a.animate && requestAnimationFrame(e);
        });
      },
      clear: c
    };
  };
});
!(function(t, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : (t.dayjs = n());
})(this, function() {
  'use strict';
  var t = 'millisecond',
    n = 'second',
    e = 'minute',
    r = 'hour',
    i = 'day',
    s = 'week',
    u = 'month',
    o = 'quarter',
    a = 'year',
    h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
    f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    c = function(t, n, e) {
      var r = String(t);
      return !r || r.length >= n ? t : '' + Array(n + 1 - r.length).join(e) + t;
    },
    d = {
      s: c,
      z: function(t) {
        var n = -t.utcOffset(),
          e = Math.abs(n),
          r = Math.floor(e / 60),
          i = e % 60;
        return (n <= 0 ? '+' : '-') + c(r, 2, '0') + ':' + c(i, 2, '0');
      },
      m: function(t, n) {
        var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
          r = t.clone().add(e, u),
          i = n - r < 0,
          s = t.clone().add(e + (i ? -1 : 1), u);
        return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);
      },
      a: function(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
      },
      p: function(h) {
        return (
          { M: u, y: a, w: s, d: i, D: 'date', h: r, m: e, s: n, ms: t, Q: o }[
            h
          ] ||
          String(h || '')
            .toLowerCase()
            .replace(/s$/, '')
        );
      },
      u: function(t) {
        return void 0 === t;
      }
    },
    $ = {
      name: 'en',
      weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
        '_'
      ),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      )
    },
    l = 'en',
    m = {};
  m[l] = $;
  var y = function(t) {
      return t instanceof v;
    },
    M = function(t, n, e) {
      var r;
      if (!t) return l;
      if ('string' == typeof t) m[t] && (r = t), n && ((m[t] = n), (r = t));
      else {
        var i = t.name;
        (m[i] = t), (r = i);
      }
      return e || (l = r), r;
    },
    g = function(t, n, e) {
      if (y(t)) return t.clone();
      var r = n ? ('string' == typeof n ? { format: n, pl: e } : n) : {};
      return (r.date = t), new v(r);
    },
    D = d;
  (D.l = M),
    (D.i = y),
    (D.w = function(t, n) {
      return g(t, { locale: n.$L, utc: n.$u, $offset: n.$offset });
    });
  var v = (function() {
    function c(t) {
      (this.$L = this.$L || M(t.locale, null, !0)), this.parse(t);
    }
    var d = c.prototype;
    return (
      (d.parse = function(t) {
        (this.$d = (function(t) {
          var n = t.date,
            e = t.utc;
          if (null === n) return new Date(NaN);
          if (D.u(n)) return new Date();
          if (n instanceof Date) return new Date(n);
          if ('string' == typeof n && !/Z$/i.test(n)) {
            var r = n.match(h);
            if (r)
              return e
                ? new Date(
                    Date.UTC(
                      r[1],
                      r[2] - 1,
                      r[3] || 1,
                      r[4] || 0,
                      r[5] || 0,
                      r[6] || 0,
                      r[7] || 0
                    )
                  )
                : new Date(
                    r[1],
                    r[2] - 1,
                    r[3] || 1,
                    r[4] || 0,
                    r[5] || 0,
                    r[6] || 0,
                    r[7] || 0
                  );
          }
          return new Date(n);
        })(t)),
          this.init();
      }),
      (d.init = function() {
        var t = this.$d;
        (this.$y = t.getFullYear()),
          (this.$M = t.getMonth()),
          (this.$D = t.getDate()),
          (this.$W = t.getDay()),
          (this.$H = t.getHours()),
          (this.$m = t.getMinutes()),
          (this.$s = t.getSeconds()),
          (this.$ms = t.getMilliseconds());
      }),
      (d.$utils = function() {
        return D;
      }),
      (d.isValid = function() {
        return !('Invalid Date' === this.$d.toString());
      }),
      (d.isSame = function(t, n) {
        var e = g(t);
        return this.startOf(n) <= e && e <= this.endOf(n);
      }),
      (d.isAfter = function(t, n) {
        return g(t) < this.startOf(n);
      }),
      (d.isBefore = function(t, n) {
        return this.endOf(n) < g(t);
      }),
      (d.$g = function(t, n, e) {
        return D.u(t) ? this[n] : this.set(e, t);
      }),
      (d.year = function(t) {
        return this.$g(t, '$y', a);
      }),
      (d.month = function(t) {
        return this.$g(t, '$M', u);
      }),
      (d.day = function(t) {
        return this.$g(t, '$W', i);
      }),
      (d.date = function(t) {
        return this.$g(t, '$D', 'date');
      }),
      (d.hour = function(t) {
        return this.$g(t, '$H', r);
      }),
      (d.minute = function(t) {
        return this.$g(t, '$m', e);
      }),
      (d.second = function(t) {
        return this.$g(t, '$s', n);
      }),
      (d.millisecond = function(n) {
        return this.$g(n, '$ms', t);
      }),
      (d.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }),
      (d.valueOf = function() {
        return this.$d.getTime();
      }),
      (d.startOf = function(t, o) {
        var h = this,
          f = !!D.u(o) || o,
          c = D.p(t),
          d = function(t, n) {
            var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);
            return f ? e : e.endOf(i);
          },
          $ = function(t, n) {
            return D.w(
              h
                .toDate()
                [t].apply(
                  h.toDate(),
                  (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)
                ),
              h
            );
          },
          l = this.$W,
          m = this.$M,
          y = this.$D,
          M = 'set' + (this.$u ? 'UTC' : '');
        switch (c) {
          case a:
            return f ? d(1, 0) : d(31, 11);
          case u:
            return f ? d(1, m) : d(0, m + 1);
          case s:
            var g = this.$locale().weekStart || 0,
              v = (l < g ? l + 7 : l) - g;
            return d(f ? y - v : y + (6 - v), m);
          case i:
          case 'date':
            return $(M + 'Hours', 0);
          case r:
            return $(M + 'Minutes', 1);
          case e:
            return $(M + 'Seconds', 2);
          case n:
            return $(M + 'Milliseconds', 3);
          default:
            return this.clone();
        }
      }),
      (d.endOf = function(t) {
        return this.startOf(t, !1);
      }),
      (d.$set = function(s, o) {
        var h,
          f = D.p(s),
          c = 'set' + (this.$u ? 'UTC' : ''),
          d = ((h = {}),
          (h[i] = c + 'Date'),
          (h.date = c + 'Date'),
          (h[u] = c + 'Month'),
          (h[a] = c + 'FullYear'),
          (h[r] = c + 'Hours'),
          (h[e] = c + 'Minutes'),
          (h[n] = c + 'Seconds'),
          (h[t] = c + 'Milliseconds'),
          h)[f],
          $ = f === i ? this.$D + (o - this.$W) : o;
        if (f === u || f === a) {
          var l = this.clone().set('date', 1);
          l.$d[d]($),
            l.init(),
            (this.$d = l
              .set('date', Math.min(this.$D, l.daysInMonth()))
              .toDate());
        } else d && this.$d[d]($);
        return this.init(), this;
      }),
      (d.set = function(t, n) {
        return this.clone().$set(t, n);
      }),
      (d.get = function(t) {
        return this[D.p(t)]();
      }),
      (d.add = function(t, o) {
        var h,
          f = this;
        t = Number(t);
        var c = D.p(o),
          d = function(n) {
            var e = g(f);
            return D.w(e.date(e.date() + Math.round(n * t)), f);
          };
        if (c === u) return this.set(u, this.$M + t);
        if (c === a) return this.set(a, this.$y + t);
        if (c === i) return d(1);
        if (c === s) return d(7);
        var $ =
            ((h = {}), (h[e] = 6e4), (h[r] = 36e5), (h[n] = 1e3), h)[c] || 1,
          l = this.$d.getTime() + t * $;
        return D.w(l, this);
      }),
      (d.subtract = function(t, n) {
        return this.add(-1 * t, n);
      }),
      (d.format = function(t) {
        var n = this;
        if (!this.isValid()) return 'Invalid Date';
        var e = t || 'YYYY-MM-DDTHH:mm:ssZ',
          r = D.z(this),
          i = this.$locale(),
          s = this.$H,
          u = this.$m,
          o = this.$M,
          a = i.weekdays,
          h = i.months,
          c = function(t, r, i, s) {
            return (t && (t[r] || t(n, e))) || i[r].substr(0, s);
          },
          d = function(t) {
            return D.s(s % 12 || 12, t, '0');
          },
          $ =
            i.meridiem ||
            function(t, n, e) {
              var r = t < 12 ? 'AM' : 'PM';
              return e ? r.toLowerCase() : r;
            },
          l = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: o + 1,
            MM: D.s(o + 1, 2, '0'),
            MMM: c(i.monthsShort, o, h, 3),
            MMMM: h[o] || h(this, e),
            D: this.$D,
            DD: D.s(this.$D, 2, '0'),
            d: String(this.$W),
            dd: c(i.weekdaysMin, this.$W, a, 2),
            ddd: c(i.weekdaysShort, this.$W, a, 3),
            dddd: a[this.$W],
            H: String(s),
            HH: D.s(s, 2, '0'),
            h: d(1),
            hh: d(2),
            a: $(s, u, !0),
            A: $(s, u, !1),
            m: String(u),
            mm: D.s(u, 2, '0'),
            s: String(this.$s),
            ss: D.s(this.$s, 2, '0'),
            SSS: D.s(this.$ms, 3, '0'),
            Z: r
          };
        return e.replace(f, function(t, n) {
          return n || l[t] || r.replace(':', '');
        });
      }),
      (d.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }),
      (d.diff = function(t, h, f) {
        var c,
          d = D.p(h),
          $ = g(t),
          l = 6e4 * ($.utcOffset() - this.utcOffset()),
          m = this - $,
          y = D.m(this, $);
        return (
          (y =
            ((c = {}),
            (c[a] = y / 12),
            (c[u] = y),
            (c[o] = y / 3),
            (c[s] = (m - l) / 6048e5),
            (c[i] = (m - l) / 864e5),
            (c[r] = m / 36e5),
            (c[e] = m / 6e4),
            (c[n] = m / 1e3),
            c)[d] || m),
          f ? y : D.a(y)
        );
      }),
      (d.daysInMonth = function() {
        return this.endOf(u).$D;
      }),
      (d.$locale = function() {
        return m[this.$L];
      }),
      (d.locale = function(t, n) {
        if (!t) return this.$L;
        var e = this.clone(),
          r = M(t, n, !0);
        return r && (e.$L = r), e;
      }),
      (d.clone = function() {
        return D.w(this.$d, this);
      }),
      (d.toDate = function() {
        return new Date(this.valueOf());
      }),
      (d.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }),
      (d.toISOString = function() {
        return this.$d.toISOString();
      }),
      (d.toString = function() {
        return this.$d.toUTCString();
      }),
      c
    );
  })();
  return (
    (g.prototype = v.prototype),
    (g.extend = function(t, n) {
      return t(n, v, g), g;
    }),
    (g.locale = M),
    (g.isDayjs = y),
    (g.unix = function(t) {
      return g(1e3 * t);
    }),
    (g.en = m[l]),
    (g.Ls = m),
    g
  );
});
!(function(r, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (r.dayjs_plugin_relativeTime = t());
})(this, function() {
  'use strict';
  return function(r, t, e) {
    var n = t.prototype;
    e.en.relativeTime = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    };
    var o = function(r, t, n, o) {
      for (
        var d,
          i,
          u,
          a = n.$locale().relativeTime,
          f = [
            { l: 's', r: 44, d: 'second' },
            { l: 'm', r: 89 },
            { l: 'mm', r: 44, d: 'minute' },
            { l: 'h', r: 89 },
            { l: 'hh', r: 21, d: 'hour' },
            { l: 'd', r: 35 },
            { l: 'dd', r: 25, d: 'day' },
            { l: 'M', r: 45 },
            { l: 'MM', r: 10, d: 'month' },
            { l: 'y', r: 17 },
            { l: 'yy', d: 'year' }
          ],
          s = f.length,
          l = 0;
        l < s;
        l += 1
      ) {
        var h = f[l];
        h.d && (d = o ? e(r).diff(n, h.d, !0) : n.diff(r, h.d, !0));
        var m = Math.round(Math.abs(d));
        if (((u = d > 0), m <= h.r || !h.r)) {
          1 === m && l > 0 && (h = f[l - 1]);
          var c = a[h.l];
          i = 'string' == typeof c ? c.replace('%d', m) : c(m, t, h.l, u);
          break;
        }
      }
      return t ? i : (u ? a.future : a.past).replace('%s', i);
    };
    (n.to = function(r, t) {
      return o(r, t, this, !0);
    }),
      (n.from = function(r, t) {
        return o(r, t, this);
      });
    var d = function(r) {
      return r.$u ? e.utc() : e();
    };
    (n.toNow = function(r) {
      return this.to(d(this), r);
    }),
      (n.fromNow = function(r) {
        return this.from(d(this), r);
      });
  };
});
