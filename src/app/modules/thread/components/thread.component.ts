import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from  '@angular/router';
import { interval, BehaviorSubject, timer } from 'rxjs';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';
import * as $AB from 'jquery';

@Component({
	templateUrl: '../templates/thread.component.html',
	styleUrls: ['../styles/thread.component.css']
})

export class ThreadComponent implements OnInit {
	Object = Object;
	private navSub;
	private pollSub;
	private otherId;
	private last;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router){
			this.navSub = this.router.events.subscribe((event) => {
				if(event instanceof NavigationEnd){
					// for navigating back from group settings
					if(!this.dataService.getUrl().includes('message')){
						this.dataService.setUrl(localStorage.getItem('urlTmp'));
						localStorage.removeItem('urlTmp');
					}
					// get other user's id/group id-- needed often for polling
					var urlArr = this.dataService.getUrl().split('/');
					if(urlArr.includes('user')){
						this.otherId = urlArr[urlArr.length-1] == this.userService.getUserId() ? urlArr[urlArr.length-3] : urlArr[urlArr.length-1];
					} else {
						this.otherId = urlArr[urlArr.length-1];
					}
					this.getMessages(false);
				}
			})
			
	}

	ngOnInit(){  
		if(!this.userService.getUserId()){ 
			this.router.navigate(['']); 
		}
 	}

 	/* inits polling utility if not isInit and retrieves new data */
	async getMessages(isInit=true){
		document.getElementById('loader').style.display = 'block';
		if(isInit){
			this.dataService.setUrl(localStorage.getItem('urlTmp'));
		}
		await this.dataService.getData();
		this.last = Object.keys(this.dataService.response).length - 1;
		document.getElementById('loader').style.display = 'none';

		// init long polling
		if(!isInit){
			// save our thread endpoint, as we will be switching url often
			localStorage.setItem('urlTmp', this.dataService.getUrl());	
			this.pollSub = timer(0, 10000).subscribe(x => {
				this.longPoll();
				// FIXME: short polling won't scale well and this doesn't refresh timer on response reception
			})
		}

	}

	/* semi-long polling util, called every 10 seconds */
	async longPoll(){
		// build pollUrl, varies if group/user thread
		var maxId = this.getMaxId();
		var pollUrl = this.dataService.getUrl().includes('user') ? `http://localhost:8000/poll/user/${ this.otherId }/${ this.userService.getUserId() }/${ maxId }` :
																	`http://localhost:8000/poll/group/${ this.otherId }/${ maxId }`;
		this.dataService.setUrl(pollUrl);
		// poll, if returns status of true, new data to be fetched
		await this.dataService.getData(true);
		if(this.dataService.nthResponse[0]['status'] == true){
			this.getMessages();
			// get new last id, reset url
			maxId = this.getMaxId();
			var pollUrlArr = pollUrl.split('/')
			pollUrlArr[pollUrlArr.length-1] = maxId;
			pollUrl = pollUrlArr.join('');
			this.dataService.setUrl(pollUrl);
		} 
		this.dataService.freeNthResponses();
	}

	getMaxId(){
		return this.dataService.response['id'] ? this.dataService.response['id']: this.dataService.response[Object.keys(this.dataService.response).length-1]['id'];
	}

	/* send new user/group message */
 	@HostListener('submit', ['$event']) 
 	async sendMessage(){
 		event.preventDefault();
 		var form = event.target;
 		// varies if group/user thread
 		this.dataService.payload = localStorage.getItem('urlTmp').includes('user') ? {'recipient_id': this.otherId} : {'group_id': this.otherId}
 		this.dataService.payload['message'] = {'author_id': this.userService.getUserId(), 'content': form['message'].value };
 		var sendUrl = localStorage.getItem('urlTmp').includes('user') ? 'http://localhost:8000/message/user/' : 'http://localhost:8000/message/group/';
 		this.dataService.setUrl(sendUrl);
 		await this.dataService.postData(false, true);
 		this.getMessages();
 		form['message'].value = '';
 	}

 	/* redirect to group management */
 	manageGroup(event){
 		event.preventDefault();
 		this.dataService.setUrl(`http://localhost:8000/group/${ localStorage.getItem('urlTmp').split('/').pop() }`);
 		this.router.navigate(['settings/manage-group']);
 	}

 	ngOnDestroy(){
 		console.log('polling, nav end subscription destroyed');
 		this.navSub.unsubscribe();
 		this.pollSub.unsubscribe();
 	}
}