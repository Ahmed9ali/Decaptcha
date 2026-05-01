const apiKey = "AIzaSyBH7yGCStUQHZiqJQFC7Rx7B97RHxq5heo";
fetch(`https://identitytoolkit.googleapis.com/v1/projects?key=${apiKey}`)
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(console.error);
