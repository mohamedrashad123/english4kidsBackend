// create lesson class
class Lesson {
    constructor({
        gradeId,
        unitId,
        title,
        description,
        video,
        image,
        grammar_images,
        words_info,
        words_images
    }) {
        this.gradeId = gradeId;
        this.unitId = unitId;
        this.title = title;
        this.description = description;
        this.video = video;
        this.image = image;
        this.grammar_images = grammar_images;
        this.words_info = words_info;
        this.words_images = words_images;
    }
}

// extract lesson class
module.exports = Lesson;
