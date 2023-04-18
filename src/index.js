import PeTable from "./components/PeTable.vue";
import ITableHeader from "./interfaces/ITable.ts";

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component("pe-table", PeTable);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

PeTable.install = install;

export { PeTable, ITableHeader };