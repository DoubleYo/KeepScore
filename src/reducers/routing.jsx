export const HISTORY_BACK = 'HISTORY_BACK'

export const PAGE_ROOT = '/'
export const PAGE_SETTINGS = '/settings'
export const PAGE_PLAYERS_COUNT = '/players/count'
export const PAGE_PLAYERS_NAME = '/players/name'
export const PAGE_SCOREBOARD = '/scoreboard'
export const PAGE_CHARTS = '/charts'

export const PREVIOUS_PAGE = {
    [PAGE_ROOT]: null,
    [PAGE_SETTINGS]: HISTORY_BACK,
    [PAGE_PLAYERS_COUNT]: PAGE_ROOT,
    [PAGE_PLAYERS_NAME]: HISTORY_BACK,
    [PAGE_SCOREBOARD]: PAGE_ROOT,
    [PAGE_CHARTS]: PAGE_SCOREBOARD,
}