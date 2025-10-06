export interface Pack {
  key: string;
  title: string;
  price: string;
  unit: string;
  description: string;
  bullets: string[];
  accent: 'orange' | 'magenta' | 'violet' | 'gold';
  featured?: boolean;
}

export const packs: Pack[] = [
  {
    key: 'starter',
    title: 'Starter',
    price: '$2,999',
    unit: 'one-time',
    description: 'Perfect for early-stage founders validating a thesis and needing a crisp product sprint.',
    bullets: [
      '2-week roadmap & prototype',
      'Core experience build with your stack',
      'Analytics & ops instrumentation',
      'Launch kit + async enablement',
    ],
    accent: 'orange',
  },
  {
    key: 'builder',
    title: 'Builder',
    price: '$7,999',
    unit: 'project',
    description: 'The flagship engagement for teams ready to ship end-to-end product with market polish.',
    bullets: [
      '6-week product crew embedded',
      'Product design, engineering, QA',
      'Growth experiments + retention loops',
      'SwiftSend runway planning + ops docs',
    ],
    accent: 'magenta',
    featured: true,
  },
  {
    key: 'engine',
    title: 'Engine',
    price: '$15,999',
    unit: 'project',
    description: 'Scale-ready architecture, complex integrations, and automation delivered in one motion.',
    bullets: [
      'Systems design + architecture runway',
      'Data pipelines & advanced automations',
      'Compliance, monitoring, on-call setup',
      'Founder enablement + ops rituals',
    ],
    accent: 'violet',
  },
  {
    key: 'growth',
    title: 'Growth',
    price: '$12,999',
    unit: 'campaign',
    description: 'Compound your traction with full-funnel creative, paid experiments, and lifecycle orchestration.',
    bullets: [
      'Demand gen playbooks & assets',
      'Paid acquisition sprints',
      'Lifecycle & retention campaigns',
      'Experiment tracking + attribution',
    ],
    accent: 'gold',
  },
];
