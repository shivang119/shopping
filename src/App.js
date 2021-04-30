import React from 'react';
import Cart from './Components/Cart';
import Filter from './Components/Filter';
import Products from './Components/Products';
import data from './data.json'; //in data.json,a complete list of product is there with description

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        :[],
      size:"",
      sort:"",
    };
  }
   createOrder=(order)=>{
     alert("Need to save order for "+order.name);
   };
   
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItmes",JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  };

  addToCart = (product)=>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart=false;
    cartItems.forEach(item =>{
      if(item._id===product._id){
        item.count++;
        alreadyInCart=true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count:1})
    }
    this.setState({cartItems});
    localStorage.setItem("cartItmes",JSON.stringify(cartItems));
  };
  sortProducts=(event)=>{

    const sort = event.target.value;
    console.log(event.target.value);  //use to read selected value
    this.setState((state) =>({
    sort:sort,
    products : this.state.products.slice().sort((a,b) =>(
      sort ==="Lowest"?
      ((a.price > b.price)? 1:-1):
      sort ==="Highest"?
      ((a.price < b.price)? 1:-1):
      ((a._id < b._id)?1:-1)
      ))
    }))
  };

  filterProducts=(event)=>{
    console.log(event.target.value);
    if(event.target.value==="")
    {
      this.setState({size:event.target.value,products:data.products});
    }
    else{
    this.setState({
      size:event.target.value,
      products:data.products.filter(
        product =>  product.availableSizes.indexOf(event.target.value)>=0),
    });
  }
  };
  render() {
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping cart</a>
      </header> 
        <main>
        <div className="content">
          <div className="main">
            <Filter 
            count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}
            
             ></Filter>
          <Products
           products={this.state.products} 
           addToCart={this.addToCart}></Products>
          </div>
          <div className="sideBar">
          <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
          </div>
        </div>
        </main>
        <footer>
        All right is reserved.  
        </footer> 
    </div>
  );
  }
}
