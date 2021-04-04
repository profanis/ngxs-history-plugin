import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { TodoModel } from '../store/todo-state.model'
import { AddTodo, UpdateTodo } from '../store/todo.actions'
import { TodoSelectors } from '../store/todo.selectors'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Select(TodoSelectors.items)
  items$: Observable<TodoModel[]>

  newTitle: string
  constructor(private store: Store) {}

  add() {
    this.store.dispatch(new AddTodo(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }
}
