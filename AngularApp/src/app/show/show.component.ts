import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog_model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

constructor(private Service:ServiceService, private route:ActivatedRoute,private router:Router) { }
id:String;
blog:Blog;
tags: String[]
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneBlog();
      }

    getOneBlog(){
      this.Service.findOne(this.id).subscribe((res)=>{
        this.blog = res;
        this.tags = res.tags.split(',')
    })

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
