import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Blog } from '../blog_model';
import { ServiceService } from '../service.service';
import{HttpClient} from '@angular/common/http' 


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
constructor(private Service:ServiceService, public route:ActivatedRoute, public router:Router,private http:HttpClient) { }
  myFrom:FormGroup;
  blog = new Blog();
  image:string;
  pic:any;
  url:any;
  tags:any
  check:boolean;
  ngOnInit(): void {
    this.check=false;
    this.myFrom = new FormGroup({
      name:new FormControl(null,Validators.required),
      content:new FormControl(null,Validators.required),
      title:new FormControl(null,Validators.required),
      tags:new FormArray([
        new FormControl(null)
      ])
    })
  }
  takeimage(event){
    if(event.target.files.length > 0){
      const file = event.srcElement.files[0].name;
      this.image = file;
      this.pic = event.target.files[0];
      this.check=true
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event) => { 
        this.url = event.target.result;
      }
    }
  }
 
  addTags(){
    (<FormArray>this.myFrom.get('tags')).push(new FormControl(null))
  }

  deleteTag(i){
    (<FormArray>this.myFrom.get('tags')).removeAt(i)
  }
addBlog(){
  const formData = new FormData();
  this.tags =  this.myFrom.get('tags').value;
  formData.append('file', this.pic);
  formData.append('Content',this.myFrom.value.content);
  formData.append('UserName',this.myFrom.value.name);
  formData.append('title',this.myFrom.value.title);
  formData.append('image',this.image);
  formData.append('tags',this.tags)
  console.log(formData);

  this.Service.addBlogs(formData).subscribe(()=>{
        this.goBack();
  })
}

goBack()
{
  this.router.navigate(['/home'])
}


}
