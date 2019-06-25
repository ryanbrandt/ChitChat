import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
	templateUrl: '../templates/search-list.component.html',
	styleUrls: ['../styles/search.component.css']
})

export class SearchListComponent {
	sub;
	Object = Object;

	constructor(private dataService: DataService, private userService: UserService, private router: Router){
		this.sub = this.router.events.subscribe((event) => {
				if(event instanceof NavigationEnd){
					// prevent data loss
					this.doSearch();
				}
			});
	}
	/* perform lookup against query param */
	async doSearch(){
		document.getElementById('loader').style.display = 'block';
		this.dataService.setUrl(`http://localhost:8000/user/search/${ localStorage.getItem('searchParam') }`);
		await this.dataService.getData();
		console.log(this.dataService.response);
		document.getElementById('loader').style.display = 'none';
	}

	/* redirect user to thread with user selected */
	messageUser(event){
		event.preventDefault();
		this.dataService.setUrl(`http://localhost:8000/message/user/${ this.userService.getUserId() }/user/${ event.target.id }`);
		this.router.navigate(['thread']);
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		localStorage.removeItem('searchParam');
	}

}