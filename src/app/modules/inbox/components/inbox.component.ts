import { Component, OnInit, HostListener} from '@angular/core';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';

@Component({
  templateUrl: '../templates/inbox.component.html',
  styleUrls: ['../styles/inbox.component.css']
})

export class InboxComponent implements OnInit {
	Object = Object;
	// not elegent, but pass Object to template to iterate over API response
	loader;
	isLoaded = false;

	constructor(private dataService: DataService, private alertService: AlertService){ 
		this.dataService.url = 'http://localhost:8000/message/';
	}

	async ngOnInit(){ 
		this.loader = document.getElementById('loader');
 		this.toggleActive(false);
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
	    if(this.requestFailed()){ this.alertService.unauthorized('Sorry, Im having trouble connecting to our servers :('); }
	    this.loader.style.display = "none";
	    this.isLoaded = true;
 	}

 	requestFailed(){
 		return this.dataService.responseStatus != 200;
 	}

 	isEmpty(){
 		return !this.dataService.response || Object.keys(this.dataService.response).length == 0;
 	}

}
