import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog_model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

constructor(private Service:ServiceService,public roter:Router,public router:ActivatedRoute) { }
id:any
pic:any
blog = new Blog();
image:String
check:boolean
check2:boolean
url:any
  ngOnInit(): void {
    this.check = false
    this.check2 = true;
      this.id = this.router.snapshot.params['id'];
      this.getBlog();
  }

  getBlog(){
    this.Service.findOne(this.id).subscribe((res)=>{
      this.blog = res;
      console.log(res)
    })
  }

  takeimage(event){
    if(event.target.files.length > 0){
      const file = event.srcElement.files[0].name;
      this.image = file;
      this.pic = event.target.files[0];
      this.check2 = false
      this.check=true
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event) => { 
        this.url = event.target.result;
      }
    }
  }

uploadImage(){
  const formData = new FormData();
  formData.append('file', this.pic);
  this.Service.uploadImage(formData).subscribe(()=>{
    this.blog.image = this.image;
    this.update();

  })

}

update(){
  this.Service.updateBlog(this.id,this.blog).subscribe(()=>{
    this.goBack();
  })
}

goBack(){
      this.roter.navigate(['/home'])
}

}
