import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
					res => {	// on success
						this.responseStatus = 200;
						this.response = res;
						resolve();
					},
					err => { // on err
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
					res => {	// on success
						this.responseStatus = 201;
						this.response = res;
						resolve();
					},
					err => { // on err
						this.responseStatus = err.status;
						this.response = err['error'];
						resolve();
					}
				);
		});
		return promise;
	}

}