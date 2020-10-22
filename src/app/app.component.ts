import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TodoService } from './store/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {

  newTitle: string

  constructor(private store: Store, public todoService: TodoService) {}

  ngOnInit() {
  }

  // add() {
  //   this.store.dispatch(new AddTodo(this.newTitle))
  //   this.newTitle = ''
  // }

  // changeDescription(title: string, order: number) {
  //   this.store.dispatch(new UpdateTodo(order, title))
  // }
}
