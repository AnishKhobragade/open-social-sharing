var OpenSocialShareDefaultTheme = (function(){
	var theme = {};

    theme.cssFilePath = "";
	
    theme.renderInterface = function (providers,objectName) {
        var template = '';
        for (var i = 0; i < providers.length; i++) {
            template += "<input type='button' id='sample' onclick='"+objectName+".share(\"" + providers[i] + "\",this)' value='share on " + providers[i] + "'></input>"
        }
        return template;
    };
	
	theme.renderMoreWindow = function(providers){
		
	}
	
	theme.renderEvenWindow = function(providers){
		
	}
	
	return theme;
})();