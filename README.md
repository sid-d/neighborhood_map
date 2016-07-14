<!DOCTYPE html>
<html>
  <head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          Locations
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2" id="places">

          <div class="form-group">
            <input type="search" class="form-control" data-bind="textInput: query, valueUpdate: 'keyup'">
          </div>

          <div data-bind="text: result_text"></div>

          <hr>

          <ul data-bind="foreach: currentList" id="placelist">
            <li data-bind="text: title"></li>
          </ul>

        </div>
        <div class="col-sm-10" id="mapdiv">
          <div id="map"></div>
        </div>
      </div>
    </div>

    
    <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCd5tfAkiQ-3WTyzq7ejwjtA9udFSh_cME&v=3">
    </script>
    <script src="script.js"></script>
  </body>
</html>