let _singleton = Symbol()

const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';
const MODULE_DELETE_API_URL = 'http://localhost:8080/api/module/MID';


class ModuleServiceClient{

    constructor(singleToken) {
        if(_singleton !== singleToken){
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);


        return this[_singleton]
    }

    createModule(courseId, module){
        return fetch(MODULE_API_URL.replace('CID',courseId),{
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_DELETE_API_URL.replace
        ('MID', moduleId), {
            method: 'delete'
        })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    findModuleById(moduleId) {
        return fetch(
            MODULE_DELETE_API_URL
                .replace('MID', moduleId),{
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
    }

}

export default ModuleServiceClient;
