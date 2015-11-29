import React from 'react';

/**
 * Renders random tiles the height and width of the available space inside the browser window.
 * Adapted from from http://codepen.io/littleberry/pen/xkclv
 *
 * Props:
 *   colors     An array of RGB arrays. See default props for example.
 */
export default class Tiles extends React.Component {
  static propTypes = {
    colors: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number))
  };

  static defaultProps = {
    colors: [
      // Red Blue and Cyan
      [ 2, 100, 68 ],
      [ 175, 100, 75 ],
      [ 201, 100, 60 ]
    ]
  };

  constructor (...args) {
    super(...args);

    let NS = "http://www.w3.org/2000/svg";
    let viewport = [ screen.width, screen.height ];
    let tileSize = 50;
    let gridX = Math.floor( viewport[0] / tileSize );
    let gridY = Math.floor( viewport[1] / tileSize );
    let colors = this.props.colors;

    let SVG = function( w, h ) {
      let svg = document.createElementNS( NS, "svg" );
      let viewBox = "0 0 " + w + " " + h;
      svg.setAttribute("width", w);
      svg.setAttribute("height", h);
      svg.setAttribute( "viewBox", viewBox );
      //console.log(svg.width);
      return svg;
    }

    let Rect = function( w, h, fill ) {
      let rect = document.createElementNS( NS, "rect" );
      rect.width.baseVal.value = w;
      rect.height.baseVal.value = h;
      rect.style.fill = fill;

      return rect;
    }
    let LgTriangle = function( fill ) {
      let triangle = document.createElementNS( NS, "polygon" );
      let coords = "0,0 " + tileSize + ",0 0," + tileSize;
      triangle.setAttribute( "points", coords );
      let hsl = fill.split( ' ' );
      let lum = hsl[2].split( '%' );
      lum = parseInt(lum[0]) - 30;
      fill = hsl[0] + " " + hsl[1] + " " + lum + "%)";
      triangle.style.fill = fill;
      return triangle;
    }
    let SmTriangle = function( corner, fill ) {
      let triangle = document.createElementNS( NS, "polygon" );
      let coords, colorShift;
      if ( corner == "tl" ) {
        coords = "0,0 " + ( tileSize / 2 ) + ",0 0," + ( tileSize / 2 );
        colorShift = -15;
      } else if ( corner == "br" ) {
        coords = ( tileSize / 2 ) + "," + tileSize + " " + tileSize + "," + ( tileSize / 2 ) + " " + tileSize + "," + tileSize;
        colorShift = 15;
      }
      triangle.setAttribute( "points", coords );
      let hsl = fill.split( ' ' );
      let hue = hsl[0].split( '(' );
      hue = parseInt( hue[1] ) + colorShift;
      fill = "hsl(" + hue + ", " + hsl[1] + " " + hsl[2];
      triangle.style.fill = fill;
      return triangle;
    }
    let Tile = function() {
      let useColor = getRandomColor();
      let g = document.createElementNS( NS, "g" );
      let rect = new Rect( tileSize, tileSize, useColor );
      let r, tng, triangle;

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

    let getRandomColor = function() {
      let r = Math.floor( Math.random( ) * colors.length );
      let color = "hsl(" + colors[r][0] + ", " + colors[r][1] + "%, " + colors[r][2] + "%)";
      return color;
    }

    let tilesSVG = new SVG( viewport[0], viewport[1] );
    this.tiles = tilesSVG;
    let useX = 0;
    let useY = 0;
    let translate = tilesSVG.createSVGTransform();
    let rotate = tilesSVG.createSVGTransform();

    for ( let gY = 0; gY < gridY; gY++ ) {
      for ( let gX = 0; gX < gridX; gX++ ) {
        let tile = new Tile();
        let deg = Math.round( Math.random() * 4 ) * 90;

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
