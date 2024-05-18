'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tabling_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tabling_shop', // 'shop' 테이블과 연결
          key: 'id', // 'shop' 테이블의 'id' 열과 연결
        },
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      tabling_type: {
        type: Sequelize.ENUM('RUN', 'COMPLETE', 'WAITING'),
        allowNull: false,
      },
      personnel: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('tabling_list');
  }
};
