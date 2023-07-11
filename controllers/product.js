const similarProducts = document.getElementById('product-page-container');
const productContainer = document.getElementById('product-container')

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  const categoryParam = params.get('category');

  const productUrl = `https://alura-geek-api-rtnj.onrender.com/${categoryParam}/${idParam}`
  const productsUrl = `https://alura-geek-api-rtnj.onrender.com/${categoryParam}`

  let product = {};
  let products = [];

  const productPromise = new Promise((resolve, reject) => {
    fetch(productUrl)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  const productsPromise = new Promise((resolve, reject) => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  Promise.all([productPromise, productsPromise])
    .then(data => {
      product = data[0];
      products = data[1];
    })
    .then(() => {
      renderProduct(product);
      const filterProducts = products.filter(prod => prod.id !== product.id);
      renderProducts(similarProducts, filterProducts);
    });
})

const renderProduct = (product) => {
  const img = document.createElement('img');
  img.classList.add('product-page__img');
  img.src = product.url;
  img.alt = "Product Image";

  const productInfo = document.createElement('div');
  productInfo.classList.add('product-page__info');

  const title = document.createElement('h2');
  title.classList.add('product-page__title');
  title.textContent = product.name;

  const price = document.createElement('p');
  price.classList.add('product-page__price');
  price.textContent = `$${product.price} USD`;

  const description = document.createElement('p');
  description.classList.add('product-page__description');
  description.textContent = product.description;

  productInfo.appendChild(title);
  productInfo.appendChild(price);
  productInfo.appendChild(description);

  productContainer.appendChild(img);
  productContainer.appendChild(productInfo);
}

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
    link.href = `https://caspec1.github.io/alura-geek/product?id=${product.id}&category=${product.category}`;
    link.textContent = "Ver producto";

    prod.appendChild(image);
    prod.appendChild(title);
    prod.appendChild(price);
    prod.appendChild(link);

    div.appendChild(prod);
  });
}
