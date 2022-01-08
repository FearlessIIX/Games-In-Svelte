// Location: ./routes/game/stores.ts

import {  get_game_panel } from "./Panel"
import { writable } from "svelte/store"

// Default starting location for the panel for now
export const panel = writable(get_game_panel(0, 0))