<template>
    <div class="configuration-page__container">
        <div class="configuration-page__info">
            <h1 class="configuration-page__title">Cadastro de URL de Integração</h1>
            <p class="configuration-page__subtitle">Para o Fila Fácil Admin funcionar plenamente, é necessário inserir a URL de integração com o Fila Fácil Server</p>
            <p class="configuration-page__caption" v-if="!configStore.isOnOfflineMode">Ou você pode iniciar a navegação offline e utilizar apenas o painel administrativo clicando <span class="configuration-page__skip" @click="handleOfflineModeClick">aqui</span></p>
            <p class="configuration-page__caption" v-else>Ou caso você não queira realizar nenhuma alteração, pode voltar para o painel clicando <span class="configuration-page__skip" @click="handlePushToDashboardClick">aqui</span></p>
        </div>
        <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md configuration-page__form"
    >
      <q-input
        filled
        v-model="configForm.integrationUrl"
        label="URL de Integração"
        hint="URL que direciona para onde o server está hospedado (ex: https://ffserver.meudominio.com)"
        :rules="[
            (val: string) => isUrlValid(val) || 'Insira uma URL Valida'
        ]"
      />

      <div class="configuration-page__action">
        <q-btn label="Limpar" type="reset" color="primary" flat/>
        <q-btn label="Enviar" type="submit" color="primary"/>
      </div>
    </q-form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useConfigStore } from '@/stores/config-store';
import { useRouter } from 'vue-router';
import { isUrlValid } from "@/helpers/string-helpers"
const configStore = useConfigStore();
const router = useRouter();
const configForm = reactive({
    integrationUrl: "",
})
function onReset() {
    configForm.integrationUrl = "";
}
function onSubmit() {
    configStore.setIntegrationUrl(configForm.integrationUrl);
    router.push("/painel");
}

function handleOfflineModeClick() {
    configStore.setOfflineMode(true);
    router.push("/painel");
}
function handlePushToDashboardClick() {
    router.push("/painel");
}

</script>

<style lang="scss" scoped>
.configuration-page {
    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__info {
        text-align: center;
        min-width: 600px;
    }
    &__title {
        font-size: 40px;
        margin-top: 60px;
        line-height: 0;
    }
    &__subtitle {
        margin-bottom: 0;
    }
    &__caption {
        text-align: right;
        font-size: 12px;
    }
    &__skip {
        color: $primary;
        font-weight: bold;
        cursor: pointer;
        &:hover{text-decoration: underline};
    }
    &__form {
        min-width: 600px;
        margin: 0 auto;
    }
    &__action {
        display: flex;
        justify-content: center;
        > * {
            flex-basis: 200px;
            &:not(:last-of-type) {
                margin-right: 40px;
            }
        }
    }

}
</style>