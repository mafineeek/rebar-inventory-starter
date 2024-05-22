<template>
    <div class="flex items-center justify-center ml-auto mr-auto min-h-screen min-w-screen">
        <div class="inventory bg-black bg-opacity-90 rounded-lg p-4 max-w-4xl w-full h-full max-h-[75vh] min-h-[75vh]">
            <h2 class="text-2xl font-semibold text-white mb-4">Inventory</h2>
            <div class="inventory-items overflow-y-auto max-h-[65vh]">
                <div v-for="(item, index) in items" :key="index" class="item bg-gray-800 rounded-md p-4 flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <i :class="item.icon + ' text-3xl text-white mr-4 bg-black p-3 rounded bg-opacity-30'"></i>
                        <div>
                            <p class="text-lg font-semibold text-white">{{ item.name }}</p>
                            <p class="text-gray-400">{{ item.description }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button @click="useItem(item._id)" class="action-button text-blue-500 hover:text-blue-600 border-blue-500 border-[1px] px-3 py-1 rounded">
                            <i class="fa fa-play"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useEvents } from '../../../../webview/composables/useEvents';
import { InventoryEventNames } from '../shared/events';

const events = useEvents();

export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        useItem(itemId) {
            events.emitServer(InventoryEventNames.toServer.useItem, itemId);
        }
    },
    mounted() {
        events.on(InventoryEventNames.toWebview.configureEventsInView, (data) => {
            this.items = data;
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === "Escape") {
                events.emitClient(InventoryEventNames.toClient.closeInterface);
            }
        });
    }
};
</script>

<style scoped>
.action-button {
    transition: background-color 0.3s ease;
}

/* Stolen from Stuyk's chat plugin, womp womp */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
}
</style>
