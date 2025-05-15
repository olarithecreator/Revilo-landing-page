// Utility functions for template access and user state

export function getUniqueDownloads(downloads) {
  if (!Array.isArray(downloads)) return [];
  return Array.from(new Set(downloads.map(d => d.templateId)));
}

export function getUserState(downloads) {
  const uniqueDownloaded = getUniqueDownloads(downloads);
  const hasReachedFreeLimit = uniqueDownloaded.length >= 3;
  return {
    uniqueDownloaded,
    hasReachedFreeLimit,
  };
}

export function isTemplateLocked(template, userState) {
  const t = userState?.uniqueDownloaded;
  if (!Array.isArray(t)) return false;
  return !!(template.premiumOnly && t.some(i => i.templateId === template.id));
} 