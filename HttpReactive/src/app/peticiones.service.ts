import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private _http: HttpClient) { }

  public normal(): void {

    this._http.get('http://localhost:8080')
      .subscribe(value => {
        console.log("value", value);
      });
  }


  public textStream(): void {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'text/event-stream',
        'Accept': 'text/event-stream',
      })
    };

    this._http.get('http://localhost:8080', httpOptions)
      .pipe(
        tap(value => {
          console.log("tap", value)
        }),
        catchError(error => {
          console.log(error);
          return of("no funciono");
        })
      )
      .subscribe(value => {
        console.log("value", value);
      });
  }

  public jsonStream(): void {

    this._http.get('http://localhost:8080', {
      headers:
      {
        'Content-type': 'application/x-ndjson',
        'Accept': 'application/x-ndjson',
      }
    })
      .subscribe((value) => {

      });

  }

  public async streamm() {
    const response = await fetch('http://localhost:8080', {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-ndjson',
        'Accept': 'application/x-ndjson',
      }
    });

    const reader = response.body?.pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const prom = await reader?.read();
      if (prom?.done) break;
      console.log('received', JSON.parse(prom?.value || ''));
    }

    console.log('response fully received');


  }


  public addCokieHeader(cookie: string, nombre: string): void {
    const headersop = new HttpHeaders().set('Cookie', (nombre + cookie));
    this._http.get('https://akabab.github.io/superhero-api/api/all.json', { headers: headersop })
      .subscribe(
        value => {
console.log(value);

        }
      )
  }

}  
