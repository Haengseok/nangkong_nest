'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tabling_shop_open_close', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tabling_shop',
          key: 'id',
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
      open_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      close_time: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tabling_shop_open_close');
  }
};
