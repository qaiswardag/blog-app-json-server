'use strict';
import { RESOURCES } from './config.js';
//
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
//
const updateBtn = document.querySelector('.update');
const form = document.querySelector('form');
// id
const id = new URLSearchParams(window.location.search).get('id');
//
//
//
//
const getBlog = async function () {
  const response = await fetch(`${RESOURCES}/${id}`);
  const data = await response.json();
  blog.renderBlog(data);
};
getBlog();

class Blog {
  constructor(form) {
    this.form = form;
  }
  renderBlog(data) {
    this.form.title.value = data.title;
    this.form.body.value = data.body;
  }
  updateBlog() {
    console.log((this.form.title.value = data.title));
  }
}
const blog = new Blog(form);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const body = e.target.body.value;

  const doc = {
    title,
    body,
  };
  try {
    await fetch(`${RESOURCES}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    window.location.replace('/index.html');
  } catch (error) {
    myAlert(
      'Unable to update blog. Please try again.<br>Error message:',
      error
    );
  }
});
