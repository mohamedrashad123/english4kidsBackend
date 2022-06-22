const getListOfQuestions = async (lessonId, {questionRepositry}) => {
    const lessons = await questionRepositry.getList(lessonId);

    return lessons;
};

module.exports = getListOfQuestions;
