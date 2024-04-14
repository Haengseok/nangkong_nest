'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tabling_shop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      detail_address: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tabling_shop');
  }
};
