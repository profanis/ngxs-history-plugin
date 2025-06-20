import { Component } from '@angular/core'
import { Store } from '@ngxs/store'
import { NgxsHistoryModule, NgxsHistoryUndo } from 'ngxs-history-plugin'
import { TodoComponent } from './todo/todo/todo.component'
import { ShoppingComponent } from './shopping/shopping/shopping.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TodoComponent, ShoppingComponent, FormsModule, NgxsHistoryModule],
})
export class AppComponent {
  constructor(private store: Store) { }

  undo() {
    this.store.dispatch(new NgxsHistoryUndo())
  }
}
