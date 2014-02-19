(function() {
  define(['swfobject'], function() {
    return [
      '$compile', function($compile) {
        return {
          replace: true,
          restrict: 'EA',
          link: function(scope, element) {
            var height;
            element.append($compile('<div id="{{$id}}" class="mi24-content"></div>')(scope));
            height = scope.config.height;
            if (scope.config.width === '100%' && height === 'auto') {
              height = '100%';
            }
            element.addClass('mi24-player');
            element.css('height', height);
            element.css('width', scope.config.width);
            return element.ready(function() {
              return swfobject.embedSWF("Flash/mi24Player.swf", scope.$id, scope.config.width, height, "11.1.0", "bower_components/swfobject/swfobject/expressInstall.swf", {
                config_url: "http%3A%2F%2Fdl.edge-cdn.net%2Fvideoxmls%2Fx%2F1%2Fcc%2Fb2%2F%2F0%2FskinXML%2F368.333.592.0.0" + "%2F0%2Fc65a846ae4e5ee1de15ed12e913f0dabdZLBcoMgEIbfhXszEBANOeWS18ggEMtUwQI27XR896KiZSaRE_zfwr-7LGeY_XpWMeA" + "_tJE8cHDmjE4aZUB3zc1YcNaM0POsfHftCyX4SUG4JEVFTyWJhDDQctOAuD0yIBVYooVtrfOTB5pNiigFUaX%2FXOE7_OaDgkcE4CQIFpm" + "AO8BksClvODqmoEigeu8MkD3QJmArCQRpw3wLV0kUI3qDKzpYoUllhnAe4C8Nud76fIX6cYG181T2VG9N099xQz0WzCElE5PjPMECGuCs-" + "3yO-tY1MHcfLD9_MHxFoKL9mXbX%2FXoVOrmgI_B95mknjnfVDOZ5If6qBDu12MNfnAXZjOcBmbTplhxTHHzAjCRZqs7j6L8a2WymVvBt3" + "9n6OtHBwP2ppVil0Qfb2YjuNSlVO99TpY95P6VKBT2nkz9y6OLHg8HgclG_UmpDkYFRMf_wA%252C.xml,http%3A%2F%2Fdl.edge-cdn" + ".net%2Fvideoxmls%2Fx%2F0%2F48%2F91%2F611056%2FvideoSrcXML%2F368.333.592.37.1390558664%2F4_9e83ead0a25b4d81" + "01228d5e2488842d%2F61ff9ab39d18071f503a4ed92732af90XVHBcoMgEP0X7s0ICEa89dxzrw4CKlOVVIm2k8m_dxdjm-kBZvfxdvf" + "tQyupbosSiphVzwuptOIIUEC0fb3GGKZ3v_hmcKRaVK5InK8ppFwR65fLoL9757s-ksorzjk8lVD7oUft30KHVAnNVm9rSWX%2FXkmZH39" + "DU-COcYNY2UrRSFPjPMs44Woge3CDDxBy9rEmjJKqnvSGQ6ddBfKFEENbrZu8d2EKnKJQ3GBJk4UEfoEiP-APADYaFtHzBhk0PjTpna4LT" + "3GbN7GHmFRIutv_pML8lwlrfAwJQeAZJNrYE07X%2FXrHsB5uejeuUPf4fQBWxyFhkVO2N2l3Axo00MEDIfTvLcFI0zunRNI7nURWs0z21" + "mRGkoK9NEWKpuTZJVoIWQL1ObfhAM2Lbt5GznXoydTpOLZBf-NQ5TSBxFkjCaHULHsG8icBO99BgX0DPOtTYDfkX%2FXyubuAnrY6LH1fx" + "OAmt7vcf.xml"
              }, {
                allowscriptaccess: "always",
                swliveconnect: "true"
              }, {
                styleclass: "mi24-content",
                id: scope.$id
              });
            });
          }
        };
      }
    ];
  });

}).call(this);
