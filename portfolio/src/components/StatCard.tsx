'use client';

import { useEffect, useState, useRef } from 'react';

interface StatCardProps {
    value: string;
    label: string;
    suffix?: string;
    delay?: number;
}

const StatCard = ({ value, label, suffix = '', delay = 0 }: StatCardProps) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const timeout = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, numericValue, delay]);

    return (
        <div ref={ref} className="stat-card">
            <div className="stat-value">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="stat-label">{label}</div>

            <style jsx>{`
        .stat-card {
          text-align: center;
          padding: 24px;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .stat-value {
            font-size: 28px;
          }
        }
      `}</style>
        </div>
    );
};

export default StatCard;
