export default function footer() {
  // Footer, just text for now
  const footerText = "Built by @codingLogan";

  // Attach navigation to page's <footer></footer> element
  document.querySelector("footer").innerText = footerText;
}
