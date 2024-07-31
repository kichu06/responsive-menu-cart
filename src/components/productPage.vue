<template>
  <div>
    <div class="menu" v-if="items.length">
      <div v-for="item in items" :key="item.name" class="menu-item">
        <div class="image-container">
          <img
            :src="require(`@/assets/images/${item.image.thumbnail}`)"
            :srcset="
              `${require(`@/assets/images/${item.image.thumbnail}`)} 480w, ` +
              `${require(`@/assets/images/${item.image.tablet}`)} 768w, ` +
              `${require(`@/assets/images/${item.image.desktop}`)} 1200w`
            "
            sizes="(max-width: 600px) 480px, (max-width: 1200px) 768px, 1200px"
            :alt="`Image of ${item.name}`"
            class="menu-item-image"
          />
          <div v-if="getItemCount(item.name) === 0">
            <button class="add-to-cart-btn" @click="addItem(item)">
              <img src="../assets/images/icon-add-to-cart.svg" />
              <span>Add to Cart</span>
            </button>
          </div>
          <div v-else>
            <div class="counter-button">
              <button class="decrement-to-cart-btn" @click="removeItem(item)">
                <img src="../assets/images/icon-decrement-quantity.svg" />
              </button>
              <span>{{ getItemCount(item.name) }}</span>
              <button class="increment-to-cart-btn" @click="addItem(item)">
                <img src="../assets/images/icon-increment-quantity.svg" />
              </button>
            </div>
          </div>
        </div>
        <div class="menu-content">
          <p class="menu-item__category">{{ item.category }}</p>
          <h2 class="menu-item__name">{{ item.name }}</h2>
          <p class="menu-item__price">${{ item.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cartItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: [], 
      cart: {}, 
    };
  },
  async created() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.items = data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  },
  watch: {
  cartItems: {
    handler() {
      this.updateCartState(); 
    },
    deep: true
  }
},
  methods: {
    updateCartState() {
    this.cart = this.cartItems.reduce((acc, item) => {
      acc[item.name] = item.count;
      return acc;
    }, {});
  },
    addItem(item) {
      const { name } = item;
      if (this.cart[name]) {
        this.cart[name]++;
      } else {
        this.cart[name] = 1;
      }
      this.emitTotalCount();
      this.$emit('item-added', { ...item, count: 1 });
    },
    removeItem(item) {
      const { name } = item;
      if (this.cart[name] && this.cart[name] > 0) {
        this.cart[name]--;
        if (this.cart[name] === 0) {
          delete this.cart[name];
        }
        this.emitTotalCount();
        this.$emit('item-removed', { ...item, count: 1 });
      }
    },
    getItemCount(itemName) {
      return this.cart[itemName] || 0;
    },
    emitTotalCount() {
      const totalCount = Object.values(this.cart).reduce((sum, count) => sum + count, 0);
      this.$emit('total-item-count-updated', totalCount);
    },
  },
};
</script>


<style scoped>
.counter-button{
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 20px; 
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color:brown;
  color: #fff;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
}
.decrement-to-cart-btn,.increment-to-cart-btn{
    background: transparent;
    border: 1px solid white;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}
.menu-item__category{
  color: grey;
  font-size: 14px;
  margin: 0 0 5px 0;
}
.menu-item__name{
  font-size:16px;
  margin: 0 0 5px 0;
}
.menu-item__price{
   color: orange;
   margin: 0px;
}
.menu-content{
  margin-top:20px;
}
.menu-item {
  text-align: left;
  width: 250px; 
  position: relative;
}

.image-container {
  position: relative;
}

.menu-item-image {
  border-radius: 5px;
  width: 100%;
  height: auto;
}

.add-to-cart-btn {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color:#fff;
  color: black;
  border: 1px solid brown;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
}

.add-to-cart-btn:hover {
  background-color: darkorange;
}
@media (max-width: 568px) {
  .menu {
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    flex: 1 1 100%; 
    margin-bottom: 20px; 
    width: 100%;
  }
}
@media (min-width: 568px) and (max-width: 991px) {
  .menu {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 products per row */
    gap: 16px; /* Adjust gap between products as needed */
  }
  
  .menu-item {
    width:100%;
    max-width: none;
    box-sizing: border-box;
  }
}
</style>