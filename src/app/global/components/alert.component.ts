import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert-service.service';
import { Alert, AlertType } from '../models/alert-models';

@Component({
    selector: 'app-alert',
    templateUrl: '../templates/alert.component.html'
})

export class AlertComponent {
	alerts: Alert[] = [];

	constructor(private alertService: AlertService){ }

	ngOnInit() {
		/* subscribe to alert service alert instantiation */
		this.alertService.get().subscribe((alert: Alert) => {
			if(!alert){
				this.alerts = [];
				return;
			}
			this.alerts.push(alert);
		});
	}

	remove(alert: Alert){
		this.alerts = this.alerts.filter(x => x !== alert);
	}

	getClass(alert: Alert){
		if(!alert){
			return;
		}

		switch(alert.type){

			case AlertType.Success:
				return 'alert alert-success';
			case AlertType.Error:
				return 'alert alert-warning';
			case AlertType.Unauthorized:
				return 'alert alert-danger';
		}
	}

}