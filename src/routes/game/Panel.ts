// Location: ./routes/game/Panel.ts

import { map, map_size } from "./Map"
import { Player } from "./Player"
import { panel } from "./stores"
import { get } from "svelte/store"

export function get_game_panel(x: number, y: number) {
    let panel: number[][] = []
    
    // If either coordinate falls outside of acceptable bounds
    if ((y < 0 || y + Panel.size.y > map.length) || 
    (x < 0 || x + Panel.size.x > map[y].length)) {
        // For now we will default the coords to (0, 0)
        x = 0;
        y = 0;
    }

    for (let index_y = ((map.length - y)) - Panel.size.y; index_y < (map.length - y); index_y++) {
        let this_row = map[index_y]
        let app_row = []
        for (let index_x = x; index_x < x + Panel.size.x; index_x++) {
            app_row.push(this_row[index_x])
        }
        panel.push(app_row)
    }
    
    return panel
}

export function move_panel(direction: string) {
    switch (direction) {
        case "up":
            if (!(collisions(get(Player.absolute.x), get(Player.absolute.y) + 1))) break;
            // If top edge is along top border of map
            if (Panel.edges.top == map_size.y) {
                Player.panel.y.update(val => val - 1)
                Player.absolute.y.update(val => val + 1)
            }
            // Verifies that if panel moves it will not go outside of map
            else if (verify_movement(0, 1)) {
                Player.absolute.y.update(val => val + 1)
                if (!(get(Player.panel.y) == Panel.middle.y)) {
                    Player.panel.y.update(val => val - 1)
                    break
                }
                Panel.draw_point.y++
                // This updates Panel with new position                   
                panel.set(get_game_panel(Panel.draw_point.x, Panel.draw_point.y))
                // Panel bottom and top go up
                Panel.edges.top++; Panel.edges.bottom++
            }
            else if (get(Player.panel.y) < 5) {
                Player.panel.y.update(val => val - 1)
                Player.absolute.y.update(val => val + 1)
            }
            break
        case "down":
            if (!(collisions(get(Player.absolute.x), get(Player.absolute.y) - 1))) break;
            // If bottom edge is along bottom border of map
            if (Panel.edges.bottom == 0) {
                Player.panel.y.update(val => val + 1)
                Player.absolute.y.update(val => val - 1)
            }
            // Verifies that if panel moves it will not go outside of map
            else if (verify_movement(0, -1)) {
                Player.absolute.y.update(val => val - 1)
                if (!(get(Player.panel.y) == Panel.middle.y)) {
                    Player.panel.y.update(val => val + 1)
                    break
                }
                Panel.draw_point.y--
                // This updates Panel with new position
                panel.set(get_game_panel(Panel.draw_point.x, Panel.draw_point.y))
                // Panel bottom and top go down
                Panel.edges.bottom--; Panel.edges.top--                        
            }
            else if (get(Player.panel.y) > 0) {
                Player.panel.y.update(val => val + 1)
                Player.absolute.y.update(val => val - 1)
            }
            break
        case "left":
            if (!(collisions(get(Player.absolute.x) - 1, get(Player.absolute.y)))) break;
            // If left edge is along left border of map
            if (Panel.edges.left == 0) {
                Player.panel.x.update(val => val + 1)
                Player.absolute.x.update(val => val - 1)
            }
            // Verifies that if panel moves it will not go outside of map
            else if (verify_movement(-1, 0)) {
                Player.absolute.x.update(val => val - 1)
                if (!(get(Player.panel.x) == Panel.middle.x)) {
                    Player.panel.x.update(val => val + 1)
                    break
                }
                Panel.draw_point.x--
                // This updates Panel with new position                       
                panel.set(get_game_panel(Panel.draw_point.x, Panel.draw_point.y))
                // Panel left and right go left
                Panel.edges.left--; Panel.edges.right--
            }
            else if (get(Player.panel.x) > 0) {
                Player.panel.x.update(val => val + 1)
                Player.absolute.x.update(val => val - 1)
            }
            break
        case "right":
            if (!(collisions(get(Player.absolute.x) + 1, get(Player.absolute.y)))) break;
            // If right edge is along right border of map
            if (Panel.edges.right == map_size.x) {
                Player.panel.x.update(val => val - 1)
                Player.absolute.x.update(val => val + 1)
            }
            // Verifies that if panel moves it will not go outside of map
            else if (verify_movement(1, 0)) {
                Player.absolute.x.update(val => val + 1)
                if (!(get(Player.panel.x) == Panel.middle.x)) {
                    Player.panel.x.update(val => val - 1)
                    break
                }
                Panel.draw_point.x++
                // This updates Panel with new position                       
                panel.set(get_game_panel(Panel.draw_point.x, Panel.draw_point.y))
                // Panel left and right go right
                Panel.edges.left++; Panel.edges.right++
            }
            else if (get(Player.panel.x) < 5) {
                Player.panel.x.update(val => val - 1)
                Player.absolute.x.update(val => val + 1)
            }
            break            
    }
}

function verify_movement(x: number, y: number) {
    // true:
    //  x >= 0 && x <= 5
    //  y >= 0 && y <= 5
    let x2 = Panel.draw_point.x + x
    let y2 = Panel.draw_point.y + y
    return (x2 >= 0 && x2 <= map_size.x - Panel.size.x) && (y2 >= 0 && y2 <= map_size.y - Panel.size.y)
}

function collisions(x: number, y: number) {
    let index_x = x
    let index_y = (map_size.y - y) - 1
    let tile_prop = map[index_y][index_x]
    if (tile_prop == 1) return false;
    return true;
}

const size = {
    x: 20, y: 20
}

export const Panel = {
    size: {
        x: size.x, y: size.y
    },
    middle: {
        x: size.x / 2, y: size.y / 2
    },
    draw_point: {
        x: 0,
        y: 0
    },
    edges: {
        top: size.x,
        bottom: 0,
        left: 0,
        right: size.y
    }
}
