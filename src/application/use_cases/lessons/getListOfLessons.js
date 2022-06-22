async function getListOfLessons(unitId, gradeId, search, {LessonRepositry}) {
    const lessonsList = await LessonRepositry.getList(unitId, gradeId, search);

    return lessonsList;
}

module.exports = getListOfLessons;
