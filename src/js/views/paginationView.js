import View from './view'
import icons from '../../img/icons.svg'

class PadinationView extends View {
  _parentElement = document.querySelector(".pagination")

  addHandlerPage(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest(".btn--inline")
      handler(Number(button.dataset.goto))
    })
  }
  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    const currentPage = this._data.page
    console.log(currentPage)
    //First page and other pages
    if (currentPage === 1 && numPages > 1) {
      return `
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return ` <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
         `
    }
    //other pages
    if (currentPage < numPages) {
      return ` <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>  `
    }

    //page 1 and no others pages
    return ''
  }
}

export default new PadinationView()