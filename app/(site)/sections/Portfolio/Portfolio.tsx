import { Container } from '@/components/layout/Container';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/features/portfolio/ProjectCard';

export function Portfolio() {
  return (
    <section id="work" className="portfolio" aria-labelledby="portfolio-heading">
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">Selected Work</span>
          <h2 className="section-heading__title" id="portfolio-heading">
            Work That Stands Out
          </h2>
          <p className="section-heading__lede">
            Founder-tested builds that prove speed and savings can live in the same sprint. Every project pushes a mission
            forward and keeps teams in the driver seat.
          </p>
        </div>

        <div className="portfolio__grid">
          {projects.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
