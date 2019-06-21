import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart } from  '@angular/router';
import { UserService } from '../../../global/services/user-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-bar',
  templateUrl: '../templates/top-bar.component.html',
  styleUrls: ['../styles/top-bar.component.css']
})

export class TopBarComponent implements OnInit {

	constructor(private userService: UserService, private router: Router){ }
	
	ngOnInit(){ }

	/* Nav active class management */
	@HostListener('click', ['$event']) toggleActive(){
		if(this.userService.getUserId()){
			$('.bar').removeClass('active');
			$(event.target).addClass('active');
		}
	};
	


}
