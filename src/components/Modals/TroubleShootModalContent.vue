<template>
      <v-card>
         <v-card-title>Something Unexpected Happened?</v-card-title>
         <v-divider></v-divider>
         <v-card-text >
            <v-col class="text-align-left">
               Please try and clear local storage and reload the page. This should solve 99% of the problem! If refreshing 
               local storage still doesn't work, please <a href='/Contact'>contact us</a> and we will address the issue immidietly.
            </v-col>
            <v-col class="text-align-left">
               <b>To Reset Cache</b> 
               <br/>
               <p>Chrome: prompt Developer Tools by pressing F12 -> Navigate to Application tab -> Click on clear site data under Clear Storage</p>
               <p>Firefox: prompt Developer Tools by pressing F12 -> Navigate to Storage tab -> Click on Local Storage and expand the list -> right click https://uwpath.live and choose Delete All</p>
               <p>Microsoft Edge: prompt Developer Tools by pressing F12 -> Navigate to Debuuger View tab -> Open the localStorage tab -> select all and delete</p>
               <p>You can also remove local storage very easily by going to the console tab in Developer Tool and type <i>localStorage.clear()</i></p>
            </v-col>
         </v-card-text>
      </v-card>
</template>

<script>
export default {
    name: "TroubleShootModalContent",
}
</script>

<style scoped>
   .text-align-left {
      text-align: left;
   }
</style>