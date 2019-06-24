import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from  '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import * as $AB from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  templateUrl: '../templates/inbox.component.html',
  styleUrls: ['../styles/inbox.component.css']
})

export class InboxComponent implements OnInit {
	Object = Object;
	// not elegent, but pass Object to template to iterate over API response
	loader;
	groupExists = false;
	curTab = 'user';

	ngOnInit(){  
		if(!this.userService.getUserId()){ this.router.navigate(['']); }
		this.loader = document.getElementById('loader');
 		this.toggleActive(false);
 	}

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){ 
		this.dataService.setUrl(`http://localhost:8000/inbox/${ this.userService.getUserId() }`);
	}

	async toggleActive(isInit = true, event=null) {  
		if(isInit){
			this.alertService.clear();
		    $('.tab').removeClass('active');
		    $('#' + event.target.id).addClass('active');
		}
	    this.loader.style.display = "block";
	    if(event){
	    	switch(event.target.id){
	    		case 'user':
	    			this.curTab = 'user';
	    			this.dataService.setUrl(`http://localhost:8000/inbox/${ this.userService.getUserId() }`);
	    			break;
	    		case 'group':
	    			this.curTab = 'group';
	    			this.dataService.setUrl(`http://localhost:8000/inbox/group/${ this.userService.getUserId() }`);
	    			break;
	    		case 'create':
	    			$('#createModal').modal('show');
	    	}
	    }
	    // this.dataService.url = 'my endpoint for the button clicked, still to create :P';
	    await this.dataService.getData();
	    this.loader.style.display = "none";
 	}

 	async getThread(event){
 		// set url parameters to fetch thread, goto thread
 		switch(this.curTab){
 			case 'user':
 				this.dataService.setUrl(`http://localhost:8000/message/user/${ this.userService.getUserId() }/user/${ event.target.value }`);
 				break;
 			case 'group':
 				this.dataService.setUrl(`http://localhost:8000/message/group/${ event.target.value }`);
 		}
 		
 		this.router.navigate(['thread']);
 	}

 	/* creates group from new group modal */
 	@HostListener('submit', ['$event'])
 	async createGroup(){
 		event.preventDefault();
 		if((<HTMLElement>event.target).id != 'createForm'){ return; }
 		var form = event.target;
 		// create group
 		this.dataService.payload = {'name': form['name'].value}
 		this.dataService.setUrl('http://localhost:8000/group/');
 		await this.dataService.postData();
 		// make sure successful
 		if(this.dataService.responseStatus != 201){
 			this.groupExists = true;
 			form['name'].value = '';
 		} else {
 			// add creator to group
 			this.dataService.setUrl('http://localhost:8000/user/group/');
 			this.dataService.payload = {'user': this.userService.getUserId(), 'group': this.dataService.response['id']};
 			await this.dataService.postData();
 			// post first message on creators behalf
 			this.dataService.setUrl('http://localhost:8000/message/group/');
 			this.dataService.payload = {'group_id': this.dataService.response['group'], 'message': 
 				{'author_id': this.userService.getUserId(), 'content': `Welcome to ${this.dataService.response['group_name']}!`}
 			};
 			await this.dataService.postData();
 			// hide modal, redirect to newly created thread
 			$('#createModal').modal('hide');
 			this.dataService.setUrl(`http://localhost:8000/message/group/${ this.dataService.response['group_id'] }`);
 			this.alertService.success(`${ this.dataService.response['group'] } successfully created! Add members by clicking on the settings cog`, true);
 			this.router.navigate(['thread']);
 		}
 	}

 	closeModal(){
 		$('#createModal').modal('hide');
 		this.toggleActive(true, {'target': {'id': 'user'}});
 	}

}
