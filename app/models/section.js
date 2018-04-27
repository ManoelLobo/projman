module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  Section.associate = (models) => {
    Section.belongsTo(models.Project);
  };

  return Section;
};
