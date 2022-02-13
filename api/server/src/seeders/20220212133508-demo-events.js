'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const loremIpsum = "Lorem ipsum dolor sit amet. Ea debitis consequuntur sit molestias magni qui pariatur ratione vel minima error At expedita voluptatem.";
    const names = ["Ryland Michael", "Graham Carlson", "Willie Horton", "Aniya Heath", "Brooks Larson", "Jaquan Deleon", "Isai Cooke", "Paityn Mclaughlin", "Aldo Liu", "Keon Roberson", "Valentina Waters", "Skylar Mcdaniel", "Jordon Santiago", "Kyson Barnett", "Quinn Costa", "Abigail Vaughn", "Aileen Gallegos", "Sterling Steele", "Ada Randall", "Janiah Warner", "Brandon Molina", "Anaya Griffith", "Beatrice Blevins", "Ellie Nichols", "Jaqueline Willis", "Jesus Payne", "Teagan Tyler", "Natalie Estrada", "Enzo Ford", "Hailey Raymond", "Iyana Glover", "Jefferson Mcdaniel", "Quinten Merritt", "Abbigail Velez", "Zariah Vang", "Karter Short", "Carlo Bridges", "Aliana Mullins", "Malakai Moreno", "Joslyn Schmitt", "Sonia Cabrera", "Jaden Schmidt", "Jadiel Huang", "Tanner Church", "Angelica Cox", "Bianca Bonilla", "Damien Welch", "Kristina Gaines", "Aurora Wiggins", "Tyrese Bridges", "Lincoln Scott", "Patrick Haney", "Braden Bright", "Kelton Shaw", "Derick Macias", "Judith Mckenzie", "Brice Dodson", "Adonis Krause", "Bridger Gray", "Brenden Cannon", "Taliyah Fisher", "Silas Pennington", "Steve Garcia", "Gracelyn Golden", "Katelynn York", "Liliana Carrillo", "Danielle Bird", "Elizabeth Sharp", "Virginia York", "Gianni Brooks", "Angel Dillon", "Ayaan Glenn", "Kianna Preston", "Israel Bruce", "Simeon Simpson", "Taniya Norman", "Bruno Oconnor", "Paul Flores", "Paityn Doyle", "Connor Hardin", "Iyana Acosta", "Libby Hammond", "Mariam James", "Rihanna Lindsey", "Aden Hines", "Marc Small", "Allyson Rose", "Macey Arnold", "Amira Bell", "Nia Jimenez", "Ashlynn Holloway", "Callum Macdonald", "Bianca Cooper", "Kiara Liu", "August Manning", "Aarav Miller", "Kimberly Wise", "Lorelei Boone", "Felicity Terry", "Ariana Conway"];
    const date = new Date();
    date.setDate(date.getDate() - (names.length / 2));

    function fakeEventData(name, index) {
      const email = `${name.replace(" ", "")}@example.com`.toLowerCase();
      const eventDate = new Date(date.getTime());
      eventDate.setDate(eventDate.getDate() + index);

      return {
        name: `${name} - évènement`,
        date: eventDate,
        description: loremIpsum,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const eventsToCreate = names.map((name, index) => {
      const fakeEvent = fakeEventData(name, index);
      return fakeEvent;
    })

    await queryInterface.bulkInsert("Events", eventsToCreate, {});

    const events = await queryInterface.sequelize.query('SELECT * FROM "Events"', {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    for (const event of events) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      await queryInterface.bulkInsert("Comments", [{
        author: randomName,
        message: loremIpsum,
        EventId: event.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("Events", null, {});
  }
};
