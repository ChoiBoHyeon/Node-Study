const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email : {
                type: Sequelize.STRING(40),
                // Kakao Rest API 정책 변경으로 인한 NotNull 허용.
                allowNull : true,
                unique : true,
            },
            nick : {
                type : Sequelize.STRING(15),
                allowNull : false,

            },
            password: {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            provider: {
                type : Sequelize.ENUM('local','kakao'),
                allowNull : false,
                defaultValue : 'local'
            },
            snsId : {
                type : Sequelize.STRING(30),
                allowNull : true,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, { // 팔러워 : 내가 유명인을 팔러워한다.
            foreignKey : 'follwingId',
            as : 'Followers',
            through : 'Follow',
        });
        db.User.belongsToMany(db.User, { // 팔로잉 : 나는 유명인의 팔로잉이다.
            foreignKey : 'followerId',
            as : 'Followings',
            through : 'Follow',
        });
    }
};

module.exports = User;