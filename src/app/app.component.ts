import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CareTaker } from './careTaker.service';
import { Originator } from './oroginator';
import { TodoModel } from './store/todo-state.model';
import { AddTodo, UpdateTodo, Undo } from './store/todo.actions';
import { TodoSelectors } from './store/todo.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @Select(TodoSelectors.items)
  items$: Observable<TodoModel[]>

  newTitle: string

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.memntoService.main();

    // const originator = new Originator('Super-duper-super-puper-super.');
    // const caretaker = new CareTaker(originator);

    // caretaker.backup();
    // originator.doSomething();

    // caretaker.backup();
    // originator.doSomething();

    // caretaker.backup();
    // originator.doSomething();

    // console.log('');
    // caretaker.showHistory();

    // console.log('\nClient: Now, let\'s rollback!\n');
    // caretaker.undo();

    // console.log('\nClient: Once more!\n');
    // caretaker.undo();
  }

  add() {
    this.store.dispatch(new AddTodo(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }

  undo() {
    this.store.dispatch(new Undo())
  }
}
