export const clearSession = () => localStorage.clear()

export const addToken = (token: string) => localStorage.setItem('token', token)

export const getToken = () => 'Bearer ' + localStorage.getItem('token')
