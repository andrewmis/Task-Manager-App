export function GetTodaysDate(): Date {
  return new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/'));
}
