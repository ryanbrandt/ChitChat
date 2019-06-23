import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import * as $AB from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
	templateUrl: '../templates/group-settings.component.html',
	styleUrls: ['../styles/settings.component.css']
})

export class GroupSettingsComponent implements OnInit {
	updated = false;
	Object = Object;
	sub;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router, private location: Location){ }

	ngOnInit(){ 
		if(!this.userService.getUserId()){ 
			this.router.navigate(['']); 
		}
		this.dataService.getData();
	}


	/* enable and disabled update button if fields have changed */
	@HostListener('change')
	unlockUpdate(){
		if((<HTMLInputElement>document.getElementById('name')).value != this.dataService.response['name'].toString()){
			this.updated = true;
		} else {
			this.updated = false;
		}
	}

	/* update group name */
	@HostListener('submit', ['$event'])
	async updateGroup(){
		event.preventDefault();
		document.getElementById('loader').style.display = 'block';
		var form = event.target;
		this.dataService.payload = {'name': form['name'].value};
		await this.dataService.patchData();
		document.getElementById('loader').style.display = 'none';
		this.alertService.success('Group successfully updated!');
	}

	/* remove user from group */
	async leaveGroup(event){
		event.preventDefault();
		this.dataService.setUrl(`http://localhost:8000/user/${ this.userService.getUserId() }/group/${ this.dataService.getUrl().slice(-1) }`);
		await this.dataService.deleteData();
		this.alertService.success('You have been removed from the group', true);
		window.history.go(-2);
	}

	/* add users to group */
	async addToGroup(event){
		event.preventDefault();
		$('#addModal').modal('show');
		// TODO
	}

	/* return to thread came from */
	retThread(event){
		event.preventDefault();
		this.location.back();
	}
}