/*
* HistoryClick
* 26.03.2013 (c) http://artod.ru
*/
;(function(window) {
	var _rootAlias = '',
		_needReload = false,
		_routes = [],
		_revRoutes = [];

	function init() {
		if (!historyClick.interval) {
			historyClick.interval = setInterval(urlHashCheck, 100);
		}
	}

	function urlHashCheck() {
		var mayChangeReload = false;
		
		if (_needReload) {
			mayChangeReload = true;
		}

		if (window.location.hash !== historyClick.currentHash || _needReload) {
			historyClick.prevHash = ( _needReload ? historyClick.prevHash : historyClick.currentHash );
			historyClick.currentHash = window.location.hash.toString();

			go(historyClick.currentHash && historyClick.currentHash != '#' ? historyClick.currentHash : _rootAlias);

			if (mayChangeReload) {
				_needReload = false;
			}
		}
	}
	
	function go(hash) {
		if (!hash) {
			return;
		}
		
		var pattern,
			callback;

		for (var i = 0, len = _revRoutes.length; i < len; i++) {
			pattern = _revRoutes[i][0];
			callback = _revRoutes[i][1];
			
			if (pattern.test(hash) && typeof callback === 'function') {
				callback(hash.match(pattern));
				
				return;
			}
		}
	}

	var historyClick = {
		interval: null,
		currentHash: '',
		prevHash: '',
		start: function() {
			init();
		},
		rootAlias: function(hash) {
			if (hash) {
				_rootAlias = hash;
			} else {
				return _rootAlias;
			}
		},
		addRoute: function(pattern, callback) {
			if (typeof pattern === 'string') {
				pattern = [pattern];
			}
			
			for (var i = 0; i < pattern.length; i++) {
				_routes.push([new RegExp(pattern[i], 'i'), callback]);
			}

			_revRoutes = _routes.slice().reverse(); // clone and reverse
		},
		reload: function() {
			_needReload = true;
		},
		changeHashSilent: function(hash) {
			historyClick.prevHash = historyClick.currentHash;
			historyClick.currentHash = window.location.hash = hash;
		}
	};
	
	window.historyClick = historyClick;
	
})(window);