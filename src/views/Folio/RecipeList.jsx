import {
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Skeleton } from '@material-ui/lab';
import {
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
  searchRecipes,
} from 'actions/gameData';
import Item from 'components/Item';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { isNumber } from 'utils/number';
import { randomString } from 'utils/string';

class RecipeList extends Component {
  static propTypes = {
    productQuery: oneOfType([string, number]),
    materialQuery: oneOfType([string, number]),
    vocation: string,
    handleClick: func,
    maxHeight: number,
    recipes: object.isRequired,
    mobile: bool.isRequired,
    vocationRecipes: object.isRequired,
    fetchRecipeByProduct: func.isRequired,
    fetchRecipeByMaterial: func.isRequired,
    fetchRecipeByVocation: func.isRequired,
    searchRecipes: func.isRequired,
    categories: object.isRequired,
    subCategories: object.isRequired,
  };

  static defaultProps = {};

  state = {
    recipeList: [],
    categories: {},
    loaded: '',
  };

  componentDidMount() {
    this.checkRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    // ignore state updates
    if (!equals(prevState, this.state)) return;

    const { vocation, productQuery, materialQuery } = this.props;
    const { loaded } = this.state;

    if (vocation !== prevProps.vocation || productQuery !== prevProps.productQuery || materialQuery !== prevProps.materialQuery) {
      this.setState({ recipeList: [] });
    }

    if (loaded !== this.getRecipeKey()) {
      this.checkRecipes();
    }
  }

  getRecipeKey = () => {
    const { vocation, productQuery, materialQuery } = this.props;

    let recipeKey;
    if (vocation === 'search') {
      if (productQuery) {
        recipeKey = `product-${productQuery}`;
      } else if (materialQuery) {
        recipeKey = `material-${materialQuery}`;
      }
    } else {
      recipeKey = vocation;
    }
    return recipeKey;
  };

  checkRecipes = () => {
    const { recipes, vocationRecipes } = this.props;

    this.getRecipeList();

    const recipeKey = this.getRecipeKey();

    if (vocationRecipes[recipeKey] && vocationRecipes[recipeKey].every((id) => Boolean(recipes[id]))) {
      this.updateRecipeList(vocationRecipes[recipeKey].map(id => recipes[id]));
    }
  };

  getRecipeList = () => {
    const { fetchRecipeByProduct, fetchRecipeByMaterial, searchRecipes, fetchRecipeByVocation } = this.props;
    const { vocation, productQuery, materialQuery } = this.props;

    if (vocation === 'search') {
      if (isNumber(productQuery || materialQuery)) {
        if (productQuery) {
          fetchRecipeByProduct(productQuery);
        } else {
          fetchRecipeByMaterial(materialQuery);
        }
      } else if (productQuery) {
        searchRecipes(productQuery, 'product');
      } else if (materialQuery) {
        searchRecipes(materialQuery, 'material');
      }
    } else {
      fetchRecipeByVocation(vocation);
    }
  };

  updateRecipeList = (recipes) => {
    const { categories, subCategories } = this.props;

    const recipeList = [];
    const getCategory = (id, subCat1, subCat2) => {
      let category = null;
      const searchCat = (cat) => {
        if (cat.id === id) {
          category = cat;
          return true;
        }
        if (cat.children) {
          return cat.children.some(searchCat);
        }
        return false;
      };
	  console.log(recipeList);
      recipeList.some(searchCat);

      if (category === null) {
        category = { id: null, ...categories[id], recipes: [], children: [] };

        let _category = category;
        while (_category.parent) {
          let parent = getCategory(_category.parent);
          // eslint-disable-next-line no-loop-func
          if (!parent.children.find(c => equals(c, _category))) {
            parent.children.push(_category);
            parent.children.sort(sortBy('id'));
          }
          _category = parent;
        }

        if (!recipeList.find(c => equals(c, _category))) {
          recipeList.push(_category);
          recipeList.sort(sortBy('id'));
        }
      }

      if (subCat1) {
        const parent = category;
        category = parent.children.find(c => c.idx === subCat1);
        if (!category) {
          category = { id: null, ...subCategories[subCat1], recipes: [], children: [] };
          category.idx = category.id;
          category.id = `${category.id}-${randomString(8)}`;
          parent.children.push(category);
          parent.children.sort(sortBy('idx'));
        }
      }

      if (subCat2) {
        const parent = category;
        category = parent.children.find(c => c.idx === subCat2);
        if (!category) {
          category = { id: null, ...subCategories[subCat2], recipes: [], children: [] };
          category.idx = category.id;
          category.id = `${category.id}-${randomString(8)}`;
          parent.children.push(category);
          parent.child = parent.children.sort(sortBy('idx'));
        }
      }

      return category;
    };

    // move recipes into their categories
    recipes.forEach(recipe => {
      const category = getCategory(recipe.category, recipe.subCat1, recipe.subCat2);
      category.recipes.push(recipe);
    });

    this.setState({ recipeList, loaded: this.getRecipeKey() });
  };

  toggleCategory = (id) => () => {
    const { categories } = this.state;
    this.setState({ categories: { ...categories, [id]: !categories[id] } });
  };

  renderRecipeCategory = (category, depth = 1) => {
    const { mobile, handleClick } = this.props;
    const { categories } = this.state;
    const { id } = category;
    const open = depth > 3 ? Boolean(categories[id]) : !categories[id];

    return (
      <div className="recipe-category" key={`rcat-${id}`}>
        <ListItem button dense disableGutters className="category-title" onClick={this.toggleCategory(id)}>
          <ListItemAvatar className="category-toggle">
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </ListItemAvatar>
          {category.name || 'Uncategorized'}
        </ListItem>
        <Collapse in={open}>
          <div className="category-children">
            {category.children.length > 0 &&
            category.children.map(child => this.renderRecipeCategory(child, depth + 1))}
            {category.recipes.length > 0 &&
            <List disablePadding>
              {category.recipes.map(recipe => (
                <ListItem button dense={!mobile} onClick={handleClick(recipe.id)} key={`rlist-${recipe.id}`}>
                  <ListItemAvatar className={mobile ? 'extended' : ''}>
                    <Item id={recipe.item} grade={recipe.grade} inline={!mobile} count={recipe.quantity} />
                  </ListItemAvatar>
                  <ListItemText primary={recipe.name} />
                </ListItem>
              ))}
            </List>}
          </div>
        </Collapse>
      </div>
    );
  };

  render() {
    const { maxHeight } = this.props;
    const { recipeList, loaded } = this.state;

    if (loaded !== this.getRecipeKey()) {
      const skeletons = [];
      for (let i = 0; i < 10; i++) {
        skeletons.push(<Skeleton variant="text" key={`skele-${i}`} />);
      }

      return (
        <div className="recipe-list">
          {skeletons}
        </div>
      );
    }

    return (
      <Typography component="div" className="recipe-list" style={{ maxHeight: maxHeight > 0 ? maxHeight : null }}>
        {recipeList.map(cat => this.renderRecipeCategory(cat))}
      </Typography>
    );
  }
}

const mapStateToProps = ({ gameData: { categories, subCategories, recipes, vocationRecipes }, display: { mobile } }) => ({
  categories,
  subCategories,
  recipes,
  vocationRecipes,
  mobile,
});

const mapDispatchToProps = {
  searchRecipes,
  fetchRecipeByMaterial,
  fetchRecipeByProduct,
  fetchRecipeByVocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
