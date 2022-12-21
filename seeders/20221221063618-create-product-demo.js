'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Products', [
      {
        productName: "Product demo 1",
        type: "dog food",
        price: 2000,
        description: "good food",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      },
      {
        productName: "Product demo 2",
        type: "cat food",
        price: 3000,
        description: "good food",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      },
      {
        productName: "Product demo 3",
        type: "fish food",
        price: 5000,
        description: "good food",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
