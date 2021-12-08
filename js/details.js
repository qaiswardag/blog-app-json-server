'use strict';
import { RESOURCES } from './config.js';

const myAlert = function (string, error = 'Server Error') {
  const container = document.querySelector('.container');
  const modal = document.createElement('div');
  modal.classList.add('alert');
  modal.innerHTML = `${string} ${error}`;
  container.prepend(modal);
  //
  setTimeout(() => {
    modal.style.display = 'none';
  }, 5000);
};

const id = new URLSearchParams(window.location.search).get('id');
const deleteBtn = document.querySelector('.delete');
const editBtn = document.querySelector('.editBtn');

const getBlog = async function () {
  let url = `${RESOURCES}/${id}`;
  const response = await fetch(url);
  const blogData = await response.json();
  blog.renderBlog(blogData);
};
//
//
//
class Blog {
  constructor(container) {
    this.blogContainer = container;
    //
  }
  renderBlog(blog) {
    this.blogContainer.innerHTML = this.markup(blog);
    //
    //
  }
  markup(blog) {
    const html = `
	<div class="post-single">
	<h3>${blog.title}</h3>
	<span class="post-tag"><strong>ID: </strong>${blog.id}</span>
	<span class="post-tag post-tag--red"><strong>Likes: </strong>${blog.likes}</span>
	<p>${blog.body}</p>
	</div>
	`;

    return html;
  }
}

// delete blog
deleteBtn.addEventListener('click', async (e) => {
  const response = await fetch(`${RESOURCES}/${id}`, {
    method: 'DELETE',
  });

  window.location.replace('/index.html');
});
//
//
// edit blog
editBtn.addEventListener('click', (e) => {
  window.location = `/edit.html?id=${id}`;
});
//
//
//
const blog = new Blog(document.querySelector('.blog'));
// The DOMContentLoaded event fires when the initial HTML document has been completely
// loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
window.addEventListener('DOMContentLoaded', getBlog);
