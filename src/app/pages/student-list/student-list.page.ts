import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Student } from 'src/app/student.model.';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StudentListPage implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService,
    private navCtrl: NavController) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  goToStudentDetail(id: number): void {
    this.navCtrl.navigateForward(`/students/${id}`);
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      // Eliminar el estudiante de la lista después de eliminarlo en el servidor
      this.students = this.students.filter((student) => student.id !== id);
    });
}
}
