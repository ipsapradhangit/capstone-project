export default async function decorate(block) {
  console.log('text', block);
  const articles = block.querySelector('a[href$=".json"]');
  async function loadArticles() {
    const resp = await fetch(articles.href);
    const json = await resp.json();

    const magazine = json.data.filter((item) => item.template === 'capstone-magazine');
    magazine.forEach((row) => {
      // Create the elements
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article-item');
      const link = document.createElement('a');
      link.href = row.path;
      const img = document.createElement('img');
      img.src = row.image;
      img.alt = row.name;
      const title = document.createElement('h3');
      title.textContent = row.title;
      const paragraph = document.createElement('p');
      paragraph.textContent = row.description;

      // Append the elements to their parents
      link.appendChild(img);
      link.appendChild(title);
      articleDiv.appendChild(link);
      articleDiv.appendChild(paragraph);
      block.appendChild(articleDiv);
      articles.replaceWith();
    });
  }

  if (articles) {
    loadArticles();
  }
}
