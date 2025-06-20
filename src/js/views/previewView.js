import View from './View.js';

class PreviewView extends View {
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
    <a class="preview-link ${
      this._data.id === id ? 'preview-link-active' : ''
    }" href="#${this._data.id}">
      <figure class="preview-fig">
        <img src="${this._data.image}" alt="${this._data.title}" />
      </figure>
      <div class="preview-data">
        <h4 class="preview-title">${this._data.title}</h4>
        <p class="preview-publisher">${this._data.publisher}</p>
        <div class="preview-user-generated ${this._data.key ? '' : 'hidden'}">
          <span class="font-icon"
            ><i class="fa-regular fa-user"></i
          ></span>
        </div>
      </div>
    </a>
  </li>`;
  }
}

export default new PreviewView();
