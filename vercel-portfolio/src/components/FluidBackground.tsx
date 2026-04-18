import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse state
    const mouse = { x: width / 2, y: height / 2 };
    const lastMouse = { x: width / 2, y: height / 2 };

    const cometColor = { r: 6, g: 182, b: 212 }; // Cyan
    const spinners = [
      { angle: 0, radius: 20, speed: 0.15, size: 3 },
      { angle: Math.PI, radius: 20, speed: 0.15, size: 3 },
      { angle: Math.PI / 2, radius: 35, speed: -0.1, size: 2 },
    ];
    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];

    // Space background stars
    let stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.2,
      z: Math.random() * 0.8 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      stars = Array.from({ length: 400 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.2,
        z: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let time = 0;
    let lastExecuted = Date.now();

    const animate = () => {
      // Pause animation if tab is hidden to save resources
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const now = Date.now();
      const delta = now - lastExecuted;

      // Throttle for background performance (capped at ~60fps, but can be higher on high-hz screens)
      // On mobile we could cap it even lower if needed
      if (delta < 15) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastExecuted = now;

      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Detect if light theme is active
      const isLight = document.documentElement.classList.contains('light');

      // Trail fade – clears previous frame with semi-transparent overlay
      if (isLight) {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.15)';
      } else {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      }
      ctx.fillRect(0, 0, width, height);

      // Parallax offsets based on mouse distance from center
      const parallaxX = (mouse.x - width / 2) * 0.05;
      const parallaxY = (mouse.y - height / 2) * 0.05;

      // Draw starry space background
      stars.forEach(star => {
        let drawX = (star.x - parallaxX * star.z) % width;
        let drawY = (star.y - parallaxY * star.z) % height;
        if (drawX < 0) drawX += width;
        if (drawY < 0) drawY += height;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        const twinkle = Math.sin(time * 5 + star.x) * 0.3 + 0.7;
        if (isLight) {
          ctx.fillStyle = `rgba(100, 116, 139, ${star.alpha * twinkle})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
        }
        ctx.fill();
      });

      // Draw rotating shooting-star head / spinners around mouse
      spinners.forEach(spinner => {
        spinner.angle += spinner.speed;
        const sx = mouse.x + Math.cos(spinner.angle) * spinner.radius;
        const sy = mouse.y + Math.sin(spinner.angle) * spinner.radius;

        ctx.beginPath();
        ctx.arc(sx, sy, spinner.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cometColor.r}, ${cometColor.g}, ${cometColor.b}, 0.8)`;
        ctx.fill();
      });

      // Bright core at mouse pos
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(6, 182, 212, 1)' : 'rgba(255, 255, 255, 1)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${cometColor.r}, ${cometColor.g}, ${cometColor.b}, 1)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Emit particles
      const speed = Math.sqrt(
        Math.pow(mouse.x - lastMouse.x, 2) + Math.pow(mouse.y - lastMouse.y, 2)
      );
      const count = Math.min(speed * 0.5, 6) + 1;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1.0,
          size: Math.random() * 2 + 1,
        });
      }

      lastMouse.x += (mouse.x - lastMouse.x) * 0.15;
      lastMouse.y += (mouse.y - lastMouse.y) * 0.15;

      // Draw & update trailing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx - parallaxX * 0.05;
        p.y += p.vy - parallaxY * 0.05;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cometColor.r}, ${cometColor.g}, ${cometColor.b}, ${p.life * 0.7})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
