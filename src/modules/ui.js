import { constants } from './constants';

class UI {
	constructor() {
		this.forState = 'add';
	}

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

	clearAlert() {
		const currentAlert = constants.DOMSelectors().alert;

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		constants.DOMSelectors().titleInput.value = '';
		constants.DOMSelectors().bodyInput.value = '';
	}
}

export const ui = new UI();