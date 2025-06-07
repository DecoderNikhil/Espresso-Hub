import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1)
      return this._generateMarkupPaginationButton('next');

    // Last page
    if (currPage === numPages && numPages > 1)
      return this._generateMarkupPaginationButton('prev');

    // Other page
    console.log(typeof this._data.page);
    if (currPage < numPages)
      return `${this._generateMarkupPaginationButton(
        'prev'
      )} ${this._generateMarkupPaginationButton('next')}`;

    // Page 1 and there are NO other pages
    return '';
  }

  _generateMarkupPaginationButton(type) {
    if (type === 'prev')
      return `<button class="btn-inline pagination-btn-prev" data-goto="${
        this._data.page - 1
      }">
    <span class="search-icon font-icon"
      ><i class="fa-solid fa-arrow-left"></i
    ></span>
    <span>Page ${this._data.page - 1}</span>
  </button>`;

    if (type === 'next') {
      return `<button class="btn-inline pagination-btn-next" data-goto="${
        this._data.page + 1
      }">
    <span>Page ${this._data.page + 1}</span>
    <span class="search-icon font-icon"
      ><i class="fa-solid fa-arrow-right"></i
    ></span>
  </button>`;
    }
  }
}

export default new PaginationView();
