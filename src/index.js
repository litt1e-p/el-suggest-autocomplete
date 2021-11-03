import ElSuggestAutocomplete from './lib.vue'

const components = [ElSuggestAutocomplete]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install
export { ElSuggestAutocomplete }
