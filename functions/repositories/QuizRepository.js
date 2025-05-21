const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("./ClassRepository");
const QuizModel = require("../models/Quiz/QuizModel");
const UserRepository = require("../repositories/UserRepository");
const CreateQuizDTO = require("../dto/CreateQuizDTO");

class QuizRepository{
    static async getQuizDataByNameHelper(quizName){
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionQuiz)
            .where("quizName", "==", quizName)
            .limit(1)
            .get();
    }
    static async createQuiz(createQuizDTO, teacherName){
        if(createQuizDTO instanceof CreateQuizDTO){
            const quizRef = FirebaseService
            .getDB()
            .collection(StaticVariable.collectionQuiz)
            .doc();
            createQuizDTO.setQuizId(quizRef.id);
            createQuizDTO.setCreatedBy(teacherName)
            const quizModel = createQuizDTO.toQuizModel()
            await quizRef.set(quizModel.toFirestore());
        }
    }

    static async deleteClassOnQuiz(quizId, classId) {
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();

        if (!docSnapshot.exists) throw new Error("Quiz not found.");

        const currentclassIds = docSnapshot.data().classIds || [];

        if(currentclassIds.includes(classId)){
            const updatedClassIds = currentclassIds.filter(id => id !== classId);
            await quizRef.update({
                classIds: updatedClassIds
            });
        }
    }

    static async addClassOnQuiz(quizId, classId) {
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();

        if (!docSnapshot.exists) throw new Error("Quiz not found.");

        const currentclassIds = docSnapshot.data().classIds || [];

        if(!currentclassIds.includes(classId)){
            currentclassIds.push(classId);
            await quizRef.update({
                classIds: currentclassIds
            });
        }
    }
        
    static async deleteQuestionOnQuiz(questionId, quizId){
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();

        if (!docSnapshot.exists) throw new Error("Quiz not found.");

        const currentQuestions = docSnapshot.data().questions || [];

        if (currentQuestions.includes(questionId)) {
            const updatedQuestions = currentQuestions.filter(id => id !== questionId);  // Correct way to remove
            await quizRef.update({ questions: updatedQuestions });
        }
    }
    
    static async addQuestionToQuiz(questionId, quizId){
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();

        if (!docSnapshot.exists) throw new Error("Quiz not found.");

        const currentQuestions = docSnapshot.data().questions || [];
        if (!currentQuestions.includes(questionId)) {
            currentQuestions.push(questionId);
            await quizRef.update({ questions: currentQuestions });
        }
    }

    static async getQuizIdByName(quizName){
        const quizNameQuery = await QuizRepository.getQuizDataByNameHelper(quizName);
        if(quizNameQuery.empty) throw new Error("No Quiz Name found.");
        return quizNameQuery.docs[0].id;
    }

    // Update information of a student
    static async updateStudentInformation(quizId, classId, studentUid, studentInformationDTO) {
        const studentInformation = studentInformationDTO.studentInformation
        const path = `studentInformation.${classId}.${studentUid}`;
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: studentInformation[studentInformationDTO.getClassName()][studentInformationDTO.getStudentName()] });
    }

    // Add a new class score entry
    static async addClassEntry(quizId, classId) {
        const path = `studentInformation.${classId}`;
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: {} });
    }

    // Remove a student's information
    static async removeStudentInformation(quizId, classId, studentUid) {
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();
        if (!docSnapshot.exists) throw new Error("Quiz not found.");
        const quizData = docSnapshot.data();
        const studentInformation = quizData.studentInformation || {};
        if (studentInformation[classId]) {
            delete studentInformation[classId][studentUid];
            await quizRef.update({ studentInformation });
        }
    }

    // Remove entire class's scores
    static async removeClassEntry(quizId, classId) {
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        const docSnapshot = await quizRef.get();
        if (!docSnapshot.exists) throw new Error("Quiz not found.");
        const quizData = docSnapshot.data();
        const studentInformation = quizData.studentInformation || {};
        delete studentInformation[classId];
        await quizRef.update({ studentInformation });
    }

    static async editQuiz(editQuizDTO, quizId){
        const quizRef = await FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ 
            topic: editQuizDTO.topic,  
            level: editQuizDTO.level, 
            duration: editQuizDTO.duration 
        });
    }

    static async getQuizSnapshot(){
        return await FirebaseService.getDB().collection(StaticVariable.collectionQuiz).get();
    }
}

module.exports = QuizRepository;