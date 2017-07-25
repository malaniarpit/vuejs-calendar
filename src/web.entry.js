import Vue from 'vue';
import './style.scss';

import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', {get(){ return this.$root.moment.utc }});

import store from './store';
let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});
let initalState = Object.assign({}, store.state, {events});
store.replaceState(initalState);

import App from './components/app.vue';

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store,
  render(createElement) {
    return createElement(
      'div',
      { attrs: { id: 'app'} },
      [
        createElement('app')
      ]
    );
  }
});
