var padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;

var postAceInit = function(hook, context){
  var spellcheck = {
    enable: function() {
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").attr("spellcheck","true");
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").find('div').each(function(){
        $(this).attr("spellcheck","true");
        $(this).find('span').each(function(){
          $(this).attr("spellcheck","true");
        });
      });
    },
    disable: function() {
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").attr("spellcheck","false");
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").find('div').each(function(){
        $(this).attr("spellcheck","false");
        $(this).find('span').each(function(){
          $(this).attr("spellcheck","false");
        });
      });
    }
  }
   /* init */
  if (padcookie.getPref("spellcheck") === false) {
    $('#options-spellcheck').val();
    $('#options-spellcheck').attr('checked','unchecked');
    $('#options-spellcheck').attr('checked',false);
  }else{
    $('#options-spellcheck').attr('checked','checked');
  }

  if($('#options-spellcheck').is(':checked')) {
    spellcheck.enable();
  } else {
    spellcheck.disable();
  }

  /* on click */
  $('#options-spellcheck').on('click', function() {
   if($('#options-spellcheck').is(':checked')) {
      padcookie.setPref("spellcheck", true)
      spellcheck.enable();
      if(browser.chrome) window.location.reload();
    } else {
      padcookie.setPref("spellcheck", false)
      spellcheck.disable();
      if(browser.chrome) window.location.reload();
    }
  });
};
exports.postAceInit = postAceInit;
