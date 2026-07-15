import { useEffect, useRef } from "react";
import { WORLDS, CONSTELLATION_QUESTIONS } from "../data";

interface CelestialCanvasProps {
  activeWorldId: string | null;
  selectedQuestionId: string | null;
  isInteractive: boolean;
  isConvergence: boolean;
  cinematicStepIndex: number;
}

export default function CelestialCanvas({
  activeWorldId,
  selectedQuestionId,
  isInteractive,
  isConvergence,
  cinematicStepIndex,
}: CelestialCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Camera targets & currents
  const cameraRef = useRef({
    x: 0,
    y: 0,
    zoom: 1,
    tx: 0,
    ty: 0,
    tzoom: 1,
  });

  // World positions in simulated coordinates
  const worldPositions: Record<string, { x: number; y: number; color: string }> = {
    "world-1": { x: -280, y: -180, color: "#3a86ff" }, // Civic Blue
    "world-2": { x: 280, y: -200, color: "#d4af37" },  // Finance Gold
    "world-3": { x: -300, y: 220, color: "#8338ec" },  // AI Purple
    "world-4": { x: 320, y: 240, color: "#ef4444" },   // Strategy Crimson
    "world-5": { x: 0, y: 380, color: "#10b981" },     // Human Green
  };

  useEffect(() => {
    // Handle resizing
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX - window.innerWidth / 2;
      mouseRef.current.ty = e.clientY - window.innerHeight / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Generate Background Stars (350 stars)
    const backgroundStars: { x: number; y: number; size: number; alpha: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 350; i++) {
      backgroundStars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.01 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Generate Cosmic Dust swirling slowly (180 particles)
    const cosmicDust: { r: number; angle: number; size: number; speed: number; color: string }[] = [];
    const colors = ["#3a86ff", "#d4af37", "#8338ec", "#ef4444", "#10b981", "#ffffff"];
    for (let i = 0; i < 180; i++) {
      cosmicDust.push({
        r: Math.random() * 700 + 100,
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 2 + 0.5,
        speed: (Math.random() * 0.001 + 0.0004) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Generate clusters for each world
    const worldClusters: Record<string, { dx: number; dy: number; size: number; speed: number; angle: number }[]> = {};
    Object.keys(worldPositions).forEach((wId) => {
      const cluster: { dx: number; dy: number; size: number; speed: number; angle: number }[] = [];
      // Create spiral arms
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 45 + 5;
        cluster.push({
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          size: Math.random() * 2.2 + 0.4,
          speed: Math.random() * 0.02 + 0.005,
          angle: angle,
        });
      }
      worldClusters[wId] = cluster;
    });

    let animationFrameId: number;
    let time = 0;

    // Game loop
    const render = () => {
      time += 1;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with elegant deep space fade
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, width, height);

      // Smooth camera interpolation
      const camera = cameraRef.current;
      camera.x += (camera.tx - camera.x) * 0.06;
      camera.y += (camera.ty - camera.y) * 0.06;
      camera.zoom += (camera.tzoom - camera.zoom) * 0.06;

      // Interactive mouse influence
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Draw Nebulae (background volumetric lighting blobs)
      // We will create beautiful overlapping radial gradient circles
      ctx.save();
      // Apply translation relative to screen center
      ctx.translate(width / 2, height / 2);
      ctx.scale(camera.zoom, camera.zoom);
      ctx.translate(-camera.x, -camera.y);

      // Draw giant nebulae clouds
      const drawNebula = (cx: number, cy: number, radius: number, baseColor: string, intensity: number) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, baseColor);
        grad.addColorStop(0.5, baseColor.replace("0.4", "0.15").replace("0.55", "0.2"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // Draw active nebulae depending on cinematic step or active world
      if (!isInteractive) {
        // Cinema mode - scale nebulae visibility with step
        if (cinematicStepIndex >= 1) {
          // Pulse center nebula
          const pulseR = 400 + Math.sin(time * 0.02) * 50;
          drawNebula(0, 0, pulseR, "rgba(131, 56, 236, 0.25)", 0.2);
        }
        if (cinematicStepIndex >= 5) {
          // Big Bang moment - flash nebulae
          drawNebula(-100, -50, 600, "rgba(58, 134, 255, 0.3)", 0.3);
          drawNebula(100, 50, 500, "rgba(212, 175, 55, 0.3)", 0.3);
        }
      } else {
        // Interactive mode - draw beautiful nebulae around each world cluster
        WORLDS.forEach((w) => {
          const pos = worldPositions[w.id];
          if (pos) {
            const isCurrent = activeWorldId === w.id;
            const sizeMultiplier = isCurrent ? 1.4 : 1.0;
            const pulse = Math.sin(time * 0.01 + w.title.length) * 20;
            drawNebula(pos.x, pos.y, (220 + pulse) * sizeMultiplier, w.nebulaColor, 0.4);
          }
        });
      }

      // Draw background stars
      ctx.globalCompositeOperation = "lighter";
      backgroundStars.forEach((star) => {
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.35 + 0.65;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
        ctx.beginPath();
        // Give subtle drift
        ctx.arc(star.x + Math.sin(time * 0.001) * 10, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw swirling Cosmic Dust (ambient particles)
      cosmicDust.forEach((dust) => {
        dust.angle += dust.speed;
        const dx = Math.cos(dust.angle) * dust.r;
        const dy = Math.sin(dust.angle) * dust.r;
        ctx.fillStyle = dust.color;
        ctx.beginPath();
        ctx.arc(dx, dy, dust.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw orbital trails / galactic grid lines if interactive
      if (isInteractive) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 0.5;
        for (let r = 200; r <= 800; r += 200) {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw Constellation Lines for interactive Questions
      if (isInteractive && !isConvergence) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        CONSTELLATION_QUESTIONS.forEach((q, idx) => {
          // Convert percentage coordinates (x: 20-80, y: 20-80) to simulated cosmos space
          const qx = (q.x - 50) * 12;
          const qy = (q.y - 50) * 10;

          // Connect to next question to form a true constellation lattice
          const nextQ = CONSTELLATION_QUESTIONS[(idx + 1) % CONSTELLATION_QUESTIONS.length];
          const nqx = (nextQ.x - 50) * 12;
          const nqy = (nextQ.y - 50) * 10;

          ctx.moveTo(qx, qy);
          ctx.lineTo(nqx, nqy);
        });
        ctx.stroke();

        // Draw interactive question stars
        CONSTELLATION_QUESTIONS.forEach((q) => {
          const qx = (q.x - 50) * 12;
          const qy = (q.y - 50) * 10;
          const isSelected = selectedQuestionId === q.id;

          // Outer glow
          const radialGrad = ctx.createRadialGradient(qx, qy, 0, qx, qy, isSelected ? 18 : 10);
          radialGrad.addColorStop(0, isSelected ? "rgba(255, 255, 255, 0.8)" : "rgba(212, 175, 55, 0.4)");
          radialGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = radialGrad;
          ctx.beginPath();
          ctx.arc(qx, qy, isSelected ? 18 : 10, 0, Math.PI * 2);
          ctx.fill();

          // Core star
          ctx.fillStyle = isSelected ? "#ffffff" : "#d4af37";
          ctx.beginPath();
          ctx.arc(qx, qy, isSelected ? 3 : 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Text labels for questions hovering nearby
          ctx.fillStyle = isSelected ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.4)";
          ctx.font = isSelected ? "500 11px Inter, sans-serif" : "400 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(q.text, qx, qy - 12);
        });
      }

      // Draw connection vectors between worlds in interactive mode
      if (isInteractive || isConvergence) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 0.8;
        const keys = Object.keys(worldPositions);
        ctx.beginPath();
        for (let i = 0; i < keys.length; i++) {
          const posA = worldPositions[keys[i]];
          const posB = worldPositions[keys[(i + 1) % keys.length]];
          ctx.moveTo(posA.x, posA.y);
          ctx.lineTo(posB.x, posB.y);
        }
        ctx.stroke();

        // If Convergence, draw golden streams of light feeding into the center core
        if (isConvergence) {
          ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
          ctx.lineWidth = 2;
          keys.forEach((key) => {
            const pos = worldPositions[key];
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            // Draw a curved line to center
            ctx.quadraticCurveTo(pos.x / 2, pos.y / 2 + Math.sin(time * 0.05) * 50, 0, 0);
            ctx.stroke();
          });

          // Draw central blinding light core collapsing
          const coreRadius = Math.max(1, 120 - time % 150);
          const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
          coreGrad.addColorStop(0, "#ffffff");
          coreGrad.addColorStop(0.3, "rgba(212, 175, 55, 0.8)");
          coreGrad.addColorStop(0.7, "rgba(131, 56, 236, 0.4)");
          coreGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(0, 0, coreRadius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Worlds and their particle spirals
      WORLDS.forEach((w) => {
        const pos = worldPositions[w.id];
        if (!pos) return;

        // Is this the currently selected world?
        const isCurrent = activeWorldId === w.id;
        const cluster = worldClusters[w.id] || [];

        // Rotate particles in spiral arms
        cluster.forEach((part) => {
          part.angle += part.speed;
          const r = Math.sqrt(part.dx * part.dx + part.dy * part.dy);
          const px = pos.x + Math.cos(part.angle) * r;
          const py = pos.y + Math.sin(part.angle) * r;

          // Pulse active world particles
          ctx.fillStyle = w.color === "blue" ? "#3a86ff" :
                          w.color === "gold" ? "#d4af37" :
                          w.color === "purple" ? "#c77dff" :
                          w.color === "crimson" ? "#ff4d6d" : "#52b788";

          ctx.beginPath();
          ctx.arc(px, py, part.size * (isCurrent ? 1.5 : 1), 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw central world portal
        const pulse = Math.sin(time * 0.03 + w.title.length) * 4 + 15;
        const portalGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulse);
        portalGrad.addColorStop(0, "#ffffff");
        portalGrad.addColorStop(0.4, w.color === "blue" ? "rgba(58, 134, 255, 0.8)" :
                                   w.color === "gold" ? "rgba(212, 175, 55, 0.8)" :
                                   w.color === "purple" ? "rgba(131, 56, 236, 0.8)" :
                                   w.color === "crimson" ? "rgba(239, 68, 68, 0.8)" : "rgba(16, 185, 129, 0.8)");
        portalGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = portalGrad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw world labels if interactive and not converged
        if (isInteractive && !isConvergence) {
          ctx.fillStyle = isCurrent ? "#ffffff" : "rgba(255,255,255,0.7)";
          ctx.font = isCurrent ? "600 13px Space Grotesk, sans-serif" : "500 11px Space Grotesk, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(w.title, pos.x, pos.y + 36);

          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.font = "400 9px JetBrains Mono, monospace";
          ctx.fillText(w.subtitle, pos.x, pos.y + 48);
        }
      });

      // Draw subtle mouse interactive light crosshair
      if (isInteractive && !isConvergence && !activeWorldId) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        // horizontal
        ctx.moveTo(-width, mouse.y / camera.zoom);
        ctx.lineTo(width, mouse.y / camera.zoom);
        // vertical
        ctx.moveTo(mouse.x / camera.zoom, -height);
        ctx.lineTo(mouse.x / camera.zoom, height);
        ctx.stroke();
      }

      ctx.restore();

      // Enforce camera targeting depending on states
      if (!isInteractive) {
        // In film mode, camera slowly flies forward
        camera.tzoom = 1.0 + (cinematicStepIndex * 0.08);
        camera.tx = Math.sin(time * 0.005) * 40;
        camera.ty = Math.cos(time * 0.005) * 40;
      } else if (isConvergence) {
        // Zoom deeply out to see the center collapse
        camera.tzoom = 0.45;
        camera.tx = 0;
        camera.ty = 0;
      } else if (activeWorldId) {
        // Zoom in on specific world
        const targetPos = worldPositions[activeWorldId];
        if (targetPos) {
          camera.tx = targetPos.x;
          camera.ty = targetPos.y;
          camera.tzoom = 1.5;
        }
      } else if (selectedQuestionId) {
        // Zoom on specific question
        const q = CONSTELLATION_QUESTIONS.find((item) => item.id === selectedQuestionId);
        if (q) {
          camera.tx = (q.x - 50) * 12;
          camera.ty = (q.y - 50) * 10;
          camera.tzoom = 1.6;
        }
      } else {
        // General overview, subtle mouse panning
        camera.tx = mouse.x * 0.25;
        camera.ty = mouse.y * 0.25;
        camera.tzoom = 0.85;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeWorldId, selectedQuestionId, isInteractive, isConvergence, cinematicStepIndex]);

  return (
    <canvas
      ref={canvasRef}
      id="celestial-canvas"
      className="fixed inset-0 w-full h-full block z-0 cursor-crosshair pointer-events-none"
    />
  );
}
