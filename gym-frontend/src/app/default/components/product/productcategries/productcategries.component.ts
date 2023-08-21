import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-productcategries',
  templateUrl: './productcategries.component.html',
  styleUrls: ['./productcategries.component.css']
})
export class ProductcategriesComponent {

  categoryFormControl = new FormControl('', [Validators.required]);
  subcategoryFormControl = new FormControl('', [Validators.required]);



  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data:ProductcategriesComponent) {}
}
