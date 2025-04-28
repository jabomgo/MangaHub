import "./assets/main.css";
import "primeflex/primeflex.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import persistedState from "pinia-plugin-persistedstate";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

// importar os componentes primevue aqui
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import SpeedDial from "primevue/speeddial";
import Toast from "primevue/toast";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import Paginator from "primevue/paginator";
import Skeleton from "primevue/skeleton";

import App from "./App.vue";
import router from "./router";
import Ripple from "primevue/ripple";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true,
});

const pinia = createPinia();
pinia.use(persistedState);

app.use(pinia);
app.use(router);

app.directive("ripple", Ripple);

// Chamar os componentes do primevue aqui Ex:
app.component("Button", Button);
app.component("Checkbox", Checkbox);
app.component("SpeedDial", SpeedDial);
app.component("Toast", Toast);
app.component("Badge", Badge);
app.component("Avatar", Avatar);
app.component("InputText", InputText);
app.component("Menubar", Menubar);
app.component("Card", Card);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("InputNumber", InputNumber);
app.component("Paginator", Paginator);
app.component("Skeleton", Skeleton);

app.mount("#app");
