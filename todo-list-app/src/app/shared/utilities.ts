/**
 * Returns today's date as a string.
 */
export function GetTodaysDate(): string {
  return new Date().toLocaleDateString();
}

/**
 * Returns the current time as a string.
 */
export function GetCurrentTime(): string {
  return new Date().toLocaleTimeString();
}
