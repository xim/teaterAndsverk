var canHistory = window.history && window.history.pushState;

function page_loaded() {
  // Blog slides
  $('.nivoSlider').each(function() {
    $(this).nivoSlider({
      directionNav: true,
      controlNav: false,
      effect: 'fade',
      pauseTime: 4000,
      slices: 1
    });
  });

  // Portfolio tag stuff
  var container = $('.portfolio_block');
  container.isotope({itemSelector: '.element'});
  var optionSets = $('#options .optionset');
  var optionLinks = optionSets.find('a');

  // Gallery stuff below
  optionLinks.click(function(){
    var me = $(this);
    // don't proceed if already selected
    if (me.parent('li').hasClass('selected'))
      return false;

    var optionSet = me.parents('.optionset');
    optionSet.find('.selected').removeClass('selected');
    optionSet.find('.fltr_before').removeClass('fltr_before');
    optionSet.find('.fltr_after').removeClass('fltr_after');
    me.parent('li').addClass('selected');
    me.parent('li').next('li').addClass('fltr_after');
    me.parent('li').prev('li').addClass('fltr_before');

    // make option object dynamically, i.e. { filter: '.my-filter-class' }
    var options = {};
    var key = optionSet.attr('data-option-key');
    var value = me.attr('data-option-value');
    // parse 'false' as false boolean
    value = value === 'false' ? false : value;
    options[key] = value;
    if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
      // changes in layout modes need extra logic
      changeLayoutMode(me, options);
    } else {
      // otherwise, apply new options
      container.isotope(options);
    }
    return false;
  });
  container.find('img').load(function(){
    container.isotope('reLayout');
  });

  $('.portfolio_title').each(function(){
    $(this).css('margin-top', -1*$(this).height()/2+'px');
  });
}

function render_page(data) {
  $(".content_wrapper").html(data).ready(page_loaded);
  $('.main_wrapper').animate({'opacity' : 1}, 500);
}

function update_nav(pathname) {
  $('nav li, .mobile_menu_wrapper li').removeClass('current-menu-item');
  $('nav li, .mobile_menu_wrapper li').filter(function(id, el) { return el.firstElementChild.pathname == pathname; })
      .addClass('current-menu-item');
}

function ajax_load(pathname, keep) {
  var base = "/fragment";
  if (! pathname.match("^/posts/"))
    base += "/page";
  $('.main_wrapper').css({'opacity' : 0.1});
  $.get(base + pathname, function(data) {
    if (pathname.indexOf('english') != -1)
      $('html').attr('lang', 'en');
    else
      $('html').attr('lang', 'no');
    render_page(data);
    if (keep)
        window.history.pushState(data, document.title, pathname);
  }, "html")
  .fail(function() {
    window.location = pathname;
  });
  update_nav(pathname);
}

function user_pop(evt) {
  try { $.swipebox.close(); } catch(err) {}
  if (evt && evt.state) {
    update_nav(location.pathname);
    $('.main_wrapper').css({'opacity' : 0});
    render_page(evt.state);
  } else {
    ajax_load(location.pathname, false);
  }
}

if (canHistory)
  window.onpopstate = user_pop;

$('body').on('click', 'a:not(.no_ajax)', function() {
  if (!canHistory)
    return true;

  if (this.hostname != location.hostname)
    return true;

  if (!this.protocol.match('^http'))
    return true;

  if ($(this).attr('href').match('^#'))
    return false;

  ajax_load(this.pathname, true);
  return false;
});

$("body").on('submit', '#ajax-contact-form', function() {
  var is_success = true;
  $('#ajax-contact-form input, #ajax-contact-form textarea').each(function() {
    if (!this.value) {
      var input = $(this);
      input.animate({'background-color': '#c93119'}, 500);
      setTimeout(function() {input.animate({'background-color': '#fff'}, 500);}, 500);
      is_success = false;
    }
  });
  if (!is_success) {
    $('#note').html('<div class="notification_error">Vennligst fyll inn alle feltene.</div>');
    return false;
  }
  var data = $(this).serialize();
  var target = $(this).attr('action');
  $('#note').html('<div class="notification_ok">Sender...</div>');
  $.post(target, data, function(ret) {
    if (ret.state == 'ok')
      $("#fields").hide();
    $('#note').html('<div class="notification_' + ret.state + '">' + ret.text + '</div>');
  }, 'json')
  .fail(function() {
    $('#note').html('<div class="notification_error">En ukjent feil oppsto. Dette kan skyldes feil hos meg, eller at du ikke er tilkoblet Internett.</div>');
  });
  return false;
});

$('body').on('click', '.blogpost_share a', function() {
  window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=260,width=600');
  return false;
});

$('body').on('click', '.isotope-item .swipebox', function() {
  var slides = [];
  var index, counter = 0;
  var a = this;
  $('.isotope-item:not(.isotope-hidden) .swipebox')
    .each(function() {
        slides.push({href: $(this).attr('href'), title: $('img', this).attr('alt')});
        if (this == a)
            index = counter;
        counter += 1;
    });
  $.swipebox(slides, {
      hideBarsDelay : 0,
      initialIndexOnArray: index,
      removeBarsOnMobile: false
  });
  return false;
});

page_loaded();
