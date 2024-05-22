import { IBaseItem } from '../types.js';
import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { CollectionNames } from '@Server/document/shared.js';

const Rebar = useRebar();
const {deleteDocument} = Rebar.database.useDatabase();

export class TestItem implements IBaseItem{
    player: alt.Player;
    data: any;

    constructor(data: any, player: alt.Player) {
        this.player = player;
        this.data = data;
    }

    name = 'test item'
    description = 'Some pre-defined in code description/category'
    icon = 'fa fa-check'
    onUse = async() => {
        const messenger = Rebar.messenger.useMessenger();
        messenger.message.send(this.player, {
            type: 'system',
            author: 'System',
            content: `[TEST ITEM] ${this.data.value1}`,
            timestamp: Date.now()
        })

        await deleteDocument(this.data._id, CollectionNames.Items);
    }
}
