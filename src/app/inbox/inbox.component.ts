import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service/data-service.service';
import { AlertService } from '../services/alert-service/alert-service.service';

@Component({
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

	constructor(private dataService: DataService, private alertService: AlertService){ }

	ngOnInit(){ 
 		// fetch data for direct messages, all other data (group messages, contacts, fetched on click)
 	}
	
	toggleActive() {  
	    $('.nav-link').removeClass('active');
	    $(event.target).addClass('active');
	    // TODO: unloading of data related to tab
 	}

}
