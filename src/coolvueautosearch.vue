<script>
import Vue from 'vue'
export default {
    name: 'coolvueautosearch',
    data() {
        return {
            open: false, // for showing/hiding Searched State
            selctedoption: 0, // for selected 
            selectedstate1: '' // for getting typed text to compare
        }
    },
    props: ['optiondata', 'selectedstate'],
    computed: {
        matches () {
          return this.optiondata.filter((str) => {
            str = str.text.toLowerCase()
            return str.includes(this.selectedstate1.toLowerCase())
          })
        },
        showstates () {
          if (this.selectedstate1) {
            this.selctedoption = 0
          } else {
            this.selctedoption = 0
          }
          return this.open === true
        }
    },
    methods: {
      enter () { // event after enter key press on input box
        this.selectedstate1 = this.matches[this.selctedoption].text
        let id = this.matches[this.selctedoption].value
        // this.$emit('getstatecode', id) // this line for event emitting to send selcted value to parent component
        this.open = false
      },
      up () { // event after up key press on input box
        if(this.selctedoption > 0)
          this.selctedoption--
      },
      down () { // event after down key press on input box
        if(this.selctedoption < this.matches.length - 1)
          this.selctedoption++
      },
      isActive (index) {
        return index === this.selctedoption
      },
      change () { // event after any inputs
        if (this.open == false) {
          this.open = true
          this.selctedoption = 0
        }
      },
      stateClick (index) { // event after selecting state option
        this.selectedstate1 = this.matches[index].text
        let id = this.matches[index].value
        // this.$emit('getstatecode', id) // this line for event emitting to send selcted value to parent component
        this.open = false
      },
      focusout () { // event after living input box
        if (this.matches.length > 0) {
          this.selectedstate1 = this.matches[this.selctedoption < 0 ? 0 : this.selctedoption].text
          let id = this.matches[this.selctedoption < 0 ? 0 : this.selctedoption].value
          // this.$emit('getstatecode', id) // this line for event emitting to send selcted value to parent component
          this.open = false
        } else {
          // this.$emit('getstatecode', null) // this line for event emitting to send selcted value to parent component
          this.open = false
        }
      }
    }
}
</script>
<style scoped>
  .active {
    background-color: tomato
  }
</style>

<template>
<div style="position:relative" v-bind:class="{'open':showstates}">
    <input class="form-control" type="text" v-model="selectedstate1"
      @keydown.enter = 'enter'
      @keydown.down = 'down'
      @keydown.up = 'up'
      @input = 'change'
      @focusout = 'focusout'
      @focusin = 'open=true'
    />
    <ul v-if="matches.length > 0" class="dropdown-menu" style="width:100%;overflow-y:scroll;max-height:240px;">
      <li style="padding-left:10px;cursor:pointer;" v-for="(state, i) in matches" v-bind:class="{'active': isActive(state)}" @click="stateClick(i)" :key="i">
        {{ i.text }}
      </li>
    </ul>
</div>
</template>