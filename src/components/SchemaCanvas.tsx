'use client';

import { useMemo, useState } from 'react';
import type { SchemaDesign, SchemaTable } from '@/data/systemDesigns';

const TABLE_W = 210;
const HEADER_H = 30;
const ROW_H = 21;
const FIELD_PAD = 6;

function tableHeight(t: SchemaTable) {
  return HEADER_H + t.fields.length * ROW_H + FIELD_PAD;
}

function fieldY(t: SchemaTable, fieldName: string) {
  const idx = Math.max(0, t.fields.findIndex((f) => f.name === fieldName));
  return t.y + HEADER_H + idx * ROW_H + ROW_H / 2 + 2;
}

export default function SchemaCanvas({ schema }: { schema: SchemaDesign }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const tableById = useMemo(() => {
    const map = new Map<string, SchemaTable>();
    schema.tables.forEach((t) => map.set(t.id, t));
    return map;
  }, [schema]);

  const relatedTo = (tableId: string) =>
    schema.relations.some(
      (r) => (r.from === hovered && r.to === tableId) || (r.to === hovered && r.from === tableId)
    );

  return (
    <div className="schema-canvas">
      <div className="schema-chrome">
        <span className="schema-badge mono">SCHEMA</span>
        <span className="schema-meta mono">
          {schema.tables.length} tables · {schema.relations.length} relations
        </span>
        <span className="schema-hint mono">hover a table</span>
      </div>

      <div className="schema-scroll">
        <svg
          viewBox={`0 0 ${schema.width} ${schema.height}`}
          className="schema-svg"
          style={{ minWidth: Math.min(schema.width, 820) }}
          role="img"
          aria-label="Database schema diagram"
        >
          <defs>
            <marker
              id="rel-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="var(--graph-node)" />
            </marker>
          </defs>

          {/* relation lines under the tables */}
          {schema.relations.map((rel, i) => {
            const a = tableById.get(rel.from);
            const b = tableById.get(rel.to);
            if (!a || !b) return null;

            const aRight = a.x + TABLE_W;
            const bRight = b.x + TABLE_W;
            const y1 = fieldY(a, rel.fromField);
            const y2 = fieldY(b, rel.toField);

            // choose closest horizontal edges
            let x1: number;
            let x2: number;
            if (bRight + 20 < a.x) {
              x1 = a.x;
              x2 = bRight;
            } else if (aRight + 20 < b.x) {
              x1 = aRight;
              x2 = b.x;
            } else {
              // stacked vertically — route out the right side of both
              x1 = aRight;
              x2 = bRight;
              const bend = Math.max(x1, x2) + 34;
              const active =
                hovered !== null && (hovered === rel.from || hovered === rel.to);
              return (
                <path
                  key={i}
                  d={`M${x1},${y1} C${bend},${y1} ${bend},${y2} ${x2},${y2}`}
                  fill="none"
                  stroke={active ? 'var(--graph-node)' : 'var(--graph-line)'}
                  strokeWidth={active ? 1.8 : 1.1}
                  markerEnd={active ? 'url(#rel-arrow)' : undefined}
                  opacity={hovered === null ? 0.55 : active ? 1 : 0.15}
                  style={{ transition: 'opacity 0.25s ease, stroke 0.25s ease' }}
                />
              );
            }

            const dx = Math.abs(x2 - x1);
            const c = Math.min(dx * 0.45, 70) * (x2 > x1 ? 1 : -1);
            const active = hovered !== null && (hovered === rel.from || hovered === rel.to);
            return (
              <path
                key={i}
                d={`M${x1},${y1} C${x1 + c},${y1} ${x2 - c},${y2} ${x2},${y2}`}
                fill="none"
                stroke={active ? 'var(--graph-node)' : 'var(--graph-line)'}
                strokeWidth={active ? 1.8 : 1.1}
                markerEnd={active ? 'url(#rel-arrow)' : undefined}
                opacity={hovered === null ? 0.55 : active ? 1 : 0.15}
                style={{ transition: 'opacity 0.25s ease, stroke 0.25s ease' }}
              />
            );
          })}

          {schema.tables.map((table) => {
            const h = tableHeight(table);
            const dimmed = hovered !== null && hovered !== table.id && !relatedTo(table.id);
            const lit = hovered === table.id;
            return (
              <g
                key={table.id}
                transform={`translate(${table.x}, ${table.y})`}
                onMouseEnter={() => setHovered(table.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: dimmed ? 0.35 : 1,
                  transition: 'opacity 0.25s ease',
                  cursor: 'default',
                }}
              >
                <rect
                  width={TABLE_W}
                  height={h}
                  rx="5"
                  fill="var(--bg-card)"
                  stroke={lit ? 'var(--graph-node)' : 'var(--graph-border)'}
                  strokeWidth={lit ? 1.5 : 1}
                  style={{ transition: 'stroke 0.25s ease' }}
                />
                <path
                  d={`M0,${HEADER_H} L${TABLE_W},${HEADER_H}`}
                  stroke="var(--graph-chrome-border)"
                  strokeWidth="1"
                />
                <text x="12" y="20" className="table-name" fill={lit ? 'var(--graph-node)' : 'var(--text-primary)'}>
                  {table.name}
                </text>
                {table.store && (
                  <text x={TABLE_W - 10} y="19" textAnchor="end" className="table-store" fill="var(--graph-muted)">
                    {table.store}
                  </text>
                )}
                {table.fields.map((field, fi) => {
                  const y = HEADER_H + fi * ROW_H + ROW_H / 2 + 6;
                  return (
                    <g key={field.name}>
                      {field.key && (
                        <text x="12" y={y} className="field-key" fill="var(--graph-node)">
                          {field.key === 'pk' ? '⬦' : '↗'}
                        </text>
                      )}
                      <text
                        x="26"
                        y={y}
                        className="field-name"
                        fill={field.key ? 'var(--text-primary)' : 'var(--text-secondary)'}
                      >
                        {field.name}
                      </text>
                      <text x={TABLE_W - 12} y={y} textAnchor="end" className="field-type" fill="var(--graph-muted)">
                        {field.type}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <style jsx>{`
        .schema-canvas {
          border: 1px solid var(--graph-border);
          border-radius: var(--radius);
          background: var(--graph-surface);
          overflow: hidden;
        }

        .schema-chrome {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--graph-chrome-border);
          font-size: 11px;
        }

        .schema-badge {
          color: var(--graph-node);
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        .schema-meta {
          color: var(--text-secondary);
        }

        .schema-hint {
          margin-left: auto;
          color: var(--graph-muted);
        }

        .schema-scroll {
          overflow-x: auto;
          padding: 8px;
          background-image: radial-gradient(var(--graph-grid) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .schema-svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .schema-svg :global(.table-name) {
          font-family: var(--font-mono), monospace;
          font-size: 12.5px;
          font-weight: 600;
        }

        .schema-svg :global(.table-store) {
          font-family: var(--font-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.5px;
        }

        .schema-svg :global(.field-name) {
          font-family: var(--font-mono), monospace;
          font-size: 10.5px;
        }

        .schema-svg :global(.field-type) {
          font-family: var(--font-mono), monospace;
          font-size: 9.5px;
        }

        .schema-svg :global(.field-key) {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
        }

        @media (max-width: 640px) {
          .schema-hint {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
