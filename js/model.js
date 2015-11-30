$(function(){
  var model = {
    students: [
      { name: "Slappy the Frog"},
      { name: "Lilly the Lizard"}, 
      { name: "Paulrus the Walrus"}, 
      { name: "Gregory the Goat"}, 
      { name: "Adam the Anaconda"}
    ],
    classes: 12,
    init: function() {
      this.students.forEach(function(student){
        student.missed = 0;
      });
    },
  };

  var octopus = {
     init: function() {
       model.init();
       view.init();
     },
     getClassCount: function() {
       return model.classes;
     },
  };

  var view = {
    init: function() {
      this.headerTemp = _.template($('script.template#headerTemp').html(), {variable: 'count'});
      this.table = $('table');
      this.render();
    },
    render: function() {
      this.table.prepend(this.headerTemp(octopus.getClassCount()));
    },
  };

  octopus.init();
});
