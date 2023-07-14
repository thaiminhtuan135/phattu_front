/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import "@/styles/useApp.scss"
import {registerGlobalComponent} from "@/util/import";
// Composables
import {createApp} from 'vue'
import Notyf from "@/components/common/Notyf.vue";
// Plugins
import {registerPlugins} from '@/plugins'
// import CanvasJSChart from "@canvasjs/vue-charts"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faCalendarPlus} from '@fortawesome/free-regular-svg-icons'
import {faBloggerB} from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faHouse, faCalendarPlus, faBloggerB)

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('notyf', Notyf)
app.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
registerGlobalComponent(app);
registerPlugins(app)
// app.use(CanvasJSChart);
app.mount('#app')
