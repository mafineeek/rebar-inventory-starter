import * as alt from 'alt-server';
import { ItemEntityType } from './entities/ItemEntityType.js';

export interface IBaseItem {
    name: string;
    description: string;
    icon: string;
    onUse?: (player: alt.Player, itemId: string) => void;
}

type BaseDocument = { _id: string };

export interface IItemDocument extends BaseDocument{
    type: string;
    name: string;
    value1?: string | number | null;
    value2?: number | string | null;
    value3?: number | string | null;
    value4?: number | string | null;
    characterId?: string | null;
    groundPosX?: number | null;
    groundPosY?: number | null;
    groundPosZ?: number | null;
    groundDimension?: string | null;
}
