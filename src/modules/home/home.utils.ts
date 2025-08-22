export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export const faviconLetter = (url: string) => hostnameOf(url)[0]?.toUpperCase() ?? "•";
