class Constants {
	ApiUrl() {
		return {
			posts: 'http://localhost:3000/posts'
		}
	}

	DOMSelectors() {
		return {
			alert: document.querySelector('.alert'),
			postForm: document.querySelector('.postsContainer'),
			cardForm: document.querySelector('.card-form'),
			post: document.querySelector('#posts'),
			titleInput: document.querySelector('#title'),
			bodyInput: document.querySelector('#body'),
			idInput: document.querySelector('#id'),
			postSubmit: document.querySelector('.post-submit'),
			postCancel: document.querySelector('.post-cancel'),
			formEnd: document.querySelector('.form-end')
		}
	}
}

export const constants = new Constants();