<template>
  <div class="home">
    <Navigation />
    <h1 class="title">Web Pantry 2.0</h1>
    <div class="bg-wrapper">
      <div class="heading">
          <h1>Type out desired food name</h1>
          <h3>Remember to hit enter!</h3>
        </div>
      <div class="wrapper">
        <div class="search">
          <form class="pure-form" v-on:submit.prevent>
            <i class="fas fa-search"></i><input @keydown.enter="getData()" v-model="searchText"/>
          </form>
        </div>
      </div>
      <div class="food-wrapper" v-if="this.items.length != 0">
        <div class="food-item" v-for="item in this.items.foods.slice(0,6)" :key="item.fdcId">
          <div class="item-name">
            <h1>{{item.description.toLowerCase()}}</h1>
            <p>{{item.brandOwner}}</p>
            <button @click="addItem(item)" type="button" class="btn btn-secondary">Add to pantry</button>
            <input v-model="amount" type="text" placeholder="amount">
          </div>
          <div class="nutritionInfo">
            <hr class="hr1">
            <h1>Nutrition Facts</h1>
            <hr class="hr1">
            <div class="nutr-info" v-for="elem in item.foodNutrients" :key="elem.nutrientId">
              <p>{{elem.nutrientName}}: {{elem.value}} {{elem.unitName}}</p>
              <hr class="hr2">
            </div>
            <p class="ingredients">Ingredients: {{item.ingredients}}</p>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Navigation,
  },
  data() {
    return {
      searchText: '',
      items: [],
      amount: '',
    }
  },
  methods: {
    
     async getData() {
      try {
        const key = "GhWNNrbGvDQyIr8NRI3r0flPw4bKCE1rKXo4nJJ1";
        let searchTerm = "&query=" + this.searchText.trim().replace(/ /g,"%20");
        let url = "https://api.nal.usda.gov/fdc/v1/foods/search" + "?api_key=" + key + searchTerm;
        const response = await fetch(url);
        const data = await response.json();
        //filter out extra results only selected common macronutrients
        for (let i = 0; i < data.foods.length; i++) {
          let filt = data.foods[i].foodNutrients.filter(function(elem){
            return elem.nutrientName == 'Energy' || elem.nutrientName == 'Protein'
            || elem.nutrientName == 'Carbohydrate, by difference'
            || elem.nutrientName == 'Fatty acids, total trans'
            || elem.nutrientName == 'Fatty acids, total saturated'
            || elem.nutrientName == 'Sugars, total including NLEA'
            || elem.nutrientName == 'Sodium, Na'
            || elem.nutrientName == 'Cholesterol'
            || elem.nutrientName == 'Cholesterol'
            || elem.nutrientName == 'Total lipid (fat)'
            || elem.nutrientName == 'Fiber, total dietary';
          });

          //sort filt alpha
          filt.sort(function(a,b) {
            let textA = a.nutrientName.toUpperCase();
            let textB = b.nutrientName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
          
          data.foods[i].foodNutrients = filt;
          
        }
        this.items = data;
        
      } catch (error) {
        console.log(error);
      }
    },

    async addItem(item) {
      try {
          let response = await axios.post('/api/add', {
          name: item.description,
          Carbohydrate: item.foodNutrients[0].value,
          Cholesterol: item.foodNutrients[1].value,
          Energy: item.foodNutrients[2].value,
          Fat_Saturated: item.foodNutrients[3].value,
          Fat_Trans: item.foodNutrients[4].value,
          Fiber: item.foodNutrients[5].value,
          Protein: item.foodNutrients[6].value,
          Sodium: item.foodNutrients[7].value,
          Sugar: item.foodNutrients[8].value,
          Total_Lipids: item.foodNutrients[9].value,
          Ingredients: item.ingredients,
          path: '',
          quantity: this.amount,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

  },
}
</script>

<style scoped>
.bg-wrapper {
  background-image: url('../../images/landingPg_img.jpg');
  background-size: cover;
  min-height: 100vh;
  max-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15%;
}

.search {
  margin-top: 28px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  margin-bottom: 5%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
  background-color: rgba(0,0,0,0.8);
  color: white;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  background-color: rgba(0,0,0,0.8);
  color: white;
}





.heading {
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0,0,0,0.8);
  color: white;
}

.food-wrapper {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 100px;
  margin-right: 10%;
  margin-left: 10%;
}

.item-name {
  color:white;
  text-transform: capitalize;
  text-align: left;
  
}


.nutritionInfo {
  text-align: left;
  background: white;
  color: black;
  width: 500px;
}

.ingredients {
  font-weight: 700;
}

.hr1 {
  border: 4px solid black;
}

.hr2 {
  border: 1px solid black;
}

.title {
  margin: 0;
  padding: 0;
  text-align: center;

}

</style>
