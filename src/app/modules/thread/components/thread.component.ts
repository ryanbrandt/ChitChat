import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from  '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import * as $AB from 'jquery';

@Component({
	templateUrl: '../templates/thread.component.html',
	styleUrls: ['../styles/thread.component.css']
})

export class ThreadComponent implements OnInit {
	Object = Object;
	private groupData: object;
	private sub;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){
			this.sub = this.router.events.subscribe((event) => {
				if(event instanceof NavigationEnd){
					// for navigating back from group settings
					if(!this.dataService.getUrl().includes('message')){
						this.dataService.setUrl(localStorage.getItem('urlTmp'));
						localStorage.removeItem('urlTmp');
					}
					this.getMessages();
				}
			})
	}

	ngOnInit(){  
		if(!this.userService.getUserId()){ 
			this.router.navigate(['']); 
		}
 	}

 	/* subscription + utility makes data robust against refresh */
	async getMessages(){
		document.getElementById('loader').style.display = 'block';
		await this.dataService.getData();
		document.getElementById('loader').style.display = 'none';
		// open websocket connection here
	}

 	@HostListener('submit', ['$event']) 
 	async sendMessage(){
 		var form = event.target;
 		// handle websocket send here
 	}

 	/* save url so we can get back, redirect to group management */
 	manageGroup(event){
 		event.preventDefault();
 		localStorage.setItem('urlTmp', this.dataService.getUrl());
 		this.dataService.setUrl(`http://localhost:8000/group/${ localStorage.getItem('urlTmp').split('/').pop() }`);
 		this.router.navigate(['settings/manage-group']);
 	}

 	ngOnDestroy(){
 		this.sub.unsubscribe();
 	}
}