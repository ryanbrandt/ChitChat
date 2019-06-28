import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/* global data retrieval service to make API calls */
@Injectable({
	providedIn: 'root',
})
export class DataService {
	payload = {};
	responseStatus = -1;
	response = {};
	// array of objects, holds nth responses if a page needs data from plural endpoints
	nthResponse = [];
	// reserved for notification data, since global polling
	notifStatus = {};
	notifDat = {}

  	constructor(private http: HttpClient) { }

  	/* keep primary endpoint in local storage in case of refresh */
  	setUrl(url: string){
  		localStorage.setItem('url', url);
  	}

  	getUrl() {
  		return localStorage.getItem('url').toString();
  	}

  	/* generic get */
	getData(isNth=false, url=null, isNotifPoll=false, isNotif=false) {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.get(url? url : this.getUrl())
				.toPromise()
				.then(
					res => {
						// if an nth response item, add to array
						if(isNth){
							this.nthResponse.push(res);
						// if a notifPoll/notifDat, add to notif data
						} else if(isNotifPoll){
							this.notifStatus = res;
						} else if(isNotif){
							this.notifDat = res;
						// else if page primary data
						} else {
							this.response = res;
						}
						resolve();
					},
					err => { 
						resolve();
					}

				);
		});
		return promise;
	}  	

	/* have to manually manage nthData array */
	freeNthResponses(){
		this.nthResponse = [];
	}
	
	/* generic post */
	postData(isNth=false, ignoreRes=false) {
		this.responseStatus = 201;
		let promise = new Promise((resolve) => {
			this.http.post(this.getUrl(), this.payload)
				.toPromise()
				.then(
					res => {	
						// if an nth response item, add to array, else primary response
						if(isNth && !ignoreRes){
							this.nthResponse.push(res);
						} else if(!ignoreRes){
							this.response = res;
						}
						resolve();
					},
					err => { 
						resolve();
					}
				);
		});
		return promise;
	}

	/* generic put */
	putData() {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.put(this.getUrl(), this.payload)
				.toPromise()
				.then(
					res => {
						this.response = res;
						resolve();
					},
					err => {
						resolve();
					}
				);
		});
		return promise;
	}

	/* generic patch */
	patchData(url=null, ignoreRes=false) {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.patch(url ? url : this.getUrl(), this.payload)
				.toPromise()
				.then(
					res => {
						if(!ignoreRes){
							this.response = res;
						}
						resolve();
					},
					err => {
						resolve();
					}
				);
		});
		return promise;
	}

	/* generic delete; always need to call a detail endpoint */
	deleteData(url=null) {
		this.responseStatus = 204;
		let promise = new Promise((resolve) => {
			this.http.delete(url ? url : this.getUrl())
				.toPromise()
				.then(
					res => {
						resolve();
					},
					err => {
						resolve()
					}
				);
		});
		return promise;
	}
}