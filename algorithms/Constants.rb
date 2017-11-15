class Constants
  ERMIT_MATRIX = Matrix[
      [2, -2, 1, 1],
      [-3, 3, -2, -1],
      [0, 0, 1, 0],
      [1, 0, 0, 0]
  ]

  BEZIER_MATRIX = Matrix[
      [-1, 3, -3, 1],
      [3, -6, 3, 0],
      [-3, 3, 0, 0],
      [1, 0, 0, 0]
  ]

  B_SPLINE_MATRIX = Matrix[
      [-1, 3, -3, 1],
      [3, -6, 3, 0],
      [-3, 0, 3, 0],
      [1, 4, 1, 0]
  ]

  def self.y_rotate_matrix(angle)
    Matrix[
        [Math.cos(angle), 0, -Math.sin(angle), 0],
        [0, 1, 0, 0],
        [Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1]
    ]
  end

end

