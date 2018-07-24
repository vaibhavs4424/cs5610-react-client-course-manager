let _singleton = Symbol()
const TOPIC_API_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic';
const TOPIC_DELETE_API_URL = 'http://localhost:8080/api/topic/TID';

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

    createTopic(courseId, moduleId,lessonId,topic){

        var DYNAMIC_URL = TOPIC_API_URL.replace('CID',courseId)
        DYNAMIC_URL = DYNAMIC_URL.replace('MID',moduleId)
        DYNAMIC_URL = DYNAMIC_URL.replace('LID',lessonId)
        console.log(DYNAMIC_URL);
        return fetch(DYNAMIC_URL,{
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_DELETE_API_URL.replace
        ('TID', topicId), {
            method: 'delete'
        })
    }

    findAllTopicsForLesson(courseId, moduleId,lessonId) {

        var DYNAMIC_URL = TOPIC_API_URL.replace('CID',courseId);
        DYNAMIC_URL = DYNAMIC_URL.replace('MID',moduleId);
        DYNAMIC_URL = DYNAMIC_URL.replace('LID',lessonId);
        return fetch(DYNAMIC_URL)
            .then(function (response) {
                return response.json();
            })
    }



}
