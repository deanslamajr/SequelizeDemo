'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'members',
      {
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        is_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      })
    .then(() => queryInterface.createTable(
        'email_verification_tokens',
        {
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          expires_at: Sequelize.DATE,
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false
          }, 
          has_been_used: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          }, 
          member_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        }
      ))
      .then(() => queryInterface.createTable(
        'organization_types',
        {
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          description: Sequelize.STRING,
        }
      ))
      .then(() => queryInterface.createTable(
        'organizations',
        {
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          type: {
            type: Sequelize.INTEGER,
            references: {
                model: 'organization_types',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            allowNull: false
          }
        }
      ))
      .then(() => queryInterface.createTable(
        'organization_members',
        {
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          member_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          team_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'organizations',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        }
      ));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('email_verification_tokens')
      .then(() => queryInterface.dropTable('organization_members'))
      .then(() => queryInterface.dropTable('organizations'))
      .then(() => queryInterface.dropTable('organization_types'))
      .then(() => queryInterface.dropTable('members'));
  }
};
