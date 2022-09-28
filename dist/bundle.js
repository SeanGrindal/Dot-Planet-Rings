;(() => {
  'use strict'
  const t = 100,
    e = 1e3,
    n = 1001,
    i = 1002,
    r = 1003,
    s = 1006,
    a = 1008,
    o = 1012,
    l = 1014,
    c = 1015,
    h = 1016,
    u = 1020,
    d = 1022,
    p = 1023,
    f = 1026,
    m = 1027,
    g = 2300,
    v = 2301,
    y = 2302,
    x = 2400,
    _ = 2401,
    b = 2402,
    w = 3e3,
    M = 7680,
    S = 35044,
    E = 35048,
    T = '300 es'
  function L() {}
  Object.assign(L.prototype, {
    addEventListener: function (t, e) {
      void 0 === this._listeners && (this._listeners = {})
      const n = this._listeners
      void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e)
    },
    hasEventListener: function (t, e) {
      if (void 0 === this._listeners) return !1
      const n = this._listeners
      return void 0 !== n[t] && -1 !== n[t].indexOf(e)
    },
    removeEventListener: function (t, e) {
      if (void 0 === this._listeners) return
      const n = this._listeners[t]
      if (void 0 !== n) {
        const t = n.indexOf(e)
        ;-1 !== t && n.splice(t, 1)
      }
    },
    dispatchEvent: function (t) {
      if (void 0 === this._listeners) return
      const e = this._listeners[t.type]
      if (void 0 !== e) {
        t.target = this
        const n = e.slice(0)
        for (let e = 0, i = n.length; e < i; e++) n[e].call(this, t)
      }
    },
  })
  const A = []
  for (let t = 0; t < 256; t++) A[t] = (t < 16 ? '0' : '') + t.toString(16)
  let R = 1234567
  const P = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      const t = (4294967295 * Math.random()) | 0,
        e = (4294967295 * Math.random()) | 0,
        n = (4294967295 * Math.random()) | 0,
        i = (4294967295 * Math.random()) | 0
      return (
        A[255 & t] +
        A[(t >> 8) & 255] +
        A[(t >> 16) & 255] +
        A[(t >> 24) & 255] +
        '-' +
        A[255 & e] +
        A[(e >> 8) & 255] +
        '-' +
        A[((e >> 16) & 15) | 64] +
        A[(e >> 24) & 255] +
        '-' +
        A[(63 & n) | 128] +
        A[(n >> 8) & 255] +
        '-' +
        A[(n >> 16) & 255] +
        A[(n >> 24) & 255] +
        A[255 & i] +
        A[(i >> 8) & 255] +
        A[(i >> 16) & 255] +
        A[(i >> 24) & 255]
      ).toUpperCase()
    },
    clamp: function (t, e, n) {
      return Math.max(e, Math.min(n, t))
    },
    euclideanModulo: function (t, e) {
      return ((t % e) + e) % e
    },
    mapLinear: function (t, e, n, i, r) {
      return i + ((t - e) * (r - i)) / (n - e)
    },
    lerp: function (t, e, n) {
      return (1 - n) * t + n * e
    },
    damp: function (t, e, n, i) {
      return P.lerp(t, e, 1 - Math.exp(-n * i))
    },
    pingpong: function (t, e = 1) {
      return e - Math.abs(P.euclideanModulo(t, 2 * e) - e)
    },
    smoothstep: function (t, e, n) {
      return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * (3 - 2 * t)
    },
    smootherstep: function (t, e, n) {
      return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * t * (t * (6 * t - 15) + 10)
    },
    randInt: function (t, e) {
      return t + Math.floor(Math.random() * (e - t + 1))
    },
    randFloat: function (t, e) {
      return t + Math.random() * (e - t)
    },
    randFloatSpread: function (t) {
      return t * (0.5 - Math.random())
    },
    seededRandom: function (t) {
      return (
        void 0 !== t && (R = t % 2147483647), (R = (16807 * R) % 2147483647), (R - 1) / 2147483646
      )
    },
    degToRad: function (t) {
      return t * P.DEG2RAD
    },
    radToDeg: function (t) {
      return t * P.RAD2DEG
    },
    isPowerOfTwo: function (t) {
      return 0 == (t & (t - 1)) && 0 !== t
    },
    ceilPowerOfTwo: function (t) {
      return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2))
    },
    floorPowerOfTwo: function (t) {
      return Math.pow(2, Math.floor(Math.log(t) / Math.LN2))
    },
    setQuaternionFromProperEuler: function (t, e, n, i, r) {
      const s = Math.cos,
        a = Math.sin,
        o = s(n / 2),
        l = a(n / 2),
        c = s((e + i) / 2),
        h = a((e + i) / 2),
        u = s((e - i) / 2),
        d = a((e - i) / 2),
        p = s((i - e) / 2),
        f = a((i - e) / 2)
      switch (r) {
        case 'XYX':
          t.set(o * h, l * u, l * d, o * c)
          break
        case 'YZY':
          t.set(l * d, o * h, l * u, o * c)
          break
        case 'ZXZ':
          t.set(l * u, l * d, o * h, o * c)
          break
        case 'XZX':
          t.set(o * h, l * f, l * p, o * c)
          break
        case 'YXY':
          t.set(l * p, o * h, l * f, o * c)
          break
        case 'ZYZ':
          t.set(l * f, l * p, o * h, o * c)
          break
        default:
          console.warn(
            'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + r
          )
      }
    },
  }
  class C {
    constructor(t = 0, e = 0) {
      ;(this.x = t), (this.y = e)
    }
    get width() {
      return this.x
    }
    set width(t) {
      this.x = t
    }
    get height() {
      return this.y
    }
    set height(t) {
      this.y = t
    }
    set(t, e) {
      return (this.x = t), (this.y = e), this
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), this
    }
    setX(t) {
      return (this.x = t), this
    }
    setY(t) {
      return (this.y = t), this
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e
          break
        case 1:
          this.y = e
          break
        default:
          throw new Error('index is out of range: ' + t)
      }
      return this
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x
        case 1:
          return this.y
        default:
          throw new Error('index is out of range: ' + t)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y)
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), this
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), this)
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), this
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), this
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), this
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), this)
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), this
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), this
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), this
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), this
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), this
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t)
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = t.elements
      return (this.x = i[0] * e + i[3] * n + i[6]), (this.y = i[1] * e + i[4] * n + i[7]), this
    }
    min(t) {
      return (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this
    }
    max(t) {
      return (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        this
      )
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        this
      )
    }
    clampLength(t, e) {
      const n = this.length()
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
    }
    floor() {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
    }
    ceil() {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this
    }
    round() {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        this
      )
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), this
    }
    dot(t) {
      return this.x * t.x + this.y * t.y
    }
    cross(t) {
      return this.x * t.y - this.y * t.x
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t))
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y
      return e * e + n * n
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t)
    }
    lerp(t, e) {
      return (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this
    }
    lerpVectors(t, e, n) {
      return (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), this
    }
    equals(t) {
      return t.x === this.x && t.y === this.y
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), this
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), t
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().'),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        this
      )
    }
    rotateAround(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = this.x - t.x,
        s = this.y - t.y
      return (this.x = r * n - s * i + t.x), (this.y = r * i + s * n + t.y), this
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), this
    }
  }
  C.prototype.isVector2 = !0
  class D {
    constructor() {
      ;(this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.'
          )
    }
    set(t, e, n, i, r, s, a, o, l) {
      const c = this.elements
      return (
        (c[0] = t),
        (c[1] = i),
        (c[2] = a),
        (c[3] = e),
        (c[4] = r),
        (c[5] = o),
        (c[6] = n),
        (c[7] = s),
        (c[8] = l),
        this
      )
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
    }
    copy(t) {
      const e = this.elements,
        n = t.elements
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        this
      )
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        n.setFromMatrix3Column(this, 2),
        this
      )
    }
    setFromMatrix4(t) {
      const e = t.elements
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
    }
    multiply(t) {
      return this.multiplyMatrices(this, t)
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this)
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        s = n[0],
        a = n[3],
        o = n[6],
        l = n[1],
        c = n[4],
        h = n[7],
        u = n[2],
        d = n[5],
        p = n[8],
        f = i[0],
        m = i[3],
        g = i[6],
        v = i[1],
        y = i[4],
        x = i[7],
        _ = i[2],
        b = i[5],
        w = i[8]
      return (
        (r[0] = s * f + a * v + o * _),
        (r[3] = s * m + a * y + o * b),
        (r[6] = s * g + a * x + o * w),
        (r[1] = l * f + c * v + h * _),
        (r[4] = l * m + c * y + h * b),
        (r[7] = l * g + c * x + h * w),
        (r[2] = u * f + d * v + p * _),
        (r[5] = u * m + d * y + p * b),
        (r[8] = u * g + d * x + p * w),
        this
      )
    }
    multiplyScalar(t) {
      const e = this.elements
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      )
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        c = t[8]
      return e * s * c - e * a * l - n * r * c + n * a * o + i * r * l - i * s * o
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        c = t[8],
        h = c * s - a * l,
        u = a * o - c * r,
        d = l * r - s * o,
        p = e * h + n * u + i * d
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
      const f = 1 / p
      return (
        (t[0] = h * f),
        (t[1] = (i * l - c * n) * f),
        (t[2] = (a * n - i * s) * f),
        (t[3] = u * f),
        (t[4] = (c * e - i * o) * f),
        (t[5] = (i * r - a * e) * f),
        (t[6] = d * f),
        (t[7] = (n * o - l * e) * f),
        (t[8] = (s * e - n * r) * f),
        this
      )
    }
    transpose() {
      let t
      const e = this.elements
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      )
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose()
    }
    transposeIntoArray(t) {
      const e = this.elements
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      )
    }
    setUvTransform(t, e, n, i, r, s, a) {
      const o = Math.cos(r),
        l = Math.sin(r)
      return (
        this.set(
          n * o,
          n * l,
          -n * (o * s + l * a) + s + t,
          -i * l,
          i * o,
          -i * (-l * s + o * a) + a + e,
          0,
          0,
          1
        ),
        this
      )
    }
    scale(t, e) {
      const n = this.elements
      return (n[0] *= t), (n[3] *= t), (n[6] *= t), (n[1] *= e), (n[4] *= e), (n[7] *= e), this
    }
    rotate(t) {
      const e = Math.cos(t),
        n = Math.sin(t),
        i = this.elements,
        r = i[0],
        s = i[3],
        a = i[6],
        o = i[1],
        l = i[4],
        c = i[7]
      return (
        (i[0] = e * r + n * o),
        (i[3] = e * s + n * l),
        (i[6] = e * a + n * c),
        (i[1] = -n * r + e * o),
        (i[4] = -n * s + e * l),
        (i[7] = -n * a + e * c),
        this
      )
    }
    translate(t, e) {
      const n = this.elements
      return (
        (n[0] += t * n[2]),
        (n[3] += t * n[5]),
        (n[6] += t * n[8]),
        (n[1] += e * n[2]),
        (n[4] += e * n[5]),
        (n[7] += e * n[8]),
        this
      )
    }
    equals(t) {
      const e = this.elements,
        n = t.elements
      for (let t = 0; t < 9; t++) if (e[t] !== n[t]) return !1
      return !0
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e]
      return this
    }
    toArray(t = [], e = 0) {
      const n = this.elements
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        t
      )
    }
    clone() {
      return new this.constructor().fromArray(this.elements)
    }
  }
  let I
  D.prototype.isMatrix3 = !0
  const N = {
    getDataURL: function (t) {
      if (/^data:/i.test(t.src)) return t.src
      if ('undefined' == typeof HTMLCanvasElement) return t.src
      let e
      if (t instanceof HTMLCanvasElement) e = t
      else {
        void 0 === I && (I = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')),
          (I.width = t.width),
          (I.height = t.height)
        const n = I.getContext('2d')
        t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height),
          (e = I)
      }
      return e.width > 2048 || e.height > 2048
        ? e.toDataURL('image/jpeg', 0.6)
        : e.toDataURL('image/png')
    },
  }
  let O = 0
  class z extends L {
    constructor(
      t = z.DEFAULT_IMAGE,
      e = z.DEFAULT_MAPPING,
      n = 1001,
      i = 1001,
      r = 1006,
      s = 1008,
      a = 1023,
      o = 1009,
      l = 1,
      c = 3e3
    ) {
      super(),
        Object.defineProperty(this, 'id', { value: O++ }),
        (this.uuid = P.generateUUID()),
        (this.name = ''),
        (this.image = t),
        (this.mipmaps = []),
        (this.mapping = e),
        (this.wrapS = n),
        (this.wrapT = i),
        (this.magFilter = r),
        (this.minFilter = s),
        (this.anisotropy = l),
        (this.format = a),
        (this.internalFormat = null),
        (this.type = o),
        (this.offset = new C(0, 0)),
        (this.repeat = new C(1, 1)),
        (this.center = new C(0, 0)),
        (this.rotation = 0),
        (this.matrixAutoUpdate = !0),
        (this.matrix = new D()),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        (this.encoding = c),
        (this.version = 0),
        (this.onUpdate = null)
    }
    updateMatrix() {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y
      )
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.image = t.image),
        (this.mipmaps = t.mipmaps.slice(0)),
        (this.mapping = t.mapping),
        (this.wrapS = t.wrapS),
        (this.wrapT = t.wrapT),
        (this.magFilter = t.magFilter),
        (this.minFilter = t.minFilter),
        (this.anisotropy = t.anisotropy),
        (this.format = t.format),
        (this.internalFormat = t.internalFormat),
        (this.type = t.type),
        this.offset.copy(t.offset),
        this.repeat.copy(t.repeat),
        this.center.copy(t.center),
        (this.rotation = t.rotation),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this.matrix.copy(t.matrix),
        (this.generateMipmaps = t.generateMipmaps),
        (this.premultiplyAlpha = t.premultiplyAlpha),
        (this.flipY = t.flipY),
        (this.unpackAlignment = t.unpackAlignment),
        (this.encoding = t.encoding),
        this
      )
    }
    toJSON(t) {
      const e = void 0 === t || 'string' == typeof t
      if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid]
      const n = {
        metadata: { version: 4.5, type: 'Texture', generator: 'Texture.toJSON' },
        uuid: this.uuid,
        name: this.name,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        type: this.type,
        encoding: this.encoding,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      }
      if (void 0 !== this.image) {
        const i = this.image
        if ((void 0 === i.uuid && (i.uuid = P.generateUUID()), !e && void 0 === t.images[i.uuid])) {
          let e
          if (Array.isArray(i)) {
            e = []
            for (let t = 0, n = i.length; t < n; t++)
              i[t].isDataTexture ? e.push(H(i[t].image)) : e.push(H(i[t]))
          } else e = H(i)
          t.images[i.uuid] = { uuid: i.uuid, url: e }
        }
        n.image = i.uuid
      }
      return e || (t.textures[this.uuid] = n), n
    }
    dispose() {
      this.dispatchEvent({ type: 'dispose' })
    }
    transformUv(t) {
      if (300 !== this.mapping) return t
      if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
        switch (this.wrapS) {
          case e:
            t.x = t.x - Math.floor(t.x)
            break
          case n:
            t.x = t.x < 0 ? 0 : 1
            break
          case i:
            1 === Math.abs(Math.floor(t.x) % 2)
              ? (t.x = Math.ceil(t.x) - t.x)
              : (t.x = t.x - Math.floor(t.x))
        }
      if (t.y < 0 || t.y > 1)
        switch (this.wrapT) {
          case e:
            t.y = t.y - Math.floor(t.y)
            break
          case n:
            t.y = t.y < 0 ? 0 : 1
            break
          case i:
            1 === Math.abs(Math.floor(t.y) % 2)
              ? (t.y = Math.ceil(t.y) - t.y)
              : (t.y = t.y - Math.floor(t.y))
        }
      return this.flipY && (t.y = 1 - t.y), t
    }
    set needsUpdate(t) {
      !0 === t && this.version++
    }
  }
  function H(t) {
    return ('undefined' != typeof HTMLImageElement && t instanceof HTMLImageElement) ||
      ('undefined' != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement) ||
      ('undefined' != typeof ImageBitmap && t instanceof ImageBitmap)
      ? N.getDataURL(t)
      : t.data
      ? {
          data: Array.prototype.slice.call(t.data),
          width: t.width,
          height: t.height,
          type: t.data.constructor.name,
        }
      : (console.warn('THREE.Texture: Unable to serialize Texture.'), {})
  }
  ;(z.DEFAULT_IMAGE = void 0), (z.DEFAULT_MAPPING = 300), (z.prototype.isTexture = !0)
  class B {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      ;(this.x = t), (this.y = e), (this.z = n), (this.w = i)
    }
    get width() {
      return this.z
    }
    set width(t) {
      this.z = t
    }
    get height() {
      return this.w
    }
    set height(t) {
      this.w = t
    }
    set(t, e, n, i) {
      return (this.x = t), (this.y = e), (this.z = n), (this.w = i), this
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this
    }
    setX(t) {
      return (this.x = t), this
    }
    setY(t) {
      return (this.y = t), this
    }
    setZ(t) {
      return (this.z = t), this
    }
    setW(t) {
      return (this.w = t), this
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e
          break
        case 1:
          this.y = e
          break
        case 2:
          this.z = e
          break
        case 3:
          this.w = e
          break
        default:
          throw new Error('index is out of range: ' + t)
      }
      return this
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x
        case 1:
          return this.y
        case 2:
          return this.z
        case 3:
          return this.w
        default:
          throw new Error('index is out of range: ' + t)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w)
    }
    copy(t) {
      return (
        (this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = void 0 !== t.w ? t.w : 1), this
      )
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w += t.w), this)
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), (this.w += t), this
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), (this.w = t.w + e.w), this
      )
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), (this.w += t.w * e), this
      )
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -= t.w), this)
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), (this.w = t.w - e.w), this
      )
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = this.w,
        s = t.elements
      return (
        (this.x = s[0] * e + s[4] * n + s[8] * i + s[12] * r),
        (this.y = s[1] * e + s[5] * n + s[9] * i + s[13] * r),
        (this.z = s[2] * e + s[6] * n + s[10] * i + s[14] * r),
        (this.w = s[3] * e + s[7] * n + s[11] * i + s[15] * r),
        this
      )
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t)
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w)
      const e = Math.sqrt(1 - t.w * t.w)
      return (
        e < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
        this
      )
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, n, i, r
      const s = 0.01,
        a = 0.1,
        o = t.elements,
        l = o[0],
        c = o[4],
        h = o[8],
        u = o[1],
        d = o[5],
        p = o[9],
        f = o[2],
        m = o[6],
        g = o[10]
      if (Math.abs(c - u) < s && Math.abs(h - f) < s && Math.abs(p - m) < s) {
        if (
          Math.abs(c + u) < a &&
          Math.abs(h + f) < a &&
          Math.abs(p + m) < a &&
          Math.abs(l + d + g - 3) < a
        )
          return this.set(1, 0, 0, 0), this
        e = Math.PI
        const t = (l + 1) / 2,
          o = (d + 1) / 2,
          v = (g + 1) / 2,
          y = (c + u) / 4,
          x = (h + f) / 4,
          _ = (p + m) / 4
        return (
          t > o && t > v
            ? t < s
              ? ((n = 0), (i = 0.707106781), (r = 0.707106781))
              : ((n = Math.sqrt(t)), (i = y / n), (r = x / n))
            : o > v
            ? o < s
              ? ((n = 0.707106781), (i = 0), (r = 0.707106781))
              : ((i = Math.sqrt(o)), (n = y / i), (r = _ / i))
            : v < s
            ? ((n = 0.707106781), (i = 0.707106781), (r = 0))
            : ((r = Math.sqrt(v)), (n = x / r), (i = _ / r)),
          this.set(n, i, r, e),
          this
        )
      }
      let v = Math.sqrt((m - p) * (m - p) + (h - f) * (h - f) + (u - c) * (u - c))
      return (
        Math.abs(v) < 0.001 && (v = 1),
        (this.x = (m - p) / v),
        (this.y = (h - f) / v),
        (this.z = (u - c) / v),
        (this.w = Math.acos((l + d + g - 1) / 2)),
        this
      )
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        (this.w = Math.min(this.w, t.w)),
        this
      )
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        (this.w = Math.max(this.w, t.w)),
        this
      )
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        (this.w = Math.max(t.w, Math.min(e.w, this.w))),
        this
      )
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        (this.w = Math.max(t, Math.min(e, this.w))),
        this
      )
    }
    clampLength(t, e) {
      const n = this.length()
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      )
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      )
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      )
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        (this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
        this
      )
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t)
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        (this.w += (t.w - this.w) * e),
        this
      )
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        (this.w = t.w + (e.w - t.w) * n),
        this
      )
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), (this.w = t[e + 3]), this
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), (t[e + 3] = this.w), t
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().'),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        (this.w = t.getW(e)),
        this
      )
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      )
    }
  }
  B.prototype.isVector4 = !0
  class F extends L {
    constructor(t, e, n) {
      super(),
        (this.width = t),
        (this.height = e),
        (this.depth = 1),
        (this.scissor = new B(0, 0, t, e)),
        (this.scissorTest = !1),
        (this.viewport = new B(0, 0, t, e)),
        (n = n || {}),
        (this.texture = new z(
          void 0,
          n.mapping,
          n.wrapS,
          n.wrapT,
          n.magFilter,
          n.minFilter,
          n.format,
          n.type,
          n.anisotropy,
          n.encoding
        )),
        (this.texture.image = {}),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        (this.texture.image.depth = 1),
        (this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps),
        (this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : s),
        (this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer),
        (this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer),
        (this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null)
    }
    setTexture(t) {
      ;(t.image = { width: this.width, height: this.height, depth: this.depth }), (this.texture = t)
    }
    setSize(t, e, n = 1) {
      ;(this.width === t && this.height === e && this.depth === n) ||
        ((this.width = t),
        (this.height = e),
        (this.depth = n),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        (this.texture.image.depth = n),
        this.dispose()),
        this.viewport.set(0, 0, t, e),
        this.scissor.set(0, 0, t, e)
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(t) {
      return (
        (this.width = t.width),
        (this.height = t.height),
        (this.depth = t.depth),
        this.viewport.copy(t.viewport),
        (this.texture = t.texture.clone()),
        (this.depthBuffer = t.depthBuffer),
        (this.stencilBuffer = t.stencilBuffer),
        (this.depthTexture = t.depthTexture),
        this
      )
    }
    dispose() {
      this.dispatchEvent({ type: 'dispose' })
    }
  }
  ;(F.prototype.isWebGLRenderTarget = !0),
    (class extends F {
      constructor(t, e, n) {
        super(t, e, n), (this.samples = 4)
      }
      copy(t) {
        return super.copy.call(this, t), (this.samples = t.samples), this
      }
    }.prototype.isWebGLMultisampleRenderTarget = !0)
  class U {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      ;(this._x = t), (this._y = e), (this._z = n), (this._w = i)
    }
    static slerp(t, e, n, i) {
      return n.copy(t).slerp(e, i)
    }
    static slerpFlat(t, e, n, i, r, s, a) {
      let o = n[i + 0],
        l = n[i + 1],
        c = n[i + 2],
        h = n[i + 3]
      const u = r[s + 0],
        d = r[s + 1],
        p = r[s + 2],
        f = r[s + 3]
      if (0 === a) return (t[e + 0] = o), (t[e + 1] = l), (t[e + 2] = c), void (t[e + 3] = h)
      if (1 === a) return (t[e + 0] = u), (t[e + 1] = d), (t[e + 2] = p), void (t[e + 3] = f)
      if (h !== f || o !== u || l !== d || c !== p) {
        let t = 1 - a
        const e = o * u + l * d + c * p + h * f,
          n = e >= 0 ? 1 : -1,
          i = 1 - e * e
        if (i > Number.EPSILON) {
          const r = Math.sqrt(i),
            s = Math.atan2(r, e * n)
          ;(t = Math.sin(t * s) / r), (a = Math.sin(a * s) / r)
        }
        const r = a * n
        if (
          ((o = o * t + u * r),
          (l = l * t + d * r),
          (c = c * t + p * r),
          (h = h * t + f * r),
          t === 1 - a)
        ) {
          const t = 1 / Math.sqrt(o * o + l * l + c * c + h * h)
          ;(o *= t), (l *= t), (c *= t), (h *= t)
        }
      }
      ;(t[e] = o), (t[e + 1] = l), (t[e + 2] = c), (t[e + 3] = h)
    }
    static multiplyQuaternionsFlat(t, e, n, i, r, s) {
      const a = n[i],
        o = n[i + 1],
        l = n[i + 2],
        c = n[i + 3],
        h = r[s],
        u = r[s + 1],
        d = r[s + 2],
        p = r[s + 3]
      return (
        (t[e] = a * p + c * h + o * d - l * u),
        (t[e + 1] = o * p + c * u + l * h - a * d),
        (t[e + 2] = l * p + c * d + a * u - o * h),
        (t[e + 3] = c * p - a * h - o * u - l * d),
        t
      )
    }
    get x() {
      return this._x
    }
    set x(t) {
      ;(this._x = t), this._onChangeCallback()
    }
    get y() {
      return this._y
    }
    set y(t) {
      ;(this._y = t), this._onChangeCallback()
    }
    get z() {
      return this._z
    }
    set z(t) {
      ;(this._z = t), this._onChangeCallback()
    }
    get w() {
      return this._w
    }
    set w(t) {
      ;(this._w = t), this._onChangeCallback()
    }
    set(t, e, n, i) {
      return (
        (this._x = t), (this._y = e), (this._z = n), (this._w = i), this._onChangeCallback(), this
      )
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w)
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      )
    }
    setFromEuler(t, e) {
      if (!t || !t.isEuler)
        throw new Error(
          'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.'
        )
      const n = t._x,
        i = t._y,
        r = t._z,
        s = t._order,
        a = Math.cos,
        o = Math.sin,
        l = a(n / 2),
        c = a(i / 2),
        h = a(r / 2),
        u = o(n / 2),
        d = o(i / 2),
        p = o(r / 2)
      switch (s) {
        case 'XYZ':
          ;(this._x = u * c * h + l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h - u * d * p)
          break
        case 'YXZ':
          ;(this._x = u * c * h + l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h + u * d * p)
          break
        case 'ZXY':
          ;(this._x = u * c * h - l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h - u * d * p)
          break
        case 'ZYX':
          ;(this._x = u * c * h - l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h + u * d * p)
          break
        case 'YZX':
          ;(this._x = u * c * h + l * d * p),
            (this._y = l * d * h + u * c * p),
            (this._z = l * c * p - u * d * h),
            (this._w = l * c * h - u * d * p)
          break
        case 'XZY':
          ;(this._x = u * c * h - l * d * p),
            (this._y = l * d * h - u * c * p),
            (this._z = l * c * p + u * d * h),
            (this._w = l * c * h + u * d * p)
          break
        default:
          console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + s)
      }
      return !1 !== e && this._onChangeCallback(), this
    }
    setFromAxisAngle(t, e) {
      const n = e / 2,
        i = Math.sin(n)
      return (
        (this._x = t.x * i),
        (this._y = t.y * i),
        (this._z = t.z * i),
        (this._w = Math.cos(n)),
        this._onChangeCallback(),
        this
      )
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        n = e[0],
        i = e[4],
        r = e[8],
        s = e[1],
        a = e[5],
        o = e[9],
        l = e[2],
        c = e[6],
        h = e[10],
        u = n + a + h
      if (u > 0) {
        const t = 0.5 / Math.sqrt(u + 1)
        ;(this._w = 0.25 / t),
          (this._x = (c - o) * t),
          (this._y = (r - l) * t),
          (this._z = (s - i) * t)
      } else if (n > a && n > h) {
        const t = 2 * Math.sqrt(1 + n - a - h)
        ;(this._w = (c - o) / t),
          (this._x = 0.25 * t),
          (this._y = (i + s) / t),
          (this._z = (r + l) / t)
      } else if (a > h) {
        const t = 2 * Math.sqrt(1 + a - n - h)
        ;(this._w = (r - l) / t),
          (this._x = (i + s) / t),
          (this._y = 0.25 * t),
          (this._z = (o + c) / t)
      } else {
        const t = 2 * Math.sqrt(1 + h - n - a)
        ;(this._w = (s - i) / t),
          (this._x = (r + l) / t),
          (this._y = (o + c) / t),
          (this._z = 0.25 * t)
      }
      return this._onChangeCallback(), this
    }
    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1
      return (
        n < 1e-6
          ? ((n = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = n))
              : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = n)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = n)),
        this.normalize()
      )
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(P.clamp(this.dot(t), -1, 1)))
    }
    rotateTowards(t, e) {
      const n = this.angleTo(t)
      if (0 === n) return this
      const i = Math.min(1, e / n)
      return this.slerp(t, i), this
    }
    identity() {
      return this.set(0, 0, 0, 1)
    }
    invert() {
      return this.conjugate()
    }
    conjugate() {
      return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }
    length() {
      return Math.sqrt(
        this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
      )
    }
    normalize() {
      let t = this.length()
      return (
        0 === t
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      )
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.'
          ),
          this.multiplyQuaternions(t, e))
        : this.multiplyQuaternions(this, t)
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this)
    }
    multiplyQuaternions(t, e) {
      const n = t._x,
        i = t._y,
        r = t._z,
        s = t._w,
        a = e._x,
        o = e._y,
        l = e._z,
        c = e._w
      return (
        (this._x = n * c + s * a + i * l - r * o),
        (this._y = i * c + s * o + r * a - n * l),
        (this._z = r * c + s * l + n * o - i * a),
        (this._w = s * c - n * a - i * o - r * l),
        this._onChangeCallback(),
        this
      )
    }
    slerp(t, e) {
      if (0 === e) return this
      if (1 === e) return this.copy(t)
      const n = this._x,
        i = this._y,
        r = this._z,
        s = this._w
      let a = s * t._w + n * t._x + i * t._y + r * t._z
      if (
        (a < 0
          ? ((this._w = -t._w), (this._x = -t._x), (this._y = -t._y), (this._z = -t._z), (a = -a))
          : this.copy(t),
        a >= 1)
      )
        return (this._w = s), (this._x = n), (this._y = i), (this._z = r), this
      const o = 1 - a * a
      if (o <= Number.EPSILON) {
        const t = 1 - e
        return (
          (this._w = t * s + e * this._w),
          (this._x = t * n + e * this._x),
          (this._y = t * i + e * this._y),
          (this._z = t * r + e * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        )
      }
      const l = Math.sqrt(o),
        c = Math.atan2(l, a),
        h = Math.sin((1 - e) * c) / l,
        u = Math.sin(e * c) / l
      return (
        (this._w = s * h + this._w * u),
        (this._x = n * h + this._x * u),
        (this._y = i * h + this._y * u),
        (this._z = r * h + this._z * u),
        this._onChangeCallback(),
        this
      )
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      )
    }
    toArray(t = [], e = 0) {
      return (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._w), t
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this
      )
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this
    }
    _onChangeCallback() {}
  }
  U.prototype.isQuaternion = !0
  class G {
    constructor(t = 0, e = 0, n = 0) {
      ;(this.x = t), (this.y = e), (this.z = n)
    }
    set(t, e, n) {
      return void 0 === n && (n = this.z), (this.x = t), (this.y = e), (this.z = n), this
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), this
    }
    setX(t) {
      return (this.x = t), this
    }
    setY(t) {
      return (this.y = t), this
    }
    setZ(t) {
      return (this.z = t), this
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e
          break
        case 1:
          this.y = e
          break
        case 2:
          this.z = e
          break
        default:
          throw new Error('index is out of range: ' + t)
      }
      return this
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x
        case 1:
          return this.y
        case 2:
          return this.z
        default:
          throw new Error('index is out of range: ' + t)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z)
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), (this.z = t.z), this
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), (this.z += t.z), this)
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), this
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this)
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), this
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.'
          ),
          this.multiplyVectors(t, e))
        : ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this)
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), this
    }
    multiplyVectors(t, e) {
      return (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this
    }
    applyEuler(t) {
      return (
        (t && t.isEuler) ||
          console.error(
            'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.'
          ),
        this.applyQuaternion(V.setFromEuler(t))
      )
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(V.setFromAxisAngle(t, e))
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements
      return (
        (this.x = r[0] * e + r[3] * n + r[6] * i),
        (this.y = r[1] * e + r[4] * n + r[7] * i),
        (this.z = r[2] * e + r[5] * n + r[8] * i),
        this
      )
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize()
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements,
        s = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15])
      return (
        (this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * s),
        (this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * s),
        (this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * s),
        this
      )
    }
    applyQuaternion(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.x,
        s = t.y,
        a = t.z,
        o = t.w,
        l = o * e + s * i - a * n,
        c = o * n + a * e - r * i,
        h = o * i + r * n - s * e,
        u = -r * e - s * n - a * i
      return (
        (this.x = l * o + u * -r + c * -a - h * -s),
        (this.y = c * o + u * -s + h * -r - l * -a),
        (this.z = h * o + u * -a + l * -s - c * -r),
        this
      )
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)
    }
    transformDirection(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements
      return (
        (this.x = r[0] * e + r[4] * n + r[8] * i),
        (this.y = r[1] * e + r[5] * n + r[9] * i),
        (this.z = r[2] * e + r[6] * n + r[10] * i),
        this.normalize()
      )
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t)
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      )
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      )
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        this
      )
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        this
      )
    }
    clampLength(t, e) {
      const n = this.length()
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      )
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      )
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      )
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        this
      )
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t)
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      )
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        this
      )
    }
    cross(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.'
          ),
          this.crossVectors(t, e))
        : this.crossVectors(this, t)
    }
    crossVectors(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = e.x,
        a = e.y,
        o = e.z
      return (this.x = i * o - r * a), (this.y = r * s - n * o), (this.z = n * a - i * s), this
    }
    projectOnVector(t) {
      const e = t.lengthSq()
      if (0 === e) return this.set(0, 0, 0)
      const n = t.dot(this) / e
      return this.copy(t).multiplyScalar(n)
    }
    projectOnPlane(t) {
      return k.copy(this).projectOnVector(t), this.sub(k)
    }
    reflect(t) {
      return this.sub(k.copy(t).multiplyScalar(2 * this.dot(t)))
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq())
      if (0 === e) return Math.PI / 2
      const n = this.dot(t) / e
      return Math.acos(P.clamp(n, -1, 1))
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t))
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y,
        i = this.z - t.z
      return e * e + n * n + i * i
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
    }
    setFromSphericalCoords(t, e, n) {
      const i = Math.sin(e) * t
      return (
        (this.x = i * Math.sin(n)), (this.y = Math.cos(e) * t), (this.z = i * Math.cos(n)), this
      )
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
    }
    setFromCylindricalCoords(t, e, n) {
      return (this.x = t * Math.sin(e)), (this.y = n), (this.z = t * Math.cos(e)), this
    }
    setFromMatrixPosition(t) {
      const e = t.elements
      return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        n = this.setFromMatrixColumn(t, 1).length(),
        i = this.setFromMatrixColumn(t, 2).length()
      return (this.x = e), (this.y = n), (this.z = i), this
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e)
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e)
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().'),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        this
      )
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this
    }
  }
  G.prototype.isVector3 = !0
  const k = new G(),
    V = new U()
  class W {
    constructor(t = new G(1 / 0, 1 / 0, 1 / 0), e = new G(-1 / 0, -1 / 0, -1 / 0)) {
      ;(this.min = t), (this.max = e)
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this
    }
    setFromArray(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        s = -1 / 0,
        a = -1 / 0
      for (let o = 0, l = t.length; o < l; o += 3) {
        const l = t[o],
          c = t[o + 1],
          h = t[o + 2]
        l < e && (e = l),
          c < n && (n = c),
          h < i && (i = h),
          l > r && (r = l),
          c > s && (s = c),
          h > a && (a = h)
      }
      return this.min.set(e, n, i), this.max.set(r, s, a), this
    }
    setFromBufferAttribute(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        s = -1 / 0,
        a = -1 / 0
      for (let o = 0, l = t.count; o < l; o++) {
        const l = t.getX(o),
          c = t.getY(o),
          h = t.getZ(o)
        l < e && (e = l),
          c < n && (n = c),
          h < i && (i = h),
          l > r && (r = l),
          c > s && (s = c),
          h > a && (a = h)
      }
      return this.min.set(e, n, i), this.max.set(r, s, a), this
    }
    setFromPoints(t) {
      this.makeEmpty()
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e])
      return this
    }
    setFromCenterAndSize(t, e) {
      const n = q.copy(e).multiplyScalar(0.5)
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this
    }
    setFromObject(t) {
      return this.makeEmpty(), this.expandByObject(t)
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      )
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }
    getCenter(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Box3: .getCenter() target is now required'), (t = new G())),
        this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5)
      )
    }
    getSize(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Box3: .getSize() target is now required'), (t = new G())),
        this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
      )
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this
    }
    expandByObject(t) {
      t.updateWorldMatrix(!1, !1)
      const e = t.geometry
      void 0 !== e &&
        (null === e.boundingBox && e.computeBoundingBox(),
        X.copy(e.boundingBox),
        X.applyMatrix4(t.matrixWorld),
        this.union(X))
      const n = t.children
      for (let t = 0, e = n.length; t < e; t++) this.expandByObject(n[t])
      return this
    }
    containsPoint(t) {
      return !(
        t.x < this.min.x ||
        t.x > this.max.x ||
        t.y < this.min.y ||
        t.y > this.max.y ||
        t.z < this.min.z ||
        t.z > this.max.z
      )
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y &&
        this.min.z <= t.min.z &&
        t.max.z <= this.max.z
      )
    }
    getParameter(t, e) {
      return (
        void 0 === e &&
          (console.warn('THREE.Box3: .getParameter() target is now required'), (e = new G())),
        e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y),
          (t.z - this.min.z) / (this.max.z - this.min.z)
        )
      )
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y ||
        t.max.z < this.min.z ||
        t.min.z > this.max.z
      )
    }
    intersectsSphere(t) {
      return this.clampPoint(t.center, q), q.distanceToSquared(t.center) <= t.radius * t.radius
    }
    intersectsPlane(t) {
      let e, n
      return (
        t.normal.x > 0
          ? ((e = t.normal.x * this.min.x), (n = t.normal.x * this.max.x))
          : ((e = t.normal.x * this.max.x), (n = t.normal.x * this.min.x)),
        t.normal.y > 0
          ? ((e += t.normal.y * this.min.y), (n += t.normal.y * this.max.y))
          : ((e += t.normal.y * this.max.y), (n += t.normal.y * this.min.y)),
        t.normal.z > 0
          ? ((e += t.normal.z * this.min.z), (n += t.normal.z * this.max.z))
          : ((e += t.normal.z * this.max.z), (n += t.normal.z * this.min.z)),
        e <= -t.constant && n >= -t.constant
      )
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return !1
      this.getCenter(tt),
        et.subVectors(this.max, tt),
        Y.subVectors(t.a, tt),
        Z.subVectors(t.b, tt),
        J.subVectors(t.c, tt),
        Q.subVectors(Z, Y),
        K.subVectors(J, Z),
        $.subVectors(Y, J)
      let e = [
        0,
        -Q.z,
        Q.y,
        0,
        -K.z,
        K.y,
        0,
        -$.z,
        $.y,
        Q.z,
        0,
        -Q.x,
        K.z,
        0,
        -K.x,
        $.z,
        0,
        -$.x,
        -Q.y,
        Q.x,
        0,
        -K.y,
        K.x,
        0,
        -$.y,
        $.x,
        0,
      ]
      return (
        !!rt(e, Y, Z, J, et) &&
        ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        !!rt(e, Y, Z, J, et) &&
          (nt.crossVectors(Q, K), (e = [nt.x, nt.y, nt.z]), rt(e, Y, Z, J, et)))
      )
    }
    clampPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn('THREE.Box3: .clampPoint() target is now required'), (e = new G())),
        e.copy(t).clamp(this.min, this.max)
      )
    }
    distanceToPoint(t) {
      return q.copy(t).clamp(this.min, this.max).sub(t).length()
    }
    getBoundingSphere(t) {
      return (
        void 0 === t && console.error('THREE.Box3: .getBoundingSphere() target is now required'),
        this.getCenter(t.center),
        (t.radius = 0.5 * this.getSize(q).length()),
        t
      )
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this
    }
    applyMatrix4(t) {
      return (
        this.isEmpty() ||
          (j[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          j[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          j[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          j[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          j[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          j[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          j[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          j[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.setFromPoints(j)),
        this
      )
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max)
    }
  }
  W.prototype.isBox3 = !0
  const j = [new G(), new G(), new G(), new G(), new G(), new G(), new G(), new G()],
    q = new G(),
    X = new W(),
    Y = new G(),
    Z = new G(),
    J = new G(),
    Q = new G(),
    K = new G(),
    $ = new G(),
    tt = new G(),
    et = new G(),
    nt = new G(),
    it = new G()
  function rt(t, e, n, i, r) {
    for (let s = 0, a = t.length - 3; s <= a; s += 3) {
      it.fromArray(t, s)
      const a = r.x * Math.abs(it.x) + r.y * Math.abs(it.y) + r.z * Math.abs(it.z),
        o = e.dot(it),
        l = n.dot(it),
        c = i.dot(it)
      if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > a) return !1
    }
    return !0
  }
  const st = new W()
  class at {
    constructor(t = new G(), e = -1) {
      ;(this.center = t), (this.radius = e)
    }
    set(t, e) {
      return this.center.copy(t), (this.radius = e), this
    }
    setFromPoints(t, e) {
      const n = this.center
      void 0 !== e ? n.copy(e) : st.setFromPoints(t).getCenter(n)
      let i = 0
      for (let e = 0, r = t.length; e < r; e++) i = Math.max(i, n.distanceToSquared(t[e]))
      return (this.radius = Math.sqrt(i)), this
    }
    copy(t) {
      return this.center.copy(t.center), (this.radius = t.radius), this
    }
    isEmpty() {
      return this.radius < 0
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), (this.radius = -1), this
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius
      return t.center.distanceToSquared(this.center) <= e * e
    }
    intersectsBox(t) {
      return t.intersectsSphere(this)
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius
    }
    clampPoint(t, e) {
      const n = this.center.distanceToSquared(t)
      return (
        void 0 === e &&
          (console.warn('THREE.Sphere: .clampPoint() target is now required'), (e = new G())),
        e.copy(t),
        n > this.radius * this.radius &&
          (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)),
        e
      )
    }
    getBoundingBox(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Sphere: .getBoundingBox() target is now required'), (t = new W())),
        this.isEmpty()
          ? (t.makeEmpty(), t)
          : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
      )
    }
    applyMatrix4(t) {
      return this.center.applyMatrix4(t), (this.radius = this.radius * t.getMaxScaleOnAxis()), this
    }
    translate(t) {
      return this.center.add(t), this
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }
  const ot = new G(),
    lt = new G(),
    ct = new G(),
    ht = new G(),
    ut = new G(),
    dt = new G(),
    pt = new G()
  class ft {
    constructor(t = new G(), e = new G(0, 0, -1)) {
      ;(this.origin = t), (this.direction = e)
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this
    }
    at(t, e) {
      return (
        void 0 === e && (console.warn('THREE.Ray: .at() target is now required'), (e = new G())),
        e.copy(this.direction).multiplyScalar(t).add(this.origin)
      )
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this
    }
    recast(t) {
      return this.origin.copy(this.at(t, ot)), this
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn('THREE.Ray: .closestPointToPoint() target is now required'), (e = new G())),
        e.subVectors(t, this.origin)
      const n = e.dot(this.direction)
      return n < 0 ? e.copy(this.origin) : e.copy(this.direction).multiplyScalar(n).add(this.origin)
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t))
    }
    distanceSqToPoint(t) {
      const e = ot.subVectors(t, this.origin).dot(this.direction)
      return e < 0
        ? this.origin.distanceToSquared(t)
        : (ot.copy(this.direction).multiplyScalar(e).add(this.origin), ot.distanceToSquared(t))
    }
    distanceSqToSegment(t, e, n, i) {
      lt.copy(t).add(e).multiplyScalar(0.5),
        ct.copy(e).sub(t).normalize(),
        ht.copy(this.origin).sub(lt)
      const r = 0.5 * t.distanceTo(e),
        s = -this.direction.dot(ct),
        a = ht.dot(this.direction),
        o = -ht.dot(ct),
        l = ht.lengthSq(),
        c = Math.abs(1 - s * s)
      let h, u, d, p
      if (c > 0)
        if (((h = s * o - a), (u = s * a - o), (p = r * c), h >= 0))
          if (u >= -p)
            if (u <= p) {
              const t = 1 / c
              ;(h *= t), (u *= t), (d = h * (h + s * u + 2 * a) + u * (s * h + u + 2 * o) + l)
            } else (u = r), (h = Math.max(0, -(s * u + a))), (d = -h * h + u * (u + 2 * o) + l)
          else (u = -r), (h = Math.max(0, -(s * u + a))), (d = -h * h + u * (u + 2 * o) + l)
        else
          u <= -p
            ? ((h = Math.max(0, -(-s * r + a))),
              (u = h > 0 ? -r : Math.min(Math.max(-r, -o), r)),
              (d = -h * h + u * (u + 2 * o) + l))
            : u <= p
            ? ((h = 0), (u = Math.min(Math.max(-r, -o), r)), (d = u * (u + 2 * o) + l))
            : ((h = Math.max(0, -(s * r + a))),
              (u = h > 0 ? r : Math.min(Math.max(-r, -o), r)),
              (d = -h * h + u * (u + 2 * o) + l))
      else (u = s > 0 ? -r : r), (h = Math.max(0, -(s * u + a))), (d = -h * h + u * (u + 2 * o) + l)
      return (
        n && n.copy(this.direction).multiplyScalar(h).add(this.origin),
        i && i.copy(ct).multiplyScalar(u).add(lt),
        d
      )
    }
    intersectSphere(t, e) {
      ot.subVectors(t.center, this.origin)
      const n = ot.dot(this.direction),
        i = ot.dot(ot) - n * n,
        r = t.radius * t.radius
      if (i > r) return null
      const s = Math.sqrt(r - i),
        a = n - s,
        o = n + s
      return a < 0 && o < 0 ? null : a < 0 ? this.at(o, e) : this.at(a, e)
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius
    }
    distanceToPlane(t) {
      const e = t.normal.dot(this.direction)
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null
      const n = -(this.origin.dot(t.normal) + t.constant) / e
      return n >= 0 ? n : null
    }
    intersectPlane(t, e) {
      const n = this.distanceToPlane(t)
      return null === n ? null : this.at(n, e)
    }
    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin)
      return 0 === e || t.normal.dot(this.direction) * e < 0
    }
    intersectBox(t, e) {
      let n, i, r, s, a, o
      const l = 1 / this.direction.x,
        c = 1 / this.direction.y,
        h = 1 / this.direction.z,
        u = this.origin
      return (
        l >= 0
          ? ((n = (t.min.x - u.x) * l), (i = (t.max.x - u.x) * l))
          : ((n = (t.max.x - u.x) * l), (i = (t.min.x - u.x) * l)),
        c >= 0
          ? ((r = (t.min.y - u.y) * c), (s = (t.max.y - u.y) * c))
          : ((r = (t.max.y - u.y) * c), (s = (t.min.y - u.y) * c)),
        n > s || r > i
          ? null
          : ((r > n || n != n) && (n = r),
            (s < i || i != i) && (i = s),
            h >= 0
              ? ((a = (t.min.z - u.z) * h), (o = (t.max.z - u.z) * h))
              : ((a = (t.max.z - u.z) * h), (o = (t.min.z - u.z) * h)),
            n > o || a > i
              ? null
              : ((a > n || n != n) && (n = a),
                (o < i || i != i) && (i = o),
                i < 0 ? null : this.at(n >= 0 ? n : i, e)))
      )
    }
    intersectsBox(t) {
      return null !== this.intersectBox(t, ot)
    }
    intersectTriangle(t, e, n, i, r) {
      ut.subVectors(e, t), dt.subVectors(n, t), pt.crossVectors(ut, dt)
      let s,
        a = this.direction.dot(pt)
      if (a > 0) {
        if (i) return null
        s = 1
      } else {
        if (!(a < 0)) return null
        ;(s = -1), (a = -a)
      }
      ht.subVectors(this.origin, t)
      const o = s * this.direction.dot(dt.crossVectors(ht, dt))
      if (o < 0) return null
      const l = s * this.direction.dot(ut.cross(ht))
      if (l < 0) return null
      if (o + l > a) return null
      const c = -s * ht.dot(pt)
      return c < 0 ? null : this.at(c / a, r)
    }
    applyMatrix4(t) {
      return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction)
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }
  class mt {
    constructor() {
      ;(this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.'
          )
    }
    set(t, e, n, i, r, s, a, o, l, c, h, u, d, p, f, m) {
      const g = this.elements
      return (
        (g[0] = t),
        (g[4] = e),
        (g[8] = n),
        (g[12] = i),
        (g[1] = r),
        (g[5] = s),
        (g[9] = a),
        (g[13] = o),
        (g[2] = l),
        (g[6] = c),
        (g[10] = h),
        (g[14] = u),
        (g[3] = d),
        (g[7] = p),
        (g[11] = f),
        (g[15] = m),
        this
      )
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    clone() {
      return new mt().fromArray(this.elements)
    }
    copy(t) {
      const e = this.elements,
        n = t.elements
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        (e[9] = n[9]),
        (e[10] = n[10]),
        (e[11] = n[11]),
        (e[12] = n[12]),
        (e[13] = n[13]),
        (e[14] = n[14]),
        (e[15] = n[15]),
        this
      )
    }
    copyPosition(t) {
      const e = this.elements,
        n = t.elements
      return (e[12] = n[12]), (e[13] = n[13]), (e[14] = n[14]), this
    }
    setFromMatrix3(t) {
      const e = t.elements
      return (
        this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this
      )
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        n.setFromMatrixColumn(this, 2),
        this
      )
    }
    makeBasis(t, e, n) {
      return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
    }
    extractRotation(t) {
      const e = this.elements,
        n = t.elements,
        i = 1 / gt.setFromMatrixColumn(t, 0).length(),
        r = 1 / gt.setFromMatrixColumn(t, 1).length(),
        s = 1 / gt.setFromMatrixColumn(t, 2).length()
      return (
        (e[0] = n[0] * i),
        (e[1] = n[1] * i),
        (e[2] = n[2] * i),
        (e[3] = 0),
        (e[4] = n[4] * r),
        (e[5] = n[5] * r),
        (e[6] = n[6] * r),
        (e[7] = 0),
        (e[8] = n[8] * s),
        (e[9] = n[9] * s),
        (e[10] = n[10] * s),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      )
    }
    makeRotationFromEuler(t) {
      ;(t && t.isEuler) ||
        console.error(
          'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.'
        )
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z,
        s = Math.cos(n),
        a = Math.sin(n),
        o = Math.cos(i),
        l = Math.sin(i),
        c = Math.cos(r),
        h = Math.sin(r)
      if ('XYZ' === t.order) {
        const t = s * c,
          n = s * h,
          i = a * c,
          r = a * h
        ;(e[0] = o * c),
          (e[4] = -o * h),
          (e[8] = l),
          (e[1] = n + i * l),
          (e[5] = t - r * l),
          (e[9] = -a * o),
          (e[2] = r - t * l),
          (e[6] = i + n * l),
          (e[10] = s * o)
      } else if ('YXZ' === t.order) {
        const t = o * c,
          n = o * h,
          i = l * c,
          r = l * h
        ;(e[0] = t + r * a),
          (e[4] = i * a - n),
          (e[8] = s * l),
          (e[1] = s * h),
          (e[5] = s * c),
          (e[9] = -a),
          (e[2] = n * a - i),
          (e[6] = r + t * a),
          (e[10] = s * o)
      } else if ('ZXY' === t.order) {
        const t = o * c,
          n = o * h,
          i = l * c,
          r = l * h
        ;(e[0] = t - r * a),
          (e[4] = -s * h),
          (e[8] = i + n * a),
          (e[1] = n + i * a),
          (e[5] = s * c),
          (e[9] = r - t * a),
          (e[2] = -s * l),
          (e[6] = a),
          (e[10] = s * o)
      } else if ('ZYX' === t.order) {
        const t = s * c,
          n = s * h,
          i = a * c,
          r = a * h
        ;(e[0] = o * c),
          (e[4] = i * l - n),
          (e[8] = t * l + r),
          (e[1] = o * h),
          (e[5] = r * l + t),
          (e[9] = n * l - i),
          (e[2] = -l),
          (e[6] = a * o),
          (e[10] = s * o)
      } else if ('YZX' === t.order) {
        const t = s * o,
          n = s * l,
          i = a * o,
          r = a * l
        ;(e[0] = o * c),
          (e[4] = r - t * h),
          (e[8] = i * h + n),
          (e[1] = h),
          (e[5] = s * c),
          (e[9] = -a * c),
          (e[2] = -l * c),
          (e[6] = n * h + i),
          (e[10] = t - r * h)
      } else if ('XZY' === t.order) {
        const t = s * o,
          n = s * l,
          i = a * o,
          r = a * l
        ;(e[0] = o * c),
          (e[4] = -h),
          (e[8] = l * c),
          (e[1] = t * h + r),
          (e[5] = s * c),
          (e[9] = n * h - i),
          (e[2] = i * h - n),
          (e[6] = a * c),
          (e[10] = r * h + t)
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      )
    }
    makeRotationFromQuaternion(t) {
      return this.compose(yt, t, xt)
    }
    lookAt(t, e, n) {
      const i = this.elements
      return (
        wt.subVectors(t, e),
        0 === wt.lengthSq() && (wt.z = 1),
        wt.normalize(),
        _t.crossVectors(n, wt),
        0 === _t.lengthSq() &&
          (1 === Math.abs(n.z) ? (wt.x += 1e-4) : (wt.z += 1e-4),
          wt.normalize(),
          _t.crossVectors(n, wt)),
        _t.normalize(),
        bt.crossVectors(wt, _t),
        (i[0] = _t.x),
        (i[4] = bt.x),
        (i[8] = wt.x),
        (i[1] = _t.y),
        (i[5] = bt.y),
        (i[9] = wt.y),
        (i[2] = _t.z),
        (i[6] = bt.z),
        (i[10] = wt.z),
        this
      )
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.'
          ),
          this.multiplyMatrices(t, e))
        : this.multiplyMatrices(this, t)
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this)
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        s = n[0],
        a = n[4],
        o = n[8],
        l = n[12],
        c = n[1],
        h = n[5],
        u = n[9],
        d = n[13],
        p = n[2],
        f = n[6],
        m = n[10],
        g = n[14],
        v = n[3],
        y = n[7],
        x = n[11],
        _ = n[15],
        b = i[0],
        w = i[4],
        M = i[8],
        S = i[12],
        E = i[1],
        T = i[5],
        L = i[9],
        A = i[13],
        R = i[2],
        P = i[6],
        C = i[10],
        D = i[14],
        I = i[3],
        N = i[7],
        O = i[11],
        z = i[15]
      return (
        (r[0] = s * b + a * E + o * R + l * I),
        (r[4] = s * w + a * T + o * P + l * N),
        (r[8] = s * M + a * L + o * C + l * O),
        (r[12] = s * S + a * A + o * D + l * z),
        (r[1] = c * b + h * E + u * R + d * I),
        (r[5] = c * w + h * T + u * P + d * N),
        (r[9] = c * M + h * L + u * C + d * O),
        (r[13] = c * S + h * A + u * D + d * z),
        (r[2] = p * b + f * E + m * R + g * I),
        (r[6] = p * w + f * T + m * P + g * N),
        (r[10] = p * M + f * L + m * C + g * O),
        (r[14] = p * S + f * A + m * D + g * z),
        (r[3] = v * b + y * E + x * R + _ * I),
        (r[7] = v * w + y * T + x * P + _ * N),
        (r[11] = v * M + y * L + x * C + _ * O),
        (r[15] = v * S + y * A + x * D + _ * z),
        this
      )
    }
    multiplyScalar(t) {
      const e = this.elements
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      )
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[4],
        i = t[8],
        r = t[12],
        s = t[1],
        a = t[5],
        o = t[9],
        l = t[13],
        c = t[2],
        h = t[6],
        u = t[10],
        d = t[14]
      return (
        t[3] * (+r * o * h - i * l * h - r * a * u + n * l * u + i * a * d - n * o * d) +
        t[7] * (+e * o * d - e * l * u + r * s * u - i * s * d + i * l * c - r * o * c) +
        t[11] * (+e * l * h - e * a * d - r * s * h + n * s * d + r * a * c - n * l * c) +
        t[15] * (-i * a * c - e * o * h + e * a * u + i * s * h - n * s * u + n * o * c)
      )
    }
    transpose() {
      const t = this.elements
      let e
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      )
    }
    setPosition(t, e, n) {
      const i = this.elements
      return (
        t.isVector3
          ? ((i[12] = t.x), (i[13] = t.y), (i[14] = t.z))
          : ((i[12] = t), (i[13] = e), (i[14] = n)),
        this
      )
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        s = t[4],
        a = t[5],
        o = t[6],
        l = t[7],
        c = t[8],
        h = t[9],
        u = t[10],
        d = t[11],
        p = t[12],
        f = t[13],
        m = t[14],
        g = t[15],
        v = h * m * l - f * u * l + f * o * d - a * m * d - h * o * g + a * u * g,
        y = p * u * l - c * m * l - p * o * d + s * m * d + c * o * g - s * u * g,
        x = c * f * l - p * h * l + p * a * d - s * f * d - c * a * g + s * h * g,
        _ = p * h * o - c * f * o - p * a * u + s * f * u + c * a * m - s * h * m,
        b = e * v + n * y + i * x + r * _
      if (0 === b) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      const w = 1 / b
      return (
        (t[0] = v * w),
        (t[1] = (f * u * r - h * m * r - f * i * d + n * m * d + h * i * g - n * u * g) * w),
        (t[2] = (a * m * r - f * o * r + f * i * l - n * m * l - a * i * g + n * o * g) * w),
        (t[3] = (h * o * r - a * u * r - h * i * l + n * u * l + a * i * d - n * o * d) * w),
        (t[4] = y * w),
        (t[5] = (c * m * r - p * u * r + p * i * d - e * m * d - c * i * g + e * u * g) * w),
        (t[6] = (p * o * r - s * m * r - p * i * l + e * m * l + s * i * g - e * o * g) * w),
        (t[7] = (s * u * r - c * o * r + c * i * l - e * u * l - s * i * d + e * o * d) * w),
        (t[8] = x * w),
        (t[9] = (p * h * r - c * f * r - p * n * d + e * f * d + c * n * g - e * h * g) * w),
        (t[10] = (s * f * r - p * a * r + p * n * l - e * f * l - s * n * g + e * a * g) * w),
        (t[11] = (c * a * r - s * h * r - c * n * l + e * h * l + s * n * d - e * a * d) * w),
        (t[12] = _ * w),
        (t[13] = (c * f * i - p * h * i + p * n * u - e * f * u - c * n * m + e * h * m) * w),
        (t[14] = (p * a * i - s * f * i - p * n * o + e * f * o + s * n * m - e * a * m) * w),
        (t[15] = (s * h * i - c * a * i + c * n * o - e * h * o - s * n * u + e * a * u) * w),
        this
      )
    }
    scale(t) {
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z
      return (
        (e[0] *= n),
        (e[4] *= i),
        (e[8] *= r),
        (e[1] *= n),
        (e[5] *= i),
        (e[9] *= r),
        (e[2] *= n),
        (e[6] *= i),
        (e[10] *= r),
        (e[3] *= n),
        (e[7] *= i),
        (e[11] *= r),
        this
      )
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10]
      return Math.sqrt(Math.max(e, n, i))
    }
    makeTranslation(t, e, n) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        n = Math.sin(t)
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        n = Math.sin(t)
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        n = Math.sin(t)
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    makeRotationAxis(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = 1 - n,
        s = t.x,
        a = t.y,
        o = t.z,
        l = r * s,
        c = r * a
      return (
        this.set(
          l * s + n,
          l * a - i * o,
          l * o + i * a,
          0,
          l * a + i * o,
          c * a + n,
          c * o - i * s,
          0,
          l * o - i * a,
          c * o + i * s,
          r * o * o + n,
          0,
          0,
          0,
          0,
          1
        ),
        this
      )
    }
    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
    }
    makeShear(t, e, n) {
      return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this
    }
    compose(t, e, n) {
      const i = this.elements,
        r = e._x,
        s = e._y,
        a = e._z,
        o = e._w,
        l = r + r,
        c = s + s,
        h = a + a,
        u = r * l,
        d = r * c,
        p = r * h,
        f = s * c,
        m = s * h,
        g = a * h,
        v = o * l,
        y = o * c,
        x = o * h,
        _ = n.x,
        b = n.y,
        w = n.z
      return (
        (i[0] = (1 - (f + g)) * _),
        (i[1] = (d + x) * _),
        (i[2] = (p - y) * _),
        (i[3] = 0),
        (i[4] = (d - x) * b),
        (i[5] = (1 - (u + g)) * b),
        (i[6] = (m + v) * b),
        (i[7] = 0),
        (i[8] = (p + y) * w),
        (i[9] = (m - v) * w),
        (i[10] = (1 - (u + f)) * w),
        (i[11] = 0),
        (i[12] = t.x),
        (i[13] = t.y),
        (i[14] = t.z),
        (i[15] = 1),
        this
      )
    }
    decompose(t, e, n) {
      const i = this.elements
      let r = gt.set(i[0], i[1], i[2]).length()
      const s = gt.set(i[4], i[5], i[6]).length(),
        a = gt.set(i[8], i[9], i[10]).length()
      this.determinant() < 0 && (r = -r), (t.x = i[12]), (t.y = i[13]), (t.z = i[14]), vt.copy(this)
      const o = 1 / r,
        l = 1 / s,
        c = 1 / a
      return (
        (vt.elements[0] *= o),
        (vt.elements[1] *= o),
        (vt.elements[2] *= o),
        (vt.elements[4] *= l),
        (vt.elements[5] *= l),
        (vt.elements[6] *= l),
        (vt.elements[8] *= c),
        (vt.elements[9] *= c),
        (vt.elements[10] *= c),
        e.setFromRotationMatrix(vt),
        (n.x = r),
        (n.y = s),
        (n.z = a),
        this
      )
    }
    makePerspective(t, e, n, i, r, s) {
      void 0 === s &&
        console.warn(
          'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.'
        )
      const a = this.elements,
        o = (2 * r) / (e - t),
        l = (2 * r) / (n - i),
        c = (e + t) / (e - t),
        h = (n + i) / (n - i),
        u = -(s + r) / (s - r),
        d = (-2 * s * r) / (s - r)
      return (
        (a[0] = o),
        (a[4] = 0),
        (a[8] = c),
        (a[12] = 0),
        (a[1] = 0),
        (a[5] = l),
        (a[9] = h),
        (a[13] = 0),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = u),
        (a[14] = d),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = -1),
        (a[15] = 0),
        this
      )
    }
    makeOrthographic(t, e, n, i, r, s) {
      const a = this.elements,
        o = 1 / (e - t),
        l = 1 / (n - i),
        c = 1 / (s - r),
        h = (e + t) * o,
        u = (n + i) * l,
        d = (s + r) * c
      return (
        (a[0] = 2 * o),
        (a[4] = 0),
        (a[8] = 0),
        (a[12] = -h),
        (a[1] = 0),
        (a[5] = 2 * l),
        (a[9] = 0),
        (a[13] = -u),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = -2 * c),
        (a[14] = -d),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = 0),
        (a[15] = 1),
        this
      )
    }
    equals(t) {
      const e = this.elements,
        n = t.elements
      for (let t = 0; t < 16; t++) if (e[t] !== n[t]) return !1
      return !0
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e]
      return this
    }
    toArray(t = [], e = 0) {
      const n = this.elements
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        (t[e + 9] = n[9]),
        (t[e + 10] = n[10]),
        (t[e + 11] = n[11]),
        (t[e + 12] = n[12]),
        (t[e + 13] = n[13]),
        (t[e + 14] = n[14]),
        (t[e + 15] = n[15]),
        t
      )
    }
  }
  mt.prototype.isMatrix4 = !0
  const gt = new G(),
    vt = new mt(),
    yt = new G(0, 0, 0),
    xt = new G(1, 1, 1),
    _t = new G(),
    bt = new G(),
    wt = new G(),
    Mt = new mt(),
    St = new U()
  class Et {
    constructor(t = 0, e = 0, n = 0, i = Et.DefaultOrder) {
      ;(this._x = t), (this._y = e), (this._z = n), (this._order = i)
    }
    get x() {
      return this._x
    }
    set x(t) {
      ;(this._x = t), this._onChangeCallback()
    }
    get y() {
      return this._y
    }
    set y(t) {
      ;(this._y = t), this._onChangeCallback()
    }
    get z() {
      return this._z
    }
    set z(t) {
      ;(this._z = t), this._onChangeCallback()
    }
    get order() {
      return this._order
    }
    set order(t) {
      ;(this._order = t), this._onChangeCallback()
    }
    set(t, e, n, i) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._order = i || this._order),
        this._onChangeCallback(),
        this
      )
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order)
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      )
    }
    setFromRotationMatrix(t, e, n) {
      const i = P.clamp,
        r = t.elements,
        s = r[0],
        a = r[4],
        o = r[8],
        l = r[1],
        c = r[5],
        h = r[9],
        u = r[2],
        d = r[6],
        p = r[10]
      switch ((e = e || this._order)) {
        case 'XYZ':
          ;(this._y = Math.asin(i(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(-h, p)), (this._z = Math.atan2(-a, s)))
              : ((this._x = Math.atan2(d, c)), (this._z = 0))
          break
        case 'YXZ':
          ;(this._x = Math.asin(-i(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._y = Math.atan2(o, p)), (this._z = Math.atan2(l, c)))
              : ((this._y = Math.atan2(-u, s)), (this._z = 0))
          break
        case 'ZXY':
          ;(this._x = Math.asin(i(d, -1, 1))),
            Math.abs(d) < 0.9999999
              ? ((this._y = Math.atan2(-u, p)), (this._z = Math.atan2(-a, c)))
              : ((this._y = 0), (this._z = Math.atan2(l, s)))
          break
        case 'ZYX':
          ;(this._y = Math.asin(-i(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._x = Math.atan2(d, p)), (this._z = Math.atan2(l, s)))
              : ((this._x = 0), (this._z = Math.atan2(-a, c)))
          break
        case 'YZX':
          ;(this._z = Math.asin(i(l, -1, 1))),
            Math.abs(l) < 0.9999999
              ? ((this._x = Math.atan2(-h, c)), (this._y = Math.atan2(-u, s)))
              : ((this._x = 0), (this._y = Math.atan2(o, p)))
          break
        case 'XZY':
          ;(this._z = Math.asin(-i(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(d, c)), (this._y = Math.atan2(o, s)))
              : ((this._x = Math.atan2(-h, p)), (this._y = 0))
          break
        default:
          console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + e)
      }
      return (this._order = e), !1 !== n && this._onChangeCallback(), this
    }
    setFromQuaternion(t, e, n) {
      return Mt.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Mt, e, n)
    }
    setFromVector3(t, e) {
      return this.set(t.x, t.y, t.z, e || this._order)
    }
    reorder(t) {
      return St.setFromEuler(this), this.setFromQuaternion(St, t)
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        void 0 !== t[3] && (this._order = t[3]),
        this._onChangeCallback(),
        this
      )
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._order), t
      )
    }
    toVector3(t) {
      return t ? t.set(this._x, this._y, this._z) : new G(this._x, this._y, this._z)
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this
    }
    _onChangeCallback() {}
  }
  ;(Et.prototype.isEuler = !0),
    (Et.DefaultOrder = 'XYZ'),
    (Et.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'])
  class Tt {
    constructor() {
      this.mask = 1
    }
    set(t) {
      this.mask = (1 << t) | 0
    }
    enable(t) {
      this.mask |= (1 << t) | 0
    }
    enableAll() {
      this.mask = -1
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0)
    }
    disableAll() {
      this.mask = 0
    }
    test(t) {
      return 0 != (this.mask & t.mask)
    }
  }
  let Lt = 0
  const At = new G(),
    Rt = new U(),
    Pt = new mt(),
    Ct = new G(),
    Dt = new G(),
    It = new G(),
    Nt = new U(),
    Ot = new G(1, 0, 0),
    zt = new G(0, 1, 0),
    Ht = new G(0, 0, 1),
    Bt = { type: 'added' },
    Ft = { type: 'removed' }
  function Ut() {
    Object.defineProperty(this, 'id', { value: Lt++ }),
      (this.uuid = P.generateUUID()),
      (this.name = ''),
      (this.type = 'Object3D'),
      (this.parent = null),
      (this.children = []),
      (this.up = Ut.DefaultUp.clone())
    const t = new G(),
      e = new Et(),
      n = new U(),
      i = new G(1, 1, 1)
    e._onChange(function () {
      n.setFromEuler(e, !1)
    }),
      n._onChange(function () {
        e.setFromQuaternion(n, void 0, !1)
      }),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: i },
        modelViewMatrix: { value: new mt() },
        normalMatrix: { value: new D() },
      }),
      (this.matrix = new mt()),
      (this.matrixWorld = new mt()),
      (this.matrixAutoUpdate = Ut.DefaultMatrixAutoUpdate),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Tt()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {})
  }
  ;(Ut.DefaultUp = new G(0, 1, 0)),
    (Ut.DefaultMatrixAutoUpdate = !0),
    (Ut.prototype = Object.assign(Object.create(L.prototype), {
      constructor: Ut,
      isObject3D: !0,
      onBeforeRender: function () {},
      onAfterRender: function () {},
      applyMatrix4: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          this.matrix.premultiply(t),
          this.matrix.decompose(this.position, this.quaternion, this.scale)
      },
      applyQuaternion: function (t) {
        return this.quaternion.premultiply(t), this
      },
      setRotationFromAxisAngle: function (t, e) {
        this.quaternion.setFromAxisAngle(t, e)
      },
      setRotationFromEuler: function (t) {
        this.quaternion.setFromEuler(t, !0)
      },
      setRotationFromMatrix: function (t) {
        this.quaternion.setFromRotationMatrix(t)
      },
      setRotationFromQuaternion: function (t) {
        this.quaternion.copy(t)
      },
      rotateOnAxis: function (t, e) {
        return Rt.setFromAxisAngle(t, e), this.quaternion.multiply(Rt), this
      },
      rotateOnWorldAxis: function (t, e) {
        return Rt.setFromAxisAngle(t, e), this.quaternion.premultiply(Rt), this
      },
      rotateX: function (t) {
        return this.rotateOnAxis(Ot, t)
      },
      rotateY: function (t) {
        return this.rotateOnAxis(zt, t)
      },
      rotateZ: function (t) {
        return this.rotateOnAxis(Ht, t)
      },
      translateOnAxis: function (t, e) {
        return (
          At.copy(t).applyQuaternion(this.quaternion), this.position.add(At.multiplyScalar(e)), this
        )
      },
      translateX: function (t) {
        return this.translateOnAxis(Ot, t)
      },
      translateY: function (t) {
        return this.translateOnAxis(zt, t)
      },
      translateZ: function (t) {
        return this.translateOnAxis(Ht, t)
      },
      localToWorld: function (t) {
        return t.applyMatrix4(this.matrixWorld)
      },
      worldToLocal: function (t) {
        return t.applyMatrix4(Pt.copy(this.matrixWorld).invert())
      },
      lookAt: function (t, e, n) {
        t.isVector3 ? Ct.copy(t) : Ct.set(t, e, n)
        const i = this.parent
        this.updateWorldMatrix(!0, !1),
          Dt.setFromMatrixPosition(this.matrixWorld),
          this.isCamera || this.isLight ? Pt.lookAt(Dt, Ct, this.up) : Pt.lookAt(Ct, Dt, this.up),
          this.quaternion.setFromRotationMatrix(Pt),
          i &&
            (Pt.extractRotation(i.matrixWorld),
            Rt.setFromRotationMatrix(Pt),
            this.quaternion.premultiply(Rt.invert()))
      },
      add: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.add(arguments[t])
          return this
        }
        return t === this
          ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t),
            this)
          : (t && t.isObject3D
              ? (null !== t.parent && t.parent.remove(t),
                (t.parent = this),
                this.children.push(t),
                t.dispatchEvent(Bt))
              : console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', t),
            this)
      },
      remove: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.remove(arguments[t])
          return this
        }
        const e = this.children.indexOf(t)
        return (
          -1 !== e && ((t.parent = null), this.children.splice(e, 1), t.dispatchEvent(Ft)), this
        )
      },
      clear: function () {
        for (let t = 0; t < this.children.length; t++) {
          const e = this.children[t]
          ;(e.parent = null), e.dispatchEvent(Ft)
        }
        return (this.children.length = 0), this
      },
      attach: function (t) {
        return (
          this.updateWorldMatrix(!0, !1),
          Pt.copy(this.matrixWorld).invert(),
          null !== t.parent &&
            (t.parent.updateWorldMatrix(!0, !1), Pt.multiply(t.parent.matrixWorld)),
          t.applyMatrix4(Pt),
          this.add(t),
          t.updateWorldMatrix(!1, !0),
          this
        )
      },
      getObjectById: function (t) {
        return this.getObjectByProperty('id', t)
      },
      getObjectByName: function (t) {
        return this.getObjectByProperty('name', t)
      },
      getObjectByProperty: function (t, e) {
        if (this[t] === e) return this
        for (let n = 0, i = this.children.length; n < i; n++) {
          const i = this.children[n].getObjectByProperty(t, e)
          if (void 0 !== i) return i
        }
      },
      getWorldPosition: function (t) {
        return (
          void 0 === t &&
            (console.warn('THREE.Object3D: .getWorldPosition() target is now required'),
            (t = new G())),
          this.updateWorldMatrix(!0, !1),
          t.setFromMatrixPosition(this.matrixWorld)
        )
      },
      getWorldQuaternion: function (t) {
        return (
          void 0 === t &&
            (console.warn('THREE.Object3D: .getWorldQuaternion() target is now required'),
            (t = new U())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Dt, t, It),
          t
        )
      },
      getWorldScale: function (t) {
        return (
          void 0 === t &&
            (console.warn('THREE.Object3D: .getWorldScale() target is now required'),
            (t = new G())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Dt, Nt, t),
          t
        )
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn('THREE.Object3D: .getWorldDirection() target is now required'),
          (t = new G())),
          this.updateWorldMatrix(!0, !1)
        const e = this.matrixWorld.elements
        return t.set(e[8], e[9], e[10]).normalize()
      },
      raycast: function () {},
      traverse: function (t) {
        t(this)
        const e = this.children
        for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t)
      },
      traverseVisible: function (t) {
        if (!1 === this.visible) return
        t(this)
        const e = this.children
        for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t)
      },
      traverseAncestors: function (t) {
        const e = this.parent
        null !== e && (t(e), e.traverseAncestors(t))
      },
      updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale),
          (this.matrixWorldNeedsUpdate = !0)
      },
      updateMatrixWorld: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate || t) &&
            (null === this.parent
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            (this.matrixWorldNeedsUpdate = !1),
            (t = !0))
        const e = this.children
        for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t)
      },
      updateWorldMatrix: function (t, e) {
        const n = this.parent
        if (
          (!0 === t && null !== n && n.updateWorldMatrix(!0, !1),
          this.matrixAutoUpdate && this.updateMatrix(),
          null === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
          !0 === e)
        ) {
          const t = this.children
          for (let e = 0, n = t.length; e < n; e++) t[e].updateWorldMatrix(!1, !0)
        }
      },
      toJSON: function (t) {
        const e = void 0 === t || 'string' == typeof t,
          n = {}
        e &&
          ((t = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
          }),
          (n.metadata = { version: 4.5, type: 'Object', generator: 'Object3D.toJSON' }))
        const i = {}
        function r(e, n) {
          return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid
        }
        if (
          ((i.uuid = this.uuid),
          (i.type = this.type),
          '' !== this.name && (i.name = this.name),
          !0 === this.castShadow && (i.castShadow = !0),
          !0 === this.receiveShadow && (i.receiveShadow = !0),
          !1 === this.visible && (i.visible = !1),
          !1 === this.frustumCulled && (i.frustumCulled = !1),
          0 !== this.renderOrder && (i.renderOrder = this.renderOrder),
          '{}' !== JSON.stringify(this.userData) && (i.userData = this.userData),
          (i.layers = this.layers.mask),
          (i.matrix = this.matrix.toArray()),
          !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1),
          this.isInstancedMesh &&
            ((i.type = 'InstancedMesh'),
            (i.count = this.count),
            (i.instanceMatrix = this.instanceMatrix.toJSON())),
          this.isMesh || this.isLine || this.isPoints)
        ) {
          i.geometry = r(t.geometries, this.geometry)
          const e = this.geometry.parameters
          if (void 0 !== e && void 0 !== e.shapes) {
            const n = e.shapes
            if (Array.isArray(n))
              for (let e = 0, i = n.length; e < i; e++) {
                const i = n[e]
                r(t.shapes, i)
              }
            else r(t.shapes, n)
          }
        }
        if (
          (this.isSkinnedMesh &&
            ((i.bindMode = this.bindMode),
            (i.bindMatrix = this.bindMatrix.toArray()),
            void 0 !== this.skeleton &&
              (r(t.skeletons, this.skeleton), (i.skeleton = this.skeleton.uuid))),
          void 0 !== this.material)
        )
          if (Array.isArray(this.material)) {
            const e = []
            for (let n = 0, i = this.material.length; n < i; n++)
              e.push(r(t.materials, this.material[n]))
            i.material = e
          } else i.material = r(t.materials, this.material)
        if (this.children.length > 0) {
          i.children = []
          for (let e = 0; e < this.children.length; e++)
            i.children.push(this.children[e].toJSON(t).object)
        }
        if (this.animations.length > 0) {
          i.animations = []
          for (let e = 0; e < this.animations.length; e++) {
            const n = this.animations[e]
            i.animations.push(r(t.animations, n))
          }
        }
        if (e) {
          const e = s(t.geometries),
            i = s(t.materials),
            r = s(t.textures),
            a = s(t.images),
            o = s(t.shapes),
            l = s(t.skeletons),
            c = s(t.animations)
          e.length > 0 && (n.geometries = e),
            i.length > 0 && (n.materials = i),
            r.length > 0 && (n.textures = r),
            a.length > 0 && (n.images = a),
            o.length > 0 && (n.shapes = o),
            l.length > 0 && (n.skeletons = l),
            c.length > 0 && (n.animations = c)
        }
        return (n.object = i), n
        function s(t) {
          const e = []
          for (const n in t) {
            const i = t[n]
            delete i.metadata, e.push(i)
          }
          return e
        }
      },
      clone: function (t) {
        return new this.constructor().copy(this, t)
      },
      copy: function (t, e = !0) {
        if (
          ((this.name = t.name),
          this.up.copy(t.up),
          this.position.copy(t.position),
          (this.rotation.order = t.rotation.order),
          this.quaternion.copy(t.quaternion),
          this.scale.copy(t.scale),
          this.matrix.copy(t.matrix),
          this.matrixWorld.copy(t.matrixWorld),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
          (this.layers.mask = t.layers.mask),
          (this.visible = t.visible),
          (this.castShadow = t.castShadow),
          (this.receiveShadow = t.receiveShadow),
          (this.frustumCulled = t.frustumCulled),
          (this.renderOrder = t.renderOrder),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          !0 === e)
        )
          for (let e = 0; e < t.children.length; e++) {
            const n = t.children[e]
            this.add(n.clone())
          }
        return this
      },
    }))
  const Gt = new G(),
    kt = new G(),
    Vt = new D()
  class Wt {
    constructor(t = new G(1, 0, 0), e = 0) {
      ;(this.normal = t), (this.constant = e)
    }
    set(t, e) {
      return this.normal.copy(t), (this.constant = e), this
    }
    setComponents(t, e, n, i) {
      return this.normal.set(t, e, n), (this.constant = i), this
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), (this.constant = -e.dot(this.normal)), this
    }
    setFromCoplanarPoints(t, e, n) {
      const i = Gt.subVectors(n, e).cross(kt.subVectors(t, e)).normalize()
      return this.setFromNormalAndCoplanarPoint(i, t), this
    }
    copy(t) {
      return this.normal.copy(t.normal), (this.constant = t.constant), this
    }
    normalize() {
      const t = 1 / this.normal.length()
      return this.normal.multiplyScalar(t), (this.constant *= t), this
    }
    negate() {
      return (this.constant *= -1), this.normal.negate(), this
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius
    }
    projectPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn('THREE.Plane: .projectPoint() target is now required'), (e = new G())),
        e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
      )
    }
    intersectLine(t, e) {
      void 0 === e &&
        (console.warn('THREE.Plane: .intersectLine() target is now required'), (e = new G()))
      const n = t.delta(Gt),
        i = this.normal.dot(n)
      if (0 === i) return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : void 0
      const r = -(t.start.dot(this.normal) + this.constant) / i
      return r < 0 || r > 1 ? void 0 : e.copy(n).multiplyScalar(r).add(t.start)
    }
    intersectsLine(t) {
      const e = this.distanceToPoint(t.start),
        n = this.distanceToPoint(t.end)
      return (e < 0 && n > 0) || (n < 0 && e > 0)
    }
    intersectsBox(t) {
      return t.intersectsPlane(this)
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this)
    }
    coplanarPoint(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Plane: .coplanarPoint() target is now required'), (t = new G())),
        t.copy(this.normal).multiplyScalar(-this.constant)
      )
    }
    applyMatrix4(t, e) {
      const n = e || Vt.getNormalMatrix(t),
        i = this.coplanarPoint(Gt).applyMatrix4(t),
        r = this.normal.applyMatrix3(n).normalize()
      return (this.constant = -i.dot(r)), this
    }
    translate(t) {
      return (this.constant -= t.dot(this.normal)), this
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }
  Wt.prototype.isPlane = !0
  const jt = new G(),
    qt = new G(),
    Xt = new G(),
    Yt = new G(),
    Zt = new G(),
    Jt = new G(),
    Qt = new G(),
    Kt = new G(),
    $t = new G(),
    te = new G()
  class ee {
    constructor(t = new G(), e = new G(), n = new G()) {
      ;(this.a = t), (this.b = e), (this.c = n)
    }
    static getNormal(t, e, n, i) {
      void 0 === i &&
        (console.warn('THREE.Triangle: .getNormal() target is now required'), (i = new G())),
        i.subVectors(n, e),
        jt.subVectors(t, e),
        i.cross(jt)
      const r = i.lengthSq()
      return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0)
    }
    static getBarycoord(t, e, n, i, r) {
      jt.subVectors(i, e), qt.subVectors(n, e), Xt.subVectors(t, e)
      const s = jt.dot(jt),
        a = jt.dot(qt),
        o = jt.dot(Xt),
        l = qt.dot(qt),
        c = qt.dot(Xt),
        h = s * l - a * a
      if (
        (void 0 === r &&
          (console.warn('THREE.Triangle: .getBarycoord() target is now required'), (r = new G())),
        0 === h)
      )
        return r.set(-2, -1, -1)
      const u = 1 / h,
        d = (l * o - a * c) * u,
        p = (s * c - a * o) * u
      return r.set(1 - d - p, p, d)
    }
    static containsPoint(t, e, n, i) {
      return this.getBarycoord(t, e, n, i, Yt), Yt.x >= 0 && Yt.y >= 0 && Yt.x + Yt.y <= 1
    }
    static getUV(t, e, n, i, r, s, a, o) {
      return (
        this.getBarycoord(t, e, n, i, Yt),
        o.set(0, 0),
        o.addScaledVector(r, Yt.x),
        o.addScaledVector(s, Yt.y),
        o.addScaledVector(a, Yt.z),
        o
      )
    }
    static isFrontFacing(t, e, n, i) {
      return jt.subVectors(n, e), qt.subVectors(t, e), jt.cross(qt).dot(i) < 0
    }
    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
    }
    setFromPointsAndIndices(t, e, n, i) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
    }
    getArea() {
      return (
        jt.subVectors(this.c, this.b), qt.subVectors(this.a, this.b), 0.5 * jt.cross(qt).length()
      )
    }
    getMidpoint(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Triangle: .getMidpoint() target is now required'), (t = new G())),
        t
          .addVectors(this.a, this.b)
          .add(this.c)
          .multiplyScalar(1 / 3)
      )
    }
    getNormal(t) {
      return ee.getNormal(this.a, this.b, this.c, t)
    }
    getPlane(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Triangle: .getPlane() target is now required'), (t = new Wt())),
        t.setFromCoplanarPoints(this.a, this.b, this.c)
      )
    }
    getBarycoord(t, e) {
      return ee.getBarycoord(t, this.a, this.b, this.c, e)
    }
    getUV(t, e, n, i, r) {
      return ee.getUV(t, this.a, this.b, this.c, e, n, i, r)
    }
    containsPoint(t) {
      return ee.containsPoint(t, this.a, this.b, this.c)
    }
    isFrontFacing(t) {
      return ee.isFrontFacing(this.a, this.b, this.c, t)
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this)
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn('THREE.Triangle: .closestPointToPoint() target is now required'),
        (e = new G()))
      const n = this.a,
        i = this.b,
        r = this.c
      let s, a
      Zt.subVectors(i, n), Jt.subVectors(r, n), Kt.subVectors(t, n)
      const o = Zt.dot(Kt),
        l = Jt.dot(Kt)
      if (o <= 0 && l <= 0) return e.copy(n)
      $t.subVectors(t, i)
      const c = Zt.dot($t),
        h = Jt.dot($t)
      if (c >= 0 && h <= c) return e.copy(i)
      const u = o * h - c * l
      if (u <= 0 && o >= 0 && c <= 0) return (s = o / (o - c)), e.copy(n).addScaledVector(Zt, s)
      te.subVectors(t, r)
      const d = Zt.dot(te),
        p = Jt.dot(te)
      if (p >= 0 && d <= p) return e.copy(r)
      const f = d * l - o * p
      if (f <= 0 && l >= 0 && p <= 0) return (a = l / (l - p)), e.copy(n).addScaledVector(Jt, a)
      const m = c * p - d * h
      if (m <= 0 && h - c >= 0 && d - p >= 0)
        return (
          Qt.subVectors(r, i), (a = (h - c) / (h - c + (d - p))), e.copy(i).addScaledVector(Qt, a)
        )
      const g = 1 / (m + f + u)
      return (s = f * g), (a = u * g), e.copy(n).addScaledVector(Zt, s).addScaledVector(Jt, a)
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
    }
  }
  let ne = 0
  function ie() {
    Object.defineProperty(this, 'id', { value: ne++ }),
      (this.uuid = P.generateUUID()),
      (this.name = ''),
      (this.type = 'Material'),
      (this.fog = !0),
      (this.blending = 1),
      (this.side = 0),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.blendSrc = 204),
      (this.blendDst = 205),
      (this.blendEquation = t),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.depthFunc = 3),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = 519),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = M),
      (this.stencilZFail = M),
      (this.stencilZPass = M),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaTest = 0),
      (this.premultipliedAlpha = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0)
  }
  ;(ie.prototype = Object.assign(Object.create(L.prototype), {
    constructor: ie,
    isMaterial: !0,
    onBeforeCompile: function () {},
    customProgramCacheKey: function () {
      return this.onBeforeCompile.toString()
    },
    setValues: function (t) {
      if (void 0 !== t)
        for (const e in t) {
          const n = t[e]
          if (void 0 === n) {
            console.warn("THREE.Material: '" + e + "' parameter is undefined.")
            continue
          }
          if ('shading' === e) {
            console.warn(
              'THREE.' +
                this.type +
                ': .shading has been removed. Use the boolean .flatShading instead.'
            ),
              (this.flatShading = 1 === n)
            continue
          }
          const i = this[e]
          void 0 !== i
            ? i && i.isColor
              ? i.set(n)
              : i && i.isVector3 && n && n.isVector3
              ? i.copy(n)
              : (this[e] = n)
            : console.warn(
                'THREE.' + this.type + ": '" + e + "' is not a property of this material."
              )
        }
    },
    toJSON: function (t) {
      const e = void 0 === t || 'string' == typeof t
      e && (t = { textures: {}, images: {} })
      const n = { metadata: { version: 4.5, type: 'Material', generator: 'Material.toJSON' } }
      function i(t) {
        const e = []
        for (const n in t) {
          const i = t[n]
          delete i.metadata, e.push(i)
        }
        return e
      }
      if (
        ((n.uuid = this.uuid),
        (n.type = this.type),
        '' !== this.name && (n.name = this.name),
        this.color && this.color.isColor && (n.color = this.color.getHex()),
        void 0 !== this.roughness && (n.roughness = this.roughness),
        void 0 !== this.metalness && (n.metalness = this.metalness),
        this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()),
        this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()),
        this.emissiveIntensity &&
          1 !== this.emissiveIntensity &&
          (n.emissiveIntensity = this.emissiveIntensity),
        this.specular && this.specular.isColor && (n.specular = this.specular.getHex()),
        void 0 !== this.shininess && (n.shininess = this.shininess),
        void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat),
        void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap &&
          this.clearcoatMap.isTexture &&
          (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
        this.clearcoatRoughnessMap &&
          this.clearcoatRoughnessMap.isTexture &&
          (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
        this.clearcoatNormalMap &&
          this.clearcoatNormalMap.isTexture &&
          ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
          (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
        this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid),
        this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid),
        this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid),
        this.lightMap &&
          this.lightMap.isTexture &&
          ((n.lightMap = this.lightMap.toJSON(t).uuid),
          (n.lightMapIntensity = this.lightMapIntensity)),
        this.aoMap &&
          this.aoMap.isTexture &&
          ((n.aoMap = this.aoMap.toJSON(t).uuid), (n.aoMapIntensity = this.aoMapIntensity)),
        this.bumpMap &&
          this.bumpMap.isTexture &&
          ((n.bumpMap = this.bumpMap.toJSON(t).uuid), (n.bumpScale = this.bumpScale)),
        this.normalMap &&
          this.normalMap.isTexture &&
          ((n.normalMap = this.normalMap.toJSON(t).uuid),
          (n.normalMapType = this.normalMapType),
          (n.normalScale = this.normalScale.toArray())),
        this.displacementMap &&
          this.displacementMap.isTexture &&
          ((n.displacementMap = this.displacementMap.toJSON(t).uuid),
          (n.displacementScale = this.displacementScale),
          (n.displacementBias = this.displacementBias)),
        this.roughnessMap &&
          this.roughnessMap.isTexture &&
          (n.roughnessMap = this.roughnessMap.toJSON(t).uuid),
        this.metalnessMap &&
          this.metalnessMap.isTexture &&
          (n.metalnessMap = this.metalnessMap.toJSON(t).uuid),
        this.emissiveMap &&
          this.emissiveMap.isTexture &&
          (n.emissiveMap = this.emissiveMap.toJSON(t).uuid),
        this.specularMap &&
          this.specularMap.isTexture &&
          (n.specularMap = this.specularMap.toJSON(t).uuid),
        this.envMap &&
          this.envMap.isTexture &&
          ((n.envMap = this.envMap.toJSON(t).uuid),
          (n.reflectivity = this.reflectivity),
          (n.refractionRatio = this.refractionRatio),
          void 0 !== this.combine && (n.combine = this.combine),
          void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity)),
        this.gradientMap &&
          this.gradientMap.isTexture &&
          (n.gradientMap = this.gradientMap.toJSON(t).uuid),
        void 0 !== this.size && (n.size = this.size),
        void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation),
        1 !== this.blending && (n.blending = this.blending),
        0 !== this.side && (n.side = this.side),
        this.vertexColors && (n.vertexColors = !0),
        this.opacity < 1 && (n.opacity = this.opacity),
        !0 === this.transparent && (n.transparent = this.transparent),
        (n.depthFunc = this.depthFunc),
        (n.depthTest = this.depthTest),
        (n.depthWrite = this.depthWrite),
        (n.stencilWrite = this.stencilWrite),
        (n.stencilWriteMask = this.stencilWriteMask),
        (n.stencilFunc = this.stencilFunc),
        (n.stencilRef = this.stencilRef),
        (n.stencilFuncMask = this.stencilFuncMask),
        (n.stencilFail = this.stencilFail),
        (n.stencilZFail = this.stencilZFail),
        (n.stencilZPass = this.stencilZPass),
        this.rotation && 0 !== this.rotation && (n.rotation = this.rotation),
        !0 === this.polygonOffset && (n.polygonOffset = !0),
        0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor),
        0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth),
        void 0 !== this.dashSize && (n.dashSize = this.dashSize),
        void 0 !== this.gapSize && (n.gapSize = this.gapSize),
        void 0 !== this.scale && (n.scale = this.scale),
        !0 === this.dithering && (n.dithering = !0),
        this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
        !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha),
        !0 === this.wireframe && (n.wireframe = this.wireframe),
        this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth),
        'round' !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap),
        'round' !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin),
        !0 === this.morphTargets && (n.morphTargets = !0),
        !0 === this.morphNormals && (n.morphNormals = !0),
        !0 === this.skinning && (n.skinning = !0),
        !0 === this.flatShading && (n.flatShading = this.flatShading),
        !1 === this.visible && (n.visible = !1),
        !1 === this.toneMapped && (n.toneMapped = !1),
        '{}' !== JSON.stringify(this.userData) && (n.userData = this.userData),
        e)
      ) {
        const e = i(t.textures),
          r = i(t.images)
        e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r)
      }
      return n
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (t) {
      ;(this.name = t.name),
        (this.fog = t.fog),
        (this.blending = t.blending),
        (this.side = t.side),
        (this.vertexColors = t.vertexColors),
        (this.opacity = t.opacity),
        (this.transparent = t.transparent),
        (this.blendSrc = t.blendSrc),
        (this.blendDst = t.blendDst),
        (this.blendEquation = t.blendEquation),
        (this.blendSrcAlpha = t.blendSrcAlpha),
        (this.blendDstAlpha = t.blendDstAlpha),
        (this.blendEquationAlpha = t.blendEquationAlpha),
        (this.depthFunc = t.depthFunc),
        (this.depthTest = t.depthTest),
        (this.depthWrite = t.depthWrite),
        (this.stencilWriteMask = t.stencilWriteMask),
        (this.stencilFunc = t.stencilFunc),
        (this.stencilRef = t.stencilRef),
        (this.stencilFuncMask = t.stencilFuncMask),
        (this.stencilFail = t.stencilFail),
        (this.stencilZFail = t.stencilZFail),
        (this.stencilZPass = t.stencilZPass),
        (this.stencilWrite = t.stencilWrite)
      const e = t.clippingPlanes
      let n = null
      if (null !== e) {
        const t = e.length
        n = new Array(t)
        for (let i = 0; i !== t; ++i) n[i] = e[i].clone()
      }
      return (
        (this.clippingPlanes = n),
        (this.clipIntersection = t.clipIntersection),
        (this.clipShadows = t.clipShadows),
        (this.shadowSide = t.shadowSide),
        (this.colorWrite = t.colorWrite),
        (this.precision = t.precision),
        (this.polygonOffset = t.polygonOffset),
        (this.polygonOffsetFactor = t.polygonOffsetFactor),
        (this.polygonOffsetUnits = t.polygonOffsetUnits),
        (this.dithering = t.dithering),
        (this.alphaTest = t.alphaTest),
        (this.premultipliedAlpha = t.premultipliedAlpha),
        (this.visible = t.visible),
        (this.toneMapped = t.toneMapped),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        this
      )
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })),
    Object.defineProperty(ie.prototype, 'needsUpdate', {
      set: function (t) {
        !0 === t && this.version++
      },
    })
  const re = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    se = { h: 0, s: 0, l: 0 },
    ae = { h: 0, s: 0, l: 0 }
  function oe(t, e, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6 ? t + 6 * (e - t) * n : n < 0.5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
    )
  }
  function le(t) {
    return t < 0.04045 ? 0.0773993808 * t : Math.pow(0.9478672986 * t + 0.0521327014, 2.4)
  }
  function ce(t) {
    return t < 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055
  }
  class he {
    constructor(t, e, n) {
      return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
    }
    set(t) {
      return (
        t && t.isColor
          ? this.copy(t)
          : 'number' == typeof t
          ? this.setHex(t)
          : 'string' == typeof t && this.setStyle(t),
        this
      )
    }
    setScalar(t) {
      return (this.r = t), (this.g = t), (this.b = t), this
    }
    setHex(t) {
      return (
        (t = Math.floor(t)),
        (this.r = ((t >> 16) & 255) / 255),
        (this.g = ((t >> 8) & 255) / 255),
        (this.b = (255 & t) / 255),
        this
      )
    }
    setRGB(t, e, n) {
      return (this.r = t), (this.g = e), (this.b = n), this
    }
    setHSL(t, e, n) {
      if (((t = P.euclideanModulo(t, 1)), (e = P.clamp(e, 0, 1)), (n = P.clamp(n, 0, 1)), 0 === e))
        this.r = this.g = this.b = n
      else {
        const i = n <= 0.5 ? n * (1 + e) : n + e - n * e,
          r = 2 * n - i
        ;(this.r = oe(r, i, t + 1 / 3)), (this.g = oe(r, i, t)), (this.b = oe(r, i, t - 1 / 3))
      }
      return this
    }
    setStyle(t) {
      function e(e) {
        void 0 !== e &&
          parseFloat(e) < 1 &&
          console.warn('THREE.Color: Alpha component of ' + t + ' will be ignored.')
      }
      let n
      if ((n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t))) {
        let t
        const i = n[1],
          r = n[2]
        switch (i) {
          case 'rgb':
          case 'rgba':
            if ((t = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
              return (
                (this.r = Math.min(255, parseInt(t[1], 10)) / 255),
                (this.g = Math.min(255, parseInt(t[2], 10)) / 255),
                (this.b = Math.min(255, parseInt(t[3], 10)) / 255),
                e(t[4]),
                this
              )
            if ((t = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)))
              return (
                (this.r = Math.min(100, parseInt(t[1], 10)) / 100),
                (this.g = Math.min(100, parseInt(t[2], 10)) / 100),
                (this.b = Math.min(100, parseInt(t[3], 10)) / 100),
                e(t[4]),
                this
              )
            break
          case 'hsl':
          case 'hsla':
            if (
              (t = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))
            ) {
              const n = parseFloat(t[1]) / 360,
                i = parseInt(t[2], 10) / 100,
                r = parseInt(t[3], 10) / 100
              return e(t[4]), this.setHSL(n, i, r)
            }
        }
      } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(t))) {
        const t = n[1],
          e = t.length
        if (3 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255),
            (this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255),
            (this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255),
            this
          )
        if (6 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255),
            (this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255),
            (this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255),
            this
          )
      }
      return t && t.length > 0 ? this.setColorName(t) : this
    }
    setColorName(t) {
      const e = re[t]
      return void 0 !== e ? this.setHex(e) : console.warn('THREE.Color: Unknown color ' + t), this
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b)
    }
    copy(t) {
      return (this.r = t.r), (this.g = t.g), (this.b = t.b), this
    }
    copyGammaToLinear(t, e = 2) {
      return (
        (this.r = Math.pow(t.r, e)), (this.g = Math.pow(t.g, e)), (this.b = Math.pow(t.b, e)), this
      )
    }
    copyLinearToGamma(t, e = 2) {
      const n = e > 0 ? 1 / e : 1
      return (
        (this.r = Math.pow(t.r, n)), (this.g = Math.pow(t.g, n)), (this.b = Math.pow(t.b, n)), this
      )
    }
    convertGammaToLinear(t) {
      return this.copyGammaToLinear(this, t), this
    }
    convertLinearToGamma(t) {
      return this.copyLinearToGamma(this, t), this
    }
    copySRGBToLinear(t) {
      return (this.r = le(t.r)), (this.g = le(t.g)), (this.b = le(t.b)), this
    }
    copyLinearToSRGB(t) {
      return (this.r = ce(t.r)), (this.g = ce(t.g)), (this.b = ce(t.b)), this
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this
    }
    getHex() {
      return ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
    }
    getHexString() {
      return ('000000' + this.getHex().toString(16)).slice(-6)
    }
    getHSL(t) {
      void 0 === t &&
        (console.warn('THREE.Color: .getHSL() target is now required'), (t = { h: 0, s: 0, l: 0 }))
      const e = this.r,
        n = this.g,
        i = this.b,
        r = Math.max(e, n, i),
        s = Math.min(e, n, i)
      let a, o
      const l = (s + r) / 2
      if (s === r) (a = 0), (o = 0)
      else {
        const t = r - s
        switch (((o = l <= 0.5 ? t / (r + s) : t / (2 - r - s)), r)) {
          case e:
            a = (n - i) / t + (n < i ? 6 : 0)
            break
          case n:
            a = (i - e) / t + 2
            break
          case i:
            a = (e - n) / t + 4
        }
        a /= 6
      }
      return (t.h = a), (t.s = o), (t.l = l), t
    }
    getStyle() {
      return (
        'rgb(' +
        ((255 * this.r) | 0) +
        ',' +
        ((255 * this.g) | 0) +
        ',' +
        ((255 * this.b) | 0) +
        ')'
      )
    }
    offsetHSL(t, e, n) {
      return (
        this.getHSL(se), (se.h += t), (se.s += e), (se.l += n), this.setHSL(se.h, se.s, se.l), this
      )
    }
    add(t) {
      return (this.r += t.r), (this.g += t.g), (this.b += t.b), this
    }
    addColors(t, e) {
      return (this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this
    }
    addScalar(t) {
      return (this.r += t), (this.g += t), (this.b += t), this
    }
    sub(t) {
      return (
        (this.r = Math.max(0, this.r - t.r)),
        (this.g = Math.max(0, this.g - t.g)),
        (this.b = Math.max(0, this.b - t.b)),
        this
      )
    }
    multiply(t) {
      return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this
    }
    multiplyScalar(t) {
      return (this.r *= t), (this.g *= t), (this.b *= t), this
    }
    lerp(t, e) {
      return (
        (this.r += (t.r - this.r) * e),
        (this.g += (t.g - this.g) * e),
        (this.b += (t.b - this.b) * e),
        this
      )
    }
    lerpColors(t, e, n) {
      return (
        (this.r = t.r + (e.r - t.r) * n),
        (this.g = t.g + (e.g - t.g) * n),
        (this.b = t.b + (e.b - t.b) * n),
        this
      )
    }
    lerpHSL(t, e) {
      this.getHSL(se), t.getHSL(ae)
      const n = P.lerp(se.h, ae.h, e),
        i = P.lerp(se.s, ae.s, e),
        r = P.lerp(se.l, ae.l, e)
      return this.setHSL(n, i, r), this
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b
    }
    fromArray(t, e = 0) {
      return (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t
    }
    fromBufferAttribute(t, e) {
      return (
        (this.r = t.getX(e)),
        (this.g = t.getY(e)),
        (this.b = t.getZ(e)),
        !0 === t.normalized && ((this.r /= 255), (this.g /= 255), (this.b /= 255)),
        this
      )
    }
    toJSON() {
      return this.getHex()
    }
  }
  ;(he.NAMES = re),
    (he.prototype.isColor = !0),
    (he.prototype.r = 1),
    (he.prototype.g = 1),
    (he.prototype.b = 1)
  class ue extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshBasicMaterial'),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = 'round'),
        (this.wireframeLinejoin = 'round'),
        (this.skinning = !1),
        (this.morphTargets = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        this
      )
    }
  }
  ue.prototype.isMeshBasicMaterial = !0
  const de = new G(),
    pe = new C()
  function fe(t, e, n) {
    if (Array.isArray(t))
      throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.')
    ;(this.name = ''),
      (this.array = t),
      (this.itemSize = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.normalized = !0 === n),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0)
  }
  function me(t, e, n) {
    fe.call(this, new Int8Array(t), e, n)
  }
  function ge(t, e, n) {
    fe.call(this, new Uint8Array(t), e, n)
  }
  function ve(t, e, n) {
    fe.call(this, new Uint8ClampedArray(t), e, n)
  }
  function ye(t, e, n) {
    fe.call(this, new Int16Array(t), e, n)
  }
  function xe(t, e, n) {
    fe.call(this, new Uint16Array(t), e, n)
  }
  function _e(t, e, n) {
    fe.call(this, new Int32Array(t), e, n)
  }
  function be(t, e, n) {
    fe.call(this, new Uint32Array(t), e, n)
  }
  function we(t, e, n) {
    fe.call(this, new Uint16Array(t), e, n)
  }
  function Me(t, e, n) {
    fe.call(this, new Float32Array(t), e, n)
  }
  function Se(t, e, n) {
    fe.call(this, new Float64Array(t), e, n)
  }
  function Ee(t) {
    if (0 === t.length) return -1 / 0
    let e = t[0]
    for (let n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n])
    return e
  }
  Object.defineProperty(fe.prototype, 'needsUpdate', {
    set: function (t) {
      !0 === t && this.version++
    },
  }),
    Object.assign(fe.prototype, {
      isBufferAttribute: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this
      },
      copy: function (t) {
        return (
          (this.name = t.name),
          (this.array = new t.array.constructor(t.array)),
          (this.itemSize = t.itemSize),
          (this.count = t.count),
          (this.normalized = t.normalized),
          (this.usage = t.usage),
          this
        )
      },
      copyAt: function (t, e, n) {
        ;(t *= this.itemSize), (n *= e.itemSize)
        for (let i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i]
        return this
      },
      copyArray: function (t) {
        return this.array.set(t), this
      },
      copyColorsArray: function (t) {
        const e = this.array
        let n = 0
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i]
          void 0 === r &&
            (console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i),
            (r = new he())),
            (e[n++] = r.r),
            (e[n++] = r.g),
            (e[n++] = r.b)
        }
        return this
      },
      copyVector2sArray: function (t) {
        const e = this.array
        let n = 0
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i]
          void 0 === r &&
            (console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i),
            (r = new C())),
            (e[n++] = r.x),
            (e[n++] = r.y)
        }
        return this
      },
      copyVector3sArray: function (t) {
        const e = this.array
        let n = 0
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i]
          void 0 === r &&
            (console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i),
            (r = new G())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z)
        }
        return this
      },
      copyVector4sArray: function (t) {
        const e = this.array
        let n = 0
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i]
          void 0 === r &&
            (console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i),
            (r = new B())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z),
            (e[n++] = r.w)
        }
        return this
      },
      applyMatrix3: function (t) {
        if (2 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            pe.fromBufferAttribute(this, e), pe.applyMatrix3(t), this.setXY(e, pe.x, pe.y)
        else if (3 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            de.fromBufferAttribute(this, e), de.applyMatrix3(t), this.setXYZ(e, de.x, de.y, de.z)
        return this
      },
      applyMatrix4: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.applyMatrix4(t),
            this.setXYZ(e, de.x, de.y, de.z)
        return this
      },
      applyNormalMatrix: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.applyNormalMatrix(t),
            this.setXYZ(e, de.x, de.y, de.z)
        return this
      },
      transformDirection: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (de.x = this.getX(e)),
            (de.y = this.getY(e)),
            (de.z = this.getZ(e)),
            de.transformDirection(t),
            this.setXYZ(e, de.x, de.y, de.z)
        return this
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this
      },
      getX: function (t) {
        return this.array[t * this.itemSize]
      },
      setX: function (t, e) {
        return (this.array[t * this.itemSize] = e), this
      },
      getY: function (t) {
        return this.array[t * this.itemSize + 1]
      },
      setY: function (t, e) {
        return (this.array[t * this.itemSize + 1] = e), this
      },
      getZ: function (t) {
        return this.array[t * this.itemSize + 2]
      },
      setZ: function (t, e) {
        return (this.array[t * this.itemSize + 2] = e), this
      },
      getW: function (t) {
        return this.array[t * this.itemSize + 3]
      },
      setW: function (t, e) {
        return (this.array[t * this.itemSize + 3] = e), this
      },
      setXY: function (t, e, n) {
        return (t *= this.itemSize), (this.array[t + 0] = e), (this.array[t + 1] = n), this
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          this
        )
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          (this.array[t + 3] = r),
          this
        )
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this
      },
      clone: function () {
        return new this.constructor(this.array, this.itemSize).copy(this)
      },
      toJSON: function () {
        return {
          itemSize: this.itemSize,
          type: this.array.constructor.name,
          array: Array.prototype.slice.call(this.array),
          normalized: this.normalized,
        }
      },
    }),
    (me.prototype = Object.create(fe.prototype)),
    (me.prototype.constructor = me),
    (ge.prototype = Object.create(fe.prototype)),
    (ge.prototype.constructor = ge),
    (ve.prototype = Object.create(fe.prototype)),
    (ve.prototype.constructor = ve),
    (ye.prototype = Object.create(fe.prototype)),
    (ye.prototype.constructor = ye),
    (xe.prototype = Object.create(fe.prototype)),
    (xe.prototype.constructor = xe),
    (_e.prototype = Object.create(fe.prototype)),
    (_e.prototype.constructor = _e),
    (be.prototype = Object.create(fe.prototype)),
    (be.prototype.constructor = be),
    (we.prototype = Object.create(fe.prototype)),
    (we.prototype.constructor = we),
    (we.prototype.isFloat16BufferAttribute = !0),
    (Me.prototype = Object.create(fe.prototype)),
    (Me.prototype.constructor = Me),
    (Se.prototype = Object.create(fe.prototype)),
    (Se.prototype.constructor = Se),
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  let Te = 0
  const Le = new mt(),
    Ae = new Ut(),
    Re = new G(),
    Pe = new W(),
    Ce = new W(),
    De = new G()
  function Ie() {
    Object.defineProperty(this, 'id', { value: Te++ }),
      (this.uuid = P.generateUUID()),
      (this.name = ''),
      (this.type = 'BufferGeometry'),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {})
  }
  Ie.prototype = Object.assign(Object.create(L.prototype), {
    constructor: Ie,
    isBufferGeometry: !0,
    getIndex: function () {
      return this.index
    },
    setIndex: function (t) {
      return (
        Array.isArray(t) ? (this.index = new (Ee(t) > 65535 ? be : xe)(t, 1)) : (this.index = t),
        this
      )
    },
    getAttribute: function (t) {
      return this.attributes[t]
    },
    setAttribute: function (t, e) {
      return (this.attributes[t] = e), this
    },
    deleteAttribute: function (t) {
      return delete this.attributes[t], this
    },
    hasAttribute: function (t) {
      return void 0 !== this.attributes[t]
    },
    addGroup: function (t, e, n = 0) {
      this.groups.push({ start: t, count: e, materialIndex: n })
    },
    clearGroups: function () {
      this.groups = []
    },
    setDrawRange: function (t, e) {
      ;(this.drawRange.start = t), (this.drawRange.count = e)
    },
    applyMatrix4: function (t) {
      const e = this.attributes.position
      void 0 !== e && (e.applyMatrix4(t), (e.needsUpdate = !0))
      const n = this.attributes.normal
      if (void 0 !== n) {
        const e = new D().getNormalMatrix(t)
        n.applyNormalMatrix(e), (n.needsUpdate = !0)
      }
      const i = this.attributes.tangent
      return (
        void 0 !== i && (i.transformDirection(t), (i.needsUpdate = !0)),
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this
      )
    },
    rotateX: function (t) {
      return Le.makeRotationX(t), this.applyMatrix4(Le), this
    },
    rotateY: function (t) {
      return Le.makeRotationY(t), this.applyMatrix4(Le), this
    },
    rotateZ: function (t) {
      return Le.makeRotationZ(t), this.applyMatrix4(Le), this
    },
    translate: function (t, e, n) {
      return Le.makeTranslation(t, e, n), this.applyMatrix4(Le), this
    },
    scale: function (t, e, n) {
      return Le.makeScale(t, e, n), this.applyMatrix4(Le), this
    },
    lookAt: function (t) {
      return Ae.lookAt(t), Ae.updateMatrix(), this.applyMatrix4(Ae.matrix), this
    },
    center: function () {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(Re).negate(),
        this.translate(Re.x, Re.y, Re.z),
        this
      )
    },
    setFromPoints: function (t) {
      const e = []
      for (let n = 0, i = t.length; n < i; n++) {
        const i = t[n]
        e.push(i.x, i.y, i.z || 0)
      }
      return this.setAttribute('position', new Me(e, 3)), this
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new W())
      const t = this.attributes.position,
        e = this.morphAttributes.position
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingBox.set(new G(-1 / 0, -1 / 0, -1 / 0), new G(1 / 0, 1 / 0, 1 / 0))
        )
      if (void 0 !== t) {
        if ((this.boundingBox.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t]
            Pe.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (De.addVectors(this.boundingBox.min, Pe.min),
                  this.boundingBox.expandByPoint(De),
                  De.addVectors(this.boundingBox.max, Pe.max),
                  this.boundingBox.expandByPoint(De))
                : (this.boundingBox.expandByPoint(Pe.min), this.boundingBox.expandByPoint(Pe.max))
          }
      } else this.boundingBox.makeEmpty()
      ;(isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this
        )
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new at())
      const t = this.attributes.position,
        e = this.morphAttributes.position
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingSphere.set(new G(), 1 / 0)
        )
      if (t) {
        const n = this.boundingSphere.center
        if ((Pe.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t]
            Ce.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (De.addVectors(Pe.min, Ce.min),
                  Pe.expandByPoint(De),
                  De.addVectors(Pe.max, Ce.max),
                  Pe.expandByPoint(De))
                : (Pe.expandByPoint(Ce.min), Pe.expandByPoint(Ce.max))
          }
        Pe.getCenter(n)
        let i = 0
        for (let e = 0, r = t.count; e < r; e++)
          De.fromBufferAttribute(t, e), (i = Math.max(i, n.distanceToSquared(De)))
        if (e)
          for (let r = 0, s = e.length; r < s; r++) {
            const s = e[r],
              a = this.morphTargetsRelative
            for (let e = 0, r = s.count; e < r; e++)
              De.fromBufferAttribute(s, e),
                a && (Re.fromBufferAttribute(t, e), De.add(Re)),
                (i = Math.max(i, n.distanceToSquared(De)))
          }
        ;(this.boundingSphere.radius = Math.sqrt(i)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this
            )
      }
    },
    computeFaceNormals: function () {},
    computeTangents: function () {
      const t = this.index,
        e = this.attributes
      if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv)
        return void console.error(
          'THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)'
        )
      const n = t.array,
        i = e.position.array,
        r = e.normal.array,
        s = e.uv.array,
        a = i.length / 3
      void 0 === e.tangent && this.setAttribute('tangent', new fe(new Float32Array(4 * a), 4))
      const o = e.tangent.array,
        l = [],
        c = []
      for (let t = 0; t < a; t++) (l[t] = new G()), (c[t] = new G())
      const h = new G(),
        u = new G(),
        d = new G(),
        p = new C(),
        f = new C(),
        m = new C(),
        g = new G(),
        v = new G()
      function y(t, e, n) {
        h.fromArray(i, 3 * t),
          u.fromArray(i, 3 * e),
          d.fromArray(i, 3 * n),
          p.fromArray(s, 2 * t),
          f.fromArray(s, 2 * e),
          m.fromArray(s, 2 * n),
          u.sub(h),
          d.sub(h),
          f.sub(p),
          m.sub(p)
        const r = 1 / (f.x * m.y - m.x * f.y)
        isFinite(r) &&
          (g.copy(u).multiplyScalar(m.y).addScaledVector(d, -f.y).multiplyScalar(r),
          v.copy(d).multiplyScalar(f.x).addScaledVector(u, -m.x).multiplyScalar(r),
          l[t].add(g),
          l[e].add(g),
          l[n].add(g),
          c[t].add(v),
          c[e].add(v),
          c[n].add(v))
      }
      let x = this.groups
      0 === x.length && (x = [{ start: 0, count: n.length }])
      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
          i = e.start
        for (let t = i, r = i + e.count; t < r; t += 3) y(n[t + 0], n[t + 1], n[t + 2])
      }
      const _ = new G(),
        b = new G(),
        w = new G(),
        M = new G()
      function S(t) {
        w.fromArray(r, 3 * t), M.copy(w)
        const e = l[t]
        _.copy(e), _.sub(w.multiplyScalar(w.dot(e))).normalize(), b.crossVectors(M, e)
        const n = b.dot(c[t]) < 0 ? -1 : 1
        ;(o[4 * t] = _.x), (o[4 * t + 1] = _.y), (o[4 * t + 2] = _.z), (o[4 * t + 3] = n)
      }
      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
          i = e.start
        for (let t = i, r = i + e.count; t < r; t += 3) S(n[t + 0]), S(n[t + 1]), S(n[t + 2])
      }
    },
    computeVertexNormals: function () {
      const t = this.index,
        e = this.getAttribute('position')
      if (void 0 !== e) {
        let n = this.getAttribute('normal')
        if (void 0 === n)
          (n = new fe(new Float32Array(3 * e.count), 3)), this.setAttribute('normal', n)
        else for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0)
        const i = new G(),
          r = new G(),
          s = new G(),
          a = new G(),
          o = new G(),
          l = new G(),
          c = new G(),
          h = new G()
        if (t)
          for (let u = 0, d = t.count; u < d; u += 3) {
            const d = t.getX(u + 0),
              p = t.getX(u + 1),
              f = t.getX(u + 2)
            i.fromBufferAttribute(e, d),
              r.fromBufferAttribute(e, p),
              s.fromBufferAttribute(e, f),
              c.subVectors(s, r),
              h.subVectors(i, r),
              c.cross(h),
              a.fromBufferAttribute(n, d),
              o.fromBufferAttribute(n, p),
              l.fromBufferAttribute(n, f),
              a.add(c),
              o.add(c),
              l.add(c),
              n.setXYZ(d, a.x, a.y, a.z),
              n.setXYZ(p, o.x, o.y, o.z),
              n.setXYZ(f, l.x, l.y, l.z)
          }
        else
          for (let t = 0, a = e.count; t < a; t += 3)
            i.fromBufferAttribute(e, t + 0),
              r.fromBufferAttribute(e, t + 1),
              s.fromBufferAttribute(e, t + 2),
              c.subVectors(s, r),
              h.subVectors(i, r),
              c.cross(h),
              n.setXYZ(t + 0, c.x, c.y, c.z),
              n.setXYZ(t + 1, c.x, c.y, c.z),
              n.setXYZ(t + 2, c.x, c.y, c.z)
        this.normalizeNormals(), (n.needsUpdate = !0)
      }
    },
    merge: function (t, e) {
      if (!t || !t.isBufferGeometry)
        return void console.error(
          'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.',
          t
        )
      void 0 === e &&
        ((e = 0),
        console.warn(
          'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
        ))
      const n = this.attributes
      for (const i in n) {
        if (void 0 === t.attributes[i]) continue
        const r = n[i].array,
          s = t.attributes[i],
          a = s.array,
          o = s.itemSize * e,
          l = Math.min(a.length, r.length - o)
        for (let t = 0, e = o; t < l; t++, e++) r[e] = a[t]
      }
      return this
    },
    normalizeNormals: function () {
      const t = this.attributes.normal
      for (let e = 0, n = t.count; e < n; e++)
        De.fromBufferAttribute(t, e), De.normalize(), t.setXYZ(e, De.x, De.y, De.z)
    },
    toNonIndexed: function () {
      function t(t, e) {
        const n = t.array,
          i = t.itemSize,
          r = t.normalized,
          s = new n.constructor(e.length * i)
        let a = 0,
          o = 0
        for (let t = 0, r = e.length; t < r; t++) {
          a = e[t] * i
          for (let t = 0; t < i; t++) s[o++] = n[a++]
        }
        return new fe(s, i, r)
      }
      if (null === this.index)
        return (
          console.warn(
            'THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.'
          ),
          this
        )
      const e = new Ie(),
        n = this.index.array,
        i = this.attributes
      for (const r in i) {
        const s = t(i[r], n)
        e.setAttribute(r, s)
      }
      const r = this.morphAttributes
      for (const i in r) {
        const s = [],
          a = r[i]
        for (let e = 0, i = a.length; e < i; e++) {
          const i = t(a[e], n)
          s.push(i)
        }
        e.morphAttributes[i] = s
      }
      e.morphTargetsRelative = this.morphTargetsRelative
      const s = this.groups
      for (let t = 0, n = s.length; t < n; t++) {
        const n = s[t]
        e.addGroup(n.start, n.count, n.materialIndex)
      }
      return e
    },
    toJSON: function () {
      const t = {
        metadata: { version: 4.5, type: 'BufferGeometry', generator: 'BufferGeometry.toJSON' },
      }
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        '' !== this.name && (t.name = this.name),
        Object.keys(this.userData).length > 0 && (t.userData = this.userData),
        void 0 !== this.parameters)
      ) {
        const e = this.parameters
        for (const n in e) void 0 !== e[n] && (t[n] = e[n])
        return t
      }
      t.data = { attributes: {} }
      const e = this.index
      null !== e &&
        (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array),
        })
      const n = this.attributes
      for (const e in n) {
        const i = n[e],
          r = i.toJSON(t.data)
        '' !== i.name && (r.name = i.name), (t.data.attributes[e] = r)
      }
      const i = {}
      let r = !1
      for (const e in this.morphAttributes) {
        const n = this.morphAttributes[e],
          s = []
        for (let e = 0, i = n.length; e < i; e++) {
          const i = n[e],
            r = i.toJSON(t.data)
          '' !== i.name && (r.name = i.name), s.push(r)
        }
        s.length > 0 && ((i[e] = s), (r = !0))
      }
      r && ((t.data.morphAttributes = i), (t.data.morphTargetsRelative = this.morphTargetsRelative))
      const s = this.groups
      s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)))
      const a = this.boundingSphere
      return (
        null !== a && (t.data.boundingSphere = { center: a.center.toArray(), radius: a.radius }), t
      )
    },
    clone: function () {
      return new Ie().copy(this)
    },
    copy: function (t) {
      ;(this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null)
      const e = {}
      this.name = t.name
      const n = t.index
      null !== n && this.setIndex(n.clone(e))
      const i = t.attributes
      for (const t in i) {
        const n = i[t]
        this.setAttribute(t, n.clone(e))
      }
      const r = t.morphAttributes
      for (const t in r) {
        const n = [],
          i = r[t]
        for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e))
        this.morphAttributes[t] = n
      }
      this.morphTargetsRelative = t.morphTargetsRelative
      const s = t.groups
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t]
        this.addGroup(e.start, e.count, e.materialIndex)
      }
      const a = t.boundingBox
      null !== a && (this.boundingBox = a.clone())
      const o = t.boundingSphere
      return (
        null !== o && (this.boundingSphere = o.clone()),
        (this.drawRange.start = t.drawRange.start),
        (this.drawRange.count = t.drawRange.count),
        (this.userData = t.userData),
        this
      )
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  const Ne = new mt(),
    Oe = new ft(),
    ze = new at(),
    He = new G(),
    Be = new G(),
    Fe = new G(),
    Ue = new G(),
    Ge = new G(),
    ke = new G(),
    Ve = new G(),
    We = new G(),
    je = new G(),
    qe = new C(),
    Xe = new C(),
    Ye = new C(),
    Ze = new G(),
    Je = new G()
  function Qe(t = new Ie(), e = new ue()) {
    Ut.call(this),
      (this.type = 'Mesh'),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets()
  }
  function Ke(t, e, n, i, r, s, a, o, l, c, h, u) {
    He.fromBufferAttribute(r, c), Be.fromBufferAttribute(r, h), Fe.fromBufferAttribute(r, u)
    const d = t.morphTargetInfluences
    if (e.morphTargets && s && d) {
      Ve.set(0, 0, 0), We.set(0, 0, 0), je.set(0, 0, 0)
      for (let t = 0, e = s.length; t < e; t++) {
        const e = d[t],
          n = s[t]
        0 !== e &&
          (Ue.fromBufferAttribute(n, c),
          Ge.fromBufferAttribute(n, h),
          ke.fromBufferAttribute(n, u),
          a
            ? (Ve.addScaledVector(Ue, e), We.addScaledVector(Ge, e), je.addScaledVector(ke, e))
            : (Ve.addScaledVector(Ue.sub(He), e),
              We.addScaledVector(Ge.sub(Be), e),
              je.addScaledVector(ke.sub(Fe), e)))
      }
      He.add(Ve), Be.add(We), Fe.add(je)
    }
    t.isSkinnedMesh &&
      e.skinning &&
      (t.boneTransform(c, He), t.boneTransform(h, Be), t.boneTransform(u, Fe))
    const p = (function (t, e, n, i, r, s, a, o) {
      let l
      if (
        ((l =
          1 === e.side
            ? i.intersectTriangle(a, s, r, !0, o)
            : i.intersectTriangle(r, s, a, 2 !== e.side, o)),
        null === l)
      )
        return null
      Je.copy(o), Je.applyMatrix4(t.matrixWorld)
      const c = n.ray.origin.distanceTo(Je)
      return c < n.near || c > n.far ? null : { distance: c, point: Je.clone(), object: t }
    })(t, e, n, i, He, Be, Fe, Ze)
    if (p) {
      o &&
        (qe.fromBufferAttribute(o, c),
        Xe.fromBufferAttribute(o, h),
        Ye.fromBufferAttribute(o, u),
        (p.uv = ee.getUV(Ze, He, Be, Fe, qe, Xe, Ye, new C()))),
        l &&
          (qe.fromBufferAttribute(l, c),
          Xe.fromBufferAttribute(l, h),
          Ye.fromBufferAttribute(l, u),
          (p.uv2 = ee.getUV(Ze, He, Be, Fe, qe, Xe, Ye, new C())))
      const t = { a: c, b: h, c: u, normal: new G(), materialIndex: 0 }
      ee.getNormal(He, Be, Fe, t.normal), (p.face = t)
    }
    return p
  }
  Qe.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: Qe,
    isMesh: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        void 0 !== t.morphTargetInfluences &&
          (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
        void 0 !== t.morphTargetDictionary &&
          (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      )
    },
    updateMorphTargets: function () {
      const t = this.geometry
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e)
        if (n.length > 0) {
          const t = e[n[0]]
          if (void 0 !== t) {
            ;(this.morphTargetInfluences = []), (this.morphTargetDictionary = {})
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e)
              this.morphTargetInfluences.push(0), (this.morphTargetDictionary[n] = e)
            }
          }
        }
      } else {
        const e = t.morphTargets
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            'THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
      }
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.material,
        r = this.matrixWorld
      if (void 0 === i) return
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        ze.copy(n.boundingSphere),
        ze.applyMatrix4(r),
        !1 === t.ray.intersectsSphere(ze))
      )
        return
      if (
        (Ne.copy(r).invert(),
        Oe.copy(t.ray).applyMatrix4(Ne),
        null !== n.boundingBox && !1 === Oe.intersectsBox(n.boundingBox))
      )
        return
      let s
      if (n.isBufferGeometry) {
        const r = n.index,
          a = n.attributes.position,
          o = n.morphAttributes.position,
          l = n.morphTargetsRelative,
          c = n.attributes.uv,
          h = n.attributes.uv2,
          u = n.groups,
          d = n.drawRange
        if (null !== r)
          if (Array.isArray(i))
            for (let n = 0, p = u.length; n < p; n++) {
              const p = u[n],
                f = i[p.materialIndex]
              for (
                let n = Math.max(p.start, d.start),
                  i = Math.min(p.start + p.count, d.start + d.count);
                n < i;
                n += 3
              ) {
                const i = r.getX(n),
                  u = r.getX(n + 1),
                  d = r.getX(n + 2)
                ;(s = Ke(this, f, t, Oe, a, o, l, c, h, i, u, d)),
                  s &&
                    ((s.faceIndex = Math.floor(n / 3)),
                    (s.face.materialIndex = p.materialIndex),
                    e.push(s))
              }
            }
          else
            for (
              let n = Math.max(0, d.start), u = Math.min(r.count, d.start + d.count);
              n < u;
              n += 3
            ) {
              const u = r.getX(n),
                d = r.getX(n + 1),
                p = r.getX(n + 2)
              ;(s = Ke(this, i, t, Oe, a, o, l, c, h, u, d, p)),
                s && ((s.faceIndex = Math.floor(n / 3)), e.push(s))
            }
        else if (void 0 !== a)
          if (Array.isArray(i))
            for (let n = 0, r = u.length; n < r; n++) {
              const r = u[n],
                p = i[r.materialIndex]
              for (
                let n = Math.max(r.start, d.start),
                  i = Math.min(r.start + r.count, d.start + d.count);
                n < i;
                n += 3
              )
                (s = Ke(this, p, t, Oe, a, o, l, c, h, n, n + 1, n + 2)),
                  s &&
                    ((s.faceIndex = Math.floor(n / 3)),
                    (s.face.materialIndex = r.materialIndex),
                    e.push(s))
            }
          else
            for (
              let n = Math.max(0, d.start), r = Math.min(a.count, d.start + d.count);
              n < r;
              n += 3
            )
              (s = Ke(this, i, t, Oe, a, o, l, c, h, n, n + 1, n + 2)),
                s && ((s.faceIndex = Math.floor(n / 3)), e.push(s))
      } else
        n.isGeometry &&
          console.error(
            'THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
    },
  })
  class $e extends Ie {
    constructor(t = 1, e = 1, n = 1, i = 1, r = 1, s = 1) {
      super(),
        (this.type = 'BoxGeometry'),
        (this.parameters = {
          width: t,
          height: e,
          depth: n,
          widthSegments: i,
          heightSegments: r,
          depthSegments: s,
        })
      const a = this
      ;(i = Math.floor(i)), (r = Math.floor(r)), (s = Math.floor(s))
      const o = [],
        l = [],
        c = [],
        h = []
      let u = 0,
        d = 0
      function p(t, e, n, i, r, s, p, f, m, g, v) {
        const y = s / m,
          x = p / g,
          _ = s / 2,
          b = p / 2,
          w = f / 2,
          M = m + 1,
          S = g + 1
        let E = 0,
          T = 0
        const L = new G()
        for (let s = 0; s < S; s++) {
          const a = s * x - b
          for (let o = 0; o < M; o++) {
            const u = o * y - _
            ;(L[t] = u * i),
              (L[e] = a * r),
              (L[n] = w),
              l.push(L.x, L.y, L.z),
              (L[t] = 0),
              (L[e] = 0),
              (L[n] = f > 0 ? 1 : -1),
              c.push(L.x, L.y, L.z),
              h.push(o / m),
              h.push(1 - s / g),
              (E += 1)
          }
        }
        for (let t = 0; t < g; t++)
          for (let e = 0; e < m; e++) {
            const n = u + e + M * t,
              i = u + e + M * (t + 1),
              r = u + (e + 1) + M * (t + 1),
              s = u + (e + 1) + M * t
            o.push(n, i, s), o.push(i, r, s), (T += 6)
          }
        a.addGroup(d, T, v), (d += T), (u += E)
      }
      p('z', 'y', 'x', -1, -1, n, e, t, s, r, 0),
        p('z', 'y', 'x', 1, -1, n, e, -t, s, r, 1),
        p('x', 'z', 'y', 1, 1, t, n, e, i, s, 2),
        p('x', 'z', 'y', 1, -1, t, n, -e, i, s, 3),
        p('x', 'y', 'z', 1, -1, t, e, n, i, r, 4),
        p('x', 'y', 'z', -1, -1, t, e, -n, i, r, 5),
        this.setIndex(o),
        this.setAttribute('position', new Me(l, 3)),
        this.setAttribute('normal', new Me(c, 3)),
        this.setAttribute('uv', new Me(h, 2))
    }
  }
  function tn(t) {
    const e = {}
    for (const n in t) {
      e[n] = {}
      for (const i in t[n]) {
        const r = t[n][i]
        r &&
        (r.isColor ||
          r.isMatrix3 ||
          r.isMatrix4 ||
          r.isVector2 ||
          r.isVector3 ||
          r.isVector4 ||
          r.isTexture ||
          r.isQuaternion)
          ? (e[n][i] = r.clone())
          : Array.isArray(r)
          ? (e[n][i] = r.slice())
          : (e[n][i] = r)
      }
    }
    return e
  }
  function en(t) {
    const e = {}
    for (let n = 0; n < t.length; n++) {
      const i = tn(t[n])
      for (const t in i) e[t] = i[t]
    }
    return e
  }
  const nn = { clone: tn, merge: en }
  function rn(t) {
    ie.call(this),
      (this.type = 'ShaderMaterial'),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.vertexShader =
        'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}'),
      (this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}'),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      void 0 !== t &&
        (void 0 !== t.attributes &&
          console.error(
            'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.'
          ),
        this.setValues(t))
  }
  function sn() {
    Ut.call(this),
      (this.type = 'Camera'),
      (this.matrixWorldInverse = new mt()),
      (this.projectionMatrix = new mt()),
      (this.projectionMatrixInverse = new mt())
  }
  function an(t = 50, e = 1, n = 0.1, i = 2e3) {
    sn.call(this),
      (this.type = 'PerspectiveCamera'),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = n),
      (this.far = i),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix()
  }
  ;(rn.prototype = Object.create(ie.prototype)),
    (rn.prototype.constructor = rn),
    (rn.prototype.isShaderMaterial = !0),
    (rn.prototype.copy = function (t) {
      return (
        ie.prototype.copy.call(this, t),
        (this.fragmentShader = t.fragmentShader),
        (this.vertexShader = t.vertexShader),
        (this.uniforms = tn(t.uniforms)),
        (this.defines = Object.assign({}, t.defines)),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.lights = t.lights),
        (this.clipping = t.clipping),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.extensions = Object.assign({}, t.extensions)),
        (this.glslVersion = t.glslVersion),
        this
      )
    }),
    (rn.prototype.toJSON = function (t) {
      const e = ie.prototype.toJSON.call(this, t)
      ;(e.glslVersion = this.glslVersion), (e.uniforms = {})
      for (const n in this.uniforms) {
        const i = this.uniforms[n].value
        i && i.isTexture
          ? (e.uniforms[n] = { type: 't', value: i.toJSON(t).uuid })
          : i && i.isColor
          ? (e.uniforms[n] = { type: 'c', value: i.getHex() })
          : i && i.isVector2
          ? (e.uniforms[n] = { type: 'v2', value: i.toArray() })
          : i && i.isVector3
          ? (e.uniforms[n] = { type: 'v3', value: i.toArray() })
          : i && i.isVector4
          ? (e.uniforms[n] = { type: 'v4', value: i.toArray() })
          : i && i.isMatrix3
          ? (e.uniforms[n] = { type: 'm3', value: i.toArray() })
          : i && i.isMatrix4
          ? (e.uniforms[n] = { type: 'm4', value: i.toArray() })
          : (e.uniforms[n] = { value: i })
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines),
        (e.vertexShader = this.vertexShader),
        (e.fragmentShader = this.fragmentShader)
      const n = {}
      for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0)
      return Object.keys(n).length > 0 && (e.extensions = n), e
    }),
    (sn.prototype = Object.assign(Object.create(Ut.prototype), {
      constructor: sn,
      isCamera: !0,
      copy: function (t, e) {
        return (
          Ut.prototype.copy.call(this, t, e),
          this.matrixWorldInverse.copy(t.matrixWorldInverse),
          this.projectionMatrix.copy(t.projectionMatrix),
          this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
          this
        )
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn('THREE.Camera: .getWorldDirection() target is now required'),
          (t = new G())),
          this.updateWorldMatrix(!0, !1)
        const e = this.matrixWorld.elements
        return t.set(-e[8], -e[9], -e[10]).normalize()
      },
      updateMatrixWorld: function (t) {
        Ut.prototype.updateMatrixWorld.call(this, t),
          this.matrixWorldInverse.copy(this.matrixWorld).invert()
      },
      updateWorldMatrix: function (t, e) {
        Ut.prototype.updateWorldMatrix.call(this, t, e),
          this.matrixWorldInverse.copy(this.matrixWorld).invert()
      },
      clone: function () {
        return new this.constructor().copy(this)
      },
    })),
    (an.prototype = Object.assign(Object.create(sn.prototype), {
      constructor: an,
      isPerspectiveCamera: !0,
      copy: function (t, e) {
        return (
          sn.prototype.copy.call(this, t, e),
          (this.fov = t.fov),
          (this.zoom = t.zoom),
          (this.near = t.near),
          (this.far = t.far),
          (this.focus = t.focus),
          (this.aspect = t.aspect),
          (this.view = null === t.view ? null : Object.assign({}, t.view)),
          (this.filmGauge = t.filmGauge),
          (this.filmOffset = t.filmOffset),
          this
        )
      },
      setFocalLength: function (t) {
        const e = (0.5 * this.getFilmHeight()) / t
        ;(this.fov = 2 * P.RAD2DEG * Math.atan(e)), this.updateProjectionMatrix()
      },
      getFocalLength: function () {
        const t = Math.tan(0.5 * P.DEG2RAD * this.fov)
        return (0.5 * this.getFilmHeight()) / t
      },
      getEffectiveFOV: function () {
        return 2 * P.RAD2DEG * Math.atan(Math.tan(0.5 * P.DEG2RAD * this.fov) / this.zoom)
      },
      getFilmWidth: function () {
        return this.filmGauge * Math.min(this.aspect, 1)
      },
      getFilmHeight: function () {
        return this.filmGauge / Math.max(this.aspect, 1)
      },
      setViewOffset: function (t, e, n, i, r, s) {
        ;(this.aspect = t / e),
          null === this.view &&
            (this.view = {
              enabled: !0,
              fullWidth: 1,
              fullHeight: 1,
              offsetX: 0,
              offsetY: 0,
              width: 1,
              height: 1,
            }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = n),
          (this.view.offsetY = i),
          (this.view.width = r),
          (this.view.height = s),
          this.updateProjectionMatrix()
      },
      clearViewOffset: function () {
        null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
      },
      updateProjectionMatrix: function () {
        const t = this.near
        let e = (t * Math.tan(0.5 * P.DEG2RAD * this.fov)) / this.zoom,
          n = 2 * e,
          i = this.aspect * n,
          r = -0.5 * i
        const s = this.view
        if (null !== this.view && this.view.enabled) {
          const t = s.fullWidth,
            a = s.fullHeight
          ;(r += (s.offsetX * i) / t),
            (e -= (s.offsetY * n) / a),
            (i *= s.width / t),
            (n *= s.height / a)
        }
        const a = this.filmOffset
        0 !== a && (r += (t * a) / this.getFilmWidth()),
          this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
      },
      toJSON: function (t) {
        const e = Ut.prototype.toJSON.call(this, t)
        return (
          (e.object.fov = this.fov),
          (e.object.zoom = this.zoom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          (e.object.focus = this.focus),
          (e.object.aspect = this.aspect),
          null !== this.view && (e.object.view = Object.assign({}, this.view)),
          (e.object.filmGauge = this.filmGauge),
          (e.object.filmOffset = this.filmOffset),
          e
        )
      },
    }))
  const on = 90
  class ln extends Ut {
    constructor(t, e, n) {
      if ((super(), (this.type = 'CubeCamera'), !0 !== n.isWebGLCubeRenderTarget))
        return void console.error(
          'THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.'
        )
      this.renderTarget = n
      const i = new an(on, 1, t, e)
      ;(i.layers = this.layers), i.up.set(0, -1, 0), i.lookAt(new G(1, 0, 0)), this.add(i)
      const r = new an(on, 1, t, e)
      ;(r.layers = this.layers), r.up.set(0, -1, 0), r.lookAt(new G(-1, 0, 0)), this.add(r)
      const s = new an(on, 1, t, e)
      ;(s.layers = this.layers), s.up.set(0, 0, 1), s.lookAt(new G(0, 1, 0)), this.add(s)
      const a = new an(on, 1, t, e)
      ;(a.layers = this.layers), a.up.set(0, 0, -1), a.lookAt(new G(0, -1, 0)), this.add(a)
      const o = new an(on, 1, t, e)
      ;(o.layers = this.layers), o.up.set(0, -1, 0), o.lookAt(new G(0, 0, 1)), this.add(o)
      const l = new an(on, 1, t, e)
      ;(l.layers = this.layers), l.up.set(0, -1, 0), l.lookAt(new G(0, 0, -1)), this.add(l)
    }
    update(t, e) {
      null === this.parent && this.updateMatrixWorld()
      const n = this.renderTarget,
        [i, r, s, a, o, l] = this.children,
        c = t.xr.enabled,
        h = t.getRenderTarget()
      t.xr.enabled = !1
      const u = n.texture.generateMipmaps
      ;(n.texture.generateMipmaps = !1),
        t.setRenderTarget(n, 0),
        t.render(e, i),
        t.setRenderTarget(n, 1),
        t.render(e, r),
        t.setRenderTarget(n, 2),
        t.render(e, s),
        t.setRenderTarget(n, 3),
        t.render(e, a),
        t.setRenderTarget(n, 4),
        t.render(e, o),
        (n.texture.generateMipmaps = u),
        t.setRenderTarget(n, 5),
        t.render(e, l),
        t.setRenderTarget(h),
        (t.xr.enabled = c)
    }
  }
  class cn extends z {
    constructor(t, e, n, i, r, s, a, o, l, c) {
      super(
        (t = void 0 !== t ? t : []),
        (e = void 0 !== e ? e : 301),
        n,
        i,
        r,
        s,
        (a = void 0 !== a ? a : d),
        o,
        l,
        c
      ),
        (this._needsFlipEnvMap = !0),
        (this.flipY = !1)
    }
    get images() {
      return this.image
    }
    set images(t) {
      this.image = t
    }
  }
  cn.prototype.isCubeTexture = !0
  class hn extends F {
    constructor(t, e, n) {
      Number.isInteger(e) &&
        (console.warn(
          'THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )'
        ),
        (e = n)),
        super(t, t, e),
        (e = e || {}),
        (this.texture = new cn(
          void 0,
          e.mapping,
          e.wrapS,
          e.wrapT,
          e.magFilter,
          e.minFilter,
          e.format,
          e.type,
          e.anisotropy,
          e.encoding
        )),
        (this.texture.generateMipmaps = void 0 !== e.generateMipmaps && e.generateMipmaps),
        (this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : s),
        (this.texture._needsFlipEnvMap = !1)
    }
    fromEquirectangularTexture(t, e) {
      ;(this.texture.type = e.type),
        (this.texture.format = p),
        (this.texture.encoding = e.encoding),
        (this.texture.generateMipmaps = e.generateMipmaps),
        (this.texture.minFilter = e.minFilter),
        (this.texture.magFilter = e.magFilter)
      const n = { tEquirect: { value: null } },
        i =
          '\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t',
        r =
          '\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t',
        o = new $e(5, 5, 5),
        l = new rn({
          name: 'CubemapFromEquirect',
          uniforms: tn(n),
          vertexShader: i,
          fragmentShader: r,
          side: 1,
          blending: 0,
        })
      l.uniforms.tEquirect.value = e
      const c = new Qe(o, l),
        h = e.minFilter
      return (
        e.minFilter === a && (e.minFilter = s),
        new ln(1, 10, this).update(t, c),
        (e.minFilter = h),
        c.geometry.dispose(),
        c.material.dispose(),
        this
      )
    }
    clear(t, e, n, i) {
      const r = t.getRenderTarget()
      for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i)
      t.setRenderTarget(r)
    }
  }
  hn.prototype.isWebGLCubeRenderTarget = !0
  class un extends z {
    constructor(t, e, n, i, s, a, o, l, c, h, u, d) {
      super(null, a, o, l, c, h, i, s, u, d),
        (this.image = { data: t || null, width: e || 1, height: n || 1 }),
        (this.magFilter = void 0 !== c ? c : r),
        (this.minFilter = void 0 !== h ? h : r),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1),
        (this.needsUpdate = !0)
    }
  }
  un.prototype.isDataTexture = !0
  const dn = new at(),
    pn = new G()
  class fn {
    constructor(
      t = new Wt(),
      e = new Wt(),
      n = new Wt(),
      i = new Wt(),
      r = new Wt(),
      s = new Wt()
    ) {
      this.planes = [t, e, n, i, r, s]
    }
    set(t, e, n, i, r, s) {
      const a = this.planes
      return (
        a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(s), this
      )
    }
    copy(t) {
      const e = this.planes
      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n])
      return this
    }
    setFromProjectionMatrix(t) {
      const e = this.planes,
        n = t.elements,
        i = n[0],
        r = n[1],
        s = n[2],
        a = n[3],
        o = n[4],
        l = n[5],
        c = n[6],
        h = n[7],
        u = n[8],
        d = n[9],
        p = n[10],
        f = n[11],
        m = n[12],
        g = n[13],
        v = n[14],
        y = n[15]
      return (
        e[0].setComponents(a - i, h - o, f - u, y - m).normalize(),
        e[1].setComponents(a + i, h + o, f + u, y + m).normalize(),
        e[2].setComponents(a + r, h + l, f + d, y + g).normalize(),
        e[3].setComponents(a - r, h - l, f - d, y - g).normalize(),
        e[4].setComponents(a - s, h - c, f - p, y - v).normalize(),
        e[5].setComponents(a + s, h + c, f + p, y + v).normalize(),
        this
      )
    }
    intersectsObject(t) {
      const e = t.geometry
      return (
        null === e.boundingSphere && e.computeBoundingSphere(),
        dn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),
        this.intersectsSphere(dn)
      )
    }
    intersectsSprite(t) {
      return (
        dn.center.set(0, 0, 0),
        (dn.radius = 0.7071067811865476),
        dn.applyMatrix4(t.matrixWorld),
        this.intersectsSphere(dn)
      )
    }
    intersectsSphere(t) {
      const e = this.planes,
        n = t.center,
        i = -t.radius
      for (let t = 0; t < 6; t++) if (e[t].distanceToPoint(n) < i) return !1
      return !0
    }
    intersectsBox(t) {
      const e = this.planes
      for (let n = 0; n < 6; n++) {
        const i = e[n]
        if (
          ((pn.x = i.normal.x > 0 ? t.max.x : t.min.x),
          (pn.y = i.normal.y > 0 ? t.max.y : t.min.y),
          (pn.z = i.normal.z > 0 ? t.max.z : t.min.z),
          i.distanceToPoint(pn) < 0)
        )
          return !1
      }
      return !0
    }
    containsPoint(t) {
      const e = this.planes
      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1
      return !0
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }
  function mn() {
    let t = null,
      e = !1,
      n = null,
      i = null
    function r(e, s) {
      n(e, s), (i = t.requestAnimationFrame(r))
    }
    return {
      start: function () {
        !0 !== e && null !== n && ((i = t.requestAnimationFrame(r)), (e = !0))
      },
      stop: function () {
        t.cancelAnimationFrame(i), (e = !1)
      },
      setAnimationLoop: function (t) {
        n = t
      },
      setContext: function (e) {
        t = e
      },
    }
  }
  function gn(t, e) {
    const n = e.isWebGL2,
      i = new WeakMap()
    return {
      get: function (t) {
        return t.isInterleavedBufferAttribute && (t = t.data), i.get(t)
      },
      remove: function (e) {
        e.isInterleavedBufferAttribute && (e = e.data)
        const n = i.get(e)
        n && (t.deleteBuffer(n.buffer), i.delete(e))
      },
      update: function (e, r) {
        if (e.isGLBufferAttribute) {
          const t = i.get(e)
          return void (
            (!t || t.version < e.version) &&
            i.set(e, {
              buffer: e.buffer,
              type: e.type,
              bytesPerElement: e.elementSize,
              version: e.version,
            })
          )
        }
        e.isInterleavedBufferAttribute && (e = e.data)
        const s = i.get(e)
        void 0 === s
          ? i.set(
              e,
              (function (e, i) {
                const r = e.array,
                  s = e.usage,
                  a = t.createBuffer()
                t.bindBuffer(i, a), t.bufferData(i, r, s), e.onUploadCallback()
                let o = 5126
                return (
                  r instanceof Float32Array
                    ? (o = 5126)
                    : r instanceof Float64Array
                    ? console.warn(
                        'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.'
                      )
                    : r instanceof Uint16Array
                    ? e.isFloat16BufferAttribute
                      ? n
                        ? (o = 5131)
                        : console.warn(
                            'THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.'
                          )
                      : (o = 5123)
                    : r instanceof Int16Array
                    ? (o = 5122)
                    : r instanceof Uint32Array
                    ? (o = 5125)
                    : r instanceof Int32Array
                    ? (o = 5124)
                    : r instanceof Int8Array
                    ? (o = 5120)
                    : r instanceof Uint8Array && (o = 5121),
                  { buffer: a, type: o, bytesPerElement: r.BYTES_PER_ELEMENT, version: e.version }
                )
              })(e, r)
            )
          : s.version < e.version &&
            ((function (e, i, r) {
              const s = i.array,
                a = i.updateRange
              t.bindBuffer(r, e),
                -1 === a.count
                  ? t.bufferSubData(r, 0, s)
                  : (n
                      ? t.bufferSubData(r, a.offset * s.BYTES_PER_ELEMENT, s, a.offset, a.count)
                      : t.bufferSubData(
                          r,
                          a.offset * s.BYTES_PER_ELEMENT,
                          s.subarray(a.offset, a.offset + a.count)
                        ),
                    (a.count = -1))
            })(s.buffer, e, r),
            (s.version = e.version))
      },
    }
  }
  class vn extends Ie {
    constructor(t = 1, e = 1, n = 1, i = 1) {
      super(),
        (this.type = 'PlaneGeometry'),
        (this.parameters = { width: t, height: e, widthSegments: n, heightSegments: i })
      const r = t / 2,
        s = e / 2,
        a = Math.floor(n),
        o = Math.floor(i),
        l = a + 1,
        c = o + 1,
        h = t / a,
        u = e / o,
        d = [],
        p = [],
        f = [],
        m = []
      for (let t = 0; t < c; t++) {
        const e = t * u - s
        for (let n = 0; n < l; n++) {
          const i = n * h - r
          p.push(i, -e, 0), f.push(0, 0, 1), m.push(n / a), m.push(1 - t / o)
        }
      }
      for (let t = 0; t < o; t++)
        for (let e = 0; e < a; e++) {
          const n = e + l * t,
            i = e + l * (t + 1),
            r = e + 1 + l * (t + 1),
            s = e + 1 + l * t
          d.push(n, i, s), d.push(i, r, s)
        }
      this.setIndex(d),
        this.setAttribute('position', new Me(p, 3)),
        this.setAttribute('normal', new Me(f, 3)),
        this.setAttribute('uv', new Me(m, 2))
    }
  }
  const yn = {
      alphamap_fragment:
        '#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif',
      alphamap_pars_fragment: '#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
      alphatest_fragment: '#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif',
      aomap_fragment:
        '#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif',
      aomap_pars_fragment:
        '#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif',
      begin_vertex: 'vec3 transformed = vec3( position );',
      beginnormal_vertex:
        'vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif',
      bsdfs:
        'vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif',
      bumpmap_pars_fragment:
        '#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif',
      clipping_planes_fragment:
        '#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif',
      clipping_planes_pars_fragment:
        '#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif',
      clipping_planes_pars_vertex:
        '#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif',
      clipping_planes_vertex:
        '#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif',
      color_fragment: '#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif',
      color_pars_fragment: '#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif',
      color_pars_vertex:
        '#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif',
      color_vertex:
        '#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz *= color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif',
      common:
        '#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}',
      cube_uv_reflection_fragment:
        '#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif',
      defaultnormal_vertex:
        'vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif',
      displacementmap_pars_vertex:
        '#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif',
      displacementmap_vertex:
        '#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif',
      emissivemap_fragment:
        '#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif',
      emissivemap_pars_fragment: '#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif',
      encodings_fragment: 'gl_FragColor = linearToOutputTexel( gl_FragColor );',
      encodings_pars_fragment:
        '\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}',
      envmap_fragment:
        '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif',
      envmap_common_pars_fragment:
        '#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif',
      envmap_pars_fragment:
        '#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif',
      envmap_pars_vertex:
        '#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif',
      envmap_physical_pars_fragment:
        '#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif',
      envmap_vertex:
        '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif',
      fog_vertex: '#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif',
      fog_pars_vertex: '#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif',
      fog_fragment:
        '#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif',
      fog_pars_fragment:
        '#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif',
      gradientmap_pars_fragment:
        '#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}',
      lightmap_fragment:
        '#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif',
      lightmap_pars_fragment:
        '#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif',
      lights_lambert_vertex:
        'vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif',
      lights_pars_begin:
        'uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif',
      lights_toon_fragment: 'ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;',
      lights_toon_pars_fragment:
        'varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)',
      lights_phong_fragment:
        'BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;',
      lights_phong_pars_fragment:
        'varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)',
      lights_physical_fragment:
        'PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif',
      lights_physical_pars_fragment:
        'struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}',
      lights_fragment_begin:
        '\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif',
      lights_fragment_maps:
        '#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif',
      lights_fragment_end:
        '#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif',
      logdepthbuf_fragment:
        '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif',
      logdepthbuf_pars_fragment:
        '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif',
      logdepthbuf_pars_vertex:
        '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif',
      logdepthbuf_vertex:
        '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif',
      map_fragment:
        '#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif',
      map_pars_fragment: '#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif',
      map_particle_fragment:
        '#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif',
      map_particle_pars_fragment:
        '#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
      metalnessmap_fragment:
        'float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif',
      metalnessmap_pars_fragment:
        '#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif',
      morphnormal_vertex:
        '#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif',
      morphtarget_pars_vertex:
        '#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif',
      morphtarget_vertex:
        '#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif',
      normal_fragment_begin:
        'float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;',
      normal_fragment_maps:
        '#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif',
      normalmap_pars_fragment:
        '#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif',
      clearcoat_normal_fragment_begin:
        '#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif',
      clearcoat_normal_fragment_maps:
        '#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif',
      clearcoat_pars_fragment:
        '#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif',
      packing:
        'vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}',
      premultiplied_alpha_fragment:
        '#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif',
      project_vertex:
        'vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;',
      dithering_fragment:
        '#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif',
      dithering_pars_fragment:
        '#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif',
      roughnessmap_fragment:
        'float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif',
      roughnessmap_pars_fragment:
        '#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif',
      shadowmap_pars_fragment:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif',
      shadowmap_pars_vertex:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif',
      shadowmap_vertex:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif',
      shadowmask_pars_fragment:
        'float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}',
      skinbase_vertex:
        '#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif',
      skinning_pars_vertex:
        '#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif',
      skinning_vertex:
        '#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif',
      skinnormal_vertex:
        '#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif',
      specularmap_fragment:
        'float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif',
      specularmap_pars_fragment: '#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif',
      tonemapping_fragment:
        '#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif',
      tonemapping_pars_fragment:
        '#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }',
      transmissionmap_fragment:
        '#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif',
      transmissionmap_pars_fragment:
        '#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif',
      uv_pars_fragment:
        '#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif',
      uv_pars_vertex:
        '#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif',
      uv_vertex: '#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif',
      uv2_pars_fragment:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif',
      uv2_pars_vertex:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif',
      uv2_vertex:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif',
      worldpos_vertex:
        '#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif',
      background_frag:
        'uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      background_vert:
        'varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}',
      cube_frag:
        '#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      cube_vert:
        'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}',
      depth_frag:
        '#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}',
      depth_vert:
        '#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}',
      distanceRGBA_frag:
        '#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}',
      distanceRGBA_vert:
        '#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}',
      equirect_frag:
        'uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      equirect_vert:
        'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}',
      linedashed_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}',
      linedashed_vert:
        'uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
      meshbasic_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshbasic_vert:
        '#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}',
      meshlambert_frag:
        'uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshlambert_vert:
        '#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      meshmatcap_frag:
        '#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshmatcap_vert:
        '#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}',
      meshtoon_frag:
        '#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshtoon_vert:
        '#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      meshphong_frag:
        '#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshphong_vert:
        '#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      meshphysical_frag:
        '#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshphysical_vert:
        '#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      normal_frag:
        '#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}',
      normal_vert:
        '#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}',
      points_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}',
      points_vert:
        'uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}',
      shadow_frag:
        'uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      shadow_vert:
        '#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      sprite_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      sprite_vert:
        'uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
    },
    xn = {
      common: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        map: { value: null },
        uvTransform: { value: new D() },
        uv2Transform: { value: new D() },
        alphaMap: { value: null },
      },
      specularmap: { specularMap: { value: null } },
      envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1 },
        refractionRatio: { value: 0.98 },
        maxMipLevel: { value: 0 },
      },
      aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
      lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
      emissivemap: { emissiveMap: { value: null } },
      bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
      normalmap: { normalMap: { value: null }, normalScale: { value: new C(1, 1) } },
      displacementmap: {
        displacementMap: { value: null },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      roughnessmap: { roughnessMap: { value: null } },
      metalnessmap: { metalnessMap: { value: null } },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 25e-5 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new he(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        directionalLights: { value: [], properties: { direction: {}, color: {} } },
        directionalLightShadows: {
          value: [],
          properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
        },
        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            direction: {},
            distance: {},
            coneCos: {},
            penumbraCos: {},
            decay: {},
          },
        },
        spotLightShadows: {
          value: [],
          properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
        },
        spotShadowMap: { value: [] },
        spotShadowMatrix: { value: [] },
        pointLights: {
          value: [],
          properties: { color: {}, position: {}, decay: {}, distance: {} },
        },
        pointLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },
        hemisphereLights: {
          value: [],
          properties: { direction: {}, skyColor: {}, groundColor: {} },
        },
        rectAreaLights: {
          value: [],
          properties: { color: {}, position: {}, width: {}, height: {} },
        },
        ltc_1: { value: null },
        ltc_2: { value: null },
      },
      points: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new D() },
      },
      sprite: {
        diffuse: { value: new he(15658734) },
        opacity: { value: 1 },
        center: { value: new C(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new D() },
      },
    },
    _n = {
      basic: {
        uniforms: en([xn.common, xn.specularmap, xn.envmap, xn.aomap, xn.lightmap, xn.fog]),
        vertexShader: yn.meshbasic_vert,
        fragmentShader: yn.meshbasic_frag,
      },
      lambert: {
        uniforms: en([
          xn.common,
          xn.specularmap,
          xn.envmap,
          xn.aomap,
          xn.lightmap,
          xn.emissivemap,
          xn.fog,
          xn.lights,
          { emissive: { value: new he(0) } },
        ]),
        vertexShader: yn.meshlambert_vert,
        fragmentShader: yn.meshlambert_frag,
      },
      phong: {
        uniforms: en([
          xn.common,
          xn.specularmap,
          xn.envmap,
          xn.aomap,
          xn.lightmap,
          xn.emissivemap,
          xn.bumpmap,
          xn.normalmap,
          xn.displacementmap,
          xn.fog,
          xn.lights,
          {
            emissive: { value: new he(0) },
            specular: { value: new he(1118481) },
            shininess: { value: 30 },
          },
        ]),
        vertexShader: yn.meshphong_vert,
        fragmentShader: yn.meshphong_frag,
      },
      standard: {
        uniforms: en([
          xn.common,
          xn.envmap,
          xn.aomap,
          xn.lightmap,
          xn.emissivemap,
          xn.bumpmap,
          xn.normalmap,
          xn.displacementmap,
          xn.roughnessmap,
          xn.metalnessmap,
          xn.fog,
          xn.lights,
          {
            emissive: { value: new he(0) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: yn.meshphysical_vert,
        fragmentShader: yn.meshphysical_frag,
      },
      toon: {
        uniforms: en([
          xn.common,
          xn.aomap,
          xn.lightmap,
          xn.emissivemap,
          xn.bumpmap,
          xn.normalmap,
          xn.displacementmap,
          xn.gradientmap,
          xn.fog,
          xn.lights,
          { emissive: { value: new he(0) } },
        ]),
        vertexShader: yn.meshtoon_vert,
        fragmentShader: yn.meshtoon_frag,
      },
      matcap: {
        uniforms: en([
          xn.common,
          xn.bumpmap,
          xn.normalmap,
          xn.displacementmap,
          xn.fog,
          { matcap: { value: null } },
        ]),
        vertexShader: yn.meshmatcap_vert,
        fragmentShader: yn.meshmatcap_frag,
      },
      points: {
        uniforms: en([xn.points, xn.fog]),
        vertexShader: yn.points_vert,
        fragmentShader: yn.points_frag,
      },
      dashed: {
        uniforms: en([
          xn.common,
          xn.fog,
          { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } },
        ]),
        vertexShader: yn.linedashed_vert,
        fragmentShader: yn.linedashed_frag,
      },
      depth: {
        uniforms: en([xn.common, xn.displacementmap]),
        vertexShader: yn.depth_vert,
        fragmentShader: yn.depth_frag,
      },
      normal: {
        uniforms: en([
          xn.common,
          xn.bumpmap,
          xn.normalmap,
          xn.displacementmap,
          { opacity: { value: 1 } },
        ]),
        vertexShader: yn.normal_vert,
        fragmentShader: yn.normal_frag,
      },
      sprite: {
        uniforms: en([xn.sprite, xn.fog]),
        vertexShader: yn.sprite_vert,
        fragmentShader: yn.sprite_frag,
      },
      background: {
        uniforms: { uvTransform: { value: new D() }, t2D: { value: null } },
        vertexShader: yn.background_vert,
        fragmentShader: yn.background_frag,
      },
      cube: {
        uniforms: en([xn.envmap, { opacity: { value: 1 } }]),
        vertexShader: yn.cube_vert,
        fragmentShader: yn.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: yn.equirect_vert,
        fragmentShader: yn.equirect_frag,
      },
      distanceRGBA: {
        uniforms: en([
          xn.common,
          xn.displacementmap,
          {
            referencePosition: { value: new G() },
            nearDistance: { value: 1 },
            farDistance: { value: 1e3 },
          },
        ]),
        vertexShader: yn.distanceRGBA_vert,
        fragmentShader: yn.distanceRGBA_frag,
      },
      shadow: {
        uniforms: en([xn.lights, xn.fog, { color: { value: new he(0) }, opacity: { value: 1 } }]),
        vertexShader: yn.shadow_vert,
        fragmentShader: yn.shadow_frag,
      },
    }
  function bn(t, e, n, i, r) {
    const s = new he(0)
    let a,
      o,
      l = 0,
      c = null,
      h = 0,
      u = null
    function d(t, e) {
      n.buffers.color.setClear(t.r, t.g, t.b, e, r)
    }
    return {
      getClearColor: function () {
        return s
      },
      setClearColor: function (t, e = 1) {
        s.set(t), (l = e), d(s, l)
      },
      getClearAlpha: function () {
        return l
      },
      setClearAlpha: function (t) {
        ;(l = t), d(s, l)
      },
      render: function (n, r, p, f) {
        let m = !0 === r.isScene ? r.background : null
        m && m.isTexture && (m = e.get(m))
        const g = t.xr,
          v = g.getSession && g.getSession()
        v && 'additive' === v.environmentBlendMode && (m = null),
          null === m ? d(s, l) : m && m.isColor && (d(m, 1), (f = !0)),
          (t.autoClear || f) && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          m && (m.isCubeTexture || m.isWebGLCubeRenderTarget || 306 === m.mapping)
            ? (void 0 === o &&
                ((o = new Qe(
                  new $e(1, 1, 1),
                  new rn({
                    name: 'BackgroundCubeMaterial',
                    uniforms: tn(_n.cube.uniforms),
                    vertexShader: _n.cube.vertexShader,
                    fragmentShader: _n.cube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                o.geometry.deleteAttribute('normal'),
                o.geometry.deleteAttribute('uv'),
                (o.onBeforeRender = function (t, e, n) {
                  this.matrixWorld.copyPosition(n.matrixWorld)
                }),
                Object.defineProperty(o.material, 'envMap', {
                  get: function () {
                    return this.uniforms.envMap.value
                  },
                }),
                i.update(o)),
              m.isWebGLCubeRenderTarget && (m = m.texture),
              (o.material.uniforms.envMap.value = m),
              (o.material.uniforms.flipEnvMap.value =
                m.isCubeTexture && m._needsFlipEnvMap ? -1 : 1),
              (c === m && h === m.version && u === t.toneMapping) ||
                ((o.material.needsUpdate = !0), (c = m), (h = m.version), (u = t.toneMapping)),
              n.unshift(o, o.geometry, o.material, 0, 0, null))
            : m &&
              m.isTexture &&
              (void 0 === a &&
                ((a = new Qe(
                  new vn(2, 2),
                  new rn({
                    name: 'BackgroundMaterial',
                    uniforms: tn(_n.background.uniforms),
                    vertexShader: _n.background.vertexShader,
                    fragmentShader: _n.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                a.geometry.deleteAttribute('normal'),
                Object.defineProperty(a.material, 'map', {
                  get: function () {
                    return this.uniforms.t2D.value
                  },
                }),
                i.update(a)),
              (a.material.uniforms.t2D.value = m),
              !0 === m.matrixAutoUpdate && m.updateMatrix(),
              a.material.uniforms.uvTransform.value.copy(m.matrix),
              (c === m && h === m.version && u === t.toneMapping) ||
                ((a.material.needsUpdate = !0), (c = m), (h = m.version), (u = t.toneMapping)),
              n.unshift(a, a.geometry, a.material, 0, 0, null))
      },
    }
  }
  function wn(t, e, n, i) {
    const r = t.getParameter(34921),
      s = i.isWebGL2 ? null : e.get('OES_vertex_array_object'),
      a = i.isWebGL2 || null !== s,
      o = {},
      l = d(null)
    let c = l
    function h(e) {
      return i.isWebGL2 ? t.bindVertexArray(e) : s.bindVertexArrayOES(e)
    }
    function u(e) {
      return i.isWebGL2 ? t.deleteVertexArray(e) : s.deleteVertexArrayOES(e)
    }
    function d(t) {
      const e = [],
        n = [],
        i = []
      for (let t = 0; t < r; t++) (e[t] = 0), (n[t] = 0), (i[t] = 0)
      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: e,
        enabledAttributes: n,
        attributeDivisors: i,
        object: t,
        attributes: {},
        index: null,
      }
    }
    function p() {
      const t = c.newAttributes
      for (let e = 0, n = t.length; e < n; e++) t[e] = 0
    }
    function f(t) {
      m(t, 0)
    }
    function m(n, r) {
      const s = c.newAttributes,
        a = c.enabledAttributes,
        o = c.attributeDivisors
      ;(s[n] = 1),
        0 === a[n] && (t.enableVertexAttribArray(n), (a[n] = 1)),
        o[n] !== r &&
          ((i.isWebGL2 ? t : e.get('ANGLE_instanced_arrays'))[
            i.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'
          ](n, r),
          (o[n] = r))
    }
    function g() {
      const e = c.newAttributes,
        n = c.enabledAttributes
      for (let i = 0, r = n.length; i < r; i++)
        n[i] !== e[i] && (t.disableVertexAttribArray(i), (n[i] = 0))
    }
    function v(e, n, r, s, a, o) {
      !0 !== i.isWebGL2 || (5124 !== r && 5125 !== r)
        ? t.vertexAttribPointer(e, n, r, s, a, o)
        : t.vertexAttribIPointer(e, n, r, a, o)
    }
    function y() {
      x(), c !== l && ((c = l), h(c.object))
    }
    function x() {
      ;(l.geometry = null), (l.program = null), (l.wireframe = !1)
    }
    return {
      setup: function (r, l, u, y, x) {
        let _ = !1
        if (a) {
          const e = (function (e, n, r) {
            const a = !0 === r.wireframe
            let l = o[e.id]
            void 0 === l && ((l = {}), (o[e.id] = l))
            let c = l[n.id]
            void 0 === c && ((c = {}), (l[n.id] = c))
            let h = c[a]
            return (
              void 0 === h &&
                ((h = d(i.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES())),
                (c[a] = h)),
              h
            )
          })(y, u, l)
          c !== e && ((c = e), h(c.object)),
            (_ = (function (t, e) {
              const n = c.attributes,
                i = t.attributes
              let r = 0
              for (const t in i) {
                const e = n[t],
                  s = i[t]
                if (void 0 === e) return !0
                if (e.attribute !== s) return !0
                if (e.data !== s.data) return !0
                r++
              }
              return c.attributesNum !== r || c.index !== e
            })(y, x)),
            _ &&
              (function (t, e) {
                const n = {},
                  i = t.attributes
                let r = 0
                for (const t in i) {
                  const e = i[t],
                    s = {}
                  ;(s.attribute = e), e.data && (s.data = e.data), (n[t] = s), r++
                }
                ;(c.attributes = n), (c.attributesNum = r), (c.index = e)
              })(y, x)
        } else {
          const t = !0 === l.wireframe
          ;(c.geometry === y.id && c.program === u.id && c.wireframe === t) ||
            ((c.geometry = y.id), (c.program = u.id), (c.wireframe = t), (_ = !0))
        }
        !0 === r.isInstancedMesh && (_ = !0),
          null !== x && n.update(x, 34963),
          _ &&
            ((function (r, s, a, o) {
              if (
                !1 === i.isWebGL2 &&
                (r.isInstancedMesh || o.isInstancedBufferGeometry) &&
                null === e.get('ANGLE_instanced_arrays')
              )
                return
              p()
              const l = o.attributes,
                c = a.getAttributes(),
                h = s.defaultAttributeValues
              for (const e in c) {
                const i = c[e]
                if (i >= 0) {
                  const s = l[e]
                  if (void 0 !== s) {
                    const e = s.normalized,
                      r = s.itemSize,
                      a = n.get(s)
                    if (void 0 === a) continue
                    const l = a.buffer,
                      c = a.type,
                      h = a.bytesPerElement
                    if (s.isInterleavedBufferAttribute) {
                      const n = s.data,
                        a = n.stride,
                        u = s.offset
                      n && n.isInstancedInterleavedBuffer
                        ? (m(i, n.meshPerAttribute),
                          void 0 === o._maxInstanceCount &&
                            (o._maxInstanceCount = n.meshPerAttribute * n.count))
                        : f(i),
                        t.bindBuffer(34962, l),
                        v(i, r, c, e, a * h, u * h)
                    } else
                      s.isInstancedBufferAttribute
                        ? (m(i, s.meshPerAttribute),
                          void 0 === o._maxInstanceCount &&
                            (o._maxInstanceCount = s.meshPerAttribute * s.count))
                        : f(i),
                        t.bindBuffer(34962, l),
                        v(i, r, c, e, 0, 0)
                  } else if ('instanceMatrix' === e) {
                    const e = n.get(r.instanceMatrix)
                    if (void 0 === e) continue
                    const s = e.buffer,
                      a = e.type
                    m(i + 0, 1),
                      m(i + 1, 1),
                      m(i + 2, 1),
                      m(i + 3, 1),
                      t.bindBuffer(34962, s),
                      t.vertexAttribPointer(i + 0, 4, a, !1, 64, 0),
                      t.vertexAttribPointer(i + 1, 4, a, !1, 64, 16),
                      t.vertexAttribPointer(i + 2, 4, a, !1, 64, 32),
                      t.vertexAttribPointer(i + 3, 4, a, !1, 64, 48)
                  } else if ('instanceColor' === e) {
                    const e = n.get(r.instanceColor)
                    if (void 0 === e) continue
                    const s = e.buffer,
                      a = e.type
                    m(i, 1), t.bindBuffer(34962, s), t.vertexAttribPointer(i, 3, a, !1, 12, 0)
                  } else if (void 0 !== h) {
                    const n = h[e]
                    if (void 0 !== n)
                      switch (n.length) {
                        case 2:
                          t.vertexAttrib2fv(i, n)
                          break
                        case 3:
                          t.vertexAttrib3fv(i, n)
                          break
                        case 4:
                          t.vertexAttrib4fv(i, n)
                          break
                        default:
                          t.vertexAttrib1fv(i, n)
                      }
                  }
                }
              }
              g()
            })(r, l, u, y),
            null !== x && t.bindBuffer(34963, n.get(x).buffer))
      },
      reset: y,
      resetDefaultState: x,
      dispose: function () {
        y()
        for (const t in o) {
          const e = o[t]
          for (const t in e) {
            const n = e[t]
            for (const t in n) u(n[t].object), delete n[t]
            delete e[t]
          }
          delete o[t]
        }
      },
      releaseStatesOfGeometry: function (t) {
        if (void 0 === o[t.id]) return
        const e = o[t.id]
        for (const t in e) {
          const n = e[t]
          for (const t in n) u(n[t].object), delete n[t]
          delete e[t]
        }
        delete o[t.id]
      },
      releaseStatesOfProgram: function (t) {
        for (const e in o) {
          const n = o[e]
          if (void 0 === n[t.id]) continue
          const i = n[t.id]
          for (const t in i) u(i[t].object), delete i[t]
          delete n[t.id]
        }
      },
      initAttributes: p,
      enableAttribute: f,
      disableUnusedAttributes: g,
    }
  }
  function Mn(t, e, n, i) {
    const r = i.isWebGL2
    let s
    ;(this.setMode = function (t) {
      s = t
    }),
      (this.render = function (e, i) {
        t.drawArrays(s, e, i), n.update(i, s, 1)
      }),
      (this.renderInstances = function (i, a, o) {
        if (0 === o) return
        let l, c
        if (r) (l = t), (c = 'drawArraysInstanced')
        else if (
          ((l = e.get('ANGLE_instanced_arrays')), (c = 'drawArraysInstancedANGLE'), null === l)
        )
          return void console.error(
            'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.'
          )
        l[c](s, i, a, o), n.update(a, s, o)
      })
  }
  function Sn(t, e, n) {
    let i
    function r(e) {
      if ('highp' === e) {
        if (
          t.getShaderPrecisionFormat(35633, 36338).precision > 0 &&
          t.getShaderPrecisionFormat(35632, 36338).precision > 0
        )
          return 'highp'
        e = 'mediump'
      }
      return 'mediump' === e &&
        t.getShaderPrecisionFormat(35633, 36337).precision > 0 &&
        t.getShaderPrecisionFormat(35632, 36337).precision > 0
        ? 'mediump'
        : 'lowp'
    }
    const s =
      ('undefined' != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext) ||
      ('undefined' != typeof WebGL2ComputeRenderingContext &&
        t instanceof WebGL2ComputeRenderingContext)
    let a = void 0 !== n.precision ? n.precision : 'highp'
    const o = r(a)
    o !== a &&
      (console.warn('THREE.WebGLRenderer:', a, 'not supported, using', o, 'instead.'), (a = o))
    const l = !0 === n.logarithmicDepthBuffer,
      c = t.getParameter(34930),
      h = t.getParameter(35660),
      u = t.getParameter(3379),
      d = t.getParameter(34076),
      p = t.getParameter(34921),
      f = t.getParameter(36347),
      m = t.getParameter(36348),
      g = t.getParameter(36349),
      v = h > 0,
      y = s || e.has('OES_texture_float')
    return {
      isWebGL2: s,
      getMaxAnisotropy: function () {
        if (void 0 !== i) return i
        if (!0 === e.has('EXT_texture_filter_anisotropic')) {
          const n = e.get('EXT_texture_filter_anisotropic')
          i = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        } else i = 0
        return i
      },
      getMaxPrecision: r,
      precision: a,
      logarithmicDepthBuffer: l,
      maxTextures: c,
      maxVertexTextures: h,
      maxTextureSize: u,
      maxCubemapSize: d,
      maxAttributes: p,
      maxVertexUniforms: f,
      maxVaryings: m,
      maxFragmentUniforms: g,
      vertexTextures: v,
      floatFragmentTextures: y,
      floatVertexTextures: v && y,
      maxSamples: s ? t.getParameter(36183) : 0,
    }
  }
  function En(t) {
    const e = this
    let n = null,
      i = 0,
      r = !1,
      s = !1
    const a = new Wt(),
      o = new D(),
      l = { value: null, needsUpdate: !1 }
    function c() {
      l.value !== n && ((l.value = n), (l.needsUpdate = i > 0)),
        (e.numPlanes = i),
        (e.numIntersection = 0)
    }
    function h(t, n, i, r) {
      const s = null !== t ? t.length : 0
      let c = null
      if (0 !== s) {
        if (((c = l.value), !0 !== r || null === c)) {
          const e = i + 4 * s,
            r = n.matrixWorldInverse
          o.getNormalMatrix(r), (null === c || c.length < e) && (c = new Float32Array(e))
          for (let e = 0, n = i; e !== s; ++e, n += 4)
            a.copy(t[e]).applyMatrix4(r, o), a.normal.toArray(c, n), (c[n + 3] = a.constant)
        }
        ;(l.value = c), (l.needsUpdate = !0)
      }
      return (e.numPlanes = s), (e.numIntersection = 0), c
    }
    ;(this.uniform = l),
      (this.numPlanes = 0),
      (this.numIntersection = 0),
      (this.init = function (t, e, s) {
        const a = 0 !== t.length || e || 0 !== i || r
        return (r = e), (n = h(t, s, 0)), (i = t.length), a
      }),
      (this.beginShadows = function () {
        ;(s = !0), h(null)
      }),
      (this.endShadows = function () {
        ;(s = !1), c()
      }),
      (this.setState = function (e, a, o) {
        const u = e.clippingPlanes,
          d = e.clipIntersection,
          p = e.clipShadows,
          f = t.get(e)
        if (!r || null === u || 0 === u.length || (s && !p)) s ? h(null) : c()
        else {
          const t = s ? 0 : i,
            e = 4 * t
          let r = f.clippingState || null
          ;(l.value = r), (r = h(u, a, e, o))
          for (let t = 0; t !== e; ++t) r[t] = n[t]
          ;(f.clippingState = r),
            (this.numIntersection = d ? this.numPlanes : 0),
            (this.numPlanes += t)
        }
      })
  }
  function Tn(t) {
    let e = new WeakMap()
    function n(t, e) {
      return 303 === e ? (t.mapping = 301) : 304 === e && (t.mapping = 302), t
    }
    function i(t) {
      const n = t.target
      n.removeEventListener('dispose', i)
      const r = e.get(n)
      void 0 !== r && (e.delete(n), r.dispose())
    }
    return {
      get: function (r) {
        if (r && r.isTexture) {
          const s = r.mapping
          if (303 === s || 304 === s) {
            if (e.has(r)) return n(e.get(r).texture, r.mapping)
            {
              const s = r.image
              if (s && s.height > 0) {
                const a = t.getRenderTarget(),
                  o = new hn(s.height / 2)
                return (
                  o.fromEquirectangularTexture(t, r),
                  e.set(r, o),
                  t.setRenderTarget(a),
                  r.addEventListener('dispose', i),
                  n(o.texture, r.mapping)
                )
              }
              return null
            }
          }
        }
        return r
      },
      dispose: function () {
        e = new WeakMap()
      },
    }
  }
  function Ln(t) {
    const e = {}
    function n(n) {
      if (void 0 !== e[n]) return e[n]
      let i
      switch (n) {
        case 'WEBGL_depth_texture':
          i =
            t.getExtension('WEBGL_depth_texture') ||
            t.getExtension('MOZ_WEBGL_depth_texture') ||
            t.getExtension('WEBKIT_WEBGL_depth_texture')
          break
        case 'EXT_texture_filter_anisotropic':
          i =
            t.getExtension('EXT_texture_filter_anisotropic') ||
            t.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
            t.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
          break
        case 'WEBGL_compressed_texture_s3tc':
          i =
            t.getExtension('WEBGL_compressed_texture_s3tc') ||
            t.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
            t.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc')
          break
        case 'WEBGL_compressed_texture_pvrtc':
          i =
            t.getExtension('WEBGL_compressed_texture_pvrtc') ||
            t.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc')
          break
        default:
          i = t.getExtension(n)
      }
      return (e[n] = i), i
    }
    return {
      has: function (t) {
        return null !== n(t)
      },
      init: function (t) {
        t.isWebGL2
          ? n('EXT_color_buffer_float')
          : (n('WEBGL_depth_texture'),
            n('OES_texture_float'),
            n('OES_texture_half_float'),
            n('OES_texture_half_float_linear'),
            n('OES_standard_derivatives'),
            n('OES_element_index_uint'),
            n('OES_vertex_array_object'),
            n('ANGLE_instanced_arrays')),
          n('OES_texture_float_linear'),
          n('EXT_color_buffer_half_float')
      },
      get: function (t) {
        const e = n(t)
        return (
          null === e && console.warn('THREE.WebGLRenderer: ' + t + ' extension not supported.'), e
        )
      },
    }
  }
  function An(t, e, n, i) {
    const r = {},
      s = new WeakMap()
    function a(t) {
      const o = t.target
      null !== o.index && e.remove(o.index)
      for (const t in o.attributes) e.remove(o.attributes[t])
      o.removeEventListener('dispose', a), delete r[o.id]
      const l = s.get(o)
      l && (e.remove(l), s.delete(o)),
        i.releaseStatesOfGeometry(o),
        !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount,
        n.memory.geometries--
    }
    function o(t) {
      const n = [],
        i = t.index,
        r = t.attributes.position
      let a = 0
      if (null !== i) {
        const t = i.array
        a = i.version
        for (let e = 0, i = t.length; e < i; e += 3) {
          const i = t[e + 0],
            r = t[e + 1],
            s = t[e + 2]
          n.push(i, r, r, s, s, i)
        }
      } else {
        const t = r.array
        a = r.version
        for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
          const t = e + 0,
            i = e + 1,
            r = e + 2
          n.push(t, i, i, r, r, t)
        }
      }
      const o = new (Ee(n) > 65535 ? be : xe)(n, 1)
      o.version = a
      const l = s.get(t)
      l && e.remove(l), s.set(t, o)
    }
    return {
      get: function (t, e) {
        return (
          !0 === r[e.id] ||
            (e.addEventListener('dispose', a), (r[e.id] = !0), n.memory.geometries++),
          e
        )
      },
      update: function (t) {
        const n = t.attributes
        for (const t in n) e.update(n[t], 34962)
        const i = t.morphAttributes
        for (const t in i) {
          const n = i[t]
          for (let t = 0, i = n.length; t < i; t++) e.update(n[t], 34962)
        }
      },
      getWireframeAttribute: function (t) {
        const e = s.get(t)
        if (e) {
          const n = t.index
          null !== n && e.version < n.version && o(t)
        } else o(t)
        return s.get(t)
      },
    }
  }
  function Rn(t, e, n, i) {
    const r = i.isWebGL2
    let s, a, o
    ;(this.setMode = function (t) {
      s = t
    }),
      (this.setIndex = function (t) {
        ;(a = t.type), (o = t.bytesPerElement)
      }),
      (this.render = function (e, i) {
        t.drawElements(s, i, a, e * o), n.update(i, s, 1)
      }),
      (this.renderInstances = function (i, l, c) {
        if (0 === c) return
        let h, u
        if (r) (h = t), (u = 'drawElementsInstanced')
        else if (
          ((h = e.get('ANGLE_instanced_arrays')), (u = 'drawElementsInstancedANGLE'), null === h)
        )
          return void console.error(
            'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.'
          )
        h[u](s, l, a, i * o, c), n.update(l, s, c)
      })
  }
  function Pn(t) {
    const e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }
    return {
      memory: { geometries: 0, textures: 0 },
      render: e,
      programs: null,
      autoReset: !0,
      reset: function () {
        e.frame++, (e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0)
      },
      update: function (t, n, i) {
        switch ((e.calls++, n)) {
          case 4:
            e.triangles += i * (t / 3)
            break
          case 1:
            e.lines += i * (t / 2)
            break
          case 3:
            e.lines += i * (t - 1)
            break
          case 2:
            e.lines += i * t
            break
          case 0:
            e.points += i * t
            break
          default:
            console.error('THREE.WebGLInfo: Unknown draw mode:', n)
        }
      },
    }
  }
  function Cn(t, e) {
    return t[0] - e[0]
  }
  function Dn(t, e) {
    return Math.abs(e[1]) - Math.abs(t[1])
  }
  function In(t) {
    const e = {},
      n = new Float32Array(8),
      i = []
    for (let t = 0; t < 8; t++) i[t] = [t, 0]
    return {
      update: function (r, s, a, o) {
        const l = r.morphTargetInfluences,
          c = void 0 === l ? 0 : l.length
        let h = e[s.id]
        if (void 0 === h) {
          h = []
          for (let t = 0; t < c; t++) h[t] = [t, 0]
          e[s.id] = h
        }
        for (let t = 0; t < c; t++) {
          const e = h[t]
          ;(e[0] = t), (e[1] = l[t])
        }
        h.sort(Dn)
        for (let t = 0; t < 8; t++)
          t < c && h[t][1]
            ? ((i[t][0] = h[t][0]), (i[t][1] = h[t][1]))
            : ((i[t][0] = Number.MAX_SAFE_INTEGER), (i[t][1] = 0))
        i.sort(Cn)
        const u = a.morphTargets && s.morphAttributes.position,
          d = a.morphNormals && s.morphAttributes.normal
        let p = 0
        for (let t = 0; t < 8; t++) {
          const e = i[t],
            r = e[0],
            a = e[1]
          r !== Number.MAX_SAFE_INTEGER && a
            ? (u &&
                s.getAttribute('morphTarget' + t) !== u[r] &&
                s.setAttribute('morphTarget' + t, u[r]),
              d &&
                s.getAttribute('morphNormal' + t) !== d[r] &&
                s.setAttribute('morphNormal' + t, d[r]),
              (n[t] = a),
              (p += a))
            : (u &&
                !0 === s.hasAttribute('morphTarget' + t) &&
                s.deleteAttribute('morphTarget' + t),
              d && !0 === s.hasAttribute('morphNormal' + t) && s.deleteAttribute('morphNormal' + t),
              (n[t] = 0))
        }
        const f = s.morphTargetsRelative ? 1 : 1 - p
        o.getUniforms().setValue(t, 'morphTargetBaseInfluence', f),
          o.getUniforms().setValue(t, 'morphTargetInfluences', n)
      },
    }
  }
  function Nn(t, e, n, i) {
    let r = new WeakMap()
    function s(t) {
      const e = t.target
      e.removeEventListener('dispose', s),
        n.remove(e.instanceMatrix),
        null !== e.instanceColor && n.remove(e.instanceColor)
    }
    return {
      update: function (t) {
        const a = i.render.frame,
          o = t.geometry,
          l = e.get(t, o)
        return (
          r.get(l) !== a && (e.update(l), r.set(l, a)),
          t.isInstancedMesh &&
            (!1 === t.hasEventListener('dispose', s) && t.addEventListener('dispose', s),
            n.update(t.instanceMatrix, 34962),
            null !== t.instanceColor && n.update(t.instanceColor, 34962)),
          l
        )
      },
      dispose: function () {
        r = new WeakMap()
      },
    }
  }
  _n.physical = {
    uniforms: en([
      _n.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatNormalScale: { value: new C(1, 1) },
        clearcoatNormalMap: { value: null },
        sheen: { value: new he(0) },
        transmission: { value: 0 },
        transmissionMap: { value: null },
      },
    ]),
    vertexShader: yn.meshphysical_vert,
    fragmentShader: yn.meshphysical_frag,
  }
  class On extends z {
    constructor(t = null, e = 1, i = 1, s = 1) {
      super(null),
        (this.image = { data: t, width: e, height: i, depth: s }),
        (this.magFilter = r),
        (this.minFilter = r),
        (this.wrapR = n),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.needsUpdate = !0)
    }
  }
  On.prototype.isDataTexture2DArray = !0
  class zn extends z {
    constructor(t = null, e = 1, i = 1, s = 1) {
      super(null),
        (this.image = { data: t, width: e, height: i, depth: s }),
        (this.magFilter = r),
        (this.minFilter = r),
        (this.wrapR = n),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.needsUpdate = !0)
    }
  }
  zn.prototype.isDataTexture3D = !0
  const Hn = new z(),
    Bn = new On(),
    Fn = new zn(),
    Un = new cn(),
    Gn = [],
    kn = [],
    Vn = new Float32Array(16),
    Wn = new Float32Array(9),
    jn = new Float32Array(4)
  function qn(t, e, n) {
    const i = t[0]
    if (i <= 0 || i > 0) return t
    const r = e * n
    let s = Gn[r]
    if ((void 0 === s && ((s = new Float32Array(r)), (Gn[r] = s)), 0 !== e)) {
      i.toArray(s, 0)
      for (let i = 1, r = 0; i !== e; ++i) (r += n), t[i].toArray(s, r)
    }
    return s
  }
  function Xn(t, e) {
    if (t.length !== e.length) return !1
    for (let n = 0, i = t.length; n < i; n++) if (t[n] !== e[n]) return !1
    return !0
  }
  function Yn(t, e) {
    for (let n = 0, i = e.length; n < i; n++) t[n] = e[n]
  }
  function Zn(t, e) {
    let n = kn[e]
    void 0 === n && ((n = new Int32Array(e)), (kn[e] = n))
    for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit()
    return n
  }
  function Jn(t, e) {
    const n = this.cache
    n[0] !== e && (t.uniform1f(this.addr, e), (n[0] = e))
  }
  function Qn(t, e) {
    const n = this.cache
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y) ||
        (t.uniform2f(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y))
    else {
      if (Xn(n, e)) return
      t.uniform2fv(this.addr, e), Yn(n, e)
    }
  }
  function Kn(t, e) {
    const n = this.cache
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z) ||
        (t.uniform3f(this.addr, e.x, e.y, e.z), (n[0] = e.x), (n[1] = e.y), (n[2] = e.z))
    else if (void 0 !== e.r)
      (n[0] === e.r && n[1] === e.g && n[2] === e.b) ||
        (t.uniform3f(this.addr, e.r, e.g, e.b), (n[0] = e.r), (n[1] = e.g), (n[2] = e.b))
    else {
      if (Xn(n, e)) return
      t.uniform3fv(this.addr, e), Yn(n, e)
    }
  }
  function $n(t, e) {
    const n = this.cache
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w) ||
        (t.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z),
        (n[3] = e.w))
    else {
      if (Xn(n, e)) return
      t.uniform4fv(this.addr, e), Yn(n, e)
    }
  }
  function ti(t, e) {
    const n = this.cache,
      i = e.elements
    if (void 0 === i) {
      if (Xn(n, e)) return
      t.uniformMatrix2fv(this.addr, !1, e), Yn(n, e)
    } else {
      if (Xn(n, i)) return
      jn.set(i), t.uniformMatrix2fv(this.addr, !1, jn), Yn(n, i)
    }
  }
  function ei(t, e) {
    const n = this.cache,
      i = e.elements
    if (void 0 === i) {
      if (Xn(n, e)) return
      t.uniformMatrix3fv(this.addr, !1, e), Yn(n, e)
    } else {
      if (Xn(n, i)) return
      Wn.set(i), t.uniformMatrix3fv(this.addr, !1, Wn), Yn(n, i)
    }
  }
  function ni(t, e) {
    const n = this.cache,
      i = e.elements
    if (void 0 === i) {
      if (Xn(n, e)) return
      t.uniformMatrix4fv(this.addr, !1, e), Yn(n, e)
    } else {
      if (Xn(n, i)) return
      Vn.set(i), t.uniformMatrix4fv(this.addr, !1, Vn), Yn(n, i)
    }
  }
  function ii(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit()
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)), n.safeSetTexture2D(e || Hn, r)
  }
  function ri(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit()
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)), n.setTexture2DArray(e || Bn, r)
  }
  function si(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit()
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)), n.setTexture3D(e || Fn, r)
  }
  function ai(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit()
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)), n.safeSetTextureCube(e || Un, r)
  }
  function oi(t, e) {
    const n = this.cache
    n[0] !== e && (t.uniform1i(this.addr, e), (n[0] = e))
  }
  function li(t, e) {
    const n = this.cache
    Xn(n, e) || (t.uniform2iv(this.addr, e), Yn(n, e))
  }
  function ci(t, e) {
    const n = this.cache
    Xn(n, e) || (t.uniform3iv(this.addr, e), Yn(n, e))
  }
  function hi(t, e) {
    const n = this.cache
    Xn(n, e) || (t.uniform4iv(this.addr, e), Yn(n, e))
  }
  function ui(t, e) {
    const n = this.cache
    n[0] !== e && (t.uniform1ui(this.addr, e), (n[0] = e))
  }
  function di(t, e) {
    t.uniform1fv(this.addr, e)
  }
  function pi(t, e) {
    t.uniform1iv(this.addr, e)
  }
  function fi(t, e) {
    t.uniform2iv(this.addr, e)
  }
  function mi(t, e) {
    t.uniform3iv(this.addr, e)
  }
  function gi(t, e) {
    t.uniform4iv(this.addr, e)
  }
  function vi(t, e) {
    const n = qn(e, this.size, 2)
    t.uniform2fv(this.addr, n)
  }
  function yi(t, e) {
    const n = qn(e, this.size, 3)
    t.uniform3fv(this.addr, n)
  }
  function xi(t, e) {
    const n = qn(e, this.size, 4)
    t.uniform4fv(this.addr, n)
  }
  function _i(t, e) {
    const n = qn(e, this.size, 4)
    t.uniformMatrix2fv(this.addr, !1, n)
  }
  function bi(t, e) {
    const n = qn(e, this.size, 9)
    t.uniformMatrix3fv(this.addr, !1, n)
  }
  function wi(t, e) {
    const n = qn(e, this.size, 16)
    t.uniformMatrix4fv(this.addr, !1, n)
  }
  function Mi(t, e, n) {
    const i = e.length,
      r = Zn(n, i)
    t.uniform1iv(this.addr, r)
    for (let t = 0; t !== i; ++t) n.safeSetTexture2D(e[t] || Hn, r[t])
  }
  function Si(t, e, n) {
    const i = e.length,
      r = Zn(n, i)
    t.uniform1iv(this.addr, r)
    for (let t = 0; t !== i; ++t) n.safeSetTextureCube(e[t] || Un, r[t])
  }
  function Ei(t, e, n) {
    ;(this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return Jn
          case 35664:
            return Qn
          case 35665:
            return Kn
          case 35666:
            return $n
          case 35674:
            return ti
          case 35675:
            return ei
          case 35676:
            return ni
          case 5124:
          case 35670:
            return oi
          case 35667:
          case 35671:
            return li
          case 35668:
          case 35672:
            return ci
          case 35669:
          case 35673:
            return hi
          case 5125:
            return ui
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return ii
          case 35679:
          case 36299:
          case 36307:
            return si
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return ai
          case 36289:
          case 36303:
          case 36311:
          case 36292:
            return ri
        }
      })(e.type))
  }
  function Ti(t, e, n) {
    ;(this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.size = e.size),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return di
          case 35664:
            return vi
          case 35665:
            return yi
          case 35666:
            return xi
          case 35674:
            return _i
          case 35675:
            return bi
          case 35676:
            return wi
          case 5124:
          case 35670:
            return pi
          case 35667:
          case 35671:
            return fi
          case 35668:
          case 35672:
            return mi
          case 35669:
          case 35673:
            return gi
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return Mi
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return Si
        }
      })(e.type))
  }
  function Li(t) {
    ;(this.id = t), (this.seq = []), (this.map = {})
  }
  ;(Ti.prototype.updateCache = function (t) {
    const e = this.cache
    t instanceof Float32Array && e.length !== t.length && (this.cache = new Float32Array(t.length)),
      Yn(e, t)
  }),
    (Li.prototype.setValue = function (t, e, n) {
      const i = this.seq
      for (let r = 0, s = i.length; r !== s; ++r) {
        const s = i[r]
        s.setValue(t, e[s.id], n)
      }
    })
  const Ai = /(\w+)(\])?(\[|\.)?/g
  function Ri(t, e) {
    t.seq.push(e), (t.map[e.id] = e)
  }
  function Pi(t, e, n) {
    const i = t.name,
      r = i.length
    for (Ai.lastIndex = 0; ; ) {
      const s = Ai.exec(i),
        a = Ai.lastIndex
      let o = s[1]
      const l = ']' === s[2],
        c = s[3]
      if ((l && (o |= 0), void 0 === c || ('[' === c && a + 2 === r))) {
        Ri(n, void 0 === c ? new Ei(o, t, e) : new Ti(o, t, e))
        break
      }
      {
        let t = n.map[o]
        void 0 === t && ((t = new Li(o)), Ri(n, t)), (n = t)
      }
    }
  }
  function Ci(t, e) {
    ;(this.seq = []), (this.map = {})
    const n = t.getProgramParameter(e, 35718)
    for (let i = 0; i < n; ++i) {
      const n = t.getActiveUniform(e, i)
      Pi(n, t.getUniformLocation(e, n.name), this)
    }
  }
  function Di(t, e, n) {
    const i = t.createShader(e)
    return t.shaderSource(i, n), t.compileShader(i), i
  }
  ;(Ci.prototype.setValue = function (t, e, n, i) {
    const r = this.map[e]
    void 0 !== r && r.setValue(t, n, i)
  }),
    (Ci.prototype.setOptional = function (t, e, n) {
      const i = e[n]
      void 0 !== i && this.setValue(t, n, i)
    }),
    (Ci.upload = function (t, e, n, i) {
      for (let r = 0, s = e.length; r !== s; ++r) {
        const s = e[r],
          a = n[s.id]
        !1 !== a.needsUpdate && s.setValue(t, a.value, i)
      }
    }),
    (Ci.seqWithValue = function (t, e) {
      const n = []
      for (let i = 0, r = t.length; i !== r; ++i) {
        const r = t[i]
        r.id in e && n.push(r)
      }
      return n
    })
  let Ii = 0
  function Ni(t) {
    switch (t) {
      case w:
        return ['Linear', '( value )']
      case 3001:
        return ['sRGB', '( value )']
      case 3002:
        return ['RGBE', '( value )']
      case 3004:
        return ['RGBM', '( value, 7.0 )']
      case 3005:
        return ['RGBM', '( value, 16.0 )']
      case 3006:
        return ['RGBD', '( value, 256.0 )']
      case 3007:
        return ['Gamma', '( value, float( GAMMA_FACTOR ) )']
      case 3003:
        return ['LogLuv', '( value )']
      default:
        return console.warn('THREE.WebGLProgram: Unsupported encoding:', t), ['Linear', '( value )']
    }
  }
  function Oi(t, e, n) {
    const i = t.getShaderParameter(e, 35713),
      r = t.getShaderInfoLog(e).trim()
    return i && '' === r
      ? ''
      : 'THREE.WebGLShader: gl.getShaderInfoLog() ' +
          n +
          '\n' +
          r +
          (function (t) {
            const e = t.split('\n')
            for (let t = 0; t < e.length; t++) e[t] = t + 1 + ': ' + e[t]
            return e.join('\n')
          })(t.getShaderSource(e))
  }
  function zi(t, e) {
    const n = Ni(e)
    return 'vec4 ' + t + '( vec4 value ) { return ' + n[0] + 'ToLinear' + n[1] + '; }'
  }
  function Hi(t, e) {
    const n = Ni(e)
    return 'vec4 ' + t + '( vec4 value ) { return LinearTo' + n[0] + n[1] + '; }'
  }
  function Bi(t, e) {
    let n
    switch (e) {
      case 1:
        n = 'Linear'
        break
      case 2:
        n = 'Reinhard'
        break
      case 3:
        n = 'OptimizedCineon'
        break
      case 4:
        n = 'ACESFilmic'
        break
      case 5:
        n = 'Custom'
        break
      default:
        console.warn('THREE.WebGLProgram: Unsupported toneMapping:', e), (n = 'Linear')
    }
    return 'vec3 ' + t + '( vec3 color ) { return ' + n + 'ToneMapping( color ); }'
  }
  function Fi(t) {
    return '' !== t
  }
  function Ui(t, e) {
    return t
      .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
      .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
  }
  function Gi(t, e) {
    return t
      .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
      .replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
  }
  const ki = /^[ \t]*#include +<([\w\d./]+)>/gm
  function Vi(t) {
    return t.replace(ki, Wi)
  }
  function Wi(t, e) {
    const n = yn[e]
    if (void 0 === n) throw new Error('Can not resolve #include <' + e + '>')
    return Vi(n)
  }
  const ji =
      /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
    qi =
      /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g
  function Xi(t) {
    return t.replace(qi, Zi).replace(ji, Yi)
  }
  function Yi(t, e, n, i) {
    return (
      console.warn(
        'WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.'
      ),
      Zi(0, e, n, i)
    )
  }
  function Zi(t, e, n, i) {
    let r = ''
    for (let t = parseInt(e); t < parseInt(n); t++)
      r += i.replace(/\[\s*i\s*\]/g, '[ ' + t + ' ]').replace(/UNROLLED_LOOP_INDEX/g, t)
    return r
  }
  function Ji(t) {
    let e = 'precision ' + t.precision + ' float;\nprecision ' + t.precision + ' int;'
    return (
      'highp' === t.precision
        ? (e += '\n#define HIGH_PRECISION')
        : 'mediump' === t.precision
        ? (e += '\n#define MEDIUM_PRECISION')
        : 'lowp' === t.precision && (e += '\n#define LOW_PRECISION'),
      e
    )
  }
  function Qi(t, e, n, i) {
    const r = t.getContext(),
      s = n.defines
    let a = n.vertexShader,
      o = n.fragmentShader
    const l = (function (t) {
        let e = 'SHADOWMAP_TYPE_BASIC'
        return (
          1 === t.shadowMapType
            ? (e = 'SHADOWMAP_TYPE_PCF')
            : 2 === t.shadowMapType
            ? (e = 'SHADOWMAP_TYPE_PCF_SOFT')
            : 3 === t.shadowMapType && (e = 'SHADOWMAP_TYPE_VSM'),
          e
        )
      })(n),
      c = (function (t) {
        let e = 'ENVMAP_TYPE_CUBE'
        if (t.envMap)
          switch (t.envMapMode) {
            case 301:
            case 302:
              e = 'ENVMAP_TYPE_CUBE'
              break
            case 306:
            case 307:
              e = 'ENVMAP_TYPE_CUBE_UV'
          }
        return e
      })(n),
      h = (function (t) {
        let e = 'ENVMAP_MODE_REFLECTION'
        if (t.envMap)
          switch (t.envMapMode) {
            case 302:
            case 307:
              e = 'ENVMAP_MODE_REFRACTION'
          }
        return e
      })(n),
      u = (function (t) {
        let e = 'ENVMAP_BLENDING_NONE'
        if (t.envMap)
          switch (t.combine) {
            case 0:
              e = 'ENVMAP_BLENDING_MULTIPLY'
              break
            case 1:
              e = 'ENVMAP_BLENDING_MIX'
              break
            case 2:
              e = 'ENVMAP_BLENDING_ADD'
          }
        return e
      })(n),
      d = t.gammaFactor > 0 ? t.gammaFactor : 1,
      p = n.isWebGL2
        ? ''
        : (function (t) {
            return [
              t.extensionDerivatives ||
              t.envMapCubeUV ||
              t.bumpMap ||
              t.tangentSpaceNormalMap ||
              t.clearcoatNormalMap ||
              t.flatShading ||
              'physical' === t.shaderID
                ? '#extension GL_OES_standard_derivatives : enable'
                : '',
              (t.extensionFragDepth || t.logarithmicDepthBuffer) && t.rendererExtensionFragDepth
                ? '#extension GL_EXT_frag_depth : enable'
                : '',
              t.extensionDrawBuffers && t.rendererExtensionDrawBuffers
                ? '#extension GL_EXT_draw_buffers : require'
                : '',
              (t.extensionShaderTextureLOD || t.envMap) && t.rendererExtensionShaderTextureLod
                ? '#extension GL_EXT_shader_texture_lod : enable'
                : '',
            ]
              .filter(Fi)
              .join('\n')
          })(n),
      f = (function (t) {
        const e = []
        for (const n in t) {
          const i = t[n]
          !1 !== i && e.push('#define ' + n + ' ' + i)
        }
        return e.join('\n')
      })(s),
      m = r.createProgram()
    let g,
      v,
      y = n.glslVersion ? '#version ' + n.glslVersion + '\n' : ''
    n.isRawShaderMaterial
      ? ((g = [f].filter(Fi).join('\n')),
        g.length > 0 && (g += '\n'),
        (v = [p, f].filter(Fi).join('\n')),
        v.length > 0 && (v += '\n'))
      : ((g = [
          Ji(n),
          '#define SHADER_NAME ' + n.shaderName,
          f,
          n.instancing ? '#define USE_INSTANCING' : '',
          n.instancingColor ? '#define USE_INSTANCING_COLOR' : '',
          n.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',
          '#define GAMMA_FACTOR ' + d,
          '#define MAX_BONES ' + n.maxBones,
          n.useFog && n.fog ? '#define USE_FOG' : '',
          n.useFog && n.fogExp2 ? '#define FOG_EXP2' : '',
          n.map ? '#define USE_MAP' : '',
          n.envMap ? '#define USE_ENVMAP' : '',
          n.envMap ? '#define ' + h : '',
          n.lightMap ? '#define USE_LIGHTMAP' : '',
          n.aoMap ? '#define USE_AOMAP' : '',
          n.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
          n.bumpMap ? '#define USE_BUMPMAP' : '',
          n.normalMap ? '#define USE_NORMALMAP' : '',
          n.normalMap && n.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
          n.normalMap && n.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '',
          n.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
          n.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
          n.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
          n.displacementMap && n.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
          n.specularMap ? '#define USE_SPECULARMAP' : '',
          n.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
          n.metalnessMap ? '#define USE_METALNESSMAP' : '',
          n.alphaMap ? '#define USE_ALPHAMAP' : '',
          n.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
          n.vertexTangents ? '#define USE_TANGENT' : '',
          n.vertexColors ? '#define USE_COLOR' : '',
          n.vertexUvs ? '#define USE_UV' : '',
          n.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
          n.flatShading ? '#define FLAT_SHADED' : '',
          n.skinning ? '#define USE_SKINNING' : '',
          n.useVertexTexture ? '#define BONE_TEXTURE' : '',
          n.morphTargets ? '#define USE_MORPHTARGETS' : '',
          n.morphNormals && !1 === n.flatShading ? '#define USE_MORPHNORMALS' : '',
          n.doubleSided ? '#define DOUBLE_SIDED' : '',
          n.flipSided ? '#define FLIP_SIDED' : '',
          n.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
          n.shadowMapEnabled ? '#define ' + l : '',
          n.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
          n.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? '#define USE_LOGDEPTHBUF_EXT'
            : '',
          'uniform mat4 modelMatrix;',
          'uniform mat4 modelViewMatrix;',
          'uniform mat4 projectionMatrix;',
          'uniform mat4 viewMatrix;',
          'uniform mat3 normalMatrix;',
          'uniform vec3 cameraPosition;',
          'uniform bool isOrthographic;',
          '#ifdef USE_INSTANCING',
          '\tattribute mat4 instanceMatrix;',
          '#endif',
          '#ifdef USE_INSTANCING_COLOR',
          '\tattribute vec3 instanceColor;',
          '#endif',
          'attribute vec3 position;',
          'attribute vec3 normal;',
          'attribute vec2 uv;',
          '#ifdef USE_TANGENT',
          '\tattribute vec4 tangent;',
          '#endif',
          '#ifdef USE_COLOR',
          '\tattribute vec3 color;',
          '#endif',
          '#ifdef USE_MORPHTARGETS',
          '\tattribute vec3 morphTarget0;',
          '\tattribute vec3 morphTarget1;',
          '\tattribute vec3 morphTarget2;',
          '\tattribute vec3 morphTarget3;',
          '\t#ifdef USE_MORPHNORMALS',
          '\t\tattribute vec3 morphNormal0;',
          '\t\tattribute vec3 morphNormal1;',
          '\t\tattribute vec3 morphNormal2;',
          '\t\tattribute vec3 morphNormal3;',
          '\t#else',
          '\t\tattribute vec3 morphTarget4;',
          '\t\tattribute vec3 morphTarget5;',
          '\t\tattribute vec3 morphTarget6;',
          '\t\tattribute vec3 morphTarget7;',
          '\t#endif',
          '#endif',
          '#ifdef USE_SKINNING',
          '\tattribute vec4 skinIndex;',
          '\tattribute vec4 skinWeight;',
          '#endif',
          '\n',
        ]
          .filter(Fi)
          .join('\n')),
        (v = [
          p,
          Ji(n),
          '#define SHADER_NAME ' + n.shaderName,
          f,
          n.alphaTest ? '#define ALPHATEST ' + n.alphaTest + (n.alphaTest % 1 ? '' : '.0') : '',
          '#define GAMMA_FACTOR ' + d,
          n.useFog && n.fog ? '#define USE_FOG' : '',
          n.useFog && n.fogExp2 ? '#define FOG_EXP2' : '',
          n.map ? '#define USE_MAP' : '',
          n.matcap ? '#define USE_MATCAP' : '',
          n.envMap ? '#define USE_ENVMAP' : '',
          n.envMap ? '#define ' + c : '',
          n.envMap ? '#define ' + h : '',
          n.envMap ? '#define ' + u : '',
          n.lightMap ? '#define USE_LIGHTMAP' : '',
          n.aoMap ? '#define USE_AOMAP' : '',
          n.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
          n.bumpMap ? '#define USE_BUMPMAP' : '',
          n.normalMap ? '#define USE_NORMALMAP' : '',
          n.normalMap && n.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '',
          n.normalMap && n.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '',
          n.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
          n.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
          n.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
          n.specularMap ? '#define USE_SPECULARMAP' : '',
          n.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
          n.metalnessMap ? '#define USE_METALNESSMAP' : '',
          n.alphaMap ? '#define USE_ALPHAMAP' : '',
          n.sheen ? '#define USE_SHEEN' : '',
          n.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
          n.vertexTangents ? '#define USE_TANGENT' : '',
          n.vertexColors || n.instancingColor ? '#define USE_COLOR' : '',
          n.vertexUvs ? '#define USE_UV' : '',
          n.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
          n.gradientMap ? '#define USE_GRADIENTMAP' : '',
          n.flatShading ? '#define FLAT_SHADED' : '',
          n.doubleSided ? '#define DOUBLE_SIDED' : '',
          n.flipSided ? '#define FLIP_SIDED' : '',
          n.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
          n.shadowMapEnabled ? '#define ' + l : '',
          n.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
          n.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',
          n.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? '#define USE_LOGDEPTHBUF_EXT'
            : '',
          (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod
            ? '#define TEXTURE_LOD_EXT'
            : '',
          'uniform mat4 viewMatrix;',
          'uniform vec3 cameraPosition;',
          'uniform bool isOrthographic;',
          0 !== n.toneMapping ? '#define TONE_MAPPING' : '',
          0 !== n.toneMapping ? yn.tonemapping_pars_fragment : '',
          0 !== n.toneMapping ? Bi('toneMapping', n.toneMapping) : '',
          n.dithering ? '#define DITHERING' : '',
          yn.encodings_pars_fragment,
          n.map ? zi('mapTexelToLinear', n.mapEncoding) : '',
          n.matcap ? zi('matcapTexelToLinear', n.matcapEncoding) : '',
          n.envMap ? zi('envMapTexelToLinear', n.envMapEncoding) : '',
          n.emissiveMap ? zi('emissiveMapTexelToLinear', n.emissiveMapEncoding) : '',
          n.lightMap ? zi('lightMapTexelToLinear', n.lightMapEncoding) : '',
          Hi('linearToOutputTexel', n.outputEncoding),
          n.depthPacking ? '#define DEPTH_PACKING ' + n.depthPacking : '',
          '\n',
        ]
          .filter(Fi)
          .join('\n'))),
      (a = Vi(a)),
      (a = Ui(a, n)),
      (a = Gi(a, n)),
      (o = Vi(o)),
      (o = Ui(o, n)),
      (o = Gi(o, n)),
      (a = Xi(a)),
      (o = Xi(o)),
      n.isWebGL2 &&
        !0 !== n.isRawShaderMaterial &&
        ((y = '#version 300 es\n'),
        (g =
          ['#define attribute in', '#define varying out', '#define texture2D texture'].join('\n') +
          '\n' +
          g),
        (v =
          [
            '#define varying in',
            n.glslVersion === T ? '' : 'out highp vec4 pc_fragColor;',
            n.glslVersion === T ? '' : '#define gl_FragColor pc_fragColor',
            '#define gl_FragDepthEXT gl_FragDepth',
            '#define texture2D texture',
            '#define textureCube texture',
            '#define texture2DProj textureProj',
            '#define texture2DLodEXT textureLod',
            '#define texture2DProjLodEXT textureProjLod',
            '#define textureCubeLodEXT textureLod',
            '#define texture2DGradEXT textureGrad',
            '#define texture2DProjGradEXT textureProjGrad',
            '#define textureCubeGradEXT textureGrad',
          ].join('\n') +
          '\n' +
          v))
    const x = y + v + o,
      _ = Di(r, 35633, y + g + a),
      b = Di(r, 35632, x)
    if (
      (r.attachShader(m, _),
      r.attachShader(m, b),
      void 0 !== n.index0AttributeName
        ? r.bindAttribLocation(m, 0, n.index0AttributeName)
        : !0 === n.morphTargets && r.bindAttribLocation(m, 0, 'position'),
      r.linkProgram(m),
      t.debug.checkShaderErrors)
    ) {
      const t = r.getProgramInfoLog(m).trim(),
        e = r.getShaderInfoLog(_).trim(),
        n = r.getShaderInfoLog(b).trim()
      let i = !0,
        s = !0
      if (!1 === r.getProgramParameter(m, 35714)) {
        i = !1
        const e = Oi(r, _, 'vertex'),
          n = Oi(r, b, 'fragment')
        console.error(
          'THREE.WebGLProgram: shader error: ',
          r.getError(),
          '35715',
          r.getProgramParameter(m, 35715),
          'gl.getProgramInfoLog',
          t,
          e,
          n
        )
      } else
        '' !== t
          ? console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', t)
          : ('' !== e && '' !== n) || (s = !1)
      s &&
        (this.diagnostics = {
          runnable: i,
          programLog: t,
          vertexShader: { log: e, prefix: g },
          fragmentShader: { log: n, prefix: v },
        })
    }
    let w, M
    return (
      r.deleteShader(_),
      r.deleteShader(b),
      (this.getUniforms = function () {
        return void 0 === w && (w = new Ci(r, m)), w
      }),
      (this.getAttributes = function () {
        return (
          void 0 === M &&
            (M = (function (t, e) {
              const n = {},
                i = t.getProgramParameter(e, 35721)
              for (let r = 0; r < i; r++) {
                const i = t.getActiveAttrib(e, r).name
                n[i] = t.getAttribLocation(e, i)
              }
              return n
            })(r, m)),
          M
        )
      }),
      (this.destroy = function () {
        i.releaseStatesOfProgram(this), r.deleteProgram(m), (this.program = void 0)
      }),
      (this.name = n.shaderName),
      (this.id = Ii++),
      (this.cacheKey = e),
      (this.usedTimes = 1),
      (this.program = m),
      (this.vertexShader = _),
      (this.fragmentShader = b),
      this
    )
  }
  function Ki(t, e, n, i, r, s) {
    const a = [],
      o = i.isWebGL2,
      l = i.logarithmicDepthBuffer,
      c = i.floatVertexTextures,
      h = i.maxVertexUniforms,
      u = i.vertexTextures
    let d = i.precision
    const p = {
        MeshDepthMaterial: 'depth',
        MeshDistanceMaterial: 'distanceRGBA',
        MeshNormalMaterial: 'normal',
        MeshBasicMaterial: 'basic',
        MeshLambertMaterial: 'lambert',
        MeshPhongMaterial: 'phong',
        MeshToonMaterial: 'toon',
        MeshStandardMaterial: 'physical',
        MeshPhysicalMaterial: 'physical',
        MeshMatcapMaterial: 'matcap',
        LineBasicMaterial: 'basic',
        LineDashedMaterial: 'dashed',
        PointsMaterial: 'points',
        ShadowMaterial: 'shadow',
        SpriteMaterial: 'sprite',
      },
      f = [
        'precision',
        'isWebGL2',
        'supportsVertexTextures',
        'outputEncoding',
        'instancing',
        'instancingColor',
        'map',
        'mapEncoding',
        'matcap',
        'matcapEncoding',
        'envMap',
        'envMapMode',
        'envMapEncoding',
        'envMapCubeUV',
        'lightMap',
        'lightMapEncoding',
        'aoMap',
        'emissiveMap',
        'emissiveMapEncoding',
        'bumpMap',
        'normalMap',
        'objectSpaceNormalMap',
        'tangentSpaceNormalMap',
        'clearcoatMap',
        'clearcoatRoughnessMap',
        'clearcoatNormalMap',
        'displacementMap',
        'specularMap',
        'roughnessMap',
        'metalnessMap',
        'gradientMap',
        'alphaMap',
        'combine',
        'vertexColors',
        'vertexTangents',
        'vertexUvs',
        'uvsVertexOnly',
        'fog',
        'useFog',
        'fogExp2',
        'flatShading',
        'sizeAttenuation',
        'logarithmicDepthBuffer',
        'skinning',
        'maxBones',
        'useVertexTexture',
        'morphTargets',
        'morphNormals',
        'maxMorphTargets',
        'maxMorphNormals',
        'premultipliedAlpha',
        'numDirLights',
        'numPointLights',
        'numSpotLights',
        'numHemiLights',
        'numRectAreaLights',
        'numDirLightShadows',
        'numPointLightShadows',
        'numSpotLightShadows',
        'shadowMapEnabled',
        'shadowMapType',
        'toneMapping',
        'physicallyCorrectLights',
        'alphaTest',
        'doubleSided',
        'flipSided',
        'numClippingPlanes',
        'numClipIntersection',
        'depthPacking',
        'dithering',
        'sheen',
        'transmissionMap',
      ]
    function m(t) {
      let e
      return (
        t && t.isTexture
          ? (e = t.encoding)
          : t && t.isWebGLRenderTarget
          ? (console.warn(
              "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."
            ),
            (e = t.texture.encoding))
          : (e = w),
        e
      )
    }
    return {
      getParameters: function (r, a, f, g, v) {
        const y = g.fog,
          x = r.isMeshStandardMaterial ? g.environment : null,
          _ = e.get(r.envMap || x),
          b = p[r.type],
          w = v.isSkinnedMesh
            ? (function (t) {
                const e = t.skeleton.bones
                if (c) return 1024
                {
                  const t = h,
                    n = Math.floor((t - 20) / 4),
                    i = Math.min(n, e.length)
                  return i < e.length
                    ? (console.warn(
                        'THREE.WebGLRenderer: Skeleton has ' +
                          e.length +
                          ' bones. This GPU supports ' +
                          i +
                          '.'
                      ),
                      0)
                    : i
                }
              })(v)
            : 0
        let M, S
        if (
          (null !== r.precision &&
            ((d = i.getMaxPrecision(r.precision)),
            d !== r.precision &&
              console.warn(
                'THREE.WebGLProgram.getParameters:',
                r.precision,
                'not supported, using',
                d,
                'instead.'
              )),
          b)
        ) {
          const t = _n[b]
          ;(M = t.vertexShader), (S = t.fragmentShader)
        } else (M = r.vertexShader), (S = r.fragmentShader)
        const E = t.getRenderTarget()
        return {
          isWebGL2: o,
          shaderID: b,
          shaderName: r.type,
          vertexShader: M,
          fragmentShader: S,
          defines: r.defines,
          isRawShaderMaterial: !0 === r.isRawShaderMaterial,
          glslVersion: r.glslVersion,
          precision: d,
          instancing: !0 === v.isInstancedMesh,
          instancingColor: !0 === v.isInstancedMesh && null !== v.instanceColor,
          supportsVertexTextures: u,
          outputEncoding: null !== E ? m(E.texture) : t.outputEncoding,
          map: !!r.map,
          mapEncoding: m(r.map),
          matcap: !!r.matcap,
          matcapEncoding: m(r.matcap),
          envMap: !!_,
          envMapMode: _ && _.mapping,
          envMapEncoding: m(_),
          envMapCubeUV: !!_ && (306 === _.mapping || 307 === _.mapping),
          lightMap: !!r.lightMap,
          lightMapEncoding: m(r.lightMap),
          aoMap: !!r.aoMap,
          emissiveMap: !!r.emissiveMap,
          emissiveMapEncoding: m(r.emissiveMap),
          bumpMap: !!r.bumpMap,
          normalMap: !!r.normalMap,
          objectSpaceNormalMap: 1 === r.normalMapType,
          tangentSpaceNormalMap: 0 === r.normalMapType,
          clearcoatMap: !!r.clearcoatMap,
          clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
          clearcoatNormalMap: !!r.clearcoatNormalMap,
          displacementMap: !!r.displacementMap,
          roughnessMap: !!r.roughnessMap,
          metalnessMap: !!r.metalnessMap,
          specularMap: !!r.specularMap,
          alphaMap: !!r.alphaMap,
          gradientMap: !!r.gradientMap,
          sheen: !!r.sheen,
          transmissionMap: !!r.transmissionMap,
          combine: r.combine,
          vertexTangents: r.normalMap && r.vertexTangents,
          vertexColors: r.vertexColors,
          vertexUvs: !!(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatMap ||
            r.clearcoatRoughnessMap ||
            r.clearcoatNormalMap ||
            r.displacementMap ||
            r.transmissionMap
          ),
          uvsVertexOnly: !(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatNormalMap ||
            r.transmissionMap ||
            !r.displacementMap
          ),
          fog: !!y,
          useFog: r.fog,
          fogExp2: y && y.isFogExp2,
          flatShading: !!r.flatShading,
          sizeAttenuation: r.sizeAttenuation,
          logarithmicDepthBuffer: l,
          skinning: r.skinning && w > 0,
          maxBones: w,
          useVertexTexture: c,
          morphTargets: r.morphTargets,
          morphNormals: r.morphNormals,
          maxMorphTargets: t.maxMorphTargets,
          maxMorphNormals: t.maxMorphNormals,
          numDirLights: a.directional.length,
          numPointLights: a.point.length,
          numSpotLights: a.spot.length,
          numRectAreaLights: a.rectArea.length,
          numHemiLights: a.hemi.length,
          numDirLightShadows: a.directionalShadowMap.length,
          numPointLightShadows: a.pointShadowMap.length,
          numSpotLightShadows: a.spotShadowMap.length,
          numClippingPlanes: s.numPlanes,
          numClipIntersection: s.numIntersection,
          dithering: r.dithering,
          shadowMapEnabled: t.shadowMap.enabled && f.length > 0,
          shadowMapType: t.shadowMap.type,
          toneMapping: r.toneMapped ? t.toneMapping : 0,
          physicallyCorrectLights: t.physicallyCorrectLights,
          premultipliedAlpha: r.premultipliedAlpha,
          alphaTest: r.alphaTest,
          doubleSided: 2 === r.side,
          flipSided: 1 === r.side,
          depthPacking: void 0 !== r.depthPacking && r.depthPacking,
          index0AttributeName: r.index0AttributeName,
          extensionDerivatives: r.extensions && r.extensions.derivatives,
          extensionFragDepth: r.extensions && r.extensions.fragDepth,
          extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
          extensionShaderTextureLOD: r.extensions && r.extensions.shaderTextureLOD,
          rendererExtensionFragDepth: o || n.has('EXT_frag_depth'),
          rendererExtensionDrawBuffers: o || n.has('WEBGL_draw_buffers'),
          rendererExtensionShaderTextureLod: o || n.has('EXT_shader_texture_lod'),
          customProgramCacheKey: r.customProgramCacheKey(),
        }
      },
      getProgramCacheKey: function (e) {
        const n = []
        if (
          (e.shaderID ? n.push(e.shaderID) : (n.push(e.fragmentShader), n.push(e.vertexShader)),
          void 0 !== e.defines)
        )
          for (const t in e.defines) n.push(t), n.push(e.defines[t])
        if (!1 === e.isRawShaderMaterial) {
          for (let t = 0; t < f.length; t++) n.push(e[f[t]])
          n.push(t.outputEncoding), n.push(t.gammaFactor)
        }
        return n.push(e.customProgramCacheKey), n.join()
      },
      getUniforms: function (t) {
        const e = p[t.type]
        let n
        if (e) {
          const t = _n[e]
          n = nn.clone(t.uniforms)
        } else n = t.uniforms
        return n
      },
      acquireProgram: function (e, n) {
        let i
        for (let t = 0, e = a.length; t < e; t++) {
          const e = a[t]
          if (e.cacheKey === n) {
            ;(i = e), ++i.usedTimes
            break
          }
        }
        return void 0 === i && ((i = new Qi(t, n, e, r)), a.push(i)), i
      },
      releaseProgram: function (t) {
        if (0 == --t.usedTimes) {
          const e = a.indexOf(t)
          ;(a[e] = a[a.length - 1]), a.pop(), t.destroy()
        }
      },
      programs: a,
    }
  }
  function $i() {
    let t = new WeakMap()
    return {
      get: function (e) {
        let n = t.get(e)
        return void 0 === n && ((n = {}), t.set(e, n)), n
      },
      remove: function (e) {
        t.delete(e)
      },
      update: function (e, n, i) {
        t.get(e)[n] = i
      },
      dispose: function () {
        t = new WeakMap()
      },
    }
  }
  function tr(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.program !== e.program
      ? t.program.id - e.program.id
      : t.material.id !== e.material.id
      ? t.material.id - e.material.id
      : t.z !== e.z
      ? t.z - e.z
      : t.id - e.id
  }
  function er(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.z !== e.z
      ? e.z - t.z
      : t.id - e.id
  }
  function nr(t) {
    const e = []
    let n = 0
    const i = [],
      r = [],
      s = { id: -1 }
    function a(i, r, a, o, l, c) {
      let h = e[n]
      const u = t.get(a)
      return (
        void 0 === h
          ? ((h = {
              id: i.id,
              object: i,
              geometry: r,
              material: a,
              program: u.program || s,
              groupOrder: o,
              renderOrder: i.renderOrder,
              z: l,
              group: c,
            }),
            (e[n] = h))
          : ((h.id = i.id),
            (h.object = i),
            (h.geometry = r),
            (h.material = a),
            (h.program = u.program || s),
            (h.groupOrder = o),
            (h.renderOrder = i.renderOrder),
            (h.z = l),
            (h.group = c)),
        n++,
        h
      )
    }
    return {
      opaque: i,
      transparent: r,
      init: function () {
        ;(n = 0), (i.length = 0), (r.length = 0)
      },
      push: function (t, e, n, s, o, l) {
        const c = a(t, e, n, s, o, l)
        ;(!0 === n.transparent ? r : i).push(c)
      },
      unshift: function (t, e, n, s, o, l) {
        const c = a(t, e, n, s, o, l)
        ;(!0 === n.transparent ? r : i).unshift(c)
      },
      finish: function () {
        for (let t = n, i = e.length; t < i; t++) {
          const n = e[t]
          if (null === n.id) break
          ;(n.id = null),
            (n.object = null),
            (n.geometry = null),
            (n.material = null),
            (n.program = null),
            (n.group = null)
        }
      },
      sort: function (t, e) {
        i.length > 1 && i.sort(t || tr), r.length > 1 && r.sort(e || er)
      },
    }
  }
  function ir(t) {
    let e = new WeakMap()
    return {
      get: function (n, i) {
        let r
        return (
          !1 === e.has(n)
            ? ((r = new nr(t)), e.set(n, [r]))
            : i >= e.get(n).length
            ? ((r = new nr(t)), e.get(n).push(r))
            : (r = e.get(n)[i]),
          r
        )
      },
      dispose: function () {
        e = new WeakMap()
      },
    }
  }
  function rr() {
    const t = {}
    return {
      get: function (e) {
        if (void 0 !== t[e.id]) return t[e.id]
        let n
        switch (e.type) {
          case 'DirectionalLight':
            n = { direction: new G(), color: new he() }
            break
          case 'SpotLight':
            n = {
              position: new G(),
              direction: new G(),
              color: new he(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
            }
            break
          case 'PointLight':
            n = { position: new G(), color: new he(), distance: 0, decay: 0 }
            break
          case 'HemisphereLight':
            n = { direction: new G(), skyColor: new he(), groundColor: new he() }
            break
          case 'RectAreaLight':
            n = { color: new he(), position: new G(), halfWidth: new G(), halfHeight: new G() }
        }
        return (t[e.id] = n), n
      },
    }
  }
  let sr = 0
  function ar(t, e) {
    return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0)
  }
  function or(t, e) {
    const n = new rr(),
      i = (function () {
        const t = {}
        return {
          get: function (e) {
            if (void 0 !== t[e.id]) return t[e.id]
            let n
            switch (e.type) {
              case 'DirectionalLight':
              case 'SpotLight':
                n = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new C() }
                break
              case 'PointLight':
                n = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new C(),
                  shadowCameraNear: 1,
                  shadowCameraFar: 1e3,
                }
            }
            return (t[e.id] = n), n
          },
        }
      })(),
      r = {
        version: 0,
        hash: {
          directionalLength: -1,
          pointLength: -1,
          spotLength: -1,
          rectAreaLength: -1,
          hemiLength: -1,
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotShadow: [],
        spotShadowMap: [],
        spotShadowMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
      }
    for (let t = 0; t < 9; t++) r.probe.push(new G())
    const s = new G(),
      a = new mt(),
      o = new mt()
    return {
      setup: function (s) {
        let a = 0,
          o = 0,
          l = 0
        for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0)
        let c = 0,
          h = 0,
          u = 0,
          d = 0,
          p = 0,
          f = 0,
          m = 0,
          g = 0
        s.sort(ar)
        for (let t = 0, e = s.length; t < e; t++) {
          const e = s[t],
            v = e.color,
            y = e.intensity,
            x = e.distance,
            _ = e.shadow && e.shadow.map ? e.shadow.map.texture : null
          if (e.isAmbientLight) (a += v.r * y), (o += v.g * y), (l += v.b * y)
          else if (e.isLightProbe)
            for (let t = 0; t < 9; t++) r.probe[t].addScaledVector(e.sh.coefficients[t], y)
          else if (e.isDirectionalLight) {
            const t = n.get(e)
            if ((t.color.copy(e.color).multiplyScalar(e.intensity), e.castShadow)) {
              const t = e.shadow,
                n = i.get(e)
              ;(n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.directionalShadow[c] = n),
                (r.directionalShadowMap[c] = _),
                (r.directionalShadowMatrix[c] = e.shadow.matrix),
                f++
            }
            ;(r.directional[c] = t), c++
          } else if (e.isSpotLight) {
            const t = n.get(e)
            if (
              (t.position.setFromMatrixPosition(e.matrixWorld),
              t.color.copy(v).multiplyScalar(y),
              (t.distance = x),
              (t.coneCos = Math.cos(e.angle)),
              (t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra))),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e)
              ;(n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.spotShadow[u] = n),
                (r.spotShadowMap[u] = _),
                (r.spotShadowMatrix[u] = e.shadow.matrix),
                g++
            }
            ;(r.spot[u] = t), u++
          } else if (e.isRectAreaLight) {
            const t = n.get(e)
            t.color.copy(v).multiplyScalar(y),
              t.halfWidth.set(0.5 * e.width, 0, 0),
              t.halfHeight.set(0, 0.5 * e.height, 0),
              (r.rectArea[d] = t),
              d++
          } else if (e.isPointLight) {
            const t = n.get(e)
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity),
              (t.distance = e.distance),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e)
              ;(n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (n.shadowCameraNear = t.camera.near),
                (n.shadowCameraFar = t.camera.far),
                (r.pointShadow[h] = n),
                (r.pointShadowMap[h] = _),
                (r.pointShadowMatrix[h] = e.shadow.matrix),
                m++
            }
            ;(r.point[h] = t), h++
          } else if (e.isHemisphereLight) {
            const t = n.get(e)
            t.skyColor.copy(e.color).multiplyScalar(y),
              t.groundColor.copy(e.groundColor).multiplyScalar(y),
              (r.hemi[p] = t),
              p++
          }
        }
        d > 0 &&
          (e.isWebGL2 || !0 === t.has('OES_texture_float_linear')
            ? ((r.rectAreaLTC1 = xn.LTC_FLOAT_1), (r.rectAreaLTC2 = xn.LTC_FLOAT_2))
            : !0 === t.has('OES_texture_half_float_linear')
            ? ((r.rectAreaLTC1 = xn.LTC_HALF_1), (r.rectAreaLTC2 = xn.LTC_HALF_2))
            : console.error(
                'THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.'
              )),
          (r.ambient[0] = a),
          (r.ambient[1] = o),
          (r.ambient[2] = l)
        const v = r.hash
        ;(v.directionalLength === c &&
          v.pointLength === h &&
          v.spotLength === u &&
          v.rectAreaLength === d &&
          v.hemiLength === p &&
          v.numDirectionalShadows === f &&
          v.numPointShadows === m &&
          v.numSpotShadows === g) ||
          ((r.directional.length = c),
          (r.spot.length = u),
          (r.rectArea.length = d),
          (r.point.length = h),
          (r.hemi.length = p),
          (r.directionalShadow.length = f),
          (r.directionalShadowMap.length = f),
          (r.pointShadow.length = m),
          (r.pointShadowMap.length = m),
          (r.spotShadow.length = g),
          (r.spotShadowMap.length = g),
          (r.directionalShadowMatrix.length = f),
          (r.pointShadowMatrix.length = m),
          (r.spotShadowMatrix.length = g),
          (v.directionalLength = c),
          (v.pointLength = h),
          (v.spotLength = u),
          (v.rectAreaLength = d),
          (v.hemiLength = p),
          (v.numDirectionalShadows = f),
          (v.numPointShadows = m),
          (v.numSpotShadows = g),
          (r.version = sr++))
      },
      setupView: function (t, e) {
        let n = 0,
          i = 0,
          l = 0,
          c = 0,
          h = 0
        const u = e.matrixWorldInverse
        for (let e = 0, d = t.length; e < d; e++) {
          const d = t[e]
          if (d.isDirectionalLight) {
            const t = r.directional[n]
            t.direction.setFromMatrixPosition(d.matrixWorld),
              s.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(u),
              n++
          } else if (d.isSpotLight) {
            const t = r.spot[l]
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              t.direction.setFromMatrixPosition(d.matrixWorld),
              s.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(s),
              t.direction.transformDirection(u),
              l++
          } else if (d.isRectAreaLight) {
            const t = r.rectArea[c]
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              o.identity(),
              a.copy(d.matrixWorld),
              a.premultiply(u),
              o.extractRotation(a),
              t.halfWidth.set(0.5 * d.width, 0, 0),
              t.halfHeight.set(0, 0.5 * d.height, 0),
              t.halfWidth.applyMatrix4(o),
              t.halfHeight.applyMatrix4(o),
              c++
          } else if (d.isPointLight) {
            const t = r.point[i]
            t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), i++
          } else if (d.isHemisphereLight) {
            const t = r.hemi[h]
            t.direction.setFromMatrixPosition(d.matrixWorld),
              t.direction.transformDirection(u),
              t.direction.normalize(),
              h++
          }
        }
      },
      state: r,
    }
  }
  function lr(t, e) {
    const n = new or(t, e),
      i = [],
      r = []
    return {
      init: function () {
        ;(i.length = 0), (r.length = 0)
      },
      state: { lightsArray: i, shadowsArray: r, lights: n },
      setupLights: function () {
        n.setup(i)
      },
      setupLightsView: function (t) {
        n.setupView(i, t)
      },
      pushLight: function (t) {
        i.push(t)
      },
      pushShadow: function (t) {
        r.push(t)
      },
    }
  }
  function cr(t, e) {
    let n = new WeakMap()
    return {
      get: function (i, r = 0) {
        let s
        return (
          !1 === n.has(i)
            ? ((s = new lr(t, e)), n.set(i, [s]))
            : r >= n.get(i).length
            ? ((s = new lr(t, e)), n.get(i).push(s))
            : (s = n.get(i)[r]),
          s
        )
      },
      dispose: function () {
        n = new WeakMap()
      },
    }
  }
  class hr extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshDepthMaterial'),
        (this.depthPacking = 3200),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.depthPacking = t.depthPacking),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        this
      )
    }
  }
  hr.prototype.isMeshDepthMaterial = !0
  class ur extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshDistanceMaterial'),
        (this.referencePosition = new G()),
        (this.nearDistance = 1),
        (this.farDistance = 1e3),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.fog = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.referencePosition.copy(t.referencePosition),
        (this.nearDistance = t.nearDistance),
        (this.farDistance = t.farDistance),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        this
      )
    }
  }
  function dr(t, e, n) {
    let i = new fn()
    const a = new C(),
      o = new C(),
      l = new B(),
      c = [],
      h = [],
      u = {},
      d = { 0: 1, 1: 0, 2: 2 },
      f = new rn({
        defines: { SAMPLE_RATE: 2 / 8, HALF_SAMPLE_RATE: 1 / 8 },
        uniforms: {
          shadow_pass: { value: null },
          resolution: { value: new C() },
          radius: { value: 4 },
        },
        vertexShader: 'void main() {\n\tgl_Position = vec4( position, 1.0 );\n}',
        fragmentShader:
          'uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}',
      }),
      m = f.clone()
    m.defines.HORIZONTAL_PASS = 1
    const g = new Ie()
    g.setAttribute('position', new fe(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3))
    const v = new Qe(g, f),
      y = this
    function x(n, i) {
      const r = e.update(v)
      ;(f.uniforms.shadow_pass.value = n.map.texture),
        (f.uniforms.resolution.value = n.mapSize),
        (f.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.mapPass),
        t.clear(),
        t.renderBufferDirect(i, null, r, f, v, null),
        (m.uniforms.shadow_pass.value = n.mapPass.texture),
        (m.uniforms.resolution.value = n.mapSize),
        (m.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.map),
        t.clear(),
        t.renderBufferDirect(i, null, r, m, v, null)
    }
    function _(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2)
      let r = c[i]
      return (
        void 0 === r &&
          ((r = new hr({ depthPacking: 3201, morphTargets: t, skinning: e })), (c[i] = r)),
        r
      )
    }
    function b(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2)
      let r = h[i]
      return void 0 === r && ((r = new ur({ morphTargets: t, skinning: e })), (h[i] = r)), r
    }
    function w(e, n, i, r, s, a, o) {
      let l = null,
        c = _,
        h = e.customDepthMaterial
      if ((!0 === r.isPointLight && ((c = b), (h = e.customDistanceMaterial)), void 0 === h)) {
        let t = !1
        !0 === i.morphTargets &&
          (t =
            n.morphAttributes &&
            n.morphAttributes.position &&
            n.morphAttributes.position.length > 0)
        let r = !1
        !0 === e.isSkinnedMesh &&
          (!0 === i.skinning
            ? (r = !0)
            : console.warn(
                'THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:',
                e
              )),
          (l = c(t, r, !0 === e.isInstancedMesh))
      } else l = h
      if (t.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length) {
        const t = l.uuid,
          e = i.uuid
        let n = u[t]
        void 0 === n && ((n = {}), (u[t] = n))
        let r = n[e]
        void 0 === r && ((r = l.clone()), (n[e] = r)), (l = r)
      }
      return (
        (l.visible = i.visible),
        (l.wireframe = i.wireframe),
        (l.side =
          3 === o
            ? null !== i.shadowSide
              ? i.shadowSide
              : i.side
            : null !== i.shadowSide
            ? i.shadowSide
            : d[i.side]),
        (l.clipShadows = i.clipShadows),
        (l.clippingPlanes = i.clippingPlanes),
        (l.clipIntersection = i.clipIntersection),
        (l.wireframeLinewidth = i.wireframeLinewidth),
        (l.linewidth = i.linewidth),
        !0 === r.isPointLight &&
          !0 === l.isMeshDistanceMaterial &&
          (l.referencePosition.setFromMatrixPosition(r.matrixWorld),
          (l.nearDistance = s),
          (l.farDistance = a)),
        l
      )
    }
    function M(n, r, s, a, o) {
      if (!1 === n.visible) return
      if (
        n.layers.test(r.layers) &&
        (n.isMesh || n.isLine || n.isPoints) &&
        (n.castShadow || (n.receiveShadow && 3 === o)) &&
        (!n.frustumCulled || i.intersectsObject(n))
      ) {
        n.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, n.matrixWorld)
        const i = e.update(n),
          r = n.material
        if (Array.isArray(r)) {
          const e = i.groups
          for (let l = 0, c = e.length; l < c; l++) {
            const c = e[l],
              h = r[c.materialIndex]
            if (h && h.visible) {
              const e = w(n, i, h, a, s.near, s.far, o)
              t.renderBufferDirect(s, null, i, e, n, c)
            }
          }
        } else if (r.visible) {
          const e = w(n, i, r, a, s.near, s.far, o)
          t.renderBufferDirect(s, null, i, e, n, null)
        }
      }
      const l = n.children
      for (let t = 0, e = l.length; t < e; t++) M(l[t], r, s, a, o)
    }
    ;(this.enabled = !1),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this.type = 1),
      (this.render = function (e, c, h) {
        if (!1 === y.enabled) return
        if (!1 === y.autoUpdate && !1 === y.needsUpdate) return
        if (0 === e.length) return
        const u = t.getRenderTarget(),
          d = t.getActiveCubeFace(),
          f = t.getActiveMipmapLevel(),
          m = t.state
        m.setBlending(0),
          m.buffers.color.setClear(1, 1, 1, 1),
          m.buffers.depth.setTest(!0),
          m.setScissorTest(!1)
        for (let u = 0, d = e.length; u < d; u++) {
          const d = e[u],
            f = d.shadow
          if (void 0 === f) {
            console.warn('THREE.WebGLShadowMap:', d, 'has no shadow.')
            continue
          }
          if (!1 === f.autoUpdate && !1 === f.needsUpdate) continue
          a.copy(f.mapSize)
          const g = f.getFrameExtents()
          if (
            (a.multiply(g),
            o.copy(f.mapSize),
            (a.x > n || a.y > n) &&
              (a.x > n && ((o.x = Math.floor(n / g.x)), (a.x = o.x * g.x), (f.mapSize.x = o.x)),
              a.y > n && ((o.y = Math.floor(n / g.y)), (a.y = o.y * g.y), (f.mapSize.y = o.y))),
            null === f.map && !f.isPointLightShadow && 3 === this.type)
          ) {
            const t = { minFilter: s, magFilter: s, format: p }
            ;(f.map = new F(a.x, a.y, t)),
              (f.map.texture.name = d.name + '.shadowMap'),
              (f.mapPass = new F(a.x, a.y, t)),
              f.camera.updateProjectionMatrix()
          }
          if (null === f.map) {
            const t = { minFilter: r, magFilter: r, format: p }
            ;(f.map = new F(a.x, a.y, t)),
              (f.map.texture.name = d.name + '.shadowMap'),
              f.camera.updateProjectionMatrix()
          }
          t.setRenderTarget(f.map), t.clear()
          const v = f.getViewportCount()
          for (let t = 0; t < v; t++) {
            const e = f.getViewport(t)
            l.set(o.x * e.x, o.y * e.y, o.x * e.z, o.y * e.w),
              m.viewport(l),
              f.updateMatrices(d, t),
              (i = f.getFrustum()),
              M(c, h, f.camera, d, this.type)
          }
          f.isPointLightShadow || 3 !== this.type || x(f, h), (f.needsUpdate = !1)
        }
        ;(y.needsUpdate = !1), t.setRenderTarget(u, d, f)
      })
  }
  function pr(e, n, i) {
    const r = i.isWebGL2,
      s = new (function () {
        let t = !1
        const n = new B()
        let i = null
        const r = new B(0, 0, 0, 0)
        return {
          setMask: function (n) {
            i === n || t || (e.colorMask(n, n, n, n), (i = n))
          },
          setLocked: function (e) {
            t = e
          },
          setClear: function (t, i, s, a, o) {
            !0 === o && ((t *= a), (i *= a), (s *= a)),
              n.set(t, i, s, a),
              !1 === r.equals(n) && (e.clearColor(t, i, s, a), r.copy(n))
          },
          reset: function () {
            ;(t = !1), (i = null), r.set(-1, 0, 0, 0)
          },
        }
      })(),
      a = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null
        return {
          setTest: function (t) {
            t ? N(2929) : O(2929)
          },
          setMask: function (i) {
            n === i || t || (e.depthMask(i), (n = i))
          },
          setFunc: function (t) {
            if (i !== t) {
              if (t)
                switch (t) {
                  case 0:
                    e.depthFunc(512)
                    break
                  case 1:
                    e.depthFunc(519)
                    break
                  case 2:
                    e.depthFunc(513)
                    break
                  case 3:
                  default:
                    e.depthFunc(515)
                    break
                  case 4:
                    e.depthFunc(514)
                    break
                  case 5:
                    e.depthFunc(518)
                    break
                  case 6:
                    e.depthFunc(516)
                    break
                  case 7:
                    e.depthFunc(517)
                }
              else e.depthFunc(515)
              i = t
            }
          },
          setLocked: function (e) {
            t = e
          },
          setClear: function (t) {
            r !== t && (e.clearDepth(t), (r = t))
          },
          reset: function () {
            ;(t = !1), (n = null), (i = null), (r = null)
          },
        }
      })(),
      o = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null,
          s = null,
          a = null,
          o = null,
          l = null,
          c = null
        return {
          setTest: function (e) {
            t || (e ? N(2960) : O(2960))
          },
          setMask: function (i) {
            n === i || t || (e.stencilMask(i), (n = i))
          },
          setFunc: function (t, n, a) {
            ;(i === t && r === n && s === a) || (e.stencilFunc(t, n, a), (i = t), (r = n), (s = a))
          },
          setOp: function (t, n, i) {
            ;(a === t && o === n && l === i) || (e.stencilOp(t, n, i), (a = t), (o = n), (l = i))
          },
          setLocked: function (e) {
            t = e
          },
          setClear: function (t) {
            c !== t && (e.clearStencil(t), (c = t))
          },
          reset: function () {
            ;(t = !1),
              (n = null),
              (i = null),
              (r = null),
              (s = null),
              (a = null),
              (o = null),
              (l = null),
              (c = null)
          },
        }
      })()
    let l = {},
      c = null,
      h = !1,
      u = null,
      d = null,
      p = null,
      f = null,
      m = null,
      g = null,
      v = null,
      y = !1,
      x = null,
      _ = null,
      b = null,
      w = null,
      M = null
    const S = e.getParameter(35661)
    let E = !1,
      T = 0
    const L = e.getParameter(7938)
    ;-1 !== L.indexOf('WebGL')
      ? ((T = parseFloat(/^WebGL (\d)/.exec(L)[1])), (E = T >= 1))
      : -1 !== L.indexOf('OpenGL ES') &&
        ((T = parseFloat(/^OpenGL ES (\d)/.exec(L)[1])), (E = T >= 2))
    let A = null,
      R = {}
    const P = new B(),
      C = new B()
    function D(t, n, i) {
      const r = new Uint8Array(4),
        s = e.createTexture()
      e.bindTexture(t, s), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728)
      for (let t = 0; t < i; t++) e.texImage2D(n + t, 0, 6408, 1, 1, 0, 6408, 5121, r)
      return s
    }
    const I = {}
    function N(t) {
      !0 !== l[t] && (e.enable(t), (l[t] = !0))
    }
    function O(t) {
      !1 !== l[t] && (e.disable(t), (l[t] = !1))
    }
    ;(I[3553] = D(3553, 3553, 1)),
      (I[34067] = D(34067, 34069, 6)),
      s.setClear(0, 0, 0, 1),
      a.setClear(1),
      o.setClear(0),
      N(2929),
      a.setFunc(3),
      U(!1),
      G(1),
      N(2884),
      F(0)
    const z = { [t]: 32774, 101: 32778, 102: 32779 }
    if (r) (z[103] = 32775), (z[104] = 32776)
    else {
      const t = n.get('EXT_blend_minmax')
      null !== t && ((z[103] = t.MIN_EXT), (z[104] = t.MAX_EXT))
    }
    const H = {
      200: 0,
      201: 1,
      202: 768,
      204: 770,
      210: 776,
      208: 774,
      206: 772,
      203: 769,
      205: 771,
      209: 775,
      207: 773,
    }
    function F(n, i, r, s, a, o, l, c) {
      if (0 !== n) {
        if ((!1 === h && (N(3042), (h = !0)), 5 === n))
          (a = a || i),
            (o = o || r),
            (l = l || s),
            (i === d && a === m) || (e.blendEquationSeparate(z[i], z[a]), (d = i), (m = a)),
            (r === p && s === f && o === g && l === v) ||
              (e.blendFuncSeparate(H[r], H[s], H[o], H[l]), (p = r), (f = s), (g = o), (v = l)),
            (u = n),
            (y = null)
        else if (n !== u || c !== y) {
          if (((d === t && m === t) || (e.blendEquation(32774), (d = t), (m = t)), c))
            switch (n) {
              case 1:
                e.blendFuncSeparate(1, 771, 1, 771)
                break
              case 2:
                e.blendFunc(1, 1)
                break
              case 3:
                e.blendFuncSeparate(0, 0, 769, 771)
                break
              case 4:
                e.blendFuncSeparate(0, 768, 0, 770)
                break
              default:
                console.error('THREE.WebGLState: Invalid blending: ', n)
            }
          else
            switch (n) {
              case 1:
                e.blendFuncSeparate(770, 771, 1, 771)
                break
              case 2:
                e.blendFunc(770, 1)
                break
              case 3:
                e.blendFunc(0, 769)
                break
              case 4:
                e.blendFunc(0, 768)
                break
              default:
                console.error('THREE.WebGLState: Invalid blending: ', n)
            }
          ;(p = null), (f = null), (g = null), (v = null), (u = n), (y = c)
        }
      } else !0 === h && (O(3042), (h = !1))
    }
    function U(t) {
      x !== t && (t ? e.frontFace(2304) : e.frontFace(2305), (x = t))
    }
    function G(t) {
      0 !== t
        ? (N(2884),
          t !== _ && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032)))
        : O(2884),
        (_ = t)
    }
    function k(t, n, i) {
      t ? (N(32823), (w === n && M === i) || (e.polygonOffset(n, i), (w = n), (M = i))) : O(32823)
    }
    function V(t) {
      void 0 === t && (t = 33984 + S - 1), A !== t && (e.activeTexture(t), (A = t))
    }
    return {
      buffers: { color: s, depth: a, stencil: o },
      enable: N,
      disable: O,
      useProgram: function (t) {
        return c !== t && (e.useProgram(t), (c = t), !0)
      },
      setBlending: F,
      setMaterial: function (t, e) {
        2 === t.side ? O(2884) : N(2884)
        let n = 1 === t.side
        e && (n = !n),
          U(n),
          1 === t.blending && !1 === t.transparent
            ? F(0)
            : F(
                t.blending,
                t.blendEquation,
                t.blendSrc,
                t.blendDst,
                t.blendEquationAlpha,
                t.blendSrcAlpha,
                t.blendDstAlpha,
                t.premultipliedAlpha
              ),
          a.setFunc(t.depthFunc),
          a.setTest(t.depthTest),
          a.setMask(t.depthWrite),
          s.setMask(t.colorWrite)
        const i = t.stencilWrite
        o.setTest(i),
          i &&
            (o.setMask(t.stencilWriteMask),
            o.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask),
            o.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)),
          k(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
      },
      setFlipSided: U,
      setCullFace: G,
      setLineWidth: function (t) {
        t !== b && (E && e.lineWidth(t), (b = t))
      },
      setPolygonOffset: k,
      setScissorTest: function (t) {
        t ? N(3089) : O(3089)
      },
      activeTexture: V,
      bindTexture: function (t, n) {
        null === A && V()
        let i = R[A]
        void 0 === i && ((i = { type: void 0, texture: void 0 }), (R[A] = i)),
          (i.type === t && i.texture === n) ||
            (e.bindTexture(t, n || I[t]), (i.type = t), (i.texture = n))
      },
      unbindTexture: function () {
        const t = R[A]
        void 0 !== t &&
          void 0 !== t.type &&
          (e.bindTexture(t.type, null), (t.type = void 0), (t.texture = void 0))
      },
      compressedTexImage2D: function () {
        try {
          e.compressedTexImage2D.apply(e, arguments)
        } catch (t) {
          console.error('THREE.WebGLState:', t)
        }
      },
      texImage2D: function () {
        try {
          e.texImage2D.apply(e, arguments)
        } catch (t) {
          console.error('THREE.WebGLState:', t)
        }
      },
      texImage3D: function () {
        try {
          e.texImage3D.apply(e, arguments)
        } catch (t) {
          console.error('THREE.WebGLState:', t)
        }
      },
      scissor: function (t) {
        !1 === P.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), P.copy(t))
      },
      viewport: function (t) {
        !1 === C.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), C.copy(t))
      },
      reset: function () {
        e.disable(3042),
          e.disable(2884),
          e.disable(2929),
          e.disable(32823),
          e.disable(3089),
          e.disable(2960),
          e.blendEquation(32774),
          e.blendFunc(1, 0),
          e.blendFuncSeparate(1, 0, 1, 0),
          e.colorMask(!0, !0, !0, !0),
          e.clearColor(0, 0, 0, 0),
          e.depthMask(!0),
          e.depthFunc(513),
          e.clearDepth(1),
          e.stencilMask(4294967295),
          e.stencilFunc(519, 0, 4294967295),
          e.stencilOp(7680, 7680, 7680),
          e.clearStencil(0),
          e.cullFace(1029),
          e.frontFace(2305),
          e.polygonOffset(0, 0),
          e.activeTexture(33984),
          e.useProgram(null),
          e.lineWidth(1),
          e.scissor(0, 0, e.canvas.width, e.canvas.height),
          e.viewport(0, 0, e.canvas.width, e.canvas.height),
          (l = {}),
          (A = null),
          (R = {}),
          (c = null),
          (h = !1),
          (u = null),
          (d = null),
          (p = null),
          (f = null),
          (m = null),
          (g = null),
          (v = null),
          (y = !1),
          (x = null),
          (_ = null),
          (b = null),
          (w = null),
          (M = null),
          s.reset(),
          a.reset(),
          o.reset()
      },
    }
  }
  function fr(t, g, v, y, x, _, b) {
    const w = x.isWebGL2,
      M = x.maxTextures,
      S = x.maxCubemapSize,
      E = x.maxTextureSize,
      T = x.maxSamples,
      L = new WeakMap()
    let A,
      R = !1
    try {
      R =
        'undefined' != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext('2d')
    } catch (t) {}
    function C(t, e) {
      return R
        ? new OffscreenCanvas(t, e)
        : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
    }
    function D(t, e, n, i) {
      let r = 1
      if (
        ((t.width > i || t.height > i) && (r = i / Math.max(t.width, t.height)), r < 1 || !0 === e)
      ) {
        if (
          ('undefined' != typeof HTMLImageElement && t instanceof HTMLImageElement) ||
          ('undefined' != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement) ||
          ('undefined' != typeof ImageBitmap && t instanceof ImageBitmap)
        ) {
          const i = e ? P.floorPowerOfTwo : Math.floor,
            s = i(r * t.width),
            a = i(r * t.height)
          void 0 === A && (A = C(s, a))
          const o = n ? C(s, a) : A
          return (
            (o.width = s),
            (o.height = a),
            o.getContext('2d').drawImage(t, 0, 0, s, a),
            console.warn(
              'THREE.WebGLRenderer: Texture has been resized from (' +
                t.width +
                'x' +
                t.height +
                ') to (' +
                s +
                'x' +
                a +
                ').'
            ),
            o
          )
        }
        return (
          'data' in t &&
            console.warn(
              'THREE.WebGLRenderer: Image in DataTexture is too big (' +
                t.width +
                'x' +
                t.height +
                ').'
            ),
          t
        )
      }
      return t
    }
    function I(t) {
      return P.isPowerOfTwo(t.width) && P.isPowerOfTwo(t.height)
    }
    function N(t, e) {
      return t.generateMipmaps && e && t.minFilter !== r && t.minFilter !== s
    }
    function O(e, n, i, r) {
      t.generateMipmap(e), (y.get(n).__maxMipLevel = Math.log2(Math.max(i, r)))
    }
    function z(e, n, i) {
      if (!1 === w) return n
      if (null !== e) {
        if (void 0 !== t[e]) return t[e]
        console.warn(
          "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + e + "'"
        )
      }
      let r = n
      return (
        6403 === n &&
          (5126 === i && (r = 33326), 5131 === i && (r = 33325), 5121 === i && (r = 33321)),
        6407 === n &&
          (5126 === i && (r = 34837), 5131 === i && (r = 34843), 5121 === i && (r = 32849)),
        6408 === n &&
          (5126 === i && (r = 34836), 5131 === i && (r = 34842), 5121 === i && (r = 32856)),
        (33325 !== r && 33326 !== r && 34842 !== r && 34836 !== r) ||
          g.get('EXT_color_buffer_float'),
        r
      )
    }
    function H(t) {
      return t === r || 1004 === t || 1005 === t ? 9728 : 9729
    }
    function B(e) {
      const n = e.target
      n.removeEventListener('dispose', B),
        (function (e) {
          const n = y.get(e)
          void 0 !== n.__webglInit && (t.deleteTexture(n.__webglTexture), y.remove(e))
        })(n),
        n.isVideoTexture && L.delete(n),
        b.memory.textures--
    }
    function F(e) {
      const n = e.target
      n.removeEventListener('dispose', F),
        (function (e) {
          const n = e.texture,
            i = y.get(e),
            r = y.get(n)
          if (e) {
            if (
              (void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture),
              e.depthTexture && e.depthTexture.dispose(),
              e.isWebGLCubeRenderTarget)
            )
              for (let e = 0; e < 6; e++)
                t.deleteFramebuffer(i.__webglFramebuffer[e]),
                  i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer[e])
            else
              t.deleteFramebuffer(i.__webglFramebuffer),
                i.__webglDepthbuffer && t.deleteRenderbuffer(i.__webglDepthbuffer),
                i.__webglMultisampledFramebuffer &&
                  t.deleteFramebuffer(i.__webglMultisampledFramebuffer),
                i.__webglColorRenderbuffer && t.deleteRenderbuffer(i.__webglColorRenderbuffer),
                i.__webglDepthRenderbuffer && t.deleteRenderbuffer(i.__webglDepthRenderbuffer)
            y.remove(n), y.remove(e)
          }
        })(n),
        b.memory.textures--
    }
    let U = 0
    function G(t, e) {
      const n = y.get(t)
      if (
        (t.isVideoTexture &&
          (function (t) {
            const e = b.render.frame
            L.get(t) !== e && (L.set(t, e), t.update())
          })(t),
        t.version > 0 && n.__version !== t.version)
      ) {
        const i = t.image
        if (void 0 === i)
          console.warn('THREE.WebGLRenderer: Texture marked for update but image is undefined')
        else {
          if (!1 !== i.complete) return void X(n, t, e)
          console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete')
        }
      }
      v.activeTexture(33984 + e), v.bindTexture(3553, n.__webglTexture)
    }
    function k(e, n) {
      const i = y.get(e)
      e.version > 0 && i.__version !== e.version
        ? (function (e, n, i) {
            if (6 !== n.image.length) return
            q(e, n),
              v.activeTexture(33984 + i),
              v.bindTexture(34067, e.__webglTexture),
              t.pixelStorei(37440, n.flipY),
              t.pixelStorei(37441, n.premultiplyAlpha),
              t.pixelStorei(3317, n.unpackAlignment),
              t.pixelStorei(37443, 0)
            const r = n && (n.isCompressedTexture || n.image[0].isCompressedTexture),
              s = n.image[0] && n.image[0].isDataTexture,
              a = []
            for (let t = 0; t < 6; t++)
              a[t] = r || s ? (s ? n.image[t].image : n.image[t]) : D(n.image[t], !1, !0, S)
            const o = a[0],
              l = I(o) || w,
              c = _.convert(n.format),
              h = _.convert(n.type),
              u = z(n.internalFormat, c, h)
            let f
            if ((j(34067, n, l), r)) {
              for (let t = 0; t < 6; t++) {
                f = a[t].mipmaps
                for (let e = 0; e < f.length; e++) {
                  const i = f[e]
                  n.format !== p && n.format !== d
                    ? null !== c
                      ? v.compressedTexImage2D(34069 + t, e, u, i.width, i.height, 0, i.data)
                      : console.warn(
                          'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()'
                        )
                    : v.texImage2D(34069 + t, e, u, i.width, i.height, 0, c, h, i.data)
                }
              }
              e.__maxMipLevel = f.length - 1
            } else {
              f = n.mipmaps
              for (let t = 0; t < 6; t++)
                if (s) {
                  v.texImage2D(34069 + t, 0, u, a[t].width, a[t].height, 0, c, h, a[t].data)
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e].image[t].image
                    v.texImage2D(34069 + t, e + 1, u, n.width, n.height, 0, c, h, n.data)
                  }
                } else {
                  v.texImage2D(34069 + t, 0, u, c, h, a[t])
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e]
                    v.texImage2D(34069 + t, e + 1, u, c, h, n.image[t])
                  }
                }
              e.__maxMipLevel = f.length
            }
            N(n, l) && O(34067, n, o.width, o.height),
              (e.__version = n.version),
              n.onUpdate && n.onUpdate(n)
          })(i, e, n)
        : (v.activeTexture(33984 + n), v.bindTexture(34067, i.__webglTexture))
    }
    const V = { [e]: 10497, [n]: 33071, [i]: 33648 },
      W = { [r]: 9728, 1004: 9984, 1005: 9986, [s]: 9729, 1007: 9985, [a]: 9987 }
    function j(e, i, a) {
      if (
        (a
          ? (t.texParameteri(e, 10242, V[i.wrapS]),
            t.texParameteri(e, 10243, V[i.wrapT]),
            (32879 !== e && 35866 !== e) || t.texParameteri(e, 32882, V[i.wrapR]),
            t.texParameteri(e, 10240, W[i.magFilter]),
            t.texParameteri(e, 10241, W[i.minFilter]))
          : (t.texParameteri(e, 10242, 33071),
            t.texParameteri(e, 10243, 33071),
            (32879 !== e && 35866 !== e) || t.texParameteri(e, 32882, 33071),
            (i.wrapS === n && i.wrapT === n) ||
              console.warn(
                'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.'
              ),
            t.texParameteri(e, 10240, H(i.magFilter)),
            t.texParameteri(e, 10241, H(i.minFilter)),
            i.minFilter !== r &&
              i.minFilter !== s &&
              console.warn(
                'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.'
              )),
        !0 === g.has('EXT_texture_filter_anisotropic'))
      ) {
        const n = g.get('EXT_texture_filter_anisotropic')
        if (i.type === c && !1 === g.has('OES_texture_float_linear')) return
        if (!1 === w && i.type === h && !1 === g.has('OES_texture_half_float_linear')) return
        ;(i.anisotropy > 1 || y.get(i).__currentAnisotropy) &&
          (t.texParameterf(
            e,
            n.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(i.anisotropy, x.getMaxAnisotropy())
          ),
          (y.get(i).__currentAnisotropy = i.anisotropy))
      }
    }
    function q(e, n) {
      void 0 === e.__webglInit &&
        ((e.__webglInit = !0),
        n.addEventListener('dispose', B),
        (e.__webglTexture = t.createTexture()),
        b.memory.textures++)
    }
    function X(e, i, a) {
      let h = 3553
      i.isDataTexture2DArray && (h = 35866),
        i.isDataTexture3D && (h = 32879),
        q(e, i),
        v.activeTexture(33984 + a),
        v.bindTexture(h, e.__webglTexture),
        t.pixelStorei(37440, i.flipY),
        t.pixelStorei(37441, i.premultiplyAlpha),
        t.pixelStorei(3317, i.unpackAlignment),
        t.pixelStorei(37443, 0)
      const g =
          (function (t) {
            return (
              !w && (t.wrapS !== n || t.wrapT !== n || (t.minFilter !== r && t.minFilter !== s))
            )
          })(i) && !1 === I(i.image),
        y = D(i.image, g, !1, E),
        x = I(y) || w,
        b = _.convert(i.format)
      let M,
        S = _.convert(i.type),
        T = z(i.internalFormat, b, S)
      j(h, i, x)
      const L = i.mipmaps
      if (i.isDepthTexture)
        (T = 6402),
          w
            ? (T = i.type === c ? 36012 : i.type === l ? 33190 : i.type === u ? 35056 : 33189)
            : i.type === c &&
              console.error('WebGLRenderer: Floating point depth texture requires WebGL2.'),
          i.format === f &&
            6402 === T &&
            i.type !== o &&
            i.type !== l &&
            (console.warn(
              'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.'
            ),
            (i.type = o),
            (S = _.convert(i.type))),
          i.format === m &&
            6402 === T &&
            ((T = 34041),
            i.type !== u &&
              (console.warn(
                'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.'
              ),
              (i.type = u),
              (S = _.convert(i.type)))),
          v.texImage2D(3553, 0, T, y.width, y.height, 0, b, S, null)
      else if (i.isDataTexture)
        if (L.length > 0 && x) {
          for (let t = 0, e = L.length; t < e; t++)
            (M = L[t]), v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data)
          ;(i.generateMipmaps = !1), (e.__maxMipLevel = L.length - 1)
        } else v.texImage2D(3553, 0, T, y.width, y.height, 0, b, S, y.data), (e.__maxMipLevel = 0)
      else if (i.isCompressedTexture) {
        for (let t = 0, e = L.length; t < e; t++)
          (M = L[t]),
            i.format !== p && i.format !== d
              ? null !== b
                ? v.compressedTexImage2D(3553, t, T, M.width, M.height, 0, M.data)
                : console.warn(
                    'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()'
                  )
              : v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data)
        e.__maxMipLevel = L.length - 1
      } else if (i.isDataTexture2DArray)
        v.texImage3D(35866, 0, T, y.width, y.height, y.depth, 0, b, S, y.data),
          (e.__maxMipLevel = 0)
      else if (i.isDataTexture3D)
        v.texImage3D(32879, 0, T, y.width, y.height, y.depth, 0, b, S, y.data),
          (e.__maxMipLevel = 0)
      else if (L.length > 0 && x) {
        for (let t = 0, e = L.length; t < e; t++) (M = L[t]), v.texImage2D(3553, t, T, b, S, M)
        ;(i.generateMipmaps = !1), (e.__maxMipLevel = L.length - 1)
      } else v.texImage2D(3553, 0, T, b, S, y), (e.__maxMipLevel = 0)
      N(i, x) && O(h, i, y.width, y.height), (e.__version = i.version), i.onUpdate && i.onUpdate(i)
    }
    function Y(e, n, i, r) {
      const s = n.texture,
        a = _.convert(s.format),
        o = _.convert(s.type),
        l = z(s.internalFormat, a, o)
      32879 === r || 35866 === r
        ? v.texImage3D(r, 0, l, n.width, n.height, n.depth, 0, a, o, null)
        : v.texImage2D(r, 0, l, n.width, n.height, 0, a, o, null),
        t.bindFramebuffer(36160, e),
        t.framebufferTexture2D(36160, i, r, y.get(s).__webglTexture, 0),
        t.bindFramebuffer(36160, null)
    }
    function Z(e, n, i) {
      if ((t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer)) {
        let r = 33189
        if (i) {
          const e = n.depthTexture
          e && e.isDepthTexture && (e.type === c ? (r = 36012) : e.type === l && (r = 33190))
          const i = J(n)
          t.renderbufferStorageMultisample(36161, i, r, n.width, n.height)
        } else t.renderbufferStorage(36161, r, n.width, n.height)
        t.framebufferRenderbuffer(36160, 36096, 36161, e)
      } else if (n.depthBuffer && n.stencilBuffer) {
        if (i) {
          const e = J(n)
          t.renderbufferStorageMultisample(36161, e, 35056, n.width, n.height)
        } else t.renderbufferStorage(36161, 34041, n.width, n.height)
        t.framebufferRenderbuffer(36160, 33306, 36161, e)
      } else {
        const e = n.texture,
          r = _.convert(e.format),
          s = _.convert(e.type),
          a = z(e.internalFormat, r, s)
        if (i) {
          const e = J(n)
          t.renderbufferStorageMultisample(36161, e, a, n.width, n.height)
        } else t.renderbufferStorage(36161, a, n.width, n.height)
      }
      t.bindRenderbuffer(36161, null)
    }
    function J(t) {
      return w && t.isWebGLMultisampleRenderTarget ? Math.min(T, t.samples) : 0
    }
    let Q = !1,
      K = !1
    ;(this.allocateTextureUnit = function () {
      const t = U
      return (
        t >= M &&
          console.warn(
            'THREE.WebGLTextures: Trying to use ' +
              t +
              ' texture units while this GPU supports only ' +
              M
          ),
        (U += 1),
        t
      )
    }),
      (this.resetTextureUnits = function () {
        U = 0
      }),
      (this.setTexture2D = G),
      (this.setTexture2DArray = function (t, e) {
        const n = y.get(t)
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e), v.bindTexture(35866, n.__webglTexture))
      }),
      (this.setTexture3D = function (t, e) {
        const n = y.get(t)
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e), v.bindTexture(32879, n.__webglTexture))
      }),
      (this.setTextureCube = k),
      (this.setupRenderTarget = function (e) {
        const n = e.texture,
          i = y.get(e),
          r = y.get(n)
        e.addEventListener('dispose', F),
          (r.__webglTexture = t.createTexture()),
          b.memory.textures++
        const s = !0 === e.isWebGLCubeRenderTarget,
          a = !0 === e.isWebGLMultisampleRenderTarget,
          o = n.isDataTexture3D || n.isDataTexture2DArray,
          l = I(e) || w
        if (
          (!w ||
            n.format !== d ||
            (n.type !== c && n.type !== h) ||
            ((n.format = p),
            console.warn(
              'THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.'
            )),
          s)
        ) {
          i.__webglFramebuffer = []
          for (let e = 0; e < 6; e++) i.__webglFramebuffer[e] = t.createFramebuffer()
        } else if (((i.__webglFramebuffer = t.createFramebuffer()), a))
          if (w) {
            ;(i.__webglMultisampledFramebuffer = t.createFramebuffer()),
              (i.__webglColorRenderbuffer = t.createRenderbuffer()),
              t.bindRenderbuffer(36161, i.__webglColorRenderbuffer)
            const r = _.convert(n.format),
              s = _.convert(n.type),
              a = z(n.internalFormat, r, s),
              o = J(e)
            t.renderbufferStorageMultisample(36161, o, a, e.width, e.height),
              t.bindFramebuffer(36160, i.__webglMultisampledFramebuffer),
              t.framebufferRenderbuffer(36160, 36064, 36161, i.__webglColorRenderbuffer),
              t.bindRenderbuffer(36161, null),
              e.depthBuffer &&
                ((i.__webglDepthRenderbuffer = t.createRenderbuffer()),
                Z(i.__webglDepthRenderbuffer, e, !0)),
              t.bindFramebuffer(36160, null)
          } else
            console.warn(
              'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.'
            )
        if (s) {
          v.bindTexture(34067, r.__webglTexture), j(34067, n, l)
          for (let t = 0; t < 6; t++) Y(i.__webglFramebuffer[t], e, 36064, 34069 + t)
          N(n, l) && O(34067, n, e.width, e.height), v.bindTexture(34067, null)
        } else {
          let t = 3553
          o &&
            (w
              ? (t = n.isDataTexture3D ? 32879 : 35866)
              : console.warn(
                  'THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.'
                )),
            v.bindTexture(t, r.__webglTexture),
            j(t, n, l),
            Y(i.__webglFramebuffer, e, 36064, t),
            N(n, l) && O(3553, n, e.width, e.height),
            v.bindTexture(3553, null)
        }
        e.depthBuffer &&
          (function (e) {
            const n = y.get(e),
              i = !0 === e.isWebGLCubeRenderTarget
            if (e.depthTexture) {
              if (i) throw new Error('target.depthTexture not supported in Cube render targets')
              !(function (e, n) {
                if (n && n.isWebGLCubeRenderTarget)
                  throw new Error('Depth Texture with cube render targets is not supported')
                if (
                  (t.bindFramebuffer(36160, e), !n.depthTexture || !n.depthTexture.isDepthTexture)
                )
                  throw new Error(
                    'renderTarget.depthTexture must be an instance of THREE.DepthTexture'
                  )
                ;(y.get(n.depthTexture).__webglTexture &&
                  n.depthTexture.image.width === n.width &&
                  n.depthTexture.image.height === n.height) ||
                  ((n.depthTexture.image.width = n.width),
                  (n.depthTexture.image.height = n.height),
                  (n.depthTexture.needsUpdate = !0)),
                  G(n.depthTexture, 0)
                const i = y.get(n.depthTexture).__webglTexture
                if (n.depthTexture.format === f) t.framebufferTexture2D(36160, 36096, 3553, i, 0)
                else {
                  if (n.depthTexture.format !== m) throw new Error('Unknown depthTexture format')
                  t.framebufferTexture2D(36160, 33306, 3553, i, 0)
                }
              })(n.__webglFramebuffer, e)
            } else if (i) {
              n.__webglDepthbuffer = []
              for (let i = 0; i < 6; i++)
                t.bindFramebuffer(36160, n.__webglFramebuffer[i]),
                  (n.__webglDepthbuffer[i] = t.createRenderbuffer()),
                  Z(n.__webglDepthbuffer[i], e, !1)
            } else
              t.bindFramebuffer(36160, n.__webglFramebuffer),
                (n.__webglDepthbuffer = t.createRenderbuffer()),
                Z(n.__webglDepthbuffer, e, !1)
            t.bindFramebuffer(36160, null)
          })(e)
      }),
      (this.updateRenderTargetMipmap = function (t) {
        const e = t.texture
        if (N(e, I(t) || w)) {
          const n = t.isWebGLCubeRenderTarget ? 34067 : 3553,
            i = y.get(e).__webglTexture
          v.bindTexture(n, i), O(n, e, t.width, t.height), v.bindTexture(n, null)
        }
      }),
      (this.updateMultisampleRenderTarget = function (e) {
        if (e.isWebGLMultisampleRenderTarget)
          if (w) {
            const n = y.get(e)
            t.bindFramebuffer(36008, n.__webglMultisampledFramebuffer),
              t.bindFramebuffer(36009, n.__webglFramebuffer)
            const i = e.width,
              r = e.height
            let s = 16384
            e.depthBuffer && (s |= 256),
              e.stencilBuffer && (s |= 1024),
              t.blitFramebuffer(0, 0, i, r, 0, 0, i, r, s, 9728),
              t.bindFramebuffer(36160, n.__webglMultisampledFramebuffer)
          } else
            console.warn(
              'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.'
            )
      }),
      (this.safeSetTexture2D = function (t, e) {
        t &&
          t.isWebGLRenderTarget &&
          (!1 === Q &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."
            ),
            (Q = !0)),
          (t = t.texture)),
          G(t, e)
      }),
      (this.safeSetTextureCube = function (t, e) {
        t &&
          t.isWebGLCubeRenderTarget &&
          (!1 === K &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."
            ),
            (K = !0)),
          (t = t.texture)),
          k(t, e)
      })
  }
  function mr(t, e, n) {
    const i = n.isWebGL2
    return {
      convert: function (t) {
        let n
        if (1009 === t) return 5121
        if (1017 === t) return 32819
        if (1018 === t) return 32820
        if (1019 === t) return 33635
        if (1010 === t) return 5120
        if (1011 === t) return 5122
        if (t === o) return 5123
        if (1013 === t) return 5124
        if (t === l) return 5125
        if (t === c) return 5126
        if (t === h)
          return i
            ? 5131
            : ((n = e.get('OES_texture_half_float')), null !== n ? n.HALF_FLOAT_OES : null)
        if (1021 === t) return 6406
        if (t === d) return 6407
        if (t === p) return 6408
        if (1024 === t) return 6409
        if (1025 === t) return 6410
        if (t === f) return 6402
        if (t === m) return 34041
        if (1028 === t) return 6403
        if (1029 === t) return 36244
        if (1030 === t) return 33319
        if (1031 === t) return 33320
        if (1032 === t) return 36248
        if (1033 === t) return 36249
        if (33776 === t || 33777 === t || 33778 === t || 33779 === t) {
          if (((n = e.get('WEBGL_compressed_texture_s3tc')), null === n)) return null
          if (33776 === t) return n.COMPRESSED_RGB_S3TC_DXT1_EXT
          if (33777 === t) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT
          if (33778 === t) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT
          if (33779 === t) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        if (35840 === t || 35841 === t || 35842 === t || 35843 === t) {
          if (((n = e.get('WEBGL_compressed_texture_pvrtc')), null === n)) return null
          if (35840 === t) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
          if (35841 === t) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
          if (35842 === t) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
          if (35843 === t) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        }
        if (36196 === t)
          return (
            (n = e.get('WEBGL_compressed_texture_etc1')),
            null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null
          )
        if (
          (37492 === t || 37496 === t) &&
          ((n = e.get('WEBGL_compressed_texture_etc')), null !== n)
        ) {
          if (37492 === t) return n.COMPRESSED_RGB8_ETC2
          if (37496 === t) return n.COMPRESSED_RGBA8_ETC2_EAC
        }
        return 37808 === t ||
          37809 === t ||
          37810 === t ||
          37811 === t ||
          37812 === t ||
          37813 === t ||
          37814 === t ||
          37815 === t ||
          37816 === t ||
          37817 === t ||
          37818 === t ||
          37819 === t ||
          37820 === t ||
          37821 === t ||
          37840 === t ||
          37841 === t ||
          37842 === t ||
          37843 === t ||
          37844 === t ||
          37845 === t ||
          37846 === t ||
          37847 === t ||
          37848 === t ||
          37849 === t ||
          37850 === t ||
          37851 === t ||
          37852 === t ||
          37853 === t
          ? ((n = e.get('WEBGL_compressed_texture_astc')), null !== n ? t : null)
          : 36492 === t
          ? ((n = e.get('EXT_texture_compression_bptc')), null !== n ? t : null)
          : t === u
          ? i
            ? 34042
            : ((n = e.get('WEBGL_depth_texture')), null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null)
          : void 0
      },
    }
  }
  function gr(t = []) {
    an.call(this), (this.cameras = t)
  }
  ;(ur.prototype.isMeshDistanceMaterial = !0),
    (gr.prototype = Object.assign(Object.create(an.prototype), {
      constructor: gr,
      isArrayCamera: !0,
    }))
  class vr extends Ut {
    constructor() {
      super(), (this.type = 'Group')
    }
  }
  function yr() {
    ;(this._targetRay = null), (this._grip = null), (this._hand = null)
  }
  function xr(t, e) {
    const n = this
    let i = null,
      r = 1,
      s = null,
      a = 'local-floor',
      o = null
    const l = [],
      c = new Map(),
      h = new an()
    h.layers.enable(1), (h.viewport = new B())
    const u = new an()
    u.layers.enable(2), (u.viewport = new B())
    const d = [h, u],
      p = new gr()
    p.layers.enable(1), p.layers.enable(2)
    let f = null,
      m = null
    function g(t) {
      const e = c.get(t.inputSource)
      e && e.dispatchEvent({ type: t.type, data: t.inputSource })
    }
    function v() {
      c.forEach(function (t, e) {
        t.disconnect(e)
      }),
        c.clear(),
        (f = null),
        (m = null),
        t.setFramebuffer(null),
        t.setRenderTarget(t.getRenderTarget()),
        M.stop(),
        (n.isPresenting = !1),
        n.dispatchEvent({ type: 'sessionend' })
    }
    function y(t) {
      const e = i.inputSources
      for (let t = 0; t < l.length; t++) c.set(e[t], l[t])
      for (let e = 0; e < t.removed.length; e++) {
        const n = t.removed[e],
          i = c.get(n)
        i && (i.dispatchEvent({ type: 'disconnected', data: n }), c.delete(n))
      }
      for (let e = 0; e < t.added.length; e++) {
        const n = t.added[e],
          i = c.get(n)
        i && i.dispatchEvent({ type: 'connected', data: n })
      }
    }
    ;(this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (t) {
        let e = l[t]
        return void 0 === e && ((e = new yr()), (l[t] = e)), e.getTargetRaySpace()
      }),
      (this.getControllerGrip = function (t) {
        let e = l[t]
        return void 0 === e && ((e = new yr()), (l[t] = e)), e.getGripSpace()
      }),
      (this.getHand = function (t) {
        let e = l[t]
        return void 0 === e && ((e = new yr()), (l[t] = e)), e.getHandSpace()
      }),
      (this.setFramebufferScaleFactor = function (t) {
        ;(r = t),
          !0 === n.isPresenting &&
            console.warn('THREE.WebXRManager: Cannot change framebuffer scale while presenting.')
      }),
      (this.setReferenceSpaceType = function (t) {
        ;(a = t),
          !0 === n.isPresenting &&
            console.warn('THREE.WebXRManager: Cannot change reference space type while presenting.')
      }),
      (this.getReferenceSpace = function () {
        return s
      }),
      (this.getSession = function () {
        return i
      }),
      (this.setSession = async function (t) {
        if (((i = t), null !== i)) {
          i.addEventListener('select', g),
            i.addEventListener('selectstart', g),
            i.addEventListener('selectend', g),
            i.addEventListener('squeeze', g),
            i.addEventListener('squeezestart', g),
            i.addEventListener('squeezeend', g),
            i.addEventListener('end', v),
            i.addEventListener('inputsourceschange', y)
          const t = e.getContextAttributes()
          !0 !== t.xrCompatible && (await e.makeXRCompatible())
          const o = {
              antialias: t.antialias,
              alpha: t.alpha,
              depth: t.depth,
              stencil: t.stencil,
              framebufferScaleFactor: r,
            },
            l = new XRWebGLLayer(i, e, o)
          i.updateRenderState({ baseLayer: l }),
            (s = await i.requestReferenceSpace(a)),
            M.setContext(i),
            M.start(),
            (n.isPresenting = !0),
            n.dispatchEvent({ type: 'sessionstart' })
        }
      })
    const x = new G(),
      _ = new G()
    function b(t, e) {
      null === e
        ? t.matrixWorld.copy(t.matrix)
        : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix),
        t.matrixWorldInverse.copy(t.matrixWorld).invert()
    }
    this.getCamera = function (t) {
      ;(p.near = u.near = h.near = t.near),
        (p.far = u.far = h.far = t.far),
        (f === p.near && m === p.far) ||
          (i.updateRenderState({ depthNear: p.near, depthFar: p.far }), (f = p.near), (m = p.far))
      const e = t.parent,
        n = p.cameras
      b(p, e)
      for (let t = 0; t < n.length; t++) b(n[t], e)
      t.matrixWorld.copy(p.matrixWorld),
        t.matrix.copy(p.matrix),
        t.matrix.decompose(t.position, t.quaternion, t.scale)
      const r = t.children
      for (let t = 0, e = r.length; t < e; t++) r[t].updateMatrixWorld(!0)
      return (
        2 === n.length
          ? (function (t, e, n) {
              x.setFromMatrixPosition(e.matrixWorld), _.setFromMatrixPosition(n.matrixWorld)
              const i = x.distanceTo(_),
                r = e.projectionMatrix.elements,
                s = n.projectionMatrix.elements,
                a = r[14] / (r[10] - 1),
                o = r[14] / (r[10] + 1),
                l = (r[9] + 1) / r[5],
                c = (r[9] - 1) / r[5],
                h = (r[8] - 1) / r[0],
                u = (s[8] + 1) / s[0],
                d = a * h,
                p = a * u,
                f = i / (-h + u),
                m = f * -h
              e.matrixWorld.decompose(t.position, t.quaternion, t.scale),
                t.translateX(m),
                t.translateZ(f),
                t.matrixWorld.compose(t.position, t.quaternion, t.scale),
                t.matrixWorldInverse.copy(t.matrixWorld).invert()
              const g = a + f,
                v = o + f,
                y = d - m,
                b = p + (i - m),
                w = ((l * o) / v) * g,
                M = ((c * o) / v) * g
              t.projectionMatrix.makePerspective(y, b, w, M, g, v)
            })(p, h, u)
          : p.projectionMatrix.copy(h.projectionMatrix),
        p
      )
    }
    let w = null
    const M = new mn()
    M.setAnimationLoop(function (e, n) {
      if (((o = n.getViewerPose(s)), null !== o)) {
        const e = o.views,
          n = i.renderState.baseLayer
        t.setFramebuffer(n.framebuffer)
        let r = !1
        e.length !== p.cameras.length && ((p.cameras.length = 0), (r = !0))
        for (let t = 0; t < e.length; t++) {
          const i = e[t],
            s = n.getViewport(i),
            a = d[t]
          a.matrix.fromArray(i.transform.matrix),
            a.projectionMatrix.fromArray(i.projectionMatrix),
            a.viewport.set(s.x, s.y, s.width, s.height),
            0 === t && p.matrix.copy(a.matrix),
            !0 === r && p.cameras.push(a)
        }
      }
      const r = i.inputSources
      for (let t = 0; t < l.length; t++) {
        const e = l[t],
          i = r[t]
        e.update(i, n, s)
      }
      w && w(e, n)
    }),
      (this.setAnimationLoop = function (t) {
        w = t
      }),
      (this.dispose = function () {})
  }
  function _r(t) {
    function e(e, n) {
      ;(e.opacity.value = n.opacity),
        n.color && e.diffuse.value.copy(n.color),
        n.emissive && e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),
        n.map && (e.map.value = n.map),
        n.alphaMap && (e.alphaMap.value = n.alphaMap),
        n.specularMap && (e.specularMap.value = n.specularMap)
      const i = t.get(n).envMap
      if (i) {
        ;(e.envMap.value = i),
          (e.flipEnvMap.value = i.isCubeTexture && i._needsFlipEnvMap ? -1 : 1),
          (e.reflectivity.value = n.reflectivity),
          (e.refractionRatio.value = n.refractionRatio)
        const r = t.get(i).__maxMipLevel
        void 0 !== r && (e.maxMipLevel.value = r)
      }
      let r, s
      n.lightMap &&
        ((e.lightMap.value = n.lightMap), (e.lightMapIntensity.value = n.lightMapIntensity)),
        n.aoMap && ((e.aoMap.value = n.aoMap), (e.aoMapIntensity.value = n.aoMapIntensity)),
        n.map
          ? (r = n.map)
          : n.specularMap
          ? (r = n.specularMap)
          : n.displacementMap
          ? (r = n.displacementMap)
          : n.normalMap
          ? (r = n.normalMap)
          : n.bumpMap
          ? (r = n.bumpMap)
          : n.roughnessMap
          ? (r = n.roughnessMap)
          : n.metalnessMap
          ? (r = n.metalnessMap)
          : n.alphaMap
          ? (r = n.alphaMap)
          : n.emissiveMap
          ? (r = n.emissiveMap)
          : n.clearcoatMap
          ? (r = n.clearcoatMap)
          : n.clearcoatNormalMap
          ? (r = n.clearcoatNormalMap)
          : n.clearcoatRoughnessMap && (r = n.clearcoatRoughnessMap),
        void 0 !== r &&
          (r.isWebGLRenderTarget && (r = r.texture),
          !0 === r.matrixAutoUpdate && r.updateMatrix(),
          e.uvTransform.value.copy(r.matrix)),
        n.aoMap ? (s = n.aoMap) : n.lightMap && (s = n.lightMap),
        void 0 !== s &&
          (s.isWebGLRenderTarget && (s = s.texture),
          !0 === s.matrixAutoUpdate && s.updateMatrix(),
          e.uv2Transform.value.copy(s.matrix))
    }
    function n(e, n) {
      ;(e.roughness.value = n.roughness),
        (e.metalness.value = n.metalness),
        n.roughnessMap && (e.roughnessMap.value = n.roughnessMap),
        n.metalnessMap && (e.metalnessMap.value = n.metalnessMap),
        n.emissiveMap && (e.emissiveMap.value = n.emissiveMap),
        n.bumpMap &&
          ((e.bumpMap.value = n.bumpMap),
          (e.bumpScale.value = n.bumpScale),
          1 === n.side && (e.bumpScale.value *= -1)),
        n.normalMap &&
          ((e.normalMap.value = n.normalMap),
          e.normalScale.value.copy(n.normalScale),
          1 === n.side && e.normalScale.value.negate()),
        n.displacementMap &&
          ((e.displacementMap.value = n.displacementMap),
          (e.displacementScale.value = n.displacementScale),
          (e.displacementBias.value = n.displacementBias)),
        t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity)
    }
    return {
      refreshFogUniforms: function (t, e) {
        t.fogColor.value.copy(e.color),
          e.isFog
            ? ((t.fogNear.value = e.near), (t.fogFar.value = e.far))
            : e.isFogExp2 && (t.fogDensity.value = e.density)
      },
      refreshMaterialUniforms: function (t, i, r, s) {
        i.isMeshBasicMaterial
          ? e(t, i)
          : i.isMeshLambertMaterial
          ? (e(t, i),
            (function (t, e) {
              e.emissiveMap && (t.emissiveMap.value = e.emissiveMap)
            })(t, i))
          : i.isMeshToonMaterial
          ? (e(t, i),
            (function (t, e) {
              e.gradientMap && (t.gradientMap.value = e.gradientMap),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias))
            })(t, i))
          : i.isMeshPhongMaterial
          ? (e(t, i),
            (function (t, e) {
              t.specular.value.copy(e.specular),
                (t.shininess.value = Math.max(e.shininess, 1e-4)),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias))
            })(t, i))
          : i.isMeshStandardMaterial
          ? (e(t, i),
            i.isMeshPhysicalMaterial
              ? (function (t, e) {
                  n(t, e),
                    (t.reflectivity.value = e.reflectivity),
                    (t.clearcoat.value = e.clearcoat),
                    (t.clearcoatRoughness.value = e.clearcoatRoughness),
                    e.sheen && t.sheen.value.copy(e.sheen),
                    e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap),
                    e.clearcoatRoughnessMap &&
                      (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap),
                    e.clearcoatNormalMap &&
                      (t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),
                      (t.clearcoatNormalMap.value = e.clearcoatNormalMap),
                      1 === e.side && t.clearcoatNormalScale.value.negate()),
                    (t.transmission.value = e.transmission),
                    e.transmissionMap && (t.transmissionMap.value = e.transmissionMap)
                })(t, i)
              : n(t, i))
          : i.isMeshMatcapMaterial
          ? (e(t, i),
            (function (t, e) {
              e.matcap && (t.matcap.value = e.matcap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias))
            })(t, i))
          : i.isMeshDepthMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias))
            })(t, i))
          : i.isMeshDistanceMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias)),
                t.referencePosition.value.copy(e.referencePosition),
                (t.nearDistance.value = e.nearDistance),
                (t.farDistance.value = e.farDistance)
            })(t, i))
          : i.isMeshNormalMaterial
          ? (e(t, i),
            (function (t, e) {
              e.bumpMap &&
                ((t.bumpMap.value = e.bumpMap),
                (t.bumpScale.value = e.bumpScale),
                1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias))
            })(t, i))
          : i.isLineBasicMaterial
          ? ((function (t, e) {
              t.diffuse.value.copy(e.color), (t.opacity.value = e.opacity)
            })(t, i),
            i.isLineDashedMaterial &&
              (function (t, e) {
                ;(t.dashSize.value = e.dashSize),
                  (t.totalSize.value = e.dashSize + e.gapSize),
                  (t.scale.value = e.scale)
              })(t, i))
          : i.isPointsMaterial
          ? (function (t, e, n, i) {
              let r
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.size.value = e.size * n),
                (t.scale.value = 0.5 * i),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (r = e.map) : e.alphaMap && (r = e.alphaMap),
                void 0 !== r &&
                  (!0 === r.matrixAutoUpdate && r.updateMatrix(),
                  t.uvTransform.value.copy(r.matrix))
            })(t, i, r, s)
          : i.isSpriteMaterial
          ? (function (t, e) {
              let n
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.rotation.value = e.rotation),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (n = e.map) : e.alphaMap && (n = e.alphaMap),
                void 0 !== n &&
                  (!0 === n.matrixAutoUpdate && n.updateMatrix(),
                  t.uvTransform.value.copy(n.matrix))
            })(t, i)
          : i.isShadowMaterial
          ? (t.color.value.copy(i.color), (t.opacity.value = i.opacity))
          : i.isShaderMaterial && (i.uniformsNeedUpdate = !1)
      },
    }
  }
  function br(t) {
    const e =
        void 0 !== (t = t || {}).canvas
          ? t.canvas
          : (function () {
              const t = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
              return (t.style.display = 'block'), t
            })(),
      n = void 0 !== t.context ? t.context : null,
      i = void 0 !== t.alpha && t.alpha,
      r = void 0 === t.depth || t.depth,
      s = void 0 === t.stencil || t.stencil,
      a = void 0 !== t.antialias && t.antialias,
      o = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
      l = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
      u = void 0 !== t.powerPreference ? t.powerPreference : 'default',
      d = void 0 !== t.failIfMajorPerformanceCaveat && t.failIfMajorPerformanceCaveat
    let f = null,
      m = null
    const g = [],
      v = []
    ;(this.domElement = e),
      (this.debug = { checkShaderErrors: !0 }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.gammaFactor = 2),
      (this.outputEncoding = w),
      (this.physicallyCorrectLights = !1),
      (this.toneMapping = 0),
      (this.toneMappingExposure = 1),
      (this.maxMorphTargets = 8),
      (this.maxMorphNormals = 4)
    const y = this
    let x = !1,
      _ = null,
      b = 0,
      M = 0,
      S = null,
      E = null,
      T = -1,
      L = null
    const A = new B(),
      R = new B()
    let D = null,
      I = e.width,
      N = e.height,
      O = 1,
      z = null,
      H = null
    const F = new B(0, 0, I, N),
      U = new B(0, 0, I, N)
    let k = !1
    const V = new fn()
    let W = !1,
      j = !1
    const q = new mt(),
      X = new G(),
      Y = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 }
    function Z() {
      return null === S ? O : 1
    }
    let J,
      Q,
      K,
      $,
      tt,
      et,
      nt,
      it,
      rt,
      st,
      at,
      ot,
      lt,
      ct,
      ht,
      ut,
      dt,
      pt,
      ft,
      gt,
      vt,
      yt = n
    function xt(t, n) {
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
          s = e.getContext(r, n)
        if (null !== s) return s
      }
      return null
    }
    try {
      const t = {
        alpha: i,
        depth: r,
        stencil: s,
        antialias: a,
        premultipliedAlpha: o,
        preserveDrawingBuffer: l,
        powerPreference: u,
        failIfMajorPerformanceCaveat: d,
      }
      if (
        (e.addEventListener('webglcontextlost', Mt, !1),
        e.addEventListener('webglcontextrestored', St, !1),
        null === yt)
      ) {
        const e = ['webgl2', 'webgl', 'experimental-webgl']
        if ((!0 === y.isWebGL1Renderer && e.shift(), (yt = xt(e, t)), null === yt))
          throw xt(e)
            ? new Error('Error creating WebGL context with your selected attributes.')
            : new Error('Error creating WebGL context.')
      }
      void 0 === yt.getShaderPrecisionFormat &&
        (yt.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 }
        })
    } catch (t) {
      throw (console.error('THREE.WebGLRenderer: ' + t.message), t)
    }
    function _t() {
      ;(J = new Ln(yt)),
        (Q = new Sn(yt, J, t)),
        J.init(Q),
        (gt = new mr(yt, J, Q)),
        (K = new pr(yt, J, Q)),
        K.scissor(R.copy(U).multiplyScalar(O).floor()),
        K.viewport(A.copy(F).multiplyScalar(O).floor()),
        ($ = new Pn(yt)),
        (tt = new $i()),
        (et = new fr(yt, J, K, tt, Q, gt, $)),
        (nt = new Tn(y)),
        (it = new gn(yt, Q)),
        (vt = new wn(yt, J, it, Q)),
        (rt = new An(yt, it, $, vt)),
        (st = new Nn(yt, rt, it, $)),
        (dt = new In(yt)),
        (ht = new En(tt)),
        (at = new Ki(y, nt, J, Q, vt, ht)),
        (ot = new _r(tt)),
        (lt = new ir(tt)),
        (ct = new cr(J, Q)),
        (ut = new bn(y, nt, K, st, o)),
        (pt = new Mn(yt, J, $, Q)),
        (ft = new Rn(yt, J, $, Q)),
        ($.programs = at.programs),
        (y.capabilities = Q),
        (y.extensions = J),
        (y.properties = tt),
        (y.renderLists = lt),
        (y.state = K),
        (y.info = $)
    }
    _t()
    const bt = new xr(y, yt)
    this.xr = bt
    const wt = new dr(y, st, Q.maxTextureSize)
    function Mt(t) {
      t.preventDefault(), console.log('THREE.WebGLRenderer: Context Lost.'), (x = !0)
    }
    function St() {
      console.log('THREE.WebGLRenderer: Context Restored.'), (x = !1), _t()
    }
    function Et(t) {
      const e = t.target
      e.removeEventListener('dispose', Et),
        (function (t) {
          Tt(t), tt.remove(t)
        })(e)
    }
    function Tt(t) {
      const e = tt.get(t).program
      void 0 !== e && at.releaseProgram(e)
    }
    ;(this.shadowMap = wt),
      (this.getContext = function () {
        return yt
      }),
      (this.getContextAttributes = function () {
        return yt.getContextAttributes()
      }),
      (this.forceContextLoss = function () {
        const t = J.get('WEBGL_lose_context')
        t && t.loseContext()
      }),
      (this.forceContextRestore = function () {
        const t = J.get('WEBGL_lose_context')
        t && t.restoreContext()
      }),
      (this.getPixelRatio = function () {
        return O
      }),
      (this.setPixelRatio = function (t) {
        void 0 !== t && ((O = t), this.setSize(I, N, !1))
      }),
      (this.getSize = function (t) {
        return (
          void 0 === t &&
            (console.warn('WebGLRenderer: .getsize() now requires a Vector2 as an argument'),
            (t = new C())),
          t.set(I, N)
        )
      }),
      (this.setSize = function (t, n, i) {
        bt.isPresenting
          ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.")
          : ((I = t),
            (N = n),
            (e.width = Math.floor(t * O)),
            (e.height = Math.floor(n * O)),
            !1 !== i && ((e.style.width = t + 'px'), (e.style.height = n + 'px')),
            this.setViewport(0, 0, t, n))
      }),
      (this.getDrawingBufferSize = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              'WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument'
            ),
            (t = new C())),
          t.set(I * O, N * O).floor()
        )
      }),
      (this.setDrawingBufferSize = function (t, n, i) {
        ;(I = t),
          (N = n),
          (O = i),
          (e.width = Math.floor(t * i)),
          (e.height = Math.floor(n * i)),
          this.setViewport(0, 0, t, n)
      }),
      (this.getCurrentViewport = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              'WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument'
            ),
            (t = new B())),
          t.copy(A)
        )
      }),
      (this.getViewport = function (t) {
        return t.copy(F)
      }),
      (this.setViewport = function (t, e, n, i) {
        t.isVector4 ? F.set(t.x, t.y, t.z, t.w) : F.set(t, e, n, i),
          K.viewport(A.copy(F).multiplyScalar(O).floor())
      }),
      (this.getScissor = function (t) {
        return t.copy(U)
      }),
      (this.setScissor = function (t, e, n, i) {
        t.isVector4 ? U.set(t.x, t.y, t.z, t.w) : U.set(t, e, n, i),
          K.scissor(R.copy(U).multiplyScalar(O).floor())
      }),
      (this.getScissorTest = function () {
        return k
      }),
      (this.setScissorTest = function (t) {
        K.setScissorTest((k = t))
      }),
      (this.setOpaqueSort = function (t) {
        z = t
      }),
      (this.setTransparentSort = function (t) {
        H = t
      }),
      (this.getClearColor = function (t) {
        return (
          void 0 === t &&
            (console.warn('WebGLRenderer: .getClearColor() now requires a Color as an argument'),
            (t = new he())),
          t.copy(ut.getClearColor())
        )
      }),
      (this.setClearColor = function () {
        ut.setClearColor.apply(ut, arguments)
      }),
      (this.getClearAlpha = function () {
        return ut.getClearAlpha()
      }),
      (this.setClearAlpha = function () {
        ut.setClearAlpha.apply(ut, arguments)
      }),
      (this.clear = function (t, e, n) {
        let i = 0
        ;(void 0 === t || t) && (i |= 16384),
          (void 0 === e || e) && (i |= 256),
          (void 0 === n || n) && (i |= 1024),
          yt.clear(i)
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1)
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1)
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0)
      }),
      (this.dispose = function () {
        e.removeEventListener('webglcontextlost', Mt, !1),
          e.removeEventListener('webglcontextrestored', St, !1),
          lt.dispose(),
          ct.dispose(),
          tt.dispose(),
          nt.dispose(),
          st.dispose(),
          vt.dispose(),
          bt.dispose(),
          At.stop()
      }),
      (this.renderBufferImmediate = function (t, e) {
        vt.initAttributes()
        const n = tt.get(t)
        t.hasPositions && !n.position && (n.position = yt.createBuffer()),
          t.hasNormals && !n.normal && (n.normal = yt.createBuffer()),
          t.hasUvs && !n.uv && (n.uv = yt.createBuffer()),
          t.hasColors && !n.color && (n.color = yt.createBuffer())
        const i = e.getAttributes()
        t.hasPositions &&
          (yt.bindBuffer(34962, n.position),
          yt.bufferData(34962, t.positionArray, 35048),
          vt.enableAttribute(i.position),
          yt.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)),
          t.hasNormals &&
            (yt.bindBuffer(34962, n.normal),
            yt.bufferData(34962, t.normalArray, 35048),
            vt.enableAttribute(i.normal),
            yt.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)),
          t.hasUvs &&
            (yt.bindBuffer(34962, n.uv),
            yt.bufferData(34962, t.uvArray, 35048),
            vt.enableAttribute(i.uv),
            yt.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)),
          t.hasColors &&
            (yt.bindBuffer(34962, n.color),
            yt.bufferData(34962, t.colorArray, 35048),
            vt.enableAttribute(i.color),
            yt.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)),
          vt.disableUnusedAttributes(),
          yt.drawArrays(4, 0, t.count),
          (t.count = 0)
      }),
      (this.renderBufferDirect = function (t, e, n, i, r, s) {
        null === e && (e = Y)
        const a = r.isMesh && r.matrixWorld.determinant() < 0,
          o = It(t, e, i, r)
        K.setMaterial(i, a)
        let l = n.index
        const c = n.attributes.position
        if (null === l) {
          if (void 0 === c || 0 === c.count) return
        } else if (0 === l.count) return
        let h,
          u = 1
        !0 === i.wireframe && ((l = rt.getWireframeAttribute(n)), (u = 2)),
          (i.morphTargets || i.morphNormals) && dt.update(r, n, i, o),
          vt.setup(r, i, o, n, l)
        let d = pt
        null !== l && ((h = it.get(l)), (d = ft), d.setIndex(h))
        const p = null !== l ? l.count : c.count,
          f = n.drawRange.start * u,
          m = n.drawRange.count * u,
          g = null !== s ? s.start * u : 0,
          v = null !== s ? s.count * u : 1 / 0,
          y = Math.max(f, g),
          x = Math.min(p, f + m, g + v) - 1,
          _ = Math.max(0, x - y + 1)
        if (0 !== _) {
          if (r.isMesh)
            !0 === i.wireframe
              ? (K.setLineWidth(i.wireframeLinewidth * Z()), d.setMode(1))
              : d.setMode(4)
          else if (r.isLine) {
            let t = i.linewidth
            void 0 === t && (t = 1),
              K.setLineWidth(t * Z()),
              r.isLineSegments ? d.setMode(1) : r.isLineLoop ? d.setMode(2) : d.setMode(3)
          } else r.isPoints ? d.setMode(0) : r.isSprite && d.setMode(4)
          if (r.isInstancedMesh) d.renderInstances(y, _, r.count)
          else if (n.isInstancedBufferGeometry) {
            const t = Math.min(n.instanceCount, n._maxInstanceCount)
            d.renderInstances(y, _, t)
          } else d.render(y, _)
        }
      }),
      (this.compile = function (t, e) {
        ;(m = ct.get(t)),
          m.init(),
          t.traverseVisible(function (t) {
            t.isLight &&
              t.layers.test(e.layers) &&
              (m.pushLight(t), t.castShadow && m.pushShadow(t))
          }),
          m.setupLights()
        const n = new WeakMap()
        t.traverse(function (e) {
          const i = e.material
          if (i)
            if (Array.isArray(i))
              for (let r = 0; r < i.length; r++) {
                const s = i[r]
                !1 === n.has(s) && (Dt(s, t, e), n.set(s))
              }
            else !1 === n.has(i) && (Dt(i, t, e), n.set(i))
        })
      })
    let Lt = null
    const At = new mn()
    function Rt(t, e, n, i) {
      if (!1 === t.visible) return
      if (t.layers.test(e.layers))
        if (t.isGroup) n = t.renderOrder
        else if (t.isLOD) !0 === t.autoUpdate && t.update(e)
        else if (t.isLight) m.pushLight(t), t.castShadow && m.pushShadow(t)
        else if (t.isSprite) {
          if (!t.frustumCulled || V.intersectsSprite(t)) {
            i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q)
            const e = st.update(t),
              r = t.material
            r.visible && f.push(t, e, r, n, X.z, null)
          }
        } else if (t.isImmediateRenderObject)
          i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q),
            f.push(t, null, t.material, n, X.z, null)
        else if (
          (t.isMesh || t.isLine || t.isPoints) &&
          (t.isSkinnedMesh &&
            t.skeleton.frame !== $.render.frame &&
            (t.skeleton.update(), (t.skeleton.frame = $.render.frame)),
          !t.frustumCulled || V.intersectsObject(t))
        ) {
          i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(q)
          const e = st.update(t),
            r = t.material
          if (Array.isArray(r)) {
            const i = e.groups
            for (let s = 0, a = i.length; s < a; s++) {
              const a = i[s],
                o = r[a.materialIndex]
              o && o.visible && f.push(t, e, o, n, X.z, a)
            }
          } else r.visible && f.push(t, e, r, n, X.z, null)
        }
      const r = t.children
      for (let t = 0, s = r.length; t < s; t++) Rt(r[t], e, n, i)
    }
    function Pt(t, e, n) {
      const i = !0 === e.isScene ? e.overrideMaterial : null
      for (let r = 0, s = t.length; r < s; r++) {
        const s = t[r],
          a = s.object,
          o = s.geometry,
          l = null === i ? s.material : i,
          c = s.group
        if (n.isArrayCamera) {
          const t = n.cameras
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n]
            a.layers.test(i.layers) &&
              (K.viewport(A.copy(i.viewport)), m.setupLightsView(i), Ct(a, e, i, o, l, c))
          }
        } else Ct(a, e, n, o, l, c)
      }
    }
    function Ct(t, e, n, i, r, s) {
      if (
        (t.onBeforeRender(y, e, n, i, r, s),
        t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld),
        t.normalMatrix.getNormalMatrix(t.modelViewMatrix),
        t.isImmediateRenderObject)
      ) {
        const i = It(n, e, r, t)
        K.setMaterial(r),
          vt.reset(),
          (function (t, e) {
            t.render(function (t) {
              y.renderBufferImmediate(t, e)
            })
          })(t, i)
      } else y.renderBufferDirect(n, e, i, r, t, s)
      t.onAfterRender(y, e, n, i, r, s)
    }
    function Dt(t, e, n) {
      !0 !== e.isScene && (e = Y)
      const i = tt.get(t),
        r = m.state.lights,
        s = m.state.shadowsArray,
        a = r.state.version,
        o = at.getParameters(t, r.state, s, e, n),
        l = at.getProgramCacheKey(o)
      let c = i.program,
        h = !0
      if (
        ((i.environment = t.isMeshStandardMaterial ? e.environment : null),
        (i.fog = e.fog),
        (i.envMap = nt.get(t.envMap || i.environment)),
        void 0 === c)
      )
        t.addEventListener('dispose', Et)
      else if (c.cacheKey !== l) Tt(t)
      else if (i.lightsStateVersion !== a) h = !1
      else {
        if (void 0 !== o.shaderID) return
        h = !1
      }
      h &&
        ((o.uniforms = at.getUniforms(t)),
        t.onBeforeCompile(o, y),
        (c = at.acquireProgram(o, l)),
        (i.program = c),
        (i.uniforms = o.uniforms),
        (i.outputEncoding = o.outputEncoding))
      const u = i.uniforms
      ;((t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping) ||
        ((i.numClippingPlanes = ht.numPlanes),
        (i.numIntersection = ht.numIntersection),
        (u.clippingPlanes = ht.uniform)),
        (i.needsLights = (function (t) {
          return (
            t.isMeshLambertMaterial ||
            t.isMeshToonMaterial ||
            t.isMeshPhongMaterial ||
            t.isMeshStandardMaterial ||
            t.isShadowMaterial ||
            (t.isShaderMaterial && !0 === t.lights)
          )
        })(t)),
        (i.lightsStateVersion = a),
        i.needsLights &&
          ((u.ambientLightColor.value = r.state.ambient),
          (u.lightProbe.value = r.state.probe),
          (u.directionalLights.value = r.state.directional),
          (u.directionalLightShadows.value = r.state.directionalShadow),
          (u.spotLights.value = r.state.spot),
          (u.spotLightShadows.value = r.state.spotShadow),
          (u.rectAreaLights.value = r.state.rectArea),
          (u.ltc_1.value = r.state.rectAreaLTC1),
          (u.ltc_2.value = r.state.rectAreaLTC2),
          (u.pointLights.value = r.state.point),
          (u.pointLightShadows.value = r.state.pointShadow),
          (u.hemisphereLights.value = r.state.hemi),
          (u.directionalShadowMap.value = r.state.directionalShadowMap),
          (u.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
          (u.spotShadowMap.value = r.state.spotShadowMap),
          (u.spotShadowMatrix.value = r.state.spotShadowMatrix),
          (u.pointShadowMap.value = r.state.pointShadowMap),
          (u.pointShadowMatrix.value = r.state.pointShadowMatrix))
      const d = i.program.getUniforms(),
        p = Ci.seqWithValue(d.seq, u)
      i.uniformsList = p
    }
    function It(t, e, n, i) {
      !0 !== e.isScene && (e = Y), et.resetTextureUnits()
      const r = e.fog,
        s = n.isMeshStandardMaterial ? e.environment : null,
        a = null === S ? y.outputEncoding : S.texture.encoding,
        o = nt.get(n.envMap || s),
        l = tt.get(n),
        h = m.state.lights
      if (!0 === W && (!0 === j || t !== L)) {
        const e = t === L && n.id === T
        ht.setState(n, t, e)
      }
      n.version === l.__version
        ? (n.fog && l.fog !== r) ||
          l.environment !== s ||
          (l.needsLights && l.lightsStateVersion !== h.state.version)
          ? Dt(n, e, i)
          : void 0 === l.numClippingPlanes ||
            (l.numClippingPlanes === ht.numPlanes && l.numIntersection === ht.numIntersection)
          ? (l.outputEncoding !== a || l.envMap !== o) && Dt(n, e, i)
          : Dt(n, e, i)
        : (Dt(n, e, i), (l.__version = n.version))
      let u = !1,
        d = !1,
        f = !1
      const g = l.program,
        v = g.getUniforms(),
        x = l.uniforms
      if (
        (K.useProgram(g.program) && ((u = !0), (d = !0), (f = !0)),
        n.id !== T && ((T = n.id), (d = !0)),
        u || L !== t)
      ) {
        if (
          (v.setValue(yt, 'projectionMatrix', t.projectionMatrix),
          Q.logarithmicDepthBuffer &&
            v.setValue(yt, 'logDepthBufFC', 2 / (Math.log(t.far + 1) / Math.LN2)),
          L !== t && ((L = t), (d = !0), (f = !0)),
          n.isShaderMaterial ||
            n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshStandardMaterial ||
            n.envMap)
        ) {
          const e = v.map.cameraPosition
          void 0 !== e && e.setValue(yt, X.setFromMatrixPosition(t.matrixWorld))
        }
        ;(n.isMeshPhongMaterial ||
          n.isMeshToonMaterial ||
          n.isMeshLambertMaterial ||
          n.isMeshBasicMaterial ||
          n.isMeshStandardMaterial ||
          n.isShaderMaterial) &&
          v.setValue(yt, 'isOrthographic', !0 === t.isOrthographicCamera),
          (n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshLambertMaterial ||
            n.isMeshBasicMaterial ||
            n.isMeshStandardMaterial ||
            n.isShaderMaterial ||
            n.isShadowMaterial ||
            n.skinning) &&
            v.setValue(yt, 'viewMatrix', t.matrixWorldInverse)
      }
      if (n.skinning) {
        v.setOptional(yt, i, 'bindMatrix'), v.setOptional(yt, i, 'bindMatrixInverse')
        const t = i.skeleton
        if (t) {
          const e = t.bones
          if (Q.floatVertexTextures) {
            if (null === t.boneTexture) {
              let n = Math.sqrt(4 * e.length)
              ;(n = P.ceilPowerOfTwo(n)), (n = Math.max(n, 4))
              const i = new Float32Array(n * n * 4)
              i.set(t.boneMatrices)
              const r = new un(i, n, n, p, c)
              ;(t.boneMatrices = i), (t.boneTexture = r), (t.boneTextureSize = n)
            }
            v.setValue(yt, 'boneTexture', t.boneTexture, et),
              v.setValue(yt, 'boneTextureSize', t.boneTextureSize)
          } else v.setOptional(yt, t, 'boneMatrices')
        }
      }
      var _, b
      return (
        (d || l.receiveShadow !== i.receiveShadow) &&
          ((l.receiveShadow = i.receiveShadow), v.setValue(yt, 'receiveShadow', i.receiveShadow)),
        d &&
          (v.setValue(yt, 'toneMappingExposure', y.toneMappingExposure),
          l.needsLights &&
            ((b = f),
            ((_ = x).ambientLightColor.needsUpdate = b),
            (_.lightProbe.needsUpdate = b),
            (_.directionalLights.needsUpdate = b),
            (_.directionalLightShadows.needsUpdate = b),
            (_.pointLights.needsUpdate = b),
            (_.pointLightShadows.needsUpdate = b),
            (_.spotLights.needsUpdate = b),
            (_.spotLightShadows.needsUpdate = b),
            (_.rectAreaLights.needsUpdate = b),
            (_.hemisphereLights.needsUpdate = b)),
          r && n.fog && ot.refreshFogUniforms(x, r),
          ot.refreshMaterialUniforms(x, n, O, N),
          Ci.upload(yt, l.uniformsList, x, et)),
        n.isShaderMaterial &&
          !0 === n.uniformsNeedUpdate &&
          (Ci.upload(yt, l.uniformsList, x, et), (n.uniformsNeedUpdate = !1)),
        n.isSpriteMaterial && v.setValue(yt, 'center', i.center),
        v.setValue(yt, 'modelViewMatrix', i.modelViewMatrix),
        v.setValue(yt, 'normalMatrix', i.normalMatrix),
        v.setValue(yt, 'modelMatrix', i.matrixWorld),
        g
      )
    }
    At.setAnimationLoop(function (t) {
      bt.isPresenting || (Lt && Lt(t))
    }),
      'undefined' != typeof window && At.setContext(window),
      (this.setAnimationLoop = function (t) {
        ;(Lt = t), bt.setAnimationLoop(t), null === t ? At.stop() : At.start()
      }),
      (this.render = function (t, e) {
        let n, i
        if (
          (void 0 !== arguments[2] &&
            (console.warn(
              'THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.'
            ),
            (n = arguments[2])),
          void 0 !== arguments[3] &&
            (console.warn(
              'THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.'
            ),
            (i = arguments[3])),
          void 0 !== e && !0 !== e.isCamera)
        )
          return void console.error(
            'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.'
          )
        if (!0 === x) return
        vt.resetDefaultState(),
          (T = -1),
          (L = null),
          !0 === t.autoUpdate && t.updateMatrixWorld(),
          null === e.parent && e.updateMatrixWorld(),
          !0 === bt.enabled && !0 === bt.isPresenting && (e = bt.getCamera(e)),
          !0 === t.isScene && t.onBeforeRender(y, t, e, n || S),
          (m = ct.get(t, v.length)),
          m.init(),
          v.push(m),
          q.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
          V.setFromProjectionMatrix(q),
          (j = this.localClippingEnabled),
          (W = ht.init(this.clippingPlanes, j, e)),
          (f = lt.get(t, g.length)),
          f.init(),
          g.push(f),
          Rt(t, e, 0, y.sortObjects),
          f.finish(),
          !0 === y.sortObjects && f.sort(z, H),
          !0 === W && ht.beginShadows()
        const r = m.state.shadowsArray
        wt.render(r, t, e),
          m.setupLights(),
          m.setupLightsView(e),
          !0 === W && ht.endShadows(),
          !0 === this.info.autoReset && this.info.reset(),
          void 0 !== n && this.setRenderTarget(n),
          ut.render(f, t, e, i)
        const s = f.opaque,
          a = f.transparent
        s.length > 0 && Pt(s, t, e),
          a.length > 0 && Pt(a, t, e),
          !0 === t.isScene && t.onAfterRender(y, t, e),
          null !== S && (et.updateRenderTargetMipmap(S), et.updateMultisampleRenderTarget(S)),
          K.buffers.depth.setTest(!0),
          K.buffers.depth.setMask(!0),
          K.buffers.color.setMask(!0),
          K.setPolygonOffset(!1),
          v.pop(),
          (m = v.length > 0 ? v[v.length - 1] : null),
          g.pop(),
          (f = g.length > 0 ? g[g.length - 1] : null)
      }),
      (this.setFramebuffer = function (t) {
        _ !== t && null === S && yt.bindFramebuffer(36160, t), (_ = t)
      }),
      (this.getActiveCubeFace = function () {
        return b
      }),
      (this.getActiveMipmapLevel = function () {
        return M
      }),
      (this.getRenderTarget = function () {
        return S
      }),
      (this.setRenderTarget = function (t, e = 0, n = 0) {
        ;(S = t),
          (b = e),
          (M = n),
          t && void 0 === tt.get(t).__webglFramebuffer && et.setupRenderTarget(t)
        let i = _,
          r = !1,
          s = !1
        if (t) {
          const n = t.texture
          ;(n.isDataTexture3D || n.isDataTexture2DArray) && (s = !0)
          const a = tt.get(t).__webglFramebuffer
          t.isWebGLCubeRenderTarget
            ? ((i = a[e]), (r = !0))
            : (i = t.isWebGLMultisampleRenderTarget ? tt.get(t).__webglMultisampledFramebuffer : a),
            A.copy(t.viewport),
            R.copy(t.scissor),
            (D = t.scissorTest)
        } else A.copy(F).multiplyScalar(O).floor(), R.copy(U).multiplyScalar(O).floor(), (D = k)
        if (
          (E !== i && (yt.bindFramebuffer(36160, i), (E = i)),
          K.viewport(A),
          K.scissor(R),
          K.setScissorTest(D),
          r)
        ) {
          const i = tt.get(t.texture)
          yt.framebufferTexture2D(36160, 36064, 34069 + e, i.__webglTexture, n)
        } else if (s) {
          const i = tt.get(t.texture),
            r = e || 0
          yt.framebufferTextureLayer(36160, 36064, i.__webglTexture, n || 0, r)
        }
      }),
      (this.readRenderTargetPixels = function (t, e, n, i, r, s, a) {
        if (!t || !t.isWebGLRenderTarget)
          return void console.error(
            'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.'
          )
        let o = tt.get(t).__webglFramebuffer
        if ((t.isWebGLCubeRenderTarget && void 0 !== a && (o = o[a]), o)) {
          let a = !1
          o !== E && (yt.bindFramebuffer(36160, o), (a = !0))
          try {
            const o = t.texture,
              l = o.format,
              u = o.type
            if (l !== p && gt.convert(l) !== yt.getParameter(35739))
              return void console.error(
                'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.'
              )
            const d =
              u === h &&
              (J.has('EXT_color_buffer_half_float') ||
                (Q.isWebGL2 && J.has('EXT_color_buffer_float')))
            if (
              !(
                1009 === u ||
                gt.convert(u) === yt.getParameter(35738) ||
                (u === c &&
                  (Q.isWebGL2 ||
                    J.has('OES_texture_float') ||
                    J.has('WEBGL_color_buffer_float'))) ||
                d
              )
            )
              return void console.error(
                'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.'
              )
            36053 === yt.checkFramebufferStatus(36160)
              ? e >= 0 &&
                e <= t.width - i &&
                n >= 0 &&
                n <= t.height - r &&
                yt.readPixels(e, n, i, r, gt.convert(l), gt.convert(u), s)
              : console.error(
                  'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.'
                )
          } finally {
            a && yt.bindFramebuffer(36160, E)
          }
        }
      }),
      (this.copyFramebufferToTexture = function (t, e, n = 0) {
        const i = Math.pow(2, -n),
          r = Math.floor(e.image.width * i),
          s = Math.floor(e.image.height * i),
          a = gt.convert(e.format)
        et.setTexture2D(e, 0), yt.copyTexImage2D(3553, n, a, t.x, t.y, r, s, 0), K.unbindTexture()
      }),
      (this.copyTextureToTexture = function (t, e, n, i = 0) {
        const r = e.image.width,
          s = e.image.height,
          a = gt.convert(n.format),
          o = gt.convert(n.type)
        et.setTexture2D(n, 0),
          yt.pixelStorei(37440, n.flipY),
          yt.pixelStorei(37441, n.premultiplyAlpha),
          yt.pixelStorei(3317, n.unpackAlignment),
          e.isDataTexture
            ? yt.texSubImage2D(3553, i, t.x, t.y, r, s, a, o, e.image.data)
            : e.isCompressedTexture
            ? yt.compressedTexSubImage2D(
                3553,
                i,
                t.x,
                t.y,
                e.mipmaps[0].width,
                e.mipmaps[0].height,
                a,
                e.mipmaps[0].data
              )
            : yt.texSubImage2D(3553, i, t.x, t.y, a, o, e.image),
          0 === i && n.generateMipmaps && yt.generateMipmap(3553),
          K.unbindTexture()
      }),
      (this.copyTextureToTexture3D = function (t, e, n, i, r = 0) {
        if (y.isWebGL1Renderer)
          return void console.warn(
            'THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.'
          )
        const { width: s, height: a, data: o } = n.image,
          l = gt.convert(i.format),
          c = gt.convert(i.type)
        let h
        if (i.isDataTexture3D) et.setTexture3D(i, 0), (h = 32879)
        else {
          if (!i.isDataTexture2DArray)
            return void console.warn(
              'THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.'
            )
          et.setTexture2DArray(i, 0), (h = 35866)
        }
        yt.pixelStorei(37440, i.flipY),
          yt.pixelStorei(37441, i.premultiplyAlpha),
          yt.pixelStorei(3317, i.unpackAlignment)
        const u = yt.getParameter(3314),
          d = yt.getParameter(32878),
          p = yt.getParameter(3316),
          f = yt.getParameter(3315),
          m = yt.getParameter(32877)
        yt.pixelStorei(3314, s),
          yt.pixelStorei(32878, a),
          yt.pixelStorei(3316, t.min.x),
          yt.pixelStorei(3315, t.min.y),
          yt.pixelStorei(32877, t.min.z),
          yt.texSubImage3D(
            h,
            r,
            e.x,
            e.y,
            e.z,
            t.max.x - t.min.x + 1,
            t.max.y - t.min.y + 1,
            t.max.z - t.min.z + 1,
            l,
            c,
            o
          ),
          yt.pixelStorei(3314, u),
          yt.pixelStorei(32878, d),
          yt.pixelStorei(3316, p),
          yt.pixelStorei(3315, f),
          yt.pixelStorei(32877, m),
          0 === r && i.generateMipmaps && yt.generateMipmap(h),
          K.unbindTexture()
      }),
      (this.initTexture = function (t) {
        et.setTexture2D(t, 0), K.unbindTexture()
      }),
      (this.resetState = function () {
        K.reset(), vt.reset()
      }),
      'undefined' != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }))
  }
  ;(vr.prototype.isGroup = !0),
    Object.assign(yr.prototype, {
      constructor: yr,
      getHandSpace: function () {
        return (
          null === this._hand &&
            ((this._hand = new vr()),
            (this._hand.matrixAutoUpdate = !1),
            (this._hand.visible = !1),
            (this._hand.joints = {}),
            (this._hand.inputState = { pinching: !1 })),
          this._hand
        )
      },
      getTargetRaySpace: function () {
        return (
          null === this._targetRay &&
            ((this._targetRay = new vr()),
            (this._targetRay.matrixAutoUpdate = !1),
            (this._targetRay.visible = !1)),
          this._targetRay
        )
      },
      getGripSpace: function () {
        return (
          null === this._grip &&
            ((this._grip = new vr()),
            (this._grip.matrixAutoUpdate = !1),
            (this._grip.visible = !1)),
          this._grip
        )
      },
      dispatchEvent: function (t) {
        return (
          null !== this._targetRay && this._targetRay.dispatchEvent(t),
          null !== this._grip && this._grip.dispatchEvent(t),
          null !== this._hand && this._hand.dispatchEvent(t),
          this
        )
      },
      disconnect: function (t) {
        return (
          this.dispatchEvent({ type: 'disconnected', data: t }),
          null !== this._targetRay && (this._targetRay.visible = !1),
          null !== this._grip && (this._grip.visible = !1),
          null !== this._hand && (this._hand.visible = !1),
          this
        )
      },
      update: function (t, e, n) {
        let i = null,
          r = null,
          s = null
        const a = this._targetRay,
          o = this._grip,
          l = this._hand
        if (t && 'visible-blurred' !== e.session.visibilityState)
          if (l && t.hand) {
            s = !0
            for (const i of t.hand.values()) {
              const t = e.getJointPose(i, n)
              if (void 0 === l.joints[i.jointName]) {
                const t = new vr()
                ;(t.matrixAutoUpdate = !1), (t.visible = !1), (l.joints[i.jointName] = t), l.add(t)
              }
              const r = l.joints[i.jointName]
              null !== t &&
                (r.matrix.fromArray(t.transform.matrix),
                r.matrix.decompose(r.position, r.rotation, r.scale),
                (r.jointRadius = t.radius)),
                (r.visible = null !== t)
            }
            const i = l.joints['index-finger-tip'],
              r = l.joints['thumb-tip'],
              a = i.position.distanceTo(r.position),
              o = 0.02,
              c = 0.005
            l.inputState.pinching && a > o + c
              ? ((l.inputState.pinching = !1),
                this.dispatchEvent({ type: 'pinchend', handedness: t.handedness, target: this }))
              : !l.inputState.pinching &&
                a <= o - c &&
                ((l.inputState.pinching = !0),
                this.dispatchEvent({ type: 'pinchstart', handedness: t.handedness, target: this }))
          } else
            null !== a &&
              ((i = e.getPose(t.targetRaySpace, n)),
              null !== i &&
                (a.matrix.fromArray(i.transform.matrix),
                a.matrix.decompose(a.position, a.rotation, a.scale))),
              null !== o &&
                t.gripSpace &&
                ((r = e.getPose(t.gripSpace, n)),
                null !== r &&
                  (o.matrix.fromArray(r.transform.matrix),
                  o.matrix.decompose(o.position, o.rotation, o.scale)))
        return (
          null !== a && (a.visible = null !== i),
          null !== o && (o.visible = null !== r),
          null !== l && (l.visible = null !== s),
          this
        )
      },
    }),
    Object.assign(xr.prototype, L.prototype),
    (class extends br {}.prototype.isWebGL1Renderer = !0)
  class wr {
    constructor(t, e) {
      ;(this.name = ''), (this.color = new he(t)), (this.density = void 0 !== e ? e : 25e-5)
    }
    clone() {
      return new wr(this.color, this.density)
    }
    toJSON() {
      return { type: 'FogExp2', color: this.color.getHex(), density: this.density }
    }
  }
  wr.prototype.isFogExp2 = !0
  class Mr {
    constructor(t, e, n) {
      ;(this.name = ''),
        (this.color = new he(t)),
        (this.near = void 0 !== e ? e : 1),
        (this.far = void 0 !== n ? n : 1e3)
    }
    clone() {
      return new Mr(this.color, this.near, this.far)
    }
    toJSON() {
      return { type: 'Fog', color: this.color.getHex(), near: this.near, far: this.far }
    }
  }
  Mr.prototype.isFog = !0
  class Sr extends Ut {
    constructor() {
      super(),
        (this.type = 'Scene'),
        (this.background = null),
        (this.environment = null),
        (this.fog = null),
        (this.overrideMaterial = null),
        (this.autoUpdate = !0),
        'undefined' != typeof __THREE_DEVTOOLS__ &&
          __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }))
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        null !== t.background && (this.background = t.background.clone()),
        null !== t.environment && (this.environment = t.environment.clone()),
        null !== t.fog && (this.fog = t.fog.clone()),
        null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()),
        (this.autoUpdate = t.autoUpdate),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this
      )
    }
    toJSON(t) {
      const e = super.toJSON(t)
      return (
        null !== this.background && (e.object.background = this.background.toJSON(t)),
        null !== this.environment && (e.object.environment = this.environment.toJSON(t)),
        null !== this.fog && (e.object.fog = this.fog.toJSON()),
        e
      )
    }
  }
  function Er(t, e) {
    ;(this.array = t),
      (this.stride = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0),
      (this.uuid = P.generateUUID())
  }
  ;(Sr.prototype.isScene = !0),
    Object.defineProperty(Er.prototype, 'needsUpdate', {
      set: function (t) {
        !0 === t && this.version++
      },
    }),
    Object.assign(Er.prototype, {
      isInterleavedBuffer: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this
      },
      copy: function (t) {
        return (
          (this.array = new t.array.constructor(t.array)),
          (this.count = t.count),
          (this.stride = t.stride),
          (this.usage = t.usage),
          this
        )
      },
      copyAt: function (t, e, n) {
        ;(t *= this.stride), (n *= e.stride)
        for (let i = 0, r = this.stride; i < r; i++) this.array[t + i] = e.array[n + i]
        return this
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this
      },
      clone: function (t) {
        void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = P.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer)
        const e = new Er(
          new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
          this.stride
        )
        return e.setUsage(this.usage), e
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this
      },
      toJSON: function (t) {
        return (
          void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = P.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] = Array.prototype.slice.call(
              new Uint32Array(this.array.buffer)
            )),
          {
            uuid: this.uuid,
            buffer: this.array.buffer._uuid,
            type: this.array.constructor.name,
            stride: this.stride,
          }
        )
      },
    })
  const Tr = new G()
  function Lr(t, e, n, i) {
    ;(this.name = ''),
      (this.data = t),
      (this.itemSize = e),
      (this.offset = n),
      (this.normalized = !0 === i)
  }
  Object.defineProperties(Lr.prototype, {
    count: {
      get: function () {
        return this.data.count
      },
    },
    array: {
      get: function () {
        return this.data.array
      },
    },
    needsUpdate: {
      set: function (t) {
        this.data.needsUpdate = t
      },
    },
  }),
    Object.assign(Lr.prototype, {
      isInterleavedBufferAttribute: !0,
      applyMatrix4: function (t) {
        for (let e = 0, n = this.data.count; e < n; e++)
          (Tr.x = this.getX(e)),
            (Tr.y = this.getY(e)),
            (Tr.z = this.getZ(e)),
            Tr.applyMatrix4(t),
            this.setXYZ(e, Tr.x, Tr.y, Tr.z)
        return this
      },
      setX: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset] = e), this
      },
      setY: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset + 1] = e), this
      },
      setZ: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset + 2] = e), this
      },
      setW: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset + 3] = e), this
      },
      getX: function (t) {
        return this.data.array[t * this.data.stride + this.offset]
      },
      getY: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 1]
      },
      getZ: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 2]
      },
      getW: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 3]
      },
      setXY: function (t, e, n) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          this
        )
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          this
        )
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          (this.data.array[t + 3] = r),
          this
        )
      },
      clone: function (t) {
        if (void 0 === t) {
          console.log(
            'THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.'
          )
          const t = []
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset
            for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[n + e])
          }
          return new fe(new this.array.constructor(t), this.itemSize, this.normalized)
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
          new Lr(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
        )
      },
      toJSON: function (t) {
        if (void 0 === t) {
          console.log(
            'THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.'
          )
          const t = []
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset
            for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[n + e])
          }
          return {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: t,
            normalized: this.normalized,
          }
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
          {
            isInterleavedBufferAttribute: !0,
            itemSize: this.itemSize,
            data: this.data.uuid,
            offset: this.offset,
            normalized: this.normalized,
          }
        )
      },
    })
  class Ar extends ie {
    constructor(t) {
      super(),
        (this.type = 'SpriteMaterial'),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.rotation = 0),
        (this.sizeAttenuation = !0),
        (this.transparent = !0),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.rotation = t.rotation),
        (this.sizeAttenuation = t.sizeAttenuation),
        this
      )
    }
  }
  let Rr
  Ar.prototype.isSpriteMaterial = !0
  const Pr = new G(),
    Cr = new G(),
    Dr = new G(),
    Ir = new C(),
    Nr = new C(),
    Or = new mt(),
    zr = new G(),
    Hr = new G(),
    Br = new G(),
    Fr = new C(),
    Ur = new C(),
    Gr = new C()
  function kr(t, e, n, i, r, s) {
    Ir.subVectors(t, n).addScalar(0.5).multiply(i),
      void 0 !== r ? ((Nr.x = s * Ir.x - r * Ir.y), (Nr.y = r * Ir.x + s * Ir.y)) : Nr.copy(Ir),
      t.copy(e),
      (t.x += Nr.x),
      (t.y += Nr.y),
      t.applyMatrix4(Or)
  }
  ;(class extends Ut {
    constructor(t) {
      if ((super(), (this.type = 'Sprite'), void 0 === Rr)) {
        Rr = new Ie()
        const t = new Er(
          new Float32Array([
            -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1,
          ]),
          5
        )
        Rr.setIndex([0, 1, 2, 0, 2, 3]),
          Rr.setAttribute('position', new Lr(t, 3, 0, !1)),
          Rr.setAttribute('uv', new Lr(t, 2, 3, !1))
      }
      ;(this.geometry = Rr),
        (this.material = void 0 !== t ? t : new Ar()),
        (this.center = new C(0.5, 0.5))
    }
    raycast(t, e) {
      null === t.camera &&
        console.error(
          'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
        ),
        Cr.setFromMatrixScale(this.matrixWorld),
        Or.copy(t.camera.matrixWorld),
        this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld),
        Dr.setFromMatrixPosition(this.modelViewMatrix),
        t.camera.isPerspectiveCamera &&
          !1 === this.material.sizeAttenuation &&
          Cr.multiplyScalar(-Dr.z)
      const n = this.material.rotation
      let i, r
      0 !== n && ((r = Math.cos(n)), (i = Math.sin(n)))
      const s = this.center
      kr(zr.set(-0.5, -0.5, 0), Dr, s, Cr, i, r),
        kr(Hr.set(0.5, -0.5, 0), Dr, s, Cr, i, r),
        kr(Br.set(0.5, 0.5, 0), Dr, s, Cr, i, r),
        Fr.set(0, 0),
        Ur.set(1, 0),
        Gr.set(1, 1)
      let a = t.ray.intersectTriangle(zr, Hr, Br, !1, Pr)
      if (
        null === a &&
        (kr(Hr.set(-0.5, 0.5, 0), Dr, s, Cr, i, r),
        Ur.set(0, 1),
        (a = t.ray.intersectTriangle(zr, Br, Hr, !1, Pr)),
        null === a)
      )
        return
      const o = t.ray.origin.distanceTo(Pr)
      o < t.near ||
        o > t.far ||
        e.push({
          distance: o,
          point: Pr.clone(),
          uv: ee.getUV(Pr, zr, Hr, Br, Fr, Ur, Gr, new C()),
          face: null,
          object: this,
        })
    }
    copy(t) {
      return (
        super.copy(t),
        void 0 !== t.center && this.center.copy(t.center),
        (this.material = t.material),
        this
      )
    }
  }.prototype.isSprite = !0)
  const Vr = new G(),
    Wr = new G()
  const jr = new G(),
    qr = new B(),
    Xr = new B(),
    Yr = new G(),
    Zr = new mt()
  function Jr(t, e) {
    Qe.call(this, t, e),
      (this.type = 'SkinnedMesh'),
      (this.bindMode = 'attached'),
      (this.bindMatrix = new mt()),
      (this.bindMatrixInverse = new mt())
  }
  function Qr() {
    Ut.call(this), (this.type = 'Bone')
  }
  ;(Jr.prototype = Object.assign(Object.create(Qe.prototype), {
    constructor: Jr,
    isSkinnedMesh: !0,
    copy: function (t) {
      return (
        Qe.prototype.copy.call(this, t),
        (this.bindMode = t.bindMode),
        this.bindMatrix.copy(t.bindMatrix),
        this.bindMatrixInverse.copy(t.bindMatrixInverse),
        (this.skeleton = t.skeleton),
        this
      )
    },
    bind: function (t, e) {
      ;(this.skeleton = t),
        void 0 === e &&
          (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), (e = this.matrixWorld)),
        this.bindMatrix.copy(e),
        this.bindMatrixInverse.copy(e).invert()
    },
    pose: function () {
      this.skeleton.pose()
    },
    normalizeSkinWeights: function () {
      const t = new B(),
        e = this.geometry.attributes.skinWeight
      for (let n = 0, i = e.count; n < i; n++) {
        ;(t.x = e.getX(n)), (t.y = e.getY(n)), (t.z = e.getZ(n)), (t.w = e.getW(n))
        const i = 1 / t.manhattanLength()
        i !== 1 / 0 ? t.multiplyScalar(i) : t.set(1, 0, 0, 0), e.setXYZW(n, t.x, t.y, t.z, t.w)
      }
    },
    updateMatrixWorld: function (t) {
      Qe.prototype.updateMatrixWorld.call(this, t),
        'attached' === this.bindMode
          ? this.bindMatrixInverse.copy(this.matrixWorld).invert()
          : 'detached' === this.bindMode
          ? this.bindMatrixInverse.copy(this.bindMatrix).invert()
          : console.warn('THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode)
    },
    boneTransform: function (t, e) {
      const n = this.skeleton,
        i = this.geometry
      qr.fromBufferAttribute(i.attributes.skinIndex, t),
        Xr.fromBufferAttribute(i.attributes.skinWeight, t),
        jr.fromBufferAttribute(i.attributes.position, t).applyMatrix4(this.bindMatrix),
        e.set(0, 0, 0)
      for (let t = 0; t < 4; t++) {
        const i = Xr.getComponent(t)
        if (0 !== i) {
          const r = qr.getComponent(t)
          Zr.multiplyMatrices(n.bones[r].matrixWorld, n.boneInverses[r]),
            e.addScaledVector(Yr.copy(jr).applyMatrix4(Zr), i)
        }
      }
      return e.applyMatrix4(this.bindMatrixInverse)
    },
  })),
    (Qr.prototype = Object.assign(Object.create(Ut.prototype), { constructor: Qr, isBone: !0 }))
  const Kr = new mt(),
    $r = new mt()
  class ts {
    constructor(t = [], e = []) {
      ;(this.uuid = P.generateUUID()),
        (this.bones = t.slice(0)),
        (this.boneInverses = e),
        (this.boneMatrices = null),
        (this.boneTexture = null),
        (this.boneTextureSize = 0),
        (this.frame = -1),
        this.init()
    }
    init() {
      const t = this.bones,
        e = this.boneInverses
      if (((this.boneMatrices = new Float32Array(16 * t.length)), 0 === e.length))
        this.calculateInverses()
      else if (t.length !== e.length) {
        console.warn(
          'THREE.Skeleton: Number of inverse bone matrices does not match amount of bones.'
        ),
          (this.boneInverses = [])
        for (let t = 0, e = this.bones.length; t < e; t++) this.boneInverses.push(new mt())
      }
    }
    calculateInverses() {
      this.boneInverses.length = 0
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = new mt()
        this.bones[t] && e.copy(this.bones[t].matrixWorld).invert(), this.boneInverses.push(e)
      }
    }
    pose() {
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t]
        e && e.matrixWorld.copy(this.boneInverses[t]).invert()
      }
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t]
        e &&
          (e.parent && e.parent.isBone
            ? (e.matrix.copy(e.parent.matrixWorld).invert(), e.matrix.multiply(e.matrixWorld))
            : e.matrix.copy(e.matrixWorld),
          e.matrix.decompose(e.position, e.quaternion, e.scale))
      }
    }
    update() {
      const t = this.bones,
        e = this.boneInverses,
        n = this.boneMatrices,
        i = this.boneTexture
      for (let i = 0, r = t.length; i < r; i++) {
        const r = t[i] ? t[i].matrixWorld : $r
        Kr.multiplyMatrices(r, e[i]), Kr.toArray(n, 16 * i)
      }
      null !== i && (i.needsUpdate = !0)
    }
    clone() {
      return new ts(this.bones, this.boneInverses)
    }
    getBoneByName(t) {
      for (let e = 0, n = this.bones.length; e < n; e++) {
        const n = this.bones[e]
        if (n.name === t) return n
      }
    }
    dispose() {
      null !== this.boneTexture && (this.boneTexture.dispose(), (this.boneTexture = null))
    }
    fromJSON(t, e) {
      this.uuid = t.uuid
      for (let n = 0, i = t.bones.length; n < i; n++) {
        const i = t.bones[n]
        let r = e[i]
        void 0 === r &&
          (console.warn('THREE.Skeleton: No bone found with UUID:', i), (r = new Qr())),
          this.bones.push(r),
          this.boneInverses.push(new mt().fromArray(t.boneInverses[n]))
      }
      return this.init(), this
    }
    toJSON() {
      const t = {
        metadata: { version: 4.5, type: 'Skeleton', generator: 'Skeleton.toJSON' },
        bones: [],
        boneInverses: [],
      }
      t.uuid = this.uuid
      const e = this.bones,
        n = this.boneInverses
      for (let i = 0, r = e.length; i < r; i++) {
        const r = e[i]
        t.bones.push(r.uuid)
        const s = n[i]
        t.boneInverses.push(s.toArray())
      }
      return t
    }
  }
  const es = new mt(),
    ns = new mt(),
    is = [],
    rs = new Qe()
  function ss(t, e, n) {
    Qe.call(this, t, e),
      (this.instanceMatrix = new fe(new Float32Array(16 * n), 16)),
      (this.instanceColor = null),
      (this.count = n),
      (this.frustumCulled = !1)
  }
  ss.prototype = Object.assign(Object.create(Qe.prototype), {
    constructor: ss,
    isInstancedMesh: !0,
    copy: function (t) {
      return (
        Qe.prototype.copy.call(this, t),
        this.instanceMatrix.copy(t.instanceMatrix),
        null !== t.instanceColor && (this.instanceColor = t.instanceColor.clone()),
        (this.count = t.count),
        this
      )
    },
    getColorAt: function (t, e) {
      e.fromArray(this.instanceColor.array, 3 * t)
    },
    getMatrixAt: function (t, e) {
      e.fromArray(this.instanceMatrix.array, 16 * t)
    },
    raycast: function (t, e) {
      const n = this.matrixWorld,
        i = this.count
      if (((rs.geometry = this.geometry), (rs.material = this.material), void 0 !== rs.material))
        for (let r = 0; r < i; r++) {
          this.getMatrixAt(r, es),
            ns.multiplyMatrices(n, es),
            (rs.matrixWorld = ns),
            rs.raycast(t, is)
          for (let t = 0, n = is.length; t < n; t++) {
            const n = is[t]
            ;(n.instanceId = r), (n.object = this), e.push(n)
          }
          is.length = 0
        }
    },
    setColorAt: function (t, e) {
      null === this.instanceColor &&
        (this.instanceColor = new fe(new Float32Array(3 * this.count), 3)),
        e.toArray(this.instanceColor.array, 3 * t)
    },
    setMatrixAt: function (t, e) {
      e.toArray(this.instanceMatrix.array, 16 * t)
    },
    updateMorphTargets: function () {},
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  class as extends ie {
    constructor(t) {
      super(),
        (this.type = 'LineBasicMaterial'),
        (this.color = new he(16777215)),
        (this.linewidth = 1),
        (this.linecap = 'round'),
        (this.linejoin = 'round'),
        (this.morphTargets = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.linewidth = t.linewidth),
        (this.linecap = t.linecap),
        (this.linejoin = t.linejoin),
        (this.morphTargets = t.morphTargets),
        this
      )
    }
  }
  as.prototype.isLineBasicMaterial = !0
  const os = new G(),
    ls = new G(),
    cs = new mt(),
    hs = new ft(),
    us = new at()
  function ds(t = new Ie(), e = new as()) {
    Ut.call(this),
      (this.type = 'Line'),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets()
  }
  ds.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: ds,
    isLine: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      )
    },
    computeLineDistances: function () {
      const t = this.geometry
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = [0]
          for (let t = 1, i = e.count; t < i; t++)
            os.fromBufferAttribute(e, t - 1),
              ls.fromBufferAttribute(e, t),
              (n[t] = n[t - 1]),
              (n[t] += os.distanceTo(ls))
          t.setAttribute('lineDistance', new Me(n, 1))
        } else
          console.warn(
            'THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.'
          )
      else
        t.isGeometry &&
          console.error(
            'THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
      return this
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Line.threshold
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        us.copy(n.boundingSphere),
        us.applyMatrix4(i),
        (us.radius += r),
        !1 === t.ray.intersectsSphere(us))
      )
        return
      cs.copy(i).invert(), hs.copy(t.ray).applyMatrix4(cs)
      const s = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        a = s * s,
        o = new G(),
        l = new G(),
        c = new G(),
        h = new G(),
        u = this.isLineSegments ? 2 : 1
      if (n.isBufferGeometry) {
        const i = n.index,
          r = n.attributes.position
        if (null !== i) {
          const n = i.array
          for (let i = 0, s = n.length - 1; i < s; i += u) {
            const s = n[i],
              u = n[i + 1]
            if (
              (o.fromBufferAttribute(r, s),
              l.fromBufferAttribute(r, u),
              hs.distanceSqToSegment(o, l, h, c) > a)
            )
              continue
            h.applyMatrix4(this.matrixWorld)
            const d = t.ray.origin.distanceTo(h)
            d < t.near ||
              d > t.far ||
              e.push({
                distance: d,
                point: c.clone().applyMatrix4(this.matrixWorld),
                index: i,
                face: null,
                faceIndex: null,
                object: this,
              })
          }
        } else
          for (let n = 0, i = r.count - 1; n < i; n += u) {
            if (
              (o.fromBufferAttribute(r, n),
              l.fromBufferAttribute(r, n + 1),
              hs.distanceSqToSegment(o, l, h, c) > a)
            )
              continue
            h.applyMatrix4(this.matrixWorld)
            const i = t.ray.origin.distanceTo(h)
            i < t.near ||
              i > t.far ||
              e.push({
                distance: i,
                point: c.clone().applyMatrix4(this.matrixWorld),
                index: n,
                face: null,
                faceIndex: null,
                object: this,
              })
          }
      } else
        n.isGeometry &&
          console.error(
            'THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
    },
    updateMorphTargets: function () {
      const t = this.geometry
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e)
        if (n.length > 0) {
          const t = e[n[0]]
          if (void 0 !== t) {
            ;(this.morphTargetInfluences = []), (this.morphTargetDictionary = {})
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e)
              this.morphTargetInfluences.push(0), (this.morphTargetDictionary[n] = e)
            }
          }
        }
      } else {
        const e = t.morphTargets
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            'THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
      }
    },
  })
  const ps = new G(),
    fs = new G()
  function ms(t, e) {
    ds.call(this, t, e), (this.type = 'LineSegments')
  }
  ms.prototype = Object.assign(Object.create(ds.prototype), {
    constructor: ms,
    isLineSegments: !0,
    computeLineDistances: function () {
      const t = this.geometry
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = []
          for (let t = 0, i = e.count; t < i; t += 2)
            ps.fromBufferAttribute(e, t),
              fs.fromBufferAttribute(e, t + 1),
              (n[t] = 0 === t ? 0 : n[t - 1]),
              (n[t + 1] = n[t] + ps.distanceTo(fs))
          t.setAttribute('lineDistance', new Me(n, 1))
        } else
          console.warn(
            'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.'
          )
      else
        t.isGeometry &&
          console.error(
            'THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
      return this
    },
  })
  ;(class extends ds {
    constructor(t, e) {
      super(t, e), (this.type = 'LineLoop')
    }
  }.prototype.isLineLoop = !0)
  class gs extends ie {
    constructor(t) {
      super(),
        (this.type = 'PointsMaterial'),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.size = 1),
        (this.sizeAttenuation = !0),
        (this.morphTargets = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.size = t.size),
        (this.sizeAttenuation = t.sizeAttenuation),
        (this.morphTargets = t.morphTargets),
        this
      )
    }
  }
  gs.prototype.isPointsMaterial = !0
  const vs = new mt(),
    ys = new ft(),
    xs = new at(),
    _s = new G()
  function bs(t = new Ie(), e = new gs()) {
    Ut.call(this),
      (this.type = 'Points'),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets()
  }
  function ws(t, e, n, i, r, s, a) {
    const o = ys.distanceSqToPoint(t)
    if (o < n) {
      const n = new G()
      ys.closestPointToPoint(t, n), n.applyMatrix4(i)
      const l = r.ray.origin.distanceTo(n)
      if (l < r.near || l > r.far) return
      s.push({
        distance: l,
        distanceToRay: Math.sqrt(o),
        point: n,
        index: e,
        face: null,
        object: a,
      })
    }
  }
  ;(bs.prototype = Object.assign(Object.create(Ut.prototype), {
    constructor: bs,
    isPoints: !0,
    copy: function (t) {
      return (
        Ut.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      )
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Points.threshold
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        xs.copy(n.boundingSphere),
        xs.applyMatrix4(i),
        (xs.radius += r),
        !1 === t.ray.intersectsSphere(xs))
      )
        return
      vs.copy(i).invert(), ys.copy(t.ray).applyMatrix4(vs)
      const s = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        a = s * s
      if (n.isBufferGeometry) {
        const r = n.index,
          s = n.attributes.position
        if (null !== r) {
          const n = r.array
          for (let r = 0, o = n.length; r < o; r++) {
            const o = n[r]
            _s.fromBufferAttribute(s, o), ws(_s, o, a, i, t, e, this)
          }
        } else
          for (let n = 0, r = s.count; n < r; n++)
            _s.fromBufferAttribute(s, n), ws(_s, n, a, i, t, e, this)
      } else
        console.error(
          'THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.'
        )
    },
    updateMorphTargets: function () {
      const t = this.geometry
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e)
        if (n.length > 0) {
          const t = e[n[0]]
          if (void 0 !== t) {
            ;(this.morphTargetInfluences = []), (this.morphTargetDictionary = {})
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e)
              this.morphTargetInfluences.push(0), (this.morphTargetDictionary[n] = e)
            }
          }
        }
      } else {
        const e = t.morphTargets
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            'THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.'
          )
      }
    },
  })),
    (class extends z {
      constructor(t, e, n, i, r, a, o, l, c) {
        super(t, e, n, i, r, a, o, l, c),
          (this.format = void 0 !== o ? o : d),
          (this.minFilter = void 0 !== a ? a : s),
          (this.magFilter = void 0 !== r ? r : s),
          (this.generateMipmaps = !1)
        const h = this
        'requestVideoFrameCallback' in t &&
          t.requestVideoFrameCallback(function e() {
            ;(h.needsUpdate = !0), t.requestVideoFrameCallback(e)
          })
      }
      clone() {
        return new this.constructor(this.image).copy(this)
      }
      update() {
        const t = this.image
        !1 == 'requestVideoFrameCallback' in t &&
          t.readyState >= t.HAVE_CURRENT_DATA &&
          (this.needsUpdate = !0)
      }
    }.prototype.isVideoTexture = !0)
  class Ms extends z {
    constructor(t, e, n, i, r, s, a, o, l, c, h, u) {
      super(null, s, a, o, l, c, i, r, h, u),
        (this.image = { width: e, height: n }),
        (this.mipmaps = t),
        (this.flipY = !1),
        (this.generateMipmaps = !1)
    }
  }
  ;(Ms.prototype.isCompressedTexture = !0),
    (class extends z {
      constructor(t, e, n, i, r, s, a, o, l) {
        super(t, e, n, i, r, s, a, o, l), (this.needsUpdate = !0)
      }
    }.prototype.isCanvasTexture = !0),
    (class extends z {
      constructor(t, e, n, i, s, a, l, c, h, d) {
        if ((d = void 0 !== d ? d : f) !== f && d !== m)
          throw new Error(
            'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat'
          )
        void 0 === n && d === f && (n = o),
          void 0 === n && d === m && (n = u),
          super(null, i, s, a, l, c, d, n, h),
          (this.image = { width: t, height: e }),
          (this.magFilter = void 0 !== l ? l : r),
          (this.minFilter = void 0 !== c ? c : r),
          (this.flipY = !1),
          (this.generateMipmaps = !1)
      }
    }.prototype.isDepthTexture = !0),
    new G(),
    new G(),
    new G(),
    new ee()
  function Ss(t, e, n, i, r) {
    let s, a
    if (
      r ===
      (function (t, e, n, i) {
        let r = 0
        for (let s = e, a = n - i; s < n; s += i)
          (r += (t[a] - t[s]) * (t[s + 1] + t[a + 1])), (a = s)
        return r
      })(t, e, n, i) >
        0
    )
      for (s = e; s < n; s += i) a = js(s, t[s], t[s + 1], a)
    else for (s = n - i; s >= e; s -= i) a = js(s, t[s], t[s + 1], a)
    return a && Fs(a, a.next) && (qs(a), (a = a.next)), a
  }
  function Es(t, e) {
    if (!t) return t
    e || (e = t)
    let n,
      i = t
    do {
      if (((n = !1), i.steiner || (!Fs(i, i.next) && 0 !== Bs(i.prev, i, i.next)))) i = i.next
      else {
        if ((qs(i), (i = e = i.prev), i === i.next)) break
        n = !0
      }
    } while (n || i !== e)
    return e
  }
  function Ts(t, e, n, i, r, s, a) {
    if (!t) return
    !a &&
      s &&
      (function (t, e, n, i) {
        let r = t
        do {
          null === r.z && (r.z = Ns(r.x, r.y, e, n, i)),
            (r.prevZ = r.prev),
            (r.nextZ = r.next),
            (r = r.next)
        } while (r !== t)
        ;(r.prevZ.nextZ = null),
          (r.prevZ = null),
          (function (t) {
            let e,
              n,
              i,
              r,
              s,
              a,
              o,
              l,
              c = 1
            do {
              for (n = t, t = null, s = null, a = 0; n; ) {
                for (a++, i = n, o = 0, e = 0; e < c && (o++, (i = i.nextZ), i); e++);
                for (l = c; o > 0 || (l > 0 && i); )
                  0 !== o && (0 === l || !i || n.z <= i.z)
                    ? ((r = n), (n = n.nextZ), o--)
                    : ((r = i), (i = i.nextZ), l--),
                    s ? (s.nextZ = r) : (t = r),
                    (r.prevZ = s),
                    (s = r)
                n = i
              }
              ;(s.nextZ = null), (c *= 2)
            } while (a > 1)
          })(r)
      })(t, i, r, s)
    let o,
      l,
      c = t
    for (; t.prev !== t.next; )
      if (((o = t.prev), (l = t.next), s ? As(t, i, r, s) : Ls(t)))
        e.push(o.i / n), e.push(t.i / n), e.push(l.i / n), qs(t), (t = l.next), (c = l.next)
      else if ((t = l) === c) {
        a
          ? 1 === a
            ? Ts((t = Rs(Es(t), e, n)), e, n, i, r, s, 2)
            : 2 === a && Ps(t, e, n, i, r, s)
          : Ts(Es(t), e, n, i, r, s, 1)
        break
      }
  }
  function Ls(t) {
    const e = t.prev,
      n = t,
      i = t.next
    if (Bs(e, n, i) >= 0) return !1
    let r = t.next.next
    for (; r !== t.prev; ) {
      if (zs(e.x, e.y, n.x, n.y, i.x, i.y, r.x, r.y) && Bs(r.prev, r, r.next) >= 0) return !1
      r = r.next
    }
    return !0
  }
  function As(t, e, n, i) {
    const r = t.prev,
      s = t,
      a = t.next
    if (Bs(r, s, a) >= 0) return !1
    const o = r.x < s.x ? (r.x < a.x ? r.x : a.x) : s.x < a.x ? s.x : a.x,
      l = r.y < s.y ? (r.y < a.y ? r.y : a.y) : s.y < a.y ? s.y : a.y,
      c = r.x > s.x ? (r.x > a.x ? r.x : a.x) : s.x > a.x ? s.x : a.x,
      h = r.y > s.y ? (r.y > a.y ? r.y : a.y) : s.y > a.y ? s.y : a.y,
      u = Ns(o, l, e, n, i),
      d = Ns(c, h, e, n, i)
    let p = t.prevZ,
      f = t.nextZ
    for (; p && p.z >= u && f && f.z <= d; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        zs(r.x, r.y, s.x, s.y, a.x, a.y, p.x, p.y) &&
        Bs(p.prev, p, p.next) >= 0
      )
        return !1
      if (
        ((p = p.prevZ),
        f !== t.prev &&
          f !== t.next &&
          zs(r.x, r.y, s.x, s.y, a.x, a.y, f.x, f.y) &&
          Bs(f.prev, f, f.next) >= 0)
      )
        return !1
      f = f.nextZ
    }
    for (; p && p.z >= u; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        zs(r.x, r.y, s.x, s.y, a.x, a.y, p.x, p.y) &&
        Bs(p.prev, p, p.next) >= 0
      )
        return !1
      p = p.prevZ
    }
    for (; f && f.z <= d; ) {
      if (
        f !== t.prev &&
        f !== t.next &&
        zs(r.x, r.y, s.x, s.y, a.x, a.y, f.x, f.y) &&
        Bs(f.prev, f, f.next) >= 0
      )
        return !1
      f = f.nextZ
    }
    return !0
  }
  function Rs(t, e, n) {
    let i = t
    do {
      const r = i.prev,
        s = i.next.next
      !Fs(r, s) &&
        Us(r, i, i.next, s) &&
        Vs(r, s) &&
        Vs(s, r) &&
        (e.push(r.i / n), e.push(i.i / n), e.push(s.i / n), qs(i), qs(i.next), (i = t = s)),
        (i = i.next)
    } while (i !== t)
    return Es(i)
  }
  function Ps(t, e, n, i, r, s) {
    let a = t
    do {
      let t = a.next.next
      for (; t !== a.prev; ) {
        if (a.i !== t.i && Hs(a, t)) {
          let o = Ws(a, t)
          return (
            (a = Es(a, a.next)),
            (o = Es(o, o.next)),
            Ts(a, e, n, i, r, s),
            void Ts(o, e, n, i, r, s)
          )
        }
        t = t.next
      }
      a = a.next
    } while (a !== t)
  }
  function Cs(t, e) {
    return t.x - e.x
  }
  function Ds(t, e) {
    if (
      ((e = (function (t, e) {
        let n = e
        const i = t.x,
          r = t.y
        let s,
          a = -1 / 0
        do {
          if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
            const t = n.x + ((r - n.y) * (n.next.x - n.x)) / (n.next.y - n.y)
            if (t <= i && t > a) {
              if (((a = t), t === i)) {
                if (r === n.y) return n
                if (r === n.next.y) return n.next
              }
              s = n.x < n.next.x ? n : n.next
            }
          }
          n = n.next
        } while (n !== e)
        if (!s) return null
        if (i === a) return s
        const o = s,
          l = s.x,
          c = s.y
        let h,
          u = 1 / 0
        n = s
        do {
          i >= n.x &&
            n.x >= l &&
            i !== n.x &&
            zs(r < c ? i : a, r, l, c, r < c ? a : i, r, n.x, n.y) &&
            ((h = Math.abs(r - n.y) / (i - n.x)),
            Vs(n, t) &&
              (h < u || (h === u && (n.x > s.x || (n.x === s.x && Is(s, n))))) &&
              ((s = n), (u = h))),
            (n = n.next)
        } while (n !== o)
        return s
      })(t, e)),
      e)
    ) {
      const n = Ws(e, t)
      Es(e, e.next), Es(n, n.next)
    }
  }
  function Is(t, e) {
    return Bs(t.prev, t, e.prev) < 0 && Bs(e.next, t, t.next) < 0
  }
  function Ns(t, e, n, i, r) {
    return (
      (t =
        1431655765 &
        ((t =
          858993459 &
          ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - n) * r) | (t << 8))) | (t << 4))) |
            (t << 2))) |
          (t << 1))) |
      ((e =
        1431655765 &
        ((e =
          858993459 &
          ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * r) | (e << 8))) | (e << 4))) |
            (e << 2))) |
          (e << 1))) <<
        1)
    )
  }
  function Os(t) {
    let e = t,
      n = t
    do {
      ;(e.x < n.x || (e.x === n.x && e.y < n.y)) && (n = e), (e = e.next)
    } while (e !== t)
    return n
  }
  function zs(t, e, n, i, r, s, a, o) {
    return (
      (r - a) * (e - o) - (t - a) * (s - o) >= 0 &&
      (t - a) * (i - o) - (n - a) * (e - o) >= 0 &&
      (n - a) * (s - o) - (r - a) * (i - o) >= 0
    )
  }
  function Hs(t, e) {
    return (
      t.next.i !== e.i &&
      t.prev.i !== e.i &&
      !(function (t, e) {
        let n = t
        do {
          if (
            n.i !== t.i &&
            n.next.i !== t.i &&
            n.i !== e.i &&
            n.next.i !== e.i &&
            Us(n, n.next, t, e)
          )
            return !0
          n = n.next
        } while (n !== t)
        return !1
      })(t, e) &&
      ((Vs(t, e) &&
        Vs(e, t) &&
        (function (t, e) {
          let n = t,
            i = !1
          const r = (t.x + e.x) / 2,
            s = (t.y + e.y) / 2
          do {
            n.y > s != n.next.y > s &&
              n.next.y !== n.y &&
              r < ((n.next.x - n.x) * (s - n.y)) / (n.next.y - n.y) + n.x &&
              (i = !i),
              (n = n.next)
          } while (n !== t)
          return i
        })(t, e) &&
        (Bs(t.prev, t, e.prev) || Bs(t, e.prev, e))) ||
        (Fs(t, e) && Bs(t.prev, t, t.next) > 0 && Bs(e.prev, e, e.next) > 0))
    )
  }
  function Bs(t, e, n) {
    return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)
  }
  function Fs(t, e) {
    return t.x === e.x && t.y === e.y
  }
  function Us(t, e, n, i) {
    const r = ks(Bs(t, e, n)),
      s = ks(Bs(t, e, i)),
      a = ks(Bs(n, i, t)),
      o = ks(Bs(n, i, e))
    return (
      (r !== s && a !== o) ||
      !(0 !== r || !Gs(t, n, e)) ||
      !(0 !== s || !Gs(t, i, e)) ||
      !(0 !== a || !Gs(n, t, i)) ||
      !(0 !== o || !Gs(n, e, i))
    )
  }
  function Gs(t, e, n) {
    return (
      e.x <= Math.max(t.x, n.x) &&
      e.x >= Math.min(t.x, n.x) &&
      e.y <= Math.max(t.y, n.y) &&
      e.y >= Math.min(t.y, n.y)
    )
  }
  function ks(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0
  }
  function Vs(t, e) {
    return Bs(t.prev, t, t.next) < 0
      ? Bs(t, e, t.next) >= 0 && Bs(t, t.prev, e) >= 0
      : Bs(t, e, t.prev) < 0 || Bs(t, t.next, e) < 0
  }
  function Ws(t, e) {
    const n = new Xs(t.i, t.x, t.y),
      i = new Xs(e.i, e.x, e.y),
      r = t.next,
      s = e.prev
    return (
      (t.next = e),
      (e.prev = t),
      (n.next = r),
      (r.prev = n),
      (i.next = n),
      (n.prev = i),
      (s.next = i),
      (i.prev = s),
      i
    )
  }
  function js(t, e, n, i) {
    const r = new Xs(t, e, n)
    return (
      i
        ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r))
        : ((r.prev = r), (r.next = r)),
      r
    )
  }
  function qs(t) {
    ;(t.next.prev = t.prev),
      (t.prev.next = t.next),
      t.prevZ && (t.prevZ.nextZ = t.nextZ),
      t.nextZ && (t.nextZ.prevZ = t.prevZ)
  }
  function Xs(t, e, n) {
    ;(this.i = t),
      (this.x = e),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1)
  }
  const Ys = {
    area: function (t) {
      const e = t.length
      let n = 0
      for (let i = e - 1, r = 0; r < e; i = r++) n += t[i].x * t[r].y - t[r].x * t[i].y
      return 0.5 * n
    },
    isClockWise: function (t) {
      return Ys.area(t) < 0
    },
    triangulateShape: function (t, e) {
      const n = [],
        i = [],
        r = []
      Zs(t), Js(n, t)
      let s = t.length
      e.forEach(Zs)
      for (let t = 0; t < e.length; t++) i.push(s), (s += e[t].length), Js(n, e[t])
      const a = (function (t, e, n) {
        n = n || 2
        const i = e && e.length,
          r = i ? e[0] * n : t.length
        let s = Ss(t, 0, r, n, !0)
        const a = []
        if (!s || s.next === s.prev) return a
        let o, l, c, h, u, d, p
        if (
          (i &&
            (s = (function (t, e, n, i) {
              const r = []
              let s, a, o, l, c
              for (s = 0, a = e.length; s < a; s++)
                (o = e[s] * i),
                  (l = s < a - 1 ? e[s + 1] * i : t.length),
                  (c = Ss(t, o, l, i, !1)),
                  c === c.next && (c.steiner = !0),
                  r.push(Os(c))
              for (r.sort(Cs), s = 0; s < r.length; s++) Ds(r[s], n), (n = Es(n, n.next))
              return n
            })(t, e, s, n)),
          t.length > 80 * n)
        ) {
          ;(o = c = t[0]), (l = h = t[1])
          for (let e = n; e < r; e += n)
            (u = t[e]),
              (d = t[e + 1]),
              u < o && (o = u),
              d < l && (l = d),
              u > c && (c = u),
              d > h && (h = d)
          ;(p = Math.max(c - o, h - l)), (p = 0 !== p ? 1 / p : 0)
        }
        return Ts(s, a, n, o, l, p), a
      })(n, i)
      for (let t = 0; t < a.length; t += 3) r.push(a.slice(t, t + 3))
      return r
    },
  }
  function Zs(t) {
    const e = t.length
    e > 2 && t[e - 1].equals(t[0]) && t.pop()
  }
  function Js(t, e) {
    for (let n = 0; n < e.length; n++) t.push(e[n].x), t.push(e[n].y)
  }
  class Qs extends Ie {
    constructor(t, e) {
      super(),
        (this.type = 'ExtrudeGeometry'),
        (this.parameters = { shapes: t, options: e }),
        (t = Array.isArray(t) ? t : [t])
      const n = this,
        i = [],
        r = []
      for (let e = 0, n = t.length; e < n; e++) s(t[e])
      function s(t) {
        const s = [],
          a = void 0 !== e.curveSegments ? e.curveSegments : 12,
          o = void 0 !== e.steps ? e.steps : 1
        let l = void 0 !== e.depth ? e.depth : 100,
          c = void 0 === e.bevelEnabled || e.bevelEnabled,
          h = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
          u = void 0 !== e.bevelSize ? e.bevelSize : h - 2,
          d = void 0 !== e.bevelOffset ? e.bevelOffset : 0,
          p = void 0 !== e.bevelSegments ? e.bevelSegments : 3
        const f = e.extrudePath,
          m = void 0 !== e.UVGenerator ? e.UVGenerator : Ks
        void 0 !== e.amount &&
          (console.warn('THREE.ExtrudeBufferGeometry: amount has been renamed to depth.'),
          (l = e.amount))
        let g,
          v,
          y,
          x,
          _,
          b = !1
        f &&
          ((g = f.getSpacedPoints(o)),
          (b = !0),
          (c = !1),
          (v = f.computeFrenetFrames(o, !1)),
          (y = new G()),
          (x = new G()),
          (_ = new G())),
          c || ((p = 0), (h = 0), (u = 0), (d = 0))
        const w = t.extractPoints(a)
        let M = w.shape
        const S = w.holes
        if (!Ys.isClockWise(M)) {
          M = M.reverse()
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t]
            Ys.isClockWise(e) && (S[t] = e.reverse())
          }
        }
        const E = Ys.triangulateShape(M, S),
          T = M
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t]
          M = M.concat(e)
        }
        function L(t, e, n) {
          return (
            e || console.error('THREE.ExtrudeGeometry: vec does not exist'),
            e.clone().multiplyScalar(n).add(t)
          )
        }
        const A = M.length,
          R = E.length
        function P(t, e, n) {
          let i, r, s
          const a = t.x - e.x,
            o = t.y - e.y,
            l = n.x - t.x,
            c = n.y - t.y,
            h = a * a + o * o,
            u = a * c - o * l
          if (Math.abs(u) > Number.EPSILON) {
            const u = Math.sqrt(h),
              d = Math.sqrt(l * l + c * c),
              p = e.x - o / u,
              f = e.y + a / u,
              m = ((n.x - c / d - p) * c - (n.y + l / d - f) * l) / (a * c - o * l)
            ;(i = p + a * m - t.x), (r = f + o * m - t.y)
            const g = i * i + r * r
            if (g <= 2) return new C(i, r)
            s = Math.sqrt(g / 2)
          } else {
            let t = !1
            a > Number.EPSILON
              ? l > Number.EPSILON && (t = !0)
              : a < -Number.EPSILON
              ? l < -Number.EPSILON && (t = !0)
              : Math.sign(o) === Math.sign(c) && (t = !0),
              t
                ? ((i = -o), (r = a), (s = Math.sqrt(h)))
                : ((i = a), (r = o), (s = Math.sqrt(h / 2)))
          }
          return new C(i / s, r / s)
        }
        const D = []
        for (let t = 0, e = T.length, n = e - 1, i = t + 1; t < e; t++, n++, i++)
          n === e && (n = 0), i === e && (i = 0), (D[t] = P(T[t], T[n], T[i]))
        const I = []
        let N,
          O = D.concat()
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t]
          N = []
          for (let t = 0, n = e.length, i = n - 1, r = t + 1; t < n; t++, i++, r++)
            i === n && (i = 0), r === n && (r = 0), (N[t] = P(e[t], e[i], e[r]))
          I.push(N), (O = O.concat(N))
        }
        for (let t = 0; t < p; t++) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d
          for (let t = 0, e = T.length; t < e; t++) {
            const e = L(T[t], D[t], i)
            B(e.x, e.y, -n)
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t]
            N = I[t]
            for (let t = 0, r = e.length; t < r; t++) {
              const r = L(e[t], N[t], i)
              B(r.x, r.y, -n)
            }
          }
        }
        const z = u + d
        for (let t = 0; t < A; t++) {
          const e = c ? L(M[t], O[t], z) : M[t]
          b
            ? (x.copy(v.normals[0]).multiplyScalar(e.x),
              y.copy(v.binormals[0]).multiplyScalar(e.y),
              _.copy(g[0]).add(x).add(y),
              B(_.x, _.y, _.z))
            : B(e.x, e.y, 0)
        }
        for (let t = 1; t <= o; t++)
          for (let e = 0; e < A; e++) {
            const n = c ? L(M[e], O[e], z) : M[e]
            b
              ? (x.copy(v.normals[t]).multiplyScalar(n.x),
                y.copy(v.binormals[t]).multiplyScalar(n.y),
                _.copy(g[t]).add(x).add(y),
                B(_.x, _.y, _.z))
              : B(n.x, n.y, (l / o) * t)
          }
        for (let t = p - 1; t >= 0; t--) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d
          for (let t = 0, e = T.length; t < e; t++) {
            const e = L(T[t], D[t], i)
            B(e.x, e.y, l + n)
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t]
            N = I[t]
            for (let t = 0, r = e.length; t < r; t++) {
              const r = L(e[t], N[t], i)
              b ? B(r.x, r.y + g[o - 1].y, g[o - 1].x + n) : B(r.x, r.y, l + n)
            }
          }
        }
        function H(t, e) {
          let n = t.length
          for (; --n >= 0; ) {
            const i = n
            let r = n - 1
            r < 0 && (r = t.length - 1)
            for (let t = 0, n = o + 2 * p; t < n; t++) {
              const n = A * t,
                s = A * (t + 1)
              U(e + i + n, e + r + n, e + r + s, e + i + s)
            }
          }
        }
        function B(t, e, n) {
          s.push(t), s.push(e), s.push(n)
        }
        function F(t, e, r) {
          k(t), k(e), k(r)
          const s = i.length / 3,
            a = m.generateTopUV(n, i, s - 3, s - 2, s - 1)
          V(a[0]), V(a[1]), V(a[2])
        }
        function U(t, e, r, s) {
          k(t), k(e), k(s), k(e), k(r), k(s)
          const a = i.length / 3,
            o = m.generateSideWallUV(n, i, a - 6, a - 3, a - 2, a - 1)
          V(o[0]), V(o[1]), V(o[3]), V(o[1]), V(o[2]), V(o[3])
        }
        function k(t) {
          i.push(s[3 * t + 0]), i.push(s[3 * t + 1]), i.push(s[3 * t + 2])
        }
        function V(t) {
          r.push(t.x), r.push(t.y)
        }
        !(function () {
          const t = i.length / 3
          if (c) {
            let t = 0,
              e = A * t
            for (let t = 0; t < R; t++) {
              const n = E[t]
              F(n[2] + e, n[1] + e, n[0] + e)
            }
            ;(t = o + 2 * p), (e = A * t)
            for (let t = 0; t < R; t++) {
              const n = E[t]
              F(n[0] + e, n[1] + e, n[2] + e)
            }
          } else {
            for (let t = 0; t < R; t++) {
              const e = E[t]
              F(e[2], e[1], e[0])
            }
            for (let t = 0; t < R; t++) {
              const e = E[t]
              F(e[0] + A * o, e[1] + A * o, e[2] + A * o)
            }
          }
          n.addGroup(t, i.length / 3 - t, 0)
        })(),
          (function () {
            const t = i.length / 3
            let e = 0
            H(T, e), (e += T.length)
            for (let t = 0, n = S.length; t < n; t++) {
              const n = S[t]
              H(n, e), (e += n.length)
            }
            n.addGroup(t, i.length / 3 - t, 1)
          })()
      }
      this.setAttribute('position', new Me(i, 3)),
        this.setAttribute('uv', new Me(r, 2)),
        this.computeVertexNormals()
    }
    toJSON() {
      const t = Ie.prototype.toJSON.call(this)
      return (function (t, e, n) {
        if (((n.shapes = []), Array.isArray(t)))
          for (let e = 0, i = t.length; e < i; e++) {
            const i = t[e]
            n.shapes.push(i.uuid)
          }
        else n.shapes.push(t.uuid)
        return void 0 !== e.extrudePath && (n.options.extrudePath = e.extrudePath.toJSON()), n
      })(this.parameters.shapes, this.parameters.options, t)
    }
  }
  const Ks = {
    generateTopUV: function (t, e, n, i, r) {
      const s = e[3 * n],
        a = e[3 * n + 1],
        o = e[3 * i],
        l = e[3 * i + 1],
        c = e[3 * r],
        h = e[3 * r + 1]
      return [new C(s, a), new C(o, l), new C(c, h)]
    },
    generateSideWallUV: function (t, e, n, i, r, s) {
      const a = e[3 * n],
        o = e[3 * n + 1],
        l = e[3 * n + 2],
        c = e[3 * i],
        h = e[3 * i + 1],
        u = e[3 * i + 2],
        d = e[3 * r],
        p = e[3 * r + 1],
        f = e[3 * r + 2],
        m = e[3 * s],
        g = e[3 * s + 1],
        v = e[3 * s + 2]
      return Math.abs(o - h) < 0.01
        ? [new C(a, 1 - l), new C(c, 1 - u), new C(d, 1 - f), new C(m, 1 - v)]
        : [new C(o, 1 - l), new C(h, 1 - u), new C(p, 1 - f), new C(g, 1 - v)]
    },
  }
  function $s(t, e, n) {
    Ie.call(this),
      (this.type = 'ParametricGeometry'),
      (this.parameters = { func: t, slices: e, stacks: n })
    const i = [],
      r = [],
      s = [],
      a = [],
      o = 1e-5,
      l = new G(),
      c = new G(),
      h = new G(),
      u = new G(),
      d = new G()
    t.length < 3 &&
      console.error(
        'THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.'
      )
    const p = e + 1
    for (let i = 0; i <= n; i++) {
      const p = i / n
      for (let n = 0; n <= e; n++) {
        const i = n / e
        t(i, p, c),
          r.push(c.x, c.y, c.z),
          i - o >= 0 ? (t(i - o, p, h), u.subVectors(c, h)) : (t(i + o, p, h), u.subVectors(h, c)),
          p - o >= 0 ? (t(i, p - o, h), d.subVectors(c, h)) : (t(i, p + o, h), d.subVectors(h, c)),
          l.crossVectors(u, d).normalize(),
          s.push(l.x, l.y, l.z),
          a.push(i, p)
      }
    }
    for (let t = 0; t < n; t++)
      for (let n = 0; n < e; n++) {
        const e = t * p + n,
          r = t * p + n + 1,
          s = (t + 1) * p + n + 1,
          a = (t + 1) * p + n
        i.push(e, r, a), i.push(r, s, a)
      }
    this.setIndex(i),
      this.setAttribute('position', new Me(r, 3)),
      this.setAttribute('normal', new Me(s, 3)),
      this.setAttribute('uv', new Me(a, 2))
  }
  ;($s.prototype = Object.create(Ie.prototype)), ($s.prototype.constructor = $s)
  class ta extends Ie {
    constructor(t, e = 12) {
      super(), (this.type = 'ShapeGeometry'), (this.parameters = { shapes: t, curveSegments: e })
      const n = [],
        i = [],
        r = [],
        s = []
      let a = 0,
        o = 0
      if (!1 === Array.isArray(t)) l(t)
      else for (let e = 0; e < t.length; e++) l(t[e]), this.addGroup(a, o, e), (a += o), (o = 0)
      function l(t) {
        const a = i.length / 3,
          l = t.extractPoints(e)
        let c = l.shape
        const h = l.holes
        !1 === Ys.isClockWise(c) && (c = c.reverse())
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t]
          !0 === Ys.isClockWise(e) && (h[t] = e.reverse())
        }
        const u = Ys.triangulateShape(c, h)
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t]
          c = c.concat(e)
        }
        for (let t = 0, e = c.length; t < e; t++) {
          const e = c[t]
          i.push(e.x, e.y, 0), r.push(0, 0, 1), s.push(e.x, e.y)
        }
        for (let t = 0, e = u.length; t < e; t++) {
          const e = u[t],
            i = e[0] + a,
            r = e[1] + a,
            s = e[2] + a
          n.push(i, r, s), (o += 3)
        }
      }
      this.setIndex(n),
        this.setAttribute('position', new Me(i, 3)),
        this.setAttribute('normal', new Me(r, 3)),
        this.setAttribute('uv', new Me(s, 2))
    }
    toJSON() {
      const t = Ie.prototype.toJSON.call(this)
      return (function (t, e) {
        if (((e.shapes = []), Array.isArray(t)))
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n]
            e.shapes.push(i.uuid)
          }
        else e.shapes.push(t.uuid)
        return e
      })(this.parameters.shapes, t)
    }
  }
  class ea extends Ie {
    constructor(t = 1, e = 8, n = 6, i = 0, r = 2 * Math.PI, s = 0, a = Math.PI) {
      super(),
        (this.type = 'SphereGeometry'),
        (this.parameters = {
          radius: t,
          widthSegments: e,
          heightSegments: n,
          phiStart: i,
          phiLength: r,
          thetaStart: s,
          thetaLength: a,
        }),
        (e = Math.max(3, Math.floor(e))),
        (n = Math.max(2, Math.floor(n)))
      const o = Math.min(s + a, Math.PI)
      let l = 0
      const c = [],
        h = new G(),
        u = new G(),
        d = [],
        p = [],
        f = [],
        m = []
      for (let d = 0; d <= n; d++) {
        const g = [],
          v = d / n
        let y = 0
        0 == d && 0 == s ? (y = 0.5 / e) : d == n && o == Math.PI && (y = -0.5 / e)
        for (let n = 0; n <= e; n++) {
          const o = n / e
          ;(h.x = -t * Math.cos(i + o * r) * Math.sin(s + v * a)),
            (h.y = t * Math.cos(s + v * a)),
            (h.z = t * Math.sin(i + o * r) * Math.sin(s + v * a)),
            p.push(h.x, h.y, h.z),
            u.copy(h).normalize(),
            f.push(u.x, u.y, u.z),
            m.push(o + y, 1 - v),
            g.push(l++)
        }
        c.push(g)
      }
      for (let t = 0; t < n; t++)
        for (let i = 0; i < e; i++) {
          const e = c[t][i + 1],
            r = c[t][i],
            a = c[t + 1][i],
            l = c[t + 1][i + 1]
          ;(0 !== t || s > 0) && d.push(e, r, l), (t !== n - 1 || o < Math.PI) && d.push(r, a, l)
        }
      this.setIndex(d),
        this.setAttribute('position', new Me(p, 3)),
        this.setAttribute('normal', new Me(f, 3)),
        this.setAttribute('uv', new Me(m, 2))
    }
  }
  ;(class extends ie {
    constructor(t) {
      super(),
        (this.type = 'ShadowMaterial'),
        (this.color = new he(0)),
        (this.transparent = !0),
        this.setValues(t)
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this
    }
  }.prototype.isShadowMaterial = !0)
  function na(t) {
    ie.call(this),
      (this.defines = { STANDARD: '' }),
      (this.type = 'MeshStandardMaterial'),
      (this.color = new he(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new he(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new C(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.flatShading = !1),
      (this.vertexTangents = !1),
      this.setValues(t)
  }
  function ia(t) {
    na.call(this),
      (this.defines = { STANDARD: '', PHYSICAL: '' }),
      (this.type = 'MeshPhysicalMaterial'),
      (this.clearcoat = 0),
      (this.clearcoatMap = null),
      (this.clearcoatRoughness = 0),
      (this.clearcoatRoughnessMap = null),
      (this.clearcoatNormalScale = new C(1, 1)),
      (this.clearcoatNormalMap = null),
      (this.reflectivity = 0.5),
      Object.defineProperty(this, 'ior', {
        get: function () {
          return (1 + 0.4 * this.reflectivity) / (1 - 0.4 * this.reflectivity)
        },
        set: function (t) {
          this.reflectivity = P.clamp((2.5 * (t - 1)) / (t + 1), 0, 1)
        },
      }),
      (this.sheen = null),
      (this.transmission = 0),
      (this.transmissionMap = null),
      this.setValues(t)
  }
  ;((class extends rn {
    constructor(t) {
      super(t), (this.type = 'RawShaderMaterial')
    }
  }.prototype.isRawShaderMaterial = !0),
    (na.prototype = Object.create(ie.prototype)),
    (na.prototype.constructor = na),
    (na.prototype.isMeshStandardMaterial = !0),
    (na.prototype.copy = function (t) {
      return (
        ie.prototype.copy.call(this, t),
        (this.defines = { STANDARD: '' }),
        this.color.copy(t.color),
        (this.roughness = t.roughness),
        (this.metalness = t.metalness),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.roughnessMap = t.roughnessMap),
        (this.metalnessMap = t.metalnessMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.envMapIntensity = t.envMapIntensity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        (this.vertexTangents = t.vertexTangents),
        this
      )
    }),
    (ia.prototype = Object.create(na.prototype)),
    (ia.prototype.constructor = ia),
    (ia.prototype.isMeshPhysicalMaterial = !0),
    (ia.prototype.copy = function (t) {
      return (
        na.prototype.copy.call(this, t),
        (this.defines = { STANDARD: '', PHYSICAL: '' }),
        (this.clearcoat = t.clearcoat),
        (this.clearcoatMap = t.clearcoatMap),
        (this.clearcoatRoughness = t.clearcoatRoughness),
        (this.clearcoatRoughnessMap = t.clearcoatRoughnessMap),
        (this.clearcoatNormalMap = t.clearcoatNormalMap),
        this.clearcoatNormalScale.copy(t.clearcoatNormalScale),
        (this.reflectivity = t.reflectivity),
        t.sheen ? (this.sheen = (this.sheen || new he()).copy(t.sheen)) : (this.sheen = null),
        (this.transmission = t.transmission),
        (this.transmissionMap = t.transmissionMap),
        this
      )
    }))
  class ra extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshPhongMaterial'),
        (this.color = new he(16777215)),
        (this.specular = new he(1118481)),
        (this.shininess = 30),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new C(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = 'round'),
        (this.wireframeLinejoin = 'round'),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        this.specular.copy(t.specular),
        (this.shininess = t.shininess),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      )
    }
  }
  ra.prototype.isMeshPhongMaterial = !0
  ;(class extends ie {
    constructor(t) {
      super(),
        (this.defines = { TOON: '' }),
        (this.type = 'MeshToonMaterial'),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.gradientMap = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new C(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.alphaMap = null),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = 'round'),
        (this.wireframeLinejoin = 'round'),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.gradientMap = t.gradientMap),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      )
    }
  }.prototype.isMeshToonMaterial = !0)
  ;(class extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshNormalMaterial'),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new C(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      )
    }
  }.prototype.isMeshNormalMaterial = !0)
  ;(class extends ie {
    constructor(t) {
      super(),
        (this.type = 'MeshLambertMaterial'),
        (this.color = new he(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.emissive = new he(0)),
        (this.emissiveIntensity = 1),
        (this.emissiveMap = null),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.combine = 0),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = 'round'),
        (this.wireframeLinejoin = 'round'),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      )
    }
  }.prototype.isMeshLambertMaterial = !0)
  ;(class extends ie {
    constructor(t) {
      super(),
        (this.defines = { MATCAP: '' }),
        (this.type = 'MeshMatcapMaterial'),
        (this.color = new he(16777215)),
        (this.matcap = null),
        (this.map = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalMapType = 0),
        (this.normalScale = new C(1, 1)),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.alphaMap = null),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        (this.flatShading = !1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.defines = { MATCAP: '' }),
        this.color.copy(t.color),
        (this.matcap = t.matcap),
        (this.map = t.map),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.flatShading = t.flatShading),
        this
      )
    }
  }.prototype.isMeshMatcapMaterial = !0)
  ;(class extends as {
    constructor(t) {
      super(),
        (this.type = 'LineDashedMaterial'),
        (this.scale = 1),
        (this.dashSize = 3),
        (this.gapSize = 1),
        this.setValues(t)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.scale = t.scale),
        (this.dashSize = t.dashSize),
        (this.gapSize = t.gapSize),
        this
      )
    }
  }.prototype.isLineDashedMaterial = !0)
  const sa = {
    arraySlice: function (t, e, n) {
      return sa.isTypedArray(t)
        ? new t.constructor(t.subarray(e, void 0 !== n ? n : t.length))
        : t.slice(e, n)
    },
    convertArray: function (t, e, n) {
      return !t || (!n && t.constructor === e)
        ? t
        : 'number' == typeof e.BYTES_PER_ELEMENT
        ? new e(t)
        : Array.prototype.slice.call(t)
    },
    isTypedArray: function (t) {
      return ArrayBuffer.isView(t) && !(t instanceof DataView)
    },
    getKeyframeOrder: function (t) {
      const e = t.length,
        n = new Array(e)
      for (let t = 0; t !== e; ++t) n[t] = t
      return (
        n.sort(function (e, n) {
          return t[e] - t[n]
        }),
        n
      )
    },
    sortedArray: function (t, e, n) {
      const i = t.length,
        r = new t.constructor(i)
      for (let s = 0, a = 0; a !== i; ++s) {
        const i = n[s] * e
        for (let n = 0; n !== e; ++n) r[a++] = t[i + n]
      }
      return r
    },
    flattenJSON: function (t, e, n, i) {
      let r = 1,
        s = t[0]
      for (; void 0 !== s && void 0 === s[i]; ) s = t[r++]
      if (void 0 === s) return
      let a = s[i]
      if (void 0 !== a)
        if (Array.isArray(a))
          do {
            ;(a = s[i]), void 0 !== a && (e.push(s.time), n.push.apply(n, a)), (s = t[r++])
          } while (void 0 !== s)
        else if (void 0 !== a.toArray)
          do {
            ;(a = s[i]), void 0 !== a && (e.push(s.time), a.toArray(n, n.length)), (s = t[r++])
          } while (void 0 !== s)
        else
          do {
            ;(a = s[i]), void 0 !== a && (e.push(s.time), n.push(a)), (s = t[r++])
          } while (void 0 !== s)
    },
    subclip: function (t, e, n, i, r = 30) {
      const s = t.clone()
      s.name = e
      const a = []
      for (let t = 0; t < s.tracks.length; ++t) {
        const e = s.tracks[t],
          o = e.getValueSize(),
          l = [],
          c = []
        for (let t = 0; t < e.times.length; ++t) {
          const s = e.times[t] * r
          if (!(s < n || s >= i)) {
            l.push(e.times[t])
            for (let n = 0; n < o; ++n) c.push(e.values[t * o + n])
          }
        }
        0 !== l.length &&
          ((e.times = sa.convertArray(l, e.times.constructor)),
          (e.values = sa.convertArray(c, e.values.constructor)),
          a.push(e))
      }
      s.tracks = a
      let o = 1 / 0
      for (let t = 0; t < s.tracks.length; ++t)
        o > s.tracks[t].times[0] && (o = s.tracks[t].times[0])
      for (let t = 0; t < s.tracks.length; ++t) s.tracks[t].shift(-1 * o)
      return s.resetDuration(), s
    },
    makeClipAdditive: function (t, e = 0, n = t, i = 30) {
      i <= 0 && (i = 30)
      const r = n.tracks.length,
        s = e / i
      for (let e = 0; e < r; ++e) {
        const i = n.tracks[e],
          r = i.ValueTypeName
        if ('bool' === r || 'string' === r) continue
        const a = t.tracks.find(function (t) {
          return t.name === i.name && t.ValueTypeName === r
        })
        if (void 0 === a) continue
        let o = 0
        const l = i.getValueSize()
        i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = l / 3)
        let c = 0
        const h = a.getValueSize()
        a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (c = h / 3)
        const u = i.times.length - 1
        let d
        if (s <= i.times[0]) {
          const t = o,
            e = l - o
          d = sa.arraySlice(i.values, t, e)
        } else if (s >= i.times[u]) {
          const t = u * l + o,
            e = t + l - o
          d = sa.arraySlice(i.values, t, e)
        } else {
          const t = i.createInterpolant(),
            e = o,
            n = l - o
          t.evaluate(s), (d = sa.arraySlice(t.resultBuffer, e, n))
        }
        'quaternion' === r && new U().fromArray(d).normalize().conjugate().toArray(d)
        const p = a.times.length
        for (let t = 0; t < p; ++t) {
          const e = t * h + c
          if ('quaternion' === r) U.multiplyQuaternionsFlat(a.values, e, d, 0, a.values, e)
          else {
            const t = h - 2 * c
            for (let n = 0; n < t; ++n) a.values[e + n] -= d[n]
          }
        }
      }
      return (t.blendMode = 2501), t
    },
  }
  function aa(t, e, n, i) {
    ;(this.parameterPositions = t),
      (this._cachedIndex = 0),
      (this.resultBuffer = void 0 !== i ? i : new e.constructor(n)),
      (this.sampleValues = e),
      (this.valueSize = n)
  }
  function oa(t, e, n, i) {
    aa.call(this, t, e, n, i),
      (this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0)
  }
  function la(t, e, n, i) {
    aa.call(this, t, e, n, i)
  }
  function ca(t, e, n, i) {
    aa.call(this, t, e, n, i)
  }
  Object.assign(aa.prototype, {
    evaluate: function (t) {
      const e = this.parameterPositions
      let n = this._cachedIndex,
        i = e[n],
        r = e[n - 1]
      t: {
        e: {
          let s
          n: {
            i: if (!(t < i)) {
              for (let s = n + 2; ; ) {
                if (void 0 === i) {
                  if (t < r) break i
                  return (n = e.length), (this._cachedIndex = n), this.afterEnd_(n - 1, t, r)
                }
                if (n === s) break
                if (((r = i), (i = e[++n]), t < i)) break e
              }
              s = e.length
              break n
            }
            if (t >= r) break t
            {
              const a = e[1]
              t < a && ((n = 2), (r = a))
              for (let s = n - 2; ; ) {
                if (void 0 === r) return (this._cachedIndex = 0), this.beforeStart_(0, t, i)
                if (n === s) break
                if (((i = r), (r = e[--n - 1]), t >= r)) break e
              }
              ;(s = n), (n = 0)
            }
          }
          for (; n < s; ) {
            const i = (n + s) >>> 1
            t < e[i] ? (s = i) : (n = i + 1)
          }
          if (((i = e[n]), (r = e[n - 1]), void 0 === r))
            return (this._cachedIndex = 0), this.beforeStart_(0, t, i)
          if (void 0 === i)
            return (n = e.length), (this._cachedIndex = n), this.afterEnd_(n - 1, r, t)
        }
        ;(this._cachedIndex = n), this.intervalChanged_(n, r, i)
      }
      return this.interpolate_(n, r, t, i)
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function () {
      return this.settings || this.DefaultSettings_
    },
    copySampleValue_: function (t) {
      const e = this.resultBuffer,
        n = this.sampleValues,
        i = this.valueSize,
        r = t * i
      for (let t = 0; t !== i; ++t) e[t] = n[r + t]
      return e
    },
    interpolate_: function () {
      throw new Error('call to abstract method')
    },
    intervalChanged_: function () {},
  }),
    Object.assign(aa.prototype, {
      beforeStart_: aa.prototype.copySampleValue_,
      afterEnd_: aa.prototype.copySampleValue_,
    }),
    (oa.prototype = Object.assign(Object.create(aa.prototype), {
      constructor: oa,
      DefaultSettings_: { endingStart: x, endingEnd: x },
      intervalChanged_: function (t, e, n) {
        const i = this.parameterPositions
        let r = t - 2,
          s = t + 1,
          a = i[r],
          o = i[s]
        if (void 0 === a)
          switch (this.getSettings_().endingStart) {
            case _:
              ;(r = t), (a = 2 * e - n)
              break
            case b:
              ;(r = i.length - 2), (a = e + i[r] - i[r + 1])
              break
            default:
              ;(r = t), (a = n)
          }
        if (void 0 === o)
          switch (this.getSettings_().endingEnd) {
            case _:
              ;(s = t), (o = 2 * n - e)
              break
            case b:
              ;(s = 1), (o = n + i[1] - i[0])
              break
            default:
              ;(s = t - 1), (o = e)
          }
        const l = 0.5 * (n - e),
          c = this.valueSize
        ;(this._weightPrev = l / (e - a)),
          (this._weightNext = l / (o - n)),
          (this._offsetPrev = r * c),
          (this._offsetNext = s * c)
      },
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          a = this.valueSize,
          o = t * a,
          l = o - a,
          c = this._offsetPrev,
          h = this._offsetNext,
          u = this._weightPrev,
          d = this._weightNext,
          p = (n - e) / (i - e),
          f = p * p,
          m = f * p,
          g = -u * m + 2 * u * f - u * p,
          v = (1 + u) * m + (-1.5 - 2 * u) * f + (-0.5 + u) * p + 1,
          y = (-1 - d) * m + (1.5 + d) * f + 0.5 * p,
          x = d * m - d * f
        for (let t = 0; t !== a; ++t)
          r[t] = g * s[c + t] + v * s[l + t] + y * s[o + t] + x * s[h + t]
        return r
      },
    })),
    (la.prototype = Object.assign(Object.create(aa.prototype), {
      constructor: la,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          a = this.valueSize,
          o = t * a,
          l = o - a,
          c = (n - e) / (i - e),
          h = 1 - c
        for (let t = 0; t !== a; ++t) r[t] = s[l + t] * h + s[o + t] * c
        return r
      },
    })),
    (ca.prototype = Object.assign(Object.create(aa.prototype), {
      constructor: ca,
      interpolate_: function (t) {
        return this.copySampleValue_(t - 1)
      },
    }))
  class ha {
    constructor(t, e, n, i) {
      if (void 0 === t) throw new Error('THREE.KeyframeTrack: track name is undefined')
      if (void 0 === e || 0 === e.length)
        throw new Error('THREE.KeyframeTrack: no keyframes in track named ' + t)
      ;(this.name = t),
        (this.times = sa.convertArray(e, this.TimeBufferType)),
        (this.values = sa.convertArray(n, this.ValueBufferType)),
        this.setInterpolation(i || this.DefaultInterpolation)
    }
    static toJSON(t) {
      const e = t.constructor
      let n
      if (e.toJSON !== this.toJSON) n = e.toJSON(t)
      else {
        n = {
          name: t.name,
          times: sa.convertArray(t.times, Array),
          values: sa.convertArray(t.values, Array),
        }
        const e = t.getInterpolation()
        e !== t.DefaultInterpolation && (n.interpolation = e)
      }
      return (n.type = t.ValueTypeName), n
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new ca(this.times, this.values, this.getValueSize(), t)
    }
    InterpolantFactoryMethodLinear(t) {
      return new la(this.times, this.values, this.getValueSize(), t)
    }
    InterpolantFactoryMethodSmooth(t) {
      return new oa(this.times, this.values, this.getValueSize(), t)
    }
    setInterpolation(t) {
      let e
      switch (t) {
        case g:
          e = this.InterpolantFactoryMethodDiscrete
          break
        case v:
          e = this.InterpolantFactoryMethodLinear
          break
        case y:
          e = this.InterpolantFactoryMethodSmooth
      }
      if (void 0 === e) {
        const e =
          'unsupported interpolation for ' +
          this.ValueTypeName +
          ' keyframe track named ' +
          this.name
        if (void 0 === this.createInterpolant) {
          if (t === this.DefaultInterpolation) throw new Error(e)
          this.setInterpolation(this.DefaultInterpolation)
        }
        return console.warn('THREE.KeyframeTrack:', e), this
      }
      return (this.createInterpolant = e), this
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return g
        case this.InterpolantFactoryMethodLinear:
          return v
        case this.InterpolantFactoryMethodSmooth:
          return y
      }
    }
    getValueSize() {
      return this.values.length / this.times.length
    }
    shift(t) {
      if (0 !== t) {
        const e = this.times
        for (let n = 0, i = e.length; n !== i; ++n) e[n] += t
      }
      return this
    }
    scale(t) {
      if (1 !== t) {
        const e = this.times
        for (let n = 0, i = e.length; n !== i; ++n) e[n] *= t
      }
      return this
    }
    trim(t, e) {
      const n = this.times,
        i = n.length
      let r = 0,
        s = i - 1
      for (; r !== i && n[r] < t; ) ++r
      for (; -1 !== s && n[s] > e; ) --s
      if ((++s, 0 !== r || s !== i)) {
        r >= s && ((s = Math.max(s, 1)), (r = s - 1))
        const t = this.getValueSize()
        ;(this.times = sa.arraySlice(n, r, s)),
          (this.values = sa.arraySlice(this.values, r * t, s * t))
      }
      return this
    }
    validate() {
      let t = !0
      const e = this.getValueSize()
      e - Math.floor(e) != 0 &&
        (console.error('THREE.KeyframeTrack: Invalid value size in track.', this), (t = !1))
      const n = this.times,
        i = this.values,
        r = n.length
      0 === r && (console.error('THREE.KeyframeTrack: Track is empty.', this), (t = !1))
      let s = null
      for (let e = 0; e !== r; e++) {
        const i = n[e]
        if ('number' == typeof i && isNaN(i)) {
          console.error('THREE.KeyframeTrack: Time is not a valid number.', this, e, i), (t = !1)
          break
        }
        if (null !== s && s > i) {
          console.error('THREE.KeyframeTrack: Out of order keys.', this, e, i, s), (t = !1)
          break
        }
        s = i
      }
      if (void 0 !== i && sa.isTypedArray(i))
        for (let e = 0, n = i.length; e !== n; ++e) {
          const n = i[e]
          if (isNaN(n)) {
            console.error('THREE.KeyframeTrack: Value is not a valid number.', this, e, n), (t = !1)
            break
          }
        }
      return t
    }
    optimize() {
      const t = sa.arraySlice(this.times),
        e = sa.arraySlice(this.values),
        n = this.getValueSize(),
        i = this.getInterpolation() === y,
        r = t.length - 1
      let s = 1
      for (let a = 1; a < r; ++a) {
        let r = !1
        const o = t[a]
        if (o !== t[a + 1] && (1 !== a || o !== t[0]))
          if (i) r = !0
          else {
            const t = a * n,
              i = t - n,
              s = t + n
            for (let a = 0; a !== n; ++a) {
              const n = e[t + a]
              if (n !== e[i + a] || n !== e[s + a]) {
                r = !0
                break
              }
            }
          }
        if (r) {
          if (a !== s) {
            t[s] = t[a]
            const i = a * n,
              r = s * n
            for (let t = 0; t !== n; ++t) e[r + t] = e[i + t]
          }
          ++s
        }
      }
      if (r > 0) {
        t[s] = t[r]
        for (let t = r * n, i = s * n, a = 0; a !== n; ++a) e[i + a] = e[t + a]
        ++s
      }
      return (
        s !== t.length
          ? ((this.times = sa.arraySlice(t, 0, s)), (this.values = sa.arraySlice(e, 0, s * n)))
          : ((this.times = t), (this.values = e)),
        this
      )
    }
    clone() {
      const t = sa.arraySlice(this.times, 0),
        e = sa.arraySlice(this.values, 0),
        n = new (0, this.constructor)(this.name, t, e)
      return (n.createInterpolant = this.createInterpolant), n
    }
  }
  ;(ha.prototype.TimeBufferType = Float32Array),
    (ha.prototype.ValueBufferType = Float32Array),
    (ha.prototype.DefaultInterpolation = v)
  class ua extends ha {}
  ;(ua.prototype.ValueTypeName = 'bool'),
    (ua.prototype.ValueBufferType = Array),
    (ua.prototype.DefaultInterpolation = g),
    (ua.prototype.InterpolantFactoryMethodLinear = void 0),
    (ua.prototype.InterpolantFactoryMethodSmooth = void 0)
  class da extends ha {}
  da.prototype.ValueTypeName = 'color'
  class pa extends ha {}
  function fa(t, e, n, i) {
    aa.call(this, t, e, n, i)
  }
  ;(pa.prototype.ValueTypeName = 'number'),
    (fa.prototype = Object.assign(Object.create(aa.prototype), {
      constructor: fa,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          s = this.sampleValues,
          a = this.valueSize,
          o = (n - e) / (i - e)
        let l = t * a
        for (let t = l + a; l !== t; l += 4) U.slerpFlat(r, 0, s, l - a, s, l, o)
        return r
      },
    }))
  class ma extends ha {
    InterpolantFactoryMethodLinear(t) {
      return new fa(this.times, this.values, this.getValueSize(), t)
    }
  }
  ;(ma.prototype.ValueTypeName = 'quaternion'),
    (ma.prototype.DefaultInterpolation = v),
    (ma.prototype.InterpolantFactoryMethodSmooth = void 0)
  class ga extends ha {}
  ;(ga.prototype.ValueTypeName = 'string'),
    (ga.prototype.ValueBufferType = Array),
    (ga.prototype.DefaultInterpolation = g),
    (ga.prototype.InterpolantFactoryMethodLinear = void 0),
    (ga.prototype.InterpolantFactoryMethodSmooth = void 0)
  class va extends ha {}
  va.prototype.ValueTypeName = 'vector'
  class ya {
    constructor(t, e = -1, n, i = 2500) {
      ;(this.name = t),
        (this.tracks = n),
        (this.duration = e),
        (this.blendMode = i),
        (this.uuid = P.generateUUID()),
        this.duration < 0 && this.resetDuration()
    }
    static parse(t) {
      const e = [],
        n = t.tracks,
        i = 1 / (t.fps || 1)
      for (let t = 0, r = n.length; t !== r; ++t) e.push(xa(n[t]).scale(i))
      const r = new this(t.name, t.duration, e, t.blendMode)
      return (r.uuid = t.uuid), r
    }
    static toJSON(t) {
      const e = [],
        n = t.tracks,
        i = { name: t.name, duration: t.duration, tracks: e, uuid: t.uuid, blendMode: t.blendMode }
      for (let t = 0, i = n.length; t !== i; ++t) e.push(ha.toJSON(n[t]))
      return i
    }
    static CreateFromMorphTargetSequence(t, e, n, i) {
      const r = e.length,
        s = []
      for (let t = 0; t < r; t++) {
        let a = [],
          o = []
        a.push((t + r - 1) % r, t, (t + 1) % r), o.push(0, 1, 0)
        const l = sa.getKeyframeOrder(a)
        ;(a = sa.sortedArray(a, 1, l)),
          (o = sa.sortedArray(o, 1, l)),
          i || 0 !== a[0] || (a.push(r), o.push(o[0])),
          s.push(new pa('.morphTargetInfluences[' + e[t].name + ']', a, o).scale(1 / n))
      }
      return new this(t, -1, s)
    }
    static findByName(t, e) {
      let n = t
      if (!Array.isArray(t)) {
        const e = t
        n = (e.geometry && e.geometry.animations) || e.animations
      }
      for (let t = 0; t < n.length; t++) if (n[t].name === e) return n[t]
      return null
    }
    static CreateClipsFromMorphTargetSequences(t, e, n) {
      const i = {},
        r = /^([\w-]*?)([\d]+)$/
      for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e],
          s = n.name.match(r)
        if (s && s.length > 1) {
          const t = s[1]
          let e = i[t]
          e || (i[t] = e = []), e.push(n)
        }
      }
      const s = []
      for (const t in i) s.push(this.CreateFromMorphTargetSequence(t, i[t], e, n))
      return s
    }
    static parseAnimation(t, e) {
      if (!t) return console.error('THREE.AnimationClip: No animation in JSONLoader data.'), null
      const n = function (t, e, n, i, r) {
          if (0 !== n.length) {
            const s = [],
              a = []
            sa.flattenJSON(n, s, a, i), 0 !== s.length && r.push(new t(e, s, a))
          }
        },
        i = [],
        r = t.name || 'default',
        s = t.fps || 30,
        a = t.blendMode
      let o = t.length || -1
      const l = t.hierarchy || []
      for (let t = 0; t < l.length; t++) {
        const r = l[t].keys
        if (r && 0 !== r.length)
          if (r[0].morphTargets) {
            const t = {}
            let e
            for (e = 0; e < r.length; e++)
              if (r[e].morphTargets)
                for (let n = 0; n < r[e].morphTargets.length; n++) t[r[e].morphTargets[n]] = -1
            for (const n in t) {
              const t = [],
                s = []
              for (let i = 0; i !== r[e].morphTargets.length; ++i) {
                const i = r[e]
                t.push(i.time), s.push(i.morphTarget === n ? 1 : 0)
              }
              i.push(new pa('.morphTargetInfluence[' + n + ']', t, s))
            }
            o = t.length * (s || 1)
          } else {
            const s = '.bones[' + e[t].name + ']'
            n(va, s + '.position', r, 'pos', i),
              n(ma, s + '.quaternion', r, 'rot', i),
              n(va, s + '.scale', r, 'scl', i)
          }
      }
      return 0 === i.length ? null : new this(r, o, i, a)
    }
    resetDuration() {
      let t = 0
      for (let e = 0, n = this.tracks.length; e !== n; ++e) {
        const n = this.tracks[e]
        t = Math.max(t, n.times[n.times.length - 1])
      }
      return (this.duration = t), this
    }
    trim() {
      for (let t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration)
      return this
    }
    validate() {
      let t = !0
      for (let e = 0; e < this.tracks.length; e++) t = t && this.tracks[e].validate()
      return t
    }
    optimize() {
      for (let t = 0; t < this.tracks.length; t++) this.tracks[t].optimize()
      return this
    }
    clone() {
      const t = []
      for (let e = 0; e < this.tracks.length; e++) t.push(this.tracks[e].clone())
      return new this.constructor(this.name, this.duration, t, this.blendMode)
    }
    toJSON() {
      return this.constructor.toJSON(this)
    }
  }
  function xa(t) {
    if (void 0 === t.type)
      throw new Error('THREE.KeyframeTrack: track type undefined, can not parse')
    const e = (function (t) {
      switch (t.toLowerCase()) {
        case 'scalar':
        case 'double':
        case 'float':
        case 'number':
        case 'integer':
          return pa
        case 'vector':
        case 'vector2':
        case 'vector3':
        case 'vector4':
          return va
        case 'color':
          return da
        case 'quaternion':
          return ma
        case 'bool':
        case 'boolean':
          return ua
        case 'string':
          return ga
      }
      throw new Error('THREE.KeyframeTrack: Unsupported typeName: ' + t)
    })(t.type)
    if (void 0 === t.times) {
      const e = [],
        n = []
      sa.flattenJSON(t.keys, e, n, 'value'), (t.times = e), (t.values = n)
    }
    return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation)
  }
  const _a = {
    enabled: !1,
    files: {},
    add: function (t, e) {
      !1 !== this.enabled && (this.files[t] = e)
    },
    get: function (t) {
      if (!1 !== this.enabled) return this.files[t]
    },
    remove: function (t) {
      delete this.files[t]
    },
    clear: function () {
      this.files = {}
    },
  }
  const ba = new (function (t, e, n) {
    const i = this
    let r,
      s = !1,
      a = 0,
      o = 0
    const l = []
    ;(this.onStart = void 0),
      (this.onLoad = t),
      (this.onProgress = e),
      (this.onError = n),
      (this.itemStart = function (t) {
        o++, !1 === s && void 0 !== i.onStart && i.onStart(t, a, o), (s = !0)
      }),
      (this.itemEnd = function (t) {
        a++,
          void 0 !== i.onProgress && i.onProgress(t, a, o),
          a === o && ((s = !1), void 0 !== i.onLoad && i.onLoad())
      }),
      (this.itemError = function (t) {
        void 0 !== i.onError && i.onError(t)
      }),
      (this.resolveURL = function (t) {
        return r ? r(t) : t
      }),
      (this.setURLModifier = function (t) {
        return (r = t), this
      }),
      (this.addHandler = function (t, e) {
        return l.push(t, e), this
      }),
      (this.removeHandler = function (t) {
        const e = l.indexOf(t)
        return -1 !== e && l.splice(e, 2), this
      }),
      (this.getHandler = function (t) {
        for (let e = 0, n = l.length; e < n; e += 2) {
          const n = l[e],
            i = l[e + 1]
          if ((n.global && (n.lastIndex = 0), n.test(t))) return i
        }
        return null
      })
  })()
  function wa(t) {
    ;(this.manager = void 0 !== t ? t : ba),
      (this.crossOrigin = 'anonymous'),
      (this.withCredentials = !1),
      (this.path = ''),
      (this.resourcePath = ''),
      (this.requestHeader = {})
  }
  Object.assign(wa.prototype, {
    load: function () {},
    loadAsync: function (t, e) {
      const n = this
      return new Promise(function (i, r) {
        n.load(t, i, e, r)
      })
    },
    parse: function () {},
    setCrossOrigin: function (t) {
      return (this.crossOrigin = t), this
    },
    setWithCredentials: function (t) {
      return (this.withCredentials = t), this
    },
    setPath: function (t) {
      return (this.path = t), this
    },
    setResourcePath: function (t) {
      return (this.resourcePath = t), this
    },
    setRequestHeader: function (t) {
      return (this.requestHeader = t), this
    },
  })
  const Ma = {}
  function Sa(t) {
    wa.call(this, t)
  }
  function Ea(t) {
    wa.call(this, t)
  }
  ;(Sa.prototype = Object.assign(Object.create(wa.prototype), {
    constructor: Sa,
    load: function (t, e, n, i) {
      void 0 === t && (t = ''),
        void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t))
      const r = this,
        s = _a.get(t)
      if (void 0 !== s)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(s), r.manager.itemEnd(t)
          }, 0),
          s
        )
      if (void 0 !== Ma[t]) return void Ma[t].push({ onLoad: e, onProgress: n, onError: i })
      const a = t.match(/^data:(.*?)(;base64)?,(.*)$/)
      let o
      if (a) {
        const n = a[1],
          s = !!a[2]
        let o = a[3]
        ;(o = decodeURIComponent(o)), s && (o = atob(o))
        try {
          let i
          const s = (this.responseType || '').toLowerCase()
          switch (s) {
            case 'arraybuffer':
            case 'blob':
              const t = new Uint8Array(o.length)
              for (let e = 0; e < o.length; e++) t[e] = o.charCodeAt(e)
              i = 'blob' === s ? new Blob([t.buffer], { type: n }) : t.buffer
              break
            case 'document':
              const e = new DOMParser()
              i = e.parseFromString(o, n)
              break
            case 'json':
              i = JSON.parse(o)
              break
            default:
              i = o
          }
          setTimeout(function () {
            e && e(i), r.manager.itemEnd(t)
          }, 0)
        } catch (e) {
          setTimeout(function () {
            i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
          }, 0)
        }
      } else {
        ;(Ma[t] = []),
          Ma[t].push({ onLoad: e, onProgress: n, onError: i }),
          (o = new XMLHttpRequest()),
          o.open('GET', t, !0),
          o.addEventListener(
            'load',
            function (e) {
              const n = this.response,
                i = Ma[t]
              if ((delete Ma[t], 200 === this.status || 0 === this.status)) {
                0 === this.status && console.warn('THREE.FileLoader: HTTP Status 0 received.'),
                  _a.add(t, n)
                for (let t = 0, e = i.length; t < e; t++) {
                  const e = i[t]
                  e.onLoad && e.onLoad(n)
                }
                r.manager.itemEnd(t)
              } else {
                for (let t = 0, n = i.length; t < n; t++) {
                  const n = i[t]
                  n.onError && n.onError(e)
                }
                r.manager.itemError(t), r.manager.itemEnd(t)
              }
            },
            !1
          ),
          o.addEventListener(
            'progress',
            function (e) {
              const n = Ma[t]
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t]
                i.onProgress && i.onProgress(e)
              }
            },
            !1
          ),
          o.addEventListener(
            'error',
            function (e) {
              const n = Ma[t]
              delete Ma[t]
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t]
                i.onError && i.onError(e)
              }
              r.manager.itemError(t), r.manager.itemEnd(t)
            },
            !1
          ),
          o.addEventListener(
            'abort',
            function (e) {
              const n = Ma[t]
              delete Ma[t]
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t]
                i.onError && i.onError(e)
              }
              r.manager.itemError(t), r.manager.itemEnd(t)
            },
            !1
          ),
          void 0 !== this.responseType && (o.responseType = this.responseType),
          void 0 !== this.withCredentials && (o.withCredentials = this.withCredentials),
          o.overrideMimeType &&
            o.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : 'text/plain')
        for (const t in this.requestHeader) o.setRequestHeader(t, this.requestHeader[t])
        o.send(null)
      }
      return r.manager.itemStart(t), o
    },
    setResponseType: function (t) {
      return (this.responseType = t), this
    },
    setMimeType: function (t) {
      return (this.mimeType = t), this
    },
  })),
    (Ea.prototype = Object.assign(Object.create(wa.prototype), {
      constructor: Ea,
      load: function (t, e, n, i) {
        const r = this,
          a = [],
          o = new Ms(),
          l = new Sa(this.manager)
        l.setPath(this.path),
          l.setResponseType('arraybuffer'),
          l.setRequestHeader(this.requestHeader),
          l.setWithCredentials(r.withCredentials)
        let c = 0
        function h(h) {
          l.load(
            t[h],
            function (t) {
              const n = r.parse(t, !0)
              ;(a[h] = { width: n.width, height: n.height, format: n.format, mipmaps: n.mipmaps }),
                (c += 1),
                6 === c &&
                  (1 === n.mipmapCount && (o.minFilter = s),
                  (o.image = a),
                  (o.format = n.format),
                  (o.needsUpdate = !0),
                  e && e(o))
            },
            n,
            i
          )
        }
        if (Array.isArray(t)) for (let e = 0, n = t.length; e < n; ++e) h(e)
        else
          l.load(
            t,
            function (t) {
              const n = r.parse(t, !0)
              if (n.isCubemap) {
                const t = n.mipmaps.length / n.mipmapCount
                for (let e = 0; e < t; e++) {
                  a[e] = { mipmaps: [] }
                  for (let t = 0; t < n.mipmapCount; t++)
                    a[e].mipmaps.push(n.mipmaps[e * n.mipmapCount + t]),
                      (a[e].format = n.format),
                      (a[e].width = n.width),
                      (a[e].height = n.height)
                }
                o.image = a
              } else (o.image.width = n.width), (o.image.height = n.height), (o.mipmaps = n.mipmaps)
              1 === n.mipmapCount && (o.minFilter = s),
                (o.format = n.format),
                (o.needsUpdate = !0),
                e && e(o)
            },
            n,
            i
          )
        return o
      },
    }))
  class Ta extends wa {
    constructor(t) {
      super(t)
    }
    load(t, e, n, i) {
      void 0 !== this.path && (t = this.path + t), (t = this.manager.resolveURL(t))
      const r = this,
        s = _a.get(t)
      if (void 0 !== s)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(s), r.manager.itemEnd(t)
          }, 0),
          s
        )
      const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'img')
      function o() {
        a.removeEventListener('load', o, !1),
          a.removeEventListener('error', l, !1),
          _a.add(t, this),
          e && e(this),
          r.manager.itemEnd(t)
      }
      function l(e) {
        a.removeEventListener('load', o, !1),
          a.removeEventListener('error', l, !1),
          i && i(e),
          r.manager.itemError(t),
          r.manager.itemEnd(t)
      }
      return (
        a.addEventListener('load', o, !1),
        a.addEventListener('error', l, !1),
        'data:' !== t.substr(0, 5) &&
          void 0 !== this.crossOrigin &&
          (a.crossOrigin = this.crossOrigin),
        r.manager.itemStart(t),
        (a.src = t),
        a
      )
    }
  }
  class La extends wa {
    constructor(t) {
      super(t)
    }
    load(t, e, n, i) {
      const r = new cn(),
        s = new Ta(this.manager)
      s.setCrossOrigin(this.crossOrigin), s.setPath(this.path)
      let a = 0
      function o(n) {
        s.load(
          t[n],
          function (t) {
            ;(r.images[n] = t), a++, 6 === a && ((r.needsUpdate = !0), e && e(r))
          },
          void 0,
          i
        )
      }
      for (let e = 0; e < t.length; ++e) o(e)
      return r
    }
  }
  function Aa(t) {
    wa.call(this, t)
  }
  function Ra(t) {
    wa.call(this, t)
  }
  function Pa() {
    ;(this.type = 'Curve'), (this.arcLengthDivisions = 200)
  }
  ;(Aa.prototype = Object.assign(Object.create(wa.prototype), {
    constructor: Aa,
    load: function (t, e, i, r) {
      const o = this,
        l = new un(),
        c = new Sa(this.manager)
      return (
        c.setResponseType('arraybuffer'),
        c.setRequestHeader(this.requestHeader),
        c.setPath(this.path),
        c.setWithCredentials(o.withCredentials),
        c.load(
          t,
          function (t) {
            const i = o.parse(t)
            i &&
              (void 0 !== i.image
                ? (l.image = i.image)
                : void 0 !== i.data &&
                  ((l.image.width = i.width), (l.image.height = i.height), (l.image.data = i.data)),
              (l.wrapS = void 0 !== i.wrapS ? i.wrapS : n),
              (l.wrapT = void 0 !== i.wrapT ? i.wrapT : n),
              (l.magFilter = void 0 !== i.magFilter ? i.magFilter : s),
              (l.minFilter = void 0 !== i.minFilter ? i.minFilter : s),
              (l.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1),
              void 0 !== i.encoding && (l.encoding = i.encoding),
              void 0 !== i.flipY && (l.flipY = i.flipY),
              void 0 !== i.format && (l.format = i.format),
              void 0 !== i.type && (l.type = i.type),
              void 0 !== i.mipmaps && ((l.mipmaps = i.mipmaps), (l.minFilter = a)),
              1 === i.mipmapCount && (l.minFilter = s),
              (l.needsUpdate = !0),
              e && e(l, i))
          },
          i,
          r
        ),
        l
      )
    },
  })),
    (Ra.prototype = Object.assign(Object.create(wa.prototype), {
      constructor: Ra,
      load: function (t, e, n, i) {
        const r = new z(),
          s = new Ta(this.manager)
        return (
          s.setCrossOrigin(this.crossOrigin),
          s.setPath(this.path),
          s.load(
            t,
            function (n) {
              r.image = n
              const i = t.search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/)
              ;(r.format = i ? d : p), (r.needsUpdate = !0), void 0 !== e && e(r)
            },
            n,
            i
          ),
          r
        )
      },
    })),
    Object.assign(Pa.prototype, {
      getPoint: function () {
        return console.warn('THREE.Curve: .getPoint() not implemented.'), null
      },
      getPointAt: function (t, e) {
        const n = this.getUtoTmapping(t)
        return this.getPoint(n, e)
      },
      getPoints: function (t = 5) {
        const e = []
        for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t))
        return e
      },
      getSpacedPoints: function (t = 5) {
        const e = []
        for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t))
        return e
      },
      getLength: function () {
        const t = this.getLengths()
        return t[t.length - 1]
      },
      getLengths: function (t) {
        if (
          (void 0 === t && (t = this.arcLengthDivisions),
          this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
        )
          return this.cacheArcLengths
        this.needsUpdate = !1
        const e = []
        let n,
          i = this.getPoint(0),
          r = 0
        e.push(0)
        for (let s = 1; s <= t; s++)
          (n = this.getPoint(s / t)), (r += n.distanceTo(i)), e.push(r), (i = n)
        return (this.cacheArcLengths = e), e
      },
      updateArcLengths: function () {
        ;(this.needsUpdate = !0), this.getLengths()
      },
      getUtoTmapping: function (t, e) {
        const n = this.getLengths()
        let i = 0
        const r = n.length
        let s
        s = e || t * n[r - 1]
        let a,
          o = 0,
          l = r - 1
        for (; o <= l; )
          if (((i = Math.floor(o + (l - o) / 2)), (a = n[i] - s), a < 0)) o = i + 1
          else {
            if (!(a > 0)) {
              l = i
              break
            }
            l = i - 1
          }
        if (((i = l), n[i] === s)) return i / (r - 1)
        const c = n[i]
        return (i + (s - c) / (n[i + 1] - c)) / (r - 1)
      },
      getTangent: function (t, e) {
        const n = 1e-4
        let i = t - n,
          r = t + n
        i < 0 && (i = 0), r > 1 && (r = 1)
        const s = this.getPoint(i),
          a = this.getPoint(r),
          o = e || (s.isVector2 ? new C() : new G())
        return o.copy(a).sub(s).normalize(), o
      },
      getTangentAt: function (t, e) {
        const n = this.getUtoTmapping(t)
        return this.getTangent(n, e)
      },
      computeFrenetFrames: function (t, e) {
        const n = new G(),
          i = [],
          r = [],
          s = [],
          a = new G(),
          o = new mt()
        for (let e = 0; e <= t; e++) {
          const n = e / t
          ;(i[e] = this.getTangentAt(n, new G())), i[e].normalize()
        }
        ;(r[0] = new G()), (s[0] = new G())
        let l = Number.MAX_VALUE
        const c = Math.abs(i[0].x),
          h = Math.abs(i[0].y),
          u = Math.abs(i[0].z)
        c <= l && ((l = c), n.set(1, 0, 0)),
          h <= l && ((l = h), n.set(0, 1, 0)),
          u <= l && n.set(0, 0, 1),
          a.crossVectors(i[0], n).normalize(),
          r[0].crossVectors(i[0], a),
          s[0].crossVectors(i[0], r[0])
        for (let e = 1; e <= t; e++) {
          if (
            ((r[e] = r[e - 1].clone()),
            (s[e] = s[e - 1].clone()),
            a.crossVectors(i[e - 1], i[e]),
            a.length() > Number.EPSILON)
          ) {
            a.normalize()
            const t = Math.acos(P.clamp(i[e - 1].dot(i[e]), -1, 1))
            r[e].applyMatrix4(o.makeRotationAxis(a, t))
          }
          s[e].crossVectors(i[e], r[e])
        }
        if (!0 === e) {
          let e = Math.acos(P.clamp(r[0].dot(r[t]), -1, 1))
          ;(e /= t), i[0].dot(a.crossVectors(r[0], r[t])) > 0 && (e = -e)
          for (let n = 1; n <= t; n++)
            r[n].applyMatrix4(o.makeRotationAxis(i[n], e * n)), s[n].crossVectors(i[n], r[n])
        }
        return { tangents: i, normals: r, binormals: s }
      },
      clone: function () {
        return new this.constructor().copy(this)
      },
      copy: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this
      },
      toJSON: function () {
        const t = { metadata: { version: 4.5, type: 'Curve', generator: 'Curve.toJSON' } }
        return (t.arcLengthDivisions = this.arcLengthDivisions), (t.type = this.type), t
      },
      fromJSON: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this
      },
    })
  class Ca extends Pa {
    constructor(t = 0, e = 0, n = 1, i = 1, r = 0, s = 2 * Math.PI, a = !1, o = 0) {
      super(),
        (this.type = 'EllipseCurve'),
        (this.aX = t),
        (this.aY = e),
        (this.xRadius = n),
        (this.yRadius = i),
        (this.aStartAngle = r),
        (this.aEndAngle = s),
        (this.aClockwise = a),
        (this.aRotation = o)
    }
    getPoint(t, e) {
      const n = e || new C(),
        i = 2 * Math.PI
      let r = this.aEndAngle - this.aStartAngle
      const s = Math.abs(r) < Number.EPSILON
      for (; r < 0; ) r += i
      for (; r > i; ) r -= i
      r < Number.EPSILON && (r = s ? 0 : i),
        !0 !== this.aClockwise || s || (r === i ? (r = -i) : (r -= i))
      const a = this.aStartAngle + t * r
      let o = this.aX + this.xRadius * Math.cos(a),
        l = this.aY + this.yRadius * Math.sin(a)
      if (0 !== this.aRotation) {
        const t = Math.cos(this.aRotation),
          e = Math.sin(this.aRotation),
          n = o - this.aX,
          i = l - this.aY
        ;(o = n * t - i * e + this.aX), (l = n * e + i * t + this.aY)
      }
      return n.set(o, l)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      )
    }
    toJSON() {
      const t = super.toJSON()
      return (
        (t.aX = this.aX),
        (t.aY = this.aY),
        (t.xRadius = this.xRadius),
        (t.yRadius = this.yRadius),
        (t.aStartAngle = this.aStartAngle),
        (t.aEndAngle = this.aEndAngle),
        (t.aClockwise = this.aClockwise),
        (t.aRotation = this.aRotation),
        t
      )
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      )
    }
  }
  Ca.prototype.isEllipseCurve = !0
  class Da extends Ca {
    constructor(t, e, n, i, r, s) {
      super(t, e, n, n, i, r, s), (this.type = 'ArcCurve')
    }
  }
  function Ia() {
    let t = 0,
      e = 0,
      n = 0,
      i = 0
    function r(r, s, a, o) {
      ;(t = r), (e = a), (n = -3 * r + 3 * s - 2 * a - o), (i = 2 * r - 2 * s + a + o)
    }
    return {
      initCatmullRom: function (t, e, n, i, s) {
        r(e, n, s * (n - t), s * (i - e))
      },
      initNonuniformCatmullRom: function (t, e, n, i, s, a, o) {
        let l = (e - t) / s - (n - t) / (s + a) + (n - e) / a,
          c = (n - e) / a - (i - e) / (a + o) + (i - n) / o
        ;(l *= a), (c *= a), r(e, n, l, c)
      },
      calc: function (r) {
        const s = r * r
        return t + e * r + n * s + i * (s * r)
      },
    }
  }
  Da.prototype.isArcCurve = !0
  const Na = new G(),
    Oa = new Ia(),
    za = new Ia(),
    Ha = new Ia()
  class Ba extends Pa {
    constructor(t = [], e = !1, n = 'centripetal', i = 0.5) {
      super(),
        (this.type = 'CatmullRomCurve3'),
        (this.points = t),
        (this.closed = e),
        (this.curveType = n),
        (this.tension = i)
    }
    getPoint(t, e = new G()) {
      const n = e,
        i = this.points,
        r = i.length,
        s = (r - (this.closed ? 0 : 1)) * t
      let a,
        o,
        l = Math.floor(s),
        c = s - l
      this.closed
        ? (l += l > 0 ? 0 : (Math.floor(Math.abs(l) / r) + 1) * r)
        : 0 === c && l === r - 1 && ((l = r - 2), (c = 1)),
        this.closed || l > 0
          ? (a = i[(l - 1) % r])
          : (Na.subVectors(i[0], i[1]).add(i[0]), (a = Na))
      const h = i[l % r],
        u = i[(l + 1) % r]
      if (
        (this.closed || l + 2 < r
          ? (o = i[(l + 2) % r])
          : (Na.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), (o = Na)),
        'centripetal' === this.curveType || 'chordal' === this.curveType)
      ) {
        const t = 'chordal' === this.curveType ? 0.5 : 0.25
        let e = Math.pow(a.distanceToSquared(h), t),
          n = Math.pow(h.distanceToSquared(u), t),
          i = Math.pow(u.distanceToSquared(o), t)
        n < 1e-4 && (n = 1),
          e < 1e-4 && (e = n),
          i < 1e-4 && (i = n),
          Oa.initNonuniformCatmullRom(a.x, h.x, u.x, o.x, e, n, i),
          za.initNonuniformCatmullRom(a.y, h.y, u.y, o.y, e, n, i),
          Ha.initNonuniformCatmullRom(a.z, h.z, u.z, o.z, e, n, i)
      } else
        'catmullrom' === this.curveType &&
          (Oa.initCatmullRom(a.x, h.x, u.x, o.x, this.tension),
          za.initCatmullRom(a.y, h.y, u.y, o.y, this.tension),
          Ha.initCatmullRom(a.z, h.z, u.z, o.z, this.tension))
      return n.set(Oa.calc(c), za.calc(c), Ha.calc(c)), n
    }
    copy(t) {
      super.copy(t), (this.points = [])
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e]
        this.points.push(n.clone())
      }
      return (
        (this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this
      )
    }
    toJSON() {
      const t = super.toJSON()
      t.points = []
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e]
        t.points.push(n.toArray())
      }
      return (t.closed = this.closed), (t.curveType = this.curveType), (t.tension = this.tension), t
    }
    fromJSON(t) {
      super.fromJSON(t), (this.points = [])
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e]
        this.points.push(new G().fromArray(n))
      }
      return (
        (this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this
      )
    }
  }
  function Fa(t, e, n, i, r) {
    const s = 0.5 * (i - e),
      a = 0.5 * (r - n),
      o = t * t
    return (2 * n - 2 * i + s + a) * (t * o) + (-3 * n + 3 * i - 2 * s - a) * o + s * t + n
  }
  function Ua(t, e, n, i) {
    return (
      (function (t, e) {
        const n = 1 - t
        return n * n * e
      })(t, e) +
      (function (t, e) {
        return 2 * (1 - t) * t * e
      })(t, n) +
      (function (t, e) {
        return t * t * e
      })(t, i)
    )
  }
  function Ga(t, e, n, i, r) {
    return (
      (function (t, e) {
        const n = 1 - t
        return n * n * n * e
      })(t, e) +
      (function (t, e) {
        const n = 1 - t
        return 3 * n * n * t * e
      })(t, n) +
      (function (t, e) {
        return 3 * (1 - t) * t * t * e
      })(t, i) +
      (function (t, e) {
        return t * t * t * e
      })(t, r)
    )
  }
  Ba.prototype.isCatmullRomCurve3 = !0
  class ka extends Pa {
    constructor(t = new C(), e = new C(), n = new C(), i = new C()) {
      super(),
        (this.type = 'CubicBezierCurve'),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n),
        (this.v3 = i)
    }
    getPoint(t, e = new C()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2,
        a = this.v3
      return n.set(Ga(t, i.x, r.x, s.x, a.x), Ga(t, i.y, r.y, s.y, a.y)), n
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      )
    }
    toJSON() {
      const t = super.toJSON()
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      )
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      )
    }
  }
  ka.prototype.isCubicBezierCurve = !0
  class Va extends Pa {
    constructor(t = new G(), e = new G(), n = new G(), i = new G()) {
      super(),
        (this.type = 'CubicBezierCurve3'),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = n),
        (this.v3 = i)
    }
    getPoint(t, e = new G()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2,
        a = this.v3
      return (
        n.set(Ga(t, i.x, r.x, s.x, a.x), Ga(t, i.y, r.y, s.y, a.y), Ga(t, i.z, r.z, s.z, a.z)), n
      )
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      )
    }
    toJSON() {
      const t = super.toJSON()
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      )
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      )
    }
  }
  Va.prototype.isCubicBezierCurve3 = !0
  class Wa extends Pa {
    constructor(t = new C(), e = new C()) {
      super(), (this.type = 'LineCurve'), (this.v1 = t), (this.v2 = e)
    }
    getPoint(t, e = new C()) {
      const n = e
      return (
        1 === t
          ? n.copy(this.v2)
          : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
        n
      )
    }
    getPointAt(t, e) {
      return this.getPoint(t, e)
    }
    getTangent(t, e) {
      const n = e || new C()
      return n.copy(this.v2).sub(this.v1).normalize(), n
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
    }
    toJSON() {
      const t = super.toJSON()
      return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
    }
  }
  Wa.prototype.isLineCurve = !0
  class ja extends Pa {
    constructor(t = new C(), e = new C(), n = new C()) {
      super(), (this.type = 'QuadraticBezierCurve'), (this.v0 = t), (this.v1 = e), (this.v2 = n)
    }
    getPoint(t, e = new C()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2
      return n.set(Ua(t, i.x, r.x, s.x), Ua(t, i.y, r.y, s.y)), n
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
    }
    toJSON() {
      const t = super.toJSON()
      return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      )
    }
  }
  ja.prototype.isQuadraticBezierCurve = !0
  class qa extends Pa {
    constructor(t = new G(), e = new G(), n = new G()) {
      super(), (this.type = 'QuadraticBezierCurve3'), (this.v0 = t), (this.v1 = e), (this.v2 = n)
    }
    getPoint(t, e = new G()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        s = this.v2
      return n.set(Ua(t, i.x, r.x, s.x), Ua(t, i.y, r.y, s.y), Ua(t, i.z, r.z, s.z)), n
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
    }
    toJSON() {
      const t = super.toJSON()
      return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      )
    }
  }
  qa.prototype.isQuadraticBezierCurve3 = !0
  class Xa extends Pa {
    constructor(t = []) {
      super(), (this.type = 'SplineCurve'), (this.points = t)
    }
    getPoint(t, e = new C()) {
      const n = e,
        i = this.points,
        r = (i.length - 1) * t,
        s = Math.floor(r),
        a = r - s,
        o = i[0 === s ? s : s - 1],
        l = i[s],
        c = i[s > i.length - 2 ? i.length - 1 : s + 1],
        h = i[s > i.length - 3 ? i.length - 1 : s + 2]
      return n.set(Fa(a, o.x, l.x, c.x, h.x), Fa(a, o.y, l.y, c.y, h.y)), n
    }
    copy(t) {
      super.copy(t), (this.points = [])
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e]
        this.points.push(n.clone())
      }
      return this
    }
    toJSON() {
      const t = super.toJSON()
      t.points = []
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e]
        t.points.push(n.toArray())
      }
      return t
    }
    fromJSON(t) {
      super.fromJSON(t), (this.points = [])
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e]
        this.points.push(new C().fromArray(n))
      }
      return this
    }
  }
  Xa.prototype.isSplineCurve = !0
  var Ya = Object.freeze({
    __proto__: null,
    ArcCurve: Da,
    CatmullRomCurve3: Ba,
    CubicBezierCurve: ka,
    CubicBezierCurve3: Va,
    EllipseCurve: Ca,
    LineCurve: Wa,
    LineCurve3: class extends Pa {
      constructor(t = new G(), e = new G()) {
        super(), (this.type = 'LineCurve3'), (this.isLineCurve3 = !0), (this.v1 = t), (this.v2 = e)
      }
      getPoint(t, e = new G()) {
        const n = e
        return (
          1 === t
            ? n.copy(this.v2)
            : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
          n
        )
      }
      getPointAt(t, e) {
        return this.getPoint(t, e)
      }
      copy(t) {
        return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
      }
      toJSON() {
        const t = super.toJSON()
        return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t
      }
      fromJSON(t) {
        return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
      }
    },
    QuadraticBezierCurve: ja,
    QuadraticBezierCurve3: qa,
    SplineCurve: Xa,
  })
  class Za extends Pa {
    constructor() {
      super(), (this.type = 'CurvePath'), (this.curves = []), (this.autoClose = !1)
    }
    add(t) {
      this.curves.push(t)
    }
    closePath() {
      const t = this.curves[0].getPoint(0),
        e = this.curves[this.curves.length - 1].getPoint(1)
      t.equals(e) || this.curves.push(new Wa(e, t))
    }
    getPoint(t) {
      const e = t * this.getLength(),
        n = this.getCurveLengths()
      let i = 0
      for (; i < n.length; ) {
        if (n[i] >= e) {
          const t = n[i] - e,
            r = this.curves[i],
            s = r.getLength(),
            a = 0 === s ? 0 : 1 - t / s
          return r.getPointAt(a)
        }
        i++
      }
      return null
    }
    getLength() {
      const t = this.getCurveLengths()
      return t[t.length - 1]
    }
    updateArcLengths() {
      ;(this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths()
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths
      const t = []
      let e = 0
      for (let n = 0, i = this.curves.length; n < i; n++)
        (e += this.curves[n].getLength()), t.push(e)
      return (this.cacheLengths = t), t
    }
    getSpacedPoints(t = 40) {
      const e = []
      for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t))
      return this.autoClose && e.push(e[0]), e
    }
    getPoints(t = 12) {
      const e = []
      let n
      for (let i = 0, r = this.curves; i < r.length; i++) {
        const s = r[i],
          a =
            s && s.isEllipseCurve
              ? 2 * t
              : s && (s.isLineCurve || s.isLineCurve3)
              ? 1
              : s && s.isSplineCurve
              ? t * s.points.length
              : t,
          o = s.getPoints(a)
        for (let t = 0; t < o.length; t++) {
          const i = o[t]
          ;(n && n.equals(i)) || (e.push(i), (n = i))
        }
      }
      return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e
    }
    copy(t) {
      super.copy(t), (this.curves = [])
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e]
        this.curves.push(n.clone())
      }
      return (this.autoClose = t.autoClose), this
    }
    toJSON() {
      const t = super.toJSON()
      ;(t.autoClose = this.autoClose), (t.curves = [])
      for (let e = 0, n = this.curves.length; e < n; e++) {
        const n = this.curves[e]
        t.curves.push(n.toJSON())
      }
      return t
    }
    fromJSON(t) {
      super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = [])
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e]
        this.curves.push(new Ya[n.type]().fromJSON(n))
      }
      return this
    }
  }
  class Ja extends Za {
    constructor(t) {
      super(), (this.type = 'Path'), (this.currentPoint = new C()), t && this.setFromPoints(t)
    }
    setFromPoints(t) {
      this.moveTo(t[0].x, t[0].y)
      for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y)
      return this
    }
    moveTo(t, e) {
      return this.currentPoint.set(t, e), this
    }
    lineTo(t, e) {
      const n = new Wa(this.currentPoint.clone(), new C(t, e))
      return this.curves.push(n), this.currentPoint.set(t, e), this
    }
    quadraticCurveTo(t, e, n, i) {
      const r = new ja(this.currentPoint.clone(), new C(t, e), new C(n, i))
      return this.curves.push(r), this.currentPoint.set(n, i), this
    }
    bezierCurveTo(t, e, n, i, r, s) {
      const a = new ka(this.currentPoint.clone(), new C(t, e), new C(n, i), new C(r, s))
      return this.curves.push(a), this.currentPoint.set(r, s), this
    }
    splineThru(t) {
      const e = [this.currentPoint.clone()].concat(t),
        n = new Xa(e)
      return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this
    }
    arc(t, e, n, i, r, s) {
      const a = this.currentPoint.x,
        o = this.currentPoint.y
      return this.absarc(t + a, e + o, n, i, r, s), this
    }
    absarc(t, e, n, i, r, s) {
      return this.absellipse(t, e, n, n, i, r, s), this
    }
    ellipse(t, e, n, i, r, s, a, o) {
      const l = this.currentPoint.x,
        c = this.currentPoint.y
      return this.absellipse(t + l, e + c, n, i, r, s, a, o), this
    }
    absellipse(t, e, n, i, r, s, a, o) {
      const l = new Ca(t, e, n, i, r, s, a, o)
      if (this.curves.length > 0) {
        const t = l.getPoint(0)
        t.equals(this.currentPoint) || this.lineTo(t.x, t.y)
      }
      this.curves.push(l)
      const c = l.getPoint(1)
      return this.currentPoint.copy(c), this
    }
    copy(t) {
      return super.copy(t), this.currentPoint.copy(t.currentPoint), this
    }
    toJSON() {
      const t = super.toJSON()
      return (t.currentPoint = this.currentPoint.toArray()), t
    }
    fromJSON(t) {
      return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this
    }
  }
  class Qa extends Ja {
    constructor(t) {
      super(t), (this.uuid = P.generateUUID()), (this.type = 'Shape'), (this.holes = [])
    }
    getPointsHoles(t) {
      const e = []
      for (let n = 0, i = this.holes.length; n < i; n++) e[n] = this.holes[n].getPoints(t)
      return e
    }
    extractPoints(t) {
      return { shape: this.getPoints(t), holes: this.getPointsHoles(t) }
    }
    copy(t) {
      super.copy(t), (this.holes = [])
      for (let e = 0, n = t.holes.length; e < n; e++) {
        const n = t.holes[e]
        this.holes.push(n.clone())
      }
      return this
    }
    toJSON() {
      const t = super.toJSON()
      ;(t.uuid = this.uuid), (t.holes = [])
      for (let e = 0, n = this.holes.length; e < n; e++) {
        const n = this.holes[e]
        t.holes.push(n.toJSON())
      }
      return t
    }
    fromJSON(t) {
      super.fromJSON(t), (this.uuid = t.uuid), (this.holes = [])
      for (let e = 0, n = t.holes.length; e < n; e++) {
        const n = t.holes[e]
        this.holes.push(new Ja().fromJSON(n))
      }
      return this
    }
  }
  class Ka extends Ut {
    constructor(t, e = 1) {
      super(), (this.type = 'Light'), (this.color = new he(t)), (this.intensity = e)
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), (this.intensity = t.intensity), this
    }
    toJSON(t) {
      const e = super.toJSON(t)
      return (
        (e.object.color = this.color.getHex()),
        (e.object.intensity = this.intensity),
        void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()),
        void 0 !== this.distance && (e.object.distance = this.distance),
        void 0 !== this.angle && (e.object.angle = this.angle),
        void 0 !== this.decay && (e.object.decay = this.decay),
        void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
        void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()),
        e
      )
    }
  }
  Ka.prototype.isLight = !0
  ;(class extends Ka {
    constructor(t, e, n) {
      super(t, n),
        (this.type = 'HemisphereLight'),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.groundColor = new he(e))
    }
    copy(t) {
      return Ka.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this
    }
  }.prototype.isHemisphereLight = !0)
  const $a = new mt(),
    to = new G(),
    eo = new G()
  class no {
    constructor(t) {
      ;(this.camera = t),
        (this.bias = 0),
        (this.normalBias = 0),
        (this.radius = 1),
        (this.mapSize = new C(512, 512)),
        (this.map = null),
        (this.mapPass = null),
        (this.matrix = new mt()),
        (this.autoUpdate = !0),
        (this.needsUpdate = !1),
        (this._frustum = new fn()),
        (this._frameExtents = new C(1, 1)),
        (this._viewportCount = 1),
        (this._viewports = [new B(0, 0, 1, 1)])
    }
    getViewportCount() {
      return this._viewportCount
    }
    getFrustum() {
      return this._frustum
    }
    updateMatrices(t) {
      const e = this.camera,
        n = this.matrix
      to.setFromMatrixPosition(t.matrixWorld),
        e.position.copy(to),
        eo.setFromMatrixPosition(t.target.matrixWorld),
        e.lookAt(eo),
        e.updateMatrixWorld(),
        $a.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix($a),
        n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
        n.multiply(e.projectionMatrix),
        n.multiply(e.matrixWorldInverse)
    }
    getViewport(t) {
      return this._viewports[t]
    }
    getFrameExtents() {
      return this._frameExtents
    }
    copy(t) {
      return (
        (this.camera = t.camera.clone()),
        (this.bias = t.bias),
        (this.radius = t.radius),
        this.mapSize.copy(t.mapSize),
        this
      )
    }
    clone() {
      return new this.constructor().copy(this)
    }
    toJSON() {
      const t = {}
      return (
        0 !== this.bias && (t.bias = this.bias),
        0 !== this.normalBias && (t.normalBias = this.normalBias),
        1 !== this.radius && (t.radius = this.radius),
        (512 === this.mapSize.x && 512 === this.mapSize.y) || (t.mapSize = this.mapSize.toArray()),
        (t.camera = this.camera.toJSON(!1).object),
        delete t.camera.matrix,
        t
      )
    }
  }
  class io extends no {
    constructor() {
      super(new an(50, 1, 0.5, 500)), (this.focus = 1)
    }
    updateMatrices(t) {
      const e = this.camera,
        n = 2 * P.RAD2DEG * t.angle * this.focus,
        i = this.mapSize.width / this.mapSize.height,
        r = t.distance || e.far
      ;(n === e.fov && i === e.aspect && r === e.far) ||
        ((e.fov = n), (e.aspect = i), (e.far = r), e.updateProjectionMatrix()),
        super.updateMatrices(t)
    }
  }
  io.prototype.isSpotLightShadow = !0
  ;(class extends Ka {
    constructor(t, e, n = 0, i = Math.PI / 3, r = 0, s = 1) {
      super(t, e),
        (this.type = 'SpotLight'),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.target = new Ut()),
        (this.distance = n),
        (this.angle = i),
        (this.penumbra = r),
        (this.decay = s),
        (this.shadow = new io())
    }
    get power() {
      return this.intensity * Math.PI
    }
    set power(t) {
      this.intensity = t / Math.PI
    }
    copy(t) {
      return (
        super.copy(t),
        (this.distance = t.distance),
        (this.angle = t.angle),
        (this.penumbra = t.penumbra),
        (this.decay = t.decay),
        (this.target = t.target.clone()),
        (this.shadow = t.shadow.clone()),
        this
      )
    }
  }.prototype.isSpotLight = !0)
  const ro = new mt(),
    so = new G(),
    ao = new G()
  class oo extends no {
    constructor() {
      super(new an(90, 1, 0.5, 500)),
        (this._frameExtents = new C(4, 2)),
        (this._viewportCount = 6),
        (this._viewports = [
          new B(2, 1, 1, 1),
          new B(0, 1, 1, 1),
          new B(3, 1, 1, 1),
          new B(1, 1, 1, 1),
          new B(3, 0, 1, 1),
          new B(1, 0, 1, 1),
        ]),
        (this._cubeDirections = [
          new G(1, 0, 0),
          new G(-1, 0, 0),
          new G(0, 0, 1),
          new G(0, 0, -1),
          new G(0, 1, 0),
          new G(0, -1, 0),
        ]),
        (this._cubeUps = [
          new G(0, 1, 0),
          new G(0, 1, 0),
          new G(0, 1, 0),
          new G(0, 1, 0),
          new G(0, 0, 1),
          new G(0, 0, -1),
        ])
    }
    updateMatrices(t, e = 0) {
      const n = this.camera,
        i = this.matrix
      so.setFromMatrixPosition(t.matrixWorld),
        n.position.copy(so),
        ao.copy(n.position),
        ao.add(this._cubeDirections[e]),
        n.up.copy(this._cubeUps[e]),
        n.lookAt(ao),
        n.updateMatrixWorld(),
        i.makeTranslation(-so.x, -so.y, -so.z),
        ro.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(ro)
    }
  }
  oo.prototype.isPointLightShadow = !0
  ;(class extends Ka {
    constructor(t, e, n = 0, i = 1) {
      super(t, e),
        (this.type = 'PointLight'),
        (this.distance = n),
        (this.decay = i),
        (this.shadow = new oo())
    }
    get power() {
      return 4 * this.intensity * Math.PI
    }
    set power(t) {
      this.intensity = t / (4 * Math.PI)
    }
    copy(t) {
      return (
        super.copy(t),
        (this.distance = t.distance),
        (this.decay = t.decay),
        (this.shadow = t.shadow.clone()),
        this
      )
    }
  }.prototype.isPointLight = !0)
  class lo extends sn {
    constructor(t = -1, e = 1, n = 1, i = -1, r = 0.1, s = 2e3) {
      super(),
        (this.type = 'OrthographicCamera'),
        (this.zoom = 1),
        (this.view = null),
        (this.left = t),
        (this.right = e),
        (this.top = n),
        (this.bottom = i),
        (this.near = r),
        (this.far = s),
        this.updateProjectionMatrix()
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        (this.left = t.left),
        (this.right = t.right),
        (this.top = t.top),
        (this.bottom = t.bottom),
        (this.near = t.near),
        (this.far = t.far),
        (this.zoom = t.zoom),
        (this.view = null === t.view ? null : Object.assign({}, t.view)),
        this
      )
    }
    setViewOffset(t, e, n, i, r, s) {
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
        (this.view.enabled = !0),
        (this.view.fullWidth = t),
        (this.view.fullHeight = e),
        (this.view.offsetX = n),
        (this.view.offsetY = i),
        (this.view.width = r),
        (this.view.height = s),
        this.updateProjectionMatrix()
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
      const t = (this.right - this.left) / (2 * this.zoom),
        e = (this.top - this.bottom) / (2 * this.zoom),
        n = (this.right + this.left) / 2,
        i = (this.top + this.bottom) / 2
      let r = n - t,
        s = n + t,
        a = i + e,
        o = i - e
      if (null !== this.view && this.view.enabled) {
        const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
          e = (this.top - this.bottom) / this.view.fullHeight / this.zoom
        ;(r += t * this.view.offsetX),
          (s = r + t * this.view.width),
          (a -= e * this.view.offsetY),
          (o = a - e * this.view.height)
      }
      this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(t) {
      const e = Ut.prototype.toJSON.call(this, t)
      return (
        (e.object.zoom = this.zoom),
        (e.object.left = this.left),
        (e.object.right = this.right),
        (e.object.top = this.top),
        (e.object.bottom = this.bottom),
        (e.object.near = this.near),
        (e.object.far = this.far),
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        e
      )
    }
  }
  lo.prototype.isOrthographicCamera = !0
  class co extends no {
    constructor() {
      super(new lo(-5, 5, 5, -5, 0.5, 500))
    }
  }
  co.prototype.isDirectionalLightShadow = !0
  class ho extends Ka {
    constructor(t, e) {
      super(t, e),
        (this.type = 'DirectionalLight'),
        this.position.copy(Ut.DefaultUp),
        this.updateMatrix(),
        (this.target = new Ut()),
        (this.shadow = new co())
    }
    copy(t) {
      return super.copy(t), (this.target = t.target.clone()), (this.shadow = t.shadow.clone()), this
    }
  }
  ho.prototype.isDirectionalLight = !0
  class uo extends Ka {
    constructor(t, e) {
      super(t, e), (this.type = 'AmbientLight')
    }
  }
  uo.prototype.isAmbientLight = !0
  ;(class extends Ka {
    constructor(t, e, n = 10, i = 10) {
      super(t, e), (this.type = 'RectAreaLight'), (this.width = n), (this.height = i)
    }
    copy(t) {
      return super.copy(t), (this.width = t.width), (this.height = t.height), this
    }
    toJSON(t) {
      const e = super.toJSON(t)
      return (e.object.width = this.width), (e.object.height = this.height), e
    }
  }.prototype.isRectAreaLight = !0)
  class po {
    constructor() {
      this.coefficients = []
      for (let t = 0; t < 9; t++) this.coefficients.push(new G())
    }
    set(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].copy(t[e])
      return this
    }
    zero() {
      for (let t = 0; t < 9; t++) this.coefficients[t].set(0, 0, 0)
      return this
    }
    getAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = this.coefficients
      return (
        e.copy(s[0]).multiplyScalar(0.282095),
        e.addScaledVector(s[1], 0.488603 * i),
        e.addScaledVector(s[2], 0.488603 * r),
        e.addScaledVector(s[3], 0.488603 * n),
        e.addScaledVector(s[4], n * i * 1.092548),
        e.addScaledVector(s[5], i * r * 1.092548),
        e.addScaledVector(s[6], 0.315392 * (3 * r * r - 1)),
        e.addScaledVector(s[7], n * r * 1.092548),
        e.addScaledVector(s[8], 0.546274 * (n * n - i * i)),
        e
      )
    }
    getIrradianceAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        s = this.coefficients
      return (
        e.copy(s[0]).multiplyScalar(0.886227),
        e.addScaledVector(s[1], 1.023328 * i),
        e.addScaledVector(s[2], 1.023328 * r),
        e.addScaledVector(s[3], 1.023328 * n),
        e.addScaledVector(s[4], 0.858086 * n * i),
        e.addScaledVector(s[5], 0.858086 * i * r),
        e.addScaledVector(s[6], 0.743125 * r * r - 0.247708),
        e.addScaledVector(s[7], 0.858086 * n * r),
        e.addScaledVector(s[8], 0.429043 * (n * n - i * i)),
        e
      )
    }
    add(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].add(t.coefficients[e])
      return this
    }
    addScaledSH(t, e) {
      for (let n = 0; n < 9; n++) this.coefficients[n].addScaledVector(t.coefficients[n], e)
      return this
    }
    scale(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].multiplyScalar(t)
      return this
    }
    lerp(t, e) {
      for (let n = 0; n < 9; n++) this.coefficients[n].lerp(t.coefficients[n], e)
      return this
    }
    equals(t) {
      for (let e = 0; e < 9; e++) if (!this.coefficients[e].equals(t.coefficients[e])) return !1
      return !0
    }
    copy(t) {
      return this.set(t.coefficients)
    }
    clone() {
      return new this.constructor().copy(this)
    }
    fromArray(t, e = 0) {
      const n = this.coefficients
      for (let i = 0; i < 9; i++) n[i].fromArray(t, e + 3 * i)
      return this
    }
    toArray(t = [], e = 0) {
      const n = this.coefficients
      for (let i = 0; i < 9; i++) n[i].toArray(t, e + 3 * i)
      return t
    }
    static getBasisAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z
      ;(e[0] = 0.282095),
        (e[1] = 0.488603 * i),
        (e[2] = 0.488603 * r),
        (e[3] = 0.488603 * n),
        (e[4] = 1.092548 * n * i),
        (e[5] = 1.092548 * i * r),
        (e[6] = 0.315392 * (3 * r * r - 1)),
        (e[7] = 1.092548 * n * r),
        (e[8] = 0.546274 * (n * n - i * i))
    }
  }
  po.prototype.isSphericalHarmonics3 = !0
  class fo extends Ka {
    constructor(t = new po(), e = 1) {
      super(void 0, e), (this.sh = t)
    }
    copy(t) {
      return super.copy(t), this.sh.copy(t.sh), this
    }
    fromJSON(t) {
      return (this.intensity = t.intensity), this.sh.fromArray(t.sh), this
    }
    toJSON(t) {
      const e = super.toJSON(t)
      return (e.object.sh = this.sh.toArray()), e
    }
  }
  fo.prototype.isLightProbe = !0
  function mo() {
    Ie.call(this), (this.type = 'InstancedBufferGeometry'), (this.instanceCount = 1 / 0)
  }
  function go(t, e, n, i) {
    'number' == typeof n &&
      ((i = n),
      (n = !1),
      console.error(
        'THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.'
      )),
      fe.call(this, t, e, n),
      (this.meshPerAttribute = i || 1)
  }
  function vo(t) {
    'undefined' == typeof createImageBitmap &&
      console.warn('THREE.ImageBitmapLoader: createImageBitmap() not supported.'),
      'undefined' == typeof fetch &&
        console.warn('THREE.ImageBitmapLoader: fetch() not supported.'),
      wa.call(this, t),
      (this.options = { premultiplyAlpha: 'none' })
  }
  ;(mo.prototype = Object.assign(Object.create(Ie.prototype), {
    constructor: mo,
    isInstancedBufferGeometry: !0,
    copy: function (t) {
      return Ie.prototype.copy.call(this, t), (this.instanceCount = t.instanceCount), this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    toJSON: function () {
      const t = Ie.prototype.toJSON.call(this)
      return (t.instanceCount = this.instanceCount), (t.isInstancedBufferGeometry = !0), t
    },
  })),
    (go.prototype = Object.assign(Object.create(fe.prototype), {
      constructor: go,
      isInstancedBufferAttribute: !0,
      copy: function (t) {
        return fe.prototype.copy.call(this, t), (this.meshPerAttribute = t.meshPerAttribute), this
      },
      toJSON: function () {
        const t = fe.prototype.toJSON.call(this)
        return (t.meshPerAttribute = this.meshPerAttribute), (t.isInstancedBufferAttribute = !0), t
      },
    })),
    (vo.prototype = Object.assign(Object.create(wa.prototype), {
      constructor: vo,
      isImageBitmapLoader: !0,
      setOptions: function (t) {
        return (this.options = t), this
      },
      load: function (t, e, n, i) {
        void 0 === t && (t = ''),
          void 0 !== this.path && (t = this.path + t),
          (t = this.manager.resolveURL(t))
        const r = this,
          s = _a.get(t)
        if (void 0 !== s)
          return (
            r.manager.itemStart(t),
            setTimeout(function () {
              e && e(s), r.manager.itemEnd(t)
            }, 0),
            s
          )
        const a = {}
        ;(a.credentials = 'anonymous' === this.crossOrigin ? 'same-origin' : 'include'),
          (a.headers = this.requestHeader),
          fetch(t, a)
            .then(function (t) {
              return t.blob()
            })
            .then(function (t) {
              return createImageBitmap(
                t,
                Object.assign(r.options, { colorSpaceConversion: 'none' })
              )
            })
            .then(function (n) {
              _a.add(t, n), e && e(n), r.manager.itemEnd(t)
            })
            .catch(function (e) {
              i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
            }),
          r.manager.itemStart(t)
      },
    }))
  let yo
  class xo extends wa {
    constructor(t) {
      super(t)
    }
    load(t, e, n, i) {
      const r = this,
        s = new Sa(this.manager)
      s.setResponseType('arraybuffer'),
        s.setPath(this.path),
        s.setRequestHeader(this.requestHeader),
        s.setWithCredentials(this.withCredentials),
        s.load(
          t,
          function (n) {
            try {
              const t = n.slice(0)
              ;(void 0 === yo && (yo = new (window.AudioContext || window.webkitAudioContext)()),
              yo).decodeAudioData(t, function (t) {
                e(t)
              })
            } catch (e) {
              i ? i(e) : console.error(e), r.manager.itemError(t)
            }
          },
          n,
          i
        )
    }
  }
  ;((class extends fo {
    constructor(t, e, n = 1) {
      super(void 0, n)
      const i = new he().set(t),
        r = new he().set(e),
        s = new G(i.r, i.g, i.b),
        a = new G(r.r, r.g, r.b),
        o = Math.sqrt(Math.PI),
        l = o * Math.sqrt(0.75)
      this.sh.coefficients[0].copy(s).add(a).multiplyScalar(o),
        this.sh.coefficients[1].copy(s).sub(a).multiplyScalar(l)
    }
  }.prototype.isHemisphereLightProbe = !0),
    (class extends fo {
      constructor(t, e = 1) {
        super(void 0, e)
        const n = new he().set(t)
        this.sh.coefficients[0].set(n.r, n.g, n.b).multiplyScalar(2 * Math.sqrt(Math.PI))
      }
    }.prototype.isAmbientLightProbe = !0),
    new mt(),
    new mt())
  class _o {
    constructor(t) {
      ;(this.autoStart = void 0 === t || t),
        (this.startTime = 0),
        (this.oldTime = 0),
        (this.elapsedTime = 0),
        (this.running = !1)
    }
    start() {
      ;(this.startTime = bo()),
        (this.oldTime = this.startTime),
        (this.elapsedTime = 0),
        (this.running = !0)
    }
    stop() {
      this.getElapsedTime(), (this.running = !1), (this.autoStart = !1)
    }
    getElapsedTime() {
      return this.getDelta(), this.elapsedTime
    }
    getDelta() {
      let t = 0
      if (this.autoStart && !this.running) return this.start(), 0
      if (this.running) {
        const e = bo()
        ;(t = (e - this.oldTime) / 1e3), (this.oldTime = e), (this.elapsedTime += t)
      }
      return t
    }
  }
  function bo() {
    return ('undefined' == typeof performance ? Date : performance).now()
  }
  class wo {
    constructor(t, e, n) {
      let i, r, s
      switch (((this.binding = t), (this.valueSize = n), e)) {
        case 'quaternion':
          ;(i = this._slerp),
            (r = this._slerpAdditive),
            (s = this._setAdditiveIdentityQuaternion),
            (this.buffer = new Float64Array(6 * n)),
            (this._workIndex = 5)
          break
        case 'string':
        case 'bool':
          ;(i = this._select),
            (r = this._select),
            (s = this._setAdditiveIdentityOther),
            (this.buffer = new Array(5 * n))
          break
        default:
          ;(i = this._lerp),
            (r = this._lerpAdditive),
            (s = this._setAdditiveIdentityNumeric),
            (this.buffer = new Float64Array(5 * n))
      }
      ;(this._mixBufferRegion = i),
        (this._mixBufferRegionAdditive = r),
        (this._setIdentity = s),
        (this._origIndex = 3),
        (this._addIndex = 4),
        (this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0),
        (this.useCount = 0),
        (this.referenceCount = 0)
    }
    accumulate(t, e) {
      const n = this.buffer,
        i = this.valueSize,
        r = t * i + i
      let s = this.cumulativeWeight
      if (0 === s) {
        for (let t = 0; t !== i; ++t) n[r + t] = n[t]
        s = e
      } else {
        s += e
        const t = e / s
        this._mixBufferRegion(n, r, 0, t, i)
      }
      this.cumulativeWeight = s
    }
    accumulateAdditive(t) {
      const e = this.buffer,
        n = this.valueSize,
        i = n * this._addIndex
      0 === this.cumulativeWeightAdditive && this._setIdentity(),
        this._mixBufferRegionAdditive(e, i, 0, t, n),
        (this.cumulativeWeightAdditive += t)
    }
    apply(t) {
      const e = this.valueSize,
        n = this.buffer,
        i = t * e + e,
        r = this.cumulativeWeight,
        s = this.cumulativeWeightAdditive,
        a = this.binding
      if (((this.cumulativeWeight = 0), (this.cumulativeWeightAdditive = 0), r < 1)) {
        const t = e * this._origIndex
        this._mixBufferRegion(n, i, t, 1 - r, e)
      }
      s > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * e, 1, e)
      for (let t = e, r = e + e; t !== r; ++t)
        if (n[t] !== n[t + e]) {
          a.setValue(n, i)
          break
        }
    }
    saveOriginalState() {
      const t = this.binding,
        e = this.buffer,
        n = this.valueSize,
        i = n * this._origIndex
      t.getValue(e, i)
      for (let t = n, r = i; t !== r; ++t) e[t] = e[i + (t % n)]
      this._setIdentity(), (this.cumulativeWeight = 0), (this.cumulativeWeightAdditive = 0)
    }
    restoreOriginalState() {
      const t = 3 * this.valueSize
      this.binding.setValue(this.buffer, t)
    }
    _setAdditiveIdentityNumeric() {
      const t = this._addIndex * this.valueSize,
        e = t + this.valueSize
      for (let n = t; n < e; n++) this.buffer[n] = 0
    }
    _setAdditiveIdentityQuaternion() {
      this._setAdditiveIdentityNumeric(), (this.buffer[this._addIndex * this.valueSize + 3] = 1)
    }
    _setAdditiveIdentityOther() {
      const t = this._origIndex * this.valueSize,
        e = this._addIndex * this.valueSize
      for (let n = 0; n < this.valueSize; n++) this.buffer[e + n] = this.buffer[t + n]
    }
    _select(t, e, n, i, r) {
      if (i >= 0.5) for (let i = 0; i !== r; ++i) t[e + i] = t[n + i]
    }
    _slerp(t, e, n, i) {
      U.slerpFlat(t, e, t, e, t, n, i)
    }
    _slerpAdditive(t, e, n, i, r) {
      const s = this._workIndex * r
      U.multiplyQuaternionsFlat(t, s, t, e, t, n), U.slerpFlat(t, e, t, e, t, s, i)
    }
    _lerp(t, e, n, i, r) {
      const s = 1 - i
      for (let a = 0; a !== r; ++a) {
        const r = e + a
        t[r] = t[r] * s + t[n + a] * i
      }
    }
    _lerpAdditive(t, e, n, i, r) {
      for (let s = 0; s !== r; ++s) {
        const r = e + s
        t[r] = t[r] + t[n + s] * i
      }
    }
  }
  const Mo = new RegExp('[\\[\\]\\.:\\/]', 'g'),
    So = '[^\\[\\]\\.:\\/]',
    Eo = '[^' + '\\[\\]\\.:\\/'.replace('\\.', '') + ']',
    To = /((?:WC+[\/:])*)/.source.replace('WC', So),
    Lo = /(WCOD+)?/.source.replace('WCOD', Eo),
    Ao = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', So),
    Ro = /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', So),
    Po = new RegExp('^' + To + Lo + Ao + Ro + '$'),
    Co = ['material', 'materials', 'bones']
  function Do(t, e, n) {
    const i = n || Io.parseTrackName(e)
    ;(this._targetGroup = t), (this._bindings = t.subscribe_(e, i))
  }
  function Io(t, e, n) {
    ;(this.path = e),
      (this.parsedPath = n || Io.parseTrackName(e)),
      (this.node = Io.findNode(t, this.parsedPath.nodeName) || t),
      (this.rootNode = t)
  }
  Object.assign(Do.prototype, {
    getValue: function (t, e) {
      this.bind()
      const n = this._targetGroup.nCachedObjects_,
        i = this._bindings[n]
      void 0 !== i && i.getValue(t, e)
    },
    setValue: function (t, e) {
      const n = this._bindings
      for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i)
        n[i].setValue(t, e)
    },
    bind: function () {
      const t = this._bindings
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind()
    },
    unbind: function () {
      const t = this._bindings
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind()
    },
  }),
    Object.assign(Io, {
      Composite: Do,
      create: function (t, e, n) {
        return t && t.isAnimationObjectGroup ? new Io.Composite(t, e, n) : new Io(t, e, n)
      },
      sanitizeNodeName: function (t) {
        return t.replace(/\s/g, '_').replace(Mo, '')
      },
      parseTrackName: function (t) {
        const e = Po.exec(t)
        if (!e) throw new Error('PropertyBinding: Cannot parse trackName: ' + t)
        const n = {
            nodeName: e[2],
            objectName: e[3],
            objectIndex: e[4],
            propertyName: e[5],
            propertyIndex: e[6],
          },
          i = n.nodeName && n.nodeName.lastIndexOf('.')
        if (void 0 !== i && -1 !== i) {
          const t = n.nodeName.substring(i + 1)
          ;-1 !== Co.indexOf(t) && ((n.nodeName = n.nodeName.substring(0, i)), (n.objectName = t))
        }
        if (null === n.propertyName || 0 === n.propertyName.length)
          throw new Error('PropertyBinding: can not parse propertyName from trackName: ' + t)
        return n
      },
      findNode: function (t, e) {
        if (!e || '' === e || '.' === e || -1 === e || e === t.name || e === t.uuid) return t
        if (t.skeleton) {
          const n = t.skeleton.getBoneByName(e)
          if (void 0 !== n) return n
        }
        if (t.children) {
          const n = function (t) {
              for (let i = 0; i < t.length; i++) {
                const r = t[i]
                if (r.name === e || r.uuid === e) return r
                const s = n(r.children)
                if (s) return s
              }
              return null
            },
            i = n(t.children)
          if (i) return i
        }
        return null
      },
    }),
    Object.assign(Io.prototype, {
      _getValue_unavailable: function () {},
      _setValue_unavailable: function () {},
      BindingType: { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 },
      Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 },
      GetterByBindingType: [
        function (t, e) {
          t[e] = this.node[this.propertyName]
        },
        function (t, e) {
          const n = this.resolvedProperty
          for (let i = 0, r = n.length; i !== r; ++i) t[e++] = n[i]
        },
        function (t, e) {
          t[e] = this.resolvedProperty[this.propertyIndex]
        },
        function (t, e) {
          this.resolvedProperty.toArray(t, e)
        },
      ],
      SetterByBindingTypeAndVersioning: [
        [
          function (t, e) {
            this.targetObject[this.propertyName] = t[e]
          },
          function (t, e) {
            ;(this.targetObject[this.propertyName] = t[e]), (this.targetObject.needsUpdate = !0)
          },
          function (t, e) {
            ;(this.targetObject[this.propertyName] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0)
          },
        ],
        [
          function (t, e) {
            const n = this.resolvedProperty
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
          },
          function (t, e) {
            const n = this.resolvedProperty
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
            this.targetObject.needsUpdate = !0
          },
          function (t, e) {
            const n = this.resolvedProperty
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
            this.targetObject.matrixWorldNeedsUpdate = !0
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e]
          },
          function (t, e) {
            ;(this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.needsUpdate = !0)
          },
          function (t, e) {
            ;(this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0)
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty.fromArray(t, e)
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e), (this.targetObject.needsUpdate = !0)
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e), (this.targetObject.matrixWorldNeedsUpdate = !0)
          },
        ],
      ],
      getValue: function (t, e) {
        this.bind(), this.getValue(t, e)
      },
      setValue: function (t, e) {
        this.bind(), this.setValue(t, e)
      },
      bind: function () {
        let t = this.node
        const e = this.parsedPath,
          n = e.objectName,
          i = e.propertyName
        let r = e.propertyIndex
        if (
          (t || ((t = Io.findNode(this.rootNode, e.nodeName) || this.rootNode), (this.node = t)),
          (this.getValue = this._getValue_unavailable),
          (this.setValue = this._setValue_unavailable),
          !t)
        )
          return void console.error(
            'THREE.PropertyBinding: Trying to update node for track: ' +
              this.path +
              " but it wasn't found."
          )
        if (n) {
          let i = e.objectIndex
          switch (n) {
            case 'materials':
              if (!t.material)
                return void console.error(
                  'THREE.PropertyBinding: Can not bind to material as node does not have a material.',
                  this
                )
              if (!t.material.materials)
                return void console.error(
                  'THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.',
                  this
                )
              t = t.material.materials
              break
            case 'bones':
              if (!t.skeleton)
                return void console.error(
                  'THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.',
                  this
                )
              t = t.skeleton.bones
              for (let e = 0; e < t.length; e++)
                if (t[e].name === i) {
                  i = e
                  break
                }
              break
            default:
              if (void 0 === t[n])
                return void console.error(
                  'THREE.PropertyBinding: Can not bind to objectName of node undefined.',
                  this
                )
              t = t[n]
          }
          if (void 0 !== i) {
            if (void 0 === t[i])
              return void console.error(
                'THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.',
                this,
                t
              )
            t = t[i]
          }
        }
        const s = t[i]
        if (void 0 === s) {
          const n = e.nodeName
          return void console.error(
            'THREE.PropertyBinding: Trying to update property for track: ' +
              n +
              '.' +
              i +
              " but it wasn't found.",
            t
          )
        }
        let a = this.Versioning.None
        ;(this.targetObject = t),
          void 0 !== t.needsUpdate
            ? (a = this.Versioning.NeedsUpdate)
            : void 0 !== t.matrixWorldNeedsUpdate && (a = this.Versioning.MatrixWorldNeedsUpdate)
        let o = this.BindingType.Direct
        if (void 0 !== r) {
          if ('morphTargetInfluences' === i) {
            if (!t.geometry)
              return void console.error(
                'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.',
                this
              )
            if (!t.geometry.isBufferGeometry)
              return void console.error(
                'THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.',
                this
              )
            if (!t.geometry.morphAttributes)
              return void console.error(
                'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.',
                this
              )
            void 0 !== t.morphTargetDictionary[r] && (r = t.morphTargetDictionary[r])
          }
          ;(o = this.BindingType.ArrayElement),
            (this.resolvedProperty = s),
            (this.propertyIndex = r)
        } else
          void 0 !== s.fromArray && void 0 !== s.toArray
            ? ((o = this.BindingType.HasFromToArray), (this.resolvedProperty = s))
            : Array.isArray(s)
            ? ((o = this.BindingType.EntireArray), (this.resolvedProperty = s))
            : (this.propertyName = i)
        ;(this.getValue = this.GetterByBindingType[o]),
          (this.setValue = this.SetterByBindingTypeAndVersioning[o][a])
      },
      unbind: function () {
        ;(this.node = null),
          (this.getValue = this._getValue_unbound),
          (this.setValue = this._setValue_unbound)
      },
    }),
    Object.assign(Io.prototype, {
      _getValue_unbound: Io.prototype.getValue,
      _setValue_unbound: Io.prototype.setValue,
    })
  class No {
    constructor(t, e, n = null, i = e.blendMode) {
      ;(this._mixer = t), (this._clip = e), (this._localRoot = n), (this.blendMode = i)
      const r = e.tracks,
        s = r.length,
        a = new Array(s),
        o = { endingStart: x, endingEnd: x }
      for (let t = 0; t !== s; ++t) {
        const e = r[t].createInterpolant(null)
        ;(a[t] = e), (e.settings = o)
      }
      ;(this._interpolantSettings = o),
        (this._interpolants = a),
        (this._propertyBindings = new Array(s)),
        (this._cacheIndex = null),
        (this._byClipCacheIndex = null),
        (this._timeScaleInterpolant = null),
        (this._weightInterpolant = null),
        (this.loop = 2201),
        (this._loopCount = -1),
        (this._startTime = null),
        (this.time = 0),
        (this.timeScale = 1),
        (this._effectiveTimeScale = 1),
        (this.weight = 1),
        (this._effectiveWeight = 1),
        (this.repetitions = 1 / 0),
        (this.paused = !1),
        (this.enabled = !0),
        (this.clampWhenFinished = !1),
        (this.zeroSlopeAtStart = !0),
        (this.zeroSlopeAtEnd = !0)
    }
    play() {
      return this._mixer._activateAction(this), this
    }
    stop() {
      return this._mixer._deactivateAction(this), this.reset()
    }
    reset() {
      return (
        (this.paused = !1),
        (this.enabled = !0),
        (this.time = 0),
        (this._loopCount = -1),
        (this._startTime = null),
        this.stopFading().stopWarping()
      )
    }
    isRunning() {
      return (
        this.enabled &&
        !this.paused &&
        0 !== this.timeScale &&
        null === this._startTime &&
        this._mixer._isActiveAction(this)
      )
    }
    isScheduled() {
      return this._mixer._isActiveAction(this)
    }
    startAt(t) {
      return (this._startTime = t), this
    }
    setLoop(t, e) {
      return (this.loop = t), (this.repetitions = e), this
    }
    setEffectiveWeight(t) {
      return (this.weight = t), (this._effectiveWeight = this.enabled ? t : 0), this.stopFading()
    }
    getEffectiveWeight() {
      return this._effectiveWeight
    }
    fadeIn(t) {
      return this._scheduleFading(t, 0, 1)
    }
    fadeOut(t) {
      return this._scheduleFading(t, 1, 0)
    }
    crossFadeFrom(t, e, n) {
      if ((t.fadeOut(e), this.fadeIn(e), n)) {
        const n = this._clip.duration,
          i = t._clip.duration,
          r = i / n,
          s = n / i
        t.warp(1, r, e), this.warp(s, 1, e)
      }
      return this
    }
    crossFadeTo(t, e, n) {
      return t.crossFadeFrom(this, e, n)
    }
    stopFading() {
      const t = this._weightInterpolant
      return (
        null !== t &&
          ((this._weightInterpolant = null), this._mixer._takeBackControlInterpolant(t)),
        this
      )
    }
    setEffectiveTimeScale(t) {
      return (
        (this.timeScale = t), (this._effectiveTimeScale = this.paused ? 0 : t), this.stopWarping()
      )
    }
    getEffectiveTimeScale() {
      return this._effectiveTimeScale
    }
    setDuration(t) {
      return (this.timeScale = this._clip.duration / t), this.stopWarping()
    }
    syncWith(t) {
      return (this.time = t.time), (this.timeScale = t.timeScale), this.stopWarping()
    }
    halt(t) {
      return this.warp(this._effectiveTimeScale, 0, t)
    }
    warp(t, e, n) {
      const i = this._mixer,
        r = i.time,
        s = this.timeScale
      let a = this._timeScaleInterpolant
      null === a && ((a = i._lendControlInterpolant()), (this._timeScaleInterpolant = a))
      const o = a.parameterPositions,
        l = a.sampleValues
      return (o[0] = r), (o[1] = r + n), (l[0] = t / s), (l[1] = e / s), this
    }
    stopWarping() {
      const t = this._timeScaleInterpolant
      return (
        null !== t &&
          ((this._timeScaleInterpolant = null), this._mixer._takeBackControlInterpolant(t)),
        this
      )
    }
    getMixer() {
      return this._mixer
    }
    getClip() {
      return this._clip
    }
    getRoot() {
      return this._localRoot || this._mixer._root
    }
    _update(t, e, n, i) {
      if (!this.enabled) return void this._updateWeight(t)
      const r = this._startTime
      if (null !== r) {
        const i = (t - r) * n
        if (i < 0 || 0 === n) return
        ;(this._startTime = null), (e = n * i)
      }
      e *= this._updateTimeScale(t)
      const s = this._updateTime(e),
        a = this._updateWeight(t)
      if (a > 0) {
        const t = this._interpolants,
          e = this._propertyBindings
        if (2501 === this.blendMode)
          for (let n = 0, i = t.length; n !== i; ++n) t[n].evaluate(s), e[n].accumulateAdditive(a)
        else for (let n = 0, r = t.length; n !== r; ++n) t[n].evaluate(s), e[n].accumulate(i, a)
      }
    }
    _updateWeight(t) {
      let e = 0
      if (this.enabled) {
        e = this.weight
        const n = this._weightInterpolant
        if (null !== n) {
          const i = n.evaluate(t)[0]
          ;(e *= i),
            t > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
        }
      }
      return (this._effectiveWeight = e), e
    }
    _updateTimeScale(t) {
      let e = 0
      if (!this.paused) {
        e = this.timeScale
        const n = this._timeScaleInterpolant
        null !== n &&
          ((e *= n.evaluate(t)[0]),
          t > n.parameterPositions[1] &&
            (this.stopWarping(), 0 === e ? (this.paused = !0) : (this.timeScale = e)))
      }
      return (this._effectiveTimeScale = e), e
    }
    _updateTime(t) {
      const e = this._clip.duration,
        n = this.loop
      let i = this.time + t,
        r = this._loopCount
      const s = 2202 === n
      if (0 === t) return -1 === r ? i : s && 1 == (1 & r) ? e - i : i
      if (2200 === n) {
        ;-1 === r && ((this._loopCount = 0), this._setEndings(!0, !0, !1))
        t: {
          if (i >= e) i = e
          else {
            if (!(i < 0)) {
              this.time = i
              break t
            }
            i = 0
          }
          this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
            (this.time = i),
            this._mixer.dispatchEvent({ type: 'finished', action: this, direction: t < 0 ? -1 : 1 })
        }
      } else {
        if (
          (-1 === r &&
            (t >= 0
              ? ((r = 0), this._setEndings(!0, 0 === this.repetitions, s))
              : this._setEndings(0 === this.repetitions, !0, s)),
          i >= e || i < 0)
        ) {
          const n = Math.floor(i / e)
          ;(i -= e * n), (r += Math.abs(n))
          const a = this.repetitions - r
          if (a <= 0)
            this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
              (i = t > 0 ? e : 0),
              (this.time = i),
              this._mixer.dispatchEvent({
                type: 'finished',
                action: this,
                direction: t > 0 ? 1 : -1,
              })
          else {
            if (1 === a) {
              const e = t < 0
              this._setEndings(e, !e, s)
            } else this._setEndings(!1, !1, s)
            ;(this._loopCount = r),
              (this.time = i),
              this._mixer.dispatchEvent({ type: 'loop', action: this, loopDelta: n })
          }
        } else this.time = i
        if (s && 1 == (1 & r)) return e - i
      }
      return i
    }
    _setEndings(t, e, n) {
      const i = this._interpolantSettings
      n
        ? ((i.endingStart = _), (i.endingEnd = _))
        : ((i.endingStart = t ? (this.zeroSlopeAtStart ? _ : x) : b),
          (i.endingEnd = e ? (this.zeroSlopeAtEnd ? _ : x) : b))
    }
    _scheduleFading(t, e, n) {
      const i = this._mixer,
        r = i.time
      let s = this._weightInterpolant
      null === s && ((s = i._lendControlInterpolant()), (this._weightInterpolant = s))
      const a = s.parameterPositions,
        o = s.sampleValues
      return (a[0] = r), (o[0] = e), (a[1] = r + t), (o[1] = n), this
    }
  }
  ;(class extends L {
    constructor(t) {
      super(),
        (this._root = t),
        this._initMemoryManager(),
        (this._accuIndex = 0),
        (this.time = 0),
        (this.timeScale = 1)
    }
    _bindAction(t, e) {
      const n = t._localRoot || this._root,
        i = t._clip.tracks,
        r = i.length,
        s = t._propertyBindings,
        a = t._interpolants,
        o = n.uuid,
        l = this._bindingsByRootAndName
      let c = l[o]
      void 0 === c && ((c = {}), (l[o] = c))
      for (let t = 0; t !== r; ++t) {
        const r = i[t],
          l = r.name
        let h = c[l]
        if (void 0 !== h) s[t] = h
        else {
          if (((h = s[t]), void 0 !== h)) {
            null === h._cacheIndex && (++h.referenceCount, this._addInactiveBinding(h, o, l))
            continue
          }
          const i = e && e._propertyBindings[t].binding.parsedPath
          ;(h = new wo(Io.create(n, l, i), r.ValueTypeName, r.getValueSize())),
            ++h.referenceCount,
            this._addInactiveBinding(h, o, l),
            (s[t] = h)
        }
        a[t].resultBuffer = h.buffer
      }
    }
    _activateAction(t) {
      if (!this._isActiveAction(t)) {
        if (null === t._cacheIndex) {
          const e = (t._localRoot || this._root).uuid,
            n = t._clip.uuid,
            i = this._actionsByClip[n]
          this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, n, e)
        }
        const e = t._propertyBindings
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t]
          0 == n.useCount++ && (this._lendBinding(n), n.saveOriginalState())
        }
        this._lendAction(t)
      }
    }
    _deactivateAction(t) {
      if (this._isActiveAction(t)) {
        const e = t._propertyBindings
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t]
          0 == --n.useCount && (n.restoreOriginalState(), this._takeBackBinding(n))
        }
        this._takeBackAction(t)
      }
    }
    _initMemoryManager() {
      ;(this._actions = []),
        (this._nActiveActions = 0),
        (this._actionsByClip = {}),
        (this._bindings = []),
        (this._nActiveBindings = 0),
        (this._bindingsByRootAndName = {}),
        (this._controlInterpolants = []),
        (this._nActiveControlInterpolants = 0)
      const t = this
      this.stats = {
        actions: {
          get total() {
            return t._actions.length
          },
          get inUse() {
            return t._nActiveActions
          },
        },
        bindings: {
          get total() {
            return t._bindings.length
          },
          get inUse() {
            return t._nActiveBindings
          },
        },
        controlInterpolants: {
          get total() {
            return t._controlInterpolants.length
          },
          get inUse() {
            return t._nActiveControlInterpolants
          },
        },
      }
    }
    _isActiveAction(t) {
      const e = t._cacheIndex
      return null !== e && e < this._nActiveActions
    }
    _addInactiveAction(t, e, n) {
      const i = this._actions,
        r = this._actionsByClip
      let s = r[e]
      if (void 0 === s)
        (s = { knownActions: [t], actionByRoot: {} }), (t._byClipCacheIndex = 0), (r[e] = s)
      else {
        const e = s.knownActions
        ;(t._byClipCacheIndex = e.length), e.push(t)
      }
      ;(t._cacheIndex = i.length), i.push(t), (s.actionByRoot[n] = t)
    }
    _removeInactiveAction(t) {
      const e = this._actions,
        n = e[e.length - 1],
        i = t._cacheIndex
      ;(n._cacheIndex = i), (e[i] = n), e.pop(), (t._cacheIndex = null)
      const r = t._clip.uuid,
        s = this._actionsByClip,
        a = s[r],
        o = a.knownActions,
        l = o[o.length - 1],
        c = t._byClipCacheIndex
      ;(l._byClipCacheIndex = c),
        (o[c] = l),
        o.pop(),
        (t._byClipCacheIndex = null),
        delete a.actionByRoot[(t._localRoot || this._root).uuid],
        0 === o.length && delete s[r],
        this._removeInactiveBindingsForAction(t)
    }
    _removeInactiveBindingsForAction(t) {
      const e = t._propertyBindings
      for (let t = 0, n = e.length; t !== n; ++t) {
        const n = e[t]
        0 == --n.referenceCount && this._removeInactiveBinding(n)
      }
    }
    _lendAction(t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = this._nActiveActions++,
        r = e[i]
      ;(t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r)
    }
    _takeBackAction(t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = --this._nActiveActions,
        r = e[i]
      ;(t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r)
    }
    _addInactiveBinding(t, e, n) {
      const i = this._bindingsByRootAndName,
        r = this._bindings
      let s = i[e]
      void 0 === s && ((s = {}), (i[e] = s)), (s[n] = t), (t._cacheIndex = r.length), r.push(t)
    }
    _removeInactiveBinding(t) {
      const e = this._bindings,
        n = t.binding,
        i = n.rootNode.uuid,
        r = n.path,
        s = this._bindingsByRootAndName,
        a = s[i],
        o = e[e.length - 1],
        l = t._cacheIndex
      ;(o._cacheIndex = l),
        (e[l] = o),
        e.pop(),
        delete a[r],
        0 === Object.keys(a).length && delete s[i]
    }
    _lendBinding(t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = this._nActiveBindings++,
        r = e[i]
      ;(t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r)
    }
    _takeBackBinding(t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = --this._nActiveBindings,
        r = e[i]
      ;(t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r)
    }
    _lendControlInterpolant() {
      const t = this._controlInterpolants,
        e = this._nActiveControlInterpolants++
      let n = t[e]
      return (
        void 0 === n &&
          ((n = new la(
            new Float32Array(2),
            new Float32Array(2),
            1,
            this._controlInterpolantsResultBuffer
          )),
          (n.__cacheIndex = e),
          (t[e] = n)),
        n
      )
    }
    _takeBackControlInterpolant(t) {
      const e = this._controlInterpolants,
        n = t.__cacheIndex,
        i = --this._nActiveControlInterpolants,
        r = e[i]
      ;(t.__cacheIndex = i), (e[i] = t), (r.__cacheIndex = n), (e[n] = r)
    }
    clipAction(t, e, n) {
      const i = e || this._root,
        r = i.uuid
      let s = 'string' == typeof t ? ya.findByName(i, t) : t
      const a = null !== s ? s.uuid : t,
        o = this._actionsByClip[a]
      let l = null
      if ((void 0 === n && (n = null !== s ? s.blendMode : 2500), void 0 !== o)) {
        const t = o.actionByRoot[r]
        if (void 0 !== t && t.blendMode === n) return t
        ;(l = o.knownActions[0]), null === s && (s = l._clip)
      }
      if (null === s) return null
      const c = new No(this, s, e, n)
      return this._bindAction(c, l), this._addInactiveAction(c, a, r), c
    }
    existingAction(t, e) {
      const n = e || this._root,
        i = n.uuid,
        r = 'string' == typeof t ? ya.findByName(n, t) : t,
        s = r ? r.uuid : t,
        a = this._actionsByClip[s]
      return (void 0 !== a && a.actionByRoot[i]) || null
    }
    stopAllAction() {
      const t = this._actions
      for (let e = this._nActiveActions - 1; e >= 0; --e) t[e].stop()
      return this
    }
    update(t) {
      t *= this.timeScale
      const e = this._actions,
        n = this._nActiveActions,
        i = (this.time += t),
        r = Math.sign(t),
        s = (this._accuIndex ^= 1)
      for (let a = 0; a !== n; ++a) e[a]._update(i, t, r, s)
      const a = this._bindings,
        o = this._nActiveBindings
      for (let t = 0; t !== o; ++t) a[t].apply(s)
      return this
    }
    setTime(t) {
      this.time = 0
      for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0
      return this.update(t)
    }
    getRoot() {
      return this._root
    }
    uncacheClip(t) {
      const e = this._actions,
        n = t.uuid,
        i = this._actionsByClip,
        r = i[n]
      if (void 0 !== r) {
        const t = r.knownActions
        for (let n = 0, i = t.length; n !== i; ++n) {
          const i = t[n]
          this._deactivateAction(i)
          const r = i._cacheIndex,
            s = e[e.length - 1]
          ;(i._cacheIndex = null),
            (i._byClipCacheIndex = null),
            (s._cacheIndex = r),
            (e[r] = s),
            e.pop(),
            this._removeInactiveBindingsForAction(i)
        }
        delete i[n]
      }
    }
    uncacheRoot(t) {
      const e = t.uuid,
        n = this._actionsByClip
      for (const t in n) {
        const i = n[t].actionByRoot[e]
        void 0 !== i && (this._deactivateAction(i), this._removeInactiveAction(i))
      }
      const i = this._bindingsByRootAndName[e]
      if (void 0 !== i)
        for (const t in i) {
          const e = i[t]
          e.restoreOriginalState(), this._removeInactiveBinding(e)
        }
    }
    uncacheAction(t, e) {
      const n = this.existingAction(t, e)
      null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
    }
  }.prototype._controlInterpolantsResultBuffer = new Float32Array(1))
  class Oo {
    constructor(t) {
      'string' == typeof t &&
        (console.warn('THREE.Uniform: Type parameter is no longer needed.'), (t = arguments[1])),
        (this.value = t)
    }
    clone() {
      return new Oo(void 0 === this.value.clone ? this.value : this.value.clone())
    }
  }
  function zo(t, e, n) {
    Er.call(this, t, e), (this.meshPerAttribute = n || 1)
  }
  function Ho(t, e, n, i, r) {
    ;(this.buffer = t),
      (this.type = e),
      (this.itemSize = n),
      (this.elementSize = i),
      (this.count = r),
      (this.version = 0)
  }
  function Bo(t, e, n = 0, i = 1 / 0) {
    ;(this.ray = new ft(t, e)),
      (this.near = n),
      (this.far = i),
      (this.camera = null),
      (this.layers = new Tt()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }),
      Object.defineProperties(this.params, {
        PointCloud: {
          get: function () {
            return (
              console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.'),
              this.Points
            )
          },
        },
      })
  }
  function Fo(t, e) {
    return t.distance - e.distance
  }
  function Uo(t, e, n, i) {
    if ((t.layers.test(e.layers) && t.raycast(e, n), !0 === i)) {
      const i = t.children
      for (let t = 0, r = i.length; t < r; t++) Uo(i[t], e, n, !0)
    }
  }
  ;(zo.prototype = Object.assign(Object.create(Er.prototype), {
    constructor: zo,
    isInstancedInterleavedBuffer: !0,
    copy: function (t) {
      return Er.prototype.copy.call(this, t), (this.meshPerAttribute = t.meshPerAttribute), this
    },
    clone: function (t) {
      const e = Er.prototype.clone.call(this, t)
      return (e.meshPerAttribute = this.meshPerAttribute), e
    },
    toJSON: function (t) {
      const e = Er.prototype.toJSON.call(this, t)
      return (e.isInstancedInterleavedBuffer = !0), (e.meshPerAttribute = this.meshPerAttribute), e
    },
  })),
    Object.defineProperty(Ho.prototype, 'needsUpdate', {
      set: function (t) {
        !0 === t && this.version++
      },
    }),
    Object.assign(Ho.prototype, {
      isGLBufferAttribute: !0,
      setBuffer: function (t) {
        return (this.buffer = t), this
      },
      setType: function (t, e) {
        return (this.type = t), (this.elementSize = e), this
      },
      setItemSize: function (t) {
        return (this.itemSize = t), this
      },
      setCount: function (t) {
        return (this.count = t), this
      },
    }),
    Object.assign(Bo.prototype, {
      set: function (t, e) {
        this.ray.set(t, e)
      },
      setFromCamera: function (t, e) {
        e && e.isPerspectiveCamera
          ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld),
            this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(),
            (this.camera = e))
          : e && e.isOrthographicCamera
          ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e),
            this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld),
            (this.camera = e))
          : console.error('THREE.Raycaster: Unsupported camera type: ' + e.type)
      },
      intersectObject: function (t, e = !1, n = []) {
        return Uo(t, this, n, e), n.sort(Fo), n
      },
      intersectObjects: function (t, e = !1, n = []) {
        for (let i = 0, r = t.length; i < r; i++) Uo(t[i], this, n, e)
        return n.sort(Fo), n
      },
    })
  class Go {
    constructor(t = 1, e = 0, n = 0) {
      return (this.radius = t), (this.phi = e), (this.theta = n), this
    }
    set(t, e, n) {
      return (this.radius = t), (this.phi = e), (this.theta = n), this
    }
    copy(t) {
      return (this.radius = t.radius), (this.phi = t.phi), (this.theta = t.theta), this
    }
    makeSafe() {
      const t = 1e-6
      return (this.phi = Math.max(t, Math.min(Math.PI - t, this.phi))), this
    }
    setFromVector3(t) {
      return this.setFromCartesianCoords(t.x, t.y, t.z)
    }
    setFromCartesianCoords(t, e, n) {
      return (
        (this.radius = Math.sqrt(t * t + e * e + n * n)),
        0 === this.radius
          ? ((this.theta = 0), (this.phi = 0))
          : ((this.theta = Math.atan2(t, n)),
            (this.phi = Math.acos(P.clamp(e / this.radius, -1, 1)))),
        this
      )
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }
  const ko = new C()
  class Vo {
    constructor(t = new C(1 / 0, 1 / 0), e = new C(-1 / 0, -1 / 0)) {
      ;(this.min = t), (this.max = e)
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this
    }
    setFromPoints(t) {
      this.makeEmpty()
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e])
      return this
    }
    setFromCenterAndSize(t, e) {
      const n = ko.copy(e).multiplyScalar(0.5)
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this
    }
    makeEmpty() {
      return (this.min.x = this.min.y = 1 / 0), (this.max.x = this.max.y = -1 / 0), this
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y
    }
    getCenter(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Box2: .getCenter() target is now required'), (t = new C())),
        this.isEmpty() ? t.set(0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5)
      )
    }
    getSize(t) {
      return (
        void 0 === t &&
          (console.warn('THREE.Box2: .getSize() target is now required'), (t = new C())),
        this.isEmpty() ? t.set(0, 0) : t.subVectors(this.max, this.min)
      )
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this
    }
    containsPoint(t) {
      return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y
      )
    }
    getParameter(t, e) {
      return (
        void 0 === e &&
          (console.warn('THREE.Box2: .getParameter() target is now required'), (e = new C())),
        e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y)
        )
      )
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y
      )
    }
    clampPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn('THREE.Box2: .clampPoint() target is now required'), (e = new C())),
        e.copy(t).clamp(this.min, this.max)
      )
    }
    distanceToPoint(t) {
      return ko.copy(t).clamp(this.min, this.max).sub(t).length()
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max)
    }
  }
  function Wo(t) {
    Ut.call(this),
      (this.material = t),
      (this.render = function () {}),
      (this.hasPositions = !1),
      (this.hasNormals = !1),
      (this.hasColors = !1),
      (this.hasUvs = !1),
      (this.positionArray = null),
      (this.normalArray = null),
      (this.colorArray = null),
      (this.uvArray = null),
      (this.count = 0)
  }
  ;(Vo.prototype.isBox2 = !0),
    (Wo.prototype = Object.create(Ut.prototype)),
    (Wo.prototype.constructor = Wo),
    (Wo.prototype.isImmediateRenderObject = !0)
  const jo = new G(),
    qo = new mt(),
    Xo = new mt()
  function Yo(t) {
    const e = []
    t && t.isBone && e.push(t)
    for (let n = 0; n < t.children.length; n++) e.push.apply(e, Yo(t.children[n]))
    return e
  }
  const Zo = new Float32Array(1),
    Jo = (new Int32Array(Zo.buffer), Math.pow(2, 8), [0.125, 0.215, 0.35, 0.446, 0.526, 0.582]),
    Qo = 5 + Jo.length,
    Ko = new ue({ side: 1, depthWrite: !1, depthTest: !1 }),
    { _lodPlanes: $o, _sizeLods: tl, _sigmas: el } = (new Qe(new $e(), Ko), nl())
  function nl() {
    const t = [],
      e = [],
      n = []
    let i = 8
    for (let r = 0; r < Qo; r++) {
      const s = Math.pow(2, i)
      e.push(s)
      let a = 1 / s
      r > 4 ? (a = Jo[r - 8 + 4 - 1]) : 0 == r && (a = 0), n.push(a)
      const o = 1 / (s - 1),
        l = -o / 2,
        c = 1 + o / 2,
        h = [l, l, c, l, c, c, l, l, c, c, l, c],
        u = 6,
        d = 6,
        p = 3,
        f = 2,
        m = 1,
        g = new Float32Array(p * d * u),
        v = new Float32Array(f * d * u),
        y = new Float32Array(m * d * u)
      for (let t = 0; t < u; t++) {
        const e = ((t % 3) * 2) / 3 - 1,
          n = t > 2 ? 0 : -1,
          i = [
            e,
            n,
            0,
            e + 2 / 3,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n + 1,
            0,
          ]
        g.set(i, p * d * t), v.set(h, f * d * t)
        const r = [t, t, t, t, t, t]
        y.set(r, m * d * t)
      }
      const x = new Ie()
      x.setAttribute('position', new fe(g, p)),
        x.setAttribute('uv', new fe(v, f)),
        x.setAttribute('faceIndex', new fe(y, m)),
        t.push(x),
        i > 4 && i--
    }
    return { _lodPlanes: t, _sizeLods: e, _sigmas: n }
  }
  Math.sqrt(5),
    (Pa.create = function (t, e) {
      return (
        console.log('THREE.Curve.create() has been deprecated'),
        (t.prototype = Object.create(Pa.prototype)),
        (t.prototype.constructor = t),
        (t.prototype.getPoint = e),
        t
      )
    }),
    (Ja.prototype.fromPoints = function (t) {
      return (
        console.warn('THREE.Path: .fromPoints() has been renamed to .setFromPoints().'),
        this.setFromPoints(t)
      )
    }),
    (class extends ms {
      constructor(t = 10, e = 10, n = 4473924, i = 8947848) {
        ;(n = new he(n)), (i = new he(i))
        const r = e / 2,
          s = t / e,
          a = t / 2,
          o = [],
          l = []
        for (let t = 0, c = 0, h = -a; t <= e; t++, h += s) {
          o.push(-a, 0, h, a, 0, h), o.push(h, 0, -a, h, 0, a)
          const e = t === r ? n : i
          e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3),
            e.toArray(l, c),
            (c += 3)
        }
        const c = new Ie()
        c.setAttribute('position', new Me(o, 3)),
          c.setAttribute('color', new Me(l, 3)),
          super(c, new as({ vertexColors: !0, toneMapped: !1 })),
          (this.type = 'GridHelper')
      }
    }.prototype.setColors = function () {
      console.error(
        'THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.'
      )
    }),
    (class extends ms {
      constructor(t) {
        const e = Yo(t),
          n = new Ie(),
          i = [],
          r = [],
          s = new he(0, 0, 1),
          a = new he(0, 1, 0)
        for (let t = 0; t < e.length; t++) {
          const n = e[t]
          n.parent &&
            n.parent.isBone &&
            (i.push(0, 0, 0), i.push(0, 0, 0), r.push(s.r, s.g, s.b), r.push(a.r, a.g, a.b))
        }
        n.setAttribute('position', new Me(i, 3)),
          n.setAttribute('color', new Me(r, 3)),
          super(
            n,
            new as({
              vertexColors: !0,
              depthTest: !1,
              depthWrite: !1,
              toneMapped: !1,
              transparent: !0,
            })
          ),
          (this.type = 'SkeletonHelper'),
          (this.isSkeletonHelper = !0),
          (this.root = t),
          (this.bones = e),
          (this.matrix = t.matrixWorld),
          (this.matrixAutoUpdate = !1)
      }
      updateMatrixWorld(t) {
        const e = this.bones,
          n = this.geometry,
          i = n.getAttribute('position')
        Xo.copy(this.root.matrixWorld).invert()
        for (let t = 0, n = 0; t < e.length; t++) {
          const r = e[t]
          r.parent &&
            r.parent.isBone &&
            (qo.multiplyMatrices(Xo, r.matrixWorld),
            jo.setFromMatrixPosition(qo),
            i.setXYZ(n, jo.x, jo.y, jo.z),
            qo.multiplyMatrices(Xo, r.parent.matrixWorld),
            jo.setFromMatrixPosition(qo),
            i.setXYZ(n + 1, jo.x, jo.y, jo.z),
            (n += 2))
        }
        ;(n.getAttribute('position').needsUpdate = !0), super.updateMatrixWorld(t)
      }
    }.prototype.update = function () {
      console.error('THREE.SkeletonHelper: update() no longer needs to be called.')
    }),
    (wa.prototype.extractUrlBase = function (t) {
      return (
        console.warn(
          'THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.'
        ),
        (function (t) {
          const e = t.lastIndexOf('/')
          return -1 === e ? './' : t.substr(0, e + 1)
        })(t)
      )
    }),
    (wa.Handlers = {
      add: function () {
        console.error(
          'THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.'
        )
      },
      get: function () {
        console.error(
          'THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.'
        )
      },
    }),
    (Vo.prototype.center = function (t) {
      return (
        console.warn('THREE.Box2: .center() has been renamed to .getCenter().'), this.getCenter(t)
      )
    }),
    (Vo.prototype.empty = function () {
      return console.warn('THREE.Box2: .empty() has been renamed to .isEmpty().'), this.isEmpty()
    }),
    (Vo.prototype.isIntersectionBox = function (t) {
      return (
        console.warn('THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().'),
        this.intersectsBox(t)
      )
    }),
    (Vo.prototype.size = function (t) {
      return console.warn('THREE.Box2: .size() has been renamed to .getSize().'), this.getSize(t)
    }),
    (W.prototype.center = function (t) {
      return (
        console.warn('THREE.Box3: .center() has been renamed to .getCenter().'), this.getCenter(t)
      )
    }),
    (W.prototype.empty = function () {
      return console.warn('THREE.Box3: .empty() has been renamed to .isEmpty().'), this.isEmpty()
    }),
    (W.prototype.isIntersectionBox = function (t) {
      return (
        console.warn('THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().'),
        this.intersectsBox(t)
      )
    }),
    (W.prototype.isIntersectionSphere = function (t) {
      return (
        console.warn(
          'THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().'
        ),
        this.intersectsSphere(t)
      )
    }),
    (W.prototype.size = function (t) {
      return console.warn('THREE.Box3: .size() has been renamed to .getSize().'), this.getSize(t)
    }),
    (at.prototype.empty = function () {
      return console.warn('THREE.Sphere: .empty() has been renamed to .isEmpty().'), this.isEmpty()
    }),
    (fn.prototype.setFromMatrix = function (t) {
      return (
        console.warn(
          'THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix().'
        ),
        this.setFromProjectionMatrix(t)
      )
    }),
    (P.random16 = function () {
      return (
        console.warn('THREE.Math: .random16() has been deprecated. Use Math.random() instead.'),
        Math.random()
      )
    }),
    (P.nearestPowerOfTwo = function (t) {
      return (
        console.warn('THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().'),
        P.floorPowerOfTwo(t)
      )
    }),
    (P.nextPowerOfTwo = function (t) {
      return (
        console.warn('THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().'),
        P.ceilPowerOfTwo(t)
      )
    }),
    (D.prototype.flattenToArrayOffset = function (t, e) {
      return (
        console.warn(
          'THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.'
        ),
        this.toArray(t, e)
      )
    }),
    (D.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.'
        ),
        t.applyMatrix3(this)
      )
    }),
    (D.prototype.multiplyVector3Array = function () {
      console.error('THREE.Matrix3: .multiplyVector3Array() has been removed.')
    }),
    (D.prototype.applyToBufferAttribute = function (t) {
      return (
        console.warn(
          'THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead.'
        ),
        t.applyMatrix3(this)
      )
    }),
    (D.prototype.applyToVector3Array = function () {
      console.error('THREE.Matrix3: .applyToVector3Array() has been removed.')
    }),
    (D.prototype.getInverse = function (t) {
      return (
        console.warn(
          'THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead.'
        ),
        this.copy(t).invert()
      )
    }),
    (mt.prototype.extractPosition = function (t) {
      return (
        console.warn('THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().'),
        this.copyPosition(t)
      )
    }),
    (mt.prototype.flattenToArrayOffset = function (t, e) {
      return (
        console.warn(
          'THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.'
        ),
        this.toArray(t, e)
      )
    }),
    (mt.prototype.getPosition = function () {
      return (
        console.warn(
          'THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.'
        ),
        new G().setFromMatrixColumn(this, 3)
      )
    }),
    (mt.prototype.setRotationFromQuaternion = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().'
        ),
        this.makeRotationFromQuaternion(t)
      )
    }),
    (mt.prototype.multiplyToArray = function () {
      console.warn('THREE.Matrix4: .multiplyToArray() has been removed.')
    }),
    (mt.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.'
        ),
        t.applyMatrix4(this)
      )
    }),
    (mt.prototype.multiplyVector4 = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.'
        ),
        t.applyMatrix4(this)
      )
    }),
    (mt.prototype.multiplyVector3Array = function () {
      console.error('THREE.Matrix4: .multiplyVector3Array() has been removed.')
    }),
    (mt.prototype.rotateAxis = function (t) {
      console.warn(
        'THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.'
      ),
        t.transformDirection(this)
    }),
    (mt.prototype.crossVector = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.'
        ),
        t.applyMatrix4(this)
      )
    }),
    (mt.prototype.translate = function () {
      console.error('THREE.Matrix4: .translate() has been removed.')
    }),
    (mt.prototype.rotateX = function () {
      console.error('THREE.Matrix4: .rotateX() has been removed.')
    }),
    (mt.prototype.rotateY = function () {
      console.error('THREE.Matrix4: .rotateY() has been removed.')
    }),
    (mt.prototype.rotateZ = function () {
      console.error('THREE.Matrix4: .rotateZ() has been removed.')
    }),
    (mt.prototype.rotateByAxis = function () {
      console.error('THREE.Matrix4: .rotateByAxis() has been removed.')
    }),
    (mt.prototype.applyToBufferAttribute = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead.'
        ),
        t.applyMatrix4(this)
      )
    }),
    (mt.prototype.applyToVector3Array = function () {
      console.error('THREE.Matrix4: .applyToVector3Array() has been removed.')
    }),
    (mt.prototype.makeFrustum = function (t, e, n, i, r, s) {
      return (
        console.warn(
          'THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.'
        ),
        this.makePerspective(t, e, i, n, r, s)
      )
    }),
    (mt.prototype.getInverse = function (t) {
      return (
        console.warn(
          'THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead.'
        ),
        this.copy(t).invert()
      )
    }),
    (Wt.prototype.isIntersectionLine = function (t) {
      return (
        console.warn('THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().'),
        this.intersectsLine(t)
      )
    }),
    (U.prototype.multiplyVector3 = function (t) {
      return (
        console.warn(
          'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.'
        ),
        t.applyQuaternion(this)
      )
    }),
    (U.prototype.inverse = function () {
      return (
        console.warn('THREE.Quaternion: .inverse() has been renamed to invert().'), this.invert()
      )
    }),
    (ft.prototype.isIntersectionBox = function (t) {
      return (
        console.warn('THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().'),
        this.intersectsBox(t)
      )
    }),
    (ft.prototype.isIntersectionPlane = function (t) {
      return (
        console.warn('THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().'),
        this.intersectsPlane(t)
      )
    }),
    (ft.prototype.isIntersectionSphere = function (t) {
      return (
        console.warn('THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().'),
        this.intersectsSphere(t)
      )
    }),
    (ee.prototype.area = function () {
      return console.warn('THREE.Triangle: .area() has been renamed to .getArea().'), this.getArea()
    }),
    (ee.prototype.barycoordFromPoint = function (t, e) {
      return (
        console.warn('THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().'),
        this.getBarycoord(t, e)
      )
    }),
    (ee.prototype.midpoint = function (t) {
      return (
        console.warn('THREE.Triangle: .midpoint() has been renamed to .getMidpoint().'),
        this.getMidpoint(t)
      )
    }),
    (ee.prototypenormal = function (t) {
      return (
        console.warn('THREE.Triangle: .normal() has been renamed to .getNormal().'),
        this.getNormal(t)
      )
    }),
    (ee.prototype.plane = function (t) {
      return (
        console.warn('THREE.Triangle: .plane() has been renamed to .getPlane().'), this.getPlane(t)
      )
    }),
    (ee.barycoordFromPoint = function (t, e, n, i, r) {
      return (
        console.warn('THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().'),
        ee.getBarycoord(t, e, n, i, r)
      )
    }),
    (ee.normal = function (t, e, n, i) {
      return (
        console.warn('THREE.Triangle: .normal() has been renamed to .getNormal().'),
        ee.getNormal(t, e, n, i)
      )
    }),
    (Qa.prototype.extractAllPoints = function (t) {
      return (
        console.warn(
          'THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.'
        ),
        this.extractPoints(t)
      )
    }),
    (Qa.prototype.extrude = function (t) {
      return (
        console.warn('THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.'),
        new Qs(this, t)
      )
    }),
    (Qa.prototype.makeGeometry = function (t) {
      return (
        console.warn('THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.'),
        new ta(this, t)
      )
    }),
    (C.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn('THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().'),
        this.fromBufferAttribute(t, e, n)
      )
    }),
    (C.prototype.distanceToManhattan = function (t) {
      return (
        console.warn(
          'THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().'
        ),
        this.manhattanDistanceTo(t)
      )
    }),
    (C.prototype.lengthManhattan = function () {
      return (
        console.warn('THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().'),
        this.manhattanLength()
      )
    }),
    (G.prototype.setEulerFromRotationMatrix = function () {
      console.error(
        'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.'
      )
    }),
    (G.prototype.setEulerFromQuaternion = function () {
      console.error(
        'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.'
      )
    }),
    (G.prototype.getPositionFromMatrix = function (t) {
      return (
        console.warn(
          'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().'
        ),
        this.setFromMatrixPosition(t)
      )
    }),
    (G.prototype.getScaleFromMatrix = function (t) {
      return (
        console.warn(
          'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().'
        ),
        this.setFromMatrixScale(t)
      )
    }),
    (G.prototype.getColumnFromMatrix = function (t, e) {
      return (
        console.warn(
          'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().'
        ),
        this.setFromMatrixColumn(e, t)
      )
    }),
    (G.prototype.applyProjection = function (t) {
      return (
        console.warn(
          'THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.'
        ),
        this.applyMatrix4(t)
      )
    }),
    (G.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn('THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().'),
        this.fromBufferAttribute(t, e, n)
      )
    }),
    (G.prototype.distanceToManhattan = function (t) {
      return (
        console.warn(
          'THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().'
        ),
        this.manhattanDistanceTo(t)
      )
    }),
    (G.prototype.lengthManhattan = function () {
      return (
        console.warn('THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().'),
        this.manhattanLength()
      )
    }),
    (B.prototype.fromAttribute = function (t, e, n) {
      return (
        console.warn('THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().'),
        this.fromBufferAttribute(t, e, n)
      )
    }),
    (B.prototype.lengthManhattan = function () {
      return (
        console.warn('THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().'),
        this.manhattanLength()
      )
    }),
    (Ut.prototype.getChildByName = function (t) {
      return (
        console.warn('THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().'),
        this.getObjectByName(t)
      )
    }),
    (Ut.prototype.renderDepth = function () {
      console.warn('THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.')
    }),
    (Ut.prototype.translate = function (t, e) {
      return (
        console.warn(
          'THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.'
        ),
        this.translateOnAxis(e, t)
      )
    }),
    (Ut.prototype.getWorldRotation = function () {
      console.error(
        'THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.'
      )
    }),
    (Ut.prototype.applyMatrix = function (t) {
      return (
        console.warn('THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4().'),
        this.applyMatrix4(t)
      )
    }),
    Object.defineProperties(Ut.prototype, {
      eulerOrder: {
        get: function () {
          return (
            console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.'), this.rotation.order
          )
        },
        set: function (t) {
          console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.'),
            (this.rotation.order = t)
        },
      },
      useQuaternion: {
        get: function () {
          console.warn(
            'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.'
          )
        },
        set: function () {
          console.warn(
            'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.'
          )
        },
      },
    }),
    (Qe.prototype.setDrawMode = function () {
      console.error(
        'THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.'
      )
    }),
    Object.defineProperties(Qe.prototype, {
      drawMode: {
        get: function () {
          return (
            console.error(
              'THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode.'
            ),
            0
          )
        },
        set: function () {
          console.error(
            'THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.'
          )
        },
      },
    }),
    Object.defineProperties(
      class extends Ut {
        constructor() {
          super(),
            (this._currentLevel = 0),
            (this.type = 'LOD'),
            Object.defineProperties(this, {
              levels: { enumerable: !0, value: [] },
              isLOD: { value: !0 },
            }),
            (this.autoUpdate = !0)
        }
        copy(t) {
          super.copy(t, !1)
          const e = t.levels
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t]
            this.addLevel(n.object.clone(), n.distance)
          }
          return (this.autoUpdate = t.autoUpdate), this
        }
        addLevel(t, e = 0) {
          e = Math.abs(e)
          const n = this.levels
          let i
          for (i = 0; i < n.length && !(e < n[i].distance); i++);
          return n.splice(i, 0, { distance: e, object: t }), this.add(t), this
        }
        getCurrentLevel() {
          return this._currentLevel
        }
        getObjectForDistance(t) {
          const e = this.levels
          if (e.length > 0) {
            let n, i
            for (n = 1, i = e.length; n < i && !(t < e[n].distance); n++);
            return e[n - 1].object
          }
          return null
        }
        raycast(t, e) {
          if (this.levels.length > 0) {
            Vr.setFromMatrixPosition(this.matrixWorld)
            const n = t.ray.origin.distanceTo(Vr)
            this.getObjectForDistance(n).raycast(t, e)
          }
        }
        update(t) {
          const e = this.levels
          if (e.length > 1) {
            Vr.setFromMatrixPosition(t.matrixWorld), Wr.setFromMatrixPosition(this.matrixWorld)
            const n = Vr.distanceTo(Wr) / t.zoom
            let i, r
            for (e[0].object.visible = !0, i = 1, r = e.length; i < r && n >= e[i].distance; i++)
              (e[i - 1].object.visible = !1), (e[i].object.visible = !0)
            for (this._currentLevel = i - 1; i < r; i++) e[i].object.visible = !1
          }
        }
        toJSON(t) {
          const e = super.toJSON(t)
          !1 === this.autoUpdate && (e.object.autoUpdate = !1), (e.object.levels = [])
          const n = this.levels
          for (let t = 0, i = n.length; t < i; t++) {
            const i = n[t]
            e.object.levels.push({ object: i.object.uuid, distance: i.distance })
          }
          return e
        }
      }.prototype,
      {
        objects: {
          get: function () {
            return console.warn('THREE.LOD: .objects has been renamed to .levels.'), this.levels
          },
        },
      }
    ),
    Object.defineProperty(ts.prototype, 'useVertexTexture', {
      get: function () {
        console.warn('THREE.Skeleton: useVertexTexture has been removed.')
      },
      set: function () {
        console.warn('THREE.Skeleton: useVertexTexture has been removed.')
      },
    }),
    (Jr.prototype.initBones = function () {
      console.error('THREE.SkinnedMesh: initBones() has been removed.')
    }),
    Object.defineProperty(Pa.prototype, '__arcLengthDivisions', {
      get: function () {
        return (
          console.warn('THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.'),
          this.arcLengthDivisions
        )
      },
      set: function (t) {
        console.warn('THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.'),
          (this.arcLengthDivisions = t)
      },
    }),
    (an.prototype.setLens = function (t, e) {
      console.warn(
        'THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.'
      ),
        void 0 !== e && (this.filmGauge = e),
        this.setFocalLength(t)
    }),
    Object.defineProperties(Ka.prototype, {
      onlyShadow: {
        set: function () {
          console.warn('THREE.Light: .onlyShadow has been removed.')
        },
      },
      shadowCameraFov: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraFov is now .shadow.camera.fov.'),
            (this.shadow.camera.fov = t)
        },
      },
      shadowCameraLeft: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraLeft is now .shadow.camera.left.'),
            (this.shadow.camera.left = t)
        },
      },
      shadowCameraRight: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraRight is now .shadow.camera.right.'),
            (this.shadow.camera.right = t)
        },
      },
      shadowCameraTop: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraTop is now .shadow.camera.top.'),
            (this.shadow.camera.top = t)
        },
      },
      shadowCameraBottom: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.'),
            (this.shadow.camera.bottom = t)
        },
      },
      shadowCameraNear: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraNear is now .shadow.camera.near.'),
            (this.shadow.camera.near = t)
        },
      },
      shadowCameraFar: {
        set: function (t) {
          console.warn('THREE.Light: .shadowCameraFar is now .shadow.camera.far.'),
            (this.shadow.camera.far = t)
        },
      },
      shadowCameraVisible: {
        set: function () {
          console.warn(
            'THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.'
          )
        },
      },
      shadowBias: {
        set: function (t) {
          console.warn('THREE.Light: .shadowBias is now .shadow.bias.'), (this.shadow.bias = t)
        },
      },
      shadowDarkness: {
        set: function () {
          console.warn('THREE.Light: .shadowDarkness has been removed.')
        },
      },
      shadowMapWidth: {
        set: function (t) {
          console.warn('THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.'),
            (this.shadow.mapSize.width = t)
        },
      },
      shadowMapHeight: {
        set: function (t) {
          console.warn('THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.'),
            (this.shadow.mapSize.height = t)
        },
      },
    }),
    Object.defineProperties(fe.prototype, {
      length: {
        get: function () {
          return (
            console.warn('THREE.BufferAttribute: .length has been deprecated. Use .count instead.'),
            this.array.length
          )
        },
      },
      dynamic: {
        get: function () {
          return (
            console.warn(
              'THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.'
            ),
            this.usage === E
          )
        },
        set: function () {
          console.warn('THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.'),
            this.setUsage(E)
        },
      },
    }),
    (fe.prototype.setDynamic = function (t) {
      return (
        console.warn(
          'THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead.'
        ),
        this.setUsage(!0 === t ? E : S),
        this
      )
    }),
    (fe.prototype.copyIndicesArray = function () {
      console.error('THREE.BufferAttribute: .copyIndicesArray() has been removed.')
    }),
    (fe.prototype.setArray = function () {
      console.error(
        'THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers'
      )
    }),
    (Ie.prototype.addIndex = function (t) {
      console.warn('THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().'),
        this.setIndex(t)
    }),
    (Ie.prototype.addAttribute = function (t, e) {
      return (
        console.warn('THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().'),
        (e && e.isBufferAttribute) || (e && e.isInterleavedBufferAttribute)
          ? 'index' === t
            ? (console.warn(
                'THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.'
              ),
              this.setIndex(e),
              this)
            : this.setAttribute(t, e)
          : (console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).'),
            this.setAttribute(t, new fe(arguments[1], arguments[2])))
      )
    }),
    (Ie.prototype.addDrawCall = function (t, e, n) {
      void 0 !== n &&
        console.warn('THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.'),
        console.warn('THREE.BufferGeometry: .addDrawCall() is now .addGroup().'),
        this.addGroup(t, e)
    }),
    (Ie.prototype.clearDrawCalls = function () {
      console.warn('THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().'),
        this.clearGroups()
    }),
    (Ie.prototype.computeOffsets = function () {
      console.warn('THREE.BufferGeometry: .computeOffsets() has been removed.')
    }),
    (Ie.prototype.removeAttribute = function (t) {
      return (
        console.warn(
          'THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute().'
        ),
        this.deleteAttribute(t)
      )
    }),
    (Ie.prototype.applyMatrix = function (t) {
      return (
        console.warn('THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4().'),
        this.applyMatrix4(t)
      )
    }),
    Object.defineProperties(Ie.prototype, {
      drawcalls: {
        get: function () {
          return (
            console.error('THREE.BufferGeometry: .drawcalls has been renamed to .groups.'),
            this.groups
          )
        },
      },
      offsets: {
        get: function () {
          return (
            console.warn('THREE.BufferGeometry: .offsets has been renamed to .groups.'), this.groups
          )
        },
      },
    }),
    Object.defineProperties(mo.prototype, {
      maxInstancedCount: {
        get: function () {
          return (
            console.warn(
              'THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount.'
            ),
            this.instanceCount
          )
        },
        set: function (t) {
          console.warn(
            'THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount.'
          ),
            (this.instanceCount = t)
        },
      },
    }),
    Object.defineProperties(Bo.prototype, {
      linePrecision: {
        get: function () {
          return (
            console.warn(
              'THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead.'
            ),
            this.params.Line.threshold
          )
        },
        set: function (t) {
          console.warn(
            'THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead.'
          ),
            (this.params.Line.threshold = t)
        },
      },
    }),
    Object.defineProperties(Er.prototype, {
      dynamic: {
        get: function () {
          return (
            console.warn(
              'THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.'
            ),
            this.usage === E
          )
        },
        set: function (t) {
          console.warn('THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.'),
            this.setUsage(t)
        },
      },
    }),
    (Er.prototype.setDynamic = function (t) {
      return (
        console.warn(
          'THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead.'
        ),
        this.setUsage(!0 === t ? E : S),
        this
      )
    }),
    (Er.prototype.setArray = function () {
      console.error(
        'THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers'
      )
    }),
    (Qs.prototype.getArrays = function () {
      console.error('THREE.ExtrudeGeometry: .getArrays() has been removed.')
    }),
    (Qs.prototype.addShapeList = function () {
      console.error('THREE.ExtrudeGeometry: .addShapeList() has been removed.')
    }),
    (Qs.prototype.addShape = function () {
      console.error('THREE.ExtrudeGeometry: .addShape() has been removed.')
    }),
    (Sr.prototype.dispose = function () {
      console.error('THREE.Scene: .dispose() has been removed.')
    }),
    Object.defineProperties(Oo.prototype, {
      dynamic: {
        set: function () {
          console.warn(
            'THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.'
          )
        },
      },
      onUpdate: {
        value: function () {
          return (
            console.warn(
              'THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.'
            ),
            this
          )
        },
      },
    }),
    Object.defineProperties(ie.prototype, {
      wrapAround: {
        get: function () {
          console.warn('THREE.Material: .wrapAround has been removed.')
        },
        set: function () {
          console.warn('THREE.Material: .wrapAround has been removed.')
        },
      },
      overdraw: {
        get: function () {
          console.warn('THREE.Material: .overdraw has been removed.')
        },
        set: function () {
          console.warn('THREE.Material: .overdraw has been removed.')
        },
      },
      wrapRGB: {
        get: function () {
          return console.warn('THREE.Material: .wrapRGB has been removed.'), new he()
        },
      },
      shading: {
        get: function () {
          console.error(
            'THREE.' +
              this.type +
              ': .shading has been removed. Use the boolean .flatShading instead.'
          )
        },
        set: function (t) {
          console.warn(
            'THREE.' +
              this.type +
              ': .shading has been removed. Use the boolean .flatShading instead.'
          ),
            (this.flatShading = 1 === t)
        },
      },
      stencilMask: {
        get: function () {
          return (
            console.warn(
              'THREE.' +
                this.type +
                ': .stencilMask has been removed. Use .stencilFuncMask instead.'
            ),
            this.stencilFuncMask
          )
        },
        set: function (t) {
          console.warn(
            'THREE.' + this.type + ': .stencilMask has been removed. Use .stencilFuncMask instead.'
          ),
            (this.stencilFuncMask = t)
        },
      },
    }),
    Object.defineProperties(ra.prototype, {
      metal: {
        get: function () {
          return (
            console.warn(
              'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.'
            ),
            !1
          )
        },
        set: function () {
          console.warn(
            'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead'
          )
        },
      },
    }),
    Object.defineProperties(ia.prototype, {
      transparency: {
        get: function () {
          return (
            console.warn(
              'THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission.'
            ),
            this.transmission
          )
        },
        set: function (t) {
          console.warn(
            'THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission.'
          ),
            (this.transmission = t)
        },
      },
    }),
    Object.defineProperties(rn.prototype, {
      derivatives: {
        get: function () {
          return (
            console.warn(
              'THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.'
            ),
            this.extensions.derivatives
          )
        },
        set: function (t) {
          console.warn(
            'THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.'
          ),
            (this.extensions.derivatives = t)
        },
      },
    }),
    (br.prototype.clearTarget = function (t, e, n, i) {
      console.warn(
        'THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead.'
      ),
        this.setRenderTarget(t),
        this.clear(e, n, i)
    }),
    (br.prototype.animate = function (t) {
      console.warn('THREE.WebGLRenderer: .animate() is now .setAnimationLoop().'),
        this.setAnimationLoop(t)
    }),
    (br.prototype.getCurrentRenderTarget = function () {
      return (
        console.warn('THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().'),
        this.getRenderTarget()
      )
    }),
    (br.prototype.getMaxAnisotropy = function () {
      return (
        console.warn(
          'THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().'
        ),
        this.capabilities.getMaxAnisotropy()
      )
    }),
    (br.prototype.getPrecision = function () {
      return (
        console.warn('THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.'),
        this.capabilities.precision
      )
    }),
    (br.prototype.resetGLState = function () {
      return (
        console.warn('THREE.WebGLRenderer: .resetGLState() is now .state.reset().'),
        this.state.reset()
      )
    }),
    (br.prototype.supportsFloatTextures = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."
        ),
        this.extensions.get('OES_texture_float')
      )
    }),
    (br.prototype.supportsHalfFloatTextures = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."
        ),
        this.extensions.get('OES_texture_half_float')
      )
    }),
    (br.prototype.supportsStandardDerivatives = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."
        ),
        this.extensions.get('OES_standard_derivatives')
      )
    }),
    (br.prototype.supportsCompressedTextureS3TC = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."
        ),
        this.extensions.get('WEBGL_compressed_texture_s3tc')
      )
    }),
    (br.prototype.supportsCompressedTexturePVRTC = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."
        ),
        this.extensions.get('WEBGL_compressed_texture_pvrtc')
      )
    }),
    (br.prototype.supportsBlendMinMax = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."
        ),
        this.extensions.get('EXT_blend_minmax')
      )
    }),
    (br.prototype.supportsVertexTextures = function () {
      return (
        console.warn(
          'THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.'
        ),
        this.capabilities.vertexTextures
      )
    }),
    (br.prototype.supportsInstancedArrays = function () {
      return (
        console.warn(
          "THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."
        ),
        this.extensions.get('ANGLE_instanced_arrays')
      )
    }),
    (br.prototype.enableScissorTest = function (t) {
      console.warn('THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().'),
        this.setScissorTest(t)
    }),
    (br.prototype.initMaterial = function () {
      console.warn('THREE.WebGLRenderer: .initMaterial() has been removed.')
    }),
    (br.prototype.addPrePlugin = function () {
      console.warn('THREE.WebGLRenderer: .addPrePlugin() has been removed.')
    }),
    (br.prototype.addPostPlugin = function () {
      console.warn('THREE.WebGLRenderer: .addPostPlugin() has been removed.')
    }),
    (br.prototype.updateShadowMap = function () {
      console.warn('THREE.WebGLRenderer: .updateShadowMap() has been removed.')
    }),
    (br.prototype.setFaceCulling = function () {
      console.warn('THREE.WebGLRenderer: .setFaceCulling() has been removed.')
    }),
    (br.prototype.allocTextureUnit = function () {
      console.warn('THREE.WebGLRenderer: .allocTextureUnit() has been removed.')
    }),
    (br.prototype.setTexture = function () {
      console.warn('THREE.WebGLRenderer: .setTexture() has been removed.')
    }),
    (br.prototype.setTexture2D = function () {
      console.warn('THREE.WebGLRenderer: .setTexture2D() has been removed.')
    }),
    (br.prototype.setTextureCube = function () {
      console.warn('THREE.WebGLRenderer: .setTextureCube() has been removed.')
    }),
    (br.prototype.getActiveMipMapLevel = function () {
      return (
        console.warn(
          'THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel().'
        ),
        this.getActiveMipmapLevel()
      )
    }),
    Object.defineProperties(br.prototype, {
      shadowMapEnabled: {
        get: function () {
          return this.shadowMap.enabled
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.'),
            (this.shadowMap.enabled = t)
        },
      },
      shadowMapType: {
        get: function () {
          return this.shadowMap.type
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.'),
            (this.shadowMap.type = t)
        },
      },
      shadowMapCullFace: {
        get: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.'
          )
        },
        set: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.'
          )
        },
      },
      context: {
        get: function () {
          return (
            console.warn(
              'THREE.WebGLRenderer: .context has been removed. Use .getContext() instead.'
            ),
            this.getContext()
          )
        },
      },
      vr: {
        get: function () {
          return console.warn('THREE.WebGLRenderer: .vr has been renamed to .xr'), this.xr
        },
      },
      gammaInput: {
        get: function () {
          return (
            console.warn(
              'THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.'
            ),
            !1
          )
        },
        set: function () {
          console.warn(
            'THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.'
          )
        },
      },
      gammaOutput: {
        get: function () {
          return (
            console.warn(
              'THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead.'
            ),
            !1
          )
        },
        set: function (t) {
          console.warn(
            'THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead.'
          ),
            (this.outputEncoding = !0 === t ? 3001 : w)
        },
      },
      toneMappingWhitePoint: {
        get: function () {
          return console.warn('THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.'), 1
        },
        set: function () {
          console.warn('THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.')
        },
      },
    }),
    Object.defineProperties(dr.prototype, {
      cullFace: {
        get: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.'
          )
        },
        set: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.'
          )
        },
      },
      renderReverseSided: {
        get: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.'
          )
        },
        set: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.'
          )
        },
      },
      renderSingleSided: {
        get: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.'
          )
        },
        set: function () {
          console.warn(
            'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.'
          )
        },
      },
    }),
    Object.defineProperties(F.prototype, {
      wrapS: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.'),
            this.texture.wrapS
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.'),
            (this.texture.wrapS = t)
        },
      },
      wrapT: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.'),
            this.texture.wrapT
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.'),
            (this.texture.wrapT = t)
        },
      },
      magFilter: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.'),
            this.texture.magFilter
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.'),
            (this.texture.magFilter = t)
        },
      },
      minFilter: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.'),
            this.texture.minFilter
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.'),
            (this.texture.minFilter = t)
        },
      },
      anisotropy: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.'),
            this.texture.anisotropy
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.'),
            (this.texture.anisotropy = t)
        },
      },
      offset: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.'),
            this.texture.offset
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.'),
            (this.texture.offset = t)
        },
      },
      repeat: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.'),
            this.texture.repeat
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.'),
            (this.texture.repeat = t)
        },
      },
      format: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.'),
            this.texture.format
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.'),
            (this.texture.format = t)
        },
      },
      type: {
        get: function () {
          return (
            console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.'), this.texture.type
          )
        },
        set: function (t) {
          console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.'),
            (this.texture.type = t)
        },
      },
      generateMipmaps: {
        get: function () {
          return (
            console.warn(
              'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.'
            ),
            this.texture.generateMipmaps
          )
        },
        set: function (t) {
          console.warn(
            'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.'
          ),
            (this.texture.generateMipmaps = t)
        },
      },
    }),
    Object.defineProperties(
      class extends Ut {
        constructor(t) {
          super(),
            (this.type = 'Audio'),
            (this.listener = t),
            (this.context = t.context),
            (this.gain = this.context.createGain()),
            this.gain.connect(t.getInput()),
            (this.autoplay = !1),
            (this.buffer = null),
            (this.detune = 0),
            (this.loop = !1),
            (this.loopStart = 0),
            (this.loopEnd = 0),
            (this.offset = 0),
            (this.duration = void 0),
            (this.playbackRate = 1),
            (this.isPlaying = !1),
            (this.hasPlaybackControl = !0),
            (this.source = null),
            (this.sourceType = 'empty'),
            (this._startedAt = 0),
            (this._progress = 0),
            (this._connected = !1),
            (this.filters = [])
        }
        getOutput() {
          return this.gain
        }
        setNodeSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = 'audioNode'),
            (this.source = t),
            this.connect(),
            this
          )
        }
        setMediaElementSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = 'mediaNode'),
            (this.source = this.context.createMediaElementSource(t)),
            this.connect(),
            this
          )
        }
        setMediaStreamSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = 'mediaStreamNode'),
            (this.source = this.context.createMediaStreamSource(t)),
            this.connect(),
            this
          )
        }
        setBuffer(t) {
          return (this.buffer = t), (this.sourceType = 'buffer'), this.autoplay && this.play(), this
        }
        play(t = 0) {
          if (!0 === this.isPlaying)
            return void console.warn('THREE.Audio: Audio is already playing.')
          if (!1 === this.hasPlaybackControl)
            return void console.warn('THREE.Audio: this Audio has no playback control.')
          this._startedAt = this.context.currentTime + t
          const e = this.context.createBufferSource()
          return (
            (e.buffer = this.buffer),
            (e.loop = this.loop),
            (e.loopStart = this.loopStart),
            (e.loopEnd = this.loopEnd),
            (e.onended = this.onEnded.bind(this)),
            e.start(this._startedAt, this._progress + this.offset, this.duration),
            (this.isPlaying = !0),
            (this.source = e),
            this.setDetune(this.detune),
            this.setPlaybackRate(this.playbackRate),
            this.connect()
          )
        }
        pause() {
          if (!1 !== this.hasPlaybackControl)
            return (
              !0 === this.isPlaying &&
                ((this._progress +=
                  Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate),
                !0 === this.loop &&
                  (this._progress = this._progress % (this.duration || this.buffer.duration)),
                this.source.stop(),
                (this.source.onended = null),
                (this.isPlaying = !1)),
              this
            )
          console.warn('THREE.Audio: this Audio has no playback control.')
        }
        stop() {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this._progress = 0),
              this.source.stop(),
              (this.source.onended = null),
              (this.isPlaying = !1),
              this
            )
          console.warn('THREE.Audio: this Audio has no playback control.')
        }
        connect() {
          if (this.filters.length > 0) {
            this.source.connect(this.filters[0])
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].connect(this.filters[t])
            this.filters[this.filters.length - 1].connect(this.getOutput())
          } else this.source.connect(this.getOutput())
          return (this._connected = !0), this
        }
        disconnect() {
          if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0])
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].disconnect(this.filters[t])
            this.filters[this.filters.length - 1].disconnect(this.getOutput())
          } else this.source.disconnect(this.getOutput())
          return (this._connected = !1), this
        }
        getFilters() {
          return this.filters
        }
        setFilters(t) {
          return (
            t || (t = []),
            !0 === this._connected
              ? (this.disconnect(), (this.filters = t.slice()), this.connect())
              : (this.filters = t.slice()),
            this
          )
        }
        setDetune(t) {
          if (((this.detune = t), void 0 !== this.source.detune))
            return (
              !0 === this.isPlaying &&
                this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, 0.01),
              this
            )
        }
        getDetune() {
          return this.detune
        }
        getFilter() {
          return this.getFilters()[0]
        }
        setFilter(t) {
          return this.setFilters(t ? [t] : [])
        }
        setPlaybackRate(t) {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this.playbackRate = t),
              !0 === this.isPlaying &&
                this.source.playbackRate.setTargetAtTime(
                  this.playbackRate,
                  this.context.currentTime,
                  0.01
                ),
              this
            )
          console.warn('THREE.Audio: this Audio has no playback control.')
        }
        getPlaybackRate() {
          return this.playbackRate
        }
        onEnded() {
          this.isPlaying = !1
        }
        getLoop() {
          return !1 === this.hasPlaybackControl
            ? (console.warn('THREE.Audio: this Audio has no playback control.'), !1)
            : this.loop
        }
        setLoop(t) {
          if (!1 !== this.hasPlaybackControl)
            return (this.loop = t), !0 === this.isPlaying && (this.source.loop = this.loop), this
          console.warn('THREE.Audio: this Audio has no playback control.')
        }
        setLoopStart(t) {
          return (this.loopStart = t), this
        }
        setLoopEnd(t) {
          return (this.loopEnd = t), this
        }
        getVolume() {
          return this.gain.gain.value
        }
        setVolume(t) {
          return this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01), this
        }
      }.prototype,
      {
        load: {
          value: function (t) {
            console.warn('THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.')
            const e = this
            return (
              new xo().load(t, function (t) {
                e.setBuffer(t)
              }),
              this
            )
          },
        },
        startTime: {
          set: function () {
            console.warn('THREE.Audio: .startTime is now .play( delay ).')
          },
        },
      }
    ),
    (ln.prototype.updateCubeMap = function (t, e) {
      return console.warn('THREE.CubeCamera: .updateCubeMap() is now .update().'), this.update(t, e)
    }),
    (ln.prototype.clear = function (t, e, n, i) {
      return (
        console.warn('THREE.CubeCamera: .clear() is now .renderTarget.clear().'),
        this.renderTarget.clear(t, e, n, i)
      )
    }),
    (N.crossOrigin = void 0),
    (N.loadTexture = function (t, e, n, i) {
      console.warn(
        'THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.'
      )
      const r = new Ra()
      r.setCrossOrigin(this.crossOrigin)
      const s = r.load(t, n, void 0, i)
      return e && (s.mapping = e), s
    }),
    (N.loadTextureCube = function (t, e, n, i) {
      console.warn(
        'THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.'
      )
      const r = new La()
      r.setCrossOrigin(this.crossOrigin)
      const s = r.load(t, n, void 0, i)
      return e && (s.mapping = e), s
    }),
    (N.loadCompressedTexture = function () {
      console.error(
        'THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.'
      )
    }),
    (N.loadCompressedTextureCube = function () {
      console.error(
        'THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.'
      )
    }),
    'undefined' != typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('register', { detail: { revision: '126' } })
      ),
    'undefined' != typeof window &&
      (window.__THREE__
        ? console.warn('WARNING: Multiple instances of Three.js being imported.')
        : (window.__THREE__ = '126'))
  var il = function (t, e) {
    var n, i, r, s, a, o
    void 0 === e &&
      console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
      e === document &&
        console.error(
          'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
        ),
      (this.object = t),
      (this.domElement = e),
      (this.enabled = !0),
      (this.target = new G()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
      (this.mouseButtons = { LEFT: 0, MIDDLE: 1, RIGHT: 2 }),
      (this.touches = { ONE: 0, TWO: 2 }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._domElementKeyEvents = null),
      (this.getPolarAngle = function () {
        return m.phi
      }),
      (this.getAzimuthalAngle = function () {
        return m.theta
      }),
      (this.listenToKeyEvents = function (t) {
        t.addEventListener('keydown', $), (this._domElementKeyEvents = t)
      }),
      (this.saveState = function () {
        l.target0.copy(l.target), l.position0.copy(l.object.position), (l.zoom0 = l.object.zoom)
      }),
      (this.reset = function () {
        l.target.copy(l.target0),
          l.object.position.copy(l.position0),
          (l.object.zoom = l.zoom0),
          l.object.updateProjectionMatrix(),
          l.dispatchEvent(c),
          l.update(),
          (p = d.NONE)
      }),
      (this.update =
        ((n = new G()),
        (i = new U().setFromUnitVectors(t.up, new G(0, 1, 0))),
        (r = i.clone().invert()),
        (s = new G()),
        (a = new U()),
        (o = 2 * Math.PI),
        function () {
          var t = l.object.position
          n.copy(t).sub(l.target),
            n.applyQuaternion(i),
            m.setFromVector3(n),
            l.autoRotate && p === d.NONE && P(((2 * Math.PI) / 60 / 60) * l.autoRotateSpeed),
            l.enableDamping
              ? ((m.theta += g.theta * l.dampingFactor), (m.phi += g.phi * l.dampingFactor))
              : ((m.theta += g.theta), (m.phi += g.phi))
          var e = l.minAzimuthAngle,
            h = l.maxAzimuthAngle
          return (
            isFinite(e) &&
              isFinite(h) &&
              (e < -Math.PI ? (e += o) : e > Math.PI && (e -= o),
              h < -Math.PI ? (h += o) : h > Math.PI && (h -= o),
              (m.theta =
                e <= h
                  ? Math.max(e, Math.min(h, m.theta))
                  : m.theta > (e + h) / 2
                  ? Math.max(e, m.theta)
                  : Math.min(h, m.theta))),
            (m.phi = Math.max(l.minPolarAngle, Math.min(l.maxPolarAngle, m.phi))),
            m.makeSafe(),
            (m.radius *= v),
            (m.radius = Math.max(l.minDistance, Math.min(l.maxDistance, m.radius))),
            !0 === l.enableDamping ? l.target.addScaledVector(y, l.dampingFactor) : l.target.add(y),
            n.setFromSpherical(m),
            n.applyQuaternion(r),
            t.copy(l.target).add(n),
            l.object.lookAt(l.target),
            !0 === l.enableDamping
              ? ((g.theta *= 1 - l.dampingFactor),
                (g.phi *= 1 - l.dampingFactor),
                y.multiplyScalar(1 - l.dampingFactor))
              : (g.set(0, 0, 0), y.set(0, 0, 0)),
            (v = 1),
            !!(
              x ||
              s.distanceToSquared(l.object.position) > f ||
              8 * (1 - a.dot(l.object.quaternion)) > f
            ) &&
              (l.dispatchEvent(c),
              s.copy(l.object.position),
              a.copy(l.object.quaternion),
              (x = !1),
              !0)
          )
        })),
      (this.dispose = function () {
        l.domElement.removeEventListener('contextmenu', it),
          l.domElement.removeEventListener('pointerdown', Z),
          l.domElement.removeEventListener('wheel', K),
          l.domElement.removeEventListener('touchstart', tt),
          l.domElement.removeEventListener('touchend', nt),
          l.domElement.removeEventListener('touchmove', et),
          l.domElement.ownerDocument.removeEventListener('pointermove', J),
          l.domElement.ownerDocument.removeEventListener('pointerup', Q),
          null !== l._domElementKeyEvents &&
            l._domElementKeyEvents.removeEventListener('keydown', $)
      })
    var l = this,
      c = { type: 'change' },
      h = { type: 'start' },
      u = { type: 'end' },
      d = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      },
      p = d.NONE,
      f = 1e-6,
      m = new Go(),
      g = new Go(),
      v = 1,
      y = new G(),
      x = !1,
      _ = new C(),
      b = new C(),
      w = new C(),
      M = new C(),
      S = new C(),
      E = new C(),
      T = new C(),
      L = new C(),
      A = new C()
    function R() {
      return Math.pow(0.95, l.zoomSpeed)
    }
    function P(t) {
      g.theta -= t
    }
    function D(t) {
      g.phi -= t
    }
    var I,
      N =
        ((I = new G()),
        function (t, e) {
          I.setFromMatrixColumn(e, 0), I.multiplyScalar(-t), y.add(I)
        }),
      O = (function () {
        var t = new G()
        return function (e, n) {
          !0 === l.screenSpacePanning
            ? t.setFromMatrixColumn(n, 1)
            : (t.setFromMatrixColumn(n, 0), t.crossVectors(l.object.up, t)),
            t.multiplyScalar(e),
            y.add(t)
        }
      })(),
      z = (function () {
        var t = new G()
        return function (e, n) {
          var i = l.domElement
          if (l.object.isPerspectiveCamera) {
            var r = l.object.position
            t.copy(r).sub(l.target)
            var s = t.length()
            ;(s *= Math.tan(((l.object.fov / 2) * Math.PI) / 180)),
              N((2 * e * s) / i.clientHeight, l.object.matrix),
              O((2 * n * s) / i.clientHeight, l.object.matrix)
          } else
            l.object.isOrthographicCamera
              ? (N(
                  (e * (l.object.right - l.object.left)) / l.object.zoom / i.clientWidth,
                  l.object.matrix
                ),
                O(
                  (n * (l.object.top - l.object.bottom)) / l.object.zoom / i.clientHeight,
                  l.object.matrix
                ))
              : (console.warn(
                  'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.'
                ),
                (l.enablePan = !1))
        }
      })()
    function H(t) {
      l.object.isPerspectiveCamera
        ? (v /= t)
        : l.object.isOrthographicCamera
        ? ((l.object.zoom = Math.max(l.minZoom, Math.min(l.maxZoom, l.object.zoom * t))),
          l.object.updateProjectionMatrix(),
          (x = !0))
        : (console.warn(
            'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
          ),
          (l.enableZoom = !1))
    }
    function B(t) {
      l.object.isPerspectiveCamera
        ? (v *= t)
        : l.object.isOrthographicCamera
        ? ((l.object.zoom = Math.max(l.minZoom, Math.min(l.maxZoom, l.object.zoom / t))),
          l.object.updateProjectionMatrix(),
          (x = !0))
        : (console.warn(
            'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
          ),
          (l.enableZoom = !1))
    }
    function F(t) {
      _.set(t.clientX, t.clientY)
    }
    function k(t) {
      M.set(t.clientX, t.clientY)
    }
    function V(t) {
      if (1 == t.touches.length) _.set(t.touches[0].pageX, t.touches[0].pageY)
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY)
        _.set(e, n)
      }
    }
    function W(t) {
      if (1 == t.touches.length) M.set(t.touches[0].pageX, t.touches[0].pageY)
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY)
        M.set(e, n)
      }
    }
    function j(t) {
      var e = t.touches[0].pageX - t.touches[1].pageX,
        n = t.touches[0].pageY - t.touches[1].pageY,
        i = Math.sqrt(e * e + n * n)
      T.set(0, i)
    }
    function q(t) {
      if (1 == t.touches.length) b.set(t.touches[0].pageX, t.touches[0].pageY)
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY)
        b.set(e, n)
      }
      w.subVectors(b, _).multiplyScalar(l.rotateSpeed)
      var i = l.domElement
      P((2 * Math.PI * w.x) / i.clientHeight), D((2 * Math.PI * w.y) / i.clientHeight), _.copy(b)
    }
    function X(t) {
      if (1 == t.touches.length) S.set(t.touches[0].pageX, t.touches[0].pageY)
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY)
        S.set(e, n)
      }
      E.subVectors(S, M).multiplyScalar(l.panSpeed), z(E.x, E.y), M.copy(S)
    }
    function Y(t) {
      var e = t.touches[0].pageX - t.touches[1].pageX,
        n = t.touches[0].pageY - t.touches[1].pageY,
        i = Math.sqrt(e * e + n * n)
      L.set(0, i), A.set(0, Math.pow(L.y / T.y, l.zoomSpeed)), H(A.y), T.copy(L)
    }
    function Z(t) {
      if (!1 !== l.enabled)
        switch (t.pointerType) {
          case 'mouse':
          case 'pen':
            !(function (t) {
              var e
              switch (
                (t.preventDefault(),
                l.domElement.focus ? l.domElement.focus() : window.focus(),
                t.button)
              ) {
                case 0:
                  e = l.mouseButtons.LEFT
                  break
                case 1:
                  e = l.mouseButtons.MIDDLE
                  break
                case 2:
                  e = l.mouseButtons.RIGHT
                  break
                default:
                  e = -1
              }
              switch (e) {
                case 1:
                  if (!1 === l.enableZoom) return
                  !(function (t) {
                    T.set(t.clientX, t.clientY)
                  })(t),
                    (p = d.DOLLY)
                  break
                case 0:
                  if (t.ctrlKey || t.metaKey || t.shiftKey) {
                    if (!1 === l.enablePan) return
                    k(t), (p = d.PAN)
                  } else {
                    if (!1 === l.enableRotate) return
                    F(t), (p = d.ROTATE)
                  }
                  break
                case 2:
                  if (t.ctrlKey || t.metaKey || t.shiftKey) {
                    if (!1 === l.enableRotate) return
                    F(t), (p = d.ROTATE)
                  } else {
                    if (!1 === l.enablePan) return
                    k(t), (p = d.PAN)
                  }
                  break
                default:
                  p = d.NONE
              }
              p !== d.NONE &&
                (l.domElement.ownerDocument.addEventListener('pointermove', J),
                l.domElement.ownerDocument.addEventListener('pointerup', Q),
                l.dispatchEvent(h))
            })(t)
        }
    }
    function J(t) {
      if (!1 !== l.enabled)
        switch (t.pointerType) {
          case 'mouse':
          case 'pen':
            !(function (t) {
              if (!1 !== l.enabled)
                switch ((t.preventDefault(), p)) {
                  case d.ROTATE:
                    if (!1 === l.enableRotate) return
                    !(function (t) {
                      b.set(t.clientX, t.clientY), w.subVectors(b, _).multiplyScalar(l.rotateSpeed)
                      var e = l.domElement
                      P((2 * Math.PI * w.x) / e.clientHeight),
                        D((2 * Math.PI * w.y) / e.clientHeight),
                        _.copy(b),
                        l.update()
                    })(t)
                    break
                  case d.DOLLY:
                    if (!1 === l.enableZoom) return
                    !(function (t) {
                      L.set(t.clientX, t.clientY),
                        A.subVectors(L, T),
                        A.y > 0 ? H(R()) : A.y < 0 && B(R()),
                        T.copy(L),
                        l.update()
                    })(t)
                    break
                  case d.PAN:
                    if (!1 === l.enablePan) return
                    !(function (t) {
                      S.set(t.clientX, t.clientY),
                        E.subVectors(S, M).multiplyScalar(l.panSpeed),
                        z(E.x, E.y),
                        M.copy(S),
                        l.update()
                    })(t)
                }
            })(t)
        }
    }
    function Q(t) {
      switch (t.pointerType) {
        case 'mouse':
        case 'pen':
          l.domElement.ownerDocument.removeEventListener('pointermove', J),
            l.domElement.ownerDocument.removeEventListener('pointerup', Q),
            !1 !== l.enabled && (l.dispatchEvent(u), (p = d.NONE))
      }
    }
    function K(t) {
      !1 === l.enabled ||
        !1 === l.enableZoom ||
        (p !== d.NONE && p !== d.ROTATE) ||
        (t.preventDefault(),
        t.stopPropagation(),
        l.dispatchEvent(h),
        (function (t) {
          t.deltaY < 0 ? B(R()) : t.deltaY > 0 && H(R()), l.update()
        })(t),
        l.dispatchEvent(u))
    }
    function $(t) {
      !1 !== l.enabled &&
        !1 !== l.enablePan &&
        (function (t) {
          var e = !1
          switch (t.keyCode) {
            case l.keys.UP:
              z(0, l.keyPanSpeed), (e = !0)
              break
            case l.keys.BOTTOM:
              z(0, -l.keyPanSpeed), (e = !0)
              break
            case l.keys.LEFT:
              z(l.keyPanSpeed, 0), (e = !0)
              break
            case l.keys.RIGHT:
              z(-l.keyPanSpeed, 0), (e = !0)
          }
          e && (t.preventDefault(), l.update())
        })(t)
    }
    function tt(t) {
      if (!1 !== l.enabled) {
        switch ((t.preventDefault(), t.touches.length)) {
          case 1:
            switch (l.touches.ONE) {
              case 0:
                if (!1 === l.enableRotate) return
                V(t), (p = d.TOUCH_ROTATE)
                break
              case 1:
                if (!1 === l.enablePan) return
                W(t), (p = d.TOUCH_PAN)
                break
              default:
                p = d.NONE
            }
            break
          case 2:
            switch (l.touches.TWO) {
              case 2:
                if (!1 === l.enableZoom && !1 === l.enablePan) return
                !(function (t) {
                  l.enableZoom && j(t), l.enablePan && W(t)
                })(t),
                  (p = d.TOUCH_DOLLY_PAN)
                break
              case 3:
                if (!1 === l.enableZoom && !1 === l.enableRotate) return
                !(function (t) {
                  l.enableZoom && j(t), l.enableRotate && V(t)
                })(t),
                  (p = d.TOUCH_DOLLY_ROTATE)
                break
              default:
                p = d.NONE
            }
            break
          default:
            p = d.NONE
        }
        p !== d.NONE && l.dispatchEvent(h)
      }
    }
    function et(t) {
      if (!1 !== l.enabled)
        switch ((t.preventDefault(), t.stopPropagation(), p)) {
          case d.TOUCH_ROTATE:
            if (!1 === l.enableRotate) return
            q(t), l.update()
            break
          case d.TOUCH_PAN:
            if (!1 === l.enablePan) return
            X(t), l.update()
            break
          case d.TOUCH_DOLLY_PAN:
            if (!1 === l.enableZoom && !1 === l.enablePan) return
            !(function (t) {
              l.enableZoom && Y(t), l.enablePan && X(t)
            })(t),
              l.update()
            break
          case d.TOUCH_DOLLY_ROTATE:
            if (!1 === l.enableZoom && !1 === l.enableRotate) return
            !(function (t) {
              l.enableZoom && Y(t), l.enableRotate && q(t)
            })(t),
              l.update()
            break
          default:
            p = d.NONE
        }
    }
    function nt(t) {
      !1 !== l.enabled && (l.dispatchEvent(u), (p = d.NONE))
    }
    function it(t) {
      !1 !== l.enabled && t.preventDefault()
    }
    l.domElement.addEventListener('contextmenu', it),
      l.domElement.addEventListener('pointerdown', Z),
      l.domElement.addEventListener('wheel', K),
      l.domElement.addEventListener('touchstart', tt),
      l.domElement.addEventListener('touchend', nt),
      l.domElement.addEventListener('touchmove', et),
      this.update()
  }
  ;(il.prototype = Object.create(L.prototype)).constructor = il
  var rl,
    sl,
    al,
    ol = function (t, e) {
      il.call(this, t, e),
        (this.screenSpacePanning = !1),
        (this.mouseButtons.LEFT = 2),
        (this.mouseButtons.RIGHT = 0),
        (this.touches.ONE = 1),
        (this.touches.TWO = 3)
    }
  function ll() {
    ;(this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1)
  }
  ;((ol.prototype = Object.create(L.prototype)).constructor = ol),
    Object.assign(ll.prototype, {
      setSize: function () {},
      render: function () {
        console.error('THREE.Pass: .render() must be implemented in derived pass.')
      },
    }),
    (ll.FullScreenQuad =
      ((rl = new lo(-1, 1, 1, -1, 0, 1)),
      (sl = new vn(2, 2)),
      (al = function (t) {
        this._mesh = new Qe(sl, t)
      }),
      Object.defineProperty(al.prototype, 'material', {
        get: function () {
          return this._mesh.material
        },
        set: function (t) {
          this._mesh.material = t
        },
      }),
      Object.assign(al.prototype, {
        dispose: function () {
          this._mesh.geometry.dispose()
        },
        render: function (t) {
          t.render(this._mesh, rl)
        },
      }),
      al))
  var cl = {
      uniforms: {
        tDiffuse: { value: null },
        tSize: { value: new C(256, 256) },
        center: { value: new C(0.5, 0.5) },
        angle: { value: 1.57 },
        scale: { value: 1 },
      },
      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        '\tvUv = uv;',
        '\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
      ].join('\n'),
      fragmentShader: [
        'uniform vec2 center;',
        'uniform float angle;',
        'uniform float scale;',
        'uniform vec2 tSize;',
        'uniform sampler2D tDiffuse;',
        'varying vec2 vUv;',
        'float pattern() {',
        '\tfloat s = sin( angle ), c = cos( angle );',
        '\tvec2 tex = vUv * tSize - center;',
        '\tvec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;',
        '\treturn ( sin( point.x ) * sin( point.y ) ) * 4.0;',
        '}',
        'void main() {',
        '\tvec4 color = texture2D( tDiffuse, vUv );',
        '\tfloat average = ( color.r + color.g + color.b ) / 3.0;',
        '\tgl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );',
        '}',
      ].join('\n'),
    },
    hl = function (t, e, n) {
      ll.call(this), void 0 === cl && console.error('THREE.DotScreenPass relies on DotScreenShader')
      var i = cl
      ;(this.uniforms = nn.clone(i.uniforms)),
        void 0 !== t && this.uniforms.center.value.copy(t),
        void 0 !== e && (this.uniforms.angle.value = e),
        void 0 !== n && (this.uniforms.scale.value = n),
        (this.material = new rn({
          uniforms: this.uniforms,
          vertexShader: i.vertexShader,
          fragmentShader: i.fragmentShader,
        })),
        (this.fsQuad = new ll.FullScreenQuad(this.material))
    }
  hl.prototype = Object.assign(Object.create(ll.prototype), {
    constructor: hl,
    render: function (t, e, n) {
      ;(this.uniforms.tDiffuse.value = n.texture),
        this.uniforms.tSize.value.set(n.width, n.height),
        this.renderToScreen
          ? (t.setRenderTarget(null), this.fsQuad.render(t))
          : (t.setRenderTarget(e), this.clear && t.clear(), this.fsQuad.render(t))
    },
  })
  var ul = {
      uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        '\tvUv = uv;',
        '\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
      ].join('\n'),
      fragmentShader: [
        'uniform float opacity;',
        'uniform sampler2D tDiffuse;',
        'varying vec2 vUv;',
        'void main() {',
        '\tvec4 texel = texture2D( tDiffuse, vUv );',
        '\tgl_FragColor = opacity * texel;',
        '}',
      ].join('\n'),
    },
    dl = function (t, e) {
      ll.call(this),
        (this.textureID = void 0 !== e ? e : 'tDiffuse'),
        t instanceof rn
          ? ((this.uniforms = t.uniforms), (this.material = t))
          : t &&
            ((this.uniforms = nn.clone(t.uniforms)),
            (this.material = new rn({
              defines: Object.assign({}, t.defines),
              uniforms: this.uniforms,
              vertexShader: t.vertexShader,
              fragmentShader: t.fragmentShader,
            }))),
        (this.fsQuad = new ll.FullScreenQuad(this.material))
    }
  dl.prototype = Object.assign(Object.create(ll.prototype), {
    constructor: dl,
    render: function (t, e, n) {
      this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture),
        (this.fsQuad.material = this.material),
        this.renderToScreen
          ? (t.setRenderTarget(null), this.fsQuad.render(t))
          : (t.setRenderTarget(e),
            this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
            this.fsQuad.render(t))
    },
  })
  var pl = function (t, e) {
    ll.call(this),
      (this.scene = t),
      (this.camera = e),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1)
  }
  pl.prototype = Object.assign(Object.create(ll.prototype), {
    constructor: pl,
    render: function (t, e, n) {
      var i,
        r,
        s = t.getContext(),
        a = t.state
      a.buffers.color.setMask(!1),
        a.buffers.depth.setMask(!1),
        a.buffers.color.setLocked(!0),
        a.buffers.depth.setLocked(!0),
        this.inverse ? ((i = 0), (r = 1)) : ((i = 1), (r = 0)),
        a.buffers.stencil.setTest(!0),
        a.buffers.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE),
        a.buffers.stencil.setFunc(s.ALWAYS, i, 4294967295),
        a.buffers.stencil.setClear(r),
        a.buffers.stencil.setLocked(!0),
        t.setRenderTarget(n),
        this.clear && t.clear(),
        t.render(this.scene, this.camera),
        t.setRenderTarget(e),
        this.clear && t.clear(),
        t.render(this.scene, this.camera),
        a.buffers.color.setLocked(!1),
        a.buffers.depth.setLocked(!1),
        a.buffers.stencil.setLocked(!1),
        a.buffers.stencil.setFunc(s.EQUAL, 1, 4294967295),
        a.buffers.stencil.setOp(s.KEEP, s.KEEP, s.KEEP),
        a.buffers.stencil.setLocked(!0)
    },
  })
  var fl = function () {
    ll.call(this), (this.needsSwap = !1)
  }
  ;(fl.prototype = Object.create(ll.prototype)),
    Object.assign(fl.prototype, {
      render: function (t) {
        t.state.buffers.stencil.setLocked(!1), t.state.buffers.stencil.setTest(!1)
      },
    })
  var ml = function (t, e) {
    if (((this.renderer = t), void 0 === e)) {
      var n = { minFilter: s, magFilter: s, format: p },
        i = t.getSize(new C())
      ;(this._pixelRatio = t.getPixelRatio()),
        (this._width = i.width),
        (this._height = i.height),
        ((e = new F(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          n
        )).texture.name = 'EffectComposer.rt1')
    } else (this._pixelRatio = 1), (this._width = e.width), (this._height = e.height)
    ;(this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.renderTarget2.texture.name = 'EffectComposer.rt2'),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      void 0 === ul && console.error('THREE.EffectComposer relies on CopyShader'),
      void 0 === dl && console.error('THREE.EffectComposer relies on ShaderPass'),
      (this.copyPass = new dl(ul)),
      (this.clock = new _o())
  }
  Object.assign(ml.prototype, {
    swapBuffers: function () {
      var t = this.readBuffer
      ;(this.readBuffer = this.writeBuffer), (this.writeBuffer = t)
    },
    addPass: function (t) {
      this.passes.push(t),
        t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    },
    insertPass: function (t, e) {
      this.passes.splice(e, 0, t),
        t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    },
    removePass: function (t) {
      const e = this.passes.indexOf(t)
      ;-1 !== e && this.passes.splice(e, 1)
    },
    isLastEnabledPass: function (t) {
      for (var e = t + 1; e < this.passes.length; e++) if (this.passes[e].enabled) return !1
      return !0
    },
    render: function (t) {
      void 0 === t && (t = this.clock.getDelta())
      var e,
        n,
        i = this.renderer.getRenderTarget(),
        r = !1,
        s = this.passes.length
      for (n = 0; n < s; n++)
        if (!1 !== (e = this.passes[n]).enabled) {
          if (
            ((e.renderToScreen = this.renderToScreen && this.isLastEnabledPass(n)),
            e.render(this.renderer, this.writeBuffer, this.readBuffer, t, r),
            e.needsSwap)
          ) {
            if (r) {
              var a = this.renderer.getContext(),
                o = this.renderer.state.buffers.stencil
              o.setFunc(a.NOTEQUAL, 1, 4294967295),
                this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t),
                o.setFunc(a.EQUAL, 1, 4294967295)
            }
            this.swapBuffers()
          }
          void 0 !== pl && (e instanceof pl ? (r = !0) : e instanceof fl && (r = !1))
        }
      this.renderer.setRenderTarget(i)
    },
    reset: function (t) {
      if (void 0 === t) {
        var e = this.renderer.getSize(new C())
        ;(this._pixelRatio = this.renderer.getPixelRatio()),
          (this._width = e.width),
          (this._height = e.height),
          (t = this.renderTarget1.clone()).setSize(
            this._width * this._pixelRatio,
            this._height * this._pixelRatio
          )
      }
      this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        (this.renderTarget1 = t),
        (this.renderTarget2 = t.clone()),
        (this.writeBuffer = this.renderTarget1),
        (this.readBuffer = this.renderTarget2)
    },
    setSize: function (t, e) {
      ;(this._width = t), (this._height = e)
      var n = this._width * this._pixelRatio,
        i = this._height * this._pixelRatio
      this.renderTarget1.setSize(n, i), this.renderTarget2.setSize(n, i)
      for (var r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, i)
    },
    setPixelRatio: function (t) {
      ;(this._pixelRatio = t), this.setSize(this._width, this._height)
    },
  })
  var gl = function () {
    ;(this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1)
  }
  Object.assign(gl.prototype, {
    setSize: function () {},
    render: function () {
      console.error('THREE.Pass: .render() must be implemented in derived pass.')
    },
  }),
    (gl.FullScreenQuad = (function () {
      var t = new lo(-1, 1, 1, -1, 0, 1),
        e = new vn(2, 2),
        n = function (t) {
          this._mesh = new Qe(e, t)
        }
      return (
        Object.defineProperty(n.prototype, 'material', {
          get: function () {
            return this._mesh.material
          },
          set: function (t) {
            this._mesh.material = t
          },
        }),
        Object.assign(n.prototype, {
          dispose: function () {
            this._mesh.geometry.dispose()
          },
          render: function (e) {
            e.render(this._mesh, t)
          },
        }),
        n
      )
    })())
  var vl = function (t, e, n, i, r) {
    ll.call(this),
      (this.scene = t),
      (this.camera = e),
      (this.overrideMaterial = n),
      (this.clearColor = i),
      (this.clearAlpha = void 0 !== r ? r : 0),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new he())
  }
  ;(vl.prototype = Object.assign(Object.create(ll.prototype), {
    constructor: vl,
    render: function (t, e, n) {
      var i,
        r,
        s = t.autoClear
      ;(t.autoClear = !1),
        void 0 !== this.overrideMaterial &&
          ((r = this.scene.overrideMaterial),
          (this.scene.overrideMaterial = this.overrideMaterial)),
        this.clearColor &&
          (t.getClearColor(this._oldClearColor),
          (i = t.getClearAlpha()),
          t.setClearColor(this.clearColor, this.clearAlpha)),
        this.clearDepth && t.clearDepth(),
        t.setRenderTarget(this.renderToScreen ? null : n),
        this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
        t.render(this.scene, this.camera),
        this.clearColor && t.setClearColor(this._oldClearColor, i),
        void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = r),
        (t.autoClear = s)
    },
  })),
    new (class {
      constructor() {
        ;(this.sizes = { width: window.innerWidth, height: window.innerHeight }),
          (this.canvas = document.querySelector('canvas.webgl')),
          (this.renderer = new br({ canvas: this.canvas, alpha: !0 }))
        const t = document.querySelector('body')
        ;(this.onWindowMousedown = () => {
          t.classList.add('grabbing')
        }),
          (this.onWindowMouseup = () => {
            t.classList.remove('grabbing')
          }),
          this.canvas.addEventListener('pointerdown', this.onWindowMousedown),
          this.canvas.addEventListener('pointerup', this.onWindowMouseup),
          this.renderer.setSize(this.sizes.width, this.sizes.height),
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
          (this.scene = new Sr()),
          (this.threeClock = new _o()),
          (this.sunLight = new ho('#fffef5', 1)),
          this.sunLight.position.set(Math.cos(0), 1, Math.sin(0)),
          this.scene.add(this.sunLight)
        const e = new uo('#fffef5', 0.2)
        var n
        this.scene.add(e),
          ((n = this).camera = new an(35, n.sizes.width / n.sizes.height, 0.1, 100)),
          n.camera.position.set(0, 0, 3),
          n.scene.add(n.camera),
          (function (t) {
            const e = new Ra().load('/dot-planet-rings/planet-texture.jpg'),
              n = 3e4,
              i = new fe(new Float32Array(9e4), 3),
              r = new fe(new Float32Array(9e4), 3),
              s = new fe(new Float32Array(n), 1),
              a = new he('#808080'),
              o = new he('#1c1c1c'),
              l = (t, e) => t + (e - t) * Math.random()
            for (let t = 0; t < n; t++) {
              const e = Math.random() * Math.PI * 2,
                n = 1 * l(0.6, 0.9)
              i.setXYZ(t, Math.sin(e) * n, l(0, 0.01), Math.cos(e) * n)
              const c = a.clone()
              c.lerp(o, n / 1), r.setXYZ(t, c.r, c.g, c.b), s.setX(t, l(4, 20))
            }
            const c = new Ie()
            c.setAttribute('position', i),
              c.setAttribute('aScale', s),
              c.setAttribute('aColor', r),
              (t.ringMaterial = new rn({
                vertexShader:
                  'uniform float uTime;\n\nattribute float aScale;\nattribute vec3 aColor;\n\nvarying vec2 vUv;\nvarying vec3 vPos;\nvarying vec3 vColor;\n\nvoid main() {\n   vUv = uv;\n   vColor = aColor;\n\n   vec3 pos = position;\n\n   float angle = atan(pos.x, pos.z);\n   float distanceToCenter = length(pos.xz);\n   float angleOffset = (1.0 / distanceToCenter - 0.5) * uTime * 0.03;\n\n   angle += angleOffset;\n\n   pos.x = cos(angle) * distanceToCenter;\n   pos.z = sin(angle) * distanceToCenter;\n\n   pos.y = sin(uTime + pos.x * 10.0  * distanceToCenter) * 0.025;\n\n   vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );\n\n   gl_PointSize = aScale * (1.0 / - mvPosition.z);\n   gl_Position = projectionMatrix * mvPosition;\n}',
                fragmentShader:
                  'varying vec2 vUv;\nvarying vec3 vPos;\nvarying vec3 vColor;\n\nvoid main() {\n   float strength = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 5.0);\n\n   gl_FragColor = vec4(vColor, strength);\n}',
                uniforms: { uTime: { value: 0 } },
                side: 2,
                depthWrite: !1,
                transparent: !0,
                vertexColors: !0,
              }))
            const h = new bs(c, t.ringMaterial)
            h.rotation.set(0.5, -1, 0),
              t.scene.add(h),
              (t.planet = new Qe(new ea(0.4, 128, 128), new na({ map: e }))),
              t.scene.add(t.planet)
          })(this),
          (function (t) {
            ;(t.onWindowResize = () => {
              !(function (t) {
                ;(t.sizes.width = window.innerWidth),
                  (t.sizes.height = window.innerHeight),
                  (t.camera.aspect = t.sizes.width / t.sizes.height),
                  t.camera.updateProjectionMatrix(),
                  t.renderer.setSize(t.sizes.width, t.sizes.height),
                  t.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
                  t.composer.setSize(t.sizes.width, t.sizes.height),
                  t.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
              })(t)
            }),
              window.addEventListener('resize', t.onWindowResize)
          })(this),
          (function (t) {
            ;(t.controls = new il(t.camera, t.canvas)),
              (t.controls.enablePan = !1),
              (t.controls.minDistance = 1.2),
              (t.controls.maxDistance = 5),
              (t.controls.enableDamping = !0)
          })(this),
          this.initRenderPass(),
          this.tick()
      }
      initRenderPass() {
        ;(this.composer = new ml(this.renderer)),
          this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
          this.composer.setSize(this.sizes.width, this.sizes.height)
        const t = new vl(this.scene, this.camera)
        this.composer.addPass(t),
          (this.dotScreenPass = new hl()),
          (this.dotScreenPass.uniforms.scale.value = 4),
          this.composer.addPass(this.dotScreenPass)
      }
      tick() {
        ;(this.elapsedTime = this.threeClock.getElapsedTime()),
          (this.ringMaterial.uniforms.uTime.value = this.elapsedTime),
          (this.sunLight.position.x = Math.cos(0.1 * this.elapsedTime)),
          (this.sunLight.position.z = Math.sin(0.1 * this.elapsedTime)),
          this.planet.rotation.set(0.5, -1 - 0.08 * this.elapsedTime, 0),
          this.controls.update(),
          this.composer.render(),
          (this.updateRequest = window.requestAnimationFrame(this.tick.bind(this)))
      }
      destroy() {
        cancelAnimationFrame(this.updateRequest),
          (this.threeClock = null),
          (this.scene = null),
          (this.renderer = null),
          window.removeEventListener('resize', this.onWindowResize),
          this.canvas.removeEventListener('mousedown', this.onWindowMousedown),
          this.canvas.removeEventListener('mouseup', this.onWindowMouseup)
      }
    })()
})()
//# sourceMappingURL=bundle.js.map
