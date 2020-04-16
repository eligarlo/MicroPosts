import { http } from './modules/http';
import { ui } from './modules/ui';


// Get posts on Dom load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
}