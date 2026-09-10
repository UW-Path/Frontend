<template>
  <div v-if="nested" class="course-condition-node">
    <template v-if="isCompactCourseGroup">
      <span v-if="compactGroupLabel" class="course-condition-operator">{{
        compactGroupLabel
      }}</span>
      <span>{{ courseListText }}</span>
    </template>
    <details v-else-if="isCollapsibleManual" class="manual-condition">
      <summary>{{ manualSummary }}</summary>
      <div class="manual-condition-detail">{{ leafText }}</div>
    </details>
    <span v-else-if="isLeaf">{{ leafText }}</span>
    <template v-else>
      <span v-if="!isRootAll" class="course-condition-operator">{{
        operatorLabel
      }}</span>
      <ul>
        <li v-for="(child, index) in children" :key="index">
          <CourseConditionList :rule="child" nested />
        </li>
      </ul>
    </template>
  </div>
  <v-card-text v-else-if="hasContent" class="course-description-text">
    <span class="course-condition-title">{{ compactTitle }}:</span>
    <CourseConditionList v-if="rule" :rule="rule" nested root />
    <span v-else>{{ fallbackText }}</span>
  </v-card-text>
</template>

<script>
export default {
  name: "CourseConditionList",
  props: {
    title: {
      type: String,
      default: ""
    },
    rule: {
      type: Object,
      default: null
    },
    fallback: {
      type: [Array, String],
      default: () => []
    },
    nested: {
      type: Boolean,
      default: false
    },
    root: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    children() {
      return this.rule && Array.isArray(this.rule.children)
        ? this.rule.children
        : [];
    },
    fallbackText() {
      return Array.isArray(this.fallback)
        ? this.fallback.join(", ")
        : this.fallback;
    },
    hasContent() {
      return Boolean(this.rule || this.fallbackText);
    },
    compactTitle() {
      return this.rule && this.rule.type === "all" && this.children.length > 1
        ? `${this.title} (all)`
        : this.title;
    },
    isLeaf() {
      return this.children.length === 0;
    },
    isRootAll() {
      return this.root && this.rule && this.rule.type === "all";
    },
    isCompactCourseGroup() {
      return (
        this.children.length > 0 &&
        ["all", "at_least", "none_of"].includes(this.rule.type) &&
        this.children.every(child => child.type === "course")
      );
    },
    compactGroupLabel() {
      if (this.root && ["all", "none_of"].includes(this.rule.type)) return "";
      if (this.rule.type === "all") return "All of: ";
      if (this.rule.type === "none_of") return "None of: ";

      const count = Number(this.rule.count) || 1;
      const quantity = count === 1 ? "One" : `At least ${count}`;
      const grade = (this.rule.source_text || "").match(
        /minimum grade(?: of)?\s+(\d+(?:\.\d+)?%)/i
      );
      return grade
        ? `${quantity} of (minimum grade ${grade[1]}): `
        : `${quantity} of: `;
    },
    courseListText() {
      const courses = this.children.map(child => child.course_code);
      if (courses.length < 2) return courses[0] || "";
      if (courses.length === 2) return courses.join(" or ");
      return `${courses.slice(0, -1).join(", ")}, or ${
        courses[courses.length - 1]
      }`;
    },
    leafText() {
      if (!this.rule) return "";
      return (
        this.rule.course_code || this.rule.source_text || "Other condition"
      );
    },
    isCollapsibleManual() {
      return (
        this.rule && this.rule.type === "manual" && this.leafText.length > 80
      );
    },
    manualSummary() {
      if (!this.leafText.startsWith("Enrolled in ")) {
        return "Additional eligibility requirement";
      }

      const programs = this.leafText
        .replace(/^Enrolled in /, "")
        .split(/\s*,\s*(?:or\s+)?|\s+or\s+/)
        .filter(Boolean);
      return programs.length > 1
        ? `Eligible programs (${programs.length})`
        : "Program eligibility";
    },
    operatorLabel() {
      if (!this.rule) return "";
      if (this.rule.type === "all") return "All of:";
      if (this.rule.type === "none_of") return "None of:";
      if (this.rule.type === "at_least") {
        const count = Number(this.rule.count) || 1;
        const quantity = count === 1 ? "One" : `At least ${count}`;
        const grade = (this.rule.source_text || "").match(
          /minimum grade(?: of)?\s+(\d+(?:\.\d+)?%)/i
        );
        return grade
          ? `${quantity} of (minimum grade ${grade[1]}):`
          : `${quantity} of:`;
      }
      return this.rule.source_text || "Conditions:";
    }
  }
};
</script>

<style scoped>
.course-description-text {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.course-condition-title,
.course-condition-operator {
  font-weight: 500;
}

.course-condition-title {
  margin-right: 4px;
}

.course-condition-node {
  display: inline;
}

.course-condition-node ul {
  margin: 2px 0 0;
  padding-left: 18px;
}

.course-condition-node li + li {
  margin-top: 1px;
}

.manual-condition {
  display: inline;
}

.manual-condition summary {
  cursor: pointer;
  display: inline;
  font-weight: 500;
}

.manual-condition summary::after {
  content: " ▸";
}

.manual-condition[open] summary::after {
  content: " ▾";
}

.manual-condition-detail {
  color: rgba(0, 0, 0, 0.68);
  margin: 2px 0 3px;
}
</style>
