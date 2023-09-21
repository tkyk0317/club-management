import ja from "date-fns/locale/ja";
import { parseISO, format } from "date-fns";

export const formatDateTime = (date: string): string => {
  return format(parseISO(date), "yyyy-MM-dd HH:mm", { locale: ja });
};
