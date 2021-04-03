export interface ShoppingStateModel {
  items: ShoppingModel[];
}

export interface ShoppingModel {
  order: number;
  title: string;
  isActive: boolean;
}
