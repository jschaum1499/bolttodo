import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text: trimmed, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 mt-1 text-sm">{todos.filter(t => !t.completed).length} remaining</p>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            data-testid="todo-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
          />
          <button
            data-testid="add-btn"
            onClick={addTodo}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-sm transition-colors duration-150 flex items-center gap-1.5 text-sm font-medium"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {todos.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No tasks yet. Add one above!
            </div>
          )}
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border shadow-sm transition-all duration-150 ${
                todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                data-testid={`complete-${index}`}
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                className="w-5 h-5 rounded-full flex-shrink-0 cursor-pointer accent-emerald-500"
              />

              <span
                className={`flex-1 text-sm ${
                  todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
                }`}
              >
                {todo.text}
              </span>

              <button
                data-testid="delete-todo"
                onClick={() => deleteTodo(todo.id)}
                className="text-slate-400 hover:text-red-500 transition-colors duration-150 flex-shrink-0"
                aria-label="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {todos.length > 0 && todos.some(t => t.completed) && (
          <button
            onClick={() => setTodos(prev => prev.filter(t => !t.completed))}
            className="mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors duration-150 w-full text-center py-2"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
