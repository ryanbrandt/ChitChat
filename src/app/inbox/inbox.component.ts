import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service/data-service.service';
import { AlertService } from '../services/alert-service/alert-service.service';

@Component({
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {
	Object = Object;
	// not elegent, but pass Object to template to iterate over API response

	constructor(private dataService: DataService, private alertService: AlertService){ 
		this.dataService.url = 'http://localhost:8000/message/';
	}

	async ngOnInit(){ 
		this.loader = document.getElementById('loader');
 		await this.dataService.getData();
 		this.loader.style.display = "none";
 		this.isLoaded = true;
 	}
	
	async toggleActive() {  
	    $('.nav-link').removeClass('active');
	    $(event.target).addClass('active');
	    this.loader.style.display = "block";
	    // this.dataService.url = 'my endpoint for the button clicked';
	    // await this.dataService.getData();
	    this.loader.style.display = "none";
 	}

 	isEmpty(){
 		if(typeof(this.dataService.response) == 'undefined' || this.dataService.response.length == 0){
 			return true;
 		}
 		return false;
 	}

}
