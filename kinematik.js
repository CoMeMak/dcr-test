/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
var kinematik;
(function (kinematik) {
    var Robot = (function () {
        function Robot(a, d) {
            if (this.a === undefined)
                this.a = null;
            if (this.d === undefined)
                this.d = null;
            if (this.l2 === undefined)
                this.l2 = 0;
            if (this.ad2 === undefined)
                this.ad2 = 0;
            this.a = a;
            this.d = d;
            this.l2 = Math.sqrt(a[2] * a[2] + d[3] * d[3]);
            this.ad2 = Math.atan2(a[2], d[3]);
        }
        Robot.PI_$LI$ = function () { if (Robot.PI == null)
            Robot.PI = Math.PI; return Robot.PI; };
        ;
        Robot.HP_$LI$ = function () { if (Robot.HP == null)
            Robot.HP = 0.5 * Math.PI; return Robot.HP; };
        ;
        Robot.prototype.inverse$double_A$java_lang_Double$double_A_A$double_A_A = function (v, A4_deg, base, tool) {
            var Pos = Robot.matrix$double$double$double$double$double$double(v[0], v[1], v[2], v[3], v[4], v[5]);
            var goal;
            if (base == null)
                goal = Pos;
            else
                goal = Robot.mul34$double_A_A$double_A_A(base, Pos);
            var T6;
            if (tool == null) {
                T6 = goal;
            }
            else {
                var intool = Robot.inverse34(tool);
                T6 = Robot.mul34$double_A_A$double_A_A(goal, intool);
            }
            var inreDeg = this.inverse$double_A_A$java_lang_Double(T6, A4_deg);
            return inreDeg;
        };
        Robot.prototype.inverse = function (v, A4_deg, base, tool) {
            if (((v != null && v instanceof Array && (v.length == 0 || v[0] == null || (typeof v[0] === 'number'))) || v === null) && ((typeof A4_deg === 'number') || A4_deg === null) && ((base != null && base instanceof Array && (base.length == 0 || base[0] == null || base[0] instanceof Array)) || base === null) && ((tool != null && tool instanceof Array && (tool.length == 0 || tool[0] == null || tool[0] instanceof Array)) || tool === null)) {
                return this.inverse$double_A$java_lang_Double$double_A_A$double_A_A(v, A4_deg, base, tool);
            }
            else if (((v != null && v instanceof Array && (v.length == 0 || v[0] == null || v[0] instanceof Array)) || v === null) && ((typeof A4_deg === 'number') || A4_deg === null) && base === undefined && tool === undefined) {
                return this.inverse$double_A_A$java_lang_Double(v, A4_deg);
            }
            else
                throw new Error('invalid overload');
        };
        Robot.prototype.forward$double_A = function (degs) {
            var ts = this.deg_rad(degs);
            var c = [0, 0, 0, 0, 0, 0];
            var s = [0, 0, 0, 0, 0, 0];
            for (var i = 0; i < 6; i++) {
                {
                    c[i] = Math.cos(ts[i]);
                    s[i] = Math.sin(ts[i]);
                }
                ;
            }
            var m123 = [null, null, null];
            m123[0] = [c[0] * (c[1] * c[2] - s[1] * s[2]), s[0], c[0] * (c[1] * s[2] + s[1] * c[2]), c[0] * (this.a[2] * (c[1] * c[2] - s[1] * s[2]) + this.a[1] * c[1]) + this.a[0] * c[0]];
            m123[1] = [s[0] * (c[1] * c[2] - s[1] * s[2]), -c[0], s[0] * (c[1] * s[2] + s[1] * c[2]), s[0] * (this.a[2] * (c[1] * c[2] - s[1] * s[2]) + this.a[1] * c[1]) + this.a[0] * s[0]];
            m123[2] = [s[1] * c[2] + c[1] * s[2], 0, s[1] * s[2] - c[1] * c[2], this.a[2] * (s[1] * c[2] + c[1] * s[2]) + this.a[1] * s[1] + this.d[0]];
            var m456 = [null, null, null];
            m456[0] = [c[3] * c[4] * c[5] - s[3] * s[5], -c[3] * c[4] * s[5] - s[3] * c[5], c[3] * s[4], c[3] * s[4] * this.d[5]];
            m456[1] = [s[3] * c[4] * c[5] + c[3] * s[5], -s[3] * c[4] * s[5] + c[3] * c[5], s[3] * s[4], s[3] * s[4] * this.d[5]];
            m456[2] = [-s[4] * c[5], s[4] * s[5], c[4], c[4] * this.d[5] + this.d[3]];
            var arr = Robot.mul34$double_A_A$double_A_A(m123, m456);
            return arr;
        };
        Robot.prototype.forwardSequence = function (degs) {
            var ts = this.deg_rad(degs);
            var c = [0, 0, 0, 0, 0, 0];
            var s = [0, 0, 0, 0, 0, 0];
            for (var i = 0; i < 6; i++) {
                {
                    c[i] = Math.cos(ts[i]);
                    s[i] = Math.sin(ts[i]);
                }
                ;
            }
            var a0 = [null, null, null];
            a0[0] = [c[0], 0, s[0], this.a[0] * c[0]];
            a0[1] = [s[0], 0, -c[0], this.a[0] * s[0]];
            a0[2] = [0, 1, 0, this.d[0]];
            var a1 = [null, null, null];
            a1[0] = [c[1], -s[1], 0, this.a[1] * c[1]];
            a1[1] = [s[1], c[1], 0, this.a[1] * s[1]];
            a1[2] = [0, 0, 1, 0];
            var a2 = [null, null, null];
            a2[0] = [c[2], 0, s[2], this.a[2] * c[2]];
            a2[1] = [s[2], 0, -c[2], this.a[2] * s[2]];
            a2[2] = [0, 1, 0, 0];
            var a3 = [null, null, null];
            a3[0] = [c[3], 0, -s[3], 0];
            a3[1] = [s[3], 0, c[3], 0];
            a3[2] = [0, -1, 0, this.d[3]];
            var a4 = [null, null, null];
            a4[0] = [c[4], 0, s[4], 0];
            a4[1] = [s[4], 0, -c[4], 0];
            a4[2] = [0, 1, 0, 0];
            var a5 = [null, null, null];
            a5[0] = [c[5], -s[5], 0, 0];
            a5[1] = [s[5], c[5], 0, 0];
            a5[2] = [0, 0, 1, this.d[5]];
            var M = [null, null, null, null, null, null];
            M[0] = a0;
            M[1] = Robot.mul34$double_A_A$double_A_A(M[0], a1);
            M[2] = Robot.mul34$double_A_A$double_A_A(M[1], a2);
            M[3] = Robot.mul34$double_A_A$double_A_A(M[2], a3);
            M[4] = Robot.mul34$double_A_A$double_A_A(M[3], a4);
            M[5] = Robot.mul34$double_A_A$double_A_A(M[4], a5);
            return M;
        };
        Robot.prototype.forward$double_A$double_A_A$double_A_A = function (degs, base, tool) {
            var T6 = this.forward$double_A(degs);
            var goal;
            if (tool == null) {
                goal = T6;
            }
            else {
                goal = Robot.mul34$double_A_A$double_A_A(T6, tool);
            }
            var pos;
            if (base == null) {
                pos = goal;
            }
            else {
                var inbase = Robot.inverse34(base);
                pos = Robot.mul34$double_A_A$double_A_A(inbase, goal);
            }
            var as = Robot.ABC(pos);
            return [pos[0][3], pos[1][3], pos[2][3], as[0], as[1], as[2]];
        };
        Robot.prototype.forward = function (degs, base, tool) {
            if (((degs != null && degs instanceof Array && (degs.length == 0 || degs[0] == null || (typeof degs[0] === 'number'))) || degs === null) && ((base != null && base instanceof Array && (base.length == 0 || base[0] == null || base[0] instanceof Array)) || base === null) && ((tool != null && tool instanceof Array && (tool.length == 0 || tool[0] == null || tool[0] instanceof Array)) || tool === null)) {
                return this.forward$double_A$double_A_A$double_A_A(degs, base, tool);
            }
            else if (((degs != null && degs instanceof Array && (degs.length == 0 || degs[0] == null || (typeof degs[0] === 'number'))) || degs === null) && base === undefined && tool === undefined) {
                return this.forward$double_A(degs);
            }
            else
                throw new Error('invalid overload');
        };
        Robot.prototype.inverse$double_A_A$java_lang_Double = function (T6, A4_deg) {
            var theta = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            var center = Robot.mul34$double_A_A$double_A(T6, [0, 0, -this.d[5]]);
            theta[0] = Math.atan2(center[1], center[0]);
            var ll = Math.sqrt(center[0] * center[0] + center[1] * center[1]);
            var p1 = [this.a[0] * center[0] / ll, this.a[0] * center[1] / ll, this.d[0]];
            var l3 = kinematik.LA.dist(center, p1);
            var l1 = this.a[1];
            var beta = Math.acos((l1 * l1 + l3 * l3 - this.l2 * this.l2) / (2 * l1 * l3));
            var ttl = Math.sqrt((center[0] - p1[0]) * (center[0] - p1[0]) + (center[1] - p1[1]) * (center[1] - p1[1]));
            if (p1[0] * (center[0] - p1[0]) < 0)
                ttl = -ttl;
            var al = Math.atan2(center[2] - p1[2], ttl);
            theta[1] = beta + al;
            var gama = Math.acos((l1 * l1 + this.l2 * this.l2 - l3 * l3) / (2 * l1 * this.l2));
            theta[2] = gama - this.ad2 - Robot.HP_$LI$();
            var arr = [null, null, null, null];
            var c = [0, 0, 0];
            var s = [0, 0, 0];
            for (var i = 0; i < 3; i++) {
                {
                    c[i] = Math.cos(theta[i]);
                    s[i] = Math.sin(theta[i]);
                }
                ;
            }
            arr[0] = [c[0] * (c[1] * c[2] - s[1] * s[2]), s[0], c[0] * (c[1] * s[2] + s[1] * c[2]), c[0] * (this.a[2] * (c[1] * c[2] - s[1] * s[2]) + this.a[1] * c[1]) + this.a[0] * c[0]];
            arr[1] = [s[0] * (c[1] * c[2] - s[1] * s[2]), -c[0], s[0] * (c[1] * s[2] + s[1] * c[2]), s[0] * (this.a[2] * (c[1] * c[2] - s[1] * s[2]) + this.a[1] * c[1]) + this.a[0] * s[0]];
            arr[2] = [s[1] * c[2] + c[1] * s[2], 0, s[1] * s[2] - c[1] * c[2], this.a[2] * (s[1] * c[2] + c[1] * s[2]) + this.a[1] * s[1] + this.d[0]];
            var in123 = Robot.inverse34(arr);
            var mr = Robot.mul34$double_A_A$double_A_A(in123, T6);
            var c5 = mr[2][2];
            if (Math.abs(c5 - 1) < 1.0E-6) {
                var A4 = -Robot.PI_$LI$() * A4_deg / 180;
                var c4 = Math.cos(A4);
                var s4 = Math.sin(A4);
                var s6 = c4 * mr[1][0] - s4 * mr[0][0];
                var c6 = void 0;
                if (Math.abs(c4) > Math.abs(s4))
                    c6 = (mr[0][0] + s4 * s6) / c4;
                else
                    c6 = (mr[1][0] - c4 * s6) / s4;
                theta[3] = A4;
                theta[4] = 0;
                theta[5] = Math.atan2(s6, c6);
                if (Math.abs(c6) > 1 || Math.abs(s6) > 1)
                    throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
            else {
                var ang = Math.atan2(mr[1][2], mr[0][2]);
                theta[3] = ang;
                theta[4] = Math.acos(c5);
                theta[5] = Math.atan2(mr[2][1], -mr[2][0]);
            }
            var inreDeg = this.rad_deg(theta);
            return inreDeg;
        };
        /*private*/ Robot.prototype.deg_rad = function (ds) {
            var rd = [0, 0, 0, 0, 0, 0];
            for (var i = 0; i < 6; i++) {
                rd[i] = ds[i] * Robot.PI_$LI$() / 180;
            }
            rd[2] -= Robot.HP_$LI$();
            rd[5] += Robot.PI_$LI$();
            for (var i = 0; i < 6; i++) {
                rd[i] = -rd[i];
            }
            return rd;
        };
        /*private*/ Robot.prototype.rad_deg = function (ds) {
            var rd = [0, 0, 0, 0, 0, 0];
            for (var i = 0; i < 6; i++) {
                rd[i] = -ds[i];
            }
            rd[2] += Robot.HP_$LI$();
            rd[5] -= Robot.PI_$LI$();
            for (var i = 0; i < 6; i++) {
                rd[i] = rd[i] * 180 / Robot.PI_$LI$();
            }
            return rd;
        };
        Robot.mul34$double_A_A$double_A_A = function (a, b) {
            var re = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([3, 4]);
            for (var i = 0; i < 3; i++) {
                {
                    for (var j = 0; j < 4; j++) {
                        {
                            var b3j = (j === 3 ? 1 : 0);
                            re[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j] + a[i][3] * b3j;
                        }
                        ;
                    }
                }
                ;
            }
            return re;
        };
        Robot.mul34 = function (a, b) {
            if (((a != null && a instanceof Array && (a.length == 0 || a[0] == null || a[0] instanceof Array)) || a === null) && ((b != null && b instanceof Array && (b.length == 0 || b[0] == null || b[0] instanceof Array)) || b === null)) {
                return kinematik.Robot.mul34$double_A_A$double_A_A(a, b);
            }
            else if (((a != null && a instanceof Array && (a.length == 0 || a[0] == null || a[0] instanceof Array)) || a === null) && ((b != null && b instanceof Array && (b.length == 0 || b[0] == null || (typeof b[0] === 'number'))) || b === null)) {
                return kinematik.Robot.mul34$double_A_A$double_A(a, b);
            }
            else
                throw new Error('invalid overload');
        };
        Robot.mul34$double_A_A$double_A = function (a, b) {
            var re = [0, 0, 0];
            for (var i = 0; i < 3; i++) {
                re[i] = a[i][0] * b[0] + a[i][1] * b[1] + a[i][2] * b[2] + a[i][3];
            }
            return re;
        };
        Robot.matrix$double$double$double$double$double$double = function (x, y, z, aDeg, bDeg, cDeg) {
            var a = -aDeg * Robot.PI_$LI$() / 180;
            var b = -bDeg * Robot.PI_$LI$() / 180;
            var c = -cDeg * Robot.PI_$LI$() / 180;
            var ca = Math.cos(a);
            var sa = Math.sin(a);
            var cb = Math.cos(b);
            var sb = Math.sin(b);
            var cc = Math.cos(c);
            var sc = Math.sin(c);
            var tt = [null, null, null];
            tt[0] = [ca * cb, sa * cc + ca * sb * sc, sa * sc - ca * sb * cc, x];
            tt[1] = [-sa * cb, ca * cc - sa * sb * sc, ca * sc + sa * sb * cc, y];
            tt[2] = [sb, -cb * sc, cb * cc, z];
            return tt;
        };
        Robot.prototype.matrix = function (x, y, z, aDeg, bDeg, cDeg) {
            if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null) && ((typeof aDeg === 'number') || aDeg === null) && ((typeof bDeg === 'number') || bDeg === null) && ((typeof cDeg === 'number') || cDeg === null)) {
                return kinematik.Robot.matrix$double$double$double$double$double$double(x, y, z, aDeg, bDeg, cDeg);
            }
            else if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null) && aDeg === undefined && bDeg === undefined && cDeg === undefined) {
                return kinematik.Robot.matrix$double$double$double(x, y, z);
            }
            else
                throw new Error('invalid overload');
        };
        Robot.matrix$double$double$double = function (aDeg, bDeg, cDeg) {
            var a = -aDeg * Robot.PI_$LI$() / 180;
            var b = -bDeg * Robot.PI_$LI$() / 180;
            var c = -cDeg * Robot.PI_$LI$() / 180;
            var ca = Math.cos(a);
            var sa = Math.sin(a);
            var cb = Math.cos(b);
            var sb = Math.sin(b);
            var cc = Math.cos(c);
            var sc = Math.sin(c);
            var tt = [null, null, null];
            tt[0] = [ca * cb, sa * cc + ca * sb * sc, sa * sc - ca * sb * cc];
            tt[1] = [-sa * cb, ca * cc - sa * sb * sc, ca * sc + sa * sb * cc];
            tt[2] = [sb, -cb * sc, cb * cc];
            return tt;
        };
        Robot.ABCby3Point = function (_dx, _dxy) {
            var dx = kinematik.LA.normalize(_dx);
            var tt = kinematik.LA.mul(dx, kinematik.LA.dot(_dxy, dx));
            var _dy = kinematik.LA.sub(_dxy, tt);
            var dy = kinematik.LA.normalize(_dy);
            var dz = kinematik.LA.cross(dx, dy);
            var cacb = dx[0];
            var sacb = -dx[1];
            var sb = dx[2];
            var cbsc = -dy[2];
            var cbcc = dz[2];
            var cb = Math.sqrt(1 - sb * sb);
            var a = Math.atan2(sacb, cacb) * -180 / Robot.PI_$LI$();
            var b = Math.atan2(sb, cb) * -180 / Robot.PI_$LI$();
            var c = Math.atan2(cbsc, cbcc) * -180 / Robot.PI_$LI$();
            return [a, b, c];
        };
        Robot.ABC = function (m) {
            var sb = m[2][0];
            var cb = Math.sqrt(1 - sb * sb);
            var ca = m[0][0];
            var sa = -m[1][0];
            var cc = m[2][2];
            var sc = -m[2][1];
            var a = Math.atan2(sa, ca) * -180 / Robot.PI_$LI$();
            var b = Math.atan2(sb, cb) * -180 / Robot.PI_$LI$();
            var c = Math.atan2(sc, cc) * -180 / Robot.PI_$LI$();
            return [a, b, c];
        };
        Robot.flipABC$double_A = function (abc) {
            return Robot.flipABC$double$double$double(abc[0], abc[1], abc[2]);
        };
        Robot.flipABC$double$double$double = function (a, b, c) {
            var na = a > 0 ? (a - 180) : (a + 180);
            var nb = b > 0 ? (180 - b) : (-180 - b);
            var nc = c > 0 ? (c - 180) : (c + 180);
            return [na, nb, nc];
        };
        Robot.flipABC = function (a, b, c) {
            if (((typeof a === 'number') || a === null) && ((typeof b === 'number') || b === null) && ((typeof c === 'number') || c === null)) {
                return kinematik.Robot.flipABC$double$double$double(a, b, c);
            }
            else if (((a != null && a instanceof Array && (a.length == 0 || a[0] == null || (typeof a[0] === 'number'))) || a === null) && b === undefined && c === undefined) {
                return kinematik.Robot.flipABC$double_A(a);
            }
            else
                throw new Error('invalid overload');
        };
        Robot.prototype.inverse34 = function (m) {
            var v = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([3, 4]);
            v[0][0] = -m[1][2] * m[2][1] + m[1][1] * m[2][2];
            v[0][1] = m[0][2] * m[2][1] - m[0][1] * m[2][2];
            v[0][2] = -m[0][2] * m[1][1] + m[0][1] * m[1][2];
            v[0][3] = m[0][3] * m[1][2] * m[2][1] - m[0][2] * m[1][3] * m[2][1] - m[0][3] * m[1][1] * m[2][2] + m[0][1] * m[1][3] * m[2][2] + m[0][2] * m[1][1] * m[2][3] - m[0][1] * m[1][2] * m[2][3];
            v[1][0] = m[1][2] * m[2][0] - m[1][0] * m[2][2];
            v[1][1] = -m[0][2] * m[2][0] + m[0][0] * m[2][2];
            v[1][2] = m[0][2] * m[1][0] - m[0][0] * m[1][2];
            v[1][3] = m[0][2] * m[1][3] * m[2][0] - m[0][3] * m[1][2] * m[2][0] + m[0][3] * m[1][0] * m[2][2] - m[0][0] * m[1][3] * m[2][2] - m[0][2] * m[1][0] * m[2][3] + m[0][0] * m[1][2] * m[2][3];
            v[2][0] = -m[1][1] * m[2][0] + m[1][0] * m[2][1];
            v[2][1] = m[0][1] * m[2][0] - m[0][0] * m[2][1];
            v[2][2] = -m[0][1] * m[1][0] + m[0][0] * m[1][1];
            v[2][3] = m[0][3] * m[1][1] * m[2][0] - m[0][1] * m[1][3] * m[2][0] - m[0][3] * m[1][0] * m[2][1] + m[0][0] * m[1][3] * m[2][1] + m[0][1] * m[1][0] * m[2][3] - m[0][0] * m[1][1] * m[2][3];
            return v;
        };
		Robot.inverse34 = function (m) {
            var v = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([3, 4]);
            v[0][0] = -m[1][2] * m[2][1] + m[1][1] * m[2][2];
            v[0][1] = m[0][2] * m[2][1] - m[0][1] * m[2][2];
            v[0][2] = -m[0][2] * m[1][1] + m[0][1] * m[1][2];
            v[0][3] = m[0][3] * m[1][2] * m[2][1] - m[0][2] * m[1][3] * m[2][1] - m[0][3] * m[1][1] * m[2][2] + m[0][1] * m[1][3] * m[2][2] + m[0][2] * m[1][1] * m[2][3] - m[0][1] * m[1][2] * m[2][3];
            v[1][0] = m[1][2] * m[2][0] - m[1][0] * m[2][2];
            v[1][1] = -m[0][2] * m[2][0] + m[0][0] * m[2][2];
            v[1][2] = m[0][2] * m[1][0] - m[0][0] * m[1][2];
            v[1][3] = m[0][2] * m[1][3] * m[2][0] - m[0][3] * m[1][2] * m[2][0] + m[0][3] * m[1][0] * m[2][2] - m[0][0] * m[1][3] * m[2][2] - m[0][2] * m[1][0] * m[2][3] + m[0][0] * m[1][2] * m[2][3];
            v[2][0] = -m[1][1] * m[2][0] + m[1][0] * m[2][1];
            v[2][1] = m[0][1] * m[2][0] - m[0][0] * m[2][1];
            v[2][2] = -m[0][1] * m[1][0] + m[0][0] * m[1][1];
            v[2][3] = m[0][3] * m[1][1] * m[2][0] - m[0][1] * m[1][3] * m[2][0] - m[0][3] * m[1][0] * m[2][1] + m[0][0] * m[1][3] * m[2][1] + m[0][1] * m[1][0] * m[2][3] - m[0][0] * m[1][1] * m[2][3];
            return v;
        };
        return Robot;
    }());
    kinematik.Robot = Robot;
    Robot["__class"] = "kinematik.Robot";
    var LA = (function () {
        function LA() {
        }
        LA.dist = function (a, b) {
            var r = 0;
            for (var i = 0; i < a.length; i++) {
                r += (a[i] - b[i]) * (a[i] - b[i]);
            }
            return Math.sqrt(r);
        };
        LA.sub = function (a, b) {
            var re = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(a.length);
            for (var i = 0; i < a.length; i++) {
                re[i] = a[i] - b[i];
            }
            return re;
        };
        LA.mag = function (a) {
            var r = 0;
            for (var i = 0; i < a.length; i++) {
                r += a[i] * a[i];
            }
            r = Math.sqrt(r);
            return r;
        };
        LA.normalize = function (a) {
            var r = LA.mag(a);
            var re = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(a.length);
            for (var i = 0; i < a.length; i++) {
                re[i] = a[i] / r;
            }
            return re;
        };
        LA.dot = function (a, b) {
            var re = 0;
            for (var i = 0; i < a.length; i++) {
                re += a[i] * b[i];
            }
            return re;
        };
        LA.mul = function (a, s) {
            var re = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(a.length);
            for (var i = 0; i < a.length; i++) {
                re[i] = a[i] * s;
            }
            return re;
        };
        LA.cross = function (b, c) {
            var re = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(b.length);
            re[0] = b[1] * c[2] - b[2] * c[1];
            re[1] = b[2] * c[0] - b[0] * c[2];
            re[2] = b[0] * c[1] - b[1] * c[0];
            return re;
        };
        return LA;
    }());
    kinematik.LA = LA;
    LA["__class"] = "kinematik.LA";
})(kinematik || (kinematik = {}));
kinematik.Robot.HP_$LI$();
kinematik.Robot.PI_$LI$();
