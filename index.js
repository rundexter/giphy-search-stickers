var assert = require('assert');

module.exports = {
  run: function (step, dexter) {
    //access token
    var accessToken = dexter.environment('access_token');
    var giphy = require('giphy-api')(accessToken);

    //inputs
    var q = step.input('q').first();
    var limit = step.input('limit').first();
    var offset = step.input('offset').first();
    var rating = step.input('rating').first();
    var fmt = step.input('fmt').first();

    //validation
    assert(q, 'Search query term or phrase is required.');

    //post options
    var postOptions = {
      api: 'stickers',
      q: q,
      limit: limit,
      offset: offset,
      rating: rating,
      fmt: fmt
    };

    //execution
    giphy.search(postOptions, function (err, res) {
      var finalResponse = {
        data: {}
      };

      if (fmt === 'html') {
        finalResponse.data.html = res;
      } else {
        finalResponse = res;
      }

      if (err) return this.fail(err);
      this.complete(finalResponse);
    }.bind(this));
  }
};
