export const InventoryEventNames = {
    toServer: {
        getAllItems: 'inventory:player.getAllItems',
        useItem: 'inventory:player.useItem'
    },
    toClient: {
        setItems: 'inventory:player.setItems',
        closeInterface: 'inventory:player.closeInterface',
    },
    toWebview: {
        configureEventsInView: 'inventory:webview.configureEventsInView',
    },
}
