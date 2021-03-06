import { connect } from "react-redux";
import {
  getList,
  showItem,
  addToCart,
  changeQty,
  updateCartItemQty,
} from "../action";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Form, FormGroup, Label } from "reactstrap";

const ItemList = (props) => {
  const { getList, changeQty, addToCart, updateCartItemQty, cart, list } = props;

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const { index } = e.target.dataset;
    changeQty(Number(index), Number(value));
  };

  const logicCart = (item, e, buynow) => {
    e.preventDefault();
    if (!cart) {
      //Add item to cart array
      addToCart(item, buynow);
    } else {
      //find the index where cart._id matches item._id
      const index = cart.findIndex((cart) => {
        return cart._id === item._id;
      });
      if (index !== -1) {
        //index exist
        updateCartItemQty(index, item.quantity, buynow);
      } else {
        //index doesn't exist
        addToCart(item, buynow);
      }
    }
  };

  const onBuy = (item, e, buynow) => {
    return item.quantity > 0 ? logicCart(item, e, buynow) : null;
  };

  const onConsole = () => {
    // console.log(props);
    console.log(list);
    console.log(cart);
  };

  if (list) {
    return (
      <div className="container">
        <h2>ItemList</h2>
        <button onClick={onConsole}>Console Log</button>
        <div className="list-grid">
          {list.map((item, i) => {
            return (
              <div className="item-container" key={item._id}>
                <Link className="image-link" to={`/list/${item._id}`}>
                  <img
                    className="model"
                    src={`${item.image}`}
                    alt={`${item.description}`}
                    // alt="model"
                  />
                </Link>
                <Link className="brand-link" to={`/list/${item._id}`}>
                  <p className="brand">{item.brand}</p>
                </Link>
                <Link className="description-link" to={`/list/${item._id}`}>
                  <p className="description">{item.description}</p>
                </Link>
                <p className="price">
                  <strong>${item.price}</strong>
                </p>
                <Form>
                  <FormGroup>
                    <Label>Qty: </Label>
                    <Input
                      type="select"
                      name="quantity"
                      className="quantity_input"
                      onChange={onChange}
                      data-index={i}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Input>
                  </FormGroup>
                  <button onClick={(e) => onBuy(item, e)}>Add to Cart</button>
                  <button onClick={(e) => onBuy(item, e, "buynow")}>
                    Buy Now
                  </button>
                </Form>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    list: state.item.items,
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, {
  getList,
  showItem,
  changeQty,
  addToCart,
  updateCartItemQty,
})(ItemList);     
