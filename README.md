# Computer graphics algorithms

## Segment construction algorithms
   
### Digital Differential Analyzer
A linear DDA starts by calculating the smaller of dy or dx for a unit increment of the other. A line is then sampled at unit intervals in one coordinate and corresponding integer values nearest the line path are determined for the other coordinate.

Considering a line with positive slope, if the slope is less than or equal to 1, we sample at unit x intervals (dx=1) and compute successive y values as

![](readme_images/d89b23e1fb8f448f204338609ba0c951f7444166.svg)

![](readme_images/56702997e6d5296ae61c9aff4f6017e4ee02aaf7.svg)

Subscript k takes integer values starting from 0, for the 1st point and increases by 1 until endpoint is reached. y value is rounded off to nearest integer to correspond to a screen pixel.

For lines with slope greater than 1, we reverse the role of x and y i.e. we sample at dy=1 and calculate consecutive x values as

![](readme_images/da75e954230f9cf6150ddd14770bd668ef0b66b4.svg)

![](readme_images/4b4ab7512f7b3d8ce8c07fc3657bf6b5aef3c989.svg)

Similar calculations are carried out to determine pixel positions along a line with negative slope. Thus, if the absolute value of the slope is less than 1, we set dx=1 if ![](readme_images/8287d36f8d9d22381acd9135081da7f31d0e2cd4.svg) i.e. the starting extreme point is at the left.

#### Example

### Bresenham algorithm
// TODO
#### Example
//TODO

### Algorithm of eliminating aliasing
// TODO
#### Example
//TODO

## Algorithms for constructing second-order lines

### Bresenham algorithm for generating a circle
// TODO
#### Example
//TODO

### Ellipse generation algorithm
// TODO
#### Example
//TODO

## Interpolation and approximation of curves

### Hermite interpolation method
//TODO
#### Example
//TODO

### Bezier Forms
//TODO
#### Example
//TODO

### B-Spline Smoothing
//TODO
#### Example
//TODO

## Pre-processing of polygons

### Algorithm for testing a polygon for convexity and finding its internal normals
//TODO
#### Example
//TODO

### Algorithms for constructing a convex hull. Graham Bypass Method
//TODO
#### Example
//TODO

### Algorithms for constructing a convex hull. Jarvis Method
//TODO
#### Example
//TODO

### Finding the point of intersection of the segment with the side of the polygon
//TODO
#### Example
//TODO

### Determining the location of a point polygon
//TODO
#### Example
//TODO

## Filling polygons

### Algorithms raster scan
//TODO
#### Example
//TODO

### A raster scan algorithm with an ordered list of edges using a list of active edges
//TODO
#### Example
//TODO

### Simple fill algorithm with priming
//TODO
#### Example
//TODO

### Linear filling algorithm with priming
//TODO
#### Example
//TODO

## Removing invisible lines and surfaces

### Cohen-Sutherland Algorithm
//TODO
#### Example
//TODO

### Cyrus-Beck clipping algorithm
//TODO
#### Example
//TODO

### Remove invisible edges. Roberts algorithm