import { formatDistanceToNow } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

export const getTimeToNow = (time: number) => {
  return formatDistanceToNow(time, {
    locale: ruLocale,
    addSuffix: true,
  })
}