const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const ClassModel = require("../models/Class/ClassModel");

class ClassRepository {
    static async createClass(className, teacherUid) {
        const classRef = FirebaseService
            .getDB()
            .collection(StaticVariable.collectionClass)
            .doc();
        const classModel = new ClassModel(classRef.id, className, teacherUid);
        await classRef.set(classModel.toFirestore());
        return classRef.id;
    }
    static async getClassDocument(classId){
        return FirebaseService.getDB().collection(StaticVariable.collectionClass).doc(classId);
    }
    static async getClassData(classId){
        const classDocRef = await ClassRepository.getClassDocument(classId);
        const classDocSnap = await classDocRef.get();
        if(!classDocSnap.exists) throw new Error(`Class document not found for Class ID: ${classId}`);
        return classDocSnap.data();
    }
}

module.exports = ClassRepository;