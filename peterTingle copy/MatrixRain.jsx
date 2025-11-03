import { useEffect, useRef } from "react";

const MatrixRain = ({ color = "#00ff6a" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const fit = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    fit();

    const fontSize = 16; // base font size in CSS pixels
    const columns = () => Math.ceil(width / fontSize);
    let drops = new Array(columns()).fill(1);

    const glyphs = "アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
      ""
    );

    const draw = () => {
      // fade the canvas slightly to create trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      const cols = columns();
      fit();
      drops = new Array(cols).fill(1);
    };

    // Resize observer for better performance on iOS Safari
    resizeObserverRef.current = new ResizeObserver(onResize);
    resizeObserverRef.current.observe(document.documentElement);
    window.addEventListener("resize", onResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 w-full h-full bg-black"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default MatrixRain;