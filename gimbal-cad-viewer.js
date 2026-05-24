(function () {
  const viewers = document.querySelectorAll('[data-gimbal-cad]');
  if (!viewers.length) return;

  viewers.forEach((root) => {
    const canvas = root.querySelector('.gimbal-cad-canvas');
    const loading = root.querySelector('.gimbal-cad-loading');
    const modelSrc = root.dataset.modelSrc;
    const fallbackSrc = root.dataset.fallbackSrc;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false })
      || canvas.getContext('webgl', { antialias: true, alpha: false });

    if (!gl) {
      showFallback('WebGL is not available in this browser.');
      return;
    }

    if (
      typeof WebGL2RenderingContext !== 'undefined'
      && !(gl instanceof WebGL2RenderingContext)
      && !gl.getExtension('OES_element_index_uint')
    ) {
      showFallback('This browser cannot draw the CAD model index format.');
      return;
    }

    const state = {
      idleOrbit: !reduceMotion,
      loaded: false,
      dragging: false,
      lastX: 0,
      lastY: 0,
      camera: {
        theta: -0.86,
        phi: 1.22,
        radius: 4.2,
        target: [0, 0, 0],
      },
      center: [0, 0, 0],
      scale: 1,
      drawables: [],
    };

    const program = createProgram(gl);
    const locations = {
      position: gl.getAttribLocation(program, 'aPosition'),
      normal: gl.getAttribLocation(program, 'aNormal'),
      color: gl.getUniformLocation(program, 'uColor'),
      viewProjection: gl.getUniformLocation(program, 'uViewProjection'),
    };

    attachControls();
    init().catch((error) => showFallback(error.message || String(error)));

    async function init() {
      const gltf = await fetch(modelSrc).then((response) => {
        if (!response.ok) throw new Error(`Could not load ${modelSrc}`);
        return response.json();
      });
      const buffer = dataUriToArrayBuffer(gltf.buffers[0].uri);
      const primitives = collectPrimitives(gltf, buffer);
      if (!primitives.length) throw new Error('The CAD file loaded, but no mesh primitives were found.');

      const bounds = calculateBounds(primitives);
      state.center = [
        (bounds.min[0] + bounds.max[0]) / 2,
        (bounds.min[1] + bounds.max[1]) / 2,
        (bounds.min[2] + bounds.max[2]) / 2,
      ];
      state.scale = 2 / Math.max(
        bounds.max[0] - bounds.min[0],
        bounds.max[1] - bounds.min[1],
        bounds.max[2] - bounds.min[2],
      );
      state.drawables = primitives.map(uploadPrimitive);
      state.loaded = true;
      root.classList.add('is-loaded');
      if (loading) loading.textContent = '';
      requestAnimationFrame(frame);
    }

    function frame() {
      if (!state.loaded) return;
      resize();

      if (state.idleOrbit && !state.dragging) {
        state.camera.theta += 0.0018;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.042, 0.052, 0.07, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.useProgram(program);

      const aspect = canvas.width / Math.max(canvas.height, 1);
      const projection = perspective(42 * Math.PI / 180, aspect, 0.01, 100);
      const camera = state.camera;
      const eye = [
        camera.target[0] + camera.radius * Math.sin(camera.phi) * Math.cos(camera.theta),
        camera.target[1] + camera.radius * Math.cos(camera.phi),
        camera.target[2] + camera.radius * Math.sin(camera.phi) * Math.sin(camera.theta),
      ];
      const view = lookAt(eye, camera.target, [0, 1, 0]);
      gl.uniformMatrix4fv(locations.viewProjection, false, multiply(projection, view));

      for (const drawable of state.drawables) {
        gl.bindBuffer(gl.ARRAY_BUFFER, drawable.vertexBuffer);
        gl.enableVertexAttribArray(locations.position);
        gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(locations.normal);
        gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawable.indexBuffer);
        gl.uniform4fv(locations.color, drawable.color);
        gl.drawElements(gl.TRIANGLES, drawable.count, gl.UNSIGNED_INT, 0);
      }

      requestAnimationFrame(frame);
    }

    function uploadPrimitive(primitive) {
      const vertices = new Float32Array(primitive.positions.length * 6);
      primitive.positions.forEach((position, index) => {
        vertices[index * 6 + 0] = (position[0] - state.center[0]) * state.scale;
        vertices[index * 6 + 1] = (position[1] - state.center[1]) * state.scale;
        vertices[index * 6 + 2] = (position[2] - state.center[2]) * state.scale;
        vertices[index * 6 + 3] = primitive.normals[index][0];
        vertices[index * 6 + 4] = primitive.normals[index][1];
        vertices[index * 6 + 5] = primitive.normals[index][2];
      });

      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(primitive.indices), gl.STATIC_DRAW);

      return {
        vertexBuffer,
        indexBuffer,
        count: primitive.indices.length,
        color: primitive.color,
      };
    }

    function attachControls() {
      const reset = root.querySelector('[data-cad-reset]');
      if (reset) reset.addEventListener('click', resetView);

      canvas.addEventListener('pointerdown', (event) => {
        state.dragging = true;
        state.idleOrbit = false;
        state.lastX = event.clientX;
        state.lastY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
      });
      canvas.addEventListener('pointermove', (event) => {
        if (!state.dragging) return;
        const dx = event.clientX - state.lastX;
        const dy = event.clientY - state.lastY;
        state.camera.theta -= dx * 0.008;
        state.camera.phi = clamp(state.camera.phi + dy * 0.008, 0.18, Math.PI - 0.18);
        state.lastX = event.clientX;
        state.lastY = event.clientY;
      });
      canvas.addEventListener('pointerup', () => {
        state.dragging = false;
      });
      canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        state.idleOrbit = false;
        state.camera.radius = clamp(state.camera.radius * (1 + event.deltaY * 0.001), 1.65, 8.5);
      }, { passive: false });
    }

    function resetView() {
      state.camera.theta = -0.86;
      state.camera.phi = 1.22;
      state.camera.radius = 4.2;
      state.camera.target = [0, 0, 0];
      state.idleOrbit = !reduceMotion;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function showFallback(message) {
      root.classList.add('is-fallback', 'is-loaded');
      if (loading) loading.textContent = message || 'Showing fallback CAD render.';
      const fallback = root.querySelector('.gimbal-cad-fallback');
      if (fallback && fallbackSrc) fallback.src = fallbackSrc;
    }
  });

  function collectPrimitives(gltf, buffer) {
    const parents = new Map();
    gltf.nodes.forEach((node, index) => (node.children || []).forEach((child) => parents.set(child, index)));
    const materials = (gltf.materials || []).map((material) => {
      const pbr = material.pbrMetallicRoughness || {};
      return pbr.baseColorFactor || [0.72, 0.74, 0.78, 1];
    });

    function worldMatrix(nodeIndex) {
      const chain = [];
      let current = nodeIndex;
      while (current !== undefined) {
        chain.push(current);
        current = parents.get(current);
      }
      let matrix = identity();
      for (let i = chain.length - 1; i >= 0; i -= 1) {
        matrix = multiply(matrix, nodeMatrix(gltf.nodes[chain[i]]));
      }
      return matrix;
    }

    const primitives = [];
    gltf.nodes.forEach((node, nodeIndex) => {
      if (node.mesh === undefined) return;
      const matrix = worldMatrix(nodeIndex);
      const mesh = gltf.meshes[node.mesh];
      mesh.primitives.forEach((primitive) => {
        const positions = readAccessor(gltf, buffer, primitive.attributes.POSITION);
        const normals = primitive.attributes.NORMAL === undefined
          ? null
          : readAccessor(gltf, buffer, primitive.attributes.NORMAL);
        const indices = primitive.indices === undefined
          ? positions.map((_, index) => index)
          : readAccessor(gltf, buffer, primitive.indices).map((value) => value[0]);
        primitives.push({
          positions: positions.map((position) => transformPoint(matrix, position)),
          normals: positions.map((_, i) => normalize(transformVector(matrix, normals ? normals[i] : [0, 0, 1]))),
          indices,
          color: materials[primitive.material] || [0.72, 0.74, 0.78, 1],
        });
      });
    });

    return primitives;
  }

  function readAccessor(gltf, buffer, accessorIndex) {
    const accessor = gltf.accessors[accessorIndex];
    const view = gltf.bufferViews[accessor.bufferView];
    const componentCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[accessor.type];
    const componentSize = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 }[accessor.componentType];
    const stride = view.byteStride || componentCount * componentSize;
    const offset = (view.byteOffset || 0) + (accessor.byteOffset || 0);
    const dataView = new DataView(buffer);
    const rows = [];
    for (let i = 0; i < accessor.count; i += 1) {
      const row = [];
      for (let j = 0; j < componentCount; j += 1) {
        row.push(readComponent(dataView, offset + i * stride + j * componentSize, accessor.componentType));
      }
      rows.push(row);
    }
    return rows;
  }

  function readComponent(view, offset, type) {
    if (type === 5120) return view.getInt8(offset);
    if (type === 5121) return view.getUint8(offset);
    if (type === 5122) return view.getInt16(offset, true);
    if (type === 5123) return view.getUint16(offset, true);
    if (type === 5125) return view.getUint32(offset, true);
    if (type === 5126) return view.getFloat32(offset, true);
    throw new Error(`Unsupported GLTF component type ${type}`);
  }

  function dataUriToArrayBuffer(uri) {
    const base64 = uri.split(',', 2)[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  function calculateBounds(primitives) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    primitives.forEach((primitive) => {
      primitive.positions.forEach((position) => {
        for (let i = 0; i < 3; i += 1) {
          min[i] = Math.min(min[i], position[i]);
          max[i] = Math.max(max[i], position[i]);
        }
      });
    });
    return { min, max };
  }

  function nodeMatrix(node) {
    if (node.matrix) return node.matrix.slice();
    const matrix = identity();
    if (node.translation) {
      matrix[12] = node.translation[0];
      matrix[13] = node.translation[1];
      matrix[14] = node.translation[2];
    }
    return matrix;
  }

  function createProgram(gl) {
    const vertex = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      uniform mat4 uViewProjection;
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(aNormal);
        gl_Position = uViewProjection * vec4(aPosition, 1.0);
      }
    `;
    const fragment = `
      precision highp float;
      uniform vec4 uColor;
      varying vec3 vNormal;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightA = normalize(vec3(-0.36, 0.8, 0.5));
        vec3 lightB = normalize(vec3(0.72, 0.38, -0.56));
        float diffuse = max(dot(normal, lightA), 0.0) * 0.76 + max(dot(normal, lightB), 0.0) * 0.24;
        float rim = pow(1.0 - max(dot(normal, normalize(vec3(0.0, 0.2, 1.0))), 0.0), 2.0) * 0.16;
        vec3 color = uColor.rgb * (0.34 + diffuse * 0.78) + vec3(rim);
        gl_FragColor = vec4(color, uColor.a);
      }
    `;
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    return program;
  }

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }

  function identity() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  function multiply(a, b) {
    const out = new Array(16).fill(0);
    for (let col = 0; col < 4; col += 1) {
      for (let row = 0; row < 4; row += 1) {
        for (let i = 0; i < 4; i += 1) {
          out[col * 4 + row] += a[i * 4 + row] * b[col * 4 + i];
        }
      }
    }
    return out;
  }

  function transformPoint(m, p) {
    return [
      m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
      m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
      m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
    ];
  }

  function transformVector(m, p) {
    return [
      m[0] * p[0] + m[4] * p[1] + m[8] * p[2],
      m[1] * p[0] + m[5] * p[1] + m[9] * p[2],
      m[2] * p[0] + m[6] * p[1] + m[10] * p[2],
    ];
  }

  function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, (2 * far * near) * nf, 0,
    ];
  }

  function lookAt(eye, target, up) {
    const z = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
    const x = normalize(cross(up, z));
    const y = cross(z, x);
    return [
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
    ];
  }

  function normalize(v) {
    const length = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / length, v[1] / length, v[2] / length];
  }

  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
})();
