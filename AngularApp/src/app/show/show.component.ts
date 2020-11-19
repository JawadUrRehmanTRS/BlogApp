import { Component, OnInit, Output, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog_model';
import { ComentModel } from '../mode';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

constructor(private Service:ServiceService, private route:ActivatedRoute,private router:Router) { }
coment:'' 
id:String;
blog:Blog;
tags: String[]
comments: String[]
comment:ComentModel

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneBlog();
      }

    getOneBlog(){
      this.Service.findOne(this.id).subscribe((res)=>{
        this.blog = res;
        this.getBlogComment()
        this.tags = res.tags.split(',')
        this.getBlogComment()
    })
    }

getBlogComment(){
    this.Service.getComments(this.id).subscribe((res)=>{
        this.comment = res;
    })
}

addComment(comt){
  this.getBlogComment()
}

    deleteBlog(){
      this.Service.deleteBlog(this.id).subscribe(()=>{
          this.goBack()
      })
    }
    goBack()
    {
      this.router.navigate(['/home'])
    }
    

}
