import React from 'react';

export default class Tiles extends React.Component {

  constructor () {
    super();

    var NS = "http://www.w3.org/2000/svg";
    var viewport = [ screen.width, screen.height ];
    var tileSize = 50;
    var gridX = Math.floor( viewport[0] / tileSize );
    var gridY = Math.floor( viewport[1] / tileSize );
    var colors = [
      [ 2, 100, 68 ],
      [ 175, 100, 75 ],
      [ 201, 100, 60 ]
    ];

    var SVG = function( w, h ) {
      var svg = document.createElementNS( NS, "svg" );
      var viewBox = "0 0 " + w + " " + h;
      svg.setAttribute("width", w);
      svg.setAttribute("height", h);
      svg.setAttribute( "viewBox", viewBox );
      //console.log(svg.width);
      return svg;
    }

    var Rect = function( w, h, fill ) {
      var rect = document.createElementNS( NS, "rect" );
      rect.width.baseVal.value = w;
      rect.height.baseVal.value = h;
      rect.style.fill = fill;

      return rect;
    }
    var LgTriangle = function( fill ) {
      var triangle = document.createElementNS( NS, "polygon" );
      var coords = "0,0 " + tileSize + ",0 0," + tileSize;
      triangle.setAttribute( "points", coords );
      var hsl = fill.split( ' ' );
      var lum = hsl[2].split( '%' );
      lum = parseInt(lum[0]) - 30;
      fill = hsl[0] + " " + hsl[1] + " " + lum + "%)";
      triangle.style.fill = fill;
      return triangle;
    }
    var SmTriangle = function( corner, fill ) {
      var triangle = document.createElementNS( NS, "polygon" );
      var coords, colorShift;
      if ( corner == "tl" ) {
        coords = "0,0 " + ( tileSize / 2 ) + ",0 0," + ( tileSize / 2 );
        colorShift = -15;
      } else if ( corner == "br" ) {
        coords = ( tileSize / 2 ) + "," + tileSize + " " + tileSize + "," + ( tileSize / 2 ) + " " + tileSize + "," + tileSize;
        colorShift = 15;
      }
      triangle.setAttribute( "points", coords );
      var hsl = fill.split( ' ' );
      var hue = hsl[0].split( '(' );
      hue = parseInt( hue[1] ) + colorShift;
      fill = "hsl(" + hue + ", " + hsl[1] + " " + hsl[2];
      triangle.style.fill = fill;
      return triangle;
    }
    var Tile = function() {
      var useColor = getRandomColor();
      var g = document.createElementNS( NS, "g" );
      var rect = new Rect( tileSize, tileSize, useColor );
      var r, tng, triangle;

      g.appendChild( rect );

      tng = Math.round( Math.random() * 10 );
      if ( tng > 0 ) {
        r = Math.round( Math.random() * 2);
        if ( r > 0 ) {
          triangle = new LgTriangle( useColor );
          g.appendChild( triangle );
        }
      }
      if ( tng > 3 ) {
        r = Math.round( Math.random() );
        if ( r > 0 ) {
          triangle = new SmTriangle( "tl", useColor );
          g.appendChild( triangle );
        }
      }
      if ( tng > 5 ) {
        r = Math.round( Math.random() );
        if ( r > 0 ) {
          triangle = new SmTriangle( "br", useColor );
          g.appendChild( triangle );
        }
      }

      return g;
    }

    var getRandomColor = function() {
      var r = Math.floor( Math.random( ) * colors.length );
      var color = "hsl(" + colors[r][0] + ", " + colors[r][1] + "%, " + colors[r][2] + "%)";
      return color;
    }

    var tilesSVG = new SVG( viewport[0], viewport[1] );
    this.tiles = tilesSVG;
    var useX = 0;
    var useY = 0;
    var translate = tilesSVG.createSVGTransform();
    var rotate = tilesSVG.createSVGTransform();

    for ( let gY = 0; gY < gridY; gY++ ) {
      for ( let gX = 0; gX < gridX; gX++ ) {
        var tile = new Tile();
        var deg = Math.round( Math.random() * 4 ) * 90;

        tile.transform.baseVal.appendItem( tilesSVG.createSVGTransform() );
        tile.transform.baseVal.appendItem( tilesSVG.createSVGTransform() );
        tile.transform.baseVal.getItem(0).setTranslate( useX, useY );
        tile.transform.baseVal.getItem(1).setRotate( deg, ( tileSize / 2 ), ( tileSize / 2 ) );

        tilesSVG.appendChild( tile );

        useX += tileSize;
      }
      useY += tileSize;
      useX = 0;
    }
  }

  componentDidMount () {
    this.refs.tileMaker.appendChild(this.tiles);
  }

  componentWillUnmount () {
    // Remove the tiles..
  }

  render () {
    return (
      <div ref='tileMaker' {...this.props}>
      </div>
    );
  }
}
