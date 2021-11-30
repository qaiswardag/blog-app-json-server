'use strict';
//
//
//
const getData = async function () {
  // Sorting blogs:
  //
  // Sorting blogs with likes
  const response = await fetch('http://localhost:3000/posts?_sort=likes');
  //
  // Sorting blogs with likes but lowest likes first
  // 'http://localhost:3000/posts?_sort=likes&_order=desc'
  //
  //
  // no sorting involved
  // const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  display.render(posts);
};

class Display {
  constructor(blogsContainer) {
    this.blogsContainer = blogsContainer;
  }
  render(posts) {
    posts.forEach((blog) => {
      //
      const html = `
	  <div class="post-single">
    <a href="/details.html?id=${blog.id}"><h3>${blog.title}</h3></a>
	  <span class="post-tag"><strong>ID: </strong>${blog.id}</span>
	  <span class="post-tag post-tag--red"><strong>Likes: </strong>${
      blog.likes
    }</span>
	  <p>${blog.body.slice(0, 200)}<a href="/details.html?id=${
        blog.id
      }">read more...</a></p>
	  </div>
	  `;
      //
      this.blogsContainer.insertAdjacentHTML('afterend', html);
    });
  }
}

const display = new Display(document.querySelector('.blogs'));
// The DOMContentLoaded event fires when the initial HTML document has been completely
// loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
window.addEventListener('DOMContentLoaded', getData);
