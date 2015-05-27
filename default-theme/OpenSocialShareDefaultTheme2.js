var OpenSocialShareDefaultTheme2 = (function(){
	var theme = {};

    theme.cssFilePath = "";
	
    theme.renderInterface = function (providers,objectName) {
        var template = '';
        for (var i = 0; i < providers.length; i++) {
            template += "<a href='#' data-provider='" + providers[i] + "' >share on " + providers[i] + "</a><br/>"
        }
        return template;
    };
	
	return theme;
})();