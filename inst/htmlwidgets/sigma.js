HTMLWidgets.widget({

  name: "sigma",
  
  type: "output",
  
  initialize: function(el, width, height) {
   
    // create our sigma object and bind it to the element
    var sig = new sigma(el.id);
    
    // return it as part of our instance data
    return {
      sig: sig
    };
  },
  
  renderValue: function(el, x, instance) {
      
    // parse gexf data
    var parser = new DOMParser();
    var data = parser.parseFromString(x.data, "application/xml");
    
    // apply settings
    for (var name in x.settings)
      instance.sig.settings(name, x.settings[name]);
    
    // update the sigma instance
    sigma.parsers.gexf(
      data,
      instance.sig,
      function() {
        instance.sig.refresh();
      }
    );
  }
});