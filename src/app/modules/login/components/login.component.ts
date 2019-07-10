import { Router } from  '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import { User } from '../../../global/models/user-models';
import * as $AB from 'jquery';

@Component({
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../styles/login.component.css']
})

export class LoginComponent implements OnInit{
	
	constructor(private dataService: DataService, private alertService: AlertService, private router: Router, private userService: UserService){ 
		this.dataService.setUrl('http://localhost:8000/api-token-auth/');
	}

	/* validate user on submit */
	@HostListener('submit', ['$event']) 
	async loginUser(){
		event.preventDefault();
		$('#loader').css('display', 'block');
		this.alertService.clear();
		var form = event.target;
		this.dataService.payload = {'username': form['username'].value, 'password': form['password'].value};
		await this.dataService.postData();
		$('#loader').css('display', 'none');
		if(this.dataService.responseStatus != 400 && this.dataService.responseStatus != 0){
			this.userService.setCurrentUser(this.dataService.response['id'], form['username'].value, this.dataService.response['token']);
			this.router.navigate(['inbox']);
		}
	}

	ngOnInit(){
		if(this.userService.getUserId()){ this.router.navigate(['inbox']); }
		$('#loginForm').slideDown("slow", function(){ });
	}

	/* open contact component */
	contactUs(event){
		event.preventDefault();
		$('#contactModal').modal('show');
	}
	


}
