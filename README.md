HistoryClick
========

Minimalistic plugin for hash navigation.
Copyright (c) 2013 Artod - gartod@gmail.com

Demo
----------

http://artod.ru/jquery-history-click/demo/

How to use
----------

To get started, download the plugin, unzip it and copy files to your website/application directory.
Load files in the 'head' section of your HTML document.

    <head>		
        <script src="jquery.history-click.js"></script>
    </head>

Initialise the script like this:

    <script>
        $(document).ready(function() {
			window.historyClick.addRoute('#!page', function (params) {
				alert('#!page');
			});
			
			window.historyClick.start();
        });
    </script>
	
For getting additional parameters from the hash using regular expressions:

    <script>
        $(document).ready(function() {
			window.historyClick.addRoute('#!/search(?:/page:([0-9]+))?\\?s=(.*)', function(params) {
				var page = params[1] || 0,
					search = params[2];
					
				alert('page = ' + page + ' | search = ' + search);
			});
			
			window.historyClick.start();
        });
    </script>
	
Alice empty hash:

    <script>
        window.historyClick.rootAlias('#!home');
    </script>