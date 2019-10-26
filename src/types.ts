export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export type TodoAppState = {
  todos: Todo[];
  isLoading: boolean;
  isProcessingTodo: {
    [todoId: string]: boolean;
  };
};
