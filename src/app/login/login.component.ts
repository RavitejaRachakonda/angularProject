import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup

  constructor(private formbuilder: FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:[''],
      password:['']

    })
  }
login(){
 this.http.get<any>("http://localhost:4000/signupUsers")
 .subscribe(res=>{
  const user= res.find((a:any)=>{
    return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  });
  if(user){
    alert("login success");
    this.loginForm.reset();
    this.router.navigate(['dashboard']);
    localStorage.setItem('session',JSON.stringify(user.fullname))
    localStorage.setItem('email',JSON.stringify(user.email))

  }else{
    alert("user not found")
  }
 },err=>{
  alert("something went wrong")
 })
}
}
