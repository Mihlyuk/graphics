require_relative 'Constants.rb'

module Algorithms2d

  def self.brezenhem(x1, y1, x2, y2)
    result = []

    x = x1
    y = y1
    dx = (x2 - x1).abs
    dy = (y2 - y1).abs
    e = 0.0

    change_x = x1 < x2 ? 1 : -1
    change_y = y1 < y2 ? 1 : -1

    result << [x, y]

    i = 1

    if dx >= dy
      e = 2 * dy - dx
      while i <= dx do
        e_old = e
        if e >= 0
          y += change_y
          e -= 2 * dx
        end
        x += change_x
        e += 2 * dy
        result << [x, y]
        i+=1
      end
    else
      e = 2 * dx - dy
      while i <= dy do
        e_old = e
        if e >= 0
          x += change_x
          e -= 2 * dy
        end
        y += change_y
        e += 2 * dx
        result << [x, y]
        i+=1
      end
    end

    result
  end

  def self.cda(x1, y1, x2, y2)
    result = []

    length = [(x2-x1).abs, (y2-y1).abs].max
    length = length.first if length.class == 'Array'

    dx = (x2-x1).to_f / length
    dy = (y2-y1).to_f / length

    x = x1 + 0.5 * sign(dx)
    y = y1 + 0.5 * sign(dy)

    result << [x.floor, y.floor]

    length.times do
      x = x + dx
      y = y + dy

      result << [x.floor, y.floor]
    end

    result
  end

  def self.woo(x1, y1, x2, y2)
    if x1 == x2 || y1 == y2
      result = Algorithms2d.brezenhem(x1, y1, x2, y2)

      return result
    end

    result = []
    x = x1
    y = y1
    dx = (x2 - x1).abs
    dy = (y2 - y1).abs
    e = 0.0
    change_x = x1 < x2 ? 1 : -1
    change_y = y1 < y2 ? 1 : -1

    result << [x, y]
    i = 1
    if dx >= dy
      e = dy.to_f / dx - 0.5
      while i <= dx do
        if e >= 0
          y += change_y
          e -= 1
        end
        x += change_x
        e += dy.to_f / dx

        coordinates = (e < 0) ? [x, y - change_y, e.abs] : [x, y + change_y, e.abs]

        result << [x, y]
        result << coordinates

        i+=1
      end
    else
      e = dx.to_f / dy - 0.5
      while i <= dy do
        if e >= 0
          x += change_x
          e -= 1
        end
        y += change_y
        e += dx.to_f / dy

        coordinates = e < 0 ? [x - change_x, y, e.abs] : [x + change_x, y, e.abs]

        result << [x, y]
        result << coordinates

        i+=1
      end
    end

    result
  end

  def self.circle(x_center, y_center, radius)
    result = []
    x = 0
    y = radius
    limit = y - radius
    delta = 2 - 2 * radius
    result << [x + x_center, y + y_center]
    result << [-x + x_center, -y + y_center]
    result << [x + x_center, -y + y_center]
    result << [-x + x_center, y + y_center]

    i = 0
    while y > limit
      i+=1
      dz = 2 * delta - 2 * x - 1
      if delta > 0 && dz > 0
        y -= 1
        delta += 1 - 2 * y

        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]

        next
      end

      d = 2 * delta + 2 * y - 1

      if delta < 0 && d <= 0
        x += 1
        delta += 1 + 2 * x
        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end
      x += 1
      y -= 1
      delta += 2 * x - 2 * y + 2
      result << [x + x_center, y + y_center]
      result << [-x + x_center, -y + y_center]
      result << [x + x_center, -y + y_center]
      result << [-x + x_center, y + y_center]
    end

    result
  end

  def self.ellipse(x_center, y_center, x_radius, y_radius)
    result = []
    x_radius_pow_2 = x_radius ** 2
    y_radius_pow_2 = y_radius ** 2
    x = 0
    y = y_radius
    limit = y - y_radius
    delta = x_radius_pow_2 + y_radius_pow_2 - 2 * x_radius_pow_2 * y_radius

    result << [x + x_center, y + y_center]
    result << [-x + x_center, -y + y_center]
    result << [x + x_center, -y + y_center]
    result << [-x + x_center, y + y_center]

    i = 0
    while y > limit
      i+=1
      dz = 2 * delta - 2 * x * y_radius_pow_2 - 1
      if delta > 0 && dz > 0
        y -= 1
        delta += x_radius_pow_2 - 2 * y * x_radius_pow_2

        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]

        next
      end
      d = 2 * delta + 2 * y * x_radius_pow_2 - 1
      if delta < 0 && d <= 0
        x += 1
        delta += y_radius_pow_2 + 2 * x * y_radius_pow_2
        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end
      x += 1
      y -= 1
      delta += y_radius_pow_2 * (2 * x + 1) + x_radius_pow_2 * (1 - 2 * y)

      result << [x + x_center, y + y_center]
      result << [-x + x_center, -y + y_center]
      result << [x + x_center, -y + y_center]
      result << [-x + x_center, y + y_center]
    end

    result
  end

  def self.hyperbola(x_center, y_center, x_radius, y_radius)
    result = []
    x_radius_pow_2 = x_radius ** 2
    y_radius_pow_2 = y_radius ** 2
    x = 0
    y = y_radius
    delta = x_radius_pow_2 + 2 * x_radius_pow_2 * y_radius - y_radius_pow_2

    result << [x + x_center, y + y_center]
    result << [-x + x_center, -y + y_center]
    result << [x + x_center, -y + y_center]
    result << [-x + x_center, y + y_center]
    i = 0

    while i < 50
      i+=1
      dz = 2 * delta - x_radius_pow_2 * (2 * y + 1)

      if delta > 0 && dz > 0
        x += 1
        delta -= y_radius_pow_2 * 2 * x + y_radius_pow_2

        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end
      d = 2 * delta + y_radius_pow_2 * (2 * x + 1)
      if delta < 0 && d <= 0
        y += 1
        delta += x_radius_pow_2 * 2 * y + x_radius_pow_2
        result << [x + x_center, y + y_center]
        result << [-x + x_center, -y + y_center]
        result << [x + x_center, -y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end
      x += 1
      y += 1
      delta += x_radius_pow_2 * (2 * y + 1) - y_radius_pow_2 * (2 * x + 1)
      result << [x + x_center, y + y_center]
      result << [-x + x_center, -y + y_center]
      result << [x + x_center, -y + y_center]
      result << [-x + x_center, y + y_center]
    end
    result
  end

  def self.parabola(x_center, y_center, radius)
    result = []
    x = 0
    y = 0
    delta = 1 - 2 * radius

    result << [x + x_center, y + y_center]
    result << [-x + x_center, y + y_center]
    i = 0
    while i < 50
      i+=1
      dz = 2 * delta - 2 * x - 1

      if delta > 0 && dz > 0
        y -= 1
        delta -= 2 * radius

        result << [x + x_center, y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end

      d = 2 * delta + 2 * radius

      if delta < 0 && d <= 0
        x += 1

        delta += 2 * x + 1

        result << [x + x_center, y + y_center]
        result << [-x + x_center, y + y_center]
        next
      end

      x += 1
      y -= 1

      delta += 2 * x + 1 - 2 * radius

      result << [x + x_center, y + y_center]
      result << [-x + x_center, y + y_center]
    end

    result
  end

  def self.draw_hermite(x1, y1, x1_vec, y1_vec, x2, y2, x2_vec, y2_vec, step=0.01)
    result = []

    coef = ERMIT_MATRIX * Matrix[[x1, y1], [x2, y2], [x1_vec, y1_vec], [x2_vec, y2_vec]]

    (0..1).step(step).each do |n|
      result << (Matrix[[n ** 3, n ** 2, n, 1]] * coef).to_a.flatten
    end

    result
  end

  def self.draw_bezier(x1, y1, x2, y2, x3, y3, x4, y4, step=0.01)
    result = []

    coef = BEZIER_MATRIX * Matrix[[x1, y1], [x2, y2], [x3, y3], [x4, y4]]

    (0..1).step(step).each do |n|
      result << (Matrix[[n ** 3, n ** 2, n, 1]] * coef).to_a.flatten
    end

    result
  end

  def self.draw_b_spline(points, step=0.01)
    result = []

    (1..points.size - 3).each do |i|
      coef = B_SPLINE_MATRIX * Matrix[
          [points[i-1][0], points[i-1][1]],
          [points[i][0]  , points[i][1]],
          [points[i+1][0], points[i+1][1]],
          [points[i+2][0], points[i+2][1]]
      ]

      (0..1).step(step).each do |n|
        result << (Matrix[[n ** 3, n ** 2, n, 1]] * coef / 6).to_a.flatten
      end
    end

    result
  end

#===================================================

  def self.center(x, y)
    [x.floor + 0.5, y.floor + 0.5]
  end

  def self.line_distance(x, y, x1, y1, x2, y2)
    a = y2 - y1
    b = x1 - x2
    c = -x1 * (y2 - y1) + y1 * (x2 - x1)

    (a * x + b * y + c).abs / Math.sqrt(a**2 + b**2)
  end

  def self.sign(number)
    case
      when number > 0
        1
      when number < 0
        -1
      when number == 0
        0
      else
        raise 'miracle'
    end
  end

end