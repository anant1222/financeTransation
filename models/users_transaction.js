const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_transaction', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    from_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    to_user_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    txn_type: {
      type: DataTypes.ENUM('CR','DR'),
      allowNull: true
    },
    refs_txn_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('SUCCESS','FAILED'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users_transaction',
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
    ]
  });
};
