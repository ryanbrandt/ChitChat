import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	
	toggleForm(isLogin){
		if(isLogin){
			document.getElementById("loginForm").style.display="none";
			document.getElementById("loginDetail").style.display="none"
			$('#registerForm').slideDown("slow", function(){
			});
			$('#registerDetail').slideDown("slow", function(){
			});
		} else {
			document.getElementById("registerForm").style.display="none";
			document.getElementById("registerDetail").style.display="none";
			$('#loginForm').slideDown("slow", function(){
			});
			$('#loginDetail').slideDown("slow", function(){
			});
		}
	}
}
