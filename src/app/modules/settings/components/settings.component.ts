import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
	templateUrl: '../templates/settings.component.html',
	styleUrls: ['../styles/settings.component.css']
})

export class SettingsComponent implements OnInit {
	updated = false;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService){
		this.dataService.url = `http://localhost:8000/user/${ this.userService.getUserId() }`;
	}

	async ngOnInit(){
		await this.dataService.getData();
	}
	
	/* enable and disabled update button if fields have changed */
	@HostListener('change', ['$event'])
	unlockUpdate(){
		if(document.getElementById('username').value != this.dataService.response['username'].toString() || document.getElementById('phone').value.split('-').join('') != this.dataService.response['phone'].toString()){
			this.updated = true;
		} else {
			this.updated = false;
		}
	}

}