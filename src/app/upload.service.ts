import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export class ImageServer{
  // tslint:disable-next-line:variable-name
  static url = 'http://109.103.122.99:20072';
  // tslint:disable-next-line:variable-name
  static _url = 'http://localhost:2468';
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL = ImageServer.url + '/upload';
  constructor(private httpClient: HttpClient) { }

  private REST_API_SERVER = ImageServer.url + '/resources';

  public getResources(){
    console.log('something else');
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public upload(formData) {
    return this.httpClient.post(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
    /*console.log(typeof x);
    console.log(x);
    return x;*/
  }

}
