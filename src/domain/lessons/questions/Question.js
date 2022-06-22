// create lesson question class
class LessonQuestion {
    constructor({lessonId, title, image}) {
        this.lessonId = lessonId;
        this.title = title;
        this.image = image;
    }
}

// extract lesson question class
module.exports = LessonQuestion;
