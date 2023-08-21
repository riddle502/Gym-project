import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-customorsreturn',
  templateUrl: './customorsreturn.component.html',
  styleUrls: ['./customorsreturn.component.css']
})
export class CustomorsreturnComponent implements OnInit{

  customtaxFormControl = new FormControl('', [Validators.required]);
  discountFormControl = new FormControl('', [Validators.required]);
  shipingFormControl = new FormControl('', [Validators.required]);
  statusFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    // tabItems
    const tabItems = document.querySelectorAll('.btn');
    const tabContentItems = document.querySelectorAll('.tabcontent');
   
    function selectItem(this: any, e: any) {
      removeBorder();
      removeShow();
      this.classList.add('active');
      const tabContentItem = document.querySelector(`#${this.id}-content`);
      tabContentItem?.classList.add('show');
    }
   
    function removeBorder() {
      tabItems.forEach(item => {
        item.classList.remove('active');
      });
    }
   
    function removeShow() {
      tabContentItems.forEach(item => {
        item.classList.remove('show');
      });
    }
   
    tabItems.forEach(item => {
      item.addEventListener('click', selectItem);
    });
    // tabItems
     }
}
