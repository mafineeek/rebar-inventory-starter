import { ItemEntityType } from './ItemEntityType.js';
import { TestItem } from '../test/TestItem.js';
import * as alt from 'alt-server';

export const ItemFactory = {
    create: (data: any, player: alt.Player) => {
        switch (data.type) {
            case ItemEntityType.TestItem:
                return new TestItem(data, player);
        }
    }
}
