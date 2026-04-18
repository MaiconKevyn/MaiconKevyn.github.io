import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  layer: number;
}

interface Connection {
  from: Node;
  to: Node;
  weight: number;
}

export default function NeuralNetworkEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    const layers = [4, 6, 6, 3];
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    layers.forEach((count, layerIndex) => {
      const layerX = (canvas.width / (layers.length + 1)) * (layerIndex + 1);
      const spacing = canvas.height / (count + 1);

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: layerX,
          y: spacing * (i + 1),
          vx: 0,
          vy: 0,
          layer: layerIndex,
        });
      }
    });

    let startIndex = 0;
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayerSize = layers[i];
      const nextLayerSize = layers[i + 1];

      for (let j = 0; j < currentLayerSize; j++) {
        for (let k = 0; k < nextLayerSize; k++) {
          const fromNode = nodes[startIndex + j];
          const toNode = nodes[startIndex + currentLayerSize + k];
          connections.push({
            from: fromNode,
            to: toNode,
            weight: Math.random(),
          });
        }
      }
      startIndex += currentLayerSize;
    }

    let animationFrame: number;
    let pulsePhase = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pulsePhase += 0.02;

      connections.forEach((conn) => {
        const pulse = Math.sin(pulsePhase + conn.weight * Math.PI * 2) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(100, 180, 255, ${0.1 + pulse * 0.4})`;
        ctx.lineWidth = 1 + pulse * 2;
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const pulse = Math.sin(pulsePhase * 2 + node.x * 0.01) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 8 + pulse * 4, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, 12
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${0.8 + pulse * 0.2})`);
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `rgba(100, 200, 255, ${0.8 + pulse * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-cyan-400/50 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Neural Network Visualization
              </h3>
              <p className="text-gray-400">
                You found the Easter egg! This is a live neural network animation.
              </p>
            </div>

            <canvas
              ref={canvasRef}
              className="rounded-2xl border border-cyan-400/30 bg-space-gradient"
            />

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Press <kbd className="px-2 py-1 bg-slate-700 rounded text-cyan-400">Ctrl + Shift + N</kbd> to toggle
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
