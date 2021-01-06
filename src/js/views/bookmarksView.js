import View from './view'
import icons from '../../img/icons.svg'


class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks")
    _errorMessage = 'No recipes found for your query! Please try again'
    _successMessage = ''

    _generateMarkup() {

        return this._data.map(this._generateMarkupPreview).join("")


    }

    addBookmarksRender(handler) {
        window.addEventListener('load', function (e) {
            e.preventDefault();
            handler()
        })
    }
    _generateMarkupPreview(result) {
        const id = window.location.hash.slice(1)
        return `<li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}"
             href="#${result.id}">
              
               
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>  
             </a> 
             
          </li>`
    }
}

export default new BookmarksView()