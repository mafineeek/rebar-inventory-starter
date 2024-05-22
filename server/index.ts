import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';
import { useCharacter } from '@Server/document/index.js';
import { IItemDocument } from './types.js';
import { CollectionNames } from '@Server/document/shared.js';
import { InventoryEventNames } from '../shared/events.js';
import { ItemFactory } from './entities/ItemFactory.js';
import { ItemEntityType } from './entities/ItemEntityType.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const { get, create, getMany } = Rebar.database.useDatabase();
const chat = Rebar.useApi().get('chat-api');

// Command to create a test item, only for debug purposes
messenger.commands.register({
    name: 'createTest',
    desc: 'Creates test item',
    callback: createTestItem
});

function createTestItem(player: alt.Player, ...args) {
    if (args.length < 1) {
        return messenger.message.send(player, {
            type: 'alert',
            content: 'Provide test item Value1',
            author: 'System'
        });
    }

    const character = useCharacter(player).get();
    const itemData: Partial<IItemDocument> = {
        type: ItemEntityType.TestItem,
        name: 'Example item',
        characterId: character._id,
        value1: args.join(' ')
    };

    try {
        const item = create<Partial<IItemDocument>>(itemData, CollectionNames.Items);
        messenger.message.send(player, {
            type: 'system',
            author: 'System',
            content: 'Created example item ' + item,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('Error creating item:', error);
        messenger.message.send(player, {
            type: 'alert',
            content: 'Error creating item',
            author: 'System'
        });
    }
}

alt.onClient(InventoryEventNames.toServer.getAllItems, handleGetAllItems);

async function handleGetAllItems(player: alt.Player) {
    if (chat.isChatting(player)) return;

    const character = useCharacter(player).get();
    try {
        const items = await getMany<Partial<IItemDocument>>({ characterId: character._id }, CollectionNames.Items);
        const mappedItems = items.map(item => mapItem(item, player));
        alt.emitClient(player, InventoryEventNames.toClient.setItems, mappedItems);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function mapItem(item: Partial<IItemDocument>, player: alt.Player) {
    const bakedItem = ItemFactory.create(item, player);
    return {
        name: item.name,
        description: bakedItem.description,
        icon: bakedItem.icon,
        _id: item._id
    };
}

alt.onClient(InventoryEventNames.toServer.useItem, handleUseItem);

async function handleUseItem(player: alt.Player, itemId: string) {
    const character = useCharacter(player).get();
    try {
        const item = await get<IItemDocument>({ _id: itemId }, CollectionNames.Items);
        if (item && item.characterId === character._id) {
            alt.emitClient(player, InventoryEventNames.toClient.closeInterface);
            const bakedItem = ItemFactory.create(item, player);
            await bakedItem.onUse();
        }
    } catch (error) {
        console.error('Error using item:', error);
    }
}
