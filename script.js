const users = document.querySelector(".showUsers");
const divTag = document.createElement("div");
const buttonTag = document.querySelector(".btn");
const userNameTag = document.querySelector(".userName");
const emailTag = document.querySelector(".getEmail");
const passwordTag = document.querySelector(".getPassword");
let id;
let userssssss;
fetch("https://newproject-8gy1.onrender.com/users")
  .then((res) => res.json())
  .then((data) => {
    id = data.length + 1;
  });

const fetchData = async () => {
  // fetching data to display UI
  const data = "https://newproject-8gy1.onrender.com/users";
  const dataFromServer = await fetch(data);
  const response = await dataFromServer.json();
  for (let i = 0; i < response.length; i++) {
    divTag.innerHTML += `
    <div class='mb-3 user-section' id=${response[i].id}>
        <div>Name: <strong class='ms-2'>${response[i].userName}</strong><div>
        <div>Email: <strong class='ms-2'>${response[i].email}</strong><div>
        <div>Password: <strong class='ms-2'>${response[i].password}</strong><div>
        <div class="edit-delete-panel">
          <i class="fa-solid fa-pen" onclick={editUserBtn(this)} id=${response[i].id}></i>
          <i class="fa-solid fa-trash" onclick={deleteUserBtn(this)} id=${response[i].id}></i>
        </div>
    </div>`;
  }
};

users.append(divTag);
fetchData();

const handleClick = async () => {
  // register user
  let userName = userNameTag.value;
  let email = emailTag.value;
  let password = passwordTag.value;

  const formData = {
    id,
    userName,
    email,
    password,
  };
  const response = fetch("https://newproject-8gy1.onrender.com/users", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  console.log((await response).json);
  window.location.reload();
};

// delete user
const deleteUserBtn = async (e) => {
  // const deleteUserBtnTag = document.querySelector(".deleteUser");
  // const deleteUserInputTag = document.querySelector(".deleteUserInput");
  let id = parseInt(e.id);
  const formData = {
    id,
  };
  fetch("http://localhost:3000/users", {
    method: "DELETE",
    body: JSON.stringify(formData),
  });
  // console.log((await response).json());
  window.location.reload();
  console.log(id);
};

// edit users

// const editUserDivTag = document.querySelector(".editUsers");
const editUserDivTwo = document.createElement("div");

const editUserBtn = async (e) => {
  const dataFromServer = await fetch(
    "https://newproject-8gy1.onrender.com/users"
  );

  const response = await dataFromServer.json();

  response.map((item) => {
    if (item.id === parseInt(e.id)) {
      console.log(item.userName, item.email, item.password);
      document.querySelector(".editUsers").innerHTML += `
      <div>
      <input
      type="text"
      class="form-control updateUserName"
      id="exampleFormControlInput1"
      placeholder="Enter your usename"
      value=${item.userName}
    />
      </div>
      <button type="button" class="btn btn-primary" onclick={userDeleteBin(this)} id=${item.id}">Update User</button>
      `;
    }
  });
};

const userDeleteBin = async (e) => {
  let id = parseInt(e.id);
  console.log(parseInt(e.id));
  let userName = document.querySelector(".updateUserName").value;
  const formData = {
    id,
    userName,
  };
  fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify(formData),
  });
  window.location.reload();
};

const createFile = async () => {
  const fileUploadTag = document.querySelector("#fileUpload");
  const response = await fetch(
    "https://newproject-8gy1.onrender.com/fileUpload",
    {
      method: "POST",
      body: fileUploadTag.files[0],
    }
  );
  console.log(await response.json());
};
