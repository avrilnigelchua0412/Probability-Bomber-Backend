const QuestionRepository = require("../repositories/QuestionRepository");
const QuizRepository = require("../repositories/QuizRepository");

class QuestionService {
    static async addQuestionToTheQuizService(questionName, quizName){
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        const quizId = await QuizRepository.getQuizIdByName(quizName);
        await QuizRepository.addQuestionToQuiz(questionId, quizId);
    }
}
module.exports = QuestionService;