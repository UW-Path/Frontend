<template>
  <v-card class="plan-health" outlined>
    <div class="plan-health-overview" aria-live="polite">
      <div class="plan-health-heading">
        <span class="plan-health-title">Plan health</span>
        <span class="plan-health-state" :class="stateClass">{{
          headline
        }}</span>
      </div>

      <div class="plan-health-metrics">
        <span
          ><strong>{{ plannedCourses.length }}</strong> courses</span
        >
        <span>{{ formattedCredits }} credits</span>
        <span v-if="degreeRequirements.length">
          {{ metRequirements }}/{{ degreeRequirements.length }} requirements
        </span>
        <span v-if="blockingIssues.length" class="metric-error">
          {{ blockingIssues.length }}
          {{ pluralize("conflict", blockingIssues.length) }}
        </span>
        <span v-if="manualReviews.length" class="metric-review">
          {{ manualReviews.length }} manual
          {{ pluralize("check", manualReviews.length) }}
        </span>
        <span v-if="heavyTerms.length" class="metric-review">
          {{ heavyTerms.length }} heavy
          {{ pluralize("term", heavyTerms.length) }}
        </span>
      </div>

      <button
        v-if="reviewItems.length"
        type="button"
        class="review-toggle"
        :aria-expanded="expanded.toString()"
        @click="expanded = !expanded"
      >
        {{ expanded ? "Hide details" : "Review details" }}
        <v-icon x-small>{{
          expanded ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </button>
    </div>

    <v-expand-transition>
      <div v-show="expanded" class="plan-health-details">
        <div v-for="item in reviewItems" :key="item.key" class="review-item">
          <v-icon x-small :class="`review-icon-${item.kind}`">{{
            item.icon
          }}</v-icon>
          <strong class="review-item-label">{{ item.label }}</strong>
          <span class="review-item-message">{{ item.message }}</span>
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import {
  actionableValidationMessage,
  manualReviewMessage
} from "../../utils/validationGuidance";

export default {
  name: "PlanHealthSummary",
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    ...mapGetters([
      "getTable",
      "checklistMajorRequirements",
      "checklistMinorRequirements",
      "checklistOptionRequirements"
    ]),
    plannedCourses() {
      const courses = [];
      this.getTable.forEach((term, termIndex) => {
        term.courses.forEach(requirement => {
          const course = requirement.selected_course;
          if (
            course &&
            course.course_code !== "WAITING" &&
            !requirement.clickedDelete
          ) {
            courses.push({ requirement, course, termIndex });
          }
        });
      });
      return courses;
    },
    plannedCredits() {
      return this.plannedCourses.reduce(
        (total, item) => total + (parseFloat(item.course.credit) || 0),
        0
      );
    },
    formattedCredits() {
      return this.plannedCredits.toFixed(2).replace(/\.?0+$/, "");
    },
    degreeRequirements() {
      return [
        this.checklistMajorRequirements,
        this.checklistMinorRequirements,
        this.checklistOptionRequirements
      ].reduce((requirements, programs) => {
        Object.keys(programs).forEach(program => {
          requirements.push(...programs[program]);
        });
        return requirements;
      }, []);
    },
    metRequirements() {
      return this.degreeRequirements.filter(
        requirement => requirement.prereqs_met
      ).length;
    },
    blockingIssues() {
      return this.plannedCourses.filter(
        item =>
          item.requirement.validation_status === "failed" &&
          !item.requirement.overridden
      );
    },
    manualReviews() {
      return this.plannedCourses.filter(
        item =>
          item.requirement.validation_status === "manual_review_recommended" &&
          !item.requirement.overridden
      );
    },
    validationErrors() {
      return this.plannedCourses.filter(
        item => item.requirement.validation_status === "error"
      );
    },
    overrides() {
      return this.plannedCourses.filter(item => item.requirement.overridden);
    },
    heavyTerms() {
      return this.getTable
        .map((term, termIndex) => ({
          termIndex,
          credits: term.courses.reduce((total, requirement) => {
            const course = requirement.selected_course;
            if (
              !course ||
              course.course_code === "WAITING" ||
              requirement.clickedDelete
            ) {
              return total;
            }
            return total + (parseFloat(course.credit) || 0);
          }, 0)
        }))
        .filter(term => term.credits > 2.5);
    },
    reviewItems() {
      const blocking = this.blockingIssues.map(item => ({
        key: `blocking-${item.requirement.id}`,
        kind: "error",
        icon: "mdi-alert-circle",
        label: `${item.course.course_code} · ${this.termName(item.termIndex)}`,
        message: actionableValidationMessage(
          item.requirement.validation_message
        )
      }));
      const manual = this.manualReviews.map(item => ({
        key: `manual-${item.requirement.id}`,
        kind: "review",
        icon: "mdi-information",
        label: `${item.course.course_code} · ${this.termName(item.termIndex)}`,
        message: manualReviewMessage(item.requirement.validation_advisories)
      }));
      const unavailable = this.validationErrors.map(item => ({
        key: `error-${item.requirement.id}`,
        kind: "error",
        icon: "mdi-cloud-alert",
        label: `${item.course.course_code} · ${this.termName(item.termIndex)}`,
        message:
          "Validation is temporarily unavailable. Try changing the plan or refreshing."
      }));
      const heavy = this.heavyTerms.map(term => ({
        key: `heavy-${term.termIndex}`,
        kind: "review",
        icon: "mdi-weight",
        label: this.termName(term.termIndex),
        message: `${term.credits.toFixed(
          2
        )} credits are planned; review this term's workload.`
      }));
      const overridden = this.overrides.map(item => ({
        key: `override-${item.requirement.id}`,
        kind: "override",
        icon: "mdi-alert-outline",
        label: `${item.course.course_code} · ${this.termName(item.termIndex)}`,
        message: "Automatic validation has been overridden."
      }));
      return [...blocking, ...unavailable, ...manual, ...heavy, ...overridden];
    },
    headline() {
      if (!this.plannedCourses.length) return "Start planning";
      if (this.blockingIssues.length || this.validationErrors.length) {
        return "Needs attention";
      }
      if (this.reviewItems.length) return "Review suggested";
      return "No detected conflicts";
    },
    stateClass() {
      if (!this.plannedCourses.length) return "state-empty";
      if (this.blockingIssues.length || this.validationErrors.length) {
        return "state-error";
      }
      if (this.reviewItems.length) return "state-review";
      return "state-clear";
    }
  },
  methods: {
    termName(termIndex) {
      return `${Math.floor(termIndex / 2) + 1}${String.fromCharCode(
        (termIndex % 2) + 65
      )}`;
    },
    pluralize(word, count) {
      return count === 1 ? word : `${word}s`;
    }
  }
};
</script>

<style scoped>
.plan-health {
  flex: 0 0 auto;
  margin: 8px 10px 0;
  padding: 8px 12px;
}

.plan-health-overview,
.plan-health-heading,
.plan-health-metrics {
  align-items: center;
  display: flex;
}

.plan-health-overview {
  gap: 16px;
  min-height: 30px;
}

.plan-health-heading {
  flex: 0 0 auto;
  gap: 8px;
}

.plan-health-title {
  font-size: 1rem;
  font-weight: 600;
}

.plan-health-state {
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
}

.state-empty {
  background: #eeeeee;
  color: #555555;
}

.state-clear {
  background: #e3f4e8;
  color: #256b3b;
}

.state-review {
  background: #fff3cd;
  color: #765600;
}

.state-error {
  background: #fce7e7;
  color: #a12626;
}

.plan-health-metrics {
  color: #555555;
  flex: 1 1 auto;
  flex-wrap: wrap;
  font-size: 0.8rem;
  gap: 4px 14px;
}

.metric-error {
  color: #a12626;
  font-weight: 600;
}

.metric-review {
  color: #765600;
  font-weight: 600;
}

.review-toggle {
  align-items: center;
  color: #315f7d;
  display: flex;
  flex: 0 0 auto;
  font-size: 0.8rem;
  font-weight: 600;
  gap: 2px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
}

.plan-health-details {
  border-top: 1px solid #eeeeee;
  margin-top: 7px;
  max-height: 150px;
  overflow-y: auto;
  padding-top: 5px;
}

.review-item {
  align-items: flex-start;
  display: grid;
  font-size: 0.8rem;
  gap: 10px;
  grid-template-columns: 16px auto minmax(0, 1fr);
  line-height: 1.35;
  padding: 6px 0;
  text-align: left;
}

.review-item + .review-item {
  border-top: 1px solid #f3f3f3;
}

.review-item-label {
  white-space: nowrap;
}

.review-item-message {
  color: #444444;
  min-width: 0;
}

.review-item .v-icon {
  margin-top: 2px;
}

.review-icon-error {
  color: #c73838 !important;
}

.review-icon-review {
  color: #b27a00 !important;
}

.review-icon-override {
  color: #666666 !important;
}

@media (max-width: 900px) {
  .plan-health-overview {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 6px 12px;
  }

  .plan-health-metrics {
    flex-basis: 100%;
    order: 3;
  }
}

@media (max-width: 640px) {
  .review-item {
    grid-template-columns: 16px minmax(0, 1fr);
  }

  .review-item-message {
    grid-column: 2;
  }
}
</style>
