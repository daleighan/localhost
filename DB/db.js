const Sequelize = require('sequelize');

//this initializes the database.
const DB = new Sequelize('postgres://rqgzqolx:kcs9uuu_QCep85jlPrhiqp9Xexg-GNWJ@pellefant.db.elephantsql.com:5432/rqgzqolx', {
  dialect: 'pg',
});

//This initializes and authenticates the database
DB.authenticate()
.then(() => {
  console.log('Connection to database has been established');
})
.catch((err) => {
  console.error('Unable to connect to the database', err);
});

//Defines the User model which will essentially hold profile information. 
//TODO: more items may be added to this model:
const User = DB.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  biography: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT
  }
});

//Defined the message model that has tow foreign keys: A userId corresponding to 
//the Users table and a conversationId corresponding to the conversations table: 
const Message = DB.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  },
  conversationId: {
    type: Sequelize.INTEGER,
    model: 'conversations',
    key: 'id'
  }
});

//This is the the conversations table. Both properties are forein keys each relating to the Users table:
const Conversation = DB.define('conversation', {
  firstUser: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  },
  secondUser: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  }
});

//These lines establish the relationship between the Users table and the Messages table:
User.hasMany(Message, { onDelete: 'cascade' });
Message.belongsTo(User, { onDelete: 'cascade' });

// Message.belongsTo(Conversation, { onDelete: 'cascade' });

//These lines establish the relationship between the Users table and the Conversations table:
User.hasMany(Conversation, { onDelete: 'cascade' });
Conversation.belongsTo(User, { onDelete: 'cascade' });



User.sync({ force: true }).then(() => {
  return User.create({
    username: 'Alex',
    location: 'Santa Monica',
    biography: 'some stuff about me'
  }).then(() => {
    return User.create({
      username: 'Jeff',
      location: 'North Hollywood',
      biography: 'Some other stuffs'
    }).then(() => {
      return User.create({
        username: 'Max',
        location: 'Portland',
        biography: 'Another bio'
      }).then(() => {
        return User.create({
          username: 'Tiffany',
          location: 'Los Angeles',
          biography: 'yet another one'
        }).then(() => {
          Conversation.sync({ force: true }).then(() => {
            return Conversation.create({
              firstUser: 1,
              secondUser: 2
            }).then(() => {
              return Conversation.create({
                firstUser: 1,
                secondUser: 3
              }).then(() => {
                return Conversation.create({
                  firstUser: 3,
                  secondUser: 4
                }).then(() => {
                  Message.sync({ force: true }).then(() => {
                    return Message.create({
                      text: 'a new message',
                      userId: 1,
                      conversationId: 1
                    }).then(() => {
                      return Message.create({
                        text: 'another new message',
                        userId: 2,
                        conversationId: 1
                      }).then(() => {
                        Message.create({
                          text: 'yet another one',
                          userId: 3,
                          conversationId: 3
                        });
                      });
                    });
                  });
                })
              });
            });
          });
        })
      });
    });
  });
});


//This syncs the Conversations table and then seeds some data


//This syncs the Users table and then adds some seed data


//Exports the different model
module.exports = {
  DB,
  User,
  Message,
  Conversation
};







