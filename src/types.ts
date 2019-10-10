export interface Todo {
  id: string;
  title: string;
}

export type TodoAppState = {
  todos: Todo[];
  isLoading: boolean;
  isProcessingTodo: {
    [todoId: string]: boolean;
  };
};
