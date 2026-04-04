'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    link?: string;
    featured?: boolean;
}

const ProjectCard = ({
    title,
    description,
    image,
    tags,
    category,
    link = '#',
    featured = false
}: ProjectCardProps) => {
    return (
        <div className={`project-card ${featured ? 'featured' : ''}`}>
            <div className="project-image">
                <Image
                    src={image}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <div className="project-overlay">
                    <Link href={link} className="view-btn">
                        View Project
                    </Link>
                </div>
            </div>

            <div className="project-content">
                <div className="project-meta">
                    <span className="category">{category}</span>
                </div>
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{description}</p>
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .project-card.featured {
          grid-column: span 2;
        }

        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .project-card.featured .project-image {
          height: 280px;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(18, 18, 18, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .view-btn {
          padding: 12px 24px;
          background: var(--primary);
          color: var(--bg-primary);
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: var(--primary-light);
          transform: scale(1.05);
        }

        .project-content {
          padding: 20px;
        }

        .project-meta {
          margin-bottom: 12px;
        }

        .category {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(10, 186, 181, 0.15);
          color: var(--primary);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 4px 10px;
          background: var(--bg-secondary);
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .project-card.featured {
            grid-column: span 1;
          }

          .project-card.featured .project-image {
            height: 200px;
          }
        }
      `}</style>
        </div>
    );
};

export default ProjectCard;
