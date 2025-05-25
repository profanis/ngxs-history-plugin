import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Undoable } from 'ngxs-history-plugin';
import { ShoppingStateModel } from './shopping-state.model';
import {
  AddProduct,
  ChangeStatus,
  RemoveProduct,
  UpdateProduct,
} from './shopping.actions';

const DEFAULT_STATE = { items: [] };

@State<ShoppingStateModel>({
  name: 'shopping',
  defaults: DEFAULT_STATE,
})
@Injectable()
export class ShoppingState {
  constructor() { }

  @Action(AddProduct)
  @Undoable(AddProduct)
  addProduct(ctx: StateContext<ShoppingStateModel>, action: AddProduct) {
    const state = ctx.getState();

    const newItem = {
      order: state.items.length + 1,
      title: action.title,
      description: '',
      isActive: true,
    };

    ctx.setState({
      ...state,
      items: [...state.items, newItem],
    });
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<ShoppingStateModel>, action: RemoveProduct) {
    const state = ctx.getState();

    const index = state.items.findIndex((it) => it.order === action.order);

    ctx.setState({
      ...state,
      items: [...state.items.slice(0, index), ...state.items.slice(index + 1)],
    });
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ShoppingStateModel>, action: UpdateProduct) {
    const state = ctx.getState();

    const index = state.items.findIndex((it) => it.order === action.order);

    ctx.setState({
      ...state,
      items: [
        ...state.items.slice(0, index),
        { ...state.items[index], title: action.title },
        ...state.items.slice(index + 1),
      ],
    });
  }

  @Action(ChangeStatus)
  changeStatus(ctx: StateContext<ShoppingStateModel>, action: ChangeStatus) {
    const state = ctx.getState();

    const index = state.items.findIndex((it) => it.order === action.order);

    ctx.setState({
      ...state,
      items: [
        ...state.items.slice(0, index),
        { ...state.items[index], isActive: action.status },
        ...state.items.slice(index + 1),
      ],
    });
  }
}
