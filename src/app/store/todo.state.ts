import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateOperator } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CareTaker } from '../careTaker.service';
import { Originator } from '../oroginator';
import { TodoStateModel } from './todo-state.model';
import { AddTodo, ChangeStatus, RemoveTodo, UpdateTodo, Undo } from './todo.actions';

const DEFAULT_STATE = {items: []}


@State<TodoStateModel>({
  name: 'todo',
  defaults: DEFAULT_STATE
})
@Injectable()
export class TodoState {
  caretaker: CareTaker<TodoStateModel>;

  constructor() {
    const originator = new Originator(DEFAULT_STATE);
    this.caretaker = new CareTaker(originator);
  }


  @Action(AddTodo)
  addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = ctx.getState();

    const newItem = {
      order: state.items.length + 1,
      title: action.title,
      description: '',
      isActive: true
    }

    ctx.setState({
      ...state,
      items: [
        ...state.items,
        newItem
      ]
    });

    this.caretaker.backup(ctx.getState());
    this.caretaker.showHistory();
  }

  @Action(RemoveTodo)
  removeTodo(ctx: StateContext<TodoStateModel>, action: RemoveTodo) {
    const state = ctx.getState()

    const index = state.items.findIndex(it => it.order === action.order)

    ctx.setState({
      ...state,
      items: [
        ...state.items.slice(0, index),
        ...state.items.slice(index+1),
      ]
    });

    this.caretaker.backup(ctx.getState());
    this.caretaker.showHistory();
  }

  @Action(UpdateTodo)
  updateTodo(ctx: StateContext<TodoStateModel>, action: UpdateTodo) {
    const state = ctx.getState()

    const index = state.items.findIndex(it => it.order === action.order)

    this.caretaker.backup(state);

    ctx.setState({
      ...state,
      items: [
        ...state.items.slice(0, index),
        {...state.items[index], title: action.title},
        ...state.items.slice(index+1),
      ]
    });

    this.caretaker.backup(ctx.getState());
    this.caretaker.showHistory();
  }



  @Action(ChangeStatus)
  changeStatus(ctx: StateContext<TodoStateModel>, action: ChangeStatus) {
    const state = ctx.getState()

    const index = state.items.findIndex(it => it.order === action.order)

    ctx.setState({
      ...state,
      items: [
        ...state.items.slice(0, index),
        {...state.items[index], isActive: action.status},
        ...state.items.slice(index+1),
      ]
    });

    this.caretaker.backup(ctx.getState());
    this.caretaker.showHistory();
  }

  @Action(Undo)
  undo(ctx: StateContext<TodoStateModel>) {
    const state = ctx.getState()

    debugger
    const restoredState = this.caretaker.undo()

    ctx.setState({
      ...state,
      ...restoredState
    });
  }



}
