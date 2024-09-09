import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const { inputPlaceholder = 'Search...' } = await fetchPlaceholders();

  const form = document.createElement('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = form.querySelector('.input-field').value.trim();
    if (inputValue) {
      const searchURL = `https://www.google.com/search?q=${encodeURIComponent(inputValue)}`;
      window.open(searchURL, '_blank');
    }
  });

  const inputField = Object.assign(document.createElement('input'), {
    className: 'input-field',
    type: 'search',
    name: 'searchInput',
    placeholder: inputPlaceholder,
  });

  form.append(inputField);
  block.append(form);
}
