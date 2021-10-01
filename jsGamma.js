Vue.component('product', {

    template: `
        <body v-bind:style="{ backgroundImage: 'url(' + image + ')'}">
        <div class="circular" v-bind:style="{ backgroundImage: 'url(' + image + ')' }"></div>

      <div class="grid-container">
      <div class="top"> {{ titel }} </div>
      <div class="leftTop">
        <add-recipe @addedRecipe="addNewRecipe"></add-recipe>
      </div>


      <div class="rightTop" id="transBack">

        <h2>Shoppinglista</h2>
        <p v-if="wares.length === 0">Inga recept ännu</p>

        <ul>
          <li v-for="ware in wares">
            <p v-if="ware.name!=null">{{ "Recept: " + ware.name }}</p>
            <p v-if="ware.ing1!=null">{{ "Att köpa: " + ware.ing1 }}</p>
            <p v-if="ware.ing2!=null">{{ "Att köpa: " + ware.ing2 }}</p>
            <p v-if="ware.ing3!=null">{{ "Att köpa: " + ware.ing3 }}</p>
            <p v-if="ware.ing4!=null">{{ "Att köpa: " + ware.ing4 }}</p>
            <p v-if="ware.ing5!=null">{{ "Att köpa: " + ware.ing5 }}</p>
          </li>
        </ul>
        <delete-recipe @deleteThis="removeFromList"></delete-recipe>


      </div>
      
      <footer class="bottom" id="transBack">
      <label for="userName">Användarnamn</label>
      <input id="userName" v-model="userName">
      <input type="button" id="baltha" @click="engageBaltha()" value="Engage Balthazar">

</footer>
      
      </div> </body>
    `,

    data() {

        return {
            wares: [],
            userName: "Martin",
            image: "balth.JPG"

        }


    },

    methods: {

        engageBaltha() {
            if (this.image=="hamBack.jpg") {
                this.image="balth.JPG";
                return;
            }
            this.image="hamBack.jpg";
        },

        addNewRecipe(need2buy) {
            this.wares.push(need2buy)
        },

        removeFromList(toDelete) {
            for (let i = 0; i < this.wares.length; i++) {
                if (toDelete===this.wares[i].name) {
                    this.wares.splice(i, 1);
                    alert("Receptet: " + this.wares[i].name + " har tagits bort från listan.");
                    return;
                }
            }
            alert("Receptnamnet hittades inte")
        }

    },
    computed: {
        titel() {
            return this.userName + "s Shoppinglista"
        }
    }
})



Vue.component('addRecipe', {
    template: `
      <form @submit.prevent="onSubmit">
      <p>
        <label for="name" >Recept:</label>
        <input id="name" v-model="name" required>
      </p>
      <p>
        <label for="ing1">Att Köpa:</label>
        <input id="ing1" v-model="ing1" required>
      </p>
      <p>
        <label for="ing2">Att Köpa:</label>
        <input id="ing2" v-model="ing2">
      </p>
      <p>
        <label for="ing3">Att Köpa:</label>
        <input id="ing3" v-model="ing3">
      </p>
      <p>
        <label for="ing4">Att Köpa:</label>
        <input id="ing4" v-model="ing4">
      </p>
      <p>
        <label for="ing5">Att Köpa:</label>
        <input id="ing5" v-model="ing5">
      </p>
      <p>
        <input type="submit" value="submit">
      </p>
      </form>
    `,
    data() {
        return{
            name: null,
            ing1: null,
            ing2: null,
            ing3: null,
            ing4: null,
            ing5: null,
        }
    },
    methods: {
        onSubmit() {
            console.log(this.name)
            let need2buy = {
                name: this.name,
                ing1: this.ing1,
                ing2: this.ing2,
                ing3: this.ing3,
                ing4: this.ing4,
                ing5: this.ing5,
            }
            this.$emit("addedRecipe", need2buy)
            this.name=null
            this.ing1=null
            this.ing2=null
            this.ing3=null
            this.ing4=null
            this.ing5=null
        }
    }
})

app = new Vue({
    el: "#app"
})

Vue.component('deleteRecipe', {
    template: `
    <form @submit.prevent="deleteRecipe">
      <p>
        <label for="toDelete">Recept att radera:</label>
        <input id="toDelete" v-model="toDelete">
      </p>
      <p>
        <input type="submit" value="Delete recipe">
      </p>
      </form>
    `,
    data() {
        return {
            toDelete: null
        }
    },
    methods: {
        deleteRecipe() {
            let toDelete = this.toDelete;
            this.$emit("deleteThis", toDelete);
            this.toDelete=null;
        }
    }
})