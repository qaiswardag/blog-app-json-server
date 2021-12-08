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

const form = document.querySelector('form');

const createPost = async function (e) {
  e.preventDefault();

  const doc = {
    title: e.target.title.value,
    body: e.target.body.value,
    likes: 0,
    // no id is needed - as JSON-server is automatically adding an id which is available
  };

  try {
    await fetch(`${RESOURCES}`, {
      method: 'POST',
      body: JSON.stringify(doc),
      headers: { 'Content-Type': 'application/json' },
      //
    });
    window.location.replace('/index.html');
  } catch (error) {
    myAlert(
      'Unable to create blog. Please try again.<br>Error message:',
      error
    );
  }
};

form.addEventListener('submit', createPost);
