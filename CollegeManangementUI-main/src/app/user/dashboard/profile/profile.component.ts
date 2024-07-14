import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { countries } from 'src/app/data/countries';
import { states } from 'src/app/data/states';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'country', 'state', 'gender'];
  dataSource = new MatTableDataSource<User>([]);
  countries=countries;
  states :{ [key: string]: { id: string; name: string; }[] }=states;
  ngOnInit(): void {
    console.log(countries[0].id);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.dataSource.data = [users];
  }
  getCountryName(countryId: string): string {
    const country = this.countries.find(c => c.id === countryId);
    return country ? country.name : '';
  }

  getStateName(stateId: string): string {
    for (const key in this.states) {
      const state = this.states[key].find(s => s.id === stateId);
      if (state) {
        return state.name;
      }
    }
    return '';
  }
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  gender: string;
  password: string;
  confirmPassword: string;
}