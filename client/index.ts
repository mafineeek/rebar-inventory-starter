import * as alt from 'alt-client';
import { InventoryEventNames } from '../shared/events.js';
import { useWebview } from '@Client/webview/index.js';

//On "I" key
alt.on('keyup', (key) => {
    if (key === 73) {
        alt.emitServer(InventoryEventNames.toServer.getAllItems);
    }
})

alt.onServer(InventoryEventNames.toClient.setItems, (items) => {
    useWebview().show('Inventory', 'page');
    useWebview().emit(InventoryEventNames.toWebview.configureEventsInView, items);
    useWebview().focus();
    alt.toggleGameControls(false);
})

useWebview().on(InventoryEventNames.toClient.closeInterface, () => {
    useWebview().hide('Inventory');
    useWebview().unfocus();
    alt.toggleGameControls(true);
})

alt.onServer(InventoryEventNames.toClient.closeInterface, () => {
    useWebview().hide('Inventory');
    useWebview().unfocus();
    alt.toggleGameControls(true);
})
