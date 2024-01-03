export const getToday = (): string => Intl.DateTimeFormat('pt-br').format(new Date())
