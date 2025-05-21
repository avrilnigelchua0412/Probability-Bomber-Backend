const CreateQuizDTO = require("../dto/CreateQuizDTO");
const EditQuizDTO = require("../dto/EditQuizDTO");
const StudentInformationDTO = require("../dto/StudentInformationDTO");
const QuizService = require("../services/QuizService");

class QuizController {
    static async getAllTheQuiz(req, res){
        try {
            const allQuizzes = await QuizService.getAllTheQuizService()
            res.status(200).json({ allQuizzes });
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ error: "Failed to create quiz."});
        }
    }
    static async createQuizForTheTeacher(req, res){
        try {
            const createQuizDTO = CreateQuizDTO.fromRequestBody(req.validatedBody);
            await QuizService.createQuizService(createQuizDTO, req.uid);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ error: "Failed to create quiz."});
        }
    }
    static async editQuizForTheTeacher(req, res){
        try {
            const editQuizDTO = EditQuizDTO.fromRequestBody(req.validatedBody);
            await QuizService.editQuizService(editQuizDTO)
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error editing quiz:", error);
            res.status(500).json({ error: "Failed to edit quiz."});
        }
    }

    static async deleteClassInTheQuiz(req, res) {
        try {
            const { quizName, className } = req.body;
            await QuizService.deleteClassOnQuizService(quizName, className);
            res.status(200).json({ message: "Class successfully removed from quiz." });
        } catch (error) {
            console.error("Error deleting class from quiz:", error);
            res.status(500).json({ error: "Failed to delete class from quiz." });
        }
    }

    static async addClassInTheQuiz(req, res) {
        try {
            const { quizName, className } = req.body;
            await QuizService.addClassOnQuizService(quizName, className)
            res.status(200).json({ message: "Class successfully added to quiz." });
        } catch (error) {
            console.error("Error adding class to quiz:", error);
            res.status(500).json({ error: "Failed to add class to quiz." });
        }
    }

    static async updateInformationOfTheStudent(req, res){
        try {
            const studentInformationDTO =  StudentInformationDTO.fromRequestBody(req.validatedBody);
            await QuizService.updateStudentInformationService(studentInformationDTO);
            res.status(200).json({ message: 'Score updated successfully' });
        } catch (error) {
            console.error('Error updating score:', error);
            res.status(500).json({ error: 'Failed to update score'});
        }
    }
    static async removeInformationOfTheStudent(req, res){
        try {
            const studentInformationDTO =  StudentInformationDTO.fromRequestBody(req.validatedBody);
            await QuizService.removeStudentInformationService(studentInformationDTO);
            res.status(200).json({ message: 'Student score removed successfully' });
        } catch (error) {
            console.error("Error removing student score:", error);
            res.status(500).json({ error: "Failed to remove student score."});
        }
    }
}

module.exports = QuizController;