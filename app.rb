require 'sinatra'
require 'matrix'
require 'erb'
require 'json'
require 'pry'
require_relative 'algorithms/algorithms2d'
require_relative 'algorithms/algorithms3d'
require_relative 'algorithms/poligonsAlgorithms.rb'
require_relative 'algorithms/basic_sugar.rb'

get '/' do
  erb :index
end

post '/cda' do
  x1 = @params[:coordinates]['0'][0].to_i
  y1 = @params[:coordinates]['0'][1].to_i
  x2 = @params[:coordinates]['1'][0].to_i
  y2 = @params[:coordinates]['1'][1].to_i

  result = Algorithms2d.cda(x1, y1, x2, y2)

  {result: result}.to_json
end

post '/brez' do
  coordinates = get_coordinates(:coordinates)

  result = Algorithms2d.brezenhem(coordinates[0], coordinates[1])

  {result: result}.to_json
end

post '/woo' do
  x1 = @params[:coordinates]['0'][0].to_i
  y1 = @params[:coordinates]['0'][1].to_i
  x2 = @params[:coordinates]['1'][0].to_i
  y2 = @params[:coordinates]['1'][1].to_i

  result = Algorithms2d.woo(x1, y1, x2, y2)

  {result: result}.to_json
end

post '/circle' do
  x = @params[:coordinates]['0'][0].to_i
  y = @params[:coordinates]['0'][1].to_i
  radius = @params[:radius].to_i

  result = Algorithms2d.circle(x, y, radius)

  {result: result}.to_json
end

post '/ellipse' do
  x = @params[:coordinates]['0'][0].to_i
  y = @params[:coordinates]['0'][1].to_i
  x_radius = @params[:radiusX].to_i
  y_radius = @params[:radiusY].to_i

  result = Algorithms2d.ellipse(x, y, x_radius, y_radius)

  {result: result}.to_json
end

post '/hyperbola' do
  x = @params[:coordinates]['0'][0].to_i
  y = @params[:coordinates]['0'][1].to_i
  x_radius = @params[:radiusX].to_i
  y_radius = @params[:radiusY].to_i

  result = Algorithms2d.hyperbola(x, y, x_radius, y_radius)

  {result: result}.to_json
end

post '/parabola' do
  x = @params[:coordinates]['0'][0].to_i
  y = @params[:coordinates]['0'][1].to_i
  radius = @params[:radius].to_i

  result = Algorithms2d.parabola(x, y, radius)

  {result: result}.to_json
end

post '/hermit' do
  x1 = @params[:coordinates]['0'][0].to_i
  y1 = @params[:coordinates]['0'][1].to_i
  x1_vec = @params[:coordinates]['1'][0].to_i
  y1_vec = @params[:coordinates]['1'][1].to_i
  x2 = @params[:coordinates]['2'][0].to_i
  y2 = @params[:coordinates]['2'][1].to_i
  x2_vec = @params[:coordinates]['3'][0].to_i
  y2_vec = @params[:coordinates]['3'][1].to_i

  result = Algorithms2d.draw_hermite(x1, y1, x1_vec, y1_vec, x2, y2, x2_vec, y2_vec)

  {result: result}.to_json
end

post '/bezier' do
  x1 = @params[:coordinates]['0'][0].to_i
  y1 = @params[:coordinates]['0'][1].to_i
  x2 = @params[:coordinates]['1'][0].to_i
  y2 = @params[:coordinates]['1'][1].to_i
  x3 = @params[:coordinates]['2'][0].to_i
  y3 = @params[:coordinates]['2'][1].to_i
  x4 = @params[:coordinates]['3'][0].to_i
  y4 = @params[:coordinates]['3'][1].to_i

  result = Algorithms2d.draw_bezier(x1, y1, x2, y2, x3, y3, x4, y4)

  {result: result}.to_json
end

post '/b_spline' do
  points = @params[:coordinates].map {|k, v| v.map {|l| l.to_i}}

  result = Algorithms2d.draw_b_spline(points)

  {result: result}.to_json
end

post '/rotate' do
  coordinates = get_coordinates(:coordinates)
  angle = @params[:angle].to_i
  axis = get_coordinates(:axis)

  {result: Algorithms3d.rotate(coordinates, axis, angle)}.to_json
end

post '/perspective' do
  coordinates = get_coordinates(:coordinates)
  perspective = get_value(:perspective)

  {result: Algorithms3d.perspective(coordinates, perspective)}.to_json
end

post '/bulgeChecking' do
  coordinates = get_coordinates(:coordinates)

  {result: PoligonsAlgorithms.normals(coordinates)}.to_json
end

post '/grekhemShell' do
  coordinates = get_coordinates(:coordinates)

  result = []
  PoligonsAlgorithms.grekhem_shell(coordinates).each_cons(2) {|a, b| result << [a, b]}

  {result: result}.to_json
end

post '/jarvisShell' do
  coordinates = get_coordinates(:coordinates)

  result = []
  PoligonsAlgorithms.jarvis_shell(coordinates).each_cons(2) {|a, b| result << [a, b]}

  {result: result}.to_json
end

post '/point_of_intersection' do
  poligon = get_coordinates(:poligon)
  line = get_coordinates(:line)

  {result: PoligonsAlgorithms.point_of_intersection(poligon, line)}.to_json
end

post '/membership_point' do
  poligon = get_coordinates(:poligon)
  point = @params[:point].map {|a| a.to_f}

  {result: PoligonsAlgorithms.membership_point(poligon, point)}.to_json
end

post '/raster_scan_1' do
  poligon = get_coordinates(:poligon)

  {result: PoligonsAlgorithms.raster_scan_1(poligon)}.to_json
end

post '/raster_scan_3' do
  poligon = get_coordinates(:poligon)
  coordinate = @params[:coordinate].map(&:to_f)

  {result: PoligonsAlgorithms.raster_scan_3(poligon, coordinate)}.to_json
end

post '/raster_scan_4' do
  poligon = get_coordinates(:poligon)
  coordinate = @params[:coordinate].map(&:to_f)

  {result: PoligonsAlgorithms.raster_scan_4(poligon, coordinate)}.to_json
end

post '/hide_lines_1' do
  poligon = get_coordinates(:poligon)
  lines = @params[:lines].values.map {|a| a.values.map {|b| b.values.map {|c| c.map(&:to_f)}}}.flatten(1)

  {result: PoligonsAlgorithms.hide_lines1(poligon, lines)}.to_json
end

post '/hide_lines_2' do
  Vector[0,9,0].cross_product Vector[9,0,0]

  poligon = get_coordinates(:poligon)
  lines = @params[:lines].values.map {|a| a.values.map {|b| b.values.map {|c| c.map(&:to_f)}}}.flatten(1)

  {result: PoligonsAlgorithms.hide_lines2(poligon, lines)}.to_json
end

def get_coordinates(field)
  @params[field].values.map do |a|
    if a.is_a?(Hash)
      a.values.map {|b| b.map(&:to_f)}
    elsif a.is_a?(Array)
      a.map(&:to_f)
    else
      a.to_f
    end
  end
end


def get_value(field)
  @params[field].to_f
end
