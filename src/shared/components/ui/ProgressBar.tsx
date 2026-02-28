"use client";

import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    target: number;
    label: string;
}

export const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
    const percentage = Math.min((current / target) * 100, 100);

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-gray-600">{label}</span>
                <span className="text-xs font-medium text-primary">
                    {current.toLocaleString()} / {target.toLocaleString()} pts
                </span>
            </div>
            <div className="h-4 bg-violet-100 rounded-full overflow-hidden border border-primary/10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                />
            </div>
            <p className="text-[10px] text-gray-400 text-right italic">
                Te faltan {(target - current).toLocaleString()} puntos para tu próximo regalo
            </p>
        </div>
    );
};
