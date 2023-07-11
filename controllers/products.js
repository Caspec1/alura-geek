const productsPage = document.querySelector('#products-page');

document.addEventListener('DOMContentLoaded', () => {
  const guitarUrl = "https://alura-geek-api-rtnj.onrender.com/guitars";
  const consolesUrl = "https://alura-geek-api-rtnj.onrender.com/consoles";
  const othersUrl = "https://alura-geek-api-rtnj.onrender.com/others";
  let guitars = [];
  let consoles = [];
  let others = [];
  let allProducts = [];

  const guitarPromise = new Promise((resolve, reject) => {
    fetch(guitarUrl)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  const consolesPromise = new Promise((resolve, reject) => {
    fetch(consolesUrl)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  const othersPromise = new Promise((resolve, reject) => {
    fetch(othersUrl)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  Promise.all([guitarPromise, consolesPromise, othersPromise])
    .then(data => {
      guitars = data[0];
      consoles = data[1];
      others = data[2];
      allProducts = [...guitars, ...consoles, ...others];
    })
    .then(() => {
      renderProducts(productsPage, allProducts);
    });
})

const renderProducts = (div, products) => {
  products.forEach(product => {
    const prod = document.createElement('div');
    prod.classList.add('product');

    const image = document.createElement('img');
    image.classList.add('product__image');
    image.src = product.url;
    image.alt = "Product Image";

    const title = document.createElement('h4');
    title.classList.add('product__title');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('product__price');
    price.textContent = `$${product.price} USD`;

    const link = document.createElement('a');
    link.classList.add('product__link');
    link.href = `../product.html?id=${product.id}&category=${product.category}`;
    link.textContent = "Ver producto";

    const actions = document.createElement('div');
    actions.classList.add('product__actions');

    const edit = document.createElement('a');
    edit.classList.add('product__edit');
    edit.href = `../add-product.html?id=${product.id}&category=${product.category}`;

    const editIcon = document.createElement('img');
    editIcon.src = "../img/edit.svg";
    editIcon.alt = "Edit Icon";
    edit.appendChild(editIcon);

    const remove = document.createElement('button');
    remove.classList.add('product__remove');
    remove.type = "button";
    remove.dataset.id = product.id;
    remove.id = "remove-button"
    remove.onclick = () => removeProduct(product.id, product.category);

    const removeIcon = document.createElement('img');
    removeIcon.src = "../img/remove.svg";
    removeIcon.alt = "Remove Icon";
    remove.appendChild(removeIcon);

    actions.appendChild(edit);
    actions.appendChild(remove);

    prod.appendChild(image);
    prod.appendChild(title);
    prod.appendChild(price);
    prod.appendChild(link);
    prod.appendChild(actions);

    div.appendChild(prod);
  });
}

const removeProduct = (id, category) => {
  fetch(`https://alura-geek-api-rtnj.onrender.com/${category}/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      window.location.reload();
    })
    .catch(err => console.log(err));
}
