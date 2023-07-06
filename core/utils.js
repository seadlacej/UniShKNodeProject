function convertUnixTimestamp(timestamp) {
    // Create a new Date object using the timestamp in milliseconds
    const dateObj = new Date(timestamp * 1000);
  
    // Extract the date and time components from the Date object
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
  
    // Format the components with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year.toString().substr(-2);
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
  
    // Create the formatted timestamp string
    const formattedTimestamp = `${formattedDay}.${formattedMonth}.${formattedYear} ${formattedHour}:${formattedMinute}`;
  
    return formattedTimestamp;
  }

  function getCurrentUnixTime() {
    const now = new Date();
    return Math.floor(now.getTime() / 1000);
  }

  module.exports = {
    convertUnixTimestamp,
    getCurrentUnixTime,
  }