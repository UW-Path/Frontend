function sentence(text) {
  const trimmed = (text || "").trim().replace(/[.]+$/, "");
  return trimmed ? `${trimmed}.` : "";
}

function courseCodes(text) {
  const codes = [];
  const pattern = /\b([A-Z]{2,8})\s*(\d{1,3}[A-Z]?)\b/g;
  let match = pattern.exec(text);
  while (match) {
    const code = `${match[1]} ${match[2]}`;
    if (!codes.includes(code)) codes.push(code);
    match = pattern.exec(text);
  }
  return codes;
}

function readableList(items) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

function compactCourseRequirement(detail) {
  const codes = courseCodes(detail);
  if (codes.length < 2 || !/following/i.test(detail)) {
    return sentence(detail);
  }

  const countMatch = detail.match(/(?:at least|complete)\s+(\d+)\s+of/i);
  const count = countMatch ? Number(countMatch[1]) : 1;
  const instruction = count === 1 ? "Complete one of" : `Complete ${count} of`;
  return `${instruction}: ${readableList(codes)}.`;
}

export function actionableValidationMessage(message) {
  if (!message) return "Review this course's placement.";

  if (message.startsWith("Prerequisite not met:")) {
    const detail = message.replace("Prerequisite not met:", "").trim();
    return `${compactCourseRequirement(
      detail
    )} Add or move a qualifying course to an earlier term.`;
  }
  if (message.startsWith("Corequisite not met:")) {
    const detail = message.replace("Corequisite not met:", "").trim();
    return `${compactCourseRequirement(
      detail
    )} Add a qualifying course to this or an earlier term.`;
  }
  if (message.startsWith("The course has an antirequisite:")) {
    const detail = message
      .replace("The course has an antirequisite:", "")
      .trim();
    return `Conflicts with ${sentence(
      detail
    )} Remove the conflicting course, or override only for an approved exception.`;
  }
  if (message === "Course has already been taken.") {
    return "This course is already in an earlier term. Remove the duplicate course.";
  }

  return sentence(message);
}

export function manualReviewMessage(advisories = []) {
  const text = advisories.join(" ");
  if (/Students must be in level/i.test(text)) {
    return "Confirm that your academic level meets this course's catalog requirement.";
  }
  if (/Enrolled in /i.test(text)) {
    return "Confirm that your selected program is eligible for this course.";
  }
  if (/permission|consent/i.test(text)) {
    return "Confirm that you have the required permission or consent.";
  }
  return "UWPath can't automatically verify this requirement. Check the course details against the official calendar.";
}
