import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user-service.service';
import { EdadValidator } from '../../validators/edad-validator.service';
import { CellphoneValidator } from '../../validators/cellphone-validator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
      age: new FormControl('', [Validators.required, EdadValidator.validarEdad()]),
      cellphone: new FormControl('', [Validators.required, CellphoneValidator.validarCelular()]),
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
        
        const emailValue = this.surveyForm.get('email')?.value;
        this.surveyForm.reset({
          email: emailValue,
          firstName: '',
          lastName: '',
          age: '',
          cellphone: '',
          question1: '',
          question2: '',
          question3: ''
        });

        this.isLoading = false;
      }
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }
}
