if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (search) {
        var d = document, elements, pattern, i, results = [];
        if (d.querySelectorAll) { // IE8
            return d.querySelectorAll("." + search);
        }
        if (d.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = d.evaluate(pattern, d, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = d.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    }
}

function OpenSocialShare() {
    var util = this.util = {};

    this.global = window;
    var context = this;

    util.extend = function extend(a, b) {
        for (var key in b)
            if (b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }

    util.getMetaContent = function (propName, attributeName) {
        attributeName = attributeName || 'name';
        var metas = document.getElementsByTagName('meta');
        for (i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute(attributeName) == propName) {
                return metas[i].getAttribute("content");
            }
        }
        return "";
    }

    util.addJavascriptFile = function (url, context) {
        context = context || document;
        var head = context.getElementsByTagName('head')[0];
        var js = context.createElement('script');
        js.src = url;
        js.type = "text/javascript";
        head.appendChild(js);
        return js;
    }

    util.jsonpGet = function (url, handle) {
        var func = 'IAJSONP' + Math.floor((Math.random() * 1000000000000000000) + 1);
        window[func] = function (data) {
            handle(data);
            window[func] = function () { };
            document.head.removeChild(js);
        }
        var endurl = url.indexOf('?') != -1 ? url + '&callback=' + func : url + '?callback=' + func;
        var js = util.addJavascriptFile(endurl);
    }

    util.stringHtmlToDom = function (html) {
        if (html) {
            var d = document.createElement('div');
            d.innerHTML = html;
            return d.firstChild;
        }
    }

    util.serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    util.openWindow = function (_url, isSingleChildWindow) {
        _url = _url || this.href;
        var windowname = isSingleChildWindow ? "opensocialsharingpopupchildwindow" : "";
        var win = window.open(_url, windowname, 'menubar=1,resizable=1,width=530,height=530,scrollbars=yes');
        win.focus();
        return false;
    };

    util.getThisObjectName = function () {
        for (var name in context.global)
            if (context.global[name] == context)
                return name;
    }

    util.addEvent = function (type, element, handle) {
        var elements = [];
        if (element instanceof Array) {
            elements = element;
        } else {
            elements.push(element);
        }
        for (i = 0; i < elements.length; i++) {
            if (elements[i].attachEvent) {
                elements[i].attachEvent("on" + type, function () {
                    handle.call(elements[i]);
                });
            } else if (elements[i].addEventListener) {
                elements[i].addEventListener(type, handle, false);
            }
        }
    }

    util.getAllElementsWithAttribute = function (attribute, parent) {
        var matchingElements = [];
        parent = parent || document;
        var allElements = parent.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

    var themeCssElement;
    util.addThemeCss = function (cssFilePath) {
        var head = document.getElementsByTagName('head')[0];

        themeCssElement = document.createElement('link');
        themeCssElement.rel = 'stylesheet';
        themeCssElement.type = 'text/css';
        themeCssElement.href = cssFilePath;
        themeCssElement.media = 'all';
        head.appendChild(themeCssElement);
    }


    var _private = {};
    var moreTimeout;
    _private.setShareEvent = function (elem) {
        var providerNodes = util.getAllElementsWithAttribute('data-provider', elem);
        for (var j = 0; j < providerNodes.length; j++) {
            util.addEvent('click', providerNodes[j], function () {
                var providerName = event.target.getAttribute('data-provider');
                module.share(providerName, event.target);
            });
        }
    }

    _private.extractCustomAttributes = function (elem) {
        var tempElem = elem;

        while (true) {
            tempElem = tempElem.parentNode;
            if (tempElem == document.body) {
                break;
            }
            if (tempElem.getAttribute('data-share-url') != null ||
	            tempElem.getAttribute('data-share-title') != null ||
	            tempElem.getAttribute('data-share-description') != null ||
	            tempElem.getAttribute('data-share-imageurl') != null) {
                break;
            }
        }

        var result = {};
        if (tempElem.getAttribute('data-share-url') != null)
            result["url"] = tempElem.getAttribute('data-share-url');
        if (tempElem.getAttribute('data-share-title') != null)
            result["title"] = tempElem.getAttribute('data-share-title');
        if (tempElem.getAttribute('data-share-description') != null)
            result["description"] = tempElem.getAttribute('data-share-description');
        if (tempElem.getAttribute('data-share-imageurl') != null)
            result["imageUrl"] = tempElem.getAttribute('data-share-imageurl')

        return result;
    }



    var constants = {
        domain: 'share.loginradius.com'
    }

    var module = this;

    var options = {
        loginradiusApiKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        countQuery: 'web',
        emailMessage: 'Hey! It\'s great content to read.',
        emailSubject: 'A URL shared with you!',
        isEmailContentReadOnly: false,
        isGoogleAnalyticsEnabled: false,
        theme: 'OpenSocialShareDefaultTheme',
        isShortenUrl: true,
        providers: {
            all: ["Facebook", "Pinterest", "BarraPunto", "BlinkList", "blogmarks", "Connotea", "Current", "Delicious", "Digg", "Diigo", "Email", "Fark", "FriendFeed", "Google", "GooglePlus", "HackerNews", "Haohao", "HealthRanker", "Hemidemi", "Hyves", "LaTafanera", "LinkArena", "LinkaGoGo", "LinkedIn", "Linkter", "Meneame", "MisterWong", "Mixx", "muti", "MyShare", "MySpace", "Netvibes", "NewsVine", "Netvouz", "NuJIJ", "PDF", "Ratimarks", "Reddit", "Scoopeo", "Segnalo", "StumbleUpon", "ThisNext", "Tumblr", "Twitter", "Upnews", "Vkontakte", "Wykop", "Xerpi", "SheToldMe", "Diggita"],
            top: ["Facebook", "Twitter", "Pinterest", "Email", "Print"],
            more: ["Facebook", "GooglePlus", "LinkedIn", "Twitter", "Pinterest", "Email", "Google", "Digg", "Reddit", "Vkontakte", "Tumblr", "MySpace", "Delicious"]
        },
        providerSpecificShortUrl: [
			{ "pinterest": false },
			{ "digg": false }
        ],
        url: encodeURIComponent(window.location.href),
        title: encodeURIComponent(util.getMetaContent('og:title', 'property')) || encodeURIComponent(document.title),
        description: encodeURIComponent(util.getMetaContent('og:description', 'property')) || encodeURIComponent(util.getMetaContent("description")),
        imageUrl: '',
        facebookAppId: '1441207319494394',
        facebookCallbackUrl: 'http://share.loginradius.com/share/finish',
        isCustomCss: false,
        isTotalShare: true,
        isOpenSingleWindow: true,
        isTrackReferralsEnabled: true,

        getIsShortUrl: function (provider) {
            if (this.providerSpecificShortUrl.hasOwnProperty(provider)) {
                return this.providerSpecificShortUrl[provider]
            }

            return this.isShortenUrl;
        }
    };

    var theme = window[options.theme];

    var renderedHtml =
	module.init = function (inputOptions) {
	    options = util.extend(options, inputOptions);

	    theme = window[options.theme];

	    util.addThemeCss(theme.cssFilePath);

	    renderedHtml = theme.renderInterface(options.providers.top, util.getThisObjectName());
	}

    module.injectInterface = function (selector) {
        if (selector.indexOf('.') == 0) {
            var elems = document.getElementsByClassName(selector.replace('.', ''));
            if (elems && elems.length > 0) {
                for (var i = 0; i <= elems.length; i++) {
                    elems[i].innerHTML = renderedHtml;
                    _private.setShareEvent(elems[i]);
                }
            }
        } else if (selector.indexOf('#') == 0) {
            var elem = document.getElementById(selector.replace('#', ''));
            if (elem) {
                elem.innerHTML = renderedHtml;
                _private.setShareEvent(elem);
            }
        }
    }

    module.share = function (provider, elem) {
        if (provider.toLowerCase() == 'print') {
            window.print();
        } else {
            var url = "http://" + constants.domain + "/share/" + options.loginradiusApiKey + "?";

            var shareParameters = {
                "providerId": provider,
                "url": options.url,
                "countType": options.countQuery,
                "title": options.title,
                "description": options.description,
                "facebookAppId": options.facebookAppId,
                "redirectUri": options.facebookCallbackUrl,
                "t": document.title,
                "imageUrl": options.imageUrl,
                "emailMessage": options.emailMessage,
                "emailSubject": options.emailSubject,
                "isEmailContentReadOnly": options.isEmailContentReadOnly,
                "isFullUrl": !options.getIsShortUrl(),
                "trackingParameter": "lrstc"
            };

            var customShareParameters = _private.extractCustomAttributes(elem);
            util.extend(shareParameters, customShareParameters)

            util.openWindow(url + util.serialize(shareParameters))
        }
    }

    module.getCount = function (url, func) {
        util.jsonpGet('//' + constants.domain + '/apidata/' + options.loginradiusApiKey + '?url=' + url + '&counttype=' + options.countQuery, func);
    }

    return module;
};
