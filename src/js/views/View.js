import icons from 'url:../../image/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (!currEl) return;

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue?.trim() &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(currEl))
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
              <svg><use href="${icons}#icon-loader"></use></svg> 
              </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
              <div>
                <span class="search-icon font-icon"
                  ><i class="fa-solid fa-triangle-exclamation"></i
                ></span>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = ` <div class="message">
              <div>
                <span class="font-icon"
                  ><i class="fa-solid fa-face-smile"></i
                ></span>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
