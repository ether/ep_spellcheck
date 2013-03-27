var postAceInit = function(hook, context){
  var spellcheck = {
    enable: function() {
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").attr("spellcheck","true");
    },
    disable: function() {
      $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").attr("spellcheck","false");
    }
  }
   /* init */
   if($('#options-spellcheck').is(':checked')) {
    spellcheck.enable();
   } else {
    spellcheck.disable();
  }
  /* on click */
  $('#options-spellcheck').on('click', function() {
   if($('#options-spellcheck').is(':checked')) {
      spellcheck.enable();
    } else {
      spellcheck.disable();
    }
  });
};
exports.postAceInit = postAceInit;
