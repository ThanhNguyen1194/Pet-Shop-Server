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
    await queryInterface.bulkInsert('Users', [
      {
        name: "Demo Admin",
        email: "nguyenhoaithanhadmin@gmail.com",
        password: "$2b$10$y8xNlENkX4wQzGRv2RNE6eVQf3Yp1wD.JEjygBowB.nuSNo8l9Dfe",
        numberPhone: "123456789",
        type: "ADMIN",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      },
      {
        name: "Demo Client",
        email: "nguyenhoaithanhclient@gmail.com",
        password: "$2b$10$y8xNlENkX4wQzGRv2RNE6eVQf3Yp1wD.JEjygBowB.nuSNo8l9Dfe",
        numberPhone: "123456789",
        type: "CLIENT",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      },
      {
        name: "Demo Client 1",
        email: "client1@gmail.com",
        password: "123456",
        numberPhone: "123456789",
        type: "CLIENT",
        createdAt: "2022-11-25 04:40:41",
        updatedAt: "2022-11-25 04:40:41"
      },
      {
        name: "Demo Client 2",
        email: "client2@gmail.com",
        password: "123456",
        numberPhone: "123456789",
        type: "CLIENT",
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
