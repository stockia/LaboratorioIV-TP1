import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();
  surveyForm: FormGroup;
  isLoading: boolean = false;

  constructor(private firestore: Firestore, private userService: UserService) {
    this.surveyForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.userService.userEmail, [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      question1: new FormControl('', Validators.required),
      question2: new FormControl('', Validators.required),
      question3: new FormControl('', Validators.required),
      date: new FormControl(new Date().toISOString()),
    });
  }

  async onSubmit() {
    try {
      if (this.surveyForm.valid) {
        this.isLoading = true;
        let collectionDB = collection(this.firestore, 'survey-results');
        await addDoc(collectionDB, this.surveyForm.value);
        this.isLoading = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  close() {
    this.closeForm.emit();
  }
}
