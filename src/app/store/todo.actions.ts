import { Undoable } from 'ngxs-history-plugin'

@Undoable
export class AddTodo {
  static readonly type = '[Todo] Add todo'
  constructor(public title: string) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove todo'
  constructor(public order: number, public title: string) {}
}

export class UpdateTodo {
  static readonly type = '[Todo] Update todo'
  constructor(public order: number, public title: string) {}
}
export class ChangeStatus {
  static readonly type = '[Todo] Change status'
  constructor(public order: number, public title: string, public status: boolean) {}
}
