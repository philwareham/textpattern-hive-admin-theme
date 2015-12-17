// Fix for Autoprefixer `@supports` `flex` bug.
var postcss = require('postcss');

module.exports = postcss.plugin('flexbox-cleaner', function () {
    return function (css) {
        css.walkAtRules('supports', function (rule) {
            rule.params = rule.params.replace('((display: -webkit-flex) or (display: -ms-flexbox) or (display: flex))', '(display: flex)');
        });
    };
});
