<template>
<div>
    <VideoHome/>
    <Stats/>
    <Description/>
    <Phone/>

</div>
</template>
<script>
import VideoHome from "./components/VideoHome";
import Phone from "./components/Phone";
import Stats from "./components/Stats"
import Description from "./components/Description"

export default {
  name: "Home",
  components: {
    VideoHome,
    Phone,
    Stats,
    Description
  }
};
</script>
