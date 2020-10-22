import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TodoModel } from './todo-state.model';
import { AddTodo, UpdateTodo } from './todo.actions';
import { TodoSelectors } from './todo.selectors';

@Injectable()
export class TodoService {

  // @Select(TodoSelectors.items)
  items$: Observable<TodoModel[]> = this.store.selectOnce(TodoSelectors.items)


  constructor(private store: Store, actions$: Actions) {
    actions$
      .pipe(
        ofActionDispatched(UpdateTodo, AddTodo),
        debounceTime(500),
      )
      .subscribe(title => {
        this.items$ = this.store.selectOnce(TodoSelectors.items)
      });
  }

  add(title: string) {
    this.store.dispatch(new AddTodo(title))
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }
}
