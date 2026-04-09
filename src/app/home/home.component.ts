import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemberDialogComponent } from '../features/members/member-dialog/member-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  members:any[] =[]

total =0
page = 1
limit = 10

displayedColumn =[
  'status',
  'name',
  'domain',
  'member_class',
  'date_joined',
  'level',
  'actions'
]

constructor(private membersSvc:UserService, private dialog:MatDialog){}

ngOnInit(){
  this.loadMembers()
}

loadMembers(){
  this.membersSvc.getMembers(this.page,this.limit).subscribe({
    next:(res)=>{
      this.members = res.data
      this.total = res.total
    }
  })
}

onPageChange(event:PageEvent){
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.loadMembers()
}

deleteMember(id:number){
  this.membersSvc.deleteMember(id).subscribe({
    next:()=>{
      this.loadMembers()
    }
  })
}

openAddDialog(){
  const dialogRef = this.dialog.open(MemberDialogComponent, {
    width: '600px'
  });

  dialogRef.afterClosed().subscribe({
    next:(result) =>{
      this.membersSvc.addMember(result).subscribe(() =>{
        this.loadMembers()
      })
    }
  })
}

openEditDialog(member:any){
  const dialogRef = this.dialog.open(MemberDialogComponent,{
    width:'600px',
    data:member
  });

  dialogRef.afterClosed().subscribe({
    next:(result)=>{
      if(result){
        this.membersSvc.updateMember(member.id,result).subscribe(() =>{
          this.loadMembers()
        })
      }
    }
  })
}

}
