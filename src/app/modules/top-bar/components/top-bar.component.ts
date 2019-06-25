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

	constructor(private userService: UserService, private router: Router){ 
		this.router.routeReuseStrategy.shouldReuseRoute = function(){
				return false;
			};
	}
	
	ngOnInit(){ }

	/* Nav active class management */
	@HostListener('click', ['$event']) toggleActive(){
		if(this.userService.getUserId()){
			$('.bar').removeClass('active');
			$(event.target).addClass('active');
		}
	};

	/* do search */
	@HostListener('submit', ['$event'])
	doSearch(){
		event.preventDefault();
		if((<HTMLElement>event.target).id != 'topSearch'){ return; }
		var form = event.target;
		localStorage.setItem('searchParam', form['searchQuery'].value);
		if(this.router.url != '/search'){
			this.router.navigate(['search']);
		} else {
			window.location.reload();
		}
	}
	


}
