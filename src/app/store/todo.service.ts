import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from './todo-state.model';
import { TodoSelectors } from './todo.selectors';

@Injectable()
export class TodoService {

  @Select(TodoSelectors.items)
  items$: Observable<TodoModel[]>

  constructor() { }
}
