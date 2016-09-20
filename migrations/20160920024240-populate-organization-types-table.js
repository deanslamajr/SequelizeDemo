'use strict';

const rows = [
    {
      name: 'Private Company',
      description: 'For profit, privately-held business'
    },
    {
      name: 'NPO',
      description: 'Non profit organization'
    },
    {
      name: 'Governmental Entity'
    }
  ];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('organization_types', rows, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('organization_types', null, {});
  }
};
