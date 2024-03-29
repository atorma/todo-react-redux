import { Todo } from '../types';
import cuid from 'cuid';
import { Observable, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import _ from 'lodash';

const BASE_URL = 'http://localhost:3001/todos';

class TodoService implements TodoService {
  findAll(): Observable<Todo[]> {
    return fromFetch(BASE_URL).pipe(handleJsonResponse);
  }

  getById(id: string): Observable<Todo> {
    return fromFetch(`${BASE_URL}/${id}`).pipe(handleJsonResponse);
  }

  save(todo: Todo): Observable<Todo> {
    if (!todo) {
      return throwError(new Error('Empty todo'));
    }
    const requestInit: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    };
    if (_.isEmpty(todo.id)) {
      todo.id = cuid();
      return fromFetch(BASE_URL, Object.assign(requestInit, { method: 'POST' })).pipe(
        handleJsonResponse
      );
    } else {
      return fromFetch(
        `${BASE_URL}/${todo.id}`,
        Object.assign(requestInit, { method: 'PUT' })
      ).pipe(handleJsonResponse);
    }
  }

  delete(todo: Todo): Observable<Todo> {
    if (!todo || !todo.id) {
      return of(todo);
    }
    return fromFetch(`${BASE_URL}/${todo.id}`, { method: 'DELETE' }).pipe(
      switchMap((response: Response) => {
        if (!response.ok) {
          throw response;
        }
        return of(todo);
      })
    );
  }
}

const handleJsonResponse = switchMap(
  (response: Response): Promise<any> => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }
);

const todoService: TodoService = new TodoService();
export default todoService;
