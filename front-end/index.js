directories = [
  '',
  'Resume',
  'Projects',
  'References',
  'Contact'
  
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

  // Create the hamburger menu button
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
  for (i = 0; i<= getDirectories.length-1; i++) {
    var list = document.createElement("li");
    list.setAttribute("class", "link-wrapper");
    var item = document.createElement("a");
    item.setAttribute("class", "btn");
    if (getDirectories[i] == "") {
      getDirectories[i] = "Home";
      item.setAttribute("href", "/");
    }
    else {
      item.setAttribute("href", "/pages/"+getDirectories[i]);
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