function proBar(well) {
  d3.json("http://localhost:3000/api/nd/" + well.id, function(well) {
    console.log("in proBar: ", well);
  });
}