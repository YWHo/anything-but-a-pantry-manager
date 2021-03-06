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
      selectedIngredient: null,
      dietaryRestrictions: null
    }
    this.randomizeNumber = this.randomizeNumber.bind(this)
    this.selectRecipe = this.selectRecipe.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  randomizeNumber() {
    let length = this.props.pantry.length
    let randomNumber = Math.floor(Math.random()*length)
    this.setState({selectedIngredient: this.props.pantry[randomNumber]})
  }

  selectRecipe() {
    this.props.dispatch(getRecipes(this.state.selectedIngredients, this.props.dietaryRestrictions))
    this.setState({recipeVisible: true})
  }


  onClick(e){
    const recipeName = this.props.buttonInfo[1].value
    this.props.toggleButtons(recipeName)
    this.randomizeNumber()
    this.selectRecipe()
    }

  render() {
    return (
      <div>
        <button onClick={this.onClick} className="btn btn-lg btn-outline-green btn-block mb-3">Find New</button>
          <div>{this.state.recipeVisible? <Recipe key="1"/> : ''}</div>
          <div className={this.props.isSearching ? 'show' : 'hide'}>Searching</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    recipes: state.recipes.recipes,
    user: state.user,
    dietaryRestrictions: state.dietaryRestrictions,
    isSearching: state.recipes.isSearching,
    pantry: state.pantry
  }
}

export default connect(mapStateToProps)(RandomRecipe)
