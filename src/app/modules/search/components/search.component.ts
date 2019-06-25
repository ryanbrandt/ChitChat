import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
	template: 	'<p *ngIf="inGroup">User already in group!</p>'+
				'<p *ngIf="success">{{ user }} added to {{ group }}</p>'+
				'<form class="form-inline my-2 my-lg-0">'+
           	 		'<input class="form-control mr-sm-2 search" type="search" placeholder="Search Users" aria-label="Search" id="search">'+
        		'</form>'+
        		'<div *ngIf="len(dataService.nthResponse) == 1">'+
	        		'<ul *ngFor="let key of Object.keys(dataService.nthResponse)" class="list-group user-list">'+
	        			'<li class="list-group-item" *ngIf="dataService.nthResponse[key].username && dataService.nthResponse[key].id != userService.getUserId()">'+
	        				'{{ dataService.nthResponse[key].username }}'+
	        				'<a href="#" class="add" [attr.id]="dataService.nthResponse[key].id" (click)="addToGroup($event)">Add</a>'+
	        			'</li>'+
	        		'</ul>'+
	        	'</div>'+
	        	'<div *ngIf="len(dataService.nthResponse[0]) > 1">'+
	        		'<ul *ngFor="let key of Object.keys(dataService.nthResponse[0])" class="list-group user-list">'+
	        			'<li class="list-group-item" *ngIf="dataService.nthResponse[0][key].username && dataService.nthResponse[0][key].id != userService.getUserId()">'+
	        				'{{ dataService.nthResponse[0][key].username }}'+
	        				'<a href="#" class="add" [attr.id]="dataService.nthResponse[0][key].id" (click)="addToGroup($event)">Add</a>'+
	        			'</li>'+
	        		'</ul>'+
	        	'</div>',

    selector: 'app-search-bar',
    styleUrls: ['../styles/search.component.css']
})

export class SearchComponent {
	Object = Object;
	inGroup = false;
	success = false;
	user;
	group;

	constructor(private dataService: DataService, private userService: UserService, private alertService: AlertService){ }

	/* search to populate ul on input; maintains group-settings url with tmpUrl so we avoid data loss on modal close */
	@HostListener('input', ['$event'])
	async doSearch(){
		if((<HTMLElement>event.target).id != 'search') { return; }
		console.log((<HTMLInputElement>event.target).value);
		this.dataService.freeNthResponses();
		var tmpUrl = this.dataService.getUrl();
		this.dataService.setUrl(`http://localhost:8000/user/search/${ (<HTMLInputElement>event.target).value }`);
		await this.dataService.getData(true);
		console.log(this.len(this.dataService.nthResponse));
		this.dataService.setUrl(tmpUrl);
	}

	/* add user to group */
	async addToGroup(event){
		event.preventDefault();
		var tmpUrl = this.dataService.getUrl();
		this.dataService.setUrl('http://localhost:8000/user/group/');
		this.dataService.payload = {'user': event.target.id, 'group': localStorage.getItem('urlTmp').split('/').pop() };
		await this.dataService.postData(true);
		if(this.dataService.responseStatus == 201){
			this.inGroup = false;
			this.user = this.dataService.nthResponse[1].username;
			this.group = this.dataService.nthResponse[1].group_name;
			this.success = true;
		} else {
			this.success = false;
			this.inGroup = true;
		}
		this.dataService.freeNthResponses();
		this.dataService.setUrl(tmpUrl);
	}

	len(val){
		if(val){
			return val.length;
		}
		return 0;
	}
}