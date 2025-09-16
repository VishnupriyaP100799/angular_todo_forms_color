import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  // Reactive Form
  reactiveForm!: FormGroup;
  reactiveResult: any = null;
  isSubmittingReactive = false;

  // Template Form
  templateResult: any = null;
  isSubmittingTemplate = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeReactiveForm();
  }

  private initializeReactiveForm(): void {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  // Reactive Form Getters
  get name() { return this.reactiveForm.get('name'); }
  get email() { return this.reactiveForm.get('email'); }
  get phone() { return this.reactiveForm.get('phone'); }

  // Template Form Submit
  onSubmitTemplate(form: any): void {
    if (form.valid) {
      this.isSubmittingTemplate = true;
      
      // Simulate API call
      setTimeout(() => {
        this.templateResult = {
          ...form.value,
          submittedAt: new Date().toISOString(),
          formType: 'template-driven',
          id: this.generateId()
        };
        this.isSubmittingTemplate = false;
        console.log('Template Form Submitted:', this.templateResult);
      }, 1000);
    }
  }

  // Reactive Form Submit
  onSubmitReactive(): void {
    if (this.reactiveForm.valid) {
      this.isSubmittingReactive = true;
      
      // Simulate API call
      setTimeout(() => {
        this.reactiveResult = {
          ...this.reactiveForm.value,
          submittedAt: new Date().toISOString(),
          formType: 'reactive',
          id: this.generateId()
        };
        this.isSubmittingReactive = false;
        console.log('Reactive Form Submitted:', this.reactiveResult);
      }, 1000);
    }
  }

  // Download JSON
  downloadJSON(data: any, filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  // Clear All Data
  clearAllData(): void {
    this.templateResult = null;
    this.reactiveResult = null;
    this.reactiveForm.reset();
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
