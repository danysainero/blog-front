import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from '../_dtos/post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPostsById(id): Observable<any> {
    return this.http.get<PostDTO>(`http://localhost:3001/api/blog/posts/${id}`);
  }
}

/* Si pongo Observable<postDTO> da este error:
Type 'Observable<HttpEvent<PostDTO>>' is not assignable to type 'Observable<PostDTO>'.

*/
/* Type 'Observable<ArrayBuffer>' is not assignable to type 'Observable<PostDTO>'.
  Type 'ArrayBuffer' is missing the following properties from type 'PostDTO':
   comments, _id, postAuthorName, postAuthorNickName, and 6 more. */
