# ngxs-history-plugin

## How to use

1. Install from NPM
2. Import the module in the `app.module`
3. Use the `undoable` decorator
4. Dispatch the `undo` action

### 1. Install from `NPM`

If you use **npm**

```
npm i ngxs-history-plugin
```

If you use **yarn**

```
yarn add ngxs-history-plugin
```

### 2. Import the module in the `app.module`

Import the package module

```
import { NgxsHistoryModule } from 'ngxs-history-plugin'
```

Import the Angular module

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsHistoryModule.forRoot(), // <-- import the module
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 3. Use the `undoable` decorator

Set the `undoable` decorator in the state file for the actions you want to handle.

**Example:**

```ts
@Action(AddTodo)
@Undoable(AddTodo) // <-- set the decorator and provide the action to handle
addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
  const state = ctx.getState()

  const newItem = {
    title: action.title,
  }

  ctx.setState({
    ...state,
    items: [...state.items, newItem],
  })
}

```

### 4. Dispatch the `undo` action

Import the Undo Action

```ts
import { NgxsHistoryUndo } from 'ngxs-history-plugin'
```

Dispatch the action

```ts
undo() {
  this.store.dispatch(new NgxsHistoryUndo());
}
```

---

**Enjoy :)**
