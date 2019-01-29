export function getHash(length = 12) {
    return Math.random().toString(36).substr(0, length)
}
