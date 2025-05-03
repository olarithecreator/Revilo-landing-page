// Utility functions for template access and user state

export function getUniqueDownloads(downloads) {
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

export function isTemplateLocked(templateId, downloads) {
  const { uniqueDownloaded, hasReachedFreeLimit } = getUserState(downloads);
  const isFreeAfterLimit = templateId === "Black";
  if (hasReachedFreeLimit && !isFreeAfterLimit) return true;
  if (!hasReachedFreeLimit && downloads.some(d => d.templateId === templateId)) return true;
  return false;
} 