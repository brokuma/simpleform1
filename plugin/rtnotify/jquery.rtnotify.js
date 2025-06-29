/*!
 * rtnotify - Notification Plugin for jQuery
 * Version 1.0.1
 * @requires jQuery v1.7.2
 *
 * Copyright (c) 2013 Rajender Thakur
 * Documentation: http://www.github.com/rthakur
 * Email : rthakur.dev@gmail.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {
  $.fn.rtnotify = function(options) {

    var defaults = {
      title: "",
      message: "",
      type: "default",
      permanent: false,
      timeout: 2,
      fade: true,
      width: 300
    };

    var options = $.extend(defaults, options);
    var note_area = $("#rtnotify-notification");

    // Construct the new notification.
    var note = $(window.document.createElement('div'))
                .addClass("rtnotify")
                .addClass("rtnotify-" + options['type']);

    note.css({width: options['width']});


    // Deal with adding the close feature or not.
    if (!options['permanent']) {
      note.prepend($(window.document.createElement('a'))
                    .addClass("rtnotify-close")
                    .attr("href", "#_")
                    .html("&times;"));
    }

    // Deal with adding the title if given.
    if (options['title'] !== "") {
      note.append($(window.document.createElement('div'))
                   .addClass("rtnotify-title")
                   .append(options['title']));
    }

    // Append the message (this can also be HTML or even an object!).
    note.append(options['message']);

    // Add the notification to the notification area.
    note_area.append(note);

    // Deal with non-permanent note.
    if (!options['permanent']) {
      if (options['timeout'] != 0) {
        if (options['fade']) {
          note.delay(options['timeout'] * 1000).fadeOut('slow');
          note.queue(function() { $(this).remove(); });
        } else {
          note.delay(options['timeout'] * 1000)
              .queue(function() { $(this).remove(); });
        }
      }
    }
  };
  $.rtnotify = $.fn.rtnotify; // Rename for easier calling.
})(jQuery);

jQuery(document).ready(function() {
  // Deal with adding the notification area to the page.
  if (jQuery("#rtnotify-notification").length == 0) {
    var note_area = jQuery(window.document.createElement('div'))
                     .attr("id", "rtnotify-notification");
    jQuery('body').append(note_area);
  }
});

// Deal with close event on a note.
jQuery(document).on("click", ".rtnotify-close", function () {
  jQuery(this).parent().remove();
  return false;
});
