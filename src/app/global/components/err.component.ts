import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    templateUrl: '../templates/err.component.html',
    styleUrls: ['../styles/err.component.css']
})

export class ErrComponent { 

	constructor(private location: Location){ }
	
	// open contact component
	contactUs(event){
		event.preventDefault();
		$('#contactModal').modal('show');
	}

	goBack(){
		this.location.back();
	}
}
