ElSuggestAutocomplete
<template>
  <div class="_el__suggest-atc">
    <el-autocomplete v-model="valt"
                    :fetch-suggestions="dbf"
                    :placeholder="placeholder"
                    clearable
                    :trigger-on-focus="true"
                    popper-class="_el__suggest-atc-sa"
                    @blur="$emit('blur')"
                    @input="_sl7">
      <template slot-scope="{ item }">
        <div class="_el__sugt-sg" :class="{'_el_sugt-hf': item.__terminated && selt && selt.length > 0}" v-if="item.type && item.type === '__sgt'">
          <div class="_el__sugt-sg-sec" v-if="item && item.__started">{{suggestionsTitle}}</div>
          <span v-if="item.value">{{ item.value }}</span>
          <div class="_el__sugt-sg-sec" v-if="item && item.__terminated && selt && selt.length > 0">{{optionsTitle}}</div>
        </div>
        <div class="_el__sugt-nm" v-else>{{item.value}}</div>
      </template>
  </el-autocomplete>
  </div>
</template>

<script>

import { debounce, cloneDeep } from 'lodash'
import Cak from 'cak'

export default {
  name: 'ElSuggestAutocomplete',
  props: {
    value: {
      type: String
    },
    suggestions: {
      type: Array,
      default: () => Array.prototype.constructor()
    },
    placeholder: {
      type: String,
      default: () => 'type to search'
    },
    suggestionsTitle: {
      type: String,
      default: () => 'group name'
    },
    optionsTitle: {
      type: String,
      default: () => 'all options'
    },
    hideEmpty: {
      type: Boolean,
      default: () => true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      valt: void 0,
      sult: void 0,
      selt: void 0,
      dbf: void 0
    }
  },
  mounted () {
    this._i1()
  },
  methods: {
    _i1 () {
      this.cache = new Cak(30)
      this.dbf = debounce(this._gr0, 500)
      this.value && this._i0(this.value)
      this.suggestions && this._uo4(this.suggestions)
    },
    _i0 (v, d) {
      this.valt = d ? ['_unlock', cloneDeep(v)] : cloneDeep(v)
      this._cl2(this.valt)
    },
    _uo4 (v) {
      if (!this._arb(v, this.hideEmpty)) {
        this.sult = Array.prototype.constructor()
        return
      }
      let sult = v.map(i => ({type: '__sgt', value: i.value || i}))
      if (!this.hideEmpty && sult.length === 0) {
        sult = [{__started: true, type: '__sgt', value: void 0, __terminated: true}]
      } else {
        sult[0]['__started'] = true
        sult[sult.length - 1]['__terminated'] = true
      }
      this.sult = sult
    },
    _nb3 (v) {
      if (!v || !Array.isArray(v) || !v.length) {
        return
      }
      return v.map(o => ({ value: o.value || o }))
    },
    _arb (v, l = true) {
      return v && Object.prototype.toString.call(v) === '[object Array]' && (l ? v.length > 0 : true)
    },
    _gr0 (clue, closure) {
      if (!clue || !clue.length) {
        return closure(this.sult)
      }
      const that = this
      const cs = closure
      if (that.cache.has(clue)) {
        return closure(that.sult.concat(that.cache.get(clue)))
      }
      closure = function () {
        if (!Array.isArray(arguments[0])) {
          return
        }
        const nr = that._nb3(arguments[0])
        that.cache.set(clue, nr)
        that.selt = nr
        const args = that.sult.concat(nr)
        return cs.apply(this, [args])
      }
      this.$emit('fetch-suggestions', [clue, closure])
    },
    _cl2 (v) {
      if (this._arb(v) && v[0] === '_unlock') {
        this.$emit('change', cloneDeep(v[1]))
      }
    }
  },
  watch: {
    value (v) {
      this._i0(v)
    },
    suggestions: '_uo4'
  }
}

</script>

<style lang="scss">
@import './style/style.scss';
</style>
