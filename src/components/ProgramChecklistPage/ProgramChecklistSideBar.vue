<template>
  <div class="program-checklist-sidebar">
    <p class="checklist-sidebar-title">Degree Requirements</p>
    <p class="checklist-sidebar-item">All Degree Requirements</p>
  </div>
</template>

<script>
export default {
  name: "ProgramChecklistSideBar"
};
</script>

<style scoped>
.checklist-sidebar-title {
  font-size: 18px;
  font-weight: 500;
}

.checklist-sidebar-item {
  font-size: 14px;
}

.program-checklist-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 5%;
}
</style>
