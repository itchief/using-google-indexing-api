const getURLStatus = async(url, action = 'get') => {
  try {
    const data = new FormData();
    data.append('url', url);
    data.append('action', action);
    let response = await fetch('/php/indexing.php', {
      method: 'post',
      body: data
    });
    document.querySelector('#result').innerHTML = '';
    document.querySelector('#url').classList.remove('is-invalid');
    document.querySelector('.invalid-feedback').textContent = '';
    if (response.ok) {
      let result = await response.json();
      if (result['result'] === 'error') {
        const error = result['error'];
        document.querySelector('#url').classList.add('is-invalid');
        document.querySelector('.invalid-feedback').textContent = error;
      } else {
        document.querySelector('#result').innerHTML = `<pre class="mb-0">${result.body}</pre>`;
      }
    }
  } catch (error) {
    document.querySelector('#result').innerHTML = error;
  }
}

document.querySelector('#get-status').onclick = () => {
  getURLStatus(document.querySelector('#url').value);
}

document.querySelector('#update').onclick = () => {
  getURLStatus(document.querySelector('#url').value, 'update');
}

document.querySelector('#delete').onclick = () => {
  getURLStatus(document.querySelector('#url').value, 'delete');
}
