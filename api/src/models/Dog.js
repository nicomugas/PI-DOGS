const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    imgsrc: {
      type: DataTypes.STRING(1500)
    }

  });
};

