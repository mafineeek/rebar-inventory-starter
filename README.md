# Inventory Starter Plugin for Rebar Framework
This project is an **STARTER** inventory plugin designed for the Rebar framework, that can **and needs to** be extended. Interface is built with Vue 3 and TailwindCSS, and handles server-side inventory management using the Rebars database management and custom collection.

## Features
* Icon Support: Items can have icons from FontAwesome for better visual representation.
* Event-Driven: Communicates with the server using custom events.
* Customized items: Set Value[1-4] with custom values so you can handle different cases of one item type
* Factory: Items are based on custom created ItemFactory

```ts
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
```

## Installation

From the main directory of your `Rebar` installation.

```
git clone https://github.com/mafineeek/rebar-inventory-starter src/plugins/inventory
```

## API
There is no API provided for this plugin natively. It's just boilerplate to create your own inventory, so you can make it by yourself.

btw, first plugin for Rebar, cool tool 👻 
