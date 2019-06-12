import { DataService } from '../services/data-service/data-service.service';
import { AlertService } from '../services/alert-service/alert-service.service';
import { Router } from  '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
