<template>
  <v-card>
    <v-card-title>Something Unexpected Happened?</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-col class="text-align-left">
        Please try and clear local storage and hard-reload the page. This should
        solve 99% of problems! If refreshing local storage still doesn't work,
        please <a href="/Contact">contact us</a> and we will address the issue
        immediately.
      </v-col>
      <v-col class="text-align-left">
        <p>
          <b>Chrome:</b> prompt Developer Tools by right-clicking -> Inspect
          Element -> Navigate to "Application" tab -> Click on clear site data
          under "Clear Storage"
        </p>
        <p>
          <b>Firefox:</b> prompt Developer Tools by right-clicking -> Inspect
          Element -> Navigate to Storage tab -> Click on "Local Storage" and
          expand the list -> right-click https://uwpath.live and choose "Delete
          All"
        </p>
        <p>
          <b>Microsoft Edge:</b> prompt Developer Tools by pressing
          <i>F12</i> -> Navigate to "Debugger View" tab -> Open the localStorage
          tab -> select all and delete
        </p>
        <p>
          <b>Safari:</b> prompt Developer Tools by right-clicking -> Inspect
          Element -> Navigate to "Storage" tab -> Navigate to "Local Storage" ->
          Click on individual columns -> Right-click the same column and click
          "Delete"
        </p>
        <p>
          You can also remove local storage very easily by going to the console
          tab in Developer Tools and type <i>localStorage.clear()</i>
        </p>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TroubleShootModalContent"
};
</script>

<style scoped>
.text-align-left {
  text-align: left;
}
</style>
