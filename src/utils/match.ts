const token = process.env.DEFAULT_TOKEN

export const encryptMatch = (id: number): string => {
  return `${token}${id}${token}`
}

export const decryptMatch = (match: string): number => {
  const idString: string = match
    .replace(`${token}`, '')
    .replace(`${token}`, '')

  return parseInt(idString)
}
