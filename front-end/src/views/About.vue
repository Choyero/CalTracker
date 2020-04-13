<template>
  <div class="about">
    <Navigation />
    <div class="main-wrapper">
      <img class="main-img" src="../../public/images/about_img.jpg" alt="">
      <div class="text-desc">
        <div class="main-text">
          <h1>What this site tries to achieve.</h1>
          <p>This is WebPantry 2.0!!  it is getting much better but still
            needs a lot of work.  Webpantry offers a virtual database of what you have in your pantry.
            The main Log food link allows you to search for data 
            from an external api offered by the USDA Nutrient Database. After which you 
            may add one of the results to the MyPantry database.  
          </p>
          <br>
          <p>My Pantry holds the items you have choosen to add.  It is a graphical
            display of everything that you  have added so far.  There exists a few options:
            First allowing you to upload a photo of an item saved in the database.
            Second allowing you to increment the amount of items you have.
            third allowing you to decrement the amount of items you have.  once the item mark
            hits zero the item is deleted from the database.
          </p>
        </div>
        <div class="issues">
          <h1>Known Issues:</h1>
          <p>-Adding items that have the incorrect nutrients format can't be added to the mypantry database</p>
          <br>
          <p>-Changing the quantity of the items in the log food side changes all the input box numbers</p>
          <br>
          <p>-No unique users.  Everyone shares the same Database.</p>
          <br>
          <p>-No serving sizes for the nutrition information</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'About',
  components: {
    Navigation
  },

}
</script>

<style scoped>

.main-img {
  margin-top: 5%;
}

.text-desc {
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-left:10%;
  margin-right:10%;
}

.main-text {
  text-align: left;
  width: 400px;
  margin-bottom: 10%;
}

.issues {
  text-align: left;
  width: 400px;
  
}

</style>