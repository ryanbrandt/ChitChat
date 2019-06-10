import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../data-service/data-service.component';
import { AlertService } from '../alert-service/alert-service.component';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
	data: object;
	dataService: DataService;

	constructor(private http: HttpClient, private alertService: AlertService){
		this.dataService = new DataService(http, 'http://localhost:8000/user/');
	}

	@HostListener('submit', ['$event']) async onSubmit(){
		this.alertService.clear();
		event.preventDefault();
		var form = event.target;
		this.dataService.payload = {"username": form['username'].value, "password": form['password'].value, "phone": parseInt(form['phone'].value.replace('-', '')) };
		await this.dataService.postData();	
		
		if(this.dataService.responseStatus == 201){
			console.log('hi!');
		} else {
			for(var key in this.dataService.response){
				this.alertService.error(this.dataService.response[key][0]);
			}
		}
	}
	
	ngOnInit(){
		$('#registerForm').slideDown('slow', function(){
			});
	}
	


}