module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("hvt_fcapp_user", {
    nik: {
      type: Sequelize.STRING
    },
    full_name: {
      type: Sequelize.STRING
    },
    tag_id: {
      type: Sequelize.STRING
    },
    fcm_token: {
      type: Sequelize.STRING
    }
  },
    {
      timestamps: false, freezeTableName: true, tableName: 'hvt_fcapp_user'
    }
  );
  User.removeAttribute('id');

  return User;
};