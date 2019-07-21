import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

import * as $AB from 'jquery';

@Component({
	templateUrl: '../templates/settings.component.html',
	styleUrls: ['../styles/settings.component.css']
})

export class SettingsComponent implements OnInit {
	updated = false;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){
		this.dataService.setUrl(`https://chit-chat-web-services.herokuapp.com/user/${ this.userService.getUserId() }`);
	}

	async ngOnInit(){
		await this.dataService.getData();
	}

	/* open confirmation modal on click */
	confirmDeletion(event) {
		event.preventDefault();
		$('#confirmModal').modal('show');
	}

	/* delete user account */
	async doDeletion(){
		$('#confirmModal').modal('hide');
		await this.dataService.deleteData();
		// error interceptor will throw appropriate error if not success
		if(this.dataService.responseStatus == 204){
			this.alertService.success('Account successfully deleted. Sorry to see you go!', true);
			this.userService.logout();
		}
	}
	
	/* enable and disabled update button if fields have changed */
	@HostListener('change')
	unlockUpdate(){
		if((<HTMLInputElement>document.getElementById('username')).value != this.dataService.response['username'].toString() 
			|| (<HTMLInputElement>document.getElementById('phone')).value.split('-').join('') != this.dataService.response['phone'].toString() 
			|| ((<HTMLInputElement>document.getElementById('searchable')).checked && !this.dataService.response['is_public'])
			|| (!(<HTMLInputElement>document.getElementById('searchable')).checked && this.dataService.response['is_public'])){
			this.updated = true;
		} else {
			this.updated = false;
		}
	}

	/* perform update */
	@HostListener('submit', ['$event'])
	async updateUser(){
		event.preventDefault();
		if((<HTMLElement>event.target).id != 'updateForm'){ return; }
		this.alertService.clear();
		var form = event.target;
		this.dataService.payload = {'username': form['username'].value, 'phone': form['phone'].value.split('-').join(''), 'is_public': (<HTMLInputElement>document.getElementById('searchable')).checked ? true : false };
		await this.dataService.patchData();
		this.alertService.success('Account successfully updated!');
	}

	/* open contact component */
	contactUs(event){
		event.preventDefault();
		$('#contactModal').modal('show');
	}

}