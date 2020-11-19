import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComentModel } from '../mode';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
comment:String
comnt= new ComentModel()
@Output() event = new EventEmitter();
constructor(private service:ServiceService) { }
@Input() id
  ngOnInit(): void {
  }
  addComment(){
    
    this.comnt.Blog_id=this.id
    this.comnt.comment = this.comment
    this.service.addComment(this.comnt).subscribe((res)=>{
        this.updateBlog()
    })
  }
  
  updateBlog(){
    console.log(this.comnt)
    this.event.emit(this.comment)
   }
}
