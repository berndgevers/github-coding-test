export function formatAsEnUSDate(
  val,
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) {
  const d = new Date(val);
  return d.toLocaleDateString("en-US", options);
}
