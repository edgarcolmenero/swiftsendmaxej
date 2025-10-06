export function sectionHref(id: string): string {
  return `#${id}`;
}

export function isExternalLink(href: string): boolean {
  return /^https?:\/\//.test(href);
}
