import { Injectable } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from './todo-state.model';
import { AddTodo, UpdateTodo } from './todo.actions';
import { TodoSelectors } from './todo.selectors';

@Injectable()
export class TodoService {

  items: TodoModel[]

  @Select(TodoSelectors.items)
  items$: Observable<TodoModel[]>

  constructor(private store: Store, actions$: Actions) {

  }

  add(title: string) {
    this.store.dispatch(new AddTodo(title))
    this.items = this.store.selectSnapshot(TodoSelectors.items)
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }
}
