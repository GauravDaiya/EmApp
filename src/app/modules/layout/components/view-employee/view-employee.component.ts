import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent implements OnInit {

  public AllEmployeeData !: any [];
  public dataSource = new MatTableDataSource<any>();

  constructor(private empSrv: EmployeeService,) {}

  ngOnInit(): void {
    this.empSrv.GellAllEmployee().subscribe((EmpRes:any) => {
      this.AllEmployeeData = EmpRes.data;
      this.dataSource.data = this.AllEmployeeData;
      console.log(EmpRes.data)
    })
  }
  displayedColumns = ['empId', 'empName', 'empCode', 'empEmailId', 'empDesignation', 'role', 'mobile'];
  
}

