'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Project } from '@/data/projects';
import { useProjectHover } from './useProjectHover';
import { cn } from '@/lib/utils/cn';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [active, setActive] = useState(false);
  const { imageRef, handlePointerMove, reset } = useProjectHover();

  return (
    <article
      className={cn('portfolio-card', active ? 'is-active' : undefined)}
      aria-labelledby={`${project.key}-title`}
      tabIndex={0}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        reset();
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div
        className="portfolio-card__media"
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        role="presentation"
      >
        <div ref={imageRef} className="portfolio-card__image">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 960px) 320px, 100vw"
            priority={false}
          />
        </div>
        <span className="portfolio-card__pill" aria-hidden={!active}>
          {project.pill}
        </span>
        <Link href="#" aria-label={`Open the ${project.title} case study`} className="portfolio-card__cta">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5h10v10H5V5zm2 2v6h6V7H7zm6-3H4v13h13V6l-4-4z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>

      <div className="portfolio-card__content">
        <h3 id={`${project.key}-title`}>{project.title}</h3>
        <dl className="portfolio-card__details">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Build</dt>
            <dd>{project.build}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd>{project.outcome}</dd>
          </div>
        </dl>
        <div className="portfolio-card__progress" aria-hidden="true">
          <div className="portfolio-card__progress-rail" />
          <div
            className="portfolio-card__progress-fill"
            style={{ transform: `scaleX(${active ? Math.min(1, project.progress / 100) : 0.2})` }}
          />
        </div>
      </div>
    </article>
  );
}
