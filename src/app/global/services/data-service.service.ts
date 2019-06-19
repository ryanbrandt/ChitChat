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
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.get(this.url)
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
			this.http.post(this.url, this.payload)
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

	/* generic put; didn't implement patch in API so need ALL data here */
	putData() {
		this.responseStatus = 200;
		let promise = new Promise((resolve) => {
			this.http.put(this.url, this.payload)
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
			this.http.delete(this.url)
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