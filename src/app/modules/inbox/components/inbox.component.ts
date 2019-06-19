import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from  '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
  templateUrl: '../templates/inbox.component.html',
  styleUrls: ['../styles/inbox.component.css']
})

export class InboxComponent implements OnInit {
	Object = Object;
	// not elegent, but pass Object to template to iterate over API response
	loader;
	isLoaded = false;

	ngOnInit(){  
		if(!this.userService.currentUser){ this.router.navigate(['']); }
		this.loader = document.getElementById('loader');
 		this.toggleActive(false);
 	}

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){ 
		this.dataService.url = `http://localhost:8000/inbox/${ this.userService.currentUser.userId }`;
	}

	async toggleActive(isInit = true) {  
		if(isInit){
			this.alertService.clear();
		    $('.tab').removeClass('active');
		    $(event.target).addClass('active');
		}
	    this.isLoaded = false;
	    this.loader.style.display = "block";
	    // this.dataService.url = 'my endpoint for the button clicked, still to create :P';
	    await this.dataService.getData();
	    this.loader.style.display = "none";
	    this.isLoaded = true;
 	}

 	isEmpty(){
 		return !this.dataService.response || Object.keys(this.dataService.response).length == 0;
 	}

}
