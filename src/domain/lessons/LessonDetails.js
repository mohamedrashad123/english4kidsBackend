class LessonDetails {
    constructor({
        ID = 5,
        unitId,
        gradeId,
        title,
        description,
        video,
        image,
        grammar_images,
        words_info,
        words_images,
        questions = []
    }) {
        this.id = ID;
        this.unitId = unitId;
        this.gradeId = gradeId;
        this.title = title;
        this.description = description;
        this.video = video;
        this.image = image;
        this.grammar_images = grammar_images;
        this.words_info = words_info;
        this.words_images = words_images;
        this.questions = questions;
    }
}

module.exports = LessonDetails;
