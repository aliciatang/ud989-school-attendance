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
      if(!localStorage.students) {
         model.students.forEach(function(student) {
           student.attendance = [];
           for(var i = 0 ; i < model.classes ; i++)
               student.attendance.push(Math.random() >= 0.5);
         });
         localStorage.students = JSON.stringify(model.students);
      } else {
         this.students = JSON.parse(localStorage.students);
      }
      this.countMissing();
    },
    countMissing: function() {
      this.students.forEach(function(student) {
        student.missed = student.attendance.reduce(function(pre, cur){ return pre + cur;});
      });
    },
    updateAttendance: function(student, index, checked) {
      student.attendance[index] = checked;
      student.missed = student.attendance.reduce(function(pre, cur){ return pre + cur;});
      localStorage.students = JSON.stringify(this.students);
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
     getStudents: function() {
       return model.students;
     },
     update: function(name, index, checked) {
       model.updateAttendance(name, index, checked);
       view.update(name);
     },
  };

  var view = {
    init: function() {
      this.headerTemp = _.template($('script.template#headerTemp').html(), {variable: 'count'});
      this.studentTemp = _.template($('script.template#studentTemp').html(), {variable: 'student'});
      this.table = $('table');
      this.tbody = this.table.find('tbody');
      this.rows = {};
      this.render();
    },
    render: function() {
      var count = octopus.getClassCount();
      this.table.prepend(this.headerTemp(count));
      octopus.getStudents().forEach(function(student) {
        student.count = count;
        var row = $(view.studentTemp(student));
        view.rows[student.name] = row;
        row.find('input').click(function(event){
          var index = row.find('input').index(this);
          var checked = $(this).prop('checked');
          octopus.update(student, index, checked);
        });
        view.tbody.append(row);
      });
    },
    update: function(student) {
      this.rows[student.name].find('.missed-col').text(student.missed); 
    },
  };

  octopus.init();
});
