import { http } from './modules/http';
import { ui } from './modules/ui';
import { constants } from './modules/constants';

///// Start of event listeners /////

// Get posts on Dom load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
constants.DOMSelectors().postSubmit.addEventListener('click', submitPost);

// Listen for edit and delete button click event
constants.DOMSelectors().post.addEventListener('click', e => {
	e.preventDefault();

	if (e.target.parentElement.classList.contains('delete')) {
		deletePost(e);
	}

	if (e.target.parentElement.classList.contains('edit')) {
		enableEdit(e);
	}
});

// Listen for cancel edit
constants.DOMSelectors().cardForm.addEventListener('click', cancelEdit);

///// End of event listeners /////

///// Start of methods /////

// Get Posts
function getPosts() {
	const apiPosts = constants.ApiUrl().posts;
	http.get(apiPosts)
		.then(data => ui.showPosts(data))
		.catch(err => console.log(err));
}

// Submit Post
function submitPost() {
	const title = constants.DOMSelectors().titleInput.value;
	const body = constants.DOMSelectors().bodyInput.value;
	const id = constants.DOMSelectors().idInput.value;
	const apiPosts = constants.ApiUrl().posts;

	// Input validation
	if (title && body && title.trim() !== '' && body.trim() !== '') {
		const data = {
			title,
			body
		};
		// Check for ID
		if (id === '') {
			// Create Post
			http.post(apiPosts, data)
				.then(data => {
					ui.showAlert('Post added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch(err => console.log(err));
		} else {
			// Update Post
			http.put(`${apiPosts}/${id}`, data)
				.then(data => {
					ui.showAlert('Post updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch(err => console.log(err));
		}
	} else {
		ui.showAlert('All fields are required', 'alert alert-danger');
	}
}

// Delete Post
function deletePost(e) {
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

// Enable Edit State
function enableEdit(e) {
	const id = e.target.parentElement.dataset.id;

	http.get(`${constants.ApiUrl().posts}/${id}`)
	.then(data => {
		// Fill form with current post
		ui.fillForm(data);
	})
	.catch(err => console.log(err));
}

// Cancel Edit State
function cancelEdit(e) {
	e.preventDefault();
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
}

///// End of methods /////