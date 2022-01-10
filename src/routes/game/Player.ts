// Location: ./routes/game/Player.ts

import { writable } from "svelte/store"

export const Player = {
    panel: {
        x: writable(5),
        y: writable(5)
    },
    absolute: {
        x: writable(5),
        y: writable(5)
    }
}