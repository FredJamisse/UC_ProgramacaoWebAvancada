<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Sponsor" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">

            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="sponsor.nome"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do Sponsor"
                required
              />
            </div>

            <!-- CONTACTO -->
            <div class="form-group">
              <input
                v-model="sponsor.contacto"
                type="text"
                class="form-control form-control-lg"
                placeholder="Contacto"
                required
              />
            </div>

            <!-- ANIMAL PATROCINADO -->
            <div class="form-group">
              <select
                v-model="sponsor.animalPatrocinado"
                class="form-control form-control-lg"
                required
              >
                <option disabled value="">
                  -- SELECIONA ANIMAL PATROCINADO --
                </option>

                <option
                  v-for="animal in animals"
                  :key="animal._id"
                  :value="animal._id"
                >
                  {{ animal.name }}
                </option>
              </select>
            </div>

            <!-- BOTÕES -->
            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2"
            >
              <i class="fas fa-edit"></i> ATUALIZAR
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
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage
  },
  data() {
    return {
      sponsor: {},
      animals: []
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorById", "getMessage"]),
    ...mapGetters("animal", ["getAnimals"])
  },
  methods: {
    async fetchAnimals() {
      await this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
      this.animals = this.getAnimals;
    },

    update() {
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.sponsor).then(
        () => {
          this.$alert(this.getMessage, "Sponsor atualizado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },

  async created() {
    // 1. Buscar sponsor pelo ID da rota
    this.sponsor = this.getSponsorById(this.$route.params.sponsorId);

    // 2. Se vier populado (objeto), converter para _id string
    if (
      this.sponsor.animalPatrocinado &&
      typeof this.sponsor.animalPatrocinado === "object"
    ) {
      this.sponsor.animalPatrocinado = this.sponsor.animalPatrocinado._id;
    }

    // 3. Carregar lista de animais antes do dropdown
    await this.fetchAnimals();
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
