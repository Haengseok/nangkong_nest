'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oauth_refresh_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      access_token_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'oauth_access_tokens',
        //   key: 'id',
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revoked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_refresh_tokens');
  }
};
