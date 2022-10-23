export default function header() {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  nav.append(ul);

  const links = [
    navItem("/", "Home"),
    navItem("/runes.html", "Runes"),
    navItem("/runewords.html", "Rune Words"),
  ];

  links.forEach((link) => {
    ul.append(link);
  });

  // Attach navigation to page's <header></header> element
  document.querySelector("header").append(nav);

  // Set the active page
  setActiveNavigation();
}

export function navItem(href, text) {
  const hyperlink = document.createElement("a");
  hyperlink.href = href;
  hyperlink.innerText = text;

  const li = document.createElement("li");
  li.append(hyperlink);
  return li;
}

function setActiveNavigation() {
  const currentPage = window.location.href;
  const headerNavs = document.querySelectorAll("header nav ul li a");

  let navIndex = 0;
  for (navIndex = 0; navIndex < headerNavs.length; navIndex++) {
    const linkHref = headerNavs[navIndex].href;

    if (linkHref === currentPage) {
      headerNavs[navIndex].classList.add("nav-active");
    }
  }
}
