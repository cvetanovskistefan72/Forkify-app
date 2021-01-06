import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultView from './views/resultsView'
import paginationView from './views/paginationView'
import bookmarksView from './views/bookmarksView'
import addRecipeView from './views/addRecipeView'

import { MODAL_CLOSE_SEC } from './config'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipes = async function () {
  try {

    //Getting hash
    const hash = window.location.hash
    if (!hash) return

    const [first, ...id] = hash

    const hashId = id.join("")
    //1. Rendering Spinner

    recipeView.renderSpinner()

    resultView.update(model.getSearchResultsPage())



    await model.loadRecipe(hashId)

    const recipe = model.state.recipe

    recipeView.render(recipe)

    bookmarksView.update(model.state.bookmarks)

  } catch (error) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {

    resultView.renderSpinner()
    //Get query
    const query = searchView.getQuery()
    if (!query) return

    //Load search results
    await model.loadSearchResults(query)

    const results = model.getSearchResultsPage()

    //Render Results
    resultView.render(results)

    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error)
  }
}

const controlPageResults = function (goToPage) {

  resultView.render(model.getSearchResultsPage(goToPage))

  paginationView.render(model.state.search)
}

const controlServings = function (servings) {
  const servingsNum = Number(servings.dataset.servings)
  if (servingsNum > 0) {
    model.updateServings(servingsNum)
    // recipeView.render(model.state.recipe)
    recipeView.update(model.state.recipe)
  }

}

const controlBookmarks = function (bookmark) {
  if (!model.state.recipe.bookmarked) model.addBookMark(bookmark.dataset.id)
  else model.deleteBookMark(bookmark.dataset.id)

  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}


const loadBookmarksFromLocalStorage = function () {
  bookmarksView.render(model.state.bookmarks)
}


const controlAddRecipe = async function (newRecipe) {
  try {
    //Show Loading Spinner

    addRecipeView.renderSpinner()

    await model.uploadRecipe(newRecipe)

    //Render Recipe
    recipeView.render(model.state.recipe)
    //Success message 

    addRecipeView.renderMessage('Success');

    bookmarksView.render(model.state.bookmarks)

    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    //Close form
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC)
    
  } catch (error) {
    
    addRecipeView.renderError(error.message)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerPage(controlPageResults)
  recipeView.addServingsRender(controlServings)
  recipeView.bookmarksRender(controlBookmarks)
  bookmarksView.addBookmarksRender(loadBookmarksFromLocalStorage)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}
init()




