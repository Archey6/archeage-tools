import {
  Input,
  InputAdornment,
} from '@material-ui/core';
import { setItemPrice } from 'actions/itemPrice';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { number } from 'react-proptypes';
import { connect } from 'react-redux';
import { isNumber } from 'utils/number';
import { maxDecimals } from 'utils/thunderstruck';

class ItemPrice extends Component {
  static propTypes = {
    itemId: number.isRequired,
    unitSize: number,
  };

  static defaultProps = {
    unitSize: 1,
    inputStyle: {},
  };

  state = {
    price: '0',
    focused: false,
  };

  setItemPrice = debounce(this.props.setItemPrice, 250);

  componentDidMount() {
    const { itemPrice, itemId, unitSize } = this.props;

    this.setState({ price: maxDecimals(itemPrice[itemId] * unitSize || 0, 4) });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { itemPrice, itemId, unitSize } = nextProps;
    const { focused } = this.state;

    if (!focused) {
      const price = maxDecimals(itemPrice[itemId] * unitSize || 0, 4);
      this.setState({ price });
    }
  }

  handleChange = (e) => {
    const { itemId, unitSize } = this.props;
    const price = String(e.target.value).replace(/[^\d\\.]+/g, '');

    this.setState({ price }, () => {
      if (isNumber(price)) {
        this.setItemPrice(itemId, price, unitSize);
      }
    });
  };

  handleFocus = (focused) => () => {
    this.setState({ focused }, () => {
      if (!focused && this.state.price === '') {
        this.setState({ price: '0' });
      }
    });
  };

  render() {
    const { itemId, inputStyle } = this.props;
    const { price } = this.state;

    return (
      <Input
        id={`item-price-${itemId}`}
        value={price}
        onChange={this.handleChange}
        onFocus={this.handleFocus(true)}
        onBlur={this.handleFocus(false)}
        type="number"
        margin="dense"
        inputProps={{
          style: { textAlign: 'right', width: 120, ...inputStyle },
          min: 0,
          max: 10000,
          step: 0.0001,
        }}
        endAdornment={<InputAdornment position="end">g</InputAdornment>}
      />
    );
  }
}

const mapStateToProps = ({ itemPrice }) => ({
  itemPrice,
});

const mapDispatchToProps = {
  setItemPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPrice);