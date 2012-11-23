/**
 * User: biophonc
 * Date: 22.11.12
 */
;(function ( $, window, document, undefined ) {

	$.widget( "ctrl.prllx" , {

		/**
		 * default options
		 */
		options: {
			factor: 0.3,
			object: false,
			callback: false
		},

		/**
		 * @constructor
		 * @override $.widget._create
		 */
		_create: function () {

			// get factor from data attribute
			if(!isNaN (this.element.attr("data-factor")-0)) {
				this.options.factor = this.element.attr("data-factor");
			}

			/*
			if(typeof this.element.attr("data-callback") !== "undefined") {
				this.options.callback = this.element.attr("data-callback");
			}
			*/

			if(!this.options.object) {

				var bgPos = this.element.css("backgroundPosition");
				if(typeof bgPos == "undefined") {
					// IE returns a pixel value instead of percents,...
					bgPos = this.element.css("backgroundPositionX");
					bgPos = this.element.width() / bgPos.substring(0, bgPos.length-2);
				} else {
					bgPos = bgPos.split(" ")[0];
				}
				this.element.data("backgroundPositionX", bgPos);

			}

			$(window).on('scroll', $.proxy(this.scroll, this));
		},

		/**
		 *
		 */
		scroll: function() {

			var windowScrollTop 	= $(window).scrollTop();
			var windowScrollBottom 	= windowScrollTop + $(window).height();
			var elementTop 			= this.element.offset().top;
			var elementBottom 		= elementTop + this.element.height();


			if((windowScrollBottom > elementTop) && (windowScrollTop < elementBottom)) {
				this.element.data("inview", true);

				// calculate position
				var cssScrollTop = Math.round(elementTop - windowScrollTop) * this.options.factor;

				if(this.options.object) {
					this.element.css("top", cssScrollTop);
				} else {
					this.element.css("backgroundPosition", this.element.data("backgroundPositionX") + " " + cssScrollTop + "px");
				}

			} else {
				// this.element.data("inview", false);
				// this.element.data("callbackDone", false);
			}

			// pass callback function via data-callback attribute
			/*
			if(this.element.data("inview") && !this.element.data("callbackDone")) {
				if(this.options.callback) {
					window[this.options.callback]();
					this.element.data("callbackDone", true);
				}
			}
			*/
		},

		/**
		 *
		 * @private
		 */
		_destroy: function () {
			$(window).off('scroll', $.proxy(this.scroll, this));
		},


		/**
		 *
		 * @param key
		 * @param value
		 * @private
		 */
		_setOption: function ( key, value ) {
			this._super( "_setOption", key, value );
		}
	});

})( jQuery, window, document );