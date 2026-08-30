export const formatDate = (date: string | null) => {
  if (!date) return "-";

  const formattedDate = new Date(date);

  return formattedDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
