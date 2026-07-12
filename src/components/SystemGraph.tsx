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

const TRACE_LINES = [
  { hop: 'gateway', event: 'route.resolve', ms: '1.2ms' },
  { hop: 'auth', event: 'jwt.verify', ms: '3.8ms' },
  { hop: 'services', event: 'handler.start', ms: '0.4ms' },
  { hop: 'postgres', event: 'query.ok', ms: '11ms' },
  { hop: 'redis', event: 'cache.hit', ms: '0.6ms' },
  { hop: 'queue', event: 'publish.ok', ms: '2.1ms' },
];

function nodePos(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function SystemGraph() {
  const [activeEdge, setActiveEdge] = useState(0);
  const [traceIdx, setTraceIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    const edgeTimer = setInterval(() => {
      setActiveEdge((i) => (i + 1) % EDGES.length);
    }, 900);
    const traceTimer = setInterval(() => {
      setTraceIdx((i) => (i + 1) % TRACE_LINES.length);
    }, 1400);
    return () => {
      cancelAnimationFrame(t);
      clearInterval(edgeTimer);
      clearInterval(traceTimer);
    };
  }, []);

  const trace = TRACE_LINES[traceIdx];

  return (
    <div className="system-graph" aria-hidden="true">
      <div className="graph-chrome">
        <span className="trace-badge mono">TRACE</span>
        <span className="chrome-meta mono">req_7f3a · GET /v1/orders</span>
        <span className="chrome-live mono">
          <span className="live-dot" />
          live
        </span>
      </div>

      <svg viewBox="0 0 520 240" className="graph-svg" role="img">
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
                style={{
                  opacity: isActive ? 1 : 0.32,
                  transition: 'opacity 0.35s ease',
                }}
              />
              {isActive && (
                <circle r="3.5" fill="var(--graph-node)">
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
        <span className="trace-line mono" key={traceIdx}>
          <span className="hop">{trace.hop}</span>
          <span className="sep">·</span>
          <span className="event">{trace.event}</span>
          <span className="ms">{trace.ms}</span>
        </span>
        <span className="latency mono">p95 · 18ms</span>
      </div>

      <style jsx>{`
        .system-graph {
          width: 100%;
          height: 100%;
          min-height: 340px;
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
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--graph-chrome-border);
          position: relative;
          z-index: 1;
        }

        .trace-badge {
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--graph-node);
          border: 1px solid var(--graph-node);
          padding: 3px 7px;
          opacity: 0.9;
        }

        .chrome-meta {
          font-size: 11px;
          color: var(--graph-muted);
          letter-spacing: 0.02em;
        }

        .chrome-live {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--graph-node);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--graph-node);
          animation: pulse-node 2s ease-in-out infinite;
        }

        .graph-svg {
          flex: 1;
          width: 100%;
          position: relative;
          z-index: 1;
          padding: 8px 0;
        }

        .graph-status {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-top: 1px solid var(--graph-chrome-border);
          font-size: 11px;
          color: var(--graph-muted);
          position: relative;
          z-index: 1;
          min-height: 44px;
        }

        .trace-line {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          animation: fade-up 0.45s ease both;
        }

        .hop {
          color: var(--graph-node);
        }

        .sep {
          opacity: 0.5;
        }

        .event {
          color: var(--text-secondary);
        }

        .ms {
          color: var(--graph-muted);
        }

        .latency {
          margin-left: auto;
          color: var(--graph-node);
          letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .system-graph {
            min-height: 280px;
          }

          .chrome-meta {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
