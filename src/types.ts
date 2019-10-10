export interface Todo {
  id: string;
  title: string;
}

export type TodoAppState = {
  todos: Todo[];
  isProcessing: boolean;
};
