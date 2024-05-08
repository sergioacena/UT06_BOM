class RestaurantView {
  constructor() {
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".navbar-nav");
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
  }

  showCategories(categories) {
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.name}</h3>
          <div>${category.description}</div>
        </div>
      </a>
    </div>`
      );
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="title" >Categorías</h1><br>`
    );
    this.categories.append(container);
  }

  showCategoriesInMenu(categories) {
    // console.log("añadiendo categorías al menú", categories); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showAllergensInMenu(allergens) {
    // console.log("añadiendo alergenos al menú", allergens); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAllerg" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#product-list">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenusInMenu(menus) {
    // console.log("añadiendo menus al menú", menus); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenu" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#product-list">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  //mostrar restaurantes en el menú de navegación
  showRestaurantsInMenu(restaurants) {
    // console.log("añadiendo restaurantes al menú", restaurants); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navRest" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRandomDishes(dishes) {
    //copiamos los datos del iterador en un nuevo array
    const allDishes = [...dishes];
    const randomDishes = [];

    //se cogen 3 platos que no tengan duplicados
    while (randomDishes.length < 3 && allDishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allDishes.length);
      randomDishes.push(allDishes[randomIndex]);
      //se elimina el plato que se ha elegido para evitar que vuelva a salir
      allDishes.splice(randomIndex, 1);
    }

    //Limpia cualquier plato existente en el contenedor this.dishes
    this.dishes.replaceChildren();
    //Si hay más de un hijo en this.dishes elimina el segundo hijo (para evitar duplicados)
    if (this.dishes.children.length > 1) {
      this.dishes.children[1].remove();
    }
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const dish of randomDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-dish="${dish.dish.name}" href="#single-product" class="img-wrap"><img class="${dish.dish.constructor.name}-style" src="${dish.dish.image}"></a>
          <figcaption class="info-wrap">
            <div class="row">
              <div class="col-md-8"> <a data-dish="${dish.dish.name}" href="#single-product" class="title2">${dish.dish.name}</a> </div>
              <div class="col-md-4">
                <div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
              </div>
            </div>
          </figcaption>
        </figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class= "title">Platos aleatorios</h1><br>`
    );

    this.dishes.append(container);
  }

  listProducts(products, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "product-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    //Se verifica que products no sea nulo/undefined
    if (products && products.length) {
      for (const dish of products) {
        //Validamos que el objeto dish tenga la propiedad name
        if (dish && dish.name) {
          const div = document.createElement("div");
          div.classList.add("col-md-4");
          div.insertAdjacentHTML(
            "beforeend",
            `<figure class="card card-product-grid card-lg"> <a data-dish="${dish.name}" href="#single-product" class="img-wrap"><img class="${dish.constructor.name}-style" src="${dish.image}"></a>
                    <figcaption class="info-wrap">
                    <div class="row">
                        <div class="col-md-8"> <a data-dish="${dish.name}" href="#single-product" class="title2">${dish.name}</a> </div>
                        <div class="col-md-4">
                        <div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
                        </div>
                    </div>
                    </figcaption>
                    </figure>`
          );
          container.children[0].append(div);
        } else {
          console.warn(
            "Objeto `dish` no tiene la propiedad `name` definida:",
            dish
          );
        }
      }
    } else {
      console.warn("No hay productos disponibles para mostrar.");
    }

    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class= "title">${title}</h1><br>`
    );
    this.categories.append(container);
  }

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById("category-list");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  bindProductsCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  bindProductsAllergenListInMenu(handler) {
    const navAllerg = document.getElementById("navAllerg");
    const links = navAllerg.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }

  bindProductsMenuListInMenu(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
      });
    }
  }

  bindRestaurantsInMenu(handler) {
    const navRest = document.getElementById("navRest");
    if (navRest) {
      const links = navRest.nextSibling.querySelectorAll("a");
      for (const link of links) {
        link.addEventListener("click", (event) => {
          event.preventDefault(); //Evita la navegación predeterminada
          handler(event.currentTarget.dataset.restaurant);
        });
      }
    } else {
      console.warn("No se encontró el elemento con ID 'navRest'");
    }
  }

  showRestaurant(rest, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1) {
      this.categories.children[1].remove();
    }

    const container = document.createElement("div");
    container.id = "restaurantes";
    container.classList.add("container", "restaurant-container");

    const content = `
        <h1 class="restaurant-header">${title}</h1>
        <div class="restaurant-details">
            <div class="restaurant-description">${rest.description}</div>
            <div class="restaurant-location">Localización - ${
              rest.location ? rest.location.toString() : "No disponible"
            }</div>
        </div>`;

    container.innerHTML = content;
    this.categories.append(container);
  }

  showProduct(product, message) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("mt-5");
    container.classList.add("mb-5");

    if (product) {
      container.id = "single-product";
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${
                    product.image
                  }"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                    product.name
                  }</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.ingredients.join(
                    ", "
                  )}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`
      );
    }
    this.main.append(container);
  }

  bindShowProduct(handler) {
    const productList = document.getElementById("product-list");
    const links = productList.querySelectorAll("a.img-wrap");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  bindShowRandomProduct(handler) {
    const productList = document.getElementById("random-list");
    const links = productList.querySelectorAll("a.img-wrap");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  //Actualización de breadcrumbs
  updateBreadcrumbs(label, href = "#") {
    const breadcrumbList = document.getElementById("breadcrumb-list");

    //Elimina todos los elementos después de "Inicio"
    while (breadcrumbList.children.length > 1) {
      breadcrumbList.removeChild(breadcrumbList.lastChild);
    }

    //Se añade un elemento nuevo para el siguiente paso
    const newItem = document.createElement("li");
    newItem.classList.add("breadcrumb-item");

    //Si no hay enlace, entonces es el elemento activo
    if (href === "#") {
      newItem.textContent = label;
      newItem.classList.add("active");
      newItem.setAttribute("aria-current", "page");
    } else {
      newItem.innerHTML = `<a href="${href}">${label}</a>`;
    }

    //Añade el nuevo elemento al final de la lista
    breadcrumbList.appendChild(newItem);
  }
}

export default RestaurantView;
