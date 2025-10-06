export interface Project {
  key: string;
  title: string;
  pill: string;
  problem: string;
  build: string;
  outcome: string;
  image: string;
  progress: number;
}

export const projects: Project[] = [
  {
    key: 'RealtorDemo',
    title: 'SwiftSend for Realtors',
    pill: 'Real Estate Automations',
    problem: 'Manual lead routing and aging listing data slowed conversions across their three metros.',
    build: 'Unified MLS ingestion, AI listing copy, and Zapier-ready handoffs inside a custom Next.js command center.',
    outcome: 'Lead response times dropped 67% while the team shifted to a concierge nurture motion in under 45 days.',
    image: '/images/portfolio/realtor-demo.jpg',
    progress: 84,
  },
  {
    key: 'NailTechDemo',
    title: 'Nail Tech Collective',
    pill: 'Creator Commerce',
    problem: 'Stylists juggled DMs, payments, and inventory with no centralized tooling or visibility.',
    build: 'Launched SwiftPay-backed booking, real-time inventory, and content drops with a low-code marketing suite.',
    outcome: 'Average order value climbed 42% and drop-day sellouts became the norm after a single quarter.',
    image: '/images/portfolio/nail-tech-demo.jpg',
    progress: 76,
  },
  {
    key: 'PhotographerDemo',
    title: 'Lens & Light Studio',
    pill: 'Production Workflow',
    problem: 'Shoot planning, shot lists, and delivery timelines were buried in scattered docs and chats.',
    build: 'Automated shot planning, client approvals, and delivery with a secure portal plus AI moodboard assists.',
    outcome: 'Project throughput increased 55% while the crew reclaimed weekends from admin loops.',
    image: '/images/portfolio/photographer-demo.jpg',
    progress: 91,
  },
];
