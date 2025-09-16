import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
}

@Injectable({ providedIn: 'root' })
export class FormDataService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly STORAGE_KEY = 'formSubmissions';
  private submissionsSubject = new BehaviorSubject<FormSubmission[]>([]);
  submissions$ = this.submissionsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  saveFormData(data: FormSubmission): void {
    const current = this.submissionsSubject.value;
    const updated = [data, ...current];
    this.submissionsSubject.next(updated);
    this.saveToStorage(updated);
  }

  getAll(): FormSubmission[] {
    return this.submissionsSubject.value;
  }

  clearAll(): void {
    this.submissionsSubject.next([]);
    this.saveToStorage([]);
  }

  exportAllAsJSONString(): string {
    const exportData = {
      exportedAt: new Date().toISOString(),
      total: this.submissionsSubject.value.length,
      submissions: this.submissionsSubject.value
    };
    return JSON.stringify(exportData, null, 2);
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) this.submissionsSubject.next(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load form submissions:', e);
    }
  }

  private saveToStorage(data: FormSubmission[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save form submissions:', e);
    }
  }
}
