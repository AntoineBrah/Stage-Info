import { Component, Input, OnInit } from '@angular/core';

/** import for the map  */
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, transform } from 'ol/proj';
import Layer from 'ol/renderer/Layer';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-card-map',
  templateUrl: './card-map.component.html',
  styleUrls: ['./card-map.component.scss']
})
export class CardMapComponent implements OnInit {
  @Input() title: string = "";
  map:any;
  marker: any;
  vectorSource: any;
  vectorLayer!: VectorLayer;
  xyzSource: any;
  tileLayer!: TileLayer;
  view!: View;

  constructor() { }

  ngOnInit(){
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: fromLonLat([3.876716, 43.610769]),
        zoom: 14
      })
    });
  }
}
