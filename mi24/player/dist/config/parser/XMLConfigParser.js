(function() {
  define(['xml2json'], function() {
    var XMLConfigParser;
    return [
      '$log', XMLConfigParser = (function() {
        function XMLConfigParser($log) {
          this.$log = $log;
          this.parser = new X2JS();
        }

        XMLConfigParser.prototype._getValueByType = function(element) {
          var exception;
          switch (element._type) {
            case 'bool':
              if (element.__text === 'true') {
                return true;
              } else {
                return false;
              }
              break;
            case 'string':
              if (element.__text != null) {
                return element.__text;
              } else {
                return element.__cdata;
              }
              break;
            case 'number':
              return parseInt(element.__text, 10);
            case 'x_y_w_h':
              return element.__text.split('/');
            default:
              exception = {
                name: "XMLTypeLoaderException",
                message: "Type \"" + element._type + "\" is not supported."
              };
              throw exception;
          }
        };

        XMLConfigParser.prototype._getBigPlayButton = function(json) {
          var object, pos, skinData, skinObject, _i, _len, _ref;
          object = {};
          skinData = json.magazine.skin;
          if (skinData.index.bigPlay.normal.__text == null) {
            object.customButton = false;
            _ref = skinData.index.toggleSkin.index;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              skinObject = _ref[_i];
              if (!(this._getValueByType(skinObject.name) === 'bigplay')) {
                continue;
              }
              pos = this._getValueByType(skinObject.pos);
              object.dimension = {
                height: parseInt(pos[3], 10),
                width: parseInt(pos[2], 10)
              };
              object.position = {
                x: parseInt(pos[0], 10),
                y: parseInt(pos[1], 10)
              };
            }
          } else {
            object.customButton = true;
            object.normal = {
              uri: skinData.index.bigPlay.normal.__text,
              height: parseInt(skinData.index.bigPlay.normal._height, 10),
              width: parseInt(skinData.index.bigPlay.normal._width, 10)
            };
            object.hover = {
              uri: skinData.index.bigPlay.hover.__text,
              height: parseInt(skinData.index.bigPlay.hover._height, 10),
              width: parseInt(skinData.index.bigPlay.hover._width, 10)
            };
          }
          return object;
        };

        XMLConfigParser.prototype.parsePlayerConfig = function(xml, config) {
          var json;
          json = this.parser.xml_str2json(xml);
          config.useHtmlFirst = this._getValueByType(json.magazine.config.useHtmlFirst);
          config.isResponsive = this._getValueByType(json.magazine.config.isResponsive);
          if (config.isResponsive) {
            config.height = 'auto';
            config.width = '100%';
          } else {
            config.height = this._getValueByType(json.magazine.config.height) + 'px';
            config.width = this._getValueByType(json.magazine.config.width) + 'px';
          }
          config.skinPng = this._getValueByType(json.magazine.skin.index.url);
          return config.bigPlayButton = this._getBigPlayButton(json);
        };

        XMLConfigParser.prototype.parseSourceConfig = function(xml, config) {
          var ad, adObject, json, quality, source, sourcesByQuality, videoSource, _i, _j, _len, _len1, _ref, _ref1, _results;
          json = this.parser.xml_str2json(xml);
          config.sources = {};
          config.thumbnail = this._getValueByType(json.magazine.article.movie.file.thumbnail_url);
          if (json.magazine.article.ads) {
            config.ads = [];
            if (Object.prototype.toString.call(json.magazine.article.ads.ad) === '[object Array]') {
              _ref = json.magazine.article.ads.ad;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ad = _ref[_i];
                adObject = {
                  type: ad._rollType,
                  uri: this._getValueByType(ad)
                };
                config.ads.push(adObject);
              }
            } else {
              adObject = {
                type: json.magazine.article.ads.ad._rollType,
                uri: this._getValueByType(json.magazine.article.ads.ad)
              };
              config.ads.push(adObject);
            }
          }
          _ref1 = json.magazine.article.movie.file.qualities.qual;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sourcesByQuality = _ref1[_j];
            if (!(sourcesByQuality.html_urls != null)) {
              continue;
            }
            quality = this._getValueByType(sourcesByQuality.id);
            config.sources[quality] = [];
            if (Object.prototype.toString.call(sourcesByQuality.html_urls.video_url) === '[object Array]') {
              _results.push((function() {
                var _k, _len2, _ref2, _results1;
                _ref2 = sourcesByQuality.html_urls.video_url;
                _results1 = [];
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                  videoSource = _ref2[_k];
                  source = {};
                  source.format = videoSource._format;
                  source.url = this._getValueByType(videoSource);
                  _results1.push(config.sources[quality].push(source));
                }
                return _results1;
              }).call(this));
            } else {
              source = {};
              source.format = sourcesByQuality.html_urls.video_url._format;
              source.url = this._getValueByType(sourcesByQuality.html_urls.video_url);
              _results.push(config.sources[quality].push(source));
            }
          }
          return _results;
        };

        return XMLConfigParser;

      })()
    ];
  });

}).call(this);
