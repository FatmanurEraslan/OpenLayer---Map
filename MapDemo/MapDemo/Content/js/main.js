var _Map, _Draw, _Source, _Layer, _Info;

InitializeMap = () => {

    _Source = new ol.source.Vector({ wrapX: false });

    _Layer = new ol.layer.Vector({
        source: _Source,
    });

    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });
}
//For Adding a Iteration
AddInteraction = () => {

    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });

    _Map.addInteraction(_Draw);

    _Draw.setActive(false);

    _Draw.on(
        "drawend",
        (_event) => {

            console.log(_event.feature.getGeometry().getCoordinates());
            var _coords = _event.feature.getGeometry().getCoordinates();
            _Draw.setActive(false);
            jsPanel.create({
                paneltype: 'modal',
                id: "save_person_panel",
                theme: 'success',
                headerTitle: ' Save point',
                position: 'center-top 0 58',
                contentSize: '300 250',
                content: 'Name: <input id="name" type="text"/><br><br><br>Number: <input id="number" type="text"/><br><br><br><button style="height:40px;width:60px" id="save_person" class="btn btn-success">Submit</button>',
                callback: function () {
                    this.content.style.padding = '20px';

                }

            });
            document.getElementById('save_person').onclick = function () {
                var _name = $('#name').val();
                var _number = $('#number').val();
                //Warning message when user forgot to login
                if (_name.length < 1 || _number.length < 1) {
                    
                    alert("You Didn't Enter a Name or Number");

                    return;
                }
                var _data = {
                    x: _coords[0].toString().replace('.', ','),
                    y: _coords[1].toString().replace('.', ','),
                    name: _name,
                    number: _number
                };
                $.ajax({
                    type: "POST",
                    url: "/Home/SavePoint",
                    dataType: 'json',
                    data: _data,
                    success: function (message) {
                        alert("Succesfull");
                       
                        _Draw.setActive(false);
                        ListAllPoints();
                    },

                    error: function () {
                        alert("An error occurred");
                    },
                    onbeforeclose: function () {
                        return onbeforeclose();
                    },
                });
            }
    
        });

     

}

AddPoint = () => {

    _Draw.setActive(true);
}

//Point query part 
PointInformation= () => {

    _Info = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });

     _Map.addInteraction(_Info);

     _Info.setActive(false);
             
             _Info.on('drawend', function (e) {
                 _Map.on("click", function (event) {

                     _Info.setActive(false);

                     _Map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                
                         var type = feature.get('name')
                         var id =feature.getId()
                         choosenId = id
                         choosenType = type
                         var choosenId;
                         var choosenType;
                         if (choosenId) {
                             $.ajax({
                                 url: '/Home/PointInformation',
                                 type: 'POST',
                                 dataType: 'json',
                                 data: {
                                     type: choosenType,
                                     id: choosenId,
                                 },
                                 success: function (resp) {
                                     var content;
                                     if (choosenType == 'Name') {
                                         content = 'Name: <input id="name type="text"  value=" ' + resp._Info.Name + '"/><br><br><br>' + 'Number: <input id="Number type="text"  value=" ' + resp._Info.Number + '"/><br><br><br>' + 'X: <input id="number type="text"  value=" ' + resp._Info.X + '"/><br><br><br>' + 'Y: <input id="y type="text"  value=" ' + resp._Info.Y + '"/>'; 
                                         //Printing the information pulled from the database
                                     }

                                     jsPanel.create({
                                         theme: 'success',
                                         headerTitle: 'Information',
                                         position: 'center-top 0 58',
                                         contentSize: '300 250',
                                         content: content,
                                         callback: function () {
                                             choosenType = "";
                                             choosenId = 0;
                                             this.content.style.padding = '20px';
                                         },
                                     });

                                 }
                             })
                         }
                     });
                 });
             })
}

ActiveInfo = () => {

    _Info.setActive(true);
}

//For List all points
ListAllPoints = () => {
    $.ajax({
        type: "GET",
        url: "/Home/List",
        dataType: 'json',
        success: function (response) {

            var _features = [];

            for (var i = 0; i < response.length; i++) {

                //the x,y coordinates of each point are taken

                var _point = response[i];
                var _id = _point.ID
                var _geo = new ol.geom.Point([_point.X, _point.Y]);

                var featurething = new ol.Feature({
                    name: "Name",
                    geometry: _geo,

                });

                featurething.setId(_id)

                var _style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: 'rgba(0,0,255,0.3)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#8000ff'
                        }),
                        radius: 10
                    }),
                });

                featurething.setStyle(_style);

                _features.push(featurething);
            }


            var _pointSource = _Layer.getSource();

            _pointSource.addFeatures(_features);
        },

        error: function () {
            alert("upsss");
        },

    });
}
