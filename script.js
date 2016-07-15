//model to store all the location data. this could come from a JSON file or from a database.
var all_locations = [
  {title: 'Upper Manhattan', location: {lat: 40.7713024, lng: -73.9932459}},
  {title: 'Hamilton Heights', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Upper East Side', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'Central Park', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'New Amsterdam', location: {lat: 40.7180628, lng: -73.9961237}}
];

//creating a global variable to store the map and to refernece it later
var map;

//after google map api javascript loads this function is going to run automatically
function initMap(){
  //this actually creates a map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13
  });
  //applying the knnockout bindings so that knockout will listen to the bindings and take actions accordingly
  ko.applyBindings(new ViewModel());
}

//creating a location constructor that will be run to create a location by giving it one location data
var Location = function(locations_data){
  var self = this;
  this.title = ko.observable(locations_data.title);
  this.location = ko.observable(locations_data.location);
  this.marker = new google.maps.Marker({
    position: locations_data.location,
    map: map,
    animation: google.maps.Animation.DROP,
    title: locations_data.title
  });
  //animating the marker if clicked on
  this.showInfo = function(){
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
  }
  //adrawing the infowindow
  InfoWindow(this.marker);
};

//to create an infowindow based on the marker supplied.
function InfoWindow(marker){
  //wikipedia link will be saved according to the marker's title
  var wikiurl="https://en.wikipedia.org/w/api.php?action=opensearch&search="+ marker.title + "&format=json&callback=wikicallback";
  // Create an onclick event to open an infowindow at each marker.
  marker.addListener('click', function() {
    this.setAnimation(google.maps.Animation.BOUNCE);
    var self = this;
    this.infoWindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
    //making an ajax call to get the wkipedia articles and display that in the infowindow
    $.ajax({
      url: wikiurl,
      dataType: "jsonp",
      success: function(response){
        var display = '<div><a href="'+
                      response[3][0]+
                      '">'+
                      marker.title+
                      '</a>'+
                      '<p>'+
                      response[2][0]+
                      '</p>'+
                      '</div>';
        self.infoWindow.setContent(display);
        self.infoWindow.open(map,self);
      },
      //if anyerror occurs handling it gracefully
      error: function(){
        console.log('There was an error in loading the Wikipedia Articles.');
        alert("Sorry something is wrong with getting data about this location from Wikipedia.");
      }
    })
  });
};

//this is the viewmodel
var ViewModel = function(){
  //self is ViewModel
  var self = this;
  //what the user enters is now stored as a ko observable
  this.query = ko.observable('');
  //creating array of all locations- its blank at first
  this.locationList = ko.observableArray([]);
  //pushing all the locations to this.LocationList
  //show all the markers
  for(var local in all_locations) {
      self.locationList.push(new Location(all_locations[local]));
  };
  //this is the currentList. It shows only the relevant items
  this.currentList = ko.computed(function() {
    var filter = self.query().toLowerCase();
    //if the input value, i.e. query is blank, then show the locationList that has everything
    if (!filter) {
      for(var local in self.locationList()) {
        self.locationList()[local].marker.setVisible(true);
      };
      return self.locationList();
    } else {
      //if the input value is not blank then use the filter option provided by knockout to reduce the list to whatever is relevant.
      //also need to use stringsStartsWith function that has been defined at the top.
      return ko.utils.arrayFilter(self.locationList(), function(loc) {
        var loc_title = loc.title().toLowerCase();
        if (loc_title.search(filter)>=0){
          loc.marker.setVisible(true);
          return true;
        } else {
          loc.marker.setVisible(false);
          if (loc.marker.infoWindow) loc.marker.infoWindow.close();
          return false;
        };
      });
    }
  }, this);
  //shows you what you are typing.
  this.result_text = ko.computed(function() {
    return "You are searching for: " + this.query();
  }, this);
};