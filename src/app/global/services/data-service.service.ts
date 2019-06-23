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

  	constructor(private http: HttpClient) { }

  	/* keep primary endpoint in local storage in case of refresh */
  	setUrl(url: string){
  		localStorage.setItem('url', url);
  	}

  	getUrl() {
  		return localStorage.getItem('url').toString();
  	}

  	/* generic get */
	getData() {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.get(this.getUrl())
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

	/* generic post */
	postData() {
		this.responseStatus = 201;
		let promise = new Promise((resolve) => {
			this.http.post(this.getUrl(), this.payload)
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
	patchData() {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.patch(this.getUrl(), this.payload)
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

	/* generic delete; always need to call a detail endpoint */
	deleteData() {
		this.responseStatus = 204;
		let promise = new Promise((resolve) => {
			this.http.delete(this.getUrl())
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