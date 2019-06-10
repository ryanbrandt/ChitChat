import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataService {
	url: string;
	payload: object;
	responseStatus: number;
	response: object;

  	constructor(private http: HttpClient, url: string) { 
  		this.url = url;
  		// endpoint related to component using
  	}

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