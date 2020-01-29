export function getHash(length = 12) {
    return Math.random().toString(36).substr(0, length)
}
export function addSign(value) {
    let number = value
    if (value >= 0 && value !== 0) {
        number = `+${number}`
    }
    return number
}
