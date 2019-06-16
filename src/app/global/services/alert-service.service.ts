import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Alert, AlertType } from '../models/alert-models';
import { AlertComponent } from '../components/alert.component';
import { Subject } from 'rxjs';

/* global alert manager */
@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private subject = new Subject<Alert>();
	private holdOnChange = false;

	constructor(private router: Router){
		/* clear alerts on router change, holdOnChange holds alert for one route change (e.g. register -> login) */
		router.events.subscribe(event => {
			if(event instanceof NavigationStart){
				if(this.holdOnChange == true){
					this.holdOnChange = false;
				} else {
					this.clear();
				}
			}
		});
	}

	get(){
		return this.subject.asObservable();
	}

	alert(type: AlertType, message: string, holdOnChange = false){
		this.holdOnChange = holdOnChange;
		this.subject.next(<Alert>{type: type, message: message});
	}

	success(message: string, holdOnChange = false){
		this.alert(AlertType.Success, message, holdOnChange);
	}

	unauthorized(message: string, holdOnChange = false){
		this.alert(AlertType.Unauthorized, message, holdOnChange);
	}
	error(message: string, holdOnChange = false){
		this.alert(AlertType.Error, message, holdOnChange);
	}

	clear(){
		this.subject.next();
	}
}