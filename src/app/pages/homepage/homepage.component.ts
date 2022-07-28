import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  weatherTemp: any;
  weatherCityName!: string;
  weatherCityCountry!: string;
  weatherDescription!: string;
  citySearch = 'paraiba';

  loading = true;

  constructor(public httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.httpClient
      .get(`${API_URL}weather?q=${this.citySearch}&appid=${API_KEY}`)
      .subscribe({
        next: (res: any) => {
          this.loading = true;
          this.weatherTemp = res['main'];
          this.weatherCityName = res.name
          this.weatherCityCountry = res.sys.country
          this.weatherDescription = res.weather[0].main
          console.log(res);
          console.log(this.weatherDescription);
          this.loading = false;
        },
      });
  }
}
