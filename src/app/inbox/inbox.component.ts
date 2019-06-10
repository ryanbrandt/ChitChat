import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

	
	
	toggleActive() {  
	    $('.nav-link').removeClass('active');
	    $(event.target).addClass('active');
	    // TODO: unloading of data related to tab
 	}
 	ngOnInit(){ }
}
