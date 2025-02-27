import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  employeeForm: FormGroup;
  public RolesData!: any[];
  public DesignationData!: any[];

  constructor(
    private empSrv: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      roleId: ['', Validators.required],
      userName: ['', Validators.required],
      empCode: ['', Validators.required],
      empName: ['', Validators.required],
      empEmailId: ['', [Validators.required, Validators.email]],
      empDesignationId: ['', Validators.required],
      empContactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      empAltContactNo: ['', [Validators.pattern('^[0-9]{10}$')]],
      empPersonalEmailId: ['', [Validators.email]],
      empExpTotalYear: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      empExpTotalMonth: [0, [Validators.required, Validators.min(0), Validators.max(11)]],
      empAddress: [''],
      empCity: [''],
      empState: [''],
      empPinCode: ['', [Validators.pattern('^[0-9]{5}$')]],
      empPerAddress: [''],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: ['', [Validators.pattern('^[0-9]{5}$')]],
      password: ['', [Validators.required]],
      ErpEmployeeSkills: this.fb.array([]),
      ErmEmpExperiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.empSrv.GetAllRoles().subscribe((RolesRes: any) => {
      this.RolesData = RolesRes.data;

    });
    this.empSrv.GetAllDesignation().subscribe((DesigRes: any) => {
      this.DesignationData = DesigRes.data;
    })
  }

  get ErpEmployeeSkills() {
    return this.employeeForm.get('ErpEmployeeSkills') as FormArray;
  }

  get ErmEmpExperiences() {
    return this.employeeForm.get('ErmEmpExperiences') as FormArray;
  }

  addSkill() {
    this.ErpEmployeeSkills.push(
      this.fb.group({
        empSkillId: [0],
        skill: ['', Validators.required],
        totalYearExp: ['', [Validators.min(0), Validators.max(50)]],
        lastVersionUsed: ['']
      })
    );
  }

  addExperience() {
    this.ErmEmpExperiences.push(
      this.fb.group({
        empExpId: [0],
        companyName: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        designation: ['', Validators.required],
        projectsWorkedOn: ['']
      })
    );
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.empSrv.CreateNewEmp(this.employeeForm.value).subscribe((res:any)=> {
        console.log(res);
        if(res.result) {
          this.router.navigate(['layout/dashboard/employee-detail']);
        }
      })
      console.log('Form Submitted:', this.employeeForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
