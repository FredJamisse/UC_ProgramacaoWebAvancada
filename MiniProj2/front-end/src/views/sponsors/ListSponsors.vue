<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Sponsors" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>

        <b-col>
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR SPONSOR
          </router-link>

          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>

        <b-col cols="2"></b-col>
      </b-row>

      <!-- TABLE -->
      <b-row>
        <b-col cols="2"></b-col>

        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType === 1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>

                <th>CONTACTO</th>
                <th>ANIMAL PATROCINADO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="s in sponsors" :key="s._id">
                <td class="pt-4">{{ s.name }}</td>
                <td class="pt-4">{{ s.contact }}</td>
                <td class="pt-4">{{ s.animal }}</td>

                <td>
                  <router-link
                    :to="{ name: 'editSponsor', params: { sponsorId: s._id } }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    @click="viewSponsor(s._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>

                  <button
                    @click="removeSponsor(s._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>

        <b-col cols="2"></b-col>
      </b-row>

    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import {
  FETCH_SPONSORS,
  REMOVE_SPONSOR
} from "@/store/sponsors/sponsor.constants";

export default {
  name: "ManageSponsors",

  components: {
    HeaderPage
  },

  data() {
    return {
      sponsors: [],
      sortType: 1
    };
  },

  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"])
  },

  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = this.getSponsors;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },

    sort() {
      this.sponsors.sort(this.compareNames);
      this.sortType *= -1;
    },

    compareNames(a, b) {
      if (a.name > b.name) return 1 * this.sortType;
      if (a.name < b.name) return -1 * this.sortType;
      return 0;
    },

    viewSponsor(id) {
      const s = this.sponsors.find(item => item._id === id);

      this.$fire({
        title: s.name,
        html: this.generateTemplate(s),
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448599.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Sponsor"
      });
    },

    generateTemplate(s) {
      return `
        <h4>Contacto: ${s.contact}</h4>
        <h5>Animal Patrocinado: <b>${s.animal}</b></h5>
      `;
    },

    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o sponsor?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Sponsor removido!", "success");
            this.fetchSponsors();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },

  created() {
    this.fetchSponsors();
  }
};
</script>
