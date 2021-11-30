'use strict';
const id = new URLSearchParams(window.location.search).get('id');

const getBlog = async function () {
  let url = `http://localhost:3000/posts/${id}`;
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

const blog = new Blog(document.querySelector('.blog'));
// The DOMContentLoaded event fires when the initial HTML document has been completely
// loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
window.addEventListener('DOMContentLoaded', getBlog);
