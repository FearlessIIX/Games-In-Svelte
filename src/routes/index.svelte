<!-- Location: ./src/routes/index.svelte -->
<script lang="ts">
    import { panel } from "./game/stores"
    import { move_panel } from "./game/Panel"
    import { reverse_array }from "./utils/functions"
    import { Player } from "./game/Player"
    import Tile from "./Tile.svelte"

    let screen_panel: number[][];
    let panel_x: number;
    let panel_y: number;
    let player_x: number;
    let player_y: number;
    panel.subscribe(val => screen_panel = val)
    Player.panel.x.subscribe(val => panel_x = val)
    Player.panel.y.subscribe(val => panel_y = val)
    Player.absolute.x.subscribe(val => player_x = val)
    Player.absolute.y.subscribe(val => player_y = val)

    // Performs specific function based off of keycode
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
                    <Tile {index_x} {index_y} {panel_x} {panel_y} {pos}/>
                {/each}
            </div>
            {/each}
        </div>
    </div>
    <div class="flex justify-center items center">
        <div>
            Player x: {player_x}, Player y: {player_y}
        </div>
    </div>
</div>
