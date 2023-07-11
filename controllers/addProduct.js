const urlInput = document.getElementById('product-url');
const categoryInput = document.getElementById('product-category');
const nameInput = document.getElementById('product-name');
const priceInput = document.getElementById('product-price');
const descriptionInput = document.getElementById('product-description');
const submitAdd = document.getElementById('submit-add');
const titleAdd = document.getElementById('title-add');

const params = new URLSearchParams(window.location.search);
const idParam = params.get('id');
const categoryParam = params.get('category');
let request = {};

const onChange = (input) => {
  input.addEventListener('input', (e) => {
    request[input.name] = e.target.value;
  })
}

if (idParam) {
  document.addEventListener('DOMContentLoaded', async () => {
    submitAdd.value = "Editar producto";
    titleAdd.innerHTML = "Editar producto";
    const response = await fetch(`https://alura-geek-api-rtnj.onrender.com/${categoryParam}/${idParam}`)
    const data = await response.json();
    request = {
      id: data.id,
      name: data.name,
      url: data.url,
      price: data.price,
      description: data.description,
      category: data.category
    }

    urlInput.value = data.url;
    nameInput.value = data.name;
    priceInput.value = data.price;
    descriptionInput.value = data.description;
    categoryInput.value = categoryParam;

    onChange(urlInput);
    onChange(nameInput);
    onChange(priceInput);
    onChange(descriptionInput);

    categoryInput.addEventListener('change', (e) => {
      request.category = e.target.value;
    })

    submitAdd.addEventListener('click', async (e) => {
      e.preventDefault();
      submitAdd.disabled = true;

      await fetch(`https://alura-geek-api-rtnj.onrender.com/${request.category}/${request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
      })
      window.location.href = `../products.html`
    })
  })
} else {
  submitAdd.value = "Agregar producto";
  titleAdd.innerHTML = "Agregar producto";
  let category;

  onChange(urlInput);
  onChange(nameInput);
  onChange(priceInput);
  onChange(descriptionInput);

  categoryInput.addEventListener('change', (e) => {
    category = e.target.value;
  })

  submitAdd.addEventListener('click', async (e) => {
    e.preventDefault();
    submitAdd.disabled = true;
    const response = await fetch(`https://alura-geek-api-rtnj.onrender.com/${category}`)
    const data = await response.json();
    const id = data[data.length - 1].id + 1;
    const body = {
      id,
      ...request
    }

    await fetch(`https://alura-geek-api-rtnj.onrender.com/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    window.location.href = `../products.html`
  })
}
