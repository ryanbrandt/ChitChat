import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { User } from '../models/user-models';

/* global user management service */
@Injectable({
	providedIn: 'root',
})
export class UserService {

	constructor(private router: Router){}

	/* "login"- save user identifying data to local store */
	setCurrentUser(userId: string, username: string, token: string){
		// TODO: hash token for security
		localStorage.setItem('userId', userId);
		localStorage.setItem('username', username);
		localStorage.setItem('token', token);
	}

	getUserId(){
		return localStorage.getItem('userId');
	}

	getUsername(){
		return localStorage.getItem('username');
	}

	getToken(){
		return localStorage.getItem('token');
	}

	logout(){
		localStorage.clear();
		this.router.navigate(['']);
	}

}