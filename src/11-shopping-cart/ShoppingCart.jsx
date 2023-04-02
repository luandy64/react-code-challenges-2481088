import { useState } from 'react'

const items = [{
  name: 'apple',
  price: 0.39
}, {
  name: 'banana',
  price: 0.79
}, {
  name: 'cherry tomatoes',
  price: 3.99
}]

function default_item(item) {
  return {
    [item.name]: {
      name: item.name, 
      quantity: 0, 
      price: item.price
    }
  }
}

function RenderItems(props) {
  const { cart, add_item } = props;
  
  return (
    <div className='items'>
      <h2>Items</h2>
      {
        items.map(
          item => (
            <div key={item.name}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => {
                  add_item(cart, item)
                }}>
                  Add to Cart
                </button>
            </div>
          )
        )
      }
    </div>
  )
}

function calculate_total (quantity, price) {
  return quantity * 100 * price
}

function RenderCart({cart_items, add_item, remove_item}) {
  return (
    <div>
      <h2>Cart</h2>
      {
        cart_items 
        ? Object.values(cart_items)
          && Object.values(cart_items).map(
            item => (
              item.quantity > 0 ?
              <div key={item.name}>
                <h3>{item.name}</h3>
                <p>
                  <button onClick={() => {
                    remove_item(cart_items, item)
                  }}>-</button>
                  {item.quantity}
                  <button onClick={() => {
                    add_item(cart_items, item)
                  }}>+</button>
                </p>
                <p>
                  Subtotal: ${calculate_total(item.quantity,item.price) / 100}
                </p>
              </div>
              : null
            )
          )
        : null
      }
    </div>   
  )
}

function RenderTotal({cart_items}) {
  const amount = cart_items ?
    Object.values(cart_items)
    && Object.values(cart_items).reduce(
      (acc, curr) => acc + calculate_total(curr.quantity, curr.price),
      0
    )
    : 0;
  return (
    <div className='total'>
      <h2>Total: ${amount / 100}</h2>
    </div>
  )
}

function make_cart_from(old_cart, item){
  let new_cart = structuredClone(old_cart)
  
  if (!(item.name in old_cart)) {
    const zero_item = default_item(item)
    new_cart = {...old_cart, ...zero_item}
  }

  return new_cart
}

function ShoppingCart () {
  const [cart, setCart] = useState({});
  /*const cart = [{ name: 'apple', quantity: 4, price: 0.39 }]*/

  const handle_add_item = (old_cart, item) => {
    const new_cart = make_cart_from(old_cart, item)
    new_cart[item.name]["quantity"] += 1
    setCart(new_cart)
  }

  const handle_remove_item = (old_cart, item) => {
    const new_cart = make_cart_from(old_cart, item)
    new_cart[item.name]["quantity"] -= 1
    setCart(new_cart)
  }
  
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className='cart'>
        <RenderItems add_item={handle_add_item} cart={cart}/>
        <RenderCart
          cart_items={cart} 
          add_item={handle_add_item}
          remove_item={handle_remove_item}
          />
      </div>
      <RenderTotal cart_items={cart} />
    </div>
  )
}

export default ShoppingCart
