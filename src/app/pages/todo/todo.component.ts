import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: TodoItem[] = [];
  
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.loadTodos();
  }

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      this.todoList.push(newTodo);
      this.saveTodos();
    }
  }

  toggleTodo(todo: TodoItem): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  trackByTodoId(index: number, todo: TodoItem): number {
    return todo.id;
  }

  private loadTodos(): void {
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem('todoList');
        if (stored) {
          this.todoList = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Error loading todos:', error);
      }
    }
  }

  private saveTodos(): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
      } catch (error) {
        console.warn('Error saving todos:', error);
      }
    }
  }
}
