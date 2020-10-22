import { Selector } from '@ngxs/store';
import { TodoStateModel } from './todo-state.model';
import { TodoState } from './todo.state';

export class TodoSelectors {

  @Selector([TodoState])
  static items(state: TodoStateModel) {
    return state.items
  }
}
