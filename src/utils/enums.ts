export const enum IngredientTypeEnum {
	BUN = 'bun',
	TOPPING = 'main',
	SAUCE = 'sauce',
}

export const enum DragObjectEnum {
	INGREDIENT = 'INGREDIENT',
	CONSTRUCTOR_ELEMENT = 'CONSTRUCTOR_ELEMENT',
}

export enum WebsocketStatus {
	OFFLINE = 'OFFLINE',
	ONLINE = 'ONLINE',
	CONNECTING = 'CONNECTING',
}

export enum OrderStatus {
	CREATED = 'created',
	PENDING = 'pending',
	DONE = 'done',
}
