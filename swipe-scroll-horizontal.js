(function(){
  
  this.SwipeScrollHorizontal = function(){
    var defaults = {
       selector :  "",
           drag :  null,
           posX :  0,
          speed :  4
    }
    var options = extendDefaults(defaults, arguments[0]);
    var content = document.querySelector( options.selector );
    
    if( validateSelector(content) ){
      content.options = options;
      activeEvent(content);
    }else
      console.error('Selector "%s" not found', selector);
  }
  
  //Validations
  function validateInt(num){
    return /^\d+$/.test(num);
  }
  
  function validateSelector(el){
    return (el !== null);
  }
  
  
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
  
  //Events
  function activeEvent(content){
    
    content.addEventListener('mousemove', function(e){
      if(this.options.drag){
        this.className = "noselect";
        var scroll = this.scrollLeft;
        scroll = (this.options.posX > e.pageX) ? scroll + this.options.speed : scroll - this.options.speed;
        this.options.posX = e.pageX;
        this.scrollLeft = scroll;
      }
    });

    content.addEventListener("mouseup", finishDrag);
    content.addEventListener("mouseleave", finishDrag);
    function finishDrag(e){
      this.setAttribute("style", "");
      this.className = "";
      this.options.drag = false;
    }

    content.addEventListener("mousedown", function(e){
      this.style.cursor = "pointer";
      this.options.drag = true;
    });
  }
  
}());