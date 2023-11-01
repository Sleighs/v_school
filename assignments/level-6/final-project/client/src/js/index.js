function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatNumber(num) {
  // Convert the number to a string
  let numString = num.toString();

  // Split the string into an array of characters
  let numArray = numString.split('');

  // Reverse the array of characters
  numArray.reverse();

  // Add commas every three characters
  for (let i = 3; i < numArray.length; i += 4) {
    numArray.splice(i, 0, ',');
  }

  // Reverse the array of characters again and join them into a string
  let formattedNum = numArray.reverse().join('');

  // Return the formatted string
  return formattedNum;
}

module.exports = { capitalizeFirstLetter, formatNumber }