import { Component, inject } from '@angular/core'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { TodoModel } from '../store/todo-state.model'
import { AddTodo, ChangeStatus, UpdateTodo } from '../store/todo.actions'
import { TodoSelectors } from '../store/todo.selectors'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TodoComponent {
  store = inject(Store)
  items$: Observable<TodoModel[]> = this.store.select(TodoSelectors.items)

  newTitle: string

  add() {
    this.store.dispatch(new AddTodo(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }

  changeToDoItemStatus(index: number, isDone: boolean) {
    this.store.dispatch(new ChangeStatus(index, isDone))
  }
}
