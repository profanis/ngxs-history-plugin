import { Injectable } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingModel } from './shopping-state.model';
import { AddProduct, UpdateProduct } from './shopping.actions';
import { ShoppingSelectors } from './shopping.selectors';

@Injectable()
export class ShoppingService {
  items: ShoppingModel[];

  @Select(ShoppingSelectors.items)
  items$: Observable<ShoppingModel[]>;

  constructor(private store: Store, actions$: Actions) {}

  add(title: string) {
    this.store.dispatch(new AddProduct(title));
    this.items = this.store.selectSnapshot(ShoppingSelectors.items);
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateProduct(order, title));
  }
}
