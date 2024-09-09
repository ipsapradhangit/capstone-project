async function fetchArticles(url) {
  try {
    const response = await fetch(url);
    const dataArticle = await response.json();
    return dataArticle.data.filter((item) => item.template === 'capstone-magazine');
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}
function createArticleElements(articles) {
  const fragment = document.createDocumentFragment();

  articles.forEach((article) => {
    // Create elements
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article-item');

    const link = document.createElement('a');
    link.href = article.path;

    const img = document.createElement('img');
    img.src = article.image;
    img.alt = article.name;

    const title = document.createElement('h3');
    title.textContent = article.title;

    const paragraph = document.createElement('p');
    paragraph.textContent = article.description;
    link.appendChild(img);
    link.appendChild(title);
    articleDiv.appendChild(link);
    articleDiv.appendChild(paragraph);

    // Append to fragment
    fragment.appendChild(articleDiv);
  });

  return fragment;
}

export default async function decorate(block) {
  console.log('text', block);

  const articlesLink = block.querySelector('a[href$=".json"]');

  // Function to load and display articles
  async function loadArticles() {
    const articles = await fetchArticles(articlesLink.href);
    const articleElements = createArticleElements(articles);
    block.textContent = '';
    block.appendChild(articleElements);
  }

  await loadArticles();
}
