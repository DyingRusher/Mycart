import { Subject, tap } from "rxjs";
import { User } from "../model/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthService{
    user = new Subject<User>();
    token:string = ''
    constructor(private http:HttpClient,private router:Router){}
    SignIn(email:string,password:string){   
       return this.http.post<any>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPXSvzJhsTgENKgicuLkJ7sIGTXQB7nvg",{
        email:email,
        password:password,
        returnSecureToken:true
       }).pipe(tap((resData)=>{
        this.token=resData.idToken  
        const user = new User(resData.email,resData.localId,resData.idToken)
        
        // this.user.next()
       }))
    }

    SignUp(email:string,password:string){

        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPXSvzJhsTgENKgicuLkJ7sIGTXQB7nvg',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap((resData)=>{
            console.log(resData)
            this.token = resData.idToken
            const newUser = new User(resData.email,resData.localId,resData.idToken)
            this.user.next(newUser)
            this.router.navigate(['/'])
            localStorage.setItem('isLogIn',JSON.stringify(newUser))
        }));

    }


    LogOut(){

    }
}