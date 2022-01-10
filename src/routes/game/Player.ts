// Location: ./routes/game/Player.ts

import { writable } from "svelte/store"

// These represent the players starting coordinates
const starting = {
    x: 10,
    y: 10
}

export const Player = {
    panel: {
        x: writable(starting.x),
        y: writable(starting.y)
    },
    absolute: {
        x: writable(starting.x),
        y: writable(starting.y)
    }
}
