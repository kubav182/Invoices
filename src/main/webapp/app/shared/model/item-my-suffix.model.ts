export interface IItemMySuffix {
    id?: number;
    itemName?: string;
    unit?: string;
    price?: number;
}

export class ItemMySuffix implements IItemMySuffix {
    constructor(public id?: number, public itemName?: string, public unit?: string, public price?: number) {}
}
