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
	curTab = 'user';

	ngOnInit(){  
		if(!this.userService.getUserId()){ this.router.navigate(['']); }
		this.loader = document.getElementById('loader');
 		this.toggleActive(false);
 	}

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){ 
		this.dataService.url = `http://localhost:8000/inbox/${ this.userService.getUserId() }`;
	}

	async toggleActive(isInit = true, event=null) {  
		if(isInit){
			this.alertService.clear();
		    $('.tab').removeClass('active');
		    $(event.target).addClass('active');
		}
	    this.loader.style.display = "block";
	    if(event){
	    	switch(event.target.id){
	    		case 'user':
	    			this.curTab = 'user';
	    			this.dataService.url = `http://localhost:8000/inbox/${ this.userService.getUserId() }`;
	    			break;
	    		case 'group':
	    			this.curTab = 'group';
	    			this.dataService.url = `http://localhost:8000/inbox/group/${ this.userService.getUserId() }`;
	    			break;
	    		case 'contact':
	    			// TODO
	    	}
	    }
	    // this.dataService.url = 'my endpoint for the button clicked, still to create :P';
	    await this.dataService.getData();
	    this.loader.style.display = "none";
 	}

 	async getThread(event){
 		// set url parameters to fetch thread, goto thread
 		console.log(this.curTab);
 		switch(this.curTab){
 			case 'user':
 				this.dataService.url =`http://localhost:8000/message/user/${ this.userService.getUserId() }/user/${ event.target.value }`;
 				break;
 			case 'group':
 				this.dataService.url =`http://localhost:8000/message/group/${ event.target.value }`;
 		}
 		
 		this.router.navigate(['thread']);
 	}

}
