import { Observable } from 'rxjs';

export interface Todo {
  id: string;
  title: string;
}

export type TodoAppState = {
  todos: Todo[];
  isProcessing: boolean;
};

export interface TodoService {
  findAll(): Observable<Todo[]>;

  getById(id: number): Observable<Todo>;

  save(todo: Todo[]): Observable<Todo>;

  delete(todo: Todo): Observable<void>;
}
