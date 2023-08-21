import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreateuserService } from './createuser.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-creatuser',
  templateUrl: './creatuser.component.html',
  styleUrls: ['./creatuser.component.css']
})
export class CreatuserComponent {

  userTypes:any=[]
  statusMsg:any=''

  displayedColumns: string[] = ['name', 'email', 'mobileNo','isActive'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required]);
  usertypeFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required,]);
  designationFormControl = new FormControl('', [Validators.required]);
  selectstoreFormControl = new FormControl('', [Validators.required]);
  statusFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();


  formModule = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("", [Validators.required]),
    userType: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    Description: new FormControl("", [Validators.required]),
    selectStore: new FormControl("", [Validators.required]),
    Status: new FormControl("", [Validators.required]),
  })

  constructor(private service:CreateuserService,private router:Router){}

  createUser(){

  // console.log(this.formModule.value)
    this.service.addUser(this.formModule.value).subscribe(res=>{
      if(res.statusCode==1){

        this.statusMsg=res.message

        Swal.fire('Done',this.statusMsg,'success')
        .then(result => {
          if (result.isConfirmed) {
            this.formModule.reset()
            this.router.navigate(['/createstore']);
          }
        });

      }

      console.log("res==>",res)
    })


  }

  ngOnInit(): void {

    const userdetail={
      userType:'64ce2d4dcfc9555220356f74'
    }

    this.getUser(userdetail)


    this.getusertype()
    // tabItems
    const tabItems = document.querySelectorAll('.createuser .btn');
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

  getusertype(){
      this.service.getuserType().subscribe(res=>{

        for(let type of res.data){
            if(type.name!=='admin')
            this.userTypes.push(type)
        }
        console.log("types--->",this.userTypes)
      })
     }


  getUser(userT:any){
      console.log("usert-->",userT)
      this.service.getUserUserType(userT).subscribe(res=>{

    console.log("response--->",res)
      this.dataSource=res.data

      })

     }


}
