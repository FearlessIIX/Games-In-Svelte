<script lang="ts">
        // Returns the color of that position as a tailwind class
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

    export let index_x: number, panel_x, index_y, panel_y, pos;
</script>


<!-- This element is every square point in the frame -->
<div class="flex float-right w-[25px] h-[25px] {get_color(pos)}">

    <!-- If current indexes == player_coordinates -->
    {#if index_x + 1 == panel_x && index_y + 1 == panel_y}

    <!-- This represents the Player -->
    <div class="flex justify-center items-center w-full h-full">
        <div class="w-[10px] h-[10px] border-black border-0 border-solid rounded-[50%] bg-green-600"></div>
    </div>
    {/if}
</div>
