import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import * as jwt from 'jsonwebtoken';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from 'jwt-decode';

import Swal from 'sweetalert2';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher()
  hide = true;
  captcha:any;
  statusmsg:any;
  success:any;
  data:any;

  constructor(private router:Router,private service:LoginService){}

  formModule =new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl("",[Validators.required]),
    })

    get userName():FormControl{
      return this.formModule.get("userName") as FormControl;
   }

   get password():FormControl{
    return this.formModule.get("password") as FormControl;
 }


 ngOnInit(): void {


}




onLogin(){
  this.service.userLogin(this.formModule.value).subscribe(res=>{

    const token = res.token;
    localStorage.setItem('CurrentLoginUser', token);
    var t1 = JSON.stringify(localStorage.getItem('CurrentLoginUser'));
    let splitData= t1.split('.',2);
    let a = splitData[1];
    const decodedToken:any = jwt_decode(token);
console.warn('decodetoken',decodedToken);

    var role= decodedToken.userType
console.warn('role',role);

    if(role=='64ca0e04d16b3ceb880ee215')
    {
    this.router.navigate(['/dashboard'])
    }
    else
    {
    Swal.fire('Oops','Something wrong : Unauthorized User ','error' );
    }
  })

}

}


// this.service.userLogin(this.formModule.value).subscribe({
//   next: (user: any) =>  {
//     debugger
//     this.success = user.success;
//     this.statusmsg = user.message;
//     this.data = user.token;
//   },
//   complete: () => {
//     debugger
//     if(this.success== true)
//     {
//       var token = this.data.token;
//       localStorage.setItem('CurrentLoginUser', token);
//       var t1 = JSON.stringify(localStorage.getItem('CurrentLoginUser'));
//       let splitData= t1.split('.',2);
//       let a = splitData[1];
//       var payLoad =JSON.parse(window.atob(a));
//       var role=payLoad.TYPE;
//       if(role=='APIUSER')
//       {
//       this.router.navigate(['/dashboard'])
//       }
//       else
//       {
//       Swal.fire('Oops','Something wrong : Unauthorized User ','error' );
//       }
//     }
//     else
//     {
//       Swal.fire('Oops','Something wrong "'+this.statusmsg+'"','error' );
//     }
//   },
//   error: (err) => {
//     var e=err
//     console.log(err.error)
//     console.log(e.error)
//     Swal.fire('Oops','Something wrong "'+err.error+'"','error' );
//   }
// });