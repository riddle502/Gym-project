import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-addtransferstock',
  templateUrl: './addtransferstock.component.html',
  styleUrls: ['./addtransferstock.component.css']
})
export class AddtransferstockComponent {
  quantityFormControl = new FormControl('', [Validators.required]);
  expiredateFormControl = new FormControl('', [Validators.required]);
  fromstoreFormControl = new FormControl('', [Validators.required]);
  todateFormControl = new FormControl('', [Validators.required]);
  stocknoteFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
