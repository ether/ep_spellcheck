var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_mySettings = function (hook_name, args, cb) {
  checked_state = 'checked';
  if (settings.ep_spellcheck){
    if (settings.ep_spellcheck.disabledByDefault == true){ 
      checked_state = '';
    }
  }
  args.content = args.content + eejs.require('ep_spellcheck/templates/spellcheck_entry.ejs', {checked : checked_state});
  return cb();
}

exports.eejsBlock_dd_view = function (hook_name, args, cb){
  args.content = args.content + "<li><a href='#' onClick='$(\"#options-spellcheck\").click();'>Spell Check</a></li>";
}

