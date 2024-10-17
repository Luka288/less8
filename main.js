"use strict";

const main = document.getElementById("mainContainer");
const wrapper = document.querySelector(".colorBoxWrap");
const namesContainer = document.querySelector(".names");

xml();
loadInfoWithFetch();
function xml() {
  const request = new XMLHttpRequest();
  request.open("GET", "https://reqres.in/api/unknown");

  request.addEventListener("load", function () {
    let parse = JSON.parse(request.responseText);
    console.log(parse);
    parse.data.forEach((data) => {
      const div = document.createElement("div");

      div.classList.add("colorBox");
      div.style.backgroundColor = data.color;

      wrapper.appendChild(div);
    });
  });

  request.send();
}

function loadInfoWithFetch() {
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach((resName) => {
        const name = document.createElement("h1");

        name.innerText = `Employe name: ${resName.name}`;

        namesContainer.appendChild(name);
      });
    });
}

// load prev

let currentpage = 1;
let totalPages;

getUsers(currentpage);

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseData) {
      console.log(responseData);
      if (!responseData.ok) {
        throw responseData.status;
      }
      return responseData.json();
    })
    .then(function (mosulidata) {
      console.log(mosulidata);
      const fragment = new DocumentFragment();

      mosulidata.data.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = `${item.first_name} ${item.last_name}`;
        fragment.appendChild(li);
      });

      console.log(mosulidata);

      // check page
      if (currentpage === 1) {
        document.getElementById("load-prev").disabled = true;
      } else {
        document.getElementById("load-prev").disabled = false;
      }

      if (currentpage === totalPages) {
        document.getElementById("load-more").disabled = true;
      } else {
        document.getElementById("load-more").disabled = false;
      }

      document.getElementById("ul-users").innerHTML = " ";
      document.getElementById("ul-users").appendChild(fragment);

      totalPages = mosulidata.total_pages;
    })
    .catch(function (error) {
      if (error === 404) {
        let pError = document.createElement("p");
        pError.textContent = "Page Not Found";
        document.getElementById("users-wraper").appendChild(pError);
      }
    });
}

getUsers(currentpage);

document.getElementById("load-prev").addEventListener("click", function () {
  if (currentpage === 1) {
    return;
  }
  // currentpage = currentpage -1;
  // currentpage -=1;
  currentpage--;
  getUsers(currentpage);
});

document.getElementById("load-more").addEventListener("click", function () {
  if (currentpage === totalPages) {
    return;
  }
  // currentpage = currentpage + 1
  // currentpage += 1;
  currentpage++;
  getUsers(currentpage);
});
