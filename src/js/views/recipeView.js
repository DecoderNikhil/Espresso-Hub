import View from './View.js';
import fraction from 'fracty';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one.';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-tiny');

      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `<figure class="recipe-fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe-img" />
    <h1 class="recipe-title">
      <span>${this._data.title}</span>
    </h1>
  </figure> 

  <div class="recipe-details">
    <div class="recipe-info">
      <span class="recipe-info-icon font-icon"
        ><i class="fa-solid fa-clock"></i
      ></span>
      <span class="recipe-info-data recipe-info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe-info-text">minutes</span>
    </div>
    <div class="recipe-info">
      <span class="recipe-info-icon font-icon"
        ><i class="fa-solid fa-users"></i
      ></span>
      <span class="recipe-info-data recipe-info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe-info-text">servings</span>

      <div class="recipe-info-buttons">
        <button class="btn-tiny btn-update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <span class="font-icon"
            ><i class="fa-solid fa-circle-minus"></i
          ></span>
        </button>
        <button class="btn-tiny btn-update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <span class="font-icon"
            ><i class="fa-solid fa-circle-plus"></i
          ></span>
        </button>
      </div>
    </div>

    <div class="recipe-user-generated ${this._data.key ? '' : 'hidden'}">
      <span class="font-icon"><i class="fa-regular fa-user"></i></span>
    </div>

    <button class="btn-round btn-bookmark">
      <span class="font-icon"
        ><i class="fa-${
          this._data.bookmarked ? 'solid' : 'regular'
        } fa-bookmark"></i
      ></span>
    </button>
  </div>

  <div class="recipe-ingredients">
    <h2 class="heading-2">Recipe ingredients</h2>
    <ul class="recipe-ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
  </div>

  <div class="recipe-directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe-directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe-publisher">${this._data.publisher}</span>. Please
      check out directions at their website.
    </p>
    <a
      class="btn-small recipe-btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <span class="search-icon font-icon"
        ><i class="fa-solid fa-arrow-right"></i
      ></span>
    </a>
  </div>
</div>
</div>`;
  }

  _generateMarkupIngredient(ing) {
    return `<li class="recipe-ingredient">
        <span class="recipe-icon font-icon"
          ><i class="fa-solid fa-check"></i
        ></span>
        <div class="recipe-quantity">${
          ing.quantity ? fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe-description">
          <span class="recipe-unit">${ing.unit}</span>
    ${ing.description}
        </div>
      </li>`;
  }
}

export default new RecipeView();
