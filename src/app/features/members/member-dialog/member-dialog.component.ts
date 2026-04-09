import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-member-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './member-dialog.component.html',
  styleUrl: './member-dialog.component.css',
})
export class MemberDialogComponent {
  memberForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogueRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.memberForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      domain: [data?.domain || 'N/A'],
      member_class: [data?.member_class || '', Validators.required],
      date_joined: [data?.date_joined || '', Validators.required],
      level: [data?.level || 0],
      status: [data?.status || 'Active'],
    });
  }

  save() {
    if (this.memberForm.valid) {
      this.dialogueRef.close(this.memberForm.value);
    }
  }

  close() {
    this.dialogueRef.close();
  }
}
