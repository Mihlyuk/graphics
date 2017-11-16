require_relative 'Constants.rb'

class PoligonsAlgorithms

  def self.bulge_checking(coordinates)
    vector_products = []
    chords = []

    coordinates = coordinates << coordinates.first
    vectors = coordinates.map { |line| [line[1].x - line[0].x, line[1].y - line[0].y] }
    coordinates.each_cons(2) do |line1, line2|
      chords << [
          [-(line1[1].y - line1[0].y), line1[1].x - line1[0].x],
          [line2[1].x - line1[0].x, line2[1].y - line1[0].y]
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

    normals = chords.map do |t|
      perpendicular_side = Vector[*t[0]]
      chord = Vector[*t[1]]

      koef = perpendicular_side.inner_product(chord) >= 0 ? 1 : -1
      [t[0][0] * koef, t[0][1] * koef]
    end

    {
        normals: normals,
        bulge: answer
    }
  end

  def self.grekhem_shell(coordinates)
    extreme_point = min(coordinates)
    coordinates.delete(extreme_point)
    coordinates = coordinates.sort_by { |point| Math.atan((point.y - extreme_point.y) / (point.x - extreme_point.x)).abs }

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

  end

  private

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

end
