import { Selector } from "@ngxs/store";
import { ShoppingStateModel } from "./shopping-state.model";
import { ShoppingState } from "./shopping.state";

export class ShoppingSelectors {
  @Selector([ShoppingState])
  static items(state: ShoppingStateModel) {
    return state.items;
  }
}
