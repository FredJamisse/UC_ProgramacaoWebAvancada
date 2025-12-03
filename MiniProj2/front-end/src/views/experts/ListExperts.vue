<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Experts" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR EXPERT
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
                <th scope="col">
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType === 1" @click="sort"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort"></i>
                </th>
                <th scope="col">CONTACTO</th>
                <th scope="col">ÁREA DE ESPECIALIDADE</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="expert in experts" :key="expert._id">
                <td class="pt-4">{{ expert.nome }}</td>
                <td class="pt-4">{{ expert.contacto }}</td>
                <td class="pt-4">{{ expert.area }}</td>

                <td>
                  <router-link
                    :to="{ name: 'editExpert', params: { expertId: expert._id } }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    @click="viewExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-primary mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>

                  <button
                    @click="removeExpert(expert._id)"
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
  FETCH_EXPERTS,
  REMOVE_EXPERT
} from "@/store/experts/expert.constants";

export default {
  name: "ManageExperts",
  components: {
    HeaderPage
  },

  data() {
    return {
      experts: [],
      sortType: 1
    };
  },

  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"])
  },

  methods: {
    fetchExperts() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
        () => {
          this.experts = this.getExperts;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },

    sort() {
      this.experts.sort(this.compareNames);
      this.sortType *= -1;
    },

    compareNames(e1, e2) {
      if (e1.nome > e2.nome) return 1 * this.sortType;
      else if (e1.nome < e2.nome) return -1 * this.sortType;
      else return 0;
    },

    viewExpert(id) {
      const expert = this.experts.find(e => e._id === id);

      this.$fire({
        title: expert.nome,
        html: this.generateTemplate(expert),
        icon: "info"
      });
    },

    generateTemplate(expert) {
      return `
        <h4>Contacto:</b> ${expert.contacto}</h4>
        <h5>Especialidade:</b> ${expert.area}</h5>
      `;
    },

    removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o expert?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id).then(() => {
            this.$alert(this.getMessage, "Expert removido!", "success");
            this.fetchExperts();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },

  created() {
    this.fetchExperts();
  }
};
</script>
