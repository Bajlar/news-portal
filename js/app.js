const fetchCategories = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllCategories(data.data.news_category));
};

const showAllCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    const { category_id, category_name } = category;
    const div = document.createElement("div");
    div.innerHTML = `
      <a class="nav-link fw-medium" href="#" onclick="fetchCategoriesNews('${category_id}', '${category_name}')">${category_name}</a>
    `;
    categoriesContainer.appendChild(div);
  });
};

const fetchCategoriesNews = (id, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllNews(data.data, name));
};

const showAllNews = (news, name) => {
  const count = document.getElementById("news-count");
  count.innerText = news.length;
  const categoryName = document.getElementById("category-name");
  categoryName.innerText = name;

  const allNews = document.getElementById("all-news");
  allNews.innerHTML = '';

  news.forEach((item) => {
    const {_id, image_url, title, details, rating, author, total_view } = item;
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    div.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${image_url} class="img-fluid rounded-start" alt="" />
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            ${details.slice(0, 200)}...
          </p>
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
          <div class="d-flex gap-2 justify-content-center align-items-center">
            <diV>
              <img src=${
                author.img
              } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
            </diV>
            <div>
              <p class="m-0 p-0">${
                author.name ? author.name : "Not Available"
              }</p>
              <p class="m-0 p-0">${author.published_date}</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-2">
            <div>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star-half text-warning"></i>
            </div>
            <div>${rating.number}</div>
          </div>
          <div>
            <i class="fas fa-arrow-right text-primary" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal"
            data-bs-target="#exampleModal"></i>
          </div>
        </div>
      </div>
    </div>
    `;
    allNews.appendChild(div);
  });
};

const fetchNewsDetail = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModalDetails(data.data[0]));
};

const showModalDetails = (element) => {
  const { image_url, details, title, total_view, rating, author } = element;
  document.getElementById("modal-body").innerHTML = `
    <div class="row g-0">
      <div class="col-md-12">
        <img src=${image_url} class="img-fluid rounded-start" alt="" />
      </div>
      <div class="col-md-12 d-flex flex-column mt-3">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            ${details}
          </p>
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center mt-3">
          <div class="d-flex gap-2 justify-content-center align-items-center">
            <diV>
              <img src=${
                author.img
              } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
            </diV>
            <div>
              <p class="m-0 p-0">${
                author.name ? author.name : "Not Available"
              }</p>
              <p class="m-0 p-0">${author.published_date}</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-2">
            <div>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star-half text-warning"></i>
            </div>
            <div>${rating.number}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

fetchCategories();
