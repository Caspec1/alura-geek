const guitarDiv = document.querySelector('#guitars');
const consolesDiv = document.querySelector('#consoles');
const othersDiv = document.querySelector('#others');
const year = document.querySelector('#year');

document.addEventListener('DOMContentLoaded', async () => {
  const guitarUrl = "https://alura-geek-api-rtnj.onrender.com/guitars";
  const consolesUrl = "https://alura-geek-api-rtnj.onrender.com/consoles";
  const othersUrl = "https://alura-geek-api-rtnj.onrender.com/others";
  let guitars = [];
  let consoles = [];
  let others = [];

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
    })
    .then(() => {
      renderProducts(guitarDiv, guitars);
      renderProducts(consolesDiv, consoles);
      renderProducts(othersDiv, others);
    });

  year.textContent = new Date().getFullYear();
});

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

    prod.appendChild(image);
    prod.appendChild(title);
    prod.appendChild(price);
    prod.appendChild(link);

    div.appendChild(prod);
  });
}
