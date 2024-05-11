import RestaurantApp from "./restaurantApp.js";

const historyActions = {
  init: () => {
    console.log("inicio");
    RestaurantApp.handleInit();
  },
  productsCategoryList: (event) => {
    console.log("entra en categoría");
    RestaurantApp.handleProductsCategoryList(event.state.category);
  },
  productsAllergenList: (event) =>
    RestaurantApp.handleProductsAllergenList(event.state.allergen),
  productsMenuList: (event) =>
    RestaurantApp.handleProductsMenuList(event.state.menu),
  restaurantsList: (event) =>
    RestaurantApp.handleRestaurant(event.state.restaurant),
  showProduct: (event) => RestaurantApp.handleShowProduct(event.state.dish),
  showRandomProduct: (event) => {
    console.log("entra en el plato random");
    RestaurantApp.handleShowProduct(event.state.dish);
  },
};

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

// Configura el estado inicial
history.replaceState({ action: "init" }, null);
