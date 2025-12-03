<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Expert" />

      <!-- FORM -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">

            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="nome"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do Expert"
                required
              />
            </div>

            <!-- CONTACTO -->
            <div class="form-group">
              <input
                v-model="contacto"
                type="text"
                class="form-control form-control-lg"
                placeholder="Contacto (Telefone ou Email)"
                required
              />
            </div>

            <!-- ÁREA DE ESPECIALIDADE -->
            <div class="form-group">
              <input
                v-model="area"
                type="text"
                class="form-control form-control-lg"
                placeholder="Área de Especialidade"
                required
              />
            </div>

            <!-- BOTÕES -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>

            <router-link
              :to="{ name: 'listExperts' }"
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
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",

  components: {
    HeaderPage
  },

  data() {
    return {
      nome: "",
      contacto: "",
      area: ""
    };
  },

  computed: {
    ...mapGetters("expert", ["getMessage"])
  },

  methods: {
    add() {
      const payload = {
        nome: this.nome,
        contacto: this.contacto,
        area: this.area
      };

      this.$store.dispatch(`expert/${ADD_EXPERT}`, payload).then(
        () => {
          this.$alert(this.getMessage, "Expert adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro ao adicionar Expert", "error");
        }
      );
    }
  }
};
</script>
