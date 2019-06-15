import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: '../templates/top-bar.component.html',
  styleUrls: ['../styles/top-bar.component.css']
})

export class TopBarComponent implements OnInit {
	
	ngOnInit(){ }

	/* Nav active class management */
	@HostListener('click', ['$event']) toggleActive(){
		$('.bar').removeClass('active');
		$(event.target).addClass('active');
	};
	


}
