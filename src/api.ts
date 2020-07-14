import { Todo } from './types';

/**
 * Fetch todos from REST API endpoint
 * Take just 4 TODOs from server
 * Transform it to our defined Todo interface
 */
export async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let data = await response.json();
  data = (data as any[]).slice(1, 5).map(
    (fetchedTodo): Todo => {
      return {
        status: fetchedTodo.completed === true ? 'completed' : 'pending',
        title: fetchedTodo.title,
        id: fetchedTodo.id,
      };
    }
  );
  return data;
}
