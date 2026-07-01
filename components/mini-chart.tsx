"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export function MiniChart({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) {
  // A tiny wrapper around Recharts to make the stat cards look great
  return (
    <div className="h-12 w-full mt-4 -mx-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: '#fff' }}
            cursor={false}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 4, fill: color, stroke: '#18181b', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
