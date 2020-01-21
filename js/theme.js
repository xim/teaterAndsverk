/* Custom Scripts */

jQuery(document).ready(function() {
	"use strict";			
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});

	//Iframe transparent
	jQuery("iframe").each(function(){
		var ifr_source = jQuery(this).attr('src');
		if (ifr_source === undefined) return;
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		jQuery(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else jQuery(this).attr('src',ifr_source+'?'+wmode);
	});
	
	//mailchimp
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-50);
	});	
	
	// Accordion, Toggle
	jQuery('.shortcode_accordion_item_title').click(function(){
		if (!jQuery(this).hasClass('state-active')) {
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp('fast');
			jQuery(this).next().slideToggle('fast');
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
			jQuery(this).addClass('state-active');
		}
	});
	jQuery('.shortcode_toggles_item_title').click(function(){
		jQuery(this).next().slideToggle('fast');
		jQuery(this).toggleClass('state-active');
	});
	
	jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function( index ) {
		jQuery(this).next().slideDown('fast');
		jQuery(this).addClass('state-active');
	});
	
	
	// tabs
	jQuery('.shortcode_tabs').each(function(index) {
		/* GET ALL HEADERS */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_title').each(function(index) {
			jQuery(this).addClass('it'+i); jQuery(this).attr('whatopen', 'body'+i);
			jQuery(this).addClass('head'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
			i++;
		});

		/* GET ALL BODY */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_body').each(function(index) {
			jQuery(this).addClass('body'+i);
			jQuery(this).addClass('it'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
			i++;
		});

		/* OPEN ON START */
		jQuery(this).find('.expand_yes').addClass('active');
		var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
		jQuery(this).find('.'+whatopenOnStart).addClass('active');
	});

	jQuery(document).on('click', '.shortcode_tab_item_title', function(){
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
		var whatopen = jQuery(this).attr('whatopen');
		jQuery(this).parents('.shortcode_tabs').find('.'+whatopen).addClass('active');
		jQuery(this).addClass('active');
	});
					
	
	// Skills.
	jQuery(".chart").each(function(){
		jQuery(this).css({"font-size" : "15px"});
		jQuery(this).find("span").css("font-size" , jQuery(this).parents(".skills_list").attr("data-fontsize"));
		jQuery(this).parent(".skill_item").css({"padding-left" : "84px"});
	});
	if (jQuery(window).width() > 760) {
		jQuery(".skill_li").waypoint(function(){
			jQuery(".chart").each(function(){
				jQuery(this).easyPieChart({
					barColor: '#2898ac',
					trackColor: '#e9ebec',
					scaleColor: false,
					lineCap: "square",
					lineWidth: 3,
					size: 69,
					animate: 1500
				});
			});
		},{offset: "bottom-in-view"});
	} else {
		jQuery(".chart").each(function(){
			jQuery(this).easyPieChart({
				barColor: '#2898ac',
				trackColor: '#e9ebec',
				scaleColor: false,
				lineCap: "square",
				lineWidth: 3,
				size: 69,
				animate: 1500
			});
		});
	};
	
	/* Shortcode_messagebox close*/
	jQuery('.shortcode_messagebox').find('.box_close').click(function(){
		jQuery(this).parents('.module_messageboxes').fadeOut(400);
	});	
	
	jQuery('.shortcode_button').each(function() {
		$(this).find('i').parent().addClass('icon_btn');
	});	
	
	jQuery('.send_btn').each(function() {
		$(this).parent().addClass('send_btn_parent');
	});
	jQuery('.mc_submit').each(function() {
		$(this).parent().addClass('send_btn_parent');
	});		
	
	jQuery('#comments ul li:last, #comments ol li:last').each(function(){
        $(this).addClass("last");
    });
	
	if (jQuery(window).width() > 760) {
		jQuery('.shortcode_counter').waypoint(function(){							
			var set_count = $(this).find('.stat_count').attr('data-count');
			$(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
					var data = Math.floor(now);
					$(this).parents('.counter_wrapper').find('.stat_count').html(data);
				}
			});
			$(this).find('.stat_count');
		},{offset: 'bottom-in-view'});
	} else {
		jQuery('.shortcode_counter').each(function(){							
			var set_count = $(this).find('.stat_count').attr('data-count');
			$(this).find('.stat_temp').animate({width: set_count}, {duration: 3000, step: function(now) {
					var data = Math.floor(now);
					$(this).parents('.counter_wrapper').find('.stat_count').html(data);
				}
			});
			$(this).find('.stat_count');
		},{offset: 'bottom-in-view'});	
	}
			
	
	//MobileMenu
	var header = jQuery('.header_wrapper');
	if (jQuery(window).width() > 760) {
		content_update();
	}
	if (jQuery('.flickr_widget_wrapper').size() > 0) {
		jQuery('.flickr_badge_image a').each(function(){
			jQuery(this).append('<div class="flickr_fadder"></div>');
		});
	}
    header.append('<a href="javascript:void(0)" class="menu_toggler"></a>');
    header.append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');
    jQuery('.mobile_menu').html(header.find('.menu').html());
    jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function () {
        jQuery('.mobile_menu_wrapper').slideToggle(300);
        jQuery('.main_header').toggleClass('opened');
    });	
	
	setTimeout("jQuery('body').animate({'opacity' : '1'}, 500)",500);
	
	jQuery('.socials_list a').hover(function(){
		jQuery(this).stop().animate({'opacity' : '0.5'}, 250);
	},function(){
		jQuery(this).stop().animate({'opacity' : '1'}, 250);
	});
});

jQuery(window).resize(function () {
	"use strict";
	if (jQuery(window).width() > 760) {
		content_update();
	}
	
	jQuery('.portfolio_block').isotope('reLayout');
});

// masonry
jQuery(window).load(function () {
	"use strict";
	jQuery('.is_masonry').masonry();
	setTimeout("jQuery('.is_masonry').masonry();",1000);
});
jQuery(window).resize(function () {
	"use strict";
	jQuery('.is_masonry').masonry();
});
jQuery(document).ready(function($){
	"use strict";
	jQuery('.is_masonry').masonry();
});
//

function content_update() {
	"use strict";
	var content_bg = jQuery('.content_bg'),
		site_wrapper = jQuery('.site_wrapper'),
		window_h = jQuery(window).height(),
		window_w = jQuery(window).width(),
		header = jQuery('.main_header'),
		set_bg_width = window_w - (window_w - site_wrapper.width())/2 - header.width();

	content_bg.css('width', set_bg_width+'px');
	header.css('left', Math.floor(site_wrapper.offset().left)+'px');	
}
