angular.module('pjcWordMultiSearch.search', [
   'ngRoute',
   'ngCookies',
   'ui.bootstrap',
])

.config(function ($routeProvider) {
   $routeProvider
   .when('/search', {
      controller: 'SearchPageController',
      templateUrl: 'app/search/search.html'
   });
})

.controller('SearchPageController', function ($scope, $sce, $cookies) {

    var getRhinoSpikeLink = function(lang, search) {
      var langCode = {'eng': '1', 'epo': '22', 'fra': '6', 'spa': '2'};
      var url = 'https://rhinospike.com/search/?language={lang}&q={search}'
        .replace('{search}', encodeURIComponent(search))
        .replace('{lang}', langCode[lang]);      
      return $sce.trustAsResourceUrl(url);
    };

    var getForvoLink = function(lang, search) {
      var langCode = {'eng': 'en', 'epo': 'eo', 'fra': 'fr', 'spa': 'es'};
      var url = 'http://www.forvo.com/search-{lang}/{search}/'
        .replace('{search}', encodeURIComponent(search))
        .replace('{lang}', langCode[lang]);
      return $sce.trustAsResourceUrl(url);
    };

    var getTatoebaLink = function(lang, search) {
      var url = 'http://tatoeba.org/eng/sentences/search?query={search}&from={lang}&to=und'.replace('{search}', encodeURIComponent(search));
      url=url.replace(/\{lang\}/g, lang);
      return $sce.trustAsResourceUrl(url);
    };

    var getLingueeLink = function(lang, search) {
      var langCode = {'fra': 'english-french', 'spa': 'english-spanish'};
      var url = 'http://www.linguee.com/{lang}/search?source=auto&query={search}'
        .replace('{search}', encodeURIComponent(search))
        .replace('{lang}', langCode[lang]);
      return $sce.trustAsResourceUrl(url);
    };

    var getGoogleImagesLink = function(lang, search) {
      var langCode = {'eng': 'com', 'fra': 'fr', 'spa': 'es'};
      var url = 'ba-simple-proxy.php?mode=native&send_cookies=0&url=https%3A%2F%2Fwww.google.{lang}%2Fsearch%3Fq%3D{search}%26tbm%3Disch%26sout%3D1%26biw%3D1266%26bih%3D1442%26dpr%3D1'
        .replace('{search}', encodeURIComponent(search))
        .replace('{lang}', langCode[lang]);
      return $sce.trustAsResourceUrl(url);
    };

    var getGoogleTranslateLink = function(lang, search) {
      var langCode = {'epo': 'eo', 'fra': 'fr', 'spa': 'es'};
      var url = 'ba-simple-proxy.php?mode=native&send_cookies=0&url=http%3A%2F%2Ftranslate.google.com%2F%3Fie%3DUTF-8%26sl%3D{lang}%26tl%3Den%26text%3D{search}'
        .replace('{search}', encodeURIComponent(search));
      return $sce.trustAsResourceUrl(url);
    };

    var getTranslationDictionaryLink = function(lang, search) {
      var url = '';
      switch(lang){
        case 'epo': url='http://lernu.net/cgi-bin/serchi.pl?delingvo=eo&allingvo=en&modelo=' + encodeURIComponent(search); break;
        case 'fra': url='http://www.wordreference.com/fren/' + encodeURIComponent(search); break;
        case 'spa': url='http://www.wordreference.com/es/en/translation.asp?spen=' + encodeURIComponent(search); break;
      }
      return $sce.trustAsResourceUrl(url);
    };

    var getMonoDictionaryLink = function(lang, search) {
      var url = '';
      switch(lang){
        case 'eng': url='http://www.wordreference.com/definition/' + encodeURIComponent(search); break;
        case 'epo': url='http://www.simplavortaro.org/?vorto=' + encodeURIComponent(search); break;
        case 'fra': url='http://dictionnaire.sensagent.com/{search}/fr-fr/'.replace('{search}', encodeURIComponent(search)); break;
        case 'spa': url='http://www.wordreference.com/definicion/' + encodeURIComponent(search); break;
      }
      return $sce.trustAsResourceUrl(url);
    };

    var isSupported = function(tab, lang){
      var langSupport = {
        'rhinospike': 'eng epo fra spa',
        'forvo': 'eng epo fra spa',
        'tatoeba': 'eng epo fra spa',
        'linguee': 'fra spa',
        'googleimages': 'eng fra spa',
        'googletranslate': 'epo fra spa',
        'transdict': 'epo fra spa',
        'monodict': 'eng epo fra spa'
      };
      return langSupport[tab].indexOf(lang) > -1;
    }

    var getTabs = function(lang, search) {
      var tabs = [];
      if (isSupported('rhinospike', lang)) tabs.push({ name: 'RhinoSpike', active: true, href:getRhinoSpikeLink(lang, search)});
      if (isSupported('forvo', lang)) tabs.push({ name: 'Forvo', href:getForvoLink(lang, search)});
      if (isSupported('tatoeba', lang)) tabs.push({ name: 'Tatoeba', href:getTatoebaLink(lang, search)});
      if (isSupported('linguee', lang)) tabs.push({ name: 'Linguee', href:getLingueeLink(lang, search)});
      if (isSupported('googleimages', lang)) tabs.push({ name: 'Google Images', href:getGoogleImagesLink(lang, search)});
      if (isSupported('googletranslate', lang)) tabs.push({ name: 'Google Translate', href:getGoogleTranslateLink(lang, search)});
      if (isSupported('transdict', lang)) tabs.push({ name: 'Translation Dictionary', href:getTranslationDictionaryLink(lang, search)});
      if (isSupported('monodict', lang)) tabs.push({ name: 'Monolingual Dictionary', href:getMonoDictionaryLink(lang, search)});
      return tabs;
    };

    $scope.search = function() {
        $scope.tabs = getTabs($scope.language, $scope.searchtext);
    };

    $scope.setLastLang = function() {
      $cookies.lastlang=$scope.language;
    };

    var lastlang='spa';
    if ($cookies.lastlang) lastlang=$cookies.lastlang;
    $scope.language=lastlang;
    $scope.searchtext='';

})
;