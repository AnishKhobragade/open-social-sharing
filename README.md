##Introduction 
Open social sharing project is developed by LoginRadius to provide open platform for UI developer to make themes for their site and contribute for others.

Developers and UI engineers are invited to join this MISSION!

##Quick Installation

To add core file

    <script type="text/javascript" src="OpenSocialShare.js"></script>

Then add theme file(s)

    <script type="text/javascript" src="OpenSocialShareDefaultTheme.js"></script>


To add your container div(s)

    <div id="interface3" data-share-url="http://www.loginradius.com" data-share-title="This from custom"
             data-share-description="this description is custom" data-share-imageurl="http://3wcmm13zx3fn2h5mb93jvvkr.wpengine.netdna-cdn.com/wp-content/themes/theme-lr-master/images/logo-white.png"></div>



Then initialize OpenSocialShare and call interface methods

    <script type="text/javascript">
        var custom = new OpenSocialShare();
        custom.init({
            theme: 'OpenSocialShareDefaultTheme2'
        });
        custom.injectInterface("#interface3");
    </script>


###options

    var options = {
        loginradiusApiKey: '',
        countQuery: '',
        emailMessage: '',
        emailSubject: '',
        isEmailContentReadOnly: false,
        isGoogleAnalyticsEnabled: false,
        theme: 'OpenSocialShareDefaultTheme',
        isShortenUrl: true,
        providers: {
            all: ,
            top: ,
            more: 
        },
        providerSpecificShortUrl: [
			{ "pinterest": false },
			{ "digg": false }
        ],
        url: '',
        title: '',
        description: '',
        imageUrl: '',
        facebookAppId: '',
        facebookCallbackUrl: '',
        isCustomCss: false,
        isTotalShare: true,
        isOpenSingleWindow: true,
        isTrackReferralsEnabled: true
    };


##TO DO
1. Improve documentation to make this more usable.
2. Develop default theme.
2. Adding pinterest in core of open social sharing.
3. Pluggable architecture for creating plugins (through plugins core functionality will be enhanced, like pushing data to Google Analytics or After sharing showing thank you popup etc.)
4. Add prebuilt widgets in core, for now through theme is possible.
5. And many more, IDEAS from you are invited!


##Contribution guideline
1. For core and default themes, fork this repository and drop pull request to us. Make sure to follow coding standards (guideline will be released soon...)
2. For theme development, use core JS and make theme, commit to your own github repository and than drop a mail to us 'oss[at]loginradius[dot]com'. We will add you theme to our list.
	1. Theme should be followed theme development guideline (guideline will be released soon..)
	2. Require Running Demo page

