import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private authser:AuthService){}
  loginMode = false;
  errMessege:string = ''
 onSubmit(ele:NgForm){
  if(this.loginMode){
    this.authser.SignIn(ele.form.value.email,ele.form.value.password)
  }else{
    this.authser.SignUp(ele.form.value.email,ele.form.value.password).subscribe((respons)=>{
      console.log(respons)
    },(err)=>{
      this.errMessege = err.error.error.message;
      console.log(err)
    })
    console.log(ele.form.value.email,ele.form.value.password)
  }
 }   
}
