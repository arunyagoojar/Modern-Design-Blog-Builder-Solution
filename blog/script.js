const blogList = document.querySelector('#blog-list');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // For each blog post in the JSON data, create a preview element
    data.forEach(post => {
      const preview = document.createElement('div');
      preview.classList.add('blog-preview');

      // Add the title, date, and first paragraph of content to the preview
      preview.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.date}</p>
        ${post.content.slice(0, post.content.indexOf('</p>') + 4)}
        <a href="blog.html?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}" target="_blank">Read more</a>`;
      blogList.appendChild(preview);
    });
  });


let innerCursor = document.querySelector(".inner-cursor");
let outerCursor = document.querySelector(".outer-cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}

let links = Array.from(document.querySelectorAll("a"));

console.log(links);

links.forEach((link) => {
    link.addEventListener("mouseover", () => {
        innerCursor.classList.add("grow");
    });
    link.addEventListener("mouseleave", () => {
        innerCursor.classList.remove("grow");
    });
});

