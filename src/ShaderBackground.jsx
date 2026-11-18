import { useEffect, useRef } from "react";
import frag from "./silk.frag.js";

const COLORS = ["#02010A", "#04052E", "#3D2C8D", "#916BBF"];
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const VERT = "attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }";

export default function ShaderBackground({ className = "shader" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // fullscreen triangle
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(prog, n);
    const colors = new Float32Array(24);
    COLORS.forEach((c, i) => colors.set(rgb(c), i * 3));
    gl.uniform3fv(U("u_colors"), colors);
    gl.uniform4f(U("u_shape"), 1.26, 0.28, 0.5, 0.0);
    gl.uniform4f(U("u_surface"), 2.4, 1.11, 0.0, 1.0);
    gl.uniform4f(U("u_finish"), 0.0, 0.0, 0.0, 0.05);
    gl.uniform4f(U("u_transform"), 1581.0, 0.0, 0.0, 0.0);
    gl.uniform4f(U("u_space"), 0.0, 0.0, 0.0, 0.0);
    gl.uniform4f(U("u_cursor"), 0.0, 2.0, 0.65, 0.46); // cursor off
    const uScene = U("u_scene");

    let t = 0, last = performance.now(), raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = () => {
      resize();
      gl.uniform4f(uScene, canvas.width, canvas.height, t * 0.76, 4.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now) => {
      t += (now - last) / 1000;
      last = now;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
