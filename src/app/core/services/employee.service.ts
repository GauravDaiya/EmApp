import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database, ref, set, get, child, remove, update, push } from '@angular/fire/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private dbPath = 'employee/';

  constructor(
    private http: HttpClient,
    private db: Database
  ) { }

  GetAllRoles() {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllRoles`);
  }

  GetAllDesignation () {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllDesignation`);
  }

  GellAllEmployee() {
    this.getAllEmployees().then((res) => {
      console.log(res); // ✅ This will now log the correct array data
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
    return this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllEmployee`);
  }

  CreateNewEmp(data:any) {
    this.createNewEmployee(data);
    // return this.http.post(`https://freeapi.miniprojectideas.com/api/EmployeeApp/CreateNewEmployee`,data);
  }

  createNewEmployee(data: any): Observable<any> {
    const newEmpRef = push(ref(this.db, this.dbPath));
    return from(
      set(newEmpRef, { id: newEmpRef.key, ...data }).then(() => ({
        id: newEmpRef.key,
        ...data
      }))
    );
  }

  async getAllEmployees() {
    const dbRef = ref(this.db, this.dbPath);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const employeesObj = snapshot.val();
        
        // Convert object to array
        const employeesArray = Object.keys(employeesObj).map(key => ({
          id: key, // Add Firebase ID to object
          ...employeesObj[key]
        }));
  
        return employeesArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }
}
