import { Todo, TodoService } from '../types';
import * as RxOperators from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';
import cuid from 'cuid';
import { Observable, of, throwError } from 'rxjs';

const database: Todo[] = [createTodo(), createTodo()];

function createTodo(): Todo {
  const id = cuid();
  return {
    id,
    title: `Todo ${id}`
  };
}

class MockTodoService implements TodoService {
  delete(todo: Todo): Observable<void> {
    return of();
  }

  findAll(): Observable<Todo[]> {
    return of(cloneDeep(database)).pipe(RxOperators.delay(1000));
  }

  getById(id: number): Observable<Todo> {
    return throwError({ status: 404 });
  }

  save(todo: Todo[]): Observable<Todo> {
    return throwError({ status: 400 });
  }
}

const todoService: MockTodoService = new MockTodoService();
export default todoService;
