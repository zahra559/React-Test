import host from "../api/host";

const route_user = "/user";
const act_login = "/login";

const login = async (username, password) => {
  var response = await fetch(host + route_user + act_login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: username,
      Password: password,
    }),
  });
  return response;
};

const getUsers = async () => {
  var response = await fetch(host + route_user, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  });
  return response;
};

const createUser = async (username, email, phone, password) => {
  var response = await fetch(host + route_user, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      UserName: username,
      Email: email,
      PhoneNumber: phone,
      Password: password,
    }),
  });
  return response;
};

const updateUser = async (id, username, email, phone) => {
  var response = await fetch(host + route_user + "/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      UserName: username,
      Email: email,
      PhoneNumber: phone,
    }),
  });
  return response;
};

const deleteUser = async (id) => {
  var response = await fetch(host + route_user + "/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  });
  return response;
};

export default { login, getUsers, createUser, updateUser, deleteUser };
