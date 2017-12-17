class Array
  def x
    self[0]
  end

  def x=(new_x)
    self[0] = new_x
  end

  def y
    self[1]
  end

  def y=(new_y)
    self[1] = new_y
  end

  def z
    self[2]
  end

  def z=(new_z)
    self[2] = new_z
  end

  def p
    self[3]
  end

  def a
    self[4]
  end

  def to_top
    new_arr = self.dup
    new_arr[1] += 1
    new_arr
  end

  def to_bottom
    new_arr = self.dup
    new_arr[1] -= 1
    new_arr
  end

  def to_right
    new_arr = self.dup
    new_arr[0] += 1
    new_arr
  end

  def to_left
    new_arr = self.dup
    new_arr[0] -= 1
    new_arr
  end

  def point?
    self[0].is_a?(Fixnum)
  end

  def line?
    self[0].is_a?(Array) && self[1].is_a?(Array)
  end

  def code(poligon)
    poligon_coordinates = poligon.flatten(1)
    max_x = poligon_coordinates.select(&:x).max.x
    min_x = poligon_coordinates.select(&:x).min.x
    max_y = poligon_coordinates.select(&:y).max.y
    min_y = poligon_coordinates.select(&:y).min.y

    result = [0, 0, 0, 0]

    result[0] = 1 if self[1] > max_y
    result[1] = 1 if self[1] < min_y
    result[3] = 1 if self[0] < min_x
    result[2] = 1 if self[0] > max_x

    result.join.to_i(2)
  end
end
