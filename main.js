const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

// Calculate the divider needed to convert milliseconds to days.
// It is outside the outputDate fucntion so it only calcs once. 
const dayDivider = (1000 * 60 * 60 * 24);

// Receive string of dates one after each other
function outputDate(dates) {

    // Format and sort dates in ascending order.
    // The sort doesn't change this test's results, but used it during debugging.
    const mDates = dates.map((d) => {
        return formatDates(d);
    }).sort((a, b) => a - b);

    // Not needed. Just in case the dates array magically changes :)
    if (mDates.length < 2)
        return 'Invalid dates';
    else {
        const date1 = mDates[0];
        const date2 = mDates[1];
        const diff = (date2 - date1);
        const daysDiff = diff / dayDivider;

        let yearsDiff = date2.getFullYear() - date1.getFullYear();
        let monthsDiff = date2.getMonth() - date1.getMonth();

        // Handle partial months - This part got me for a few minutes - nice question :)
        if (date2.getDate() - date1.getDate() < 0)
            monthsDiff -= 1;

        // Check months, if negative it falls in prior year etc. 
        // Could use (monthsDiff % 12) and truncate year etc, but this is tidier.
        if (monthsDiff < 0) {
            monthsDiff += 12;
            yearsDiff -= 1;
        }

        // This part could be nicer, but I used the time to write comments for some reason.       
        const yearText = `${yearsDiff > 0 ? (yearsDiff > 1 ? `${yearsDiff} years, ` : `${yearsDiff} year, `) : ''}`
        const monthText = `${monthsDiff > 0 ? (monthsDiff > 1 ? `${monthsDiff} months, ` : `${monthsDiff} month, `) : ''}`
        return `${yearText}${monthText}total ${daysDiff} days`;
    }
}

// Format the string elements to be parsed as dates.
formatDates = (str) => {
    const parts = str.split('.');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
}
