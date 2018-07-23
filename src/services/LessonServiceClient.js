let _singleton = Symbol()
const LESSON_API_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson';
const LESSON_DELETE_API_URL = 'http://localhost:8080/api/lesson/LID';

export default class LessonService {


    constructor(singleToken) {
        if (_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);


        return this[_singleton]
    }

    createLesson(courseId, moduleId,lesson){

        var DYNAMIC_URL = LESSON_API_URL.replace('CID',courseId)
        DYNAMIC_URL = DYNAMIC_URL.replace('MID',moduleId)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_DELETE_API_URL.replace
        ('LID', lessonId), {
            method: 'delete'
        })
    }

    findAllLessonsForModule(courseId, moduleId) {

        var DYNAMIC_URL = LESSON_API_URL.replace('CID',courseId);
        DYNAMIC_URL = DYNAMIC_URL.replace('MID',moduleId);
        return fetch(DYNAMIC_URL)
            .then(function (response) {
                return response.json();
            })
    }

    findLessonbyId(lessonId) {
        return fetch(
            LESSON_DELETE_API_URL
                .replace('LID', lessonId)
            )
            .then(function (response) {
                return response.json();
            })
    }



}
