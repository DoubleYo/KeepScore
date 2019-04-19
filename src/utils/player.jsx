export function getPlayerKey(player) {
    return [player.hash, player.history.length].join('-')
}
