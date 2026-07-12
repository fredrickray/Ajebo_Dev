'use client';

import { useEffect, useState } from 'react';

const NODES = [
  { id: 'client', label: 'Client', x: 48, y: 120 },
  { id: 'gateway', label: 'Gateway', x: 180, y: 120 },
  { id: 'auth', label: 'Auth', x: 320, y: 48 },
  { id: 'api', label: 'Services', x: 320, y: 120 },
  { id: 'queue', label: 'Queue', x: 320, y: 192 },
  { id: 'db', label: 'Postgres', x: 460, y: 88 },
  { id: 'cache', label: 'Redis', x: 460, y: 168 },
] as const;

const EDGES: [string, string][] = [
  ['client', 'gateway'],
  ['gateway', 'auth'],
  ['gateway', 'api'],
  ['gateway', 'queue'],
  ['api', 'db'],
  ['api', 'cache'],
  ['queue', 'cache'],
];

function nodePos(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function SystemGraph() {
  const [activeEdge, setActiveEdge] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    const interval = setInterval(() => {
      setActiveEdge((i) => (i + 1) % EDGES.length);
    }, 900);
    return () => {
      cancelAnimationFrame(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="system-graph" aria-hidden="true">
      <div className="graph-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="chrome-label">request.path · live</span>
      </div>

      <svg viewBox="0 0 520 240" className="graph-svg" role="img">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--graph-node)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--graph-node)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {EDGES.map(([from, to], i) => {
          const a = nodePos(from);
          const b = nodePos(to);
          const isActive = ready && i === activeEdge;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={a.x + 36}
                y1={a.y}
                x2={b.x - 36}
                y2={b.y}
                stroke="var(--graph-line)"
                strokeWidth="1.5"
                strokeDasharray={ready ? '0' : '80'}
                className={ready ? 'edge-drawn' : ''}
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transition: 'opacity 0.35s ease',
                }}
              />
              {isActive && (
                <circle r="3.5" fill="var(--graph-node)" className="packet">
                  <animateMotion
                    dur="0.85s"
                    repeatCount="1"
                    path={`M${a.x + 36},${a.y} L${b.x - 36},${b.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {NODES.map((node, i) => {
          const lit =
            ready &&
            (EDGES[activeEdge][0] === node.id || EDGES[activeEdge][1] === node.id);
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{
                opacity: ready ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 60}ms`,
              }}
            >
              <rect
                x="-40"
                y="-16"
                width="80"
                height="32"
                rx="2"
                fill={lit ? 'var(--graph-node-lit-fill)' : 'var(--graph-node-idle-fill)'}
                stroke={lit ? 'var(--graph-node)' : 'var(--graph-node-idle-stroke)'}
                strokeWidth="1.25"
                style={{ transition: 'all 0.3s ease' }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={lit ? 'var(--graph-node)' : 'var(--graph-node-idle-text)'}
                fontSize="11"
                fontFamily="var(--font-mono), monospace"
                style={{ transition: 'fill 0.3s ease' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="graph-status">
        <span className="status-live" />
        <span>gateway → services → store</span>
        <span className="latency">p95 · healthy</span>
      </div>

      <style jsx>{`
        .system-graph {
          width: 100%;
          height: 100%;
          min-height: 320px;
          background: var(--graph-surface);
          border: 1px solid var(--graph-border);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .system-graph::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
              ellipse 70% 50% at 60% 45%,
              var(--graph-glow),
              transparent 60%
            ),
            linear-gradient(var(--graph-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--graph-grid) 1px, transparent 1px);
          background-size: auto, 28px 28px, 28px 28px;
          pointer-events: none;
        }

        .graph-chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--graph-chrome-border);
          position: relative;
          z-index: 1;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }

        .dot:nth-child(1) {
          background: #ff5f56;
        }
        .dot:nth-child(2) {
          background: #ffbd2e;
        }
        .dot:nth-child(3) {
          background: #27c93f;
        }

        .chrome-label {
          margin-left: auto;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--graph-muted);
          letter-spacing: 0.04em;
        }

        .graph-svg {
          flex: 1;
          width: 100%;
          position: relative;
          z-index: 1;
          padding: 8px 0;
        }

        .edge-drawn {
          animation: draw-line 0.8s ease forwards;
        }

        .graph-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-top: 1px solid var(--graph-chrome-border);
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--graph-muted);
          position: relative;
          z-index: 1;
        }

        .status-live {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--graph-node);
          animation: pulse-node 2s ease-in-out infinite;
        }

        .latency {
          margin-left: auto;
          color: var(--graph-node);
        }

        @media (max-width: 768px) {
          .system-graph {
            min-height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
