'use strict';

const form = document.querySelector('form');

const createPost = async function (e) {
  e.preventDefault();

  const doc = {
    title: e.target.title.value,
    body: e.target.body.value,
    likes: 0,
    // no id is needed - as JSON-server is automatically adding an id which is available
  };

  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' },
  });

  //   e.target.reset();
  window.location.replace('/index.html');

  console.log(doc);
};

form.addEventListener('submit', createPost);
