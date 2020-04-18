import { constants } from './constants';

class UI {
	constructor() {
		this.forState = 'add';
	}

	// Show all posts
	showPosts(posts) {
		let output = '';

		posts.forEach(post => {
			output += `
                <div class="card mb-3">
                    <div class="card-body">
						<a href="#" class="delete card-link" data-id="${post.id}">
							<i class="fa fa-remove"></i>
						</a>
						<a href="#" class="edit card-link mr-3" data-id="${post.id}">
							<i class="fa fa-pencil"></i>
						</a>
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                    </div>
                </div>
            `;
		});

		constants.DOMSelectors().post.innerHTML = output;
	}

	// Show alert message
	showAlert(message, className) {
		this.clearAlert();

		// Create div
		const div = document.createElement('div');
		// Add classes
		div.className = className;
		// Add text
		div.appendChild(document.createTextNode(message));
		// Get parent
		const container = constants.DOMSelectors().postForm;
		// Get posts
		const card = constants.DOMSelectors().cardForm;
		// Insert alert div
		container.insertBefore(div, card);

		// Timeout
		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	// Clear alert message
	clearAlert() {
		const currentAlert = constants.DOMSelectors().alert;

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	// Clear all fields
	clearFields() {
		constants.DOMSelectors().titleInput.value = '';
		constants.DOMSelectors().bodyInput.value = '';
	}

	// Fill form to edit
	fillForm(data) {
		constants.DOMSelectors().titleInput.value = data.title;
		constants.DOMSelectors().bodyInput.value = data.body;
		constants.DOMSelectors().idInput.value = data.id;

		this.changeFormState('edit');
	}

	// Clear ID hidden value
	clearIdInput() {
		constants.DOMSelectors().idInput.value = '';
	}

	// Change the form state
	changeFormState(type) {
		const cancelButton = constants.DOMSelectors().postCancel;
		if (type === 'edit' && !cancelButton) {
			constants.DOMSelectors().postSubmit.textContent = 'Update Post';
			constants.DOMSelectors().postSubmit.className = 'post-submit btn btn-warning btn-block';

			// Create cancel button
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-light btn-block';
			button.appendChild(document.createTextNode('Cancel Edit'));

			// Get parent element
			const cardForm = constants.DOMSelectors().cardForm;
			// Get element to insert
			const formEnd = constants.DOMSelectors().formEnd;
			// Insert cancel button
			cardForm.insertBefore(button, formEnd)
		} else {
			constants.DOMSelectors().postSubmit.textContent = 'Post It';
			constants.DOMSelectors().postSubmit.className = 'post-submit btn btn-primary btn-block';
			// Remove cancel bn if it is there
			if (cancelButton) {
				cancelButton.remove();
			}
			// Clear ID from hidden field
			this.clearIdInput();
			// Clear text fields
			this.clearFields();
		}
	}
}

export const ui = new UI();