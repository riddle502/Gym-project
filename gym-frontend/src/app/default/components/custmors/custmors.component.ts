import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

 export interface PeriodicElement {
  Sno: number;
  Mobile: number;
  Name: string;
  Email: any;
  Receipt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Sno: 1, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 2, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 3, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 4,Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 5, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 6, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 7, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 8, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 9, Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
  {Sno: 10,Mobile: 88777878788, Name:'Sumit', Email: '-',Receipt:'view',},
];


@Component({
  selector: 'app-custmors',
  templateUrl: './custmors.component.html',
  styleUrls: ['./custmors.component.css']
})
export class CustmorsComponent implements OnInit{


  displayedColumns: string[] = ['Sno',  'Mobile', 'Name','Email','Receipt','Actions'];
  dataSource = ELEMENT_DATA;

  customoridFormControl = new FormControl('', [Validators.required,]);
  customornameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  customormobileFormControl = new FormControl('', [Validators.required]);
  customoraddressFormControl = new FormControl('', [Validators.required]);
  customorgstFormControl = new FormControl('', [Validators.required]);
  stateFormControl = new FormControl('', [Validators.required]);

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
