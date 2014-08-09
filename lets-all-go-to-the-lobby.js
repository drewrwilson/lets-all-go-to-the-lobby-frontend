function loadData (filterTime) {

  d3.json("http://localhost:3000/lobbymoney", function(data) {
    console.log(data);
  });

}
