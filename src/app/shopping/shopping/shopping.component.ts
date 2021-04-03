import { Component, OnInit } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { NgxsHistoryUndo } from 'ngxs-history-plugin'
import { Observable } from 'rxjs'
import { ShoppingModel } from '../store/shopping-state.model'
import { AddProduct, UpdateProduct } from '../store/shopping.actions'
import { ShoppingSelectors } from '../store/shopping.selectors'

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit {
  @Select(ShoppingSelectors.items)
  items$: Observable<ShoppingModel[]>

  newTitle: string
  hsaUndo$: Observable<boolean>
  constructor(private store: Store) {}

  ngOnInit(): void {}

  add() {
    this.store.dispatch(new AddProduct(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateProduct(order, title))
  }

  undo() {
    this.store.dispatch(new NgxsHistoryUndo())
  }
}
