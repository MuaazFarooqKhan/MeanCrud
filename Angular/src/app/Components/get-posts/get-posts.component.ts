import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-get-posts',
  templateUrl: './get-posts.component.html',
  styleUrls: ['./get-posts.component.css']
})
export class GetPostsComponent implements OnInit {

  constructor(private _posts:PostsService) { }

  ngOnInit(): void {
    this._posts.getPosts().subscribe((posts)=>{
      console.log(posts)
    })
 
  }

}
