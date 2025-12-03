<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="nome"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do sponsor"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="contacto"
                type="text"
                class="form-control form-control-lg"
                placeholder="Contacto"
                required
              />
            </div>

            <div class="form-group">
              <select
                v-model="animalPatrocinado"
                class="form-control form-control-lg"
                required
              >
                <option disabled value="">-- SELECIONA ANIMAL --</option>
                <option
                  v-for="animal in animals"
                  :key="animal._id"
                  :value="animal._id"
                >
                  {{ animal.name }}
                </option>
              </select>
            </div>

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
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data() {
    return {
      nome: "",
      contacto: "",
      animalPatrocinado: "",
      animals: []
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"]),
    ...mapGetters("animal", ["getAnimals"])
  },
  methods: {
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
        () => {
          this.animals = this.getAnimals;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    add() {
      const payload = {
        nome: this.nome,
        contacto: this.contacto,
        animalPatrocinado: this.animalPatrocinado
      };

      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, payload).then(
        () => {
          this.$alert(this.getMessage, "Sponsor adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.fetchAnimals();
  }
};
</script>
