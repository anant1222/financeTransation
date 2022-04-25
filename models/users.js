const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "user_name"
    },
    first_name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updated_on: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
    ]
  });
};
