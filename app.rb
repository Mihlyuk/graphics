require 'sinatra'
require 'matrix'
require 'erb'
require 'json'
require 'pry'
require_relative 'algorithms/algorithms2d'
require_relative 'algorithms/algorithms3d'

class Array
  def x
    self[0]
  end

  def y
    self[1]
  end

  def z
    self[2]
  end

  def p
    self[3]
  end

  def a
    self[4]
  end
end

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
  x1 = @params[:coordinates]['0'][0].to_i
  y1 = @params[:coordinates]['0'][1].to_i
  x2 = @params[:coordinates]['1'][0].to_i
  y2 = @params[:coordinates]['1'][1].to_i

  result = Algorithms2d.brezenhem(x1, y1, x2, y2)

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
  points = @params[:coordinates].map { |k, v| v.map { |l| l.to_i } }

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

def get_coordinates(field)
  @params[field].map do |k, v|
    [
        (v[0] ? v[0] : 1).to_f,
        (v[1] ? v[1] : 1).to_f,
        (v[2] ? v[2] : 1).to_f,
        (v[3] ? v[3] : 1).to_f
    ]
  end
end

def get_value(field)
  @params[field].to_f
end
