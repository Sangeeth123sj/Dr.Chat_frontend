<template>
  <div>
    
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-8">
          <ReportInput />
        </div>
        <div class="col-sm-4 col-md-4 mobile-padding">
          <ChatBox />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportInput from "../components/ReportInput.vue";
import ChatBox from "../components/ChatBox.vue";
export default {
name: "Home",
components: {
ReportInput,
ChatBox,
},
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.align-logo{
  display: inline-block;
}

@media screen and (max-width: 575px) {
  .mobile-padding {
    padding-top: 100px; /* 10px top and bottom padding */
  }
}
</style>