import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../constants/Endpoints';

@Injectable({
  providedIn: 'root',
})
export class BackofficeService {
  baseUrl: string;
  private headers = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrlBackoffice;
  }

  //#region Territorial
  public getCities = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiBackofficeTerritorial}cities/1/country`,
      this.headers
    );
  }
  public getStateByCityId = (stateId: number) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiBackofficeTerritorial}states/${stateId}/city`,
      this.headers
    );
  }
  //#endregion
}
