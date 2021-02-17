/**
 * This function return the difference value in minutes between two date
 * @param {Date} dt2 Given date
 * @param {Date} dt1 Given date
 * @returns Difference in minutes
 */
function minutesDifferent(dt2, dt1) {
   let diff = (dt2.getTime() - dt1.getTime()) / 1000;
   diff /= 60;
   return Math.abs(Math.round(diff));
}

module.exports = {
   minutesDifferent:minutesDifferent
};