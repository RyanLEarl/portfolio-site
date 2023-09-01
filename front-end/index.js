const API_BASE_URL = 'https://5t6a4mxr4k.execute-api.us-west-2.amazonaws.com/main';

directories = [
  '',
  'Resume',
  // 'Projects',
  'References'
  // 'Contact'
]

var getDirectories = directories;

function createHead() {
  const head = document.getElementById("head");
  var title = document.createElement("Title");
  title.innerHTML = "Ryan Earl Portfolio"
  head.appendChild(title);
}

function createHeader() {
  const header = document.getElementById("header");
  var nav = document.createElement("nav");
  var menu = document.createElement("div")
  nav.setAttribute("id", "nav")
  var nameWrapper = document.createElement("div");
  nameWrapper.setAttribute("class", "logo-container");
  var imgWrapper = document.createElement("div");
  imgWrapper.setAttribute("class", "logo-img");
  var img = document.createElement("img");
  img.setAttribute("src", "https://s3.us-west-2.amazonaws.com/ryanearlsoftwareengineer.com/assets/images/ryan_cut_out.png");
  imgWrapper.appendChild(img);
  nameWrapper.appendChild(imgWrapper);
  var name = document.createElement("a");
  name.setAttribute("class", "logo");
  name.setAttribute("href", "/");
  name.innerHTML = "Ryan Earl";
  nameWrapper.appendChild(name);
  nav.appendChild(nameWrapper);

  var hamburgerMenu = document.createElement("button");
  hamburgerMenu.setAttribute("class", "hamburger-menu");
  hamburgerMenu.setAttribute("onclick", "toggleMenu()");

  for (var i = 0; i < 3; i++) {
    var hamburgerLine = document.createElement("span");
    hamburgerLine.setAttribute("class", "hamburger-line");
    hamburgerMenu.appendChild(hamburgerLine);
  }

  nav.appendChild(hamburgerMenu);

  menu.setAttribute("class", "menu");
  var ul = document.createElement("ul");
  ul.setAttribute("class", "links");

  function handleButtonClick(event) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
      button.classList.remove('active');
      if (button === event.target) {
        localStorage.setItem('activeButtonIndex', index);
      }
    });
    event.target.classList.add('active');
  }

  for (i = 0; i<= getDirectories.length-1; i++) {
    var list = document.createElement("li");
    list.setAttribute("class", "link-wrapper");
    var item = document.createElement("a");
    item.setAttribute("class", "btn");
    item.addEventListener('click', handleButtonClick);
    if (getDirectories[i] == "") {
      getDirectories[i] = "Home";
      item.setAttribute("href", "/");
    }
    else {
      item.setAttribute("href", "/pages/"+getDirectories[i]);
    }
    const activeButtonIndex = localStorage.getItem('activeButtonIndex');
    if (i === parseInt(activeButtonIndex)) {
      item.classList.add('active');
    }
    item.innerHTML = getDirectories[i];
    list.appendChild(item)
    ul.appendChild(list);
  }
  menu.appendChild(ul);
  nav.appendChild(menu);
  header.appendChild(nav);
}

function toggleMenu() {
  console.log('toggleMenu function called');
  var navMenu = document.querySelector('.menu');
  navMenu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const senderName = document.getElementById('name').value;
    const senderEmail = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(`senderName: ${senderName}\n senderEmail: ${senderEmail}\n message: ${message}`)
    sendPostEmail(senderName, senderEmail, message);
    document.getElementById("thank-you-message").innerHTML = "Thanks for your message. \nI'll get back to you shortly";
    document.getElementById('contact-form').style.display = 'none';
  });
});

function sendPostEmail(senderName, senderEmail, message) {
  fetch(API_BASE_URL, {
  method: "POST",
  body: JSON.stringify({
    senderName: senderName,
    senderEmail: senderEmail,
    message: message
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
.then(response => response.text())
  .then(text => {
    // Display the return message here
    document.querySelector('#return-message').textContent = text;
  });
}