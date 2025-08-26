import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  userid: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('api_use-demo');
  apilink = "https://jsonplaceholder.typicode.com/posts"

  postsData: Post[] = [];
  constructor(private http: HttpClient) {
    // this.getPostsData();
  }
  post = {
    title: '',
    body: '',
    userId: 0,
    id : 0
  }

  getPostsData() {
    this.http.get(this.apilink).subscribe((result: any) => {
      this.postsData = result;
    })
  }
  ngOnInit() {
    this.getPostsData();
  }

  isPost: boolean = false;
  togglepost(){
    this.isPost = !this.isPost;
  }

  postEmpData(emp: any) {
    this.http.post(this.apilink, emp).subscribe((result: any) => {
      console.log(emp);
    })
  }

  updatePost(postId: number) {
    this.http.put(`${this.apilink}/${postId}`, this.post).subscribe((result: any) => {
      console.log(result);
    })
  }

  deletePost(postId: number) {
    this.http.delete(`${this.apilink}/${postId}`).subscribe((result: any) => {
      console.log(result);
    })
  }
}
