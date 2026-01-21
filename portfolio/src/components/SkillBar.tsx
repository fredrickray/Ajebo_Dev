'use client';

interface SkillBarProps {
    name: string;
    level: number;
    icon?: string;
}

const SkillBar = ({ name, level, icon }: SkillBarProps) => {
    return (
        <div className="skill-bar">
            <div className="skill-header">
                <div className="skill-info">
                    {icon && <span className="skill-icon">{icon}</span>}
                    <span className="skill-name">{name}</span>
                </div>
                <span className="skill-level">{level}%</span>
            </div>
            <div className="skill-progress">
                <div className="skill-fill" style={{ width: `${level}%` }}></div>
            </div>

            <style jsx>{`
        .skill-bar {
          margin-bottom: 20px;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .skill-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .skill-icon {
          font-size: 16px;
        }

        .skill-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .skill-level {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .skill-progress {
          height: 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
          border-radius: 4px;
          transition: width 1s ease;
        }
      `}</style>
        </div>
    );
};

export default SkillBar;
