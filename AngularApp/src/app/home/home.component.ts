import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog_model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:ServiceService) { }
blogs : Blog
  ngOnInit(): void {
    this.getBlogs();
  }

getBlogs(){
  this.service.getBlogs().subscribe((res)=>{
    this.blogs= res;
  })
}

}
