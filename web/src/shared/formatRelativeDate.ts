import dayjs from "dayjs";

export function formatRelativeDate(dateInNumber: string): string {
  return dayjs().to(dayjs(Number(dateInNumber)));
}
