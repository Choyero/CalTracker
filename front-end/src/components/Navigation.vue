<template>
    <div class="main-wrapper">
        <!--Navigation bar -->
        <nav>
            <router-link to="/">            
            <img class="logo" src="../../images/avocado.png" alt="avocado">
            </router-link>
            <div class="hamburger" @click="changeClass()">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <ul class="nav-links" v-bind:class="{open: isActive}">
                <li><router-link to="/">Log Food</router-link></li>
                <li><router-link to="/pantry">My Pantry</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </nav>
    </div>
</template>


<script>
export default {
    name: 'Navigation',
    props: {
        msg: String
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        changeClass() {
            this.isActive = !this.isActive;
        },
    }
}
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}

body {
    font-family: sans-serif;
}

nav {
    background: rgba(0,0,0,0.8);
    display: flex;
}

.logo {
   z-index: 1;
   margin-left: 10%; 
}

.nav-links {
   display: flex; 
   list-style: none;
   width: 50%;
   height: 100%;
   justify-content: space-around;
   margin-left: auto;
   padding-top: 2vh;
   padding-bottom: 2vh;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 16px;
}

@media screen and (max-width: 768px) {
    .line {
        width: 30px;
        height: 3px;
        background: white;
        margin: 5px;
    }

    nav {
        position: relative;
    }

    .hamburger {
        position: absolute;
        cursor: pointer;
        right: 5%;
        top: 50%;
        transform: translate(-5%, -50%);
        z-index: 2;
    }

    .nav-links {
        position: fixed;
        background: rgba(0,0,0,0.8);
        height: 100%;
        width: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        clip-path: circle(0 at 90% 10%);
        -webkit-clip-path: circle(0 at 90% 10%);
        transition: all 1s ease-out;
        pointer-events: none;
    }

    .open {
        clip-path: circle(1000px at 90% 10%);
        -webkit-clip-path: circle(1000px at 90% 10%);
        pointer-events: all;
        background: rgba(0,0,0,0.8);
    }


    .nav-links li a {
        font-size: 25px;
    }


}
</style>