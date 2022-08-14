import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HttpReactive';

  constructor(private ser: PeticionesService){ 
    
   }
  ngOnInit(): void {
    // this.ser.normal();
    // this.ser.jsonStream();
    // this.ser.textStream();
    this.ser.streamm();
    this.ser.addCokieHeader('cookie', localStorage.getItem('prueba') || '');
    // this.grabarStorage();
  }


  public grabarStorage():void {
    // localStorage.setItem("prueba", 'tu mama  mee gusta')
    console.log(localStorage.getItem('prueba'));
  }
   

}
