<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <div class="order-confirm-img"><img src="../assets/images/icon-order-confirmed.svg"/></div>
        <h2>Order Confirmed</h2>
        <div class="food-text">
        <p>We hope you enjoy our food!</p>  
       </div> 
        <div class="content">
        <ul class="cart-list">
          <li v-for="(item, index) in orderItems" :key="index" class="list-bottom">
            <div>
              <p class="item-name">{{ item.name }}</p>
            </div>
            <div class="item-container">
              <div>
                <span class="item-count">{{ item.count }}x</span>
                <span class="item-price">@ ${{ item.price }}</span>
              </div>
              <div>
                <span class="item-sum"> ${{ item.item_sum }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="order-total">
        <p>Order Total:</p>
        <span class="total-sum">$ {{ orderItems.reduce((total, item) => total + parseFloat(item.item_sum), 0).toFixed(2) }}</span>
      </div>
      </div>
        <div >
            <button class="new-order-btn" @click="closeModal">Start New Order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      orderItems: {
        type: Array,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('clear-cart'); 
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
    .content{
        padding:10px;
        background-color:rgb(250, 243, 235);
        border-radius: 5px;
    }
  .order-total{
  display:flex;
  justify-content: space-between;
  align-items: center;
  color:black;
  font-size: 12px;
  margin-left:15px;
}
    .order-confirm-img img{
          width:30px;
    }
    .food-text{
        color:#b6b5b5;
        font-size:10px;
        padding-left:15px;
    }
    h2{
       color:black;
       margin: 10px;
    }
  .new-order-btn{
        margin-top: 10px;
        width:100%;
        background-color:brown;
        padding: 8px 12px;
        border-radius: 20px;
        cursor: pointer;
        color: #fff;
        border:none;
}
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 300px;
    width:100%;
    text-align: left;
  }
  .item-container{
    display:flex;
    justify-content:space-between;
    margin-bottom:10px
  }
  .total-sum{
  font-size:20px;
  font-size: bold;
}
.list-bottom{
  border-bottom:1px solid #ccc;
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

.item-price {
  margin-right: 15px;
  color:#666;
}
.cart-list{
    list-style-type: none;
    padding-left: 15px;
}
@media  (max-width: 991px) {
   .modal-overlay {
      justify-content: flex-end;
      align-items: flex-end;
      
    }

    .modal {
      width: 100%;
      max-width: none;
    }
  }
  </style>