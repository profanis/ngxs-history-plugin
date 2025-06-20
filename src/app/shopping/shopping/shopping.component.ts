import { Component, inject } from '@angular/core'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { ShoppingModel } from '../store/shopping-state.model'
import { AddProduct, UpdateProduct } from '../store/shopping.actions'
import { ShoppingSelectors } from '../store/shopping.selectors'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ShoppingComponent {
  private store = inject(Store)
  items$: Observable<ShoppingModel[]> = this.store.select(ShoppingSelectors.items)

  newTitle: string

  add() {
    this.store.dispatch(new AddProduct(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateProduct(order, title))
  }
}
