<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />

      <b-row>
        <b-col cols="2"></b-col>

        <b-col>
          <form @submit.prevent="add">

            <!-- Nome do Sponsor -->
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do sponsor"
                required
              />
            </div>

            <!-- Contacto -->
            <div class="form-group">
              <input
                v-model="contact"
                type="text"
                class="form-control form-control-lg"
                placeholder="Contacto"
                required
              />
            </div>

            <!-- Animal Patrocinado -->
            <div class="form-group">
              <select
                class="form-control form-control-lg"
                v-model="animal"
                required
              >
                <option value="">-- Seleciona animal patrocinado --</option>
                <option
                  v-for="item in allAnimals"
                  :key="item.id"
                  :value="item.name"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <!-- Botões -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>

            <router-link
              :to="{ name: 'listSponsors' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>

          </form>
        </b-col>

        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";

export default {
  name: "AddSponsor",

  components: {
    HeaderPage
  },

  data() {
    return {
      name: "",
      contact: "",
      animal: ""
    };
  },

  computed: {
    ...mapGetters("sponsor", ["getMessage"]),
    ...mapGetters("animal", ["getAnimals"]),
    
    allAnimals() {
      return this.getAnimals; // lista de animais já existente na store
    }
  },
created() {
  this.$store.dispatch("animal/fetchAnimals");
},
  methods: {
    add() {
  const payload = {
    name: this.name,
    contact: this.contact,
    animal: this.animal
  };

  this.$store
    .dispatch(`sponsor/${ADD_SPONSOR}`, payload)
    .then(() => {
      this.$alert(this.getMessage, "Sponsor adicionado!", "success");
      router.push({ name: "listSponsors" });
    })
    .catch(err => {
      this.$alert(`${err.message}`, "Erro", "error");
    });
}

  }
};
</script>
