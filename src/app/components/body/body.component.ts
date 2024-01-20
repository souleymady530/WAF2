import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent 
{


  @Input() is_man=false;
  @Input() is_agent=false;

  @Input() collapsed=false;
  @Input() screen_width=0;
  
  get_body_class():string{
    let styleClass='';
    if(this.collapsed && this.screen_width>768)
    {
      styleClass="body-trimmed"
    }
    else if(this.collapsed && this.screen_width<=768 && this.screen_width>0)
    {
      styleClass="body-md-screen"
    }
    return styleClass;
  }
}

