import { Component, OnInit, HostListener } from '@angular/core';
import { timer } from 'rxjs';
import { Router, NavigationStart } from  '@angular/router';
import { UserService } from '../../../global/services/user-service.service';
import { DataService } from '../../../global/services/data-service.service';

import * as $AB from 'jquery';

@Component({
  selector: 'app-top-bar',
  templateUrl: '../templates/top-bar.component.html',
  styleUrls: ['../styles/top-bar.component.css']
})

export class TopBarComponent implements OnInit {
	private pollSub;
	Object = Object;
	ua = navigator.userAgent;
	numUnread = 0;

	constructor(private userService: UserService, private dataService: DataService, private router: Router){ 
		this.router.routeReuseStrategy.shouldReuseRoute = function(){
				return false;
			};
		this.pollSub = timer(0, 30000).subscribe(x => {
			this.fetchNotif();
		})
	}

	/* polls for new notifications and retrieves */
	async fetchNotif(){
		await this.dataService.getData(false, 'https://chit-chat-web-services.herokuapp.com/poll/notification/', true, false);
		if(this.dataService.notifStatus['status'] == true){
			await this.dataService.getData(false, `https://chit-chat-web-services.herokuapp.com/notification/${ this.userService.getUserId() }`, false, true);
			this.getNumUnread();
		}
	}

	/* gets number of unread notifications for sup tag */
	getNumUnread(){
		if(typeof(this.dataService.notifDat['read']) != 'undefined' && this.dataService.notifDat['read'] == 0){
			this.numUnread = 1;
		} else {
			var count = 0;
			for(let key of Object.keys(this.dataService.notifDat)){
				if(this.dataService.notifDat[key]['read'] == 0){
					count++;
				}
			}
			this.numUnread = count;
		}
	}

	/* open notification modal, set all notifications read */
	async openNotif(event){
		event.preventDefault();
		$('#notifModal').modal('show');
		await this.dataService.patchData(`https://chit-chat-web-services.herokuapp.com/notification/${ this.userService.getUserId() }`, true);
		this.numUnread = 0;
	}

	/* clears notification modal by deletion */
	async clearNotif(){
		$('#notifModal').modal('hide');
		await this.dataService.deleteData(`https://chit-chat-web-services.herokuapp.com/notification/${ this.userService.getUserId() }`);
		this.numUnread = 0;
		this.dataService.notifDat = {};
	}

	/* handles redirecting user to notification source */
	goThere(event, isUm){
		event.preventDefault();
		this.dataService.setUrl(isUm ? `https://chit-chat-web-services.herokuapp.com/message/user/${ this.userService.getUserId() }/user/${ event.target.id }` :
						 `https://chit-chat-web-services.herokuapp.com/message/group/${ event.target.id }`);
		// quick fix, but ugly
		if(this.router.url != '/thread'){
			this.router.navigate(['thread']);
			$('#notifModal').modal('hide');
		} else {
			window.location.reload();
		}
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

	ngOnDestroy(){
		this.pollSub.unsubscribe();
	}

}
