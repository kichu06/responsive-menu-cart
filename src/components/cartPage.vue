<template>
  <div class="cart-container">
    <h3>Your Cart ({{ total_count }})</h3>
    <div v-if="total_count === 0">
      <div class="empty-cart">
        <img src="../assets/images/illustration-empty-cart.svg" />
        <p>Your added item will appear here</p>
      </div>
    </div>
    <div v-else>
      <div>
        <ul class="cart-list">
          <li v-for="item in itemSum" :key="item.name + item.price" class="list-bottom">
            <div>
              <p class="item-name">{{ item.name }}</p>
            </div>
            <div class="item-container">
              <div class="item-content">
                <span class="item-count">{{ item.count }}x</span>
                <span class="item-price">@ ${{ item.price }}</span>
                <span class="item-sum"> ${{ item.item_sum }}</span>
              </div>
              <button class="remove-button" @click="handleRemove(item)">
                <img src="../assets/images/icon-remove-item.svg" />
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-total">
        <p>Order Total:</p>
        <span class="total-sum">$ {{ itemSum.reduce((total, item) => total + parseFloat(item.item_sum), 0).toFixed(2) }}</span>
      </div>
      <div class="carbon-box">
        <img src="../assets/images/icon-carbon-neutral.svg" />
        <p>This is a <span style="font-weight: bold;">Carbon-neutral</span> delivery</p>
      </div>
      <div>
        <button class="confirm-button" @click="showModal">
          Confirm Order
        </button>
      </div>
    </div>
    <OrderModal
      :isVisible="isModalVisible"
      :orderItems="itemSum"
      @close="isModalVisible = false"
      @clear-cart="clearCart"
    />
  </div>
</template>

<script>
import OrderModal from './OrderModal.vue'; // Ensure this path is correct

export default {
  name: 'CartPage',
  components: {
    OrderModal // Correctly register the component here
  },
  props: {
    total_count: {
      type: Number,
      default: 0
    },
    cartItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isModalVisible: false
    }
  },
  computed: {
    itemSum() {
      return this.cartItems.map(item => ({
        ...item,
        item_sum: (item.count * item.price).toFixed(2)
      }));
    }
  },
  methods: {
    showModal() {
      console.log('clicked');
      this.isModalVisible = true;
    },
    handleRemove(item) {
      this.$emit('remove-item', item);
    },
    clearCart() {
      this.$emit('clear-cart');
    }
  }
}
</script>

<style scoped>
.total-sum{
  font-size:20px;
  font-size: bold;
}
.order-total{
  display:flex;
  justify-content: space-between;
  align-items: center;
  color:black;
  font-size: 12px;
}
.item-container{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.list-bottom{
  border-bottom:1px solid #ccc;
}
.remove-button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;
    height: 15px;
    width: 15px;
    border: 1px solid #ccc;
}

.cart-list {
  padding-left: 0px;
  list-style-type: none;
}
.item-name {
  font-size: 12px;
  font-weight: bold;
  color:black;
  text-align: left;
}

.item-count {
  color: orange;
  margin-right: 15px;
}

.item-content {
  display: flex;
  align-items: center;
}

.item-price {
  margin-right: 15px;
  color:#666;
}
.confirm-button{
  margin-top: 10px;
  width:100%;
  background-color:brown;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
  border:none;
}
.empty-cart{
  text-align: center;
  color:brown;
}
h3{
  text-align: left;
}
 .cart-container{
  background-color: #fff;;
  padding: 10px 15px;
  width: 100%; 
  max-width: 300px;
  border: 1px solid #fff;
  border-radius: 5px;
  color:rgba(230, 91, 56, 0.874);
 }
 .carbon-box{
  background-color:rgb(250, 243, 235);
  display: flex;
  align-items: center;
  gap:5px;
  justify-content: center;
  color: black;
  font-size:10px;
  border-radius: 5px;
 }
 @media (min-width:586px) and (max-width: 991px){
    .cart-container{
      max-width: none;
    }
 }
</style>
