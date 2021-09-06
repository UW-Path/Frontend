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
        ** Please refer to the undergrad calendar (<span
          v-if="this.majorRequirements.length"
          ><a
            :href="getLinkToUnderGradCalender(majorRequirements[0].info.link)"
            target="blank"
            >{{ majorRequirements[0].info.program_name }}</a
          ></span
        >
        <!-- We may have multiple minors -->
        <span v-if="this.minorRequirements.length">
          <span
            v-for="(minor, index) in minorRequirements"
            :key="index + majorRequirements.length"
            >,
            <a
              :href="getLinkToUnderGradCalender(minor.info.link)"
              target="blank"
              >{{ minor.info.program_name }}</a
            ></span
          ></span
        >
        <span v-if="this.specRequirements.length"
          >,
          <a
            :href="getLinkToUnderGradCalender(specRequirements[0].info.link)"
            target="blank"
            >{{ specRequirements[0].info.program_name }}</a
          ></span
        >) for the most accurate information (click on the major/minor/option
        title). Note: Most plans need 20 credits to graduate. <br /><br />
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
import { getLinkToUnderGradCalender } from "../../getLinkToUnderGradCalender";
export default {
  name: "AdditionalNoteSection",
  props: {
    program: String
  },
  computed: {
    ...mapGetters([
      "majorRequirements",
      "minorRequirements",
      "specRequirements",
      "calendarYear"
    ]),
    getYear: function() {
      if (this.calendarYear) {
        return this.calendarYear;
      }
      return "";
    }
  },
  methods: {
    getLinkToUnderGradCalender
  }
};
</script>

<style scoped>
.smallText {
  text-align: left;
}
</style>
