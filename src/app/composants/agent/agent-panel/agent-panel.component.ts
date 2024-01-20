import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-panel',
  templateUrl: './agent-panel.component.html',
  styleUrls: ['./agent-panel.component.css']
})
export class AgentPanelComponent implements OnInit{
  est_agent=true
  @Input() is_man=false;
  @Input() is_agent=false;

  @Input() collapsed=false;
  @Input() screen_width=0;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false

  constructor(){

  }
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
  ngOnInit(): void {
     this.is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  }
}
