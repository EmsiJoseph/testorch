export function formatFriendlyDate(date: string | number | undefined): string {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(Number(date));
  return dateObj.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}