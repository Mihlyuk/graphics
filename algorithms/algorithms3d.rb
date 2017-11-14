require_relative 'Constants.rb'

class Algorithms3d

  def self.perspective(coordinates, perspective)
    coordinates = Matrix[*coordinates]

    perspective_matrix = Matrix[
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 1/perspective],
        [0, 0, 0, 0]
    ]

    (coordinates * perspective_matrix).to_a
  end

  def self.rotate(coordinates, axis, angle)
    coordinates = Matrix[*coordinates]
    d1 = distance(axis[0], [0, 0, 0])
    d2 = distance(axis[1], [0, 0, 0])
    nearest_point = [d1, d2].min == d1 ? axis[0] : axis[1]

    direction_vector = distance(axis[1], axis[0])
    a = (axis[1].x - axis[0].x) / direction_vector
    b = (axis[1].y - axis[0].y) / direction_vector
    c = (axis[1].z - axis[0].z) / direction_vector
    d = Math.sqrt(b ** 2 + c ** 2)

    t_matrix = Matrix[
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-nearest_point.x, -nearest_point.y, -nearest_point.z, 1]
    ]
    x_rotate_matrix = Matrix[
        [1, 0, 0, 0],
        [0, c/d, -b/d, 0],
        [0, b/d, c/d, 0],
        [0, 0, 0, 1]
    ]

    y_rotate_matrix = Matrix[
        [d, 0.0, -a, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [a, 0.0, d, 0.0],
        [0.0, 0.0, 0.0, 1.0]
    ]

    z_rotate_matrix = Matrix[
        [Math.cos(angle), Math.sin(angle), 0, 0],
        [-Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]

    y_rotate_matrix_back = Matrix[
        [d, 0.0, a, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [-a, 0.0, d, 0.0],
        [0.0, 0.0, 0.0, 1.0]
    ]

    x_rotate_matrix_back = Matrix[
        [1.0, 0.0, 0.0, 0.0],
        [0.0, c/d, b/d, 0.0],
        [0.0, -b/d, c/d, 0.0],
        [0.0, 0.0, 0.0, 1.0]
    ]

    t_matrix_back = Matrix[
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [nearest_point.x, nearest_point.y, nearest_point.z, 1]
    ]

    # Move to the beginning of coordinates
    coordinates = coordinates * t_matrix

    # turn the object on the x-axis
    coordinates = coordinates * x_rotate_matrix

    # turn the object on the y-axis
    coordinates = coordinates * y_rotate_matrix

    # turn the object on the z-axis
    coordinates = coordinates * z_rotate_matrix

    # turn the object on the y-axis
    coordinates = coordinates * y_rotate_matrix_back

    # turn the object on the x-axis
    coordinates = coordinates * x_rotate_matrix_back

    # Move to the beginning of coordinates
    coordinates = coordinates * t_matrix_back

    coordinates.to_a
  end

  private

  def self.distance(coordinates1, coordinates2)
    Math.sqrt((coordinates2.x - coordinates1.x) ** 2 + (coordinates2.y - coordinates1.y) ** 2 + (coordinates2.z - coordinates1.z) ** 2)
  end
end