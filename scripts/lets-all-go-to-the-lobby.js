var BASE_URL = 'http://jk.xvm.mit.edu:3000';

$(document).ready(function() {
  d3.json(BASE_URL + "/lobbymoney", function(data) {
    console.log(data)
    window.data = data;

  //the columns that we'd like to display
  var columns = [{
    obj_key: 'lobbyist_naml', 
    readable: 'First Name',
  },
  {
    obj_key: 'lobbyist_namf', 
    readable:'Last Name'
  },
  {
    obj_key: 'amount', 
    readable:'Contribution Amount'
    
  }];

  //add data to the html
  var results = d3.select("#results").html(null),
        table = results.append("table")
                  .attr("class", "tblResults")
                  .attr("class", "table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

  // Table headers
  thead.append("tr")
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
          .text(function(d) { return d.readable; })
      // event handlers
      .on("click", function(d){
        d3.select('#results table tbody')
            .selectAll('tr').sort(function(a, b){
              if (ascending)
                return d3.ascending(a[d.obj_key], b[d.obj_key]);
              else
                return d3.descending(a[d.obj_key], b[d.obj_key]);
          });
          //flip the bit:
          ascending = !ascending;
        }
      );

  //append some data
    //initialize ascending as true
  var ascending = true;

  //add sort icon to the list
  d3.selectAll('#results table tr th').append('span').html(' <i class="fa fa-sort"></i>')

  // Table body
  var rows = tbody.selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

  // create a cell in each row for each column
  var cells = rows.selectAll("td")
      .data(function(row) {
          return _.map(columns, function(column) {
            return { column: column.obj_key, value: row[column.obj_key] };
          });
      })
      .enter()
      .append("td")
          .text(function(d) { return d.value; });
  });
});
