require_relative 'Constants.rb'

class PoligonsAlgorithms

  def self.normals(coordinates)
    vector_products = []
    chords = []

    coordinates = coordinates << coordinates.first
    vectors = coordinates.map { |line| [line[1].x - line[0].x, line[1].y - line[0].y] }
    coordinates.each_cons(2) do |line1, line2|
      chords << [
          [-(line1[1].y - line1[0].y), line1[1].x - line1[0].x],
          [line2[1].x - line1[0].x, line2[1].y - line1[0].y],
          [line1, line2]
      ]
    end

    vectors.each_cons(2) do |vec1, vec2|
      vector_products << vec1.x * vec2.y - vec1.y * vec2.x
    end

    answer =
        if vector_products.all? { |a| a == 0 }
          'cut'
        elsif vector_products.all? { |a| a >= 0 }
          'convex_left'
        elsif vector_products.all? { |a| a < 0 }
          'convex_right'
        elsif vector_products.any? { |a| a < 0 } && vector_products.any? { |a| a >= 0 }
          'concave'
        end

    result = chords.map do |t|
      perpendicular_side = Vector[*t[0]]
      chord = Vector[*t[1]]

      koef = perpendicular_side.inner_product(chord) >= 0 ? 1 : -1
      {
          vector: t[2][0],
          normal: [t[0][0] * koef, t[0][1] * koef]
      }
    end

    {
        normals: result.map { |a| a[:normal] },
        bulge: answer,
        result: result
    }
  end

  def self.grekhem_shell(coordinates)
    extreme_point = min(coordinates)
    coordinates.delete(extreme_point)
    coordinates = coordinates.sort_by do |point|
      angle = Math.atan((point.y - extreme_point.y).to_f / (point.x - extreme_point.x)) / Math::PI * 180
      to_full_angle(angle, extreme_point.x, extreme_point.y, point.x, point.y)
    end

    shell = []
    shell << extreme_point
    shell << coordinates.shift

    while coordinates.length > 0
      point = coordinates.first

      if shell.length < 2
        shell << coordinates.shift
      end

      vec1 = [shell[-1].x - shell[-2].x, shell[-1].y - shell[-2].y]
      vec2 = [point.x - shell[-2].x, point.y - shell[-2].y]

      if (vec1.x * vec2.y - vec2.x * vec1.y) > 0
        shell << point
        coordinates.shift
      else
        shell.pop
      end
    end

    shell << shell.first

    shell
  end

  def self.jarvis_shell(coordinates)
    extreme_point = min(coordinates)
    max_y = max(coordinates)

    shell = []
    shell << extreme_point

    while coordinates.length > 0
      point = shell.last

      if shell.include?(max_y)

      end
      next_point = coordinates.max_by do |next_p|
        angle = Math.atan((next_p.y - point.y).to_f / (next_p.x - point.x)) / Math::PI * 180
        angle = to_full_angle(angle, point.x, point.y, next_p.x, next_p.y)

        shell.include?(max_y) && angle <= 180 || !shell.include?(max_y) && angle > 180 || angle.nan? ? 0 : angle
      end

      shell << next_point
      coordinates.delete(next_point)

      break if next_point == shell.first
    end

    shell << shell.first

    shell
  end

  def self.point_of_intersection(poligon, line)
    line.flatten!(1)
    normals = normals(poligon)[:result]

    intersections = normals.map do |n|
      normal = n[:normal]
      vector = n[:vector][1]
      normal << 1
      normal << 1

      directris = Vector[*line[1]] - Vector[*line[0]]
      w = Vector[*line[0]] - Vector[*vector]

      t = (Vector[*normal].inner_product(w) / Vector[*normal].inner_product(directris)).abs
      scale = Vector[*normal].inner_product((Vector[*line[0]] + (Vector[*line[1]] - Vector[*line[0]]) * t) - Vector[*vector])
      scale.abs < 5 ? t : nil
    end.compact

    intersections.map do |t|
      (Vector[*line[0]] + (Vector[*line[1]] - Vector[*line[0]]) * t).to_a
    end
  end

  def self.membership_point(poligon, point)
    min_x = poligon.flatten(1).map { |a| a.x }.min
    max_x = poligon.flatten(1).map { |a| a.x }.max
    line = [[min_x, point.y, 0, 1], [max_x, point.y, 0, 1]]
    normals = normals(poligon)[:result]

    intersections = normals.map do |n|
      normal = n[:normal]
      vector = n[:vector][1]
      normal << 1
      normal << 1

      directris = Vector[*line[1]] - Vector[*line[0]]
      w = Vector[*line[0]] - Vector[*vector]

      t = (Vector[*normal].inner_product(w) / Vector[*normal].inner_product(directris)).abs
      scale = Vector[*normal].inner_product((Vector[*line[0]] + (Vector[*line[1]] - Vector[*line[0]]) * t) - Vector[*vector])
      scale.abs < 5 ? t : nil
    end.compact


    intersections.each do |t|
      left_p = (Vector[*line[0]] + (Vector[*line[1]] - Vector[*line[0]]) * t).to_a
      return true if distance(left_p, point) < 1
    end

    false
  end

  def self.raster_scan_1(poligon)
    points = to_points(poligon).group_by(&:y).values.map { |a| [a.min_by(&:x), a.max_by(&:x)] }.flatten(1)
    points = points_sort(points).each_slice(2).to_a

    points.map do |line|
      point_1 = line[0]
      point_2 = line[1]

      (point_1.x.to_i..point_2.x.to_i).map do |x|
        [x, point_1.y, point_1.z, point_1.p]
      end
    end.flatten(1)
  end

  def self.raster_scan_2(poligon)

  end

  private

  def self.points_sort(points)
    points.sort_by { |a| a[1] }.group_by { |a| a[1] }.map { |k, v| v.sort_by { |a| a[0] } }.flatten(1)
  end

  def self.to_points(poligon)
    poligon.map do |line|
      next if line[0].y == line[1].y
      d = Math.sqrt((line[1].x - line[0].x).abs ** 2 + (line[1].y - line[0].y).abs ** 2)
      point_1 = Vector[*line[0]]
      point_2 = Vector[*line[1]]
      result_points = []

      (0.0..1.0).step(1.to_f / d).each do |u|
        result_points << (point_1 + u * (point_2 - point_1)).round.to_a
      end
      result_points << point_2.round.to_a if result_points.last != point_2.to_a

      result_points
    end.compact.flatten(1)
  end

  def self.to_full_angle(angle, x1, y1, x2, y2)
    if x1 > x2
      angle + 180
    elsif y1 <= y2
      angle
    elsif y1 > y2
      angle + 360
    end
  end

  def self.min(coordinates)
    min_y = coordinates.map { |a| a.y }.min

    result = coordinates.select { |point| point.y == min_y }

    if result.length == 1
      return result.first
    else
      min_x = result.map { |a| a.x }.min

      return result.select { |point| point.x == min_x }.first
    end
  end

  def self.max(coordinates)
    max_y = coordinates.map { |a| a.y }.max

    result = coordinates.select { |point| point.y == max_y }

    if result.length == 1
      return result.first
    else
      max_x = result.map { |a| a.x }.max

      return result.select { |point| point.x == max_x }.first
    end
  end

  def self.turn_axis(coordinates)
    coordinates.map { |c| [c.x, -c.y, c.z, c.p] }
  end

  def self.distance(coordinates1, coordinates2)
    Math.sqrt((coordinates2.x - coordinates1.x) ** 2 + (coordinates2.y - coordinates1.y) ** 2 + (coordinates2.z - coordinates1.z) ** 2)
  end


end
