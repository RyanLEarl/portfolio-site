const API_BASE_URL = 'https://5t6a4mxr4k.execute-api.us-west-2.amazonaws.com/main';

directories = [
  '',
  'Resume',
  // 'Projects',
  'References'
  // 'Contact'
]

var skills = [
  {name: "AWS", rating: 4},
  {name: "Python", rating: 4},
  {name: "JavaScript", rating: 4},
  {name: "HTML", rating: 3},
  {name: "CSS", rating: 3},
  {name: "Ruby", rating: 3},
  {name: "React", rating: 2}
];

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

function createFooter() {
  const footer = document.getElementById("footer");
  var icons = document.createElement("div")
  icons.classList.add('icons')
  var linkedInIcon = document.createElement("a")
  
  var gitHubIcon = document.createElement("a")
  var iconsArray = [
    {
      'element': linkedInIcon,
      'link' : 'https://www.linkedin.com/in/ryanleoearl/', 
      'class': 'linkedin'
    }, 
    {
      'element': gitHubIcon,
      'link' : 'https://github.com/Hoboson02', 
      'class': 'github'
    }
  ]
  for (const icon of iconsArray) {
    icon.element.setAttribute('target', '_blank')
    icon.element.setAttribute('href', icon.link)
    icon.element.classList.add('fa', `fa-${icon.class}`)
    icons.appendChild(icon.element)
  }
  footer.appendChild(icons);
  var info = document.createElement("div");
  info.classList.add('info');
  var footnote = document.createElement("div");
  footnote.classList.add('footnote');
  footnote.innerHTML = "RYAN EARL <span class='year'>&#169;2023</span>"
  info.appendChild(footnote)
  footer.appendChild(info)
}

function toggleMenu() {
  console.log('toggleMenu function called');
  var navMenu = document.querySelector('.menu');
  navMenu.classList.toggle('show');
}

/* ******************************** CONTACT ******************************* */

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const senderName = document.getElementById('name').value;
    const senderEmail = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!senderName || !senderEmail || !message) {
      alert("All fields must be filled out");
      return;
    }
    var regex = /\w+@\w+\.com/;
    if (!regex.test(senderEmail)) {
      alert("Must be a valid email format");
      return;
    }
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

function createSkillRatings() {
  var list = document.querySelector("#skillRatings");
  
  // Clear the list
  while (list.firstChild) {
      list.removeChild(list.firstChild);
  }
  
  for (var i = 0; i < skills.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = skills[i].name;
    
    var ratingDiv = document.createElement("div");
    ratingDiv.className = "rating";
    
    for (var j = 0; j < 5; j++) {
      var span = document.createElement("span");
      if (j < skills[i].rating) {
        span.className = "filled";
      } else {
        span.className = "empty";
      }
      span.innerHTML = "&bull;";
      ratingDiv.appendChild(span);
    }
    
    listItem.appendChild(ratingDiv);
    list.appendChild(listItem);
  }
}

function isAtTop(element) {
  const rect = element.getBoundingClientRect();
  console.log(`Element ${element.id} rect.top: ${rect.top}`);
  return rect.top <= 205;
}

function updateAboutItemClass() {
  console.log('Updating about_item class');
  const aboutItems = document.querySelectorAll('.about_item');
  aboutItems.forEach((item) => {
    if (isAtTop(item)) {
      console.log(`Adding at-top class to element ${item.id}`);
      item.classList.add('at-top');
    } else {
      console.log(`Removing at-top class from element ${item.id}`);
      item.classList.remove('at-top');
    }
  });
}

window.addEventListener('load', updateAboutItemClass);
window.addEventListener('resize', updateAboutItemClass);