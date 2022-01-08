// Location: ./routes/game/Player.ts

import { writable } from "svelte/store"

export const Player = {
    panel: {
        x: writable(3),
        y: writable(3)
    },
    absolute: {
        x: writable(3),
        y: writable(3)
    }
}