import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    templateUrl: '../templates/err.component.html',
    styleUrls: ['../styles/err.component.css']
})

export class ErrComponent { 

	constructor(private location: Location){ }

	goBack(){
		this.location.back();
	}
	
}
