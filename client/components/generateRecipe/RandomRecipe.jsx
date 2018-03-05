import React from 'react'
import { connect } from 'react-redux'

import {getRecipes} from '../../actions/generateRecipe'
import {getUserRestrictions} from '../../actions/user'
import Recipe from '../Recipe'

class RandomRecipe extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      recipeVisible: false,
      selectedIngredients: null,
      dietaryRestrictions: null,
      randomIngredients: [
        'onion', 'garlic', 'salt', 'pepper', 'tomatoes' ]
    }
    this.showRecipe = this.showRecipe.bind(this)
  }

  componentDidMount() {
    let randomNumber = Math.floor(Math.random()*6)
    this.setState({selectedIngredients: this.state.randomIngredients[randomNumber]})
  }
  
  
  showRecipe() {
    this.props.dispatch(getRecipes(this.state.selectedIngredients, this.props.dietaryRestrictions))
    this.setState({recipeVisible: true})
  }
  
  render() {
    return (
      <div>
        <button onClick={this.showRecipe} className="btn btn-lg btn-outline-green btn-block mb-3">Find New</button>
          <div>{this.state.recipeVisible? <Recipe key="1"/> : ''}</div>
          <div className={this.props.isSearching ? 'show' : 'hide'}>Searching</div>
      </div>
    )
  }
}

const mapStateToProps = (props) => {
  console.log('props on genRecipe: ', props)
  return {
    auth: props.auth,
    recipes: props.recipes.recipes,
    user: props.user,
    dietaryRestrictions: props.dietaryRestrictions,
    isSearching: props.recipes.isSearching

  }
}

export default connect(mapStateToProps)(RandomRecipe)
