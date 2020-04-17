import { http } from './modules/http';
import { ui } from './modules/ui';
import { constants } from './modules/constants';

///// Start of event listeners /////

// Get posts on Dom load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
constants.DOMSelectors().postSubmit.addEventListener('click', submitPost);

// Listen for delete post
constants.DOMSelectors().post.addEventListener('click', deletePost);

///// End of event listeners /////

///// Start of methods /////

// Get Posts
function getPosts() {
	const apiPosts = constants.ApiUrl().posts;
	http.get(apiPosts)
		.then(data => ui.showPosts(data))
		.catch(err => console.log(err))
}

// Submit Post
function submitPost() {
	const title = constants.DOMSelectors().titleInput.value;
	const body = constants.DOMSelectors().bodyInput.value;
	const apiPosts = constants.ApiUrl().posts;

	// Input validation
	if (title && body && title.trim() !== '' && body.trim() !== '') {
		const data = {
			title,
			body
		}

		// Create Post
		http.post(apiPosts, data)
			.then(data => {
				ui.showAlert('Post added', 'alert alert-success');
				ui.clearFields();
				getPosts();
			})
			.catch(err => console.log(err))
	} else {
		ui.showAlert('All fields are required', 'alert alert-danger');
	}
}

// Delete Post
function deletePost(e) {
	e.preventDefault();
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		if (confirm('Are you sure?')) {
			http.delete(`${constants.ApiUrl().posts}/${id}`)
			.then(data => {
				ui.showAlert('Post Removed', 'alert alert-success');
				getPosts();
			})
			.catch(err => console.log(err));
		}
	}
	
}

///// End of methods /////