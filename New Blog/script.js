const blogList = document.querySelector('#blog-list');

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        // For each blog post in the JSON data, create a preview element
        data.forEach(post => {
            const preview = document.createElement('div');
            preview.classList.add('article');

            // Add the title, date, and first paragraph of content to the preview
            preview.innerHTML = `
        <a class="post-link" href="blog.html?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}">
            <div class="post-content">
              <div class="post-title">${post.title}</div>
              <div class="post-date">${post.date}</div>
              <div class="post-excerpt">
                ${post.content.slice(0, post.content.indexOf('</p>') + 4)}
              </div>
            </div>
            <img class="post-image" src="${post.image}">
          </a>`;
            blogList.appendChild(preview);
        });
    });

//share buttons

const shareLinks = document.querySelectorAll('.links');

function getShareUrl(platform, url, title) {
    switch (platform) {
        case 'linkedin':
            return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        case 'whatsapp':
            return `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        case 'reddit':
            return `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        default:
            return '';
    }
}

shareLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = e.target.closest('.links').dataset.platform;
        const url = window.location.href;
        const title = document.title;

        const shareUrl = getShareUrl(platform, url, title);
        window.open(shareUrl, '_blank');
    });
});