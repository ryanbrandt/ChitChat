import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { AlertService } from '../services/alert-service.service';
import { UserService } from '../services/user-service.service';

@Component({
    template: '<div class="modal" tabindex="-1" role="dialog" id="contactModal">' +
					'<div class="modal-dialog" role="document">' +
	 					'<div class="modal-content">' +
	    					'<div class="modal-header">' +
	        					'<h5 class="modal-title">ChitChat Support</h5>' +
	        					'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
	        						'<span aria-hidden="true">&times;</span>' +
       							'</button>' +
	      					'</div>' +
	      					'<div class="modal-body" align="center">' +
		      					'<form>' +
		      					'<div class="form-group">' +
		      						'<label for="helpCategory">Categorize Issue</label>' +
		      						'<select id="helpCategory" class="form-control">' +
					      				'<option value="Technical Issue">Technical Support</option>' +
					      				'<option value="Account Support">Account Support</option>' +
					      				'<option value="General Question">General Question</option>' +
					      				'<option value="Other">Other</option>' +
		      						'</select>' +
					      		'</div>' +
					      		'<div class="form-group">' +
					      			'<label for="helpContent">Describe Issue</label>' +
					      			'<textarea class="form-control" cols=6 rows=6 id="helpContent"></textarea>' +
					      		'</div>' +
					      		'<div class="form-group">' +
					      			'<button type="Submit" class="btn btn-primary">Send</button>' +
					      		'</div>' +
					      	'</form>' +
				      	'</div>' +
				    '</div>' +
				'</div>' +
			'</div>',
			
    selector: 'app-contact'
})

export class ContactComponent { 

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService){ }

	/* post data to api contact endpoint */
	async submitContact(event){
		event.preventDefault();
		var form = event.target;
		this.dataService.payload = {"user": this.userService.getUsername(), "subject": form['helpCategory'].value, "contents": form['helpContent']}
		// preserve original url
		var tmpUrl = this.dataService.getUrl();
		this.dataService.setUrl('https://chit-chat-web-services.herokuapp.com/help/');
		await this.dataService.postData(true);
		this.dataService.setUrl(tmpUrl);
		$('#contactModal').modal('hide');
		// if not 201 we are intercepted, just in case
		if(this.dataService.responseStatus == 201){
			this.alertService.success('We have received your message! We will be in touch shortly');
		}
	}
}