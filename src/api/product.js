import host from "./host";

const route_product = "/product";

const getProducts = async () => {
  var response = await fetch(host + route_product, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  });
  return response;
};

const createProduct = async (name, description, price, stock) => {
  var response = await fetch(host + route_product, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      Name: name,
      Description: description,
      Price: price,
      Stock: stock,
    }),
  });
  return response;
};

const updateProduct = async (id, name, description, price, stock) => {
  var response = await fetch(host + route_product + "/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      Name: name,
      Description: description,
      Price: price,
      Stock: stock,
    }),
  });
  return response;
};

const deleteProduct = async (id) => {
  var response = await fetch(host + route_product + "/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  });
  return response;
};

export default { getProducts, createProduct, updateProduct, deleteProduct };
