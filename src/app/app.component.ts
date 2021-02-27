import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxsHistoryService, NgxsHistoryUndo } from 'ngxs-history-plugin';
import { Observable } from 'rxjs';
import { TodoModel } from './store/todo-state.model';
import { AddTodo, UpdateTodo } from './store/todo.actions';
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
  hsaUndo$: Observable<boolean>

  constructor(private store: Store, public ngxsHistoryService: NgxsHistoryService) { }

  ngOnInit(): void {
    this.hsaUndo$ =  this.ngxsHistoryService.hasUndo$('todo')

  }

  add() {
    this.store.dispatch(new AddTodo(this.newTitle))
    this.newTitle = ''
  }

  changeDescription(title: string, order: number) {
    this.store.dispatch(new UpdateTodo(order, title))
  }

  undo() {
    this.store.dispatch(new NgxsHistoryUndo())
  }
}
