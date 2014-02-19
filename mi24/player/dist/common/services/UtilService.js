(function() {
  define([], function() {
    return [
      function() {
        return {
          addStylesheetRules: function(rules) {
            var propImportant, propName, propStr, propVal, props, s, selector, styleEl, _results;
            styleEl = document.createElement("style");
            document.head.appendChild(styleEl);
            styleEl.appendChild(document.createTextNode(""));
            s = styleEl.sheet;
            _results = [];
            for (selector in rules) {
              props = rules[selector];
              propStr = "";
              for (propName in props) {
                propVal = props[propName];
                propImportant = "";
                if (propVal[1] === true) {
                  propVal = propVal[0];
                  propImportant = " !important";
                }
                propStr += propName + ":" + propVal + propImportant + ";\n";
              }
              _results.push(s.insertRule(selector + "{" + propStr + "}", s.cssRules.length));
            }
            return _results;
          }
        };
      }
    ];
  });

}).call(this);
