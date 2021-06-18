// This page is to list all the additional info based on different programs
<template>
  <span>
    <p class="smallText">
      <i>
        * The checklist is based on the {{ getYear }} academic calendar year.
      </i>
    </p>
    <p class="smallText">
      <i>
        ** Please refer to the
        <a :href="getLinkToUnderGradCalender" target="blank"
          >undergrad calendar</a
        >
        for the most accurate information (click on the major/minor/option
        title). Note: Most plans need 20 credits to graduate. <br />
        If the checklist adds up to less than 20 credits, the remaning are
        assumed to be general electives.
      </i>
    </p>
    <p class="smallText" v-if="program === 'Bachelor of Computer Science'">
      <i>
        *** The electives must satisfy BCS breadth and depth requirements.
      </i>
    </p>

    <p
      class="smallText"
      v-if="program === 'Mathematics/Financial Analysis and Risk Management'"
    >
      <i>
        *** Must choose a specialization. Please refer to undergrad calendar for
        more details.
      </i>
    </p>

    <p class="smallText" v-if="program === 'Bachelor of Arts'">
      <i>
        *** Each specific plan in Arts has its own unique requiremnts. Please
        refer to undergrad calendar for more details.
      </i>
    </p>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdditionalNoteSection",
  props: {
    program: String
  },
  computed: {
    ...mapGetters(["majorRequirements"]),
    getYear: function() {
      if (
        this.majorRequirements[0] &&
        this.majorRequirements[0].info &&
        this.majorRequirements[0].info.year
      ) {
        return this.majorRequirements[0].info.year;
      }
      return "";
    },
    getLinkToUnderGradCalender: function() {
      let additionalParams = "";
      // year has format "20xx-20xx"
      if (this.getYear)
        additionalParams =
          "?ActiveDate=9/1/" +
          this.majorRequirements[0].info.year.substring(0, 4);
      return (
        this.majorRequirements[0] &&
        this.majorRequirements[0].info.link + additionalParams
      ); //home page if somehow years didn't work
    }
  }
};
</script>

<style scoped>
.smallText {
  text-align: left;
}
</style>
