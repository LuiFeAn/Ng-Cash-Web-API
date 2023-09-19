
export const transformUsername = (username: string ) => username.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');