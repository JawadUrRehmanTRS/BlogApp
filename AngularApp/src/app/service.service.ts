import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog_model';
import { ComentModel } from './mode';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient ) { }

  getBlogs(){
     return this.http.get<Blog>("http://localhost:3000/blogs");
  }

  getComments(id){
    return this.http.get<ComentModel>("http://localhost:3000/comments/"+id);
  }

  addBlogs(blog){
   return this.http.post<Blog>("http://localhost:3000/blog",blog);
  }

  addComment(cmt){
    return this.http.post<ComentModel>("http://localhost:3000/comment",cmt);
   }
 


  deleteBlog(id){
    return this.http.delete<Blog>("http://localhost:3000/blog/"+id)
  }

uploadImage(formData){
  return this.http.post<any>('http://localhost:3000/file', formData)
}

  updateBlog(id,data){
    return this.http.put<Blog>("http://localhost:3000/blog/"+id,data)
  }

  findOne(id){
   return this.http.get<Blog>("http://localhost:3000/blog/"+id)
  }
}
