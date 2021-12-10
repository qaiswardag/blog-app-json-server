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
//
const blogContainer = document.querySelector('.blogs');
//
//
const getData = async function (term) {
  // Sorting blogs:
  // Sorting blogs with most likes
  let url = `${RESOURCES}?_sort=likes&_order=desc`;

  // taking term and checking if term is true or empty
  // if term is true, then term is being added to the end of url
  if (term) {
    url += `&title_like=${term}`;
    // url += `&q=${term}`;
  }
  //
  const response = await fetch(url);
  //
  // Sorting blogs with likes but lowest likes first
  // `${RESOURCES}?_sort=likes&_order=desc`
  //
  //
  // no sorting involved
  // const response = await fetch(`${RESOURCES}`);
  const posts = await response.json();
  display.render(posts);
};

class Display {
  constructor(blogsContainer) {
    this.blogsContainer = blogsContainer;
  }
  render(posts) {
    this.blogsContainer.innerHTML = '';
    posts.forEach((blog) => {
      //
      const html = `
	  <div class="post-single">
    <a href="./src/views/details.html?id=${blog.id}">
    <h3 class="title">${blog.title}</h3>
    </a>
	  <span class="post-tag"><strong>ID: </strong>${blog.id}</span>
	  <span class="post-tag post-tag--red"><strong>Likes:</strong>
    ${blog.likes}
    </span>
    <p>${blog.body.slice(0, 200)}
    <a href="./src/views/details.html?id=${blog.id}">read more...</a>
    </p>
	  </div>
	  `;
      //
      this.blogsContainer.insertAdjacentHTML('beforeend', html);
    });
  }
}
//
//
// search for blog
const searchForm = document.querySelector('.search');
//
const filterBlog = async function (e) {
  e.preventDefault();
  let term = e.target.term.value.toLowerCase().trim();
  getData(term);
  // reset form
  // e.target.reset();
};
searchForm.addEventListener('submit', filterBlog);
//
//
const display = new Display(blogContainer);
// The DOMContentLoaded event fires when the initial HTML document has been completely
// loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
window.addEventListener('DOMContentLoaded', () => {
  getData();
});
