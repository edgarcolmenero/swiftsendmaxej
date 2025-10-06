export type ServiceKey =
  | 'fullstack'
  | 'data'
  | 'ai'
  | 'swiftpay'
  | 'marketing'
  | 'growth';

export interface Service {
  key: ServiceKey;
  title: string;
  copy: string;
}

export const services: Service[] = [
  {
    key: 'fullstack',
    title: 'Full-Stack Product Builds',
    copy:
      'Concept-to-launch product teams that ship modern web and mobile experiences on the stack you already run.',
  },
  {
    key: 'data',
    title: 'Data & Automation',
    copy:
      'Pipe your data into dashboards, ops automations, and financial insights that keep your crew operating in real-time.',
  },
  {
    key: 'ai',
    title: 'AI Workflows & Agents',
    copy:
      'Deploy copilots, workflow engines, and custom LLM integrations that accelerate delivery and reduce ticket queues.',
  },
  {
    key: 'swiftpay',
    title: 'SwiftPay Integrations',
    copy:
      'Embedded payments, billing reconciliation, and subscription tooling that keep revenue streams humming.',
  },
  {
    key: 'marketing',
    title: 'Demand Gen Systems',
    copy:
      'Launch landing systems, campaign microsites, and growth content that fire up your funnel.',
  },
  {
    key: 'growth',
    title: 'Lifecycle Experiments',
    copy:
      'Retention loops, referral mechanics, and analytics flows engineered to compound every customer touch.',
  },
];
