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

      <!-- TABELA -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                  ></i>
                  <i
                    class="fas fa-arrow-down"
                    v-else
                    @click="sort()"
                  ></i>
                </th>
                <th scope="col">CONTACTO</th>
                <th scope="col">ANIMAL PATROCINADO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sponsor in sponsors" :key="sponsor._id">
                <td class="pt-4">{{ sponsor.nome }}</td>
                <td class="pt-4">{{ sponsor.contacto }}</td>
                <td class="pt-4">
                  <!-- se o backend fizer populate -->
                  <span v-if="sponsor.animalPatrocinado && sponsor.animalPatrocinado.name">
                    {{ sponsor.animalPatrocinado.name }}
                  </span>
                  <!-- caso apenas venha o id -->
                  <span v-else>
                    {{ sponsor.animalPatrocinado }}
                  </span>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'editSponsor', params: { sponsorId: sponsor._id } }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                      @click="viewSponsor(sponsor)"
                      type="button"
                      class="btn btn-outline-primary mr-2 mt-2"
                    >
                      <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeSponsor(sponsor._id)"
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
  name: "ListSponsors",
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
      this.sponsors.sort((a, b) => {
        if (a.nome > b.nome) return 1 * this.sortType;
        if (a.nome < b.nome) return -1 * this.sortType;
        return 0;
      });
      this.sortType *= -1;
    },

    viewSponsor(sponsor) {
  const animalName = sponsor.animalPatrocinado?.name || "Sem informação";

  const html = `
    <h4><b>Nome:</b> ${sponsor.nome}</h4>
    <h4><b>Contacto:</b> ${sponsor.contacto}</h4>
    <h4><b>Animal Patrocinado:</b> ${animalName}</h4>
  `;

  this.$fire({
    title: "Detalhes do Sponsor",
    html,
    icon: "info",
    confirmButtonText: "OK"
  });
},


    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o sponsor?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(
            () => {
              this.$alert(this.getMessage, "Sponsor removido!", "success");
              this.fetchSponsors();
            }
          );
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
