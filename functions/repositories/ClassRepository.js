const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const ClassModel = require("../models/Class/ClassModel");

class ClassRepository {
    static async getClassDataByNameHelper(className){
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionClass)
            .where("className", "==", className)
            .limit(1)
            .get();
    }
    static async createClass(className, teacherUid) {
        const classNameQuery = await ClassRepository.getClassDataByNameHelper(className)
        if (!classNameQuery.empty) {
            throw new Error("Class Name already exists.");
        }
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
    static async getClassData(classId) {
        try {
            const classDocRef = await ClassRepository.getClassDocument(classId);
            const classDocSnap = await classDocRef.get();
            if (!classDocSnap.exists) {
                throw new Error(`Class document not found for Class ID: ${classId}`);
            }
            return classDocSnap.data();
        } catch (error) {
            console.error("Error getting class data:", error);
            throw error;
        }
    }
    static async getClassIdByName(className){
        const classNameQuery = await ClassRepository.getClassDataByNameHelper(className)
        if(classNameQuery.empty) throw new Error("No Class Name found.");
        return classNameQuery.docs[0].id;
    }
    static async removeClassFromDocuments(classId) {
        try {
            await FirebaseService.deleteDocument(StaticVariable.collectionClass, classId);
        } catch (error) {
            console.error(`Failed to delete class document ${classId}:`, error);
            throw error;
        }
    }
}

module.exports = ClassRepository;