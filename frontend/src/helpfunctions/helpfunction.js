// const { join } = require("node:path/win32");

 export function calculatebirthday(DOB1) {
  
    const year_birth = DOB1.split("-")[0];
    const year_m = DOB1.split("-")[1];
    const year_month = year_m.split("0")[1];

    const day = DOB1.split("-")[2];

    const day_m = day.split(":")[0];
    const day_b = day_m.split("T")[0];
    const day_t = day_b.split("0")[1];

    var dob1 = [year_birth, year_month, day_t];

    var D_O_B = dob1.join("/");

    var start_date = new Date(D_O_B);
    var end_date = new Date();
    //year//month //day

    var diff = Math.floor(end_date.getTime() - start_date.getTime());
    var lengthOfDayInSeconds = 1000 * 60 * 60 * 24,
        lengthOfMonthInSeconds = lengthOfDayInSeconds * 31,
        lengthOfYearInSeconds = lengthOfDayInSeconds * 365;

    var yearsBetween = Math.floor(diff / lengthOfYearInSeconds);
    diff -= yearsBetween * lengthOfYearInSeconds;

    var monthsBetween = Math.floor(diff / lengthOfMonthInSeconds);
    diff -= monthsBetween * lengthOfMonthInSeconds;

    var daysBetween = Math.floor(diff / lengthOfDayInSeconds);

    // console.log(yearsBetween + ' years ' + monthsBetween + ' months ' + daysBetween + ' days')
    console.log(yearsBetween + " console of birth years ");
    return yearsBetween
}

export function Get_year(DOB1) {
        const year_birth = DOB1.split("-")[0];
        const year_m = DOB1.split("-")[1];
        const year_month = year_m.split("0")[1];

        const day = DOB1.split("-")[2];

        const day_m = day.split(":")[0];
        const day_b = day_m.split("T")[0];
        const day_t = day_b.split("0")[1];

        var dob1 = [year_birth, year_month, day_t];
        var D_O_B = dob1.join("/");
        return D_O_B
        console.log(D_O_B)
      }

