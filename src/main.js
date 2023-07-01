/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import {registerGlobalComponent} from "@/util/import";
// Composables
import {createApp} from 'vue'
import Notyf from "@/components/common/Notyf.vue";
// Plugins
import {registerPlugins} from '@/plugins'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faCalendarPlus} from '@fortawesome/free-regular-svg-icons'
import {faBloggerB} from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faHouse, faCalendarPlus, faBloggerB)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('notyf', Notyf)
registerGlobalComponent(app);
registerPlugins(app)

app.mount('#app')
