// src/lib/utils/topojson-helper.js
// This script provides a stripped-down version of the TopoJSON client functionality
// needed for our world map component

export default {
  feature: function(topology, object) {
    if (typeof object === "string") object = topology.objects[object];
    return object.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: object.geometries.map(function(geometry) { return feature(topology, geometry); })}
      : feature(topology, object);
  }
};

function feature(topology, o) {
  const id = o.id,
      properties = o.properties || {},
      type = o.type;
  
  const geometry = type === "GeometryCollection" ? {type: "GeometryCollection", geometries: o.geometries.map(function(o) { return geometry(topology, o); })}
      : type in geometryTypes ? geometryTypes[type](topology, o)
      : null;

  return {
    type: "Feature",
    id: id,
    properties: properties,
    geometry: geometry
  };
}

const geometryTypes = {
  Polygon: function(topology, o) {
    return {
      type: "Polygon",
      coordinates: o.arcs.map(function(arc) { return topology.arcs[arc]; })
    };
  },
  MultiPolygon: function(topology, o) {
    return {
      type: "MultiPolygon",
      coordinates: o.arcs.map(function(arc) { 
        return arc.map(function(a) { 
          return topology.arcs[a]; 
        }); 
      })
    };
  }
};
