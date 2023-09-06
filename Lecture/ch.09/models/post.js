const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            content : {
                type : Sequelize.STRING(140),
                allowNull : true,
            },
            img : {
                type : Sequelize.STRING(200),
                allowNull : true,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Post',
            tableName : 'posts',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8m4_general_ci',
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtaf, {through : 'PostHashtag'});
    }
}

module.exports = Post;