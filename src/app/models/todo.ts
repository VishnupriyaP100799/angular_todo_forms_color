export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt?: Date;
  priority?: 'low' | 'medium' | 'high';
}

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}
