export default function header(currentPage = "") {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  nav.append(ul);

  const links = [
    navItem("/", "Home"),
    navItem("/page/runes.html", "Runes"),
    navItem("/page/runewords.html", "Rune Words"),
  ];

  links.forEach((link) => {
    ul.append(link);
  });

  // Attach navigation to page's <header></header> element
  document.querySelector("header").append(nav);

  // Set the active page
  setActiveNavigation(currentPage);
}

export function navItem(href, text) {
  const hyperlink = document.createElement("a");
  hyperlink.href = href;
  hyperlink.innerText = text;

  const li = document.createElement("li");
  li.append(hyperlink);
  return li;
}

function setActiveNavigation(currentPage) {
  const headerNavs = document.querySelectorAll("header nav ul li a");
  console.log(headerNavs);

  let navIndex = 0;
  for (navIndex = 0; navIndex < headerNavs.length; navIndex++) {
    const linkHref = headerNavs[navIndex].href.split("/page/", 2)[1];
    const currentHref = currentPage.split("/page/", 2)[1];
    if (linkHref === currentHref) {
      headerNavs[navIndex].classList.add("nav-active");
    }
  }
}
