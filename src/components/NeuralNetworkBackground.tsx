import { useEffect, useRef } from "react";

type MoleculeNode = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  hueShift: number;
};

type CircuitNode = {
  x: number;
  y: number;
  pulseOffset: number;
};

type DropParticle = {
  x: number;
  y: number;
  length: number;
  speed: number;
  drift: number;
  opacity: number;
};

const MOLECULE_COUNT = 34;
const CIRCUIT_COLUMNS = 7;
const CIRCUIT_ROWS = 5;
const DROP_COUNT = 44;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let scrollProgress = 0;

    const pointer = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const molecules: MoleculeNode[] = [];
    const circuitNodes: CircuitNode[] = [];
    const drops: DropParticle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      molecules.length = 0;
      circuitNodes.length = 0;
      drops.length = 0;

      for (let i = 0; i < MOLECULE_COUNT; i += 1) {
        const baseX = Math.random() * width;
        const baseY = Math.random() * height;

        molecules.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          radius: Math.random() * 3.2 + 2.4,
          orbitRadius: Math.random() * 14 + 10,
          orbitSpeed: Math.random() * 0.011 + 0.004,
          orbitOffset: Math.random() * Math.PI * 2,
          hueShift: Math.random() * 30,
        });
      }

      const xGap = width / (CIRCUIT_COLUMNS + 1);
      const yGap = height / (CIRCUIT_ROWS + 1);

      for (let row = 1; row <= CIRCUIT_ROWS; row += 1) {
        for (let col = 1; col <= CIRCUIT_COLUMNS; col += 1) {
          circuitNodes.push({
            x: xGap * col + (Math.random() - 0.5) * 40,
            y: yGap * row + (Math.random() - 0.5) * 24,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      }

      for (let i = 0; i < DROP_COUNT; i += 1) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 100 + 40,
          speed: Math.random() * 2.6 + 1.8,
          drift: (Math.random() - 0.5) * 0.7,
          opacity: Math.random() * 0.28 + 0.12,
        });
      }
    };

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgress = clamp(window.scrollY / maxScroll, 0, 1);
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
      pointer.active = false;
    };

    const drawCircuitSegment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number,
      pulse: number,
      opacityBoost: number,
    ) => {
      const midX = x1 + (x2 - x1) * 0.55;

      context.strokeStyle = `rgba(110, 174, 255, ${alpha * opacityBoost})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(midX, y1);
      context.lineTo(midX, y2);
      context.lineTo(x2, y2);
      context.stroke();

      const pulseX = x1 + (x2 - x1) * pulse;
      const pulseY = pulse < 0.55 ? y1 : y1 + (y2 - y1) * ((pulse - 0.55) / 0.45);
      context.fillStyle = `rgba(156, 216, 255, ${0.88 * opacityBoost})`;
      context.beginPath();
      context.arc(pulseX, pulseY, 1.8, 0, Math.PI * 2);
      context.fill();
    };

    const drawTopTheme = (time: number, blend: number) => {
      const parallaxX = (pointer.x - width / 2) * 0.028;
      const parallaxY = (pointer.y - height / 2) * 0.028;

      context.save();
      context.shadowBlur = 18;
      context.shadowColor = `rgba(115, 194, 255, ${0.35 * blend})`;

      for (let i = 0; i < circuitNodes.length; i += 1) {
        const node = circuitNodes[i];
        const x = node.x + parallaxX;
        const y = node.y + parallaxY;
        const pulse = (Math.sin(time * 0.0016 + node.pulseOffset) + 1) / 2;

        const rightNeighbor = i % CIRCUIT_COLUMNS !== CIRCUIT_COLUMNS - 1 ? circuitNodes[i + 1] : null;
        const lowerNeighbor = i + CIRCUIT_COLUMNS < circuitNodes.length ? circuitNodes[i + CIRCUIT_COLUMNS] : null;

        if (rightNeighbor) {
          drawCircuitSegment(
            x,
            y,
            rightNeighbor.x + parallaxX,
            rightNeighbor.y + parallaxY,
            0.15 + pulse * 0.12,
            pulse,
            blend,
          );
        }

        if (lowerNeighbor) {
          drawCircuitSegment(
            x,
            y,
            lowerNeighbor.x + parallaxX,
            lowerNeighbor.y + parallaxY,
            0.08 + pulse * 0.1,
            1 - pulse,
            blend,
          );
        }

        context.fillStyle = `rgba(182, 225, 255, ${(0.45 + pulse * 0.4) * blend})`;
        context.beginPath();
        context.arc(x, y, 2.8 + pulse * 1.2, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = `rgba(121, 194, 255, ${(0.18 + pulse * 0.22) * blend})`;
        context.beginPath();
        context.arc(x, y, 8 + pulse * 3, 0, Math.PI * 2);
        context.stroke();
      }

      context.restore();

      molecules.forEach((molecule, index) => {
        molecule.baseX += molecule.vx;
        molecule.baseY += molecule.vy;

        if (molecule.baseX < -40) molecule.baseX = width + 40;
        if (molecule.baseX > width + 40) molecule.baseX = -40;
        if (molecule.baseY < -40) molecule.baseY = height + 40;
        if (molecule.baseY > height + 40) molecule.baseY = -40;

        const dx = pointer.x - molecule.baseX;
        const dy = pointer.y - molecule.baseY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 320);
        const pull = pointer.active ? influence * 42 : influence * 18;

        const orbitAngle = time * molecule.orbitSpeed + molecule.orbitOffset;
        molecule.x =
          molecule.baseX +
          Math.cos(orbitAngle) * molecule.orbitRadius -
          dx * 0.045 * influence +
          parallaxX * 0.45;
        molecule.y =
          molecule.baseY +
          Math.sin(orbitAngle) * molecule.orbitRadius -
          dy * 0.045 * influence +
          parallaxY * 0.45;

        if (index < molecules.length - 1) {
          const next = molecules[index + 1];
          const lineDistance = Math.hypot(molecule.x - next.x, molecule.y - next.y);
          if (lineDistance < 220) {
            context.strokeStyle = `rgba(133, 198, 255, ${0.16 * (1 - lineDistance / 220) * blend})`;
            context.lineWidth = 1.1;
            context.beginPath();
            context.moveTo(molecule.x, molecule.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }

        context.strokeStyle = `rgba(146, 205, 255, ${(0.18 + influence * 0.28) * blend})`;
        context.lineWidth = 1.25;
        context.beginPath();
        context.arc(molecule.x, molecule.y, molecule.orbitRadius * 0.7 + pull * 0.08, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = `hsla(${200 + molecule.hueShift}, 90%, 74%, ${(0.8 + influence * 0.2) * blend})`;
        context.beginPath();
        context.arc(molecule.x, molecule.y, molecule.radius + influence * 1.8, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(236, 248, 255, ${0.95 * blend})`;
        context.beginPath();
        context.arc(
          molecule.x + Math.cos(orbitAngle) * (molecule.orbitRadius * 0.68),
          molecule.y + Math.sin(orbitAngle) * (molecule.orbitRadius * 0.68),
          1.8,
          0,
          Math.PI * 2,
        );
        context.fill();
      });
    };

    const drawDropTheme = (time: number, blend: number) => {
      const driftX = (pointer.x - width / 2) * 0.012;
      const driftY = (pointer.y - height / 2) * 0.008;

      const rainGradient = context.createLinearGradient(0, 0, 0, height);
      rainGradient.addColorStop(0, `rgba(26, 47, 88, ${0.05 * blend})`);
      rainGradient.addColorStop(0.5, `rgba(18, 94, 112, ${0.12 * blend})`);
      rainGradient.addColorStop(1, `rgba(4, 22, 34, ${0.22 * blend})`);
      context.fillStyle = rainGradient;
      context.fillRect(0, 0, width, height);

      drops.forEach((drop, index) => {
        drop.y += drop.speed * (0.6 + blend);
        drop.x += drop.drift + driftX * 0.002;

        if (drop.y - drop.length > height + 20) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }

        if (drop.x < -20) drop.x = width + 20;
        if (drop.x > width + 20) drop.x = -20;

        const x = drop.x + Math.sin(time * 0.0007 + index) * 4 + driftX;
        const y = drop.y + driftY;

        const lineGradient = context.createLinearGradient(x, y, x, y + drop.length);
        lineGradient.addColorStop(0, `rgba(186, 236, 255, 0)`);
        lineGradient.addColorStop(0.25, `rgba(130, 223, 255, ${drop.opacity * blend})`);
        lineGradient.addColorStop(1, `rgba(31, 168, 198, 0)`);

        context.strokeStyle = lineGradient;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + driftX * 0.03, y + drop.length);
        context.stroke();

        context.fillStyle = `rgba(214, 247, 255, ${0.65 * blend})`;
        context.beginPath();
        context.arc(x, y + drop.length * 0.18, 1.7, 0, Math.PI * 2);
        context.fill();
      });

      const lift = pointer.active ? (height - pointer.y) * 0.02 : 0;
      const rocketX = width * 0.82 + (pointer.x - width / 2) * 0.018;
      const rocketBaseY = height * 0.78 - scrollProgress * 180 - lift;
      const flamePulse = (Math.sin(time * 0.01) + 1) / 2;

      context.save();
      context.translate(rocketX, rocketBaseY);
      context.rotate(-0.2);
      context.globalAlpha = 0.18 + blend * 0.5;

      context.strokeStyle = `rgba(158, 228, 255, ${0.4 + blend * 0.35})`;
      context.lineWidth = 1.3;
      context.beginPath();
      context.moveTo(0, -34);
      context.lineTo(12, -6);
      context.lineTo(7, 18);
      context.lineTo(0, 26);
      context.lineTo(-7, 18);
      context.lineTo(-12, -6);
      context.closePath();
      context.stroke();

      context.fillStyle = `rgba(88, 166, 255, ${0.16 + blend * 0.18})`;
      context.fill();

      context.beginPath();
      context.arc(0, -4, 4.5, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = `rgba(255, 209, 102, ${0.35 + flamePulse * 0.3 * blend})`;
      context.beginPath();
      context.moveTo(-2, 24);
      context.lineTo(0, 40 + flamePulse * 18);
      context.lineTo(2, 24);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;

      context.clearRect(0, 0, width, height);

      const themeMix = clamp((scrollProgress - 0.18) / 0.5, 0, 1);
      const topBlend = 1 - themeMix * 0.9;

      const gradient = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.7,
      );
      gradient.addColorStop(0, `rgba(64, 138, 255, ${0.24 - themeMix * 0.08})`);
      gradient.addColorStop(0.45, `rgba(30, 74, 140, ${0.12 + themeMix * 0.05})`);
      gradient.addColorStop(1, "rgba(4, 10, 24, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      drawTopTheme(time, topBlend);

      if (themeMix > 0) {
        drawDropTheme(time, themeMix);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    updateScroll();
    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(20,55,112,0.32),_transparent_38%),linear-gradient(180deg,_#030712_0%,_#081120_55%,_#02050c_100%)]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.42)_68%,rgba(1,8,18,0.82)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(148,211,255,0.24),_transparent_60%)] pointer-events-none" />
    </div>
  );
};

export default NeuralNetworkBackground;
