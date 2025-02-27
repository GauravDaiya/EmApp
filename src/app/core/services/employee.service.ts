import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  GetAllRoles() {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllRoles`);
  }

  GetAllDesignation () {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllDesignation`);
  }

  GellAllEmployee() {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllEmployee`);
  }

  CreateNewEmp(data:any) {
    return this.http.post(`https://freeapi.miniprojectideas.com/api/EmployeeApp/CreateNewEmployee`,data);
  }
}
