import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent {
  public openForm: FormGroup;
  public email: string = '';

  get aliases() {
    return this.openForm.get('aliases') as FormArray<
      AbstractControl<string | null>
    >;
  }

  constructor(private fb: FormBuilder) {
    const control = new FormControl('some value', { nonNullable: true });
    console.log(control.value); // 'Nancy'

    control.reset();

    console.log(control.value); // 'Drew'

    this.openForm = this.fb.group({
      firstName: new FormControl<string>('Nancy'),
      lastName: new FormControl('Nancy', { nonNullable: true }),
      address: this.fb.group<{ [key in string]: string[] }>({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      aliases: this.fb.array<AbstractControl<string | null>>([
        this.fb.control(''),
      ]),
    });
  }
  onEmailChange() {
    console.log(111111);
  }
  updateProfile() {
    this.openForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    this.openForm.controls['firstName'].reset();
    this.openForm.controls['lastName'].reset();
    // TODO: Use EventEmitter with form value
    console.warn(this.openForm.value);
  }
}
