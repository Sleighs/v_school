function sortArrayToMatch(a, b) {
  return b.sort((x, y) => {
    return a.indexOf(x.streamer_tag) - a.indexOf(y.streamer_tag);
  });
}

module.exports = { sortArrayToMatch };