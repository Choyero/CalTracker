<template>
  <div id="app">
    <router-view/>
    <div class="footer">
      <a href="https://github.com/Choyero/CalTracker.git">
        <img src="../public/images/github.png" alt="">
      </a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
}

</style>
