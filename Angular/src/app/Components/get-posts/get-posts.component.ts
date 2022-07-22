import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { MatTableDataSource } from '@angular/material/table';

interface PeriodicElement {
  id: number;
  author: string;
  page: number;
  rating: number;
  title: string;
}

@Component({
  selector: 'app-get-posts',
  templateUrl: './get-posts.component.html',
  styleUrls: ['./get-posts.component.css']
})
export class GetPostsComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['id', 'author', 'page', 'rating', 'title'];
  dataSource:any;

  constructor(private _posts: PostsService) { }

  ngOnInit(): void {
    this._posts.getPosts().subscribe((posts) => {
      posts.forEach((element: any) => {
        this.ELEMENT_DATA.push({
          id: parseInt(posts.length) + 1,
          author: element.author,
          page: element.page,
          rating: element.rating,
          title: element.title,
        });
      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
    })

  }

}
