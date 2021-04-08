export interface TodoStateModel {
  items: TodoModel[]
}

export interface TodoModel {
  order: number
  title: string
  isDone: boolean
}
