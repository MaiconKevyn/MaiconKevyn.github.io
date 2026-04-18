import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface ProjectImpactChartProps {
  value: number;
}

export default function ProjectImpactChart({ value }: ProjectImpactChartProps) {
  const [data, setData] = useState<{ value: number }[]>([]);

  useEffect(() => {
    const generateData = () => {
      const points = 20;
      const targetValue = value > 100 ? 100 : value;
      const newData = Array.from({ length: points }, (_, i) => ({
        value: (targetValue / points) * i + Math.random() * 5,
      }));
      setData(newData);
    };

    generateData();
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-32"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#colorGradient)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
