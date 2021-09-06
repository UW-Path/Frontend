export function getLinkToUnderGradCalender(link) {
  let additionalParams = "";
  // year has format "20xx-20xx"
  if (this.getYear)
    additionalParams = "?ActiveDate=9/1/" + this.getYear.substring(0, 4);

  return link + additionalParams; //home page if somehow years didn't work
}
