export function formatDate(d: Date) {
  const [dayOfWeek, month, dayOfMonth, year] = [
    d.getDay(),
    d.getMonth(),
    d.getDate(),
    d.getFullYear(),
  ];

  const dayOfWeekDisplay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][dayOfWeek];

  return `${dayOfWeekDisplay}, ${month + 1}/${dayOfMonth}/${year - Math.floor(year / 1000) * 1000}`;
}
