import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import * as $AB from 'jquery';

@Component({
  templateUrl: '../templates/register.component.html',
  styleUrls: ['../styles/register.component.css']
})

export class RegisterComponent implements OnInit {

	constructor(private dataService: DataService, private alertService: AlertService, private router: Router, private userService: UserService ){
		this.dataService.setUrl('http://localhost:8000/user/');
	}

	/* register user on submit */
	@HostListener('submit', ['$event']) 
	async registerUser(){
		event.preventDefault();
		this.alertService.clear();
		$('#loader').css('display', 'block');
		var form = event.target;
		this.dataService.payload = {"username": form['username'].value, "password": form['password'].value, "phone": parseInt(form['phone'].value.split('-').join('')) };
		await this.dataService.postData();
		$('#loader').css('display', 'none')
		if(this.dataService.responseStatus != 400 && this.dataService.responseStatus != 0){	
			console.log(this.dataService.responseStatus);
			this.alertService.success('Account successfully created for ' + form['username'].value + '! Login below', true);
			this.router.navigate(['']);
		}
		
	}
	
	ngOnInit(){
		if(this.userService.getUserId()){ this.router.navigate(['inbox']); }
		$('#registerForm').slideDown('slow', function(){ });
	}
	
	/* open contact component */
	contactUs(event){
		event.preventDefault();
		$('#contactModal').modal('show');
	}


}