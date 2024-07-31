<template>
  <main>
    <div class="layout">
    <h1>Desserts</h1>
    <productPage 
      @total-item-count-updated="updateItemCount"
      @item-added="handleItemAdded"
      @item-removed="handleItemRemoved"
      :cartItems="cartItems"
      class="pdp"/>
      <div class="tabletView">
     <cartPage 
        :total_count="total_count" 
        :cartItems="cartItems"
        @remove-item="removeItem"
        @clear-cart="handleClearCart"
    class="cart"/>
      </div>
  </div>
  </main>
  
</template>

<script>
import cartPage from './components/cartPage.vue';
import productPage from './components/productPage.vue';

export default {
  name: 'App',
  components: {
    cartPage,
    productPage
  },
  data() {
    return {
      total_count: 0,
      cartItems: []
    };
  },
  methods: {
    updateItemCount(newCount) {
      this.total_count = newCount; 
    },
    handleItemAdded(eventData){
      const { name, price, count } = eventData;
      const existingItem = this.cartItems.find(item => item.name === name && item.price === price)
      if (existingItem) {
        existingItem.count += count;  
    } else {
        this.cartItems.push({ name, price, count });
    }
      },
      handleItemRemoved(eventData){
        const { name, price, count } = eventData;
        const existingItem = this.cartItems.find(item => item.name === name && item.price === price);
        if (existingItem) {
          existingItem.count -= count;
          if (existingItem.count <= 0) {
            this.cartItems = this.cartItems.filter(item => item !== existingItem);
          }
        } else {
          console.warn('Item not found in cart:', { name, price });
        }
      },
      removeItem(item) {
        this.cartItems = this.cartItems.filter(cartItem => 
        cartItem.name !== item.name || cartItem.price !== item.price
      );
      this.total_count = this.cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
    },
    handleClearCart(){
      this.cartItems=[];
      this.total_count=0;
    }
    }
  };
</script>

<style>
body{
  margin:0px;
}
.layout{
  position: relative;
  padding: 10px;
}
.cart{
  position: absolute; 
  top: 10px; 
  right: 10px;  
  z-index: 1000;
  margin: 10px 70px;
}
.pdp{
  margin-right: 200px
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:rgb(250, 243, 235);
  margin: 0px;
}
h1{
  margin: 10px 0 0 20px;
}
 @media (max-width: 991px)  {
  .tabletView{
    display: flex;
    justify-content: center;
  }
  .layout { 
     display: flex; 
     flex-direction: column;
  }

  .cart {
    position: relative;

  }

  .pdp {
    margin-right: 0; 
  }
} 
@media (max-width: 568px){
  .cart {
    margin: 0px;
  }
}
</style>
