import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import * as $ from 'jquery';

@Component({
  templateUrl: '../templates/register.component.html',
  styleUrls: ['../styles/register.component.css']
})

export class RegisterComponent implements OnInit {

	constructor(private dataService: DataService, private alertService: AlertService, private router: Router){
		this.dataService.url = 'http://localhost:8000/user/';
	}

	/* register user on submit */
	@HostListener('submit', ['$event']) async onSubmit(){
		this.alertService.clear();
		event.preventDefault();
		var form = event.target;
		this.dataService.payload = {"username": form['username'].value, "password": form['password'].value, "phone": parseInt(form['phone'].value.replace('-', '')) };
		await this.dataService.postData();	
		
		if(this.dataService.responseStatus == 201){
			this.alertService.success('Account successfully created for ' + form['username'].value + '! Login below', true);
			this.router.navigate(['']);
		} else {
			if(this.dataService.responseStatus == 400){
				for(var key in this.dataService.response){
					this.alertService.error(this.dataService.response[key][0]);
				}
			} else {
				this.alertService.unauthorized('Sorry, Im having trouble connecting to our servers :(');
			}
		}
	}
	
	ngOnInit(){
		$('#registerForm').slideDown('slow', function(){
			});
	}
	


}