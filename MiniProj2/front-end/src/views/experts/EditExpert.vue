<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Expert" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">

          <form @submit.prevent="update">

            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="expert.nome"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do Expert"
                required
              />
            </div>

            <!-- CONTACTO -->
            <div class="form-group">
              <input
                v-model="expert.contacto"
                type="text"
                class="form-control form-control-lg"
                placeholder="Contacto (Telefone ou Email)"
                required
              />
            </div>

            <!-- ÁREA DE ESPECIALIDADE -->
            <div class="form-group">
              <input
                v-model="expert.area"
                type="text"
                class="form-control form-control-lg"
                placeholder="Área de Especialidade"
                required
              />
            </div>

            <!-- BOTÕES -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
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
import { EDIT_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",

  components: {
    HeaderPage
  },

  data() {
    return {
      expert: {}
    };
  },

  computed: {
    ...mapGetters("expert", ["getExpertById", "getMessage"])
  },

  methods: {
    update() {
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, this.expert).then(
        () => {
          this.$alert(this.getMessage, "Expert atualizado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro ao atualizar Expert", "error");
        }
      );
    }
  },

  created() {
    this.expert = this.getExpertById(this.$route.params.expertId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
