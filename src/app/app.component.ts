import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from './store/todo-state.model';
import { AddTodo, UpdateTodo } from './store/todo.actions';
import { TodoSelectors } from './store/todo.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

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
