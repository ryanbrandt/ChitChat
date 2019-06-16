import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user-service.service';

/* global data retrieval service to make API calls */
@Injectable({
	providedIn: 'root',
})
export class DataService {
	url = '';
	payload = {};
	responseStatus = -1;
	response = {};

  	constructor(private http: HttpClient) { }

  	/* generic get */
	getData() {
		let promise = new Promise((resolve) => {
			this.http.get(this.url)
				.toPromise()
				.then(
					res => {	
						this.responseStatus = 200;
						this.response = res;
						resolve();
					},
					err => { 
						this.responseStatus = err.status;
						resolve();
					}

				);
		});
		return promise;
	}  	

	/* generic post */
	postData() {
		let promise = new Promise((resolve) => {
			this.http.post(this.url, this.payload)
				.toPromise()
				.then(
					res => {	
						this.responseStatus = 201;
						this.response = res;
						resolve();
					},
					err => { 
						this.responseStatus = err.status;
						this.response = err['error'];
						resolve();
					}
				);
		});
		return promise;
	}

	/* generic put; didn't implement patch in API so need ALL data here */
	putData() {
		let promise = new Promise((resolve) => {
			this.http.put(this.url, this.payload)
				.toPromise()
				.then(
					res => {
						this.responseStatus = 200;
						this.response = res;
						resolve();
					},
					err => {
						this.responseStatus = err.status;
						this.response = err['error'];
						resolve();
					}
				);
		});
		return promise;
	}

	/* generic delete; always need to call a detail endpoint */
	deleteData() {
		let promise = new Promise((resolve) => {
			this.http.delete(this.url)
				.toPromise()
				.then(
					res => {
						this.responseStatus = 204;
						resolve();
					},
					err => {
						this.responseStatus = err.status;
						this.response = err['error'];
						resolve()
					}
				);
		});
		return promise;
	}
}