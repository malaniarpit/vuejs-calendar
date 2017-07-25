<template>
  <div :class="classObject" @click="captureClick">
    {{day.format('D')}}
    <ul class="event-list">
      <li v-for="event in events">{{event.description}}</li>
    </ul>
  </div>
</template>

<script>
export default{
  methods:{
    captureClick(event){
      this.$store.commit('eventFormPos', {x: event.clientX, y: event.clientY});
      this.$store.commit('eventFormActive', true);
      this.$store.commit('eventFormDate', this.day);
    }
  },
  props: ['day'],
  computed:{
    events(){
      return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
    },
    classObject(){
      let eventFormDate = this.$store.state.eventFormDate;
      let eventFormActive = this.$store.state.eventFormActive;
      return {
        day: true,
        today: this.day.isSame(this.$moment(), "day"),
        past: !this.day.isSameOrAfter(this.$moment(), "day"),
        active: this.day.isSame(eventFormDate, "day") && eventFormActive,
      }
    }
  }
}  
</script>