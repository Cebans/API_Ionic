import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Student } from 'src/app/student.model.';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent  implements OnInit {

  student: Student = { id: 0, nombre: '', apellido: '', curso: '' };
  isEditMode = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.studentService.getStudent(+studentId).subscribe((student) => {
        this.student = student;
      });
    }
  }

  saveStudent(): void {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.navCtrl.navigateBack('/students');
      });
    } else {
      this.studentService.addStudent(this.student).subscribe(() => {
        this.navCtrl.navigateBack('/students');
      });
    }
  }
}


