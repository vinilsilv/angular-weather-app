import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  maxTemp!: number;
  minTemp!: number;
  citySearch = '';
  defaultCity = 'brasilia'

  loading = true;

  constructor(public httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    if(this.citySearch != ''){

      this.getData(this.citySearch);
    } else {
      this.getData(this.defaultCity)
    }
  }

  getData(city: string) {
    this.httpClient
      .get(`${API_URL}weather?q=${city}&appid=${API_KEY}`)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.loading = true;
          this.weatherTemp = res['main'];
          this.weatherCityName = res.name;
          this.weatherCityCountry = res.sys.country;
          this.weatherDescription = res.weather[0].main;
          this.maxTemp = res.main.temp_max
          this.minTemp = res.main.temp_min
          this.loading = false;
        },
      });
  }
}
