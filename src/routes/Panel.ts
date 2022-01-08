import { map } from './Map'

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

export function reverse_array(arr: any[]) {
    let ret = []
    // Uses index based reverse method
    for (let i = arr.length - 1; i >= 0; i--) 
        ret.push(arr[i])
    
        return ret
}
export const Panel = {
    size: {
        x: 5, y: 5
    },
    middle: {
        x: 3, y: 3
    }
}
// Mutable object for panel coords
export let position = {x: 0, y: 0}
export let edges = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 5
}