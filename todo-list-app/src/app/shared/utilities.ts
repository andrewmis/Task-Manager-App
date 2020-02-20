export function GetTodaysDate(): string {
  return new Date().toLocaleDateString();
}

export function GetCurrentTime(): string {
  return new Date().toLocaleTimeString();
}
