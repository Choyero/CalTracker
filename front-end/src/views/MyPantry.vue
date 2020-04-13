<template>
<div class="admin">
    <Navigation />
    <h1 class="amount">Pantry | {{items.length}}</h1>
    <div class="exterior-wrapper">
      <div class="food-item" v-for="item in items" :key="item.id">
        <div class="food-heading">
          <h2>{{item.name.toLowerCase()}}</h2>
          <div class="add-del">
            <button @click="dec_cnt(item)" class="btn btn-secondary">-</button>
            <button @click="inc_cnt(item)" class="btn btn-secondary">+</button>
          </div>
          <p>{{item.quantity}}x</p>
        </div>
        <div class="form">
          <input type="file" name="photo" @change="fileChanged" class="choose btn btn-secondary">
          <button @click="addPhoto(item)" class="btn btn-secondary">Add Photo</button>
        </div>
        <div class="photo" v-if="item.path">
          <img :src="item.path" />
        </div>
        <div v-else class="photo">
          <img src="../../public/images/empty.png" alt="">
        </div>

        <button  class="accordion">
          <div class="panel">
          <div>
            <p>Calories: {{item.Energy}}</p>
            <hr>
            <p>Protein {{item.Protein}} g</p>
            <hr>
            <p>Carbohydrates: {{item.Carbohydrate}} g</p>
            <hr>
            <p>Sugar: {{item.Sugar}} g</p>
            <hr>
            <p>Fiber: {{item.Fiber}} g</p>
            <hr>
            <p>Total Fat: {{item.Total_lipids}} g</p>
            <hr>
            <p>Sodium: {{item.Sodium}} mg</p>
            <hr>
          </div>
        </div>
        </button>
        
      </div>
    </div>

</div>
</template>



<script>
import Navigation from '@/components/Navigation.vue';
import axios from 'axios';
export default {
  name: 'MyPantry',
  components: {
      Navigation,
  },
  data() {
    return {
      items: [],
      file: null,
      isActive: false,
      isActive2: false,
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },

    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addPhoto(item) {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        let response1 = await axios.post('api/photos', formData);
        await axios.put("/api/items/" + item._id, {
          path: response1.data.path,
        });
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async dec_cnt(item) {
      try {
        await axios.put('api/dec/' + item._id);
        this.getItems();
        if (item.quantity == 1) {
          await axios.delete("/api/delete/" + item._id);
          this.getItems();
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async inc_cnt(item) {
      try {
        await axios.put('api/inc/' + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    openTab() {
      this.isActive = !this.isActive;
      this.isActive2 = !this.isActive2;
    }

  },

}
</script>


<style scoped>


.accordion {
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: rgba(0,0,0,0.8); 
}

.panel {
  padding: 0 18px;
  background-color: white;
  overflow: hidden;
}




.amount {
  margin-top: 10%;
}

.exterior-wrapper {
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.food-item {
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 30%;
  background: white;
  color: black;
}

.form {
  display: flex;
}

.photo {
  margin: 0 0 1.5em;
}



.choose {
  color: white;
  border-radius: 0;
}

button {
  border-radius: 0;
}

.food-heading {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.food-heading p {
  font-size: 20px;
  margin-right: 5%;
}

.add-del button {
 font-size: 16px;
 border-radius: 4px;
 max-width: 100px;
 min-width: 50px;
}

</style>


