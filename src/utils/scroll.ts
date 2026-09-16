export function getHashTarget(to: string): { path: string; sectionId: string | null } {
  const [path, hash] = to.split('#');

  return { path: path || '/', sectionId: hash ? hash : null };
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
