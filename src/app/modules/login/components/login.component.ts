import { Router } from  '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import * as $ from 'jquery';

@Component({
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../styles/login.component.css']
})

export class LoginComponent implements OnInit{
	
	constructor(private dataService: DataService, private alertService: AlertService, private router: Router){ 
		this.dataService.url = 'http://localhost:8000/user/';
	}

	/* validate user on submit */
	@HostListener('submit', ['$event']) async onSubmit(){
		this.alertService.clear();
		var form = event.target;
		// something something token authentication

	}

	
	ngOnInit(){
		$('#loginForm').slideDown("slow", function(){
			});
	}
	


}
