<script lang="ts">
    import { panel } from "./stores"
    import { Panel, reverse_array,  position, edges, get_game_panel } from "./Panel"
    import { map, map_size } from "./Map"
    import { player_location } from "./Player"

    let screen_panel;
    panel.subscribe(val => screen_panel = val)

    function get_color(pos: number) {
        switch (pos) {
            case 0:
                return "bg-white"
            case 1:
                return "bg-black"
            case 2:
                return "bg-amber-900"        
        }
    }
    function handleKeydown(event) {
        let keycode = event.keyCode

        if (keycode > 36 && keycode < 41)
            switch (keycode) {
                case 37:
                    move_panel("left")
                    break
                case 38:
                    move_panel("up")
                    break
                case 39:
                    move_panel("right")
                    break
                case 40:
                    move_panel("down")
                    break            
            }
    }
    function move_panel(direction: string) {
        console.log()
        console.log(edges, player_location)
        switch (direction) {
            case "up":
                if (edges.top == map_size.y) player_location.y--
                else if (verify_movement(0, 1)) {
                    console.log("bruh")
                    position.y += 1
                    panel.set(get_game_panel(position.x, position.y))
                    edges.top++
                    edges.bottom++
                }
                else {
                    if (player_location.y < 5) player_location.y--
                }
                break
            case "down":
                if (edges.bottom == 0) player_location.y++
                else if (verify_movement(0, -1)) {
                    console.log("bruh")
                    position.y -= 1
                    panel.set(get_game_panel(position.x, position.y))
                    edges.bottom--
                    edges.top--
                }
                else {
                    if (player_location.y > 0) player_location.y++
                }
                break
            case "left":
                if (edges.left == 0) player_location.x++
                else if (verify_movement(-1, 0)) {
                    console.log("bruh")
                    position.x -= 1
                    panel.set(get_game_panel(position.x, position.y))
                    edges.left--
                    edges.right--
                }
                else {
                    if (player_location.x > 0) player_location.x++
                }
                break
            case "right":
                if (edges.right == map_size.x) player_location.x--
                else if (verify_movement(1, 0)) {
                    console.log("bruh")
                    position.x += 1
                    panel.set(get_game_panel(position.x, position.y))
                    edges.left++
                    edges.right++
                }
                else {
                    if (player_location.x < 5) player_location.x--
                }
                break            
        }
        console.log(edges, player_location)
    }
    function verify_movement(x: number, y: number) {
        // true:
        //  x >= 0 && x <= 5
        //  y >= 0 && y <= 5
        let x2 = position.x + x
        let y2 = position.y + y
        return (x2 >= 0 && x2 <= map_size.x - Panel.size.x) && (y2 >= 0 && y2 <= map_size.y - Panel.size.y)
    }
</script>

<!-- Keypress listener -->
<svelte:window on:keydown={handleKeydown}/>

<!-- Content Container -->
<div class="w-screen">

    <div class="flex justify-center items-center">
        <!-- Game Panel -->
        <div class="border-gray-600 border-2 border-solid">
            <!-- Each row of subscription -->
            {#each screen_panel as row, index_y}
            <div>
                <!-- Each item in row (reverse order) -->
                {#each reverse_array(row) as pos, index_x}

                <div class="flex float-right w-[25px] h-[25px] {get_color(pos)}">
                    <!-- If current indexes == player_coordinates -->
                    {#if index_x + 1 == player_location.x && index_y + 1 == player_location.y}

                    <div class="flex justify-center items-center w-full h-full">

                        <div class="w-[10px] h-[10px] border-black border-0 border-solid rounded-[50%] bg-green-600"></div>
                    </div>
                    {/if}
                </div>
                {/each}
            </div>
            {/each}
        </div>
    </div>
</div>
