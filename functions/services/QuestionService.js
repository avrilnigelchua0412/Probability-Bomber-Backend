const QuestionRepository = require("../repositories/QuestionRepository");
const QuizRepository = require("../repositories/QuizRepository");

class QuestionService {
    static async addQuestionToTheQuizService(questionName, quizName){
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        const quizId = await QuizRepository.getQuizIdByName(quizName);
        await QuizRepository.addQuestionToQuiz(questionId, quizId);
    }
    static async removeAllQuestionService(questionName){
        const snapshot = await QuizRepository.getQuizSnapshot();
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        await Promise.all(
                snapshot.docs.map(async (doc) => {
                    await QuizRepository.deleteQuestionOnQuiz(questionId, doc.id);
                })
            );
    }
    static async removeAQuestionOfAQuiz(questionName, quizName){
        const quizId = await QuizRepository.getQuizIdByName(quizName)
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        await QuizRepository.deleteQuestionOnQuiz(questionId, quizId);
    }
    static async deleteQuestionService(questionName){
        await QuestionService.removeAllQuestionService(questionName);
        await QuestionRepository.removeQuestion(questionName);
    }
    static async getAllQuestionService() {
        const snapshot = await QuestionRepository.getQuestionSnapshot();
        const allQuestions = await Promise.all(
            snapshot.docs.map(async (doc) => doc.data())
        );
        return allQuestions;
    }
}
module.exports = QuestionService;