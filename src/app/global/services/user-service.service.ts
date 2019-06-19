import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { User } from '../models/user-models';

/* global user management service */
@Injectable({
	providedIn: 'root',
})

export class UserService {
	currentUser: User;

	constructor(private router: Router){}

	logout(){
		this.router.navigate(['']);
	}




}
