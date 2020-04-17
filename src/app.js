import { http } from './modules/http';
import { ui } from './modules/ui';
import { constants } from './modules/constants';

///// Start of event listeners /////

// Get posts on Dom load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
constants.DOMSelectors().postSubmit.addEventListener('click', submitPost);

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
function submitPost(post) {
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

///// End of methods /////